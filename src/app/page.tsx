import Image from "next/image";
import { Intro } from "@/app/_components/intro";
import HeroPost from "@/app/_components/hero-post";
import Petani from "@/app/_components/petani";
import News from "@/app/_components/news-home";

export default function Home() {
  return (
    <main>
      <Intro />
      <Petani />
      <HeroPost />
      <News />
    </main>
  );
}
