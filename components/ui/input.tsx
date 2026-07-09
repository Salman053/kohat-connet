import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"
import { formControlVariants } from "@/components/ui/form-control"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        formControlVariants({ size: "default" }),
        "w-full min-w-0 file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-xs file:font-medium file:text-foreground md:text-xs",
        className
      )}
      {...props}
    />
  )
}

export { Input }
