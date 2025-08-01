import Link from "next/link";
import Image from "next/image";
import { auth, signOut } from "@/auth";

export default async function Navbar() {
  const session = await auth();
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
                href={`/`} className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-white md:p-0">
                Home</Link>
            </li>
            {session && (
              <>
                <li>
                  <Link
                    href={`/harga`} className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-white md:p-0">
                    Harga Sayur</Link>
                </li>
                {session.user.role === "admin" ? (
                  <li>
                    <Link
                    href={`/user`} className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-white md:p-0">
                    User</Link>
                </li>
                ) : null}
              </>
            )}
            <li>
              <Link
              href={`/posts`} className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-white md:p-0">
              News</Link>
            </li>
            <li>
              <Link
              href={`/redux`} className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-white md:p-0">
              Redux</Link>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-3 ">
        {session && (
        <div className="flex gap-2 items-center">
          <div className="flex flex-col justify-center space-y-0">
            <span className="font-semibold text-white text-right capitalize">{session.user.name}</span>
            <span className="font-xs text-gray-400 text-right capitalize">{session.user.role}</span>
          </div>
          <button type="button" className="text-sm ring-2 bg-gray-100 rounded-full">
            <Image src={session.user.image || "/icon/avatar.png"} alt='avatar' width={64} height={64} className="w-8 h-8 rounded-full" />
          </button>
        </div>
        ) }
          <div>
          {session ? (
            <form action={async () => {
              "use server";
              await signOut({redirectTo:"/login"})
            }}>
              <button type="submit" className="text-sm bg-red-400 text-white px-3 py-1.5 rounded-md hover:bg-red-500">Logout</button>
            </form>
          ): (
            <Link href={`/login`} className="text-sm bg-red-400 text-white px-3 py-1.5 rounded-md hover:bg-red-500"> Login </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}