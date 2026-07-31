import { forwardRef } from "react";
import { Button, type ButtonProps } from "./Button";
import { cn } from "@aurora-ui/utils";

export interface IconButtonProps extends Omit<ButtonProps, "leadingIcon" | "trailingIcon"> {
  "aria-label": string;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, size = "md", children, ...props }, ref) => {
    const activeSize = size || "md";
    const sizeClasses = {
      sm: "p-1.5 h-8 w-8 min-w-8",
      md: "p-2.5 h-10 w-10 min-w-10",
      lg: "p-3.5 h-12 w-12 min-w-12",
    };

    return (
      <Button
        ref={ref}
        size={activeSize}
        className={cn("justify-center p-0", sizeClasses[activeSize], className)}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

IconButton.displayName = "IconButton";
export default IconButton;