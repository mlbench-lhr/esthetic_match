import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils";

const button = cva(
  [
    "font-semibold",
    "font-raleway",
    "rounded-[38px]",
    "flex",
    "justify-center",
    "items-center",
  ],
  {
    variants: {
      variant: {
        primary: ["bg-accent text-black"],
      },
      size: {
        small: ["text-[12px] md:text-[16px] h-[30px] md:h-[40px]"],
      },
    },
    compoundVariants: [{ variant: "primary", size: "small" }],
    defaultVariants: {
      variant: "primary",
      size: "small",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  isLoading,
  children,
  size,
  ...props
}) => (
  <button
    disabled={isLoading}
    className={cn(button({ variant, size }), className)}
    {...props}
  >
    {isLoading ? "Loading" : children}
  </button>
);

export default Button;
