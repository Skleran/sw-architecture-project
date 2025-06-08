"use client";

import { useState, ChangeEvent } from "react";
import { Input } from "./input";

interface FloatingLabelInputProps {
  id?: string;
  label: string;
  type?: string;
  name?: string;
  required?: boolean;
  className?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FloatingLabelInput = ({
  id,
  label,
  type = "text",
  name,
  required = true,
  className = "",
  value: externalValue,
  onChange: externalOnChange,
  ...props
}: FloatingLabelInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState("");

  const value = externalValue !== undefined ? externalValue : internalValue;

  const handleFocus = () => setIsFocused(true);

  const handleBlur = () => {
    if (!value) {
      setIsFocused(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (externalOnChange) {
      externalOnChange(e);
    } else {
      setInternalValue(e.target.value);
    }
  };

  return (
    <div className={`relative mt-4 ${className}`}>
      <Input
        id={id}
        type={type}
        name={name}
        required={required}
        className="w-full min-h-10 px-3"
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder=" " // Empty space placeholder to work with peer selector
        {...props}
      />
      <label
        className={`absolute left-3 transition-all duration-300 
          ${
            isFocused || value
              ? "-top-2 text-xs bg-accent px-1 text-foreground rounded-[3px]"
              : "top-1/2 -translate-y-1/2 text-muted-foreground"
          } 
          peer-focus:-top-2 peer-focus:text-xs peer-focus:px-1
          pointer-events-none`}
      >
        {label}
      </label>
    </div>
  );
};

export default FloatingLabelInput;
