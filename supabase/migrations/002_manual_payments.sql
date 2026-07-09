-- Add manual payment fields to payments table
ALTER TABLE public.payments
ADD COLUMN receipt_url TEXT,
ADD COLUMN payment_details TEXT,
ADD COLUMN notes TEXT,
ADD COLUMN reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
ADD COLUMN reviewed_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN rejection_reason TEXT;

-- Update payment status type to include 'under_review'
ALTER TYPE payment_status ADD VALUE 'under_review' BEFORE 'completed';

-- Create index for faster payment queries
CREATE INDEX idx_payments_status ON public.payments(status);
CREATE INDEX idx_payments_user_id ON public.payments(user_id);

-- Update RLS policies for manual payments
DROP POLICY IF EXISTS "Users can insert their own payments" ON public.payments;
CREATE POLICY "Users can insert their own payments"
    ON public.payments FOR INSERT
    WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can view all payments" ON public.payments;
CREATE POLICY "Admins can view all payments"
    ON public.payments FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Add policy for admins to update payments (approve/reject)
CREATE POLICY "Admins can update payments"
    ON public.payments FOR UPDATE
    USING (
        EXISTS (
            SELECT 1 FROM public.profiles
            WHERE id = auth.uid() AND role = 'admin'
        )
    );
