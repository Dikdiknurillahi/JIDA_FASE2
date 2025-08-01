'use client';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('@/app/_components/chart/charts'), { ssr: false });
import { useState, useEffect } from 'react';
import { DataHargaSayuran, VegetableName, ChartSeries} from "@/interface/sayuran";
import { GetHargaApi } from '@/lib/harga/api';
import { sortChart} from '@/lib/sortdata';


export default function MasterChart() {
    const [data, setData] = useState<DataHargaSayuran[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await GetHargaApi();
                setData(result);
            } catch (error: unknown) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const chartSeries:VegetableName = sortChart(data);

    if (loading) return <div className='mt-20'>Loading data...</div>;
    if (error) return <div className='mt-20'>Error: {error}</div>;

    return (
        <div className='space-y-4 mb-4'>
            {Object.entries(chartSeries).map(([vegetableName, areaMap]) => {
        const chartData: ChartSeries[] = Object.values(areaMap);
        return (
            <div key={vegetableName}>
            <Chart
                dataSeries={chartData}
                vegetableName={vegetableName}
            />
            </div>
                );
            })}
        </div>
    );
}
