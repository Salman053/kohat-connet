-- ============================================================================
-- Complete Schema Migration — Kohat Connect
-- Fixed: All enum types explicitly qualified with public schema
-- Idempotent — safe to re-run.
-- ============================================================================

-- ===== EXTENSIONS =====
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===== CUSTOM TYPES =====
DO $$ BEGIN 
    CREATE TYPE public.user_role AS ENUM ('admin', 'business', 'user'); 
EXCEPTION WHEN duplicate_object THEN NULL; 
END $$;

DO $$ BEGIN 
    CREATE TYPE public.listing_status AS ENUM ('pending', 'approved', 'rejected', 'expired'); 
EXCEPTION WHEN duplicate_object THEN NULL; 
END $$;

DO $$ BEGIN 
    CREATE TYPE public.ad_status AS ENUM ('pending', 'active', 'paused', 'completed', 'cancelled'); 
EXCEPTION WHEN duplicate_object THEN NULL; 
END $$;

DO $$ BEGIN 
    CREATE TYPE public.ad_type AS ENUM ('banner', 'sidebar', 'featured', 'sponsored'); 
EXCEPTION WHEN duplicate_object THEN NULL; 
END $$;

DO $$ BEGIN 
    CREATE TYPE public.payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded'); 
EXCEPTION WHEN duplicate_object THEN NULL; 
END $$;

DO $$ BEGIN 
    ALTER TYPE public.payment_status ADD VALUE 'under_review' BEFORE 'completed'; 
EXCEPTION WHEN duplicate_object THEN NULL; 
END $$;

-- ===== TABLES =====
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    phone TEXT,
    role public.user_role DEFAULT 'user',
    avatar_url TEXT,
    business_name TEXT,
    business_address TEXT,
    business_phone TEXT,
    business_description TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    slug TEXT UNIQUE NOT NULL,
    image_url TEXT,
    type TEXT,
    parent_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    icon TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.listings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    address TEXT,
    phone TEXT,
    email TEXT,
    website TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    images TEXT[],
    price_range TEXT,
    rating DECIMAL(2, 1) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    status public.listing_status DEFAULT 'pending',
    is_featured BOOLEAN DEFAULT FALSE,
    is_verified BOOLEAN DEFAULT FALSE,
    views INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    expires_at TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    listing_id UUID REFERENCES public.listings(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(listing_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.advertisements (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    ad_type public.ad_type NOT NULL,
    ad_status public.ad_status DEFAULT 'pending',
    redirect_url TEXT,
    start_date TIMESTAMP WITH TIME ZONE NOT NULL,
    end_date TIMESTAMP WITH TIME ZONE NOT NULL,
    impressions INTEGER DEFAULT 0,
    clicks INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.ad_packages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    ad_type public.ad_type NOT NULL,
    duration_days INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    features JSONB,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.payments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    advertisement_id UUID REFERENCES public.advertisements(id) ON DELETE SET NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency TEXT DEFAULT 'PKR',
    status public.payment_status DEFAULT 'pending',
    payment_method TEXT,
    transaction_id TEXT,
    stripe_payment_intent_id TEXT,
    receipt_url TEXT,
    payment_details TEXT,
    notes TEXT,
    reviewed_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    rejection_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.community_posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    content TEXT,
    post_type TEXT,
    images TEXT[],
    is_approved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.comments (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    post_id UUID REFERENCES public.community_posts(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.blood_donors (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    blood_type TEXT NOT NULL,
    phone TEXT NOT NULL,
    age INTEGER,
    last_donation_date DATE,
    is_available BOOLEAN DEFAULT TRUE,
    city TEXT,
    state TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT,
    entity_id UUID,
    details JSONB,
    ip_address TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.blogs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    cover_image TEXT,
    images TEXT[],
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    tags TEXT[],
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    is_featured BOOLEAN DEFAULT FALSE,
    views_count INTEGER DEFAULT 0,
    reading_time_minutes INTEGER,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.tourism_places (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    short_description TEXT,
    location TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    city TEXT,
    state TEXT DEFAULT 'KPK',
    category TEXT,
    cover_image TEXT,
    images TEXT[],
    entry_fee DECIMAL(10, 2),
    currency TEXT DEFAULT 'PKR',
    opening_hours TEXT,
    closing_hours TEXT,
    closed_days TEXT,
    contact_phone TEXT,
    website TEXT,
    rating DECIMAL(2, 1) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT FALSE,
    tags TEXT[],
    added_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.events (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    short_description TEXT,
    venue TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    start_time TEXT,
    end_time TEXT,
    cover_image TEXT,
    images TEXT[],
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'cancelled', 'postponed', 'completed')),
    is_free BOOLEAN DEFAULT TRUE,
    ticket_price DECIMAL(10, 2),
    ticket_currency TEXT DEFAULT 'PKR',
    ticket_url TEXT,
    max_attendees INTEGER,
    attendees_count INTEGER DEFAULT 0,
    tags TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.reports (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    reporter_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    reported_user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    reference_type TEXT NOT NULL,
    reference_id UUID NOT NULL,
    reason TEXT NOT NULL,
    description TEXT,
    is_resolved BOOLEAN DEFAULT FALSE,
    resolved_at TIMESTAMP WITH TIME ZONE,
    resolved_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    action_taken TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ===== INDEXES =====
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON public.categories(slug);
CREATE INDEX IF NOT EXISTS idx_listings_user_id ON public.listings(user_id);
CREATE INDEX IF NOT EXISTS idx_listings_category_id ON public.listings(category_id);
CREATE INDEX IF NOT EXISTS idx_listings_status ON public.listings(status);
CREATE INDEX IF NOT EXISTS idx_listings_featured ON public.listings(is_featured);
CREATE INDEX IF NOT EXISTS idx_reviews_listing_id ON public.reviews(listing_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON public.reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_advertisements_user_id ON public.advertisements(user_id);
CREATE INDEX IF NOT EXISTS idx_advertisements_status ON public.advertisements(ad_status);
CREATE INDEX IF NOT EXISTS idx_advertisements_dates ON public.advertisements(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON public.payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON public.payments(status);
CREATE INDEX IF NOT EXISTS idx_community_posts_user_id ON public.community_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_community_posts_type ON public.community_posts(post_type);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON public.comments(post_id);
CREATE INDEX IF NOT EXISTS idx_blood_donors_blood_type ON public.blood_donors(blood_type);
CREATE INDEX IF NOT EXISTS idx_blogs_slug ON public.blogs(slug);
CREATE INDEX IF NOT EXISTS idx_blogs_status ON public.blogs(status);
CREATE INDEX IF NOT EXISTS idx_blogs_published_at ON public.blogs(published_at);
CREATE INDEX IF NOT EXISTS idx_tourism_places_category ON public.tourism_places(category);
CREATE INDEX IF NOT EXISTS idx_tourism_places_featured ON public.tourism_places(is_featured);
CREATE INDEX IF NOT EXISTS idx_events_start_date ON public.events(start_date);
CREATE INDEX IF NOT EXISTS idx_events_status ON public.events(status);
CREATE INDEX IF NOT EXISTS idx_reports_resolved ON public.reports(is_resolved);

-- ===== RLS POLICIES =====
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update any profile" ON public.profiles;

CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admins can update any profile" ON public.profiles FOR UPDATE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Categories are viewable by everyone" ON public.categories;
DROP POLICY IF EXISTS "Admins can insert categories" ON public.categories;
DROP POLICY IF EXISTS "Admins can update categories" ON public.categories;
DROP POLICY IF EXISTS "Admins can delete categories" ON public.categories;

CREATE POLICY "Categories are viewable by everyone" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Admins can insert categories" ON public.categories FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can update categories" ON public.categories FOR UPDATE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can delete categories" ON public.categories FOR DELETE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Approved listings are viewable by everyone" ON public.listings;
DROP POLICY IF EXISTS "Users can view their own listings" ON public.listings;
DROP POLICY IF EXISTS "Admins can view all listings" ON public.listings;
DROP POLICY IF EXISTS "Authenticated users can insert listings" ON public.listings;
DROP POLICY IF EXISTS "Users can update their own listings" ON public.listings;
DROP POLICY IF EXISTS "Admins can update any listing" ON public.listings;
DROP POLICY IF EXISTS "Users can delete their own listings" ON public.listings;
DROP POLICY IF EXISTS "Admins can delete any listing" ON public.listings;

CREATE POLICY "Approved listings are viewable by everyone" ON public.listings FOR SELECT USING (status = 'approved');
CREATE POLICY "Users can view their own listings" ON public.listings FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Admins can view all listings" ON public.listings FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Authenticated users can insert listings" ON public.listings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own listings" ON public.listings FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Admins can update any listing" ON public.listings FOR UPDATE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Users can delete their own listings" ON public.listings FOR DELETE USING (user_id = auth.uid());
CREATE POLICY "Admins can delete any listing" ON public.listings FOR DELETE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Reviews are viewable by everyone" ON public.reviews;
DROP POLICY IF EXISTS "Authenticated users can insert reviews" ON public.reviews;
DROP POLICY IF EXISTS "Users can update their own reviews" ON public.reviews;
DROP POLICY IF EXISTS "Users can delete their own reviews" ON public.reviews;

CREATE POLICY "Reviews are viewable by everyone" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own reviews" ON public.reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own reviews" ON public.reviews FOR DELETE USING (auth.uid() = user_id);

ALTER TABLE public.advertisements ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Active ads are viewable by everyone" ON public.advertisements;
DROP POLICY IF EXISTS "Users can view their own ads" ON public.advertisements;
DROP POLICY IF EXISTS "Admins can view all ads" ON public.advertisements;
DROP POLICY IF EXISTS "Authenticated users can insert ads" ON public.advertisements;
DROP POLICY IF EXISTS "Users can update their own ads" ON public.advertisements;
DROP POLICY IF EXISTS "Admins can update any ad" ON public.advertisements;

CREATE POLICY "Active ads are viewable by everyone" ON public.advertisements FOR SELECT USING (ad_status = 'active');
CREATE POLICY "Users can view their own ads" ON public.advertisements FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Admins can view all ads" ON public.advertisements FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Authenticated users can insert ads" ON public.advertisements FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own ads" ON public.advertisements FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Admins can update any ad" ON public.advertisements FOR UPDATE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own payments" ON public.payments;
DROP POLICY IF EXISTS "Admins can view all payments" ON public.payments;
DROP POLICY IF EXISTS "Users can insert their own payments" ON public.payments;
DROP POLICY IF EXISTS "Admins can update payments" ON public.payments;

CREATE POLICY "Users can view their own payments" ON public.payments FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Admins can view all payments" ON public.payments FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Users can insert their own payments" ON public.payments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can update payments" ON public.payments FOR UPDATE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

ALTER TABLE public.community_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Approved posts are viewable by everyone" ON public.community_posts;
DROP POLICY IF EXISTS "Users can view their own posts" ON public.community_posts;
DROP POLICY IF EXISTS "Admins can view all posts" ON public.community_posts;
DROP POLICY IF EXISTS "Authenticated users can insert posts" ON public.community_posts;
DROP POLICY IF EXISTS "Users can update their own posts" ON public.community_posts;
DROP POLICY IF EXISTS "Admins can update any post" ON public.community_posts;

CREATE POLICY "Approved posts are viewable by everyone" ON public.community_posts FOR SELECT USING (is_approved = true);
CREATE POLICY "Users can view their own posts" ON public.community_posts FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Admins can view all posts" ON public.community_posts FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Authenticated users can insert posts" ON public.community_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own posts" ON public.community_posts FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY "Admins can update any post" ON public.community_posts FOR UPDATE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Comments are viewable by everyone" ON public.comments;
DROP POLICY IF EXISTS "Authenticated users can insert comments" ON public.comments;
DROP POLICY IF EXISTS "Users can update their own comments" ON public.comments;
DROP POLICY IF EXISTS "Users can delete their own comments" ON public.comments;

CREATE POLICY "Comments are viewable by everyone" ON public.comments FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert comments" ON public.comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own comments" ON public.comments FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own comments" ON public.comments FOR DELETE USING (auth.uid() = user_id);

ALTER TABLE public.blood_donors ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Blood donors are viewable by everyone" ON public.blood_donors;
DROP POLICY IF EXISTS "Users can insert their own blood donor info" ON public.blood_donors;
DROP POLICY IF EXISTS "Users can update their own blood donor info" ON public.blood_donors;

CREATE POLICY "Blood donors are viewable by everyone" ON public.blood_donors FOR SELECT USING (true);
CREATE POLICY "Users can insert their own blood donor info" ON public.blood_donors FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);
CREATE POLICY "Users can update their own blood donor info" ON public.blood_donors FOR UPDATE USING (auth.uid() = user_id OR user_id IS NULL);

ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can view all activity logs" ON public.activity_logs;
DROP POLICY IF EXISTS "System can insert activity logs" ON public.activity_logs;

CREATE POLICY "Admins can view all activity logs" ON public.activity_logs FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "System can insert activity logs" ON public.activity_logs FOR INSERT WITH CHECK (true);

ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Published blogs are viewable by everyone" ON public.blogs;
DROP POLICY IF EXISTS "Admins can view all blogs" ON public.blogs;
DROP POLICY IF EXISTS "Authors can view their own blogs" ON public.blogs;
DROP POLICY IF EXISTS "Admins can insert blogs" ON public.blogs;
DROP POLICY IF EXISTS "Admins can update blogs" ON public.blogs;
DROP POLICY IF EXISTS "Admins can delete blogs" ON public.blogs;

CREATE POLICY "Published blogs are viewable by everyone" ON public.blogs FOR SELECT USING (status = 'published');
CREATE POLICY "Admins can view all blogs" ON public.blogs FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Authors can view their own blogs" ON public.blogs FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Admins can insert blogs" ON public.blogs FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can update blogs" ON public.blogs FOR UPDATE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can delete blogs" ON public.blogs FOR DELETE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

ALTER TABLE public.tourism_places ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Tourism places are viewable by everyone" ON public.tourism_places;
DROP POLICY IF EXISTS "Admins can insert tourism places" ON public.tourism_places;
DROP POLICY IF EXISTS "Admins can update tourism places" ON public.tourism_places;
DROP POLICY IF EXISTS "Admins can delete tourism places" ON public.tourism_places;

CREATE POLICY "Tourism places are viewable by everyone" ON public.tourism_places FOR SELECT USING (true);
CREATE POLICY "Admins can insert tourism places" ON public.tourism_places FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can update tourism places" ON public.tourism_places FOR UPDATE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can delete tourism places" ON public.tourism_places FOR DELETE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Published events are viewable by everyone" ON public.events;
DROP POLICY IF EXISTS "Admins can view all events" ON public.events;
DROP POLICY IF EXISTS "Admins can insert events" ON public.events;
DROP POLICY IF EXISTS "Admins can update events" ON public.events;
DROP POLICY IF EXISTS "Admins can delete events" ON public.events;

CREATE POLICY "Published events are viewable by everyone" ON public.events FOR SELECT USING (status = 'published');
CREATE POLICY "Admins can view all events" ON public.events FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can insert events" ON public.events FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can update events" ON public.events FOR UPDATE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Admins can delete events" ON public.events FOR DELETE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins can view all reports" ON public.reports;
DROP POLICY IF EXISTS "Authenticated users can insert reports" ON public.reports;
DROP POLICY IF EXISTS "Admins can update reports" ON public.reports;

CREATE POLICY "Admins can view all reports" ON public.reports FOR SELECT USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));
CREATE POLICY "Authenticated users can insert reports" ON public.reports FOR INSERT WITH CHECK (auth.uid() = reporter_id);
CREATE POLICY "Admins can update reports" ON public.reports FOR UPDATE USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- ===== FUNCTIONS & TRIGGERS =====
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing triggers before recreating
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
DROP TRIGGER IF EXISTS update_categories_updated_at ON public.categories;
DROP TRIGGER IF EXISTS update_listings_updated_at ON public.listings;
DROP TRIGGER IF EXISTS update_reviews_updated_at ON public.reviews;
DROP TRIGGER IF EXISTS update_advertisements_updated_at ON public.advertisements;
DROP TRIGGER IF EXISTS update_ad_packages_updated_at ON public.ad_packages;
DROP TRIGGER IF EXISTS update_payments_updated_at ON public.payments;
DROP TRIGGER IF EXISTS update_community_posts_updated_at ON public.community_posts;
DROP TRIGGER IF EXISTS update_blood_donors_updated_at ON public.blood_donors;
DROP TRIGGER IF EXISTS update_blogs_updated_at ON public.blogs;
DROP TRIGGER IF EXISTS update_tourism_places_updated_at ON public.tourism_places;
DROP TRIGGER IF EXISTS update_events_updated_at ON public.events;
DROP TRIGGER IF EXISTS update_reports_updated_at ON public.reports;

-- Create triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_listings_updated_at BEFORE UPDATE ON public.listings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_advertisements_updated_at BEFORE UPDATE ON public.advertisements FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_ad_packages_updated_at BEFORE UPDATE ON public.ad_packages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_community_posts_updated_at BEFORE UPDATE ON public.community_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blood_donors_updated_at BEFORE UPDATE ON public.blood_donors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON public.blogs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tourism_places_updated_at BEFORE UPDATE ON public.tourism_places FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_events_updated_at BEFORE UPDATE ON public.events FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reports_updated_at BEFORE UPDATE ON public.reports FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Auth trigger: auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    user_role_text TEXT;
BEGIN
    -- Get role from metadata or default to 'user'
    user_role_text := COALESCE(NEW.raw_user_meta_data->>'role', 'user');
    
    INSERT INTO public.profiles (id, email, full_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        NEW.raw_user_meta_data->>'full_name',
        user_role_text::public.user_role
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ===== SEED DATA =====

-- Categories (with ON CONFLICT DO NOTHING to prevent duplicates)
INSERT INTO public.categories (name, description, slug, type, image_url, sort_order) VALUES
('Beauty & Wellness', 'Salons, spas, barbers, bridal makeup, henna artists, and cosmetic shops across Kohat and KPK.', 'beauty-wellness', 'beauty', 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80', 1),
('Tourism', 'Historical sites, natural attractions, religious destinations, and adventure spots in Kohat and KPK.', 'tourism', 'tourism', 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80', 2),
('Local Business', 'Essential services, shops, and professional establishments serving the Kohat community.', 'local-business', 'business', 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80', 3),
('Food & Dining', 'Restaurants, street food, bakeries, and culinary experiences across Kohat and KPK.', 'food-dining', 'food', 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80', 4),
('Events', 'Cultural festivals, sports tournaments, business expos, and community gatherings in Kohat.', 'events', 'event', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80', 5),
('Services', 'Professional and home services available across Kohat and KPK region.', 'services', 'service', 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=800&q=80', 6),
('Community', 'Local forums, lost & found, emergency contacts, news, and community-driven content.', 'community', 'community', 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80', 7)
ON CONFLICT (slug) DO NOTHING;

-- Ad packages
INSERT INTO public.ad_packages (name, description, ad_type, duration_days, price, features) VALUES
('Starter Banner', 'Perfect for small businesses', 'banner', 7, 500.00, '{"maxImpressions": 1000, "size": "728x90"}'::jsonb),
('Standard Banner', 'Great for growing businesses', 'banner', 30, 1500.00, '{"maxImpressions": 5000, "size": "728x90"}'::jsonb),
('Premium Banner', 'Maximum exposure', 'banner', 30, 3000.00, '{"maxImpressions": 15000, "size": "728x90"}'::jsonb),
('Featured Listing', 'Highlight your business', 'featured', 30, 2000.00, '{"priority": "high", "badge": true}'::jsonb),
('Sponsored Post', 'Promote your content', 'sponsored', 7, 1000.00, '{"socialMedia": true, "newsletter": true}'::jsonb)
ON CONFLICT DO NOTHING;