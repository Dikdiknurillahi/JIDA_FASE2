import { Daerah } from "@/interface/sayuran";

export async function GetDaerahApi(): Promise<Daerah[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    const response = await fetch(`${baseUrl}api/daerah`, {
    next: {revalidate:3600}
  });
  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch news: ${response.status} ${response.statusText} - ${errorData.message || 'Unknown error'}`);
  }
  const result: Daerah[] = await response.json();
    return result;
    } catch (err: any) {
    console.error("Error in getHargaSayurApi (data processing):", err.message);
    throw err;
    } 
  }