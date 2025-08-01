import { Daerah } from "@/interface/sayuran";

export async function GetDaerahApi(): Promise<Daerah[]> {
  try {
    const response = await fetch(`/api/daerah`, {
    next: {revalidate:3600}
  });
  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch news: ${response.status} ${response.statusText} - ${errorData.message || 'Unknown error'}`);
  }
  const result: Daerah[] = await response.json();
    return result;
    } catch (error: unknown) {
        if (error instanceof Error) {
      throw error;
    } else {
      throw error  = "Terjadi kesalahan yang tidak diketahui";
                }
    } 
  }