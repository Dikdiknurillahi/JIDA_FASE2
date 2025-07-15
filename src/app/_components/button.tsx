import Link from "next/link";

export function ButtonBack(url:string) {
  return (
    <div className="flex justify-around mt-9">
    <Link className="w-30" color="primary" href="/posts">
            <span className="text-lg">Back</span>
    </Link>
    <Link className="w-40" color="primary" target="blank" href={url}>
            <span className="text-lg">Continues Read</span>
    </Link>
    </div>
  );
}