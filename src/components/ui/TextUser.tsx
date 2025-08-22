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
      h1: "text-[42px] md:text-[56px] font-semibold",
      h2: "text-[36px] md:text-[43px] font-semibold",
      h3: "text-[24px] md:text-[32px] font-semibold",
      h4: "text-[20px] md:text-[30px] font-semibold",
      h5: "text-[14px] md:text-[20px] font-semibold",
      p: "text-[12px] font-medium",
      p1: "text-[18px] md:text-[36px] font-medium",
      p2: "text-[14px] md:text-[18px] font-medium",
      p3: "text-[12px] md:text-[14px] font-medium",
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
