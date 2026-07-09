# Kohat Connect - Setup Guide

This guide will help you set up and deploy the Kohat Connect platform with Supabase backend.

## Prerequisites

- Node.js 18+ installed
- A Supabase account (free tier works)
- Git installed

## Step 1: Supabase Setup

### 1.1 Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up and create a new project
3. Choose a region close to your target audience
4. Wait for the project to be created (2-3 minutes)

### 1.2 Get Your Credentials

1. Go to Project Settings → API
2. Copy the following values:
   - Project URL
   - anon public key
   - service_role secret key (keep this secret!)

### 1.3 Run Database Migration

1. Go to the SQL Editor in your Supabase dashboard
2. Copy the contents of `supabase/migrations/001_initial_schema.sql`
3. Paste it into the SQL Editor
4. Click "Run" to execute the migration

This will create:
- All necessary tables (profiles, listings, categories, advertisements, etc.)
- Row Level Security (RLS) policies
- Indexes for performance
- Default categories and ad packages

### 1.4 Run Manual Payments Migration

1. In the same SQL Editor
2. Copy the contents of `supabase/migrations/002_manual_payments.sql`
3. Paste it into the SQL Editor
4. Click "Run" to execute the migration

This adds:
- Manual payment fields (receipt upload, transaction ID, etc.)
- Payment review workflow
- Admin payment approval/rejection capabilities

### 1.5 Create Storage Bucket

1. Go to Storage in your Supabase dashboard
2. Create a new bucket named `kohat-connect-uploads`
3. Make it public (or configure as needed)
4. Add the following bucket policy:

```sql
-- Run this in SQL Editor
INSERT INTO storage.buckets (id, name, public)
VALUES ('kohat-connect-uploads', 'kohat-connect-uploads', true);

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'kohat-connect-uploads');

-- Allow public read access
CREATE POLICY "Public can view uploads"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'kohat-connect-uploads');
```

### 1.6 Create First Admin User

1. Enable email confirmation in Supabase Auth settings
2. Sign up a new user through the app at `/auth/signup`
3. Go to your Supabase dashboard → Authentication → Users
4. Find your user and copy their ID
5. Run this SQL to make them an admin:

```sql
UPDATE public.profiles
SET role = 'admin'
WHERE id = 'your-user-id-here';
```

## Step 2: Environment Configuration

### 2.1 Create Environment File

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

### 2.2 Update Site Configuration

Edit `lib/site.ts` to update the production URL:

```typescript
export const site = {
    name: "Kohat Connect",
    description: "Your description",
    url: "https://your-domain.com", // Update this
    // ... other config
}
```

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your application.

## Step 5: Production Deployment

### Option 1: Vercel (Recommended)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
5. Deploy!

### Option 2: Other Platforms

You can deploy to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify
- Self-hosted with Docker

## Features Overview

### Admin Panel (`/admin`)
- **Dashboard**: Overview of platform statistics
- **Users**: Manage user roles and verification
- **Listings**: Approve/reject listings, manage featured status
- **Advertisements**: Manage ad campaigns and performance
- **Categories**: Create and manage business categories
- **Payments**: Review and approve manual payments
- **Analytics**: View platform usage and performance metrics

### Business Dashboard (`/dashboard`)
- **Overview**: View your listings and ads performance
- **My Listings**: Manage your business listings
- **Add Listing**: Create new business listings
- **My Ads**: View your advertisement campaigns
- **Book Ad**: Create new advertisement campaigns

### Public Features
- Browse categories and listings
- Search functionality
- View business details
- Community features (blood donors, lost & found, etc.)
- Responsive design

## Database Schema

### Main Tables

- **profiles**: User profiles with roles (admin, business, user)
- **categories**: Business categories and subcategories
- **listings**: Business listings with details
- **reviews**: User reviews for listings
- **advertisements**: Advertisement campaigns
- **ad_packages**: Pricing packages for ads
- **payments**: Payment records
- **community_posts**: Community content
- **blood_donors**: Blood donor registry

### Security

All tables have Row Level Security (RLS) policies:
- Public can view approved listings and active ads
- Users can manage their own content
- Admins can manage all content
- Service role key bypasses RLS for server operations

## API Endpoints

### Listings
- `GET /api/listings` - Get all listings (with filters)
- `POST /api/listings` - Create new listing
- `GET /api/listings/[id]` - Get single listing
- `PUT /api/listings/[id]` - Update listing
- `DELETE /api/listings/[id]` - Delete listing

### Advertisements
- `GET /api/advertisements` - Get all ads
- `POST /api/advertisements` - Create new ad
- `GET /api/advertisements/[id]` - Get single ad
- `PUT /api/advertisements/[id]` - Update ad
- `DELETE /api/advertisements/[id]` - Delete ad

### Upload
- `POST /api/upload` - Upload images to Supabase Storage

## Customization

### Adding New Categories

1. Go to `/admin/categories`
2. Click "Add Category"
3. Fill in details and save

### Modifying Ad Packages

1. Go to Supabase SQL Editor
2. Update the `ad_packages` table:

```sql
INSERT INTO public.ad_packages (name, description, ad_type, duration_days, price, features)
VALUES (
    'Premium Package',
    'Premium advertising package',
    'banner',
    30,
    5000.00,
    '{"maxImpressions": 20000, "size": "728x90", "priority": "high"}'::jsonb
);
```

### Styling

The project uses Tailwind CSS. Modify:
- `app/globals.css` for global styles
- Component files for specific component styles
- Tailwind config in `tailwind.config.ts` for theme customization

## Troubleshooting

### Authentication Issues
- Ensure email confirmation is enabled in Supabase
- Check environment variables are set correctly
- Verify RLS policies are not blocking operations

### Database Connection
- Verify Supabase URL and keys are correct
- Check Supabase project is active
- Ensure migration was run successfully

### Image Upload Issues
- Verify storage bucket exists and is public
- Check bucket policies allow uploads
- Ensure service role key is set for upload API

### Build Errors
- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check for TypeScript errors

## Security Best Practices

1. **Never commit** `.env.local` or any environment files
2. **Never expose** service role key on client side
3. Use **environment variables** for all sensitive data
4. Enable **email confirmation** for user signup
5. Regularly **rotate** your API keys
6. Monitor **Supabase logs** for suspicious activity
7. Keep **dependencies updated**

## Manual Payment Workflow

The system uses a manual payment verification process:

1. **User Books Ad**: User selects an ad package and fills in advertisement details
2. **Payment Submission**: User provides:
   - Payment method (Bank Transfer, JazzCash, EasyPaisa, Cash Deposit)
   - Transaction ID / Reference Number
   - Payment receipt image URL
   - Additional notes
3. **Admin Review**: Admin reviews the payment in `/admin/payments`
4. **Approval/Rejection**: Admin can:
   - Approve payment → Ad becomes active
   - Reject payment with reason → User can resubmit
5. **Ad Activation**: Approved ads automatically become active

### Payment Methods Supported

- **Bank Transfer**: Direct bank transfer
- **JazzCash**: Mobile wallet payment
- **EasyPaisa**: Mobile wallet payment
- **Cash Deposit**: Physical cash deposit at bank

### Admin Payment Review

Navigate to `/admin/payments` to:
- View all pending payments
- Filter by status (under_review, completed, failed)
- View payment receipts
- Approve or reject payments with reasons
- Track payment history

## Support

For issues or questions:
- Check Supabase documentation: https://supabase.com/docs
- Next.js documentation: https://nextjs.org/docs
- Review the code comments and inline documentation

## License

This project is proprietary. All rights reserved.
