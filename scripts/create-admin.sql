-- ============================================================================
-- Create admin user directly (bypasses auth trigger by disabling it momentarily)
-- ============================================================================
-- Run this in: https://supabase.com/dashboard/project/mtoyvfmvbnjotzqmephw/sql/new

-- 1. Drop trigger temporarily (it's broken anyway)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 2. Create admin in auth.users
INSERT INTO auth.users (
    instance_id, id, aud, role, email,
    encrypted_password, email_confirmed_at,
    confirmation_sent_at, confirmation_token,
    recovery_token, email_change_token_new,
    email_change, raw_app_meta_data,
    raw_user_meta_data, created_at,
    updated_at, is_super_admin
) VALUES (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid(),
    'authenticated',
    'authenticated',
    'salmankhanm859@gmail.com',
    crypt('salmanKhan12@', gen_salt('bf')),
    NOW(),
    NOW(),
    '', '', '', '',
    '{"provider": "email", "providers": ["email"]}',
    '{"full_name": "Muhammad Salman Khan", "role": "admin"}',
    NOW(), NOW(), FALSE
)
RETURNING id;

-- 3. Create profile (use the UUID from step 2)
INSERT INTO public.profiles (id, email, full_name, role)
VALUES (
    (SELECT id FROM auth.users WHERE email = 'salmankhanm859@gmail.com'),
    'salmankhanm859@gmail.com',
    'Muhammad Salman Khan',
    'admin'
);

-- 4. Re-create trigger
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Verify
SELECT id, email, role FROM public.profiles WHERE email = 'salmankhanm859@gmail.com';
