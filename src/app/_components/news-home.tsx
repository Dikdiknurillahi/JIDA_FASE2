import { Article } from "@/interface/news";
import { getNewsApi } from "@/lib/Api";
import Link from "next/link";
import { createSlug } from "@/lib/Api";

export default async function News() {
  let articles: Article[] = [];
  let errorMessage: string | null = null;


  try {
    articles = await getNewsApi();
  } catch (error: any) {
    errorMessage = error.message;
  }

  const skipNews = articles.filter(article => article.urlToImage);
  const limitNews = skipNews.slice(0, 3);

    if (errorMessage) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: 'red' }}>
        <h1>Oops! Ada Masalah</h1>
        <p>{errorMessage}</p>
        <p>Silakan coba refresh halaman atau periksa konfigurasi API Key Anda.</p>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Berita Pertanian</h1>
        <p>Tidak ada berita pertanian ditemukan saat ini.</p>
        <p>Coba lagi nanti atau periksa koneksi internet Anda.</p>
      </div>
    );
  }

  return (

    <section
    className="bg-beige px-30 py-10"
    >
      <div
      className=" mb-6 font-bold text-5xl"
      >
      <h1>News</h1>
      </div>
      <div
      className="flex flex-wrap space-x-6 justify-center"
      >
        {limitNews.map((article => 
          <div
            className="w-90 h-90"
            key={article.url}>
                  <Link
      href={`/posts/${createSlug(article.title)}`}
      >
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-90 h-50"
              />
            <p>
              {article.author}
            </p>
            <p
            className="font-semibold text-xl"
            >
              {article.title}
            </p>
</Link>

          </div>
        ))}
      </div>
    </section>
  );
}