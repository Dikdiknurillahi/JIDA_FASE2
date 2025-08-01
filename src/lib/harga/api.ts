import { DataHargaSayuran } from "@/interface/sayuran";

export async function GetHargaApi(): Promise<DataHargaSayuran[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL
    const response = await fetch(`api/harga`, {
    next: {revalidate:3600}
  });
  if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Failed to fetch news: ${response.status} ${response.statusText} - ${errorData.message || 'Unknown error'}`);
  }
  const result: DataHargaSayuran[] = await response.json();
    return result;
    } catch (error: any) {
    console.error("Error in getHargaSayurApi (data processing):", error.message);
        if (error instanceof Error) {
      throw error;
    } else {
      throw error  = "Terjadi kesalahan yang tidak diketahui";
                }
    } 
}
  
export async function CreateHargaSayuran(data: {
    sayur_category_id: number;
    daerah_id: number;
    harga: number;
    tanggal?: string; // Opsional
}): Promise<DataHargaSayuran> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await fetch(`${baseUrl}api/harga`, {
            method: 'POST', // Penting: metode POST
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Kirim data dalam format JSON string
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to create harga: ${response.status} ${response.statusText} - ${errorData.message || 'Unknown error'}`);
        }

        const result: { message: string, data: DataHargaSayuran } = await response.json();
        return result.data; // Mengembalikan data yang baru saja dibuat
    } catch (error: any) {
        console.error("Error in CreateHargaSayuran (API call):", error.message);
            if (error instanceof Error) {
      throw error;
    } else {
      throw error  = "Terjadi kesalahan yang tidak diketahui";
                }
    }
}

export async function UpdateHargaSayuran(data: {
  id: number;
  harga: number;
  tanggal?: string;
}): Promise<DataHargaSayuran> {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const response = await fetch(`${baseUrl}api/harga`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Gagal update data");
  }
  const result = await response.json();
  return result.data;
}

export async function DeleteHargaSayuran(id: number): Promise<DataHargaSayuran> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const response = await fetch(`${baseUrl}api/harga`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Failed to delete harga: ${response.status} ${response.statusText} - ${errorData.message || 'Unknown error'}`);
        }

        const result: { message: string, data: DataHargaSayuran } = await response.json();
        return result.data;
    } catch (error: unknown) {
            if (error instanceof Error) {
      throw error;
    } else {
      throw error  = "Terjadi kesalahan yang tidak diketahui";
                }
    }
}