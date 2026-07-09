import * as React from "react"
import { cn } from "@/lib/utils"

function Label({ className, children, required, ...props }: React.ComponentProps<"label"> & { required?: boolean }) {
  return (
    <label
      data-slot="label"
      className={cn(
        "block text-sm font-medium text-foreground mb-1",
        className
      )}
      {...props}
    >
      {children}
      {required && <span className="text-destructive ml-0.5">*</span>}
    </label>
  )
}

export { Label }
