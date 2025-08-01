import { Article, NewsApiResponse } from "@/interface/news";

export async function getNewsApi(): Promise<Article[]> {
  const apiKey = "fa2ec2e5805440b4a1e0c408ff37a665";
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
  } catch(error: unknown) {
        if (error instanceof Error) {
          throw new Error(`Gagal mengambil data berita pertanian: ${error.message}`);
        } else {
          throw new Error(`Gagal mengambil data berita pertanian: Terjadi kesalahan yang tidak diketahui`);
                }
  }
}

export async function getAllNewsWithImage(): Promise<Article[]> {
  try {
    const allArticles = await getNewsApi();
    const articlesWithImages = allArticles.filter(article => article.urlToImage);
    return articlesWithImages;
  } catch (error: unknown) {
            if (error instanceof Error) {
          throw new Error(`Gagal mengambil data berita pertanian: ${error.message}`);
        } else {
          throw new Error(`Gagal mengambil data berita pertanian: Terjadi kesalahan yang tidak diketahui`);
                }
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  try {
    const allArticles = await getAllNewsWithImage(); 

    const foundArticle = allArticles.find(article => createSlug(article.title) === slug);
    
    return foundArticle || null; 
  } catch (error: unknown) {
            if (error instanceof Error) {
              return null;
            } else {
          return null;
                }
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