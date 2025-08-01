"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GetHargaApi, UpdateHargaSayuran } from "@/lib/harga/api";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function EditHargaPage({ params }: Props) {
  const router = useRouter();
  const [form, setForm] = useState({
    nama_sayur: "",
    harga: "",
    tanggal: "",
  });
  const [loading, setLoading] = useState(true);

  // Perbaikan utama: gunakan React.use() untuk unwrapping params
  // Ini akan mendapatkan objek params yang sudah di-resolve
  const resolvedParams = React.use(params);
  const id = resolvedParams.id;

  useEffect(() => {
    async function fetchData() {
      const data = await GetHargaApi();
      // Gunakan variabel 'id' yang sudah di-resolve
      const item = data.find((d) => d.id === Number(id));
      if (item) {
        const dateObj = item.tanggal ? new Date(item.tanggal) : null;
        const tanggalLocal = dateObj
          ? new Date(dateObj.getTime() + Math.abs(dateObj.getTimezoneOffset()) * 60000)
              .toISOString()
              .slice(0, 10)
          : "";
        setForm({
          nama_sayur: item.nama_sayur,
          harga: item.harga.toString(),
          tanggal: tanggalLocal,
        });
      }
      setLoading(false);
    }
    fetchData();
  }, [id]); // Pastikan dependency array menggunakan 'id' yang sudah di-resolve

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await UpdateHargaSayuran({
      id: Number(id), // Gunakan 'id' yang sudah di-resolve
      harga: Number(form.harga),
      tanggal: form.tanggal,
    });
    router.push("/harga");
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-md mx-auto mt-10 mb-5">
      <h1 className="text-2xl font-bold mb-4">Edit Harga Sayuran</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Nama Sayur</label>
          <input
            type="text"
            value={form.nama_sayur}
            disabled
            className="w-full border px-2 py-1"
          />
        </div>
        <div>
          <label>Harga</label>
          <input
            type="number"
            value={form.harga}
            onChange={(e) => setForm({ ...form, harga: e.target.value })}
            className="w-full border px-2 py-1"
            required
          />
        </div>
        <div>
          <label>Tanggal</label>
          <input
            type="date"
            value={form.tanggal}
            onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
            className="w-full border px-2 py-1"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Simpan
        </button>
      </form>
    </div>
  );
}