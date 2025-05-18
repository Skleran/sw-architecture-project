"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/compat/router";
import type { LinkProps as NextLinkProps } from "next/link";

// Extend NextLinkProps for our TransitionLink
interface TransitionLinkProps extends Omit<NextLinkProps, "href"> {
  href: string;
  className?: string;
  children: React.ReactNode;
  // You can add additional props specific to your TransitionLink here
  // For example:
  // transitionName?: string;
}

const TransitionLink: React.FC<TransitionLinkProps> = ({
  href,
  children,
  className,
  ...props
}) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Prevent default Link behavior
    e.preventDefault();

    // If View Transitions API is not supported, fall back to normal navigation
    if (!document.startViewTransition) {
      router.push(href);
      return;
    }

    // Use View Transitions API for smooth transitions
    document.startViewTransition(() => {
      router.push(href);
    });
  };

  return (
    <Link href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  );
};

export default TransitionLink;
