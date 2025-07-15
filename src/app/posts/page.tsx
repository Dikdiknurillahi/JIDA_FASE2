import { HeroNews } from "@/app/_components/HeroNews";
import { Article } from "@/interface/news";
import { getAllNewsWithImage } from "@/lib/Api";
import { CardNews } from "@/app/_components/CardNews";
import ContainerNews from "@/app/_components/ContainerNews";

export default async function Home() {
  let articles: Article[] = [];
  let errorMessage: string | null = null;


  try {
    articles = await getAllNewsWithImage();
  } catch (error: any) {
    errorMessage = error.message;
  }

  const otherNews = articles.slice(1);

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
    <main className="mt-10">
      <ContainerNews >
      <HeroNews
        key={articles[0].url}
        title={articles[0].title}
        author={articles[0].author}
        urlToImage={articles[0].urlToImage}
        description={articles[0].description}
        publishedAt={articles[0].publishedAt}
        source={articles[0].source.name}
      />
      {otherNews.map((article => 
        <CardNews
          key={article.url}
          title={article.title}
          author={article.author}
          urlToImage={article.urlToImage}
          description={article.description}
          publishedAt={article.publishedAt}
          source={article.source.name}
        />
      ))}
      </ContainerNews>
    </main>
  );
}
