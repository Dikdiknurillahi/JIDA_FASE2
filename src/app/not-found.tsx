import Image from 'next/image';
export default function NotFound() {
  return (
    <section className="h-screen content-center">
      <div className="flex justify-center"
      >
        <Image
          src="/img/404.png"
          width={200}
          height={200}
          alt='not-found'
        />
        <div className='h-105 content-center'>
          <div className='font-bold justify-items-center'>
            <p className='text-9xl'>404</p>
            <p className='text-3xl'>Page Not Found!</p>
          </div>
        </div>
      </div>
    </section>
  );
}