import { Article, NewsApiResponse } from "@/interface/news";

export async function getNewApi(): Promise<Article[]> {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    throw new Error('ApiKey Error');
  }
  const url = `https://newsapi.org/v2/everything?q=pertanian&language=id&apiKey=${apiKey}`;
  

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