import { cva } from "class-variance-authority"

const formControlVariants = cva(
  [
    "rounded-none border border-input bg-transparent text-xs transition-colors outline-none",
    "placeholder:text-muted-foreground",
    "focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50",
    "disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50",
    "aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20",
    "dark:bg-input/30",
    "dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
  ],
  {
    variants: {
      size: {
        xs: "h-6 px-2 py-0.5 text-[11px]",
        sm: "h-7 px-2.5 py-1 text-xs",
        default: "h-8 px-2.5 py-1",
        lg: "h-9 px-3 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
)

export { formControlVariants }
