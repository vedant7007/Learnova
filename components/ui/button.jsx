import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonBase = [
  "group relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium",
  "cursor-pointer outline-none overflow-hidden",
  "transition-[transform,box-shadow,background-color,border-color,color,opacity] duration-300 ease-out",
  "motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100",
  "hover:scale-[1.02] active:scale-[0.98]",
  "disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none disabled:hover:scale-100 disabled:active:scale-100",
  "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0",
  "[&_svg]:transition-[transform,opacity] [&_svg]:duration-300 [&_svg]:ease-out",
  "group-hover:[&_svg]:scale-110 group-active:[&_svg]:scale-95 group-hover:[&_svg]:opacity-100",
  "motion-reduce:group-hover:[&_svg]:scale-100 motion-reduce:group-active:[&_svg]:scale-100",
  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
].join(" ");

const buttonVariants = cva(buttonBase, {
  variants: {
    variant: {
      default: [
        "bg-primary text-primary-foreground shadow-sm",
        "hover:bg-primary/90 hover:shadow-md hover:shadow-primary/20",
        "active:bg-primary/95 active:shadow-sm",
        "dark:shadow-black/30 dark:hover:shadow-lg dark:hover:shadow-primary/15",
      ].join(" "),
      destructive: [
        "bg-destructive text-white shadow-sm",
        "hover:bg-destructive/90 hover:shadow-md hover:shadow-destructive/25",
        "active:bg-destructive/95 active:shadow-sm",
        "focus-visible:ring-destructive/25 dark:focus-visible:ring-destructive/40",
        "dark:bg-destructive/80 dark:hover:bg-destructive/90 dark:hover:shadow-destructive/20",
      ].join(" "),
      outline: [
        "border border-border bg-background text-foreground shadow-sm",
        "hover:bg-accent hover:text-accent-foreground hover:border-border/80 hover:shadow-md",
        "active:bg-accent/90 active:shadow-sm",
        "dark:bg-input/30 dark:border-input dark:hover:bg-input/50 dark:hover:shadow-black/25",
      ].join(" "),
      secondary: [
        "bg-secondary text-secondary-foreground shadow-sm",
        "hover:bg-secondary/85 hover:shadow-md hover:shadow-secondary/20",
        "active:bg-secondary/90 active:shadow-sm",
        "dark:hover:shadow-lg dark:hover:shadow-secondary/10",
      ].join(" "),
      ghost: [
        "shadow-none hover:bg-accent hover:text-accent-foreground",
        "active:bg-accent/80",
        "hover:shadow-sm dark:hover:bg-accent/50 dark:active:bg-accent/60",
        "hover:scale-[1.01] active:scale-[0.99]",
      ].join(" "),
      link: [
        "text-primary underline-offset-4 shadow-none",
        "hover:underline hover:scale-100 active:scale-100",
        "group-hover:[&_svg]:scale-105 group-active:[&_svg]:scale-100",
        "transition-[color,text-decoration-color] duration-300",
      ].join(" "),
    },
    size: {
      default: "h-9 px-4 py-2 has-[>svg]:px-3",
      sm: "h-8 rounded-md gap-1.5 px-3 text-xs has-[>svg]:px-2.5",
      lg: "h-10 rounded-md px-6 text-base has-[>svg]:px-4",
      icon: [
        "size-9 shrink-0 p-0",
        "group-hover:[&_svg]:rotate-6 group-active:[&_svg]:-rotate-3",
        "motion-reduce:group-hover:[&_svg]:rotate-0 motion-reduce:group-active:[&_svg]:rotate-0",
      ].join(" "),
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
});

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
