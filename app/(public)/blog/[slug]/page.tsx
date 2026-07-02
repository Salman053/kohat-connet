"use client"

import React, { use } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, User, Clock, Tag, Share2, Heart } from 'lucide-react'

const blogPosts = [
  {
    slug: "historic-landmarks-kohat",
    title: "10 Must-Visit Historic Landmarks in Kohat",
    excerpt: "Kohat is rich in cultural heritage. Explore the ancient Garrison Fort, the majestic Cavagnari Tunnel, and the historic British-era bungalows.",
    content: `Kohat, one of the oldest cities in Khyber Pakhtunkhwa, is steeped in history dating back to the British colonial era and beyond. For history enthusiasts and curious travelers, the city offers a treasure trove of architectural marvels and historic sites that tell the story of the region's rich past.

    <h3>1. Kohat Garrison Fort</h3>
    <p>Built during the British Raj, the Kohat Garrison Fort stands as a testament to colonial military architecture. The fort has witnessed numerous historical events and continues to be a significant landmark in the city.</p>

    <h3>2. Cavagnari Tunnel</h3>
    <p>Named after Sir Louis Cavagnari, this tunnel is an engineering marvel of its time. Constructed to provide water to the Kohat city, it remains an important piece of infrastructure and a popular tourist attraction.</p>

    <h3>3. British Era Bungalows</h3>
    <p>Scattered across Kohat Cantt are beautiful colonial-era bungalows with distinctive architecture. These buildings reflect the grandeur of British architectural styles adapted to local conditions.</p>

    <h3>4. Kohat Museum</h3>
    <p>The Kohat Museum houses an impressive collection of artifacts, photographs, and documents that chronicle the city's journey through time. From ancient coins to colonial-era memorabilia, the museum offers a fascinating glimpse into Kohat's heritage.</p>

    <h3>5. Tanda Dam</h3>
    <p>While primarily known as a recreational spot, Tanda Dam has historical significance as a major irrigation project that transformed agriculture in the region.</p>

    <p>These landmarks represent just a fraction of Kohat's rich historical tapestry. Each site offers a unique window into the city's past and provides visitors with a deeper appreciation of this remarkable region.</p>`,
    image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80",
    date: "June 28, 2026",
    author: "Salman Khan",
    category: "Tourism",
    readTime: "6 min read"
  },
  {
    slug: "best-chapli-kababs-kohat",
    title: "The Ultimate Guide to Kohat's Best Chapli Kababs",
    excerpt: "Looking for the juiciest, most authentic chapli kababs? We've visited every major spot in Kohat and ranked the top 5 places you must try.",
    content: `Chapli kabab is more than just food in Kohat — it's a cultural institution. The city has perfected this minced meat delicacy, and every vendor adds their own unique twist to the recipe. Here is our definitive guide to the best chapli kabab spots in Kohat.

    <h3>1. Kabab Junction, KDA Chowk</h3>
    <p>The undisputed king of chapli kababs in Kohat. Their secret blend of spices and the perfect balance of meat and fat creates a kabab that is crispy on the outside and juicy on the inside. Served with fresh naan and tangy chutney.</p>

    <h3>2. Peshawari Hotel, Main Bazar</h3>
    <p>Bringing the authentic Peshawari flavor to Kohat, this establishment has been serving chapli kababs for over three decades. Their oversized kababs are legendary among locals.</p>

    <h3>3. Kohat Dhaba, Hangu Road</h3>
    <p>For those who prefer their kababs with a smoky, roadside flavor, Kohat Dhaba is the place to be. Cooked on traditional charcoal grills, the kababs here have an unmistakable aroma.</p>

    <h3>4. Mehran Hotel, G.T Road</h3>
    <p>A favorite among travelers passing through Kohat, Mehran Hotel serves consistently excellent chapli kababs at reasonable prices. Their special mint chutney is the perfect accompaniment.</p>

    <h3>5. Qala Restaurant, Kohat Cantt</h3>
    <p>For a more upscale dining experience, Qala Restaurant offers chapli kababs made with premium quality meat and served with elegant presentation. Perfect for family dinners.</p>

    <p>Whether you are a local resident or a visitor to Kohat, these chapli kabab spots are guaranteed to satisfy your cravings and give you an authentic taste of the region's culinary heritage.</p>`,
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=800&q=80",
    date: "June 25, 2026",
    author: "Amir Yousaf",
    category: "Food & Dining",
    readTime: "4 min read"
  },
  {
    slug: "tanda-dam-eco-tourism",
    title: "Why Tanda Dam is KPK's Hidden Eco-Tourism Gem",
    excerpt: "Discover the spectacular wildlife, scenic boating options, and the peaceful retreats surrounding the Tanda Dam wetland sanctuary.",
    content: `Tanda Dam, located just a short drive from Kohat city, is rapidly emerging as one of Khyber Pakhtunkhwa's most promising eco-tourism destinations. This stunning wetland sanctuary offers a perfect escape from the hustle and bustle of city life.

    <h3>A Haven for Bird Watchers</h3>
    <p>Tanda Dam is home to over 100 species of migratory and resident birds. During the winter months, the dam becomes a temporary home for flocks of migratory birds from Siberia and Central Asia, making it a paradise for ornithologists and bird watchers.</p>

    <h3>Boating and Water Sports</h3>
    <p>The calm waters of Tanda Dam are perfect for boating. Visitors can rent paddle boats and rowboats to explore the expansive water body. The management has also introduced basic water sports facilities for adventure enthusiasts.</p>

    <h3>Picnic Spots and Scenic Views</h3>
    <p>Well-maintained picnic spots with seating areas, barbecue pits, and shaded pavilions dot the perimeter of the dam. The sunset views from the eastern bank are particularly breathtaking, with the sun setting behind the distant hills.</p>

    <h3>Wildlife Sanctuary</h3>
    <p>The surrounding area of Tanda Dam has been declared a protected wildlife sanctuary. Visitors can spot various species of deer, wild boar, and smaller mammals in their natural habitat.</p>

    <h3>Community Impact</h3>
    <p>The eco-tourism initiatives at Tanda Dam have created livelihood opportunities for local communities. Homestays, guide services, and handicraft sales provide sustainable income for residents while promoting conservation.</p>

    <p>Tanda Dam represents the perfect blend of nature conservation and sustainable tourism. A visit here is not just a recreational outing but an opportunity to connect with nature and support local communities.</p>`,
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
    date: "June 18, 2026",
    author: "Zainab Bibi",
    category: "Nature",
    readTime: "5 min read"
  },
  {
    slug: "kust-educational-beacon",
    title: "Understanding KUST: The Educational Beacon of Kohat",
    excerpt: "How Kohat University of Science and Technology is leading academic and scientific research initiatives in the southern region of KPK.",
    content: `Kohat University of Science and Technology (KUST) has established itself as a premier institution of higher learning in the Khyber Pakhtunkhwa region. Since its inception, the university has played a pivotal role in shaping the academic landscape of southern KPK.

    <h3>Academic Excellence</h3>
    <p>KUST offers a wide range of undergraduate, graduate, and doctoral programs across multiple disciplines including computer science, engineering, business administration, social sciences, and natural sciences. The university's curriculum is designed to meet international standards while addressing local needs.</p>

    <h3>Research and Innovation</h3>
    <p>The university has established several research centers focusing on areas such as renewable energy, water resources, and information technology. KUST faculty and students have published numerous research papers in international journals and have secured research grants from national and international organizations.</p>

    <h3>Community Engagement</h3>
    <p>KUST actively engages with the local community through outreach programs, continuing education initiatives, and public lectures. The university's extension programs provide vocational training and skills development opportunities for residents of Kohat and surrounding areas.</p>

    <h3>Campus Life</h3>
    <p>The KUST campus is a vibrant community with modern facilities including well-equipped laboratories, a central library, sports complexes, and student accommodation. The university hosts cultural events, sports tournaments, and academic conferences throughout the year.</p>

    <h3>Future Vision</h3>
    <p>KUST is expanding its academic portfolio with new programs in emerging fields such as artificial intelligence, data science, and environmental studies. The university is also strengthening its international collaborations to provide students with global exposure and research opportunities.</p>

    <p>KUST continues to be a beacon of knowledge and innovation in Kohat, producing graduates who contribute meaningfully to the development of the region and the country.</p>`,
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
    date: "June 10, 2026",
    author: "Prof. Khalid",
    category: "Education",
    readTime: "7 min read"
  }
]

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default function BlogPostPage({ params }: PageProps) {
  const resolvedParams = use(params)
  const slug = resolvedParams.slug

  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
        <h1 className="text-3xl font-extrabold mb-2">Article Not Found</h1>
        <p className="text-muted-foreground text-sm mb-6">The blog post you are looking for does not exist.</p>
        <Link href="/blog" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>
      </div>
    )
  }

  const relatedPosts = blogPosts.filter(p => p.slug !== slug && p.category === post.category).slice(0, 2)

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Image */}
      <div className="relative h-[40vh] md:h-[50vh] w-full">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      </div>

      <div className="container mx-auto px-6 -mt-32 relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Breadcrumb */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline mb-6 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full border"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Blog
          </Link>

          {/* Article Header */}
          <div className="bg-card border border-border rounded-3xl p-6 md:p-10 mb-8 shadow-xl">
            <span className="text-[10px] font-extrabold tracking-widest text-primary bg-primary/10 px-2.5 py-1 rounded-full uppercase inline-block mb-4">
              {post.category}
            </span>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight text-foreground leading-tight mb-6">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-5 text-xs text-muted-foreground pb-6 border-b border-border/60">
              <span className="flex items-center gap-1.5 font-semibold">
                <User className="h-4 w-4" /> {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {post.readTime}
              </span>
            </div>

            {/* Article Content */}
            <div
              className="mt-8 text-xs md:text-sm text-muted-foreground leading-relaxed space-y-4 [&_h3]:text-base [&_h3]:font-extrabold [&_h3]:text-foreground [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:mb-4 [&_p]:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="space-y-6">
              <h3 className="font-extrabold text-lg text-foreground flex items-center gap-2">
                <Tag className="h-5 w-5 text-primary" /> Related Articles
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((rp) => (
                  <Link
                    key={rp.slug}
                    href={`/blog/${rp.slug}`}
                    className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 hover:shadow-xl transition-all duration-300 group"
                  >
                    <div className="relative h-40 w-full overflow-hidden">
                      <Image
                        src={rp.image}
                        alt={rp.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <span className="text-[9px] font-extrabold uppercase text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        {rp.category}
                      </span>
                      <h4 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors mt-2">
                        {rp.title}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                        {rp.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
