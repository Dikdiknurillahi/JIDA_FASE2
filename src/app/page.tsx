import { Intro } from "@/app/_components/intro";
import { Article } from "@/interface/news";
import { getAllNewsWithImage } from "@/lib/Api";
import HeroPost from "@/app/_components/hero-post";
import Petani from "@/app/_components/petani";
import { CardNews } from "@/app/_components/CardNews";
import {ContainerNews} from "@/app/_components/Container";
import { auth } from "@/auth";

export default async function Home() {
  let articles: Article[] = [];
  let errorMessage: string | null = null;

  const session = await auth();
  console.log(JSON.stringify(session));

  try {
    articles = await getAllNewsWithImage();
  } catch (error: any) {
    errorMessage = error.message;
  }

  const limitNews = articles.slice(0, 3);

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
    <main>
      <Intro />
      <Petani />
      <HeroPost />
      <ContainerNews>
      {limitNews.map((article => 
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
