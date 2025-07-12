import Image from "next/image";

export default function HeroPost() {
  return (
    <section
    className="h-screen bg-green"
    >

      <div
      className="flex pt-10"
      >
        <div
          className="w-1/2 text-white content-end ml-30 text-justify"
        >
        <h1
        className="text-5xl font-semibold text-white mt-[3rem]"
          >Pestisida</h1>
          <p
          className="text-lg"
          >Pestisida memegang peranan krusial dalam pertanian modern untuk memastikan ketahanan pangan global. Tanpa penggunaan pestisida yang tepat, tanaman akan sangat rentan terhadap serangan hama, penyakit, dan gulma yang dapat menyebabkan penurunan hasil panen secara drastis atau bahkan gagal panen total. Pestisida bekerja dengan melindungi tanaman dari organisme pengganggu tersebut, memungkinkan tanaman tumbuh optimal dan menghasilkan produk pertanian berkualitas tinggi. Dengan demikian, pestisida membantu meningkatkan produktivitas lahan, mengurangi kerugian pascapanen, dan memastikan pasokan pangan yang stabil bagi populasi dunia yang terus bertambah. Pengelolaannya yang bijak dan sesuai aturan sangat penting untuk menyeimbangkan manfaat ini dengan potensi dampak lingkungan dan kesehatan.</p>
        </div>
        <div
        className="w-1/2 flex justify-end"
        >
          <Image
            src="/img/pestisida.jpeg"
            width={620}
            height={500}
            alt="Pestisida"
          />
        </div>
      </div>
    </section>
  );
}