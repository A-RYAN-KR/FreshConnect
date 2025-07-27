// src/components/ui/image.tsx

import * as React from "react";
import { cn } from "@/lib/utils"; // Assuming you have this from shadcn setup

// Define the props for our Image component, extending standard img attributes
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ className, src, alt, ...props }, ref) => {
    return (
      <img
        src={src}
        alt={alt}
        className={cn("w-full h-auto", className)} // Add some default styling
        ref={ref}
        {...props}
      />
    );
  }
);

Image.displayName = "Image";

export { Image };