import { auth } from "@/auth";

const coba = async () => {
  const session = await auth();
  console.log(session?.user?.name);
}