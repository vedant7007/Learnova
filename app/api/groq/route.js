import { jsonSuccess } from "@/lib/api-response";
import { detectInjection, sanitizeMessage, buildSecureMessages } from "@/utils/promptGuard";
import { checkRateLimit } from "@/lib/rateLimit";
import { withErrorHandler, authenticateRequest } from "@/lib/error-handler";
import { AppError, ValidationError } from "@/lib/errors";

export const dynamic = "force-dynamic";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MAX_MESSAGE_LENGTH = 2000;

// Rate limiting setup
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;
const rateLimitMap = new Map();

/**
 * Checks if a user has exceeded their rate limit.
 * Also performs basic cleanup of old timestamps.
 */
const isRateLimited = (userId) => {
  const now = Date.now();
  const userRequests = rateLimitMap.get(userId) || [];

  // Filter valid requests and cleanup memory
  const validTimestamps = userRequests.filter((t) => now - t < RATE_LIMIT_WINDOW);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  validTimestamps.push(now);
  rateLimitMap.set(userId, validTimestamps);
  return false;
};

export async function POST(request) {
  try {
    // 1. Authentication
    const authorization = request.headers.get("authorization");
    const token = authorization?.split(" ")[1];
    const decodedToken = await verifyFirebaseToken(token);

    if (!decodedToken) {
      return jsonError("Unauthorized", 401);
    }

    // 2. Rate Limiting
    if (isRateLimited(decodedToken.uid)) {
      return jsonError("Too many requests. Please try again later.", 429);
    }

    // 3. Request Parsing & Validation
    const body = await request.json();
    const rawMessage = typeof body.message === "string" ? body.message : body.userMessage;
    const trimmedMessage = rawMessage?.trim();

  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new AppError("Groq API key is not configured", 500);
  }

  const timeoutMs = parseInt(process.env.GROQ_TIMEOUT || "30000", 10) || 30000;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    // 4. API Configuration
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error("Critical: GROQ_API_KEY missing");
      return jsonError("Internal server configuration error", 500);
    }

    const timeoutMs = parseInt(process.env.GROQ_TIMEOUT || "30000", 10);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    // 5. Groq API Call
    let response;
    try {
      response = await fetch(GROQ_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        signal: controller.signal,
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            {
              role: "system",
              content: "You are Nova, the friendly AI assistant for Learnova - a Smart Student Engagement Ecosystem. You help with questions about attendance automation, smart activities, security features, analytics, and educational technology. Always be helpful, informative, and encouraging. Keep responses concise but comprehensive.",
            },
            { role: "user", content: trimmedMessage },
          ],
          max_tokens: 400,
          temperature: 0.7,
        }),
      });
      errorBody = null;
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return jsonError(errorData?.error?.message || "Groq API request failed", response.status);
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;

    if (!content) {
      return jsonError("AI generated an empty response", 502);
    }

    // Log success for quota tracking
    console.log(`[nova-ai-quota-tracker] Request successful for User: ${decodedToken.uid}`);

    return jsonSuccess({ message: content });

  } catch (error) {
    if (error.name === "AbortError") {
      return jsonError("Gateway Timeout: AI response took too long.", 504);
    }
    console.error("Groq API route error:", error);
    return jsonError("Internal server error", 500);
  }
}
