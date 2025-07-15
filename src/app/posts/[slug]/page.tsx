import { ButtonBack } from '@/app/_components/button';
import DateFormatter from '@/app/_components/date-format';
import { getArticleBySlug } from '@/lib/Api'; 
import { notFound } from 'next/navigation';
interface ArticleDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ArticleDetailPageProps) {
  const props = await params;
  const article = await getArticleBySlug(props.slug);

  if (!article) {
    return {
      title: 'Artikel Tidak Ditemukan',
    };
  }

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      images: article.urlToImage ? [{ url: article.urlToImage }] : [],
    },
  };
}

export default async function ArticleDetailPage({ params }: ArticleDetailPageProps) {
  const props = await params;
  const article = await getArticleBySlug(props.slug);

  if (!article) {
    notFound();
  }

  return (

    <section
      className='my-20 '>
      <div className='flex justify-center'>
        <div
          className="w-250">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-250"
          />
          <p
            className="font-semibold text-4xl">
            {article.title}
          </p>
          <p>
            Source: {article.source.name}
          </p>
          <p>
            Author: {article.author}
          </p>
          <DateFormatter
          dateString={article.publishedAt}
          />
          <br />
          <p>
            {article.description}
            <br />
            <br />
            {article.content}
          </p>
        </div>
      </div>
      {ButtonBack(article.url)}
    </section>
  );
}