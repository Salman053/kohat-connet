Best Role-Based Auth Steps for Supabase in Next.js
Step 1: Database Design
Create a profiles table with a role column (use enum or text)

Link profiles to auth.users via id foreign key

Set default role for new users

Step 2: Row Level Security (RLS) Policies
Enable RLS on profiles table

Create policies for:

Users reading their own profile

Admins reading all profiles

Role-based update/delete restrictions

Step 3: Supabase Client Setup
Configure browser client for client-side operations

Configure server client with cookie handling for SSR

Set up environment variables (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY)

Step 4: Authentication Context
Create auth context provider wrapping your app

Track user session state

Store user role information alongside user object

Provide role-checking functions

Step 5: Middleware Protection
Create Next.js middleware to check auth on route access

Redirect unauthenticated users to login

Check user roles before allowing route access

Use supabase-ssr package for middleware auth

Step 6: Custom Hooks
useUser() - returns current user with role

useRole() - returns current user's role

useRequireAuth() - redirects if not authenticated

useRequireRole(role) - redirects if user lacks required role

Step 7: Server Component Protection
Use server client in Server Components

Check authentication and roles server-side

Redirect or show different content based on role

Pass role data to client components as props

Step 8: Client Component Protection
Use client-side auth context for conditional rendering

Show/hide UI elements based on user role

Protect API routes with role checks

Handle loading states during auth check

Step 9: Sign-Up Flow with Role Assignment
Create trigger/function to auto-create profile on signup

Assign default role (e.g., 'user')

Optionally allow admin to upgrade roles via admin panel

Step 10: Role Management Admin Panel
Create protected admin routes

Build UI to view and manage user roles

Implement role update functionality with proper authorization

Add audit logging for role changes

Step 11: API Route Protection
Check user role in all API routes

Return 403 Forbidden for unauthorized access

Validate role permissions before processing requests

Use both client and server-side checks

Step 12: Testing & Edge Cases
Test all role-based access scenarios

Handle expired sessions gracefully

Test middleware redirection logic

Verify RLS policies with different user accounts