'use client';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('@/app/_components/chart/charts'), { ssr: false });
import { useState, useEffect } from 'react';
import { DataHargaSayuran} from "@/interface/sayuran";
import { GetHargaApi } from '@/lib/harga/api';
import { sortChart, sortCategories } from '@/lib/sortdata';


export default function MasterChart() {
    const [data, setData] = useState<DataHargaSayuran[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await GetHargaApi();
                setData(result);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const chartSeries = sortChart(data);
    const categories = sortCategories(data);
    // console.log(data);

    if (loading) return <div className='mt-20'>Loading data...</div>;
    if (error) return <div className='mt-20'>Error: {error}</div>;

    return (
        <div className='space-y-4 mb-4'>
            { Object.keys(chartSeries).map((vegetableName,index) => {
                let chartData:string[] = []; 
                const detailSayur = chartSeries[vegetableName];
            Object.keys(detailSayur).map(areaName => {
                return chartData.push(detailSayur[areaName]);
        })
            return (
                <div
                    key={categories[index]}>
                    <Chart
                    dataSeries={chartData}
                    vegetableName={categories[index]}
                    />
                    <p>
                    </p>
                </div>
            );
        }) 
    }
            </div>
    );
}
