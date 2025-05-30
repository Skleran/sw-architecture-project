"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps
  extends Omit<React.ComponentProps<"textarea">, "type" | "onKeyDown"> {
  type?: string; // Keep for compatibility but unused
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, InputProps>(
  ({ className, type, onChange, onKeyDown, ...props }, forwardedRef) => {
    const internalRef = React.useRef<HTMLTextAreaElement>(null);

    // Combine the forwarded ref with the internal ref
    const textareaRef = React.useMemo(() => {
      if (typeof forwardedRef === "function") {
        return (node: HTMLTextAreaElement | null) => {
          internalRef.current = node;
          forwardedRef(node);
        };
      } else if (forwardedRef) {
        return (node: HTMLTextAreaElement | null) => {
          internalRef.current = node;
          forwardedRef.current = node;
        };
      } else {
        return internalRef;
      }
    }, [forwardedRef]);

    const adjustHeight = React.useCallback(() => {
      const textarea = internalRef.current;
      if (textarea) {
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }, []);

    React.useEffect(() => {
      adjustHeight();
    }, [adjustHeight]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      adjustHeight();
      if (onChange) {
        onChange(e);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter") {
        e.preventDefault();
      }
      if (onKeyDown) {
        onKeyDown(e);
      }
    };

    return (
      <textarea
        ref={textareaRef}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex min-h-[2.25rem] w-full min-w-0 rounded-md bg-input/50 px-3 py-1 text-base transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none overflow-hidden",
          "focus-visible:border-ring focus-visible:ring-ring/80 focus-visible:ring-[1px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        rows={1}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
