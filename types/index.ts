export enum UserType {
    ADMIN = "admin",
    GUEST = "guest",
    TEST = 'test',
    BUSINESS_OWNER = 'business_owner',
    SUPPORT = 'support',
    ENTRY_OPERATOR = 'entry_operator',
}


export enum UserStatus {
    ACTIVE = "active",
    BLOCKED = "blocked",
    ARCHIVED = "archived",
    INACTIVE = "in_active",
    INREVIEW = "in_review",
}


export interface BaseInterface {
    id: number;
    created_at: Date;
    updated_at: Date;
}

export interface CategoryInterface extends BaseInterface {
    name: string;
    parent_id: number;
    description: string;
}

export interface UserInterface extends BaseInterface {
    name: string;
    email: string;
    password: string;
    type: UserType;
    status: UserStatus;
    is_verified: boolean;
    last_login: Date;

}

export interface SystemAuditInterface extends BaseInterface {
    action: string;
    user_id: number;
    message: string;
    time_zone: string;
    user_agent: string;
}


export interface BusinessProfileInterface extends BaseInterface {
    user_id: number;
    business_name: string;
    business_email: string;
    business_mobile_number: string;
    business_watsapp_number: string;
    business_address: string;
    business_city: string;
    business_state: string;
    business_country: string;
    business_zipcode: string;
    business_website: string;
    business_logo: string;
    business_description: string;
}

export enum ListingStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    PENDING = "pending",
    REJECTED = "rejected",
    EXPIRED = "expired",
}

export enum ListingType {
    JOB = "job",
    REAL_ESTATE = "real_estate",
    SERVICE = "service",
    PRODUCT = "product",
    CLASSIFIED = "classified",
    EVENT = "event",
    OTHER = "other",
}

export interface ListingInterface extends BaseInterface {
    user_id: number;
    title: string;
    description: string;
    type: ListingType;
    status: ListingStatus;
    price?: number;
    currency?: string;
    location: string;
    city: string;
    state: string;
    contact_name: string;
    contact_phone: string;
    contact_email?: string;
    images: string[];
    tags: string[];
    category_id?: number;
    views_count: number;
    featured: boolean;
    expires_at?: Date;
    views?:number;
}

export enum EventStatus {
    DRAFT = "draft",
    PUBLISHED = "published",
    CANCELLED = "cancelled",
    POSTPONED = "postponed",
    COMPLETED = "completed",
}

export interface EventInterface extends BaseInterface {
    user_id: number;
    title: string;
    description: string;
    short_description?: string;
    venue: string;
    address: string;
    city: string;
    state: string;
    start_date: Date;
    end_date: Date;
    start_time?: string;
    end_time?: string;
    cover_image: string;
    images: string[];
    category_id?: number;
    status: EventStatus;
    is_free: boolean;
    ticket_price?: number;
    ticket_currency?: string;
    ticket_url?: string;
    max_attendees?: number;
    attendees_count: number;
    tags: string[];
}

export enum NotificationType {
    SYSTEM = "system",
    LISTING = "listing",
    EVENT = "event",
    NEWS = "news",
    BLOG = "blog",
    COMMENT = "comment",
    REVIEW = "review",
    PROMOTION = "promotion",
    REMINDER = "reminder",
}

export enum NotificationPriority {
    LOW = "low",
    NORMAL = "normal",
    HIGH = "high",
    URGENT = "urgent",
}

export interface NotificationInterface extends BaseInterface {
    user_id: number;
    title: string;
    message: string;
    type: NotificationType;
    priority: NotificationPriority;
    is_read: boolean;
    read_at?: Date;
    reference_type?: string;
    reference_id?: number;
    action_url?: string;
    image?: string;
}

export enum AuditAction {
    CREATE = "create",
    UPDATE = "update",
    DELETE = "delete",
    LOGIN = "login",
    LOGOUT = "logout",
    ARCHIVE = "archive",
    RESTORE = "restore",
    BLOCK = "block",
    APPROVE = "approve",
    REJECT = "reject",
    EXPORT = "export",
}

export interface TourismPlaceInterface extends BaseInterface {
    name: string;
    description: string;
    short_description?: string;
    location: string;
    latitude?: number;
    longitude?: number;
    city: string;
    state: string;
    category: string;
    cover_image: string;
    images: string[];
    entry_fee?: number;
    currency?: string;
    opening_hours?: string;
    closing_hours?: string;
    closed_days?: string;
    contact_phone?: string;
    website?: string;
    rating: number;
    review_count: number;
    is_featured: boolean;
    tags: string[];
    added_by: number;
}

export interface TourismGuideInterface extends BaseInterface {
    user_id: number;
    name: string;
    bio: string;
    avatar: string;
    languages: string[];
    specializations: string[];
    phone: string;
    email: string;
    whatsapp?: string;
    city: string;
    state: string;
    rating: number;
    review_count: number;
    is_verified: boolean;
    hourly_rate?: number;
    currency?: string;
}

export enum NewsStatus {
    DRAFT = "draft",
    PUBLISHED = "published",
    ARCHIVED = "archived",
}

export interface NewsArticleInterface extends BaseInterface {
    user_id: number;
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    cover_image: string;
    images: string[];
    category_id?: number;
    tags: string[];
    status: NewsStatus;
    is_breaking: boolean;
    is_featured: boolean;
    views_count: number;
    published_at?: Date;
    source?: string;
    source_url?: string;
}

export enum BlogStatus {
    DRAFT = "draft",
    PUBLISHED = "published",
    ARCHIVED = "archived",
}

export interface BlogInterface extends BaseInterface {
    user_id: number;
    title: string;
    slug: string;
    content: string;
    excerpt?: string;
    cover_image: string;
    images: string[];
    category_id?: number;
    tags: string[];
    status: BlogStatus;
    is_featured: boolean;
    views_count: number;
    reading_time_minutes?: number;
    published_at?: Date;
    allow_comments: boolean;
}

export interface CommentInterface extends BaseInterface {
    user_id: number;
    content: string;
    reference_type: string;
    reference_id: number;
    parent_id?: number;
    is_approved: boolean;
    approved_at?: Date;
    approved_by?: number;
    likes_count: number;
    replies_count: number;
}

export enum ReviewRating {
    ONE = 1,
    TWO = 2,
    THREE = 3,
    FOUR = 4,
    FIVE = 5,
}

export interface ReviewInterface extends BaseInterface {
    user_id: number;
    title?: string;
    content: string;
    rating: ReviewRating;
    reference_type: string;
    reference_id: number;
    is_verified_purchase: boolean;
    is_approved: boolean;
    approved_at?: Date;
    approved_by?: number;
    likes_count: number;
    images: string[];
}

export enum BloodGroup {
    A_POSITIVE = "A+",
    A_NEGATIVE = "A-",
    B_POSITIVE = "B+",
    B_NEGATIVE = "B-",
    AB_POSITIVE = "AB+",
    AB_NEGATIVE = "AB-",
    O_POSITIVE = "O+",
    O_NEGATIVE = "O-",
}

export interface BloodDonorInterface extends BaseInterface {
    user_id: number;
    full_name: string;
    blood_group: BloodGroup;
    age: number;
    gender: string;
    phone: string;
    whatsapp?: string;
    email?: string;
    address: string;
    city: string;
    state: string;
    latitude?: number;
    longitude?: number;
    weight_kg?: number;
    last_donation_date?: Date;
    is_available: boolean;
    is_verified: boolean;
    medical_conditions?: string;
    total_donations: number;
}

export interface BloodRequestInterface extends BaseInterface {
    user_id: number;
    patient_name: string;
    blood_group: BloodGroup;
    units_needed: number;
    hospital_name: string;
    hospital_address: string;
    city: string;
    state: string;
    contact_name: string;
    contact_phone: string;
    contact_email?: string;
    urgency: string;
    required_by_date?: Date;
    description?: string;
    is_fulfilled: boolean;
    fulfilled_at?: Date;
}

export enum AdStatus {
    ACTIVE = "active",
    INACTIVE = "inactive",
    PENDING = "pending",
    REJECTED = "rejected",
    EXPIRED = "expired",
}

export enum AdPlacement {
    BANNER_TOP = "banner_top",
    BANNER_BOTTOM = "banner_bottom",
    SIDEBAR = "sidebar",
    INLINE = "inline",
    POPUP = "popup",
    SPONSORED = "sponsored",
}

export interface AdvertisementInterface extends BaseInterface {
    user_id: number;
    title: string;
    description?: string;
    image: string;
    video_url?: string;
    target_url: string;
    placement: AdPlacement;
    status: AdStatus;
    start_date: Date;
    end_date: Date;
    impressions_count: number;
    clicks_count: number;
    budget?: number;
    currency?: string;
    daily_budget?: number;
    tags: string[];
    target_city?: string;
    target_state?: string;
    image_url: string;
    ad_type: string;
}

export interface PageInterface extends BaseInterface {
    title: string;
    slug: string;
    content: string;
    meta_title?: string;
    meta_description?: string;
    is_published: boolean;
    published_at?: Date;
    created_by: number;
    updated_by?: number;
}

export interface FaqInterface extends BaseInterface {
    question: string;
    answer: string;
    category?: string;
    order: number;
    is_published: boolean;
}

export interface ContactMessageInterface extends BaseInterface {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    is_read: boolean;
    read_at?: Date;
    assigned_to?: number;
    replied_at?: Date;
}

export interface ReportInterface extends BaseInterface {
    reporter_id: number;
    reported_user_id?: number;
    reference_type: string;
    reference_id: number;
    reason: string;
    description?: string;
    is_resolved: boolean;
    resolved_at?: Date;
    resolved_by?: number;
    action_taken?: string;
}

export interface SavedItemInterface extends BaseInterface {
    user_id: number;
    reference_type: string;
    reference_id: number;
    notes?: string;
}

export interface FollowInterface extends BaseInterface {
    follower_id: number;
    following_id: number;
}

export interface TagInterface extends BaseInterface {
    name: string;
    slug: string;
    usage_count: number;
}

export interface MediaInterface extends BaseInterface {
    user_id: number;
    filename: string;
    original_name: string;
    mime_type: string;
    size_bytes: number;
    url: string;
    thumbnail_url?: string;
    alt_text?: string;
    reference_type?: string;
    reference_id?: number;
}




// !*** AUTH TYPES


export interface UserMetadata {
    full_name: string;
    role: string;
}

export interface AppMetadata {
    provider: string;
    providers: string[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Identity {
    // Add properties based on your identity structure if needed
    // Currently empty array, so optional
}

export interface User {
    app_metadata: AppMetadata;
    aud: string;
    confirmation_sent_at: string;
    confirmed_at: string;
    created_at: string;
    email: string;
    email_confirmed_at: string;
    id: string;
    identities: Identity[];
    is_anonymous: boolean;
    last_sign_in_at: string;
    phone: string;
    role: string;
    updated_at: string;
    user_metadata: UserMetadata;
}

export interface Session {
    access_token: string;
    expires_at: number;
    expires_in: number;
    refresh_token: string;
    token_type: string;
    user: User;
    weak_password: null | string;
}


export interface NewsItem {
  id: string | number;
  title: string;
  category: string;
  time: string;
  isBreaking?: boolean;
  isTrending?: boolean;
  readTime?: string;
  source?: string;
  excerpt?: string;
  href: string;
}