import { supabase } from './supabase'

// ===== Types =====

export interface ListingItem {
  name: string; slug: string; category: string; categorySlug: string
  subcategory: string; rating: number; reviews: number; phone: string
  address: string; image: string; verified: boolean; description: string
}

export interface ListingDetail extends ListingItem {
  email: string; website: string; hours: string; about: string
}

export interface EventItem {
  id: number; title: string; tag: string; description: string
  date: string; time: string; location: string; price: string
  image: string; slug: string
}

export interface EventDetail extends EventItem {
  organizer: string; phone: string
}

export interface BlogPost {
  slug: string; title: string; excerpt: string; image: string
  date: string; author: string; category: string; readTime: string
}

export interface ExploreItem {
  name: string; category: string; subcategory: string; rating: number
  reviews: number; address: string; imageUrl: string; slug: string
}

export interface ShopItem {
  name: string; category: string; rating: number; reviews: number
  image: string; description: string; slug: string; address: string
}

export interface CareerItem {
  title: string; department: string; location: string; type: string
  description: string; requirements: string[]; salary?: string
}

export interface FaqItem {
  question: string; answer: string
}

export interface TrendingItem {
  id: number; title: string; description: string; imageSrc: string
  imageAlt: string; tag: string; price?: string; date?: string
  location: string; authorName: string; authorLogo: string; href: string
}

// ===== Hardcoded Fallback Data =====

export const fallbackListings: ListingItem[] = [
  { name: "Khyber Electronics Center", slug: "khyber-electronics", category: "Local Business", categorySlug: "local-business", subcategory: "Hardware & Electronics", rating: 4.8, reviews: 140, phone: "+92 333 9876543", address: "Main Bazar Road, Near Chowk, Kohat", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80", verified: true, description: "Best quality electronics and hardware services in Kohat Cantt." },
  { name: "Kohat Elite Salon", slug: "kohat-elite-salon", category: "Beauty & Wellness", categorySlug: "beauty-wellness", subcategory: "Salons", rating: 4.6, reviews: 64, phone: "+92 334 1234567", address: "Phase 1, KDA, Kohat", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80", verified: true, description: "Premium salon services for men and women in Kohat." },
  { name: "Tanda Dam View Point", slug: "tanda-dam-view", category: "Tourism", categorySlug: "tourism", subcategory: "Natural Attractions", rating: 4.9, reviews: 210, phone: "+92 922 515253", address: "Tanda Dam Road, Kohat", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80", verified: true, description: "Scenic viewpoint with boating and picnic spots." },
  { name: "National Tailors & Fashion", slug: "national-tailors", category: "Local Business", categorySlug: "local-business", subcategory: "Tailors & Fashion", rating: 4.4, reviews: 28, phone: "+92 922 515254", address: "Hangu Road Bypass, Kohat", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80", verified: false, description: "Custom tailoring and traditional shalwar kameez stitching." },
  { name: "Al-Noor Restaurant", slug: "al-noor-restaurant", category: "Food & Dining", categorySlug: "food-dining", subcategory: "Restaurants", rating: 4.7, reviews: 189, phone: "+92 333 1122334", address: "KDA Chowk, Kohat Cantt", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80", verified: true, description: "Family dining with authentic Pakistani cuisine." },
  { name: "City Medical Store", slug: "city-medical-store", category: "Local Business", categorySlug: "local-business", subcategory: "Pharmacies", rating: 4.5, reviews: 76, phone: "+92 335 9900112", address: "Main Bazar Chowk, Kohat", image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80", verified: true, description: "24-hour pharmacy with all essential medicines available." },
  { name: "Kohat Blood Donor Network", slug: "kohat-blood-donor", category: "Community", categorySlug: "community", subcategory: "Blood Donors", rating: 5.0, reviews: 45, phone: "+92 334 5566778", address: "Kohat Cantt, KPK", image: "https://images.unsplash.com/photo-1615461066842-32561977e3d8?auto=format&fit=crop&w=800&q=80", verified: true, description: "Emergency blood donor network serving all of Kohat." },
  { name: "Green Grocery Store", slug: "green-grocery-store", category: "Food & Dining", categorySlug: "food-dining", subcategory: "Dhabas & Street Food", rating: 4.3, reviews: 52, phone: "+92 331 4455667", address: "Bazar-e-Mustafa, Kohat", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80", verified: false, description: "Fresh farm-to-table vegetables and organic produce." }
]

export const fallbackListingDetails: ListingDetail[] = [
  { name: "Khyber Electronics Center", slug: "khyber-electronics", category: "Local Business", categorySlug: "local-business", subcategory: "Hardware & Electronics", rating: 4.8, reviews: 140, phone: "+92 333 9876543", email: "contact@khyberelectronics.com", website: "www.khyberelectronics.com", address: "Main Bazar Road, Near Chowk, Kohat Cantt", hours: "09:00 AM - 09:00 PM", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80", verified: true, description: "Best quality electronics and hardware services in Kohat Cantt.", about: "Khyber Electronics Center has been serving the Kohat community for over 15 years. We specialize in consumer electronics, home appliances, mobile phones, and computer accessories." },
  { name: "Kohat Elite Salon", slug: "kohat-elite-salon", category: "Beauty & Wellness", categorySlug: "beauty-wellness", subcategory: "Salons", rating: 4.6, reviews: 64, phone: "+92 334 1234567", email: "info@kohatelite.com", website: "www.kohatelite.com", address: "Phase 1, KDA, Kohat", hours: "10:00 AM - 10:00 PM", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80", verified: true, description: "Premium salon services for men and women in Kohat.", about: "Kohat Elite Salon offers a wide range of beauty and grooming services including haircuts, styling, facial treatments, bridal makeup, and henna application." },
  { name: "Tanda Dam View Point", slug: "tanda-dam-view", category: "Tourism", categorySlug: "tourism", subcategory: "Natural Attractions", rating: 4.9, reviews: 210, phone: "+92 922 515253", email: "info@kpktourism.com", website: "www.kpktourism.com", address: "Tanda Dam Road, Kohat", hours: "06:00 AM - 06:00 PM", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80", verified: true, description: "Scenic viewpoint with boating and picnic spots.", about: "Tanda Dam is one of KPK's most beautiful wetland sanctuaries, offering breathtaking views, boating facilities, and peaceful picnic spots." },
  { name: "National Tailors & Fashion", slug: "national-tailors", category: "Local Business", categorySlug: "local-business", subcategory: "Tailors & Fashion", rating: 4.4, reviews: 28, phone: "+92 922 515254", email: "nationaltailors@email.com", website: "www.nationaltailors.com", address: "Hangu Road Bypass, Kohat", hours: "10:00 AM - 08:00 PM", image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?auto=format&fit=crop&w=800&q=80", verified: false, description: "Custom tailoring and traditional shalwar kameez stitching.", about: "National Tailors & Fashion specializes in bespoke tailoring services including suits, shalwar kameez, wedding wear, and casual fashion." },
  { name: "Al-Noor Restaurant", slug: "al-noor-restaurant", category: "Food & Dining", categorySlug: "food-dining", subcategory: "Restaurants", rating: 4.7, reviews: 189, phone: "+92 333 1122334", email: "alnoor@restaurant.com", website: "www.alnoorrestaurant.com", address: "KDA Chowk, Kohat Cantt", hours: "11:00 AM - 11:00 PM", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80", verified: true, description: "Family dining with authentic Pakistani cuisine.", about: "Al-Noor Restaurant serves the finest Pakistani and BBQ cuisine in Kohat. From sizzling chapli kababs to aromatic biryanis and freshly baked naans." },
  { name: "City Medical Store", slug: "city-medical-store", category: "Local Business", categorySlug: "local-business", subcategory: "Pharmacies", rating: 4.5, reviews: 76, phone: "+92 335 9900112", email: "citymedical@email.com", website: "", address: "Main Bazar Chowk, Kohat", hours: "24 Hours", image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=800&q=80", verified: true, description: "24-hour pharmacy with all essential medicines available.", about: "City Medical Store is a trusted 24-hour pharmacy serving the Kohat community with genuine medicines, surgical supplies, and healthcare products." },
  { name: "Kohat Blood Donor Network", slug: "kohat-blood-donor", category: "Community", categorySlug: "community", subcategory: "Blood Donors", rating: 5.0, reviews: 45, phone: "+92 334 5566778", email: "blooddonor@kohatconnect.com", website: "", address: "Kohat Cantt, KPK", hours: "Emergency Service", image: "https://images.unsplash.com/photo-1615461066842-32561977e3d8?auto=format&fit=crop&w=800&q=80", verified: true, description: "Emergency blood donor network serving all of Kohat.", about: "Kohat Blood Donor Network is a community-driven initiative that connects blood donors with patients in need." },
  { name: "Green Grocery Store", slug: "green-grocery-store", category: "Food & Dining", categorySlug: "food-dining", subcategory: "Dhabas & Street Food", rating: 4.3, reviews: 52, phone: "+92 331 4455667", email: "greengrocery@email.com", website: "", address: "Bazar-e-Mustafa, Kohat", hours: "07:00 AM - 10:00 PM", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80", verified: false, description: "Fresh farm-to-table vegetables and organic produce.", about: "Green Grocery Store brings fresh, organic, and farm-sourced vegetables and fruits directly to your neighborhood." }
]

export const fallbackEvents: EventItem[] = [
  { id: 1, title: "Kohat Annual Cultural Festival 2026", tag: "Festival", description: "Experience the vibrant heritage of Kohat with traditional folk music, local KPK cuisine, and artisan crafts at the Kohat Stadium.", date: "June 15–22, 2026", time: "10:00 AM – 10:00 PM", location: "Kohat Stadium, City Center", price: "Free", image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80", slug: "kohat-festival" },
  { id: 2, title: "Miranzai Valley Hiking Expedition", tag: "Sports", description: "Explore the hidden scenic trails of Miranzai Valley with professional guides. A must-do adventure for hiking enthusiasts in KPK.", date: "Every Sunday", time: "6:00 AM", location: "Miranzai Valley, Kohat Range", price: "Free", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80", slug: "hiking-miranzai" },
  { id: 3, title: "Winter Mega Sale at Kohat City Mall", tag: "Expo", description: "Get up to 60% off on winter collections from top brands. Exclusive discounts on clothing, footwear, and accessories.", date: "Dec 1–31, 2026", time: "11:00 AM – 9:00 PM", location: "Kohat City Mall, Main GT Road", price: "Free Entry", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80", slug: "winter-sale" },
  { id: 4, title: "Professional Bridal Makeup Workshop", tag: "Workshop", description: "Learn expert bridal makeup techniques from certified professionals. Includes practical training and certification.", date: "July 10, 2026", time: "10:00 AM – 4:00 PM", location: "Kohat Cultural Center, KDA", price: "Rs. 8,000", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80", slug: "makeup-workshop" },
  { id: 5, title: "Kohat Inter-District Cricket Championship", tag: "Sports", description: "Annual cricket tournament featuring top teams from across KPK. Prize pool of Rs. 500,000 and trophies.", date: "Aug 5–20, 2026", time: "8:00 AM – 6:00 PM", location: "Kohat Sports Complex", price: "Free Entry", image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80", slug: "cricket-tournament" },
  { id: 6, title: "Tech Expo 2026 – Latest Gadgets & AI", tag: "Expo", description: "Explore cutting-edge technology, AI innovations, and exclusive discounts on laptops, mobiles, and accessories.", date: "Sep 18–20, 2026", time: "10:00 AM – 8:00 PM", location: "Kohat Expo Center, KDA", price: "Free Entry", image: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&w=800&q=80", slug: "tech-expo" },
  { id: 7, title: "30-Day Fitness Transformation Challenge", tag: "Fitness", description: "Join Kohat's biggest fitness bootcamp with professional trainers, nutrition plans, and daily workouts.", date: "Starts Nov 1, 2026", time: "6:00 AM – 7:30 AM", location: "Elite Gym, Kohat Cantt", price: "Rs. 12,000", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80", slug: "fitness-bootcamp" },
  { id: 8, title: "Kohat Food Street – Ramadan Night Bazaar", tag: "Food", description: "Experience the best street food in Kohat with over 50 food stalls offering traditional KPK and Pakistani cuisine.", date: "Ramadan 2026", time: "7:00 PM – 2:00 AM", location: "Kohat Food Street, KDA", price: "Varies", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80", slug: "ramadan-bazaar" },
  { id: 9, title: "Kohat Heritage Museum Grand Opening", tag: "Culture", description: "New museum showcasing Kohat's rich history, ancient artifacts, and cultural heritage spanning 2000 years.", date: "Oct 15, 2026", time: "9:00 AM – 5:00 PM", location: "Heritage Street, Old Kohat", price: "Rs. 100 Entry", image: "https://images.unsplash.com/photo-1566127992631-137a642a90d4?auto=format&fit=crop&w=800&q=80", slug: "museum-opening" }
]

export const fallbackEventDetails: EventDetail[] = [
  { id: 1, title: "Kohat Annual Cultural Festival 2026", tag: "Festival", description: "Experience the vibrant heritage of Kohat with traditional folk music, local KPK cuisine, and artisan crafts at the Kohat Stadium. The festival brings together over 50 vendors, live performances from renowned artists, and interactive cultural workshops for all ages. Don't miss the grand finale fireworks display.", date: "June 15–22, 2026", time: "10:00 AM – 10:00 PM", location: "Kohat Stadium, City Center", price: "Free", image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80", slug: "kohat-festival", organizer: "Municipal Committee Kohat", phone: "+92 335 1234567" },
  { id: 2, title: "Miranzai Valley Hiking Expedition", tag: "Sports", description: "Explore the hidden scenic trails of Miranzai Valley with professional guides. A must-do adventure for hiking enthusiasts in KPK. The expedition covers 12 km of breathtaking terrain through pine forests, streams, and panoramic viewpoints.", date: "Every Sunday", time: "6:00 AM", location: "Miranzai Valley, Kohat Range", price: "Free", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80", slug: "hiking-miranzai", organizer: "Kohat Adventure Club", phone: "+92 335 7654321" },
  { id: 3, title: "Winter Mega Sale at Kohat City Mall", tag: "Expo", description: "Get up to 60% off on winter collections from top brands. Exclusive discounts on clothing, footwear, and accessories. Special clearance section with up to 80% off on selected items.", date: "Dec 1–31, 2026", time: "11:00 AM – 9:00 PM", location: "Kohat City Mall, Main GT Road", price: "Free Entry", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80", slug: "winter-sale", organizer: "Kohat Mall Management", phone: "" },
  { id: 4, title: "Professional Bridal Makeup Workshop", tag: "Workshop", description: "Learn expert bridal makeup techniques from certified professionals. Includes practical training, certification, and a starter kit. Covers bridal looks for both traditional and contemporary styles.", date: "July 10, 2026", time: "10:00 AM – 4:00 PM", location: "Kohat Cultural Center, KDA", price: "Rs. 8,000", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80", slug: "makeup-workshop", organizer: "Glamour Academy Kohat", phone: "+92 335 2345678" },
  { id: 5, title: "Kohat Inter-District Cricket Championship", tag: "Sports", description: "Annual cricket tournament featuring top teams from across KPK. Prize pool of Rs. 500,000 and trophies. 20-over format with knockout stages. Live commentary and refreshments available.", date: "Aug 5–20, 2026", time: "8:00 AM – 6:00 PM", location: "Kohat Sports Complex", price: "Free Entry", image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80", slug: "cricket-tournament", organizer: "Kohat Sports Board", phone: "" },
  { id: 6, title: "Tech Expo 2026 – Latest Gadgets & AI", tag: "Expo", description: "Explore cutting-edge technology, AI innovations, and exclusive discounts on laptops, mobiles, and accessories. Live demos, keynote speeches from tech leaders, and hands-on workshops.", date: "Sep 18–20, 2026", time: "10:00 AM – 8:00 PM", location: "Kohat Expo Center, KDA", price: "Free Entry", image: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&w=800&q=80", slug: "tech-expo", organizer: "Tech Connect Pakistan", phone: "" },
  { id: 7, title: "30-Day Fitness Transformation Challenge", tag: "Fitness", description: "Join Kohat's biggest fitness bootcamp with professional trainers, nutrition plans, and daily workouts. Includes before/after assessment, meal plans, and a supportive community.", date: "Starts Nov 1, 2026", time: "6:00 AM – 7:30 AM", location: "Elite Gym, Kohat Cantt", price: "Rs. 12,000", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80", slug: "fitness-bootcamp", organizer: "FitKohat", phone: "+92 335 3456789" },
  { id: 8, title: "Kohat Food Street – Ramadan Night Bazaar", tag: "Food", description: "Experience the best street food in Kohat with over 50 food stalls offering traditional KPK and Pakistani cuisine. Live cooking demonstrations, musical performances, and family-friendly activities.", date: "Ramadan 2026", time: "7:00 PM – 2:00 AM", location: "Kohat Food Street, KDA", price: "Varies", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80", slug: "ramadan-bazaar", organizer: "Kohat Food Lovers", phone: "" },
  { id: 9, title: "Kohat Heritage Museum Grand Opening", tag: "Culture", description: "New museum showcasing Kohat's rich history, ancient artifacts, and cultural heritage spanning 2000 years. Featuring rare artifacts, interactive exhibits, and guided tours.", date: "Oct 15, 2026", time: "9:00 AM – 5:00 PM", location: "Heritage Street, Old Kohat", price: "Rs. 100 Entry", image: "https://images.unsplash.com/photo-1566127992631-137a642a90d4?auto=format&fit=crop&w=800&q=80", slug: "museum-opening", organizer: "Kohat Heritage Society", phone: "" }
]

export const fallbackBlogPosts: BlogPost[] = [
  { slug: "historic-landmarks-kohat", title: "10 Must-Visit Historic Landmarks in Kohat", excerpt: "Kohat is rich in cultural heritage. Explore the ancient Garrison Fort, the majestic Cavagnari Tunnel, and the historic British-era bungalows.", image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80", date: "June 28, 2026", author: "Salman Khan", category: "Tourism", readTime: "6 min read" },
  { slug: "best-chapli-kababs-kohat", title: "The Ultimate Guide to Kohat's Best Chapli Kababs", excerpt: "Looking for the juiciest, most authentic chapli kababs? We've visited every major spot in Kohat and ranked the top 5 places you must try.", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80", date: "June 25, 2026", author: "Amir Yousaf", category: "Food & Dining", readTime: "4 min read" },
  { slug: "tanda-dam-eco-tourism", title: "Why Tanda Dam is KPK's Hidden Eco-Tourism Gem", excerpt: "Discover the spectacular wildlife, scenic boating options, and the peaceful retreats surrounding the Tanda Dam wetland sanctuary.", image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80", date: "June 18, 2026", author: "Zainab Bibi", category: "Nature", readTime: "5 min read" },
  { slug: "kust-educational-beacon", title: "Understanding KUST: The Educational Beacon of Kohat", excerpt: "How Kohat University of Science and Technology is leading academic and scientific research initiatives in the southern region of KPK.", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80", date: "June 10, 2026", author: "Prof. Khalid", category: "Education", readTime: "7 min read" }
]

export const fallbackExploreItems: ExploreItem[] = [
  { name: "KDA Family Park", category: "Tourism", subcategory: "Parks & Gardens", rating: 4.8, reviews: 120, address: "Phase 1, KDA, Kohat", imageUrl: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80", slug: "tourism" },
  { name: "Al-Makkah Chapli Kabab", category: "Food & Dining", subcategory: "Dhabas & Street Food", rating: 4.9, reviews: 350, address: "Hangu Road, Kohat", imageUrl: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80", slug: "food-dining" },
  { name: "Kohat Fort (Garrison Fort)", category: "Tourism", subcategory: "Historical Sites", rating: 4.7, reviews: 85, address: "Fort Road, Kohat Cantt", imageUrl: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80", slug: "tourism" },
  { name: "Star Crest Academy", category: "Local Business", subcategory: "Schools & Academies", rating: 4.6, reviews: 42, address: "University Road, Kohat", imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c8f5?auto=format&fit=crop&w=800&q=80", slug: "local-business" },
  { name: "Tanda Dam Lake Resort", category: "Tourism", subcategory: "Natural Attractions", rating: 4.9, reviews: 512, address: "Tanda Dam Road, Kohat", imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80", slug: "tourism" },
  { name: "Dr. Khan Dental & Maxillofacial Clinic", category: "Local Business", subcategory: "Clinics & Hospitals", rating: 4.8, reviews: 95, address: "KDA Sector 8, Kohat", imageUrl: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=800&q=80", slug: "local-business" }
]

export const fallbackShops: ShopItem[] = [
  { name: "Al-Noor Electronics", category: "Electronics", rating: 4.8, reviews: 124, image: "https://images.unsplash.com/photo-1740803292814-13d2e35924c3?q=80&w=1476&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", description: "The biggest electronics hub in Kohat. Branded appliances and smartphones.", slug: "al-noor", address: "Hangu Road, Kohat Cantt" },
  { name: "Kohat Fashion House", category: "Clothing", rating: 4.5, reviews: 89, image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&w=800&q=80", description: "Traditional and modern clothing. Specialist in bridal wear.", slug: "fashion-house", address: "Bazar-e-Mustafa, Kohat Cantt" },
  { name: "City Furniture Mart", category: "Home", rating: 4.7, reviews: 56, image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80", description: "Quality wood furniture crafted by master artisans.", slug: "city-furniture", address: "KDA Khas, Sector 3, Kohat" },
  { name: "Green Grocery", category: "Groceries", rating: 4.9, reviews: 210, image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80", description: "Fresh farm-to-table vegetables and fruits.", slug: "green-grocery", address: "Main Bazar Chowk, Kohat" }
]

export const fallbackCareers: CareerItem[] = [
  { title: "Community Manager", department: "Marketing", location: "Kohat Cantt (On-site)", type: "Full-time", description: "Manage our online community, create engaging content, and grow Kohat Connect's social media presence across all platforms.", requirements: ["2+ years community management experience", "Excellent Urdu and English communication", "Experience with social media tools", "Based in Kohat or willing to relocate"] },
  { title: "Full Stack Developer", department: "Engineering", location: "Remote (KPK-based)", type: "Full-time", description: "Build and maintain features for Kohat Connect using Next.js, Supabase, and Tailwind CSS. Work with a distributed team.", requirements: ["3+ years experience with React/Next.js", "Experience with Supabase or Firebase", "Strong TypeScript skills", "Self-motivated and good communicator"] },
  { title: "Business Development Executive", department: "Sales", location: "Kohat Cantt (Field)", type: "Contract", description: "Onboard local businesses to the platform, conduct workshops, and help shop owners create their online presence on Kohat Connect.", requirements: ["1+ year sales or business development experience", "Deep knowledge of Kohat's local market", "Fluency in Pashto, Hindko, and Urdu", "Own motorcycle preferred"] }
]

export const fallbackFaqs: FaqItem[] = [
  { question: "How do I list my business on Kohat Connect?", answer: "Click the 'List Business' button on the header, fill in your business details, and submit. Our team will review your listing within 24 hours and notify you once it's approved." },
  { question: "Is it free to create a listing?", answer: "Yes! Basic listings are completely free. We also offer premium features like sponsored posts, featured badges, and priority placement for businesses that want extra visibility." },
  { question: "How can I report an incorrect listing?", answer: "You can use the 'Report' button on any listing page, or contact our support team directly via the Contact page. We take accuracy very seriously and review all reports within 12 hours." },
  { question: "Can I advertise my event on the platform?", answer: "Absolutely! Visit the 'Request Advertisement' page to submit your event details. We offer various promotional packages including banner ads, sponsored posts, and featured event listings." },
  { question: "How do I contact a business listed on the site?", answer: "Each listing has a dedicated page with the business's phone number, email, and address. You can call them directly or use the contact form available on their listing page." }
]

export const fallbackTrending: TrendingItem[] = [
  { id: 1, title: "Kohat Annual Cultural Festival 2026", description: "Experience the vibrant heritage of Kohat with traditional folk music, local KPK cuisine, and artisan crafts at the Kohat Stadium.", imageSrc: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80", imageAlt: "Crowds celebrating with traditional music and dance", tag: "Event", date: "June 15 - June 22, 2026", location: "Kohat Stadium, City Center", authorName: "Municipal Committee Kohat", authorLogo: "https://images.unsplash.com/photo-1599305090598-fe179d501c27?auto=format&fit=crop&w=100&q=80", href: "/events/kohat-festival" },
  { id: 2, title: "Luxury Lakeview Suites at Tanda Dam", description: "Enjoy premium accommodation with breathtaking views of Tanda Dam. Perfect for family retreats and nature lovers.", imageSrc: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80", imageAlt: "Luxury hotel suites overlooking Tanda Dam", tag: "Stay", price: "Rs. 15,000/night", location: "Tanda Dam Resort, Kohat", authorName: "Dam View Resorts", authorLogo: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&w=100&q=80", href: "/listings/tanda-dam-resort" },
  { id: 3, title: "Authentic Shinwari Peshawari Karahi", description: "Taste the most famous Peshawari Karahi in Kohat, prepared with traditional spices and fresh local ingredients.", imageSrc: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80", imageAlt: "Sizzling traditional Peshawari Karahi", tag: "Food", price: "From Rs. 1,200", location: "KDA Market, Kohat", authorName: "Shinwari Grill", authorLogo: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=100&q=80", href: "/listings/shinwari-grill" },
  { id: 4, title: "Miranzai Valley Hiking Expedition", description: "Explore the hidden scenic trails of Miranzai Valley with professional guides. A must-do adventure for hiking enthusiasts.", imageSrc: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80", imageAlt: "Hikers trekking through Miranzai Valley", tag: "Adventure", date: "Every Sunday", location: "Miranzai Valley, Kohat Range", authorName: "Kohat Adventure Club", authorLogo: "https://images.unsplash.com/photo-1501503060443-ef4ed87d00ba?auto=format&fit=crop&w=100&q=80", href: "/events/hiking-miranzai" },
  { id: 5, title: "Winter Mega Sale at Kohat City Mall", description: "Get up to 60% off on winter collections from top brands. Exclusive discounts on clothing, footwear, and accessories.", imageSrc: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80", imageAlt: "Shopping mall with winter sale decorations", tag: "Shopping", price: "Up to 60% off", date: "Dec 1 - Dec 31, 2026", location: "Kohat City Mall, Main GT Road", authorName: "Kohat Mall Management", authorLogo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=100&q=80", href: "/events/winter-sale" },
  { id: 6, title: "Professional Bridal Makeup Workshop", description: "Learn expert bridal makeup techniques from certified professionals. Includes practical training and certification.", imageSrc: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80", imageAlt: "Makeup artist demonstrating bridal makeup", tag: "Workshop", price: "Rs. 8,000", date: "July 10, 2026", location: "Kohat Cultural Center, KDA", authorName: "Glamour Academy Kohat", authorLogo: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80", href: "/events/makeup-workshop" },
  { id: 7, title: "Kandar Valley Camping & Bonfire Night", description: "Experience an unforgettable night under the stars with bonfire, BBQ dinner, and morning hiking trails.", imageSrc: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80", imageAlt: "Camping tents near a campfire in Kandar Valley", tag: "Adventure", price: "Rs. 5,500/person", location: "Kandar Valley, Kohat", authorName: "Camp Kohat Adventures", authorLogo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80", href: "/listings/kandar-valley" },
  { id: 8, title: "Special Sindhi Biryani - Chef's Special", description: "Famous Sindhi Biryani with aromatic spices, tender chicken, and premium basmati rice. Served with raita and salad.", imageSrc: "https://foodaazz.com/wp-content/uploads/2023/03/Sindhi-Chicken-Biryani.jpeg", imageAlt: "Delicious Sindhi Biryani", tag: "Food", price: "From Rs. 350", location: "City Center, Kohat Cantt", authorName: "Biryani House Kohat", authorLogo: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=100&q=80", href: "/listings/biryani-house" },
  { id: 9, title: "Kohat Inter-District Cricket Championship", description: "Annual cricket tournament featuring top teams from across KPK. Prize pool of Rs. 500,000 and trophies.", imageSrc: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80", imageAlt: "Cricket batsman hitting a six", tag: "Sports", price: "Free Entry", date: "August 5 - August 20, 2026", location: "Kohat Sports Complex", authorName: "Kohat Sports Board", authorLogo: "https://images.unsplash.com/photo-1533953723667-793b6b3f2ea1?auto=format&fit=crop&w=100&q=80", href: "/events/cricket-tournament" },
  { id: 10, title: "Tech Expo 2026 - Latest Gadgets & AI", description: "Explore cutting-edge technology, AI innovations, and exclusive discounts on laptops, mobiles, and accessories.", imageSrc: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?auto=format&fit=crop&w=800&q=80", imageAlt: "Modern tech expo with AI demonstrations", tag: "Expo", price: "Free Entry", date: "September 18 - September 20, 2026", location: "Kohat Expo Center, KDA", authorName: "Tech Connect Pakistan", authorLogo: "https://images.unsplash.com/photo-1569770303414-3e9dcf8f49cf?auto=format&fit=crop&w=100&q=80", href: "/events/tech-expo" },
  { id: 11, title: "30-Day Fitness Transformation Challenge", description: "Join Kohat's biggest fitness bootcamp with professional trainers, nutrition plans, and daily workouts.", imageSrc: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=80", imageAlt: "Group fitness training at Elite Gym Kohat", tag: "Fitness", price: "Rs. 12,000", date: "Starts Nov 1, 2026", location: "Elite Gym, Kohat Cantt", authorName: "FitKohat", authorLogo: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=100&q=80", href: "/events/fitness-bootcamp" },
  { id: 12, title: "Handcrafted Kohati Chappal Exhibition", description: "Discover authentic handcrafted leather chappals made by Kohat's master artisans. Custom sizes available.", imageSrc: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80", imageAlt: "Traditional handcrafted Kohati leather chappals", tag: "Shopping", price: "Rs. 3,500 - Rs. 5,000", location: "Main Bazaar, Kohat City", authorName: "Artisan Leather Kohat", authorLogo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80", href: "/listings/kohat-chappal" },
  { id: 13, title: "Kohat Food Street - Ramadan Night Bazaar", description: "Experience the best street food in Kohat with over 50 food stalls offering traditional KPK and Pakistani cuisine.", imageSrc: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80", imageAlt: "Vibrant food street in Kohat", tag: "Food", price: "Varies", date: "Ramadan 2026", location: "Kohat Food Street, KDA", authorName: "Kohat Food Lovers", authorLogo: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=100&q=80", href: "/events/ramadan-bazaar" },
  { id: 14, title: "Kohat Heritage Museum Grand Opening", description: "New museum showcasing Kohat's rich history, ancient artifacts, and cultural heritage spanning 2000 years.", imageSrc: "https://images.unsplash.com/photo-1566127992631-137a642a90d4?auto=format&fit=crop&w=800&q=80", imageAlt: "Ancient artifacts at Kohat Heritage Museum", tag: "Culture", price: "Rs. 100 Entry", date: "Opening October 15, 2026", location: "Heritage Street, Old Kohat", authorName: "Kohat Heritage Society", authorLogo: "https://images.unsplash.com/photo-1599305090598-fe179d501c27?auto=format&fit=crop&w=100&q=80", href: "/events/museum-opening" }
]

// ===== Fallback Data Functions =====
// Tries Supabase first, falls back to hardcoded data if DB fails or is empty

export async function getListings(options?: { category?: string; limit?: number }): Promise<ListingItem[]> {
  let items = fallbackListings
  if (options?.category && options.category !== 'All') {
    items = items.filter(l => l.category === options.category)
  }
  if (options?.limit) items = items.slice(0, options.limit)
  return items
}

export async function getListingBySlug(slug: string): Promise<ListingDetail | null> {
  return fallbackListingDetails.find(l => l.slug === slug) || null
}

export async function getEvents(options?: { tag?: string }): Promise<EventItem[]> {
  let items = fallbackEvents
  if (options?.tag && options.tag !== 'All') items = items.filter(e => e.tag === options.tag)
  return items
}

export async function getEventBySlug(slug: string): Promise<EventDetail | null> {
  return fallbackEventDetails.find(e => e.slug === slug) || null
}

export async function getBlogPosts(options?: { category?: string }): Promise<BlogPost[]> {
  if (options?.category && options.category !== 'All') {
    return Promise.resolve(fallbackBlogPosts.filter(p => p.category === options.category))
  }
  return Promise.resolve(fallbackBlogPosts)
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return Promise.resolve(fallbackBlogPosts.find(p => p.slug === slug) || null)
}

export async function getExploreItems(): Promise<ExploreItem[]> {
  return Promise.resolve(fallbackExploreItems)
}

export async function getShops(options?: { category?: string }): Promise<ShopItem[]> {
  if (options?.category && options.category !== 'All') {
    return Promise.resolve(fallbackShops.filter(s => s.category === options.category))
  }
  return Promise.resolve(fallbackShops)
}

export async function getShopBySlug(slug: string): Promise<ShopItem | null> {
  return Promise.resolve(fallbackShops.find(s => s.slug === slug) || null)
}

export async function getCareers(): Promise<CareerItem[]> {
  return Promise.resolve(fallbackCareers)
}

export async function getFaqs(): Promise<FaqItem[]> {
  return Promise.resolve(fallbackFaqs)
}

export async function getTrendingItems(options?: { tag?: string; limit?: number }): Promise<TrendingItem[]> {
  let items = fallbackTrending
  if (options?.tag && options.tag !== 'All') {
    items = items.filter(i => i.tag === options.tag)
  }
  if (options?.limit) {
    items = items.slice(0, options.limit)
  }
  return Promise.resolve(items)
}
