'use client';
import { useState,useEffect } from 'react';
import { GetHargaApi, DeleteHargaSayuran } from '@/lib/harga/api';
import { DataHargaSayuran} from "@/interface/sayuran";
import Link from 'next/link';

export default function Table() {
  const [data, setData] = useState<DataHargaSayuran[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await GetHargaApi();
                setData(result);
            } catch (err: unknown) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);
  
    async function handleDelete(id: number) {
    if (confirm('Yakin ingin menghapus data ini?')) {
      try {
        await DeleteHargaSayuran(id);
        setData((prev) => prev.filter((item) => item.id !== id));
      } catch (err: unknown) {
        alert('Gagal menghapus data: ' + err.message);
      }
    }
  }
  
    // ...existing code...
  // Sort data by tanggal terbaru ke terlama
  const sortedData = [...data].sort((a, b) => {
    const dateA = a.tanggal ? new Date(a.tanggal).getTime() : 0;
    const dateB = b.tanggal ? new Date(b.tanggal).getTime() : 0;
    return dateB - dateA; // terbaru di atas
  });
  
  const groupedByDaerah: Record<string, DataHargaSayuran[]> = sortedData.reduce((acc: Record<string, DataHargaSayuran[]>, currentItem) => {
    const { nama_daerah } = currentItem;
    if (!acc[nama_daerah]) {
      acc[nama_daerah] = [];
    }
    acc[nama_daerah].push(currentItem);
    return acc;
  }, {});
      if (loading) return <div className='mt-20'>Loading data...</div>;
    if (error) return <div className='mt-20'>Error: {error}</div>;

  return (
    
    <div className='space-y-4'>
      {Object.keys(groupedByDaerah).map((daerah) => (
        <div key={daerah} className="overflow-x-auto shadow-md sm:rounded-lg">
          <h2 className="text-xl font-semibold mb-2">{ daerah }</h2>
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                    Nama Sayuran
                </th>
                <th scope="col" className="px-6 py-3">
                    Tanggal
                </th>
                <th scope="col" className="px-6 py-3">
                    Harga
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
            <tbody>
              {groupedByDaerah[daerah].map((item: DataHargaSayuran) => (
            <tr key={item.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {item.nama_sayur}
                </th>
                <td className="px-6 py-4">
                    {formatTanggal(item.tanggal)}
                </td>
                <td className="px-6 py-4">
                    {formatRupiah(item.harga)}
                </td>
                <td className="px-6 py-4 space-x-2">
                    <Link href={`/harga/edit/${item.id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</Link>
                    <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-[12px] px-3 py-1.5 text-center" onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
                </tr>
                ))}
        </tbody>
    </table>
        </div>
              ))}
    </div>

  );
}

function formatRupiah(angka: string | number) {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(angka));
}

function formatTanggal(tanggal: string | null) {
  if (!tanggal) return '-';
  const date = new Date(tanggal);
  if (isNaN(date.getTime())) return '-';
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}