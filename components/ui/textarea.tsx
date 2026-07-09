import * as React from "react"

import { cn } from "@/lib/utils"
import { formControlVariants } from "@/components/ui/form-control"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        formControlVariants({ size: "default" }),
        "flex field-sizing-content min-h-16 w-full px-2.5 py-2 md:text-xs",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }
