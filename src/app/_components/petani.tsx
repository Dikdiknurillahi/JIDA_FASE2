import Image from "next/image";

export default function Petani() {
  return (
    <section
    className="bg-beige flex justify-evenly p-10"
    >

      <div>
        <Image
        className="rounded-xl"
        src="/img/Petani.jpeg"
        width={400}
        height={400}
        alt="Petani"
        />
      </div>

      <div
      className="w-lg content-center text-justify"
      >
        <h1
        className="font-semibold text-xl"
        >
          Petani Adalah Pilar Utama Ketersediaan Pangan
        </h1>
        <br />
        <p>
          Peran paling mendasar dari petani adalah memastikan ketersediaan pangan bagi seluruh masyarakat. Setiap butir nasi, dan setiap potong sayur, yang kita konsumsi, berawal dari kerja keras para petani. Tanpa mereka, rantai pasokan makanan akan terhenti, dan kita akan menghadapi krisis kelaparan yang tak terbayangkan. Mereka adalah produsen utama yang menopang ketahanan pangan nasional, memastikan bahwa kebutuhan dasar masyarakat terpenuhi dari waktu ke waktu.
        </p>
      </div>
    </section>
  );
}