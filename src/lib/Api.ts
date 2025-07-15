import { Article, NewsApiResponse } from "@/interface/news";

export async function getNewsApi(): Promise<Article[]> {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    throw new Error('ApiKey Error');
  }
  const url = `https://newsapi.org/v2/everything?q=agricultural&language=en&apiKey=${apiKey}`;
  

  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch news: ${response.status} ${response.statusText} - ${errorData.message || 'Unknown error'}`);
    }

    const data: NewsApiResponse = await response.json();
    return data.articles;
  } catch(error: any) {
    console.error("Error in getAgriculturalNews:", error.message);
    throw new Error(`Gagal mengambil data berita pertanian: ${error.message}`);
  }
}

export async function getAllNewsWithImage(): Promise<Article[]> {
  try {
    const allArticles = await getNewsApi();
    const articlesWithImages = allArticles.filter(article => article.urlToImage);
    return articlesWithImages;
  } catch (error: any) {
    console.error("Error in getAllAgriculturalArticlesWithImages (data processing):", error.message);
    throw error;
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const allArticles = await getAllNewsWithImage(); 

    const foundArticle = allArticles.find(article => createSlug(article.title) === slug);
    
    return foundArticle || null; 
  } catch (error: any) {
    console.error(`Error finding article by slug "${slug}":`, error.message);
    return null;
  }
}

export function createSlug(title: string): string {
  if (!title) return '';
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '') 
    .replace(/\s+/g, '-')        
    .replace(/-+/g, '-')
    .trim();
}