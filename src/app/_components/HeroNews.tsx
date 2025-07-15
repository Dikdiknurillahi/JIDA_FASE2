import Link from "next/link";
import { createSlug } from "@/lib/Api";
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

export function HeroNews({
  title,
  author,
  urlToImage,
  description,
  publishedAt,
  source
}: Props) {
  return (
  <div
      className="w-220">
            <Link
      href={`/posts/${createSlug(title)}`}
      >
    <img
    src={urlToImage}
    alt={title}
    className="w-220"
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