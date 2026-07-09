import React from "react"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface FormFieldProps {
  label: string
  required?: boolean
  children: React.ReactNode
  className?: string
  error?: string
}

export function FormField({ label, required, children, className, error }: FormFieldProps) {
  return (
    <div className={cn("space-y-1", className)}>
      <Label required={required}>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive mt-0.5">{error}</p>}
    </div>
  )
}

interface FormActionsProps {
  children: React.ReactNode
  className?: string
}

export function FormActions({ children, className }: FormActionsProps) {
  return (
    <div className={cn("flex justify-end space-x-3 pt-4 border-t", className)}>
      {children}
    </div>
  )
}
