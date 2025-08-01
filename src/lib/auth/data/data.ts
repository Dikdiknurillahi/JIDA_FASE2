import { prisma } from "@/lib/prisma/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const getUser = async () => {
  const session = await auth();
  if (!session || !session.user || session.user.role !== "admin") redirect("/login");

  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error("Failed to fetch users:", error);
  }
};