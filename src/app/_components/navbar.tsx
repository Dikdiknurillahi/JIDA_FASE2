import Link from "next/link";

export default function Navbar() {
  return (
    

<nav className="fixed right-0 left-0 top-0 bg-navbar">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <Link
      href={`/`} className="flex items-center space-x-3 rtl:space-x-reverse"
        >
        <img src="/img/petaniMuda.png" className="h-10" alt="Flowbite Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">PetaniMuda</span>
        </Link>
    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
      <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 ">
            <li>
            <Link
      href={`/`} className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-white md:p-0"
      >Home</Link>
        </li>
            <li>
              <Link
      href={`/posts`} className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-white md:p-0"
      >News</Link>
          
        </li>
      </ul>
    </div>
  </div>
</nav>

  );
}