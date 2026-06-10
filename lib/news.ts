import { NewsItem } from "@/components/shared/news";

// Helper function to determine news category based on content
export const determineCategory = (text: string): string => {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('cricket') || lowerText.includes('sports') || lowerText.includes('tournament')) {
    return 'Sports';
  } else if (lowerText.includes('school') || lowerText.includes('university') || lowerText.includes('education')) {
    return 'Education';
  } else if (lowerText.includes('hospital') || lowerText.includes('health') || lowerText.includes('medical')) {
    return 'Health';
  } else if (lowerText.includes('police') || lowerText.includes('safety') || lowerText.includes('security')) {
    return 'Safety';
  } else if (lowerText.includes('development') || lowerText.includes('project') || lowerText.includes('construction')) {
    return 'Development';
  } else if (lowerText.includes('business') || lowerText.includes('economy') || lowerText.includes('market')) {
    return 'Business';
  } else if (lowerText.includes('tech') || lowerText.includes('technology') || lowerText.includes('digital')) {
    return 'Technology';
  } else if (lowerText.includes('culture') || lowerText.includes('festival') || lowerText.includes('heritage')) {
    return 'Culture';
  } else {
    return 'General';
  }
};

// Helper function to get relative time
export const getTimeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return 'Just now';
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days} ${days === 1 ? 'day' : 'days'} ago`;
  
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
  
  const months = Math.floor(days / 30);
  return `${months} ${months === 1 ? 'month' : 'months'} ago`;
};

// Fallback static news in case API fails
export const getFallbackNews = (): NewsItem[] => [
  {
    id: 1,
    title: "New Bridge Project Approved for Kohat-Hangu Road",
    category: "Development",
    time: "10 mins ago",
    isBreaking: true,
    href: "/news/bridge-project",
    excerpt: "The government has approved a multi-million rupee project to construct a new bridge connecting Kohat and Hangu, aimed at easing traffic congestion."
  },
  {
    id: 2,
    title: "Local Schools to Remain Closed Tomorrow Due to Weather",
    category: "Education",
    time: "45 mins ago",
    isBreaking: true,
    href: "/news/school-closure",
    excerpt: "The district administration has announced a holiday for all public and private schools tomorrow following a severe weather warning."
  },
  {
    id: 3,
    title: "Success of Annual Cultural Fair Exceeds Expectations",
    category: "Culture",
    time: "2 hours ago",
    href: "/news/cultural-fair",
    excerpt: "The Kohat Annual Cultural Fair saw record-breaking attendance this year, with visitors from all over the province enjoying local food and music."
  },
  {
    id: 4,
    title: "Police Launch New Safety App for Citizens",
    category: "Safety",
    time: "4 hours ago",
    href: "/news/safety-app",
    excerpt: "A new mobile application designed to improve citizen safety and emergency response times has been launched by the local police department."
  },
  {
    id: 5,
    title: "Kohat University Announces New Research Grants",
    category: "Education",
    time: "6 hours ago",
    href: "/news/university-grants",
    excerpt: "The University of Kohat Science and Technology (KUST) has announced a new series of grants to support local research projects."
  },
  {
    id: 6,
    title: "New Modern Hospital to be Built in KDA Phase 2",
    category: "Health",
    time: "8 hours ago",
    href: "/news/new-hospital",
    excerpt: "Plans for a state-of-the-art 500-bed hospital in KDA Phase 2 have been finalized, with construction set to begin next month."
  }
];

interface NewsApiArticle {
  title: string;
  description?: string;
  publishedAt: string;
  url: string;
  source: { name: string };
  urlToImage?: string;
}

export async function fetchNews() {
  try {
    const API_KEY = process.env.NEWS_API_KEY || '8c741f84b9534113a0e3355bcf9150de';
    
    // Fetch news about Kohat and Pakistan
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=Kohat OR Pakistan "Khyber Pakhtunkhwa" OR "KPK news"&sortBy=publishedAt&language=en&pageSize=10&apiKey=${API_KEY}`,
      { next: { revalidate: 12000 } } // Cache for 5 minutes
    );

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.status === 'error') {
      throw new Error(data.message || 'Failed to fetch news');
    }

    // Transform API response to match NewsItem format
    return (data.articles as NewsApiArticle[]).map((article, index) => ({
      id: index + 1,
      title: article.title,
      category: determineCategory(article.title + ' ' + (article.description || '')),
      time: getTimeAgo(new Date(article.publishedAt)),
      isBreaking: index < 2, 
      href: article.url,
      description: article.description,
      source: article.source.name,
      imageUrl: article.urlToImage,
      excerpt: article.description ? article.description.slice(0, 100) + '...' : ''
    })) as NewsItem[];

  } catch (err) {
    console.error('Error fetching news:', err);
    return getFallbackNews();
  }
}
