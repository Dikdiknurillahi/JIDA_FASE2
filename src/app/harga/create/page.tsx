import { CategorySayuran, Daerah } from "@/interface/sayuran";
import { GetCategoryApi } from "@/lib/category/api";
import { GetDaerahApi } from "@/lib/daerah/api";
import { Container } from "@/app/_components/Container";
import HargaForm from "@/app/_components/form/formCreate"; // Impor Client Component form

export default async function CreatHarga() {
  let categorySayur: CategorySayuran[] = [];
  let daerah: Daerah[] = [];
  let errorMessage: string | null = null;

  try {
    categorySayur = await GetCategoryApi();
    daerah = await GetDaerahApi();
  } catch (error: unknown) {
    if (error instanceof Error) {
              errorMessage = error.message;
            } else {
              errorMessage = "Terjadi kesalahan yang tidak diketahui";
            }
  }

  const changeNameDaerah = daerah.map(item => ({
    id: item.id,
    name: item.nama_daerah
  }));
  const changeNameSayur = categorySayur.map(item => ({
    id: item.id,
    name: item.nama_sayur
  }));

  if (errorMessage) {
    return (
      <Container>
        <div className="h-screen flex items-center justify-center">
          <p className="text-red-500 text-lg">Error loading initial data: {errorMessage}</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="h-screen space-y-2">
        <div>
          <p className="font-semibold text-2xl">Tambah Data Harga Sayuran</p>
        </div>

        {/* Render Client Component Form dan teruskan props dari Server */}
        <HargaForm
          categorySayurOptions={changeNameSayur}
          daerahOptions={changeNameDaerah}
        />
        
      </div>
    </Container>
  );
}