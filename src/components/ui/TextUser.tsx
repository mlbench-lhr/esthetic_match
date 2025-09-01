import React, { forwardRef } from "react";
import { cn } from "@/utils";

interface Props {
  children?: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "p" | "p1" | "p2" | "p3";
  onclick?: React.MouseEventHandler;
  Style?: React.CSSProperties;
  dangerouslySetInnerHTML?: { __html: string };
}

const Text = forwardRef<HTMLHeadingElement | HTMLParagraphElement, Props>(
  (props, ref) => {
    const {
      children,
      className,
      as = "p",
      onclick,
      Style,
      dangerouslySetInnerHTML,
    } = props;

    if (dangerouslySetInnerHTML) {
      return (
        <p
          ref={ref}
          className={cn(
            "font-raleway font-normal text-primary text-base md:text-lg",
            className
          )}
          onClick={onclick}
          style={Style}
          dangerouslySetInnerHTML={dangerouslySetInnerHTML}
        />
      );
    }

    const baseClasses = "font-raleway text-primary font-semibold";

    const variants = {
      h1: "text-[28px] md:text-[32px] font-bold",
      h2: "text-[24px] md:text-[28px] font-bold",
      h3: "text-[18px] md:text-[20px] font-semibold",
      h4: "text-[16px] md:text-[18px] font-semibold",
      h5: "text-[14px] md:text-[16px] font-semibold",
      p: "text-[16px] md:text-[18px] font-medium",
      p1: "text-[14px] md:text-[16px] font-medium",
      p2: "text-[12px] md:text-[14px] font-medium",
      p3: "text-[10px] md:text-[12px] font-medium",
    };

    const Component = as === "p1" || as === "p2" || as === "p3" ? "p" : as;
    const appliedClasses =
      as === "p1"
        ? `${baseClasses} ${variants["p1"]}`
        : `${baseClasses} ${variants[as]}`;

    return (
      <Component
        ref={ref}
        className={cn(appliedClasses, className)}
        onClick={onclick}
        style={Style}
      >
        {children}
      </Component>
    );
  }
);

Text.displayName = "Text";

export default Text;
