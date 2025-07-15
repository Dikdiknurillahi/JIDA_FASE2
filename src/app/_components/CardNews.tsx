import { createSlug } from "@/lib/Api";
import Link from "next/link";
import { SetAuthor } from "@/app/_components/set-author";
import DateFormatter from '@/app/_components/date-format';

type Props = {
  title: string;
  author: string;
  urlToImage: string;
  description: string;
  publishedAt: string;
  source: string;
}


export function CardNews({
  title,
  author,
  urlToImage,
  description,
  publishedAt,
  source
}: Props) {

  return (
  <div
      className="w-90 text-justify">
            <Link
      href={`/posts/${createSlug(title)}`}
      >
    <img
    src={urlToImage}
    alt={title}
    className="w-90 h-50"
        />

        {SetAuthor(author, source)}

    <p
    className="font-semibold text-xl">
      {title}
        </p>
        <DateFormatter 
        dateString={publishedAt} />
        <p>
          {description}</p>
        </Link>
  </div>
  );
}