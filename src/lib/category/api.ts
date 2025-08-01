import { CategorySayuran } from "@/interface/sayuran";

export async function GetCategoryApi(): Promise<CategorySayuran[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000';
    console.log("Base URL: ", baseUrl); // <- debug output

    const response = await fetch(`${baseUrl}/api/category`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch news: ${response.status} ${response.statusText} - ${errorData.message || 'Unknown error'}`);
    }

    const result: CategorySayuran[] = await response.json();
    return result;

  } catch (error: unknown) {
    if (error instanceof Error) {
      throw error;
    } else {
      throw new Error("Terjadi kesalahan yang tidak diketahui");
    }
  }
}

