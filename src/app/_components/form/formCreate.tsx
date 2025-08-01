// app/_components/forms/HargaForm.tsx (BUAT FILE BARU INI)
'use client'; // Penting: Ini harus Client Component!

import React, { useState } from 'react';
import { SelectInput} from "@/app/_components/form/form"; // Pastikan path benar
import NumberForm from './number-form';
import DatePicker from './date-picker';
import {Button} from "@/app/_components/button"; // Pastikan path benar
import { DataHargaSayuran, CategorySayuran, Daerah } from "@/interface/sayuran"; // Impor fungsi simpan dan tipe data
import { CreateHargaSayuran } from '@/lib/harga/api';

interface HargaFormProps {
  categorySayurOptions: { id: number; name: string }[];
  daerahOptions: { id: number; name: string }[];
}

export default function HargaForm({ categorySayurOptions, daerahOptions }: HargaFormProps) {
  const [selectedSayurCategoryId, setSelectedSayurCategoryId] = useState<number | null>(null);
  const [selectedDaerahId, setSelectedDaerahId] = useState<number | null>(null);
  const [harga, setHarga] = useState<number | ''>('');
  const [tanggal, setTanggal] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah refresh halaman default
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    // 1. Ambil data dari state
    if (selectedSayurCategoryId === null || selectedDaerahId === null || harga === '') {
      setError('Semua field wajib diisi.');
      setLoading(false);
      return;
    }

    try {
      const dataToSave = {
        sayur_category_id: selectedSayurCategoryId,
        daerah_id: selectedDaerahId,
        harga: Number(harga), // Pastikan harga adalah number
        tanggal: tanggal || undefined, // Gunakan tanggal jika ada, jika tidak undefined
      };

      console.log(dataToSave)

      // 2. Panggil API untuk menyimpan data
      const responseData = await CreateHargaSayuran(dataToSave); // Ini akan memanggil POST /api/harga
      
      setSuccessMessage(`Data ${responseData.nama_sayur || 'sayuran'} berhasil disimpan!`);
      
      // Reset formulir setelah berhasil
      setSelectedSayurCategoryId(null);
      setSelectedDaerahId(null);
      setHarga('');
      setTanggal('');

    } catch (err: any) {
      console.error("Error submitting data:", err);
      setError(`Gagal menyimpan data: ${err.message || 'Terjadi kesalahan tidak dikenal.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="max-w-lg space-y-2" onSubmit={handleSubmit}>
      <SelectInput
        key="sayurCategory"
        label="sayurCategory"
        name="Pilih Jenis Sayuran"
        option={categorySayurOptions}
        value={selectedSayurCategoryId !== null ? selectedSayurCategoryId.toString() : ''}
        onChange={(e) => setSelectedSayurCategoryId(Number(e.target.value))}
      />
      <SelectInput
        key="daerah"
        label="daerah"
        name="Pilih Daerah Sayuran Berasal"
        option={daerahOptions}
        value={selectedDaerahId !== null ? selectedDaerahId.toString() : ''}
        onChange={(e) => setSelectedDaerahId(Number(e.target.value))}
      />
      <NumberForm
        name="Masukan Harga Sayuran"
        value={harga}
        onChange={(e) => setHarga(Number(e.target.value))}
      />
      <DatePicker
        // Asumsi DatePicker memiliki prop `value` dan `onChange`
        value={tanggal}
        onChange={(e) => setTanggal(e.target.value)}
      />
      <Button
        name='Simpan'
        type="submit"
      >
      </Button>

      {loading && <p>Menyimpan data...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </form>
  );
}