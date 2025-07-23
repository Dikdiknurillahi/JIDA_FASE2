'use client';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('@/app/_components/charts'), { ssr: false });
import { useState, useEffect,  useMemo } from 'react';
import { HargaDataAPI, VegetableName} from "@/interface/chart";
import { CHART_COLORS } from "@/lib/color";


export default function HomePage() {
    const [data, setData] = useState<HargaDataAPI[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/api/harga');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result: HargaDataAPI[] = await response.json();
                setData(result);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const { chartSeries, categories} = useMemo(() => {
        if (data.length === 0) {
            return { chartSeries: [], categories: [] };
        }
        const allUniqueVegetables = Array.from(new Set(data.map(item => item.nama_sayur))).sort();
        const timeStamp:string[] = Array.from(new Set(data.map(item => item.timestamp))).sort();
        const groupedPricesByArea: VegetableName = {};

        data.map((item,index) => {
            if (!groupedPricesByArea[item.nama_sayur]) {
                groupedPricesByArea[item.nama_sayur] = {};
            }
            if (!groupedPricesByArea[item.nama_sayur][item.nama_daerah]) {
                groupedPricesByArea[item.nama_sayur][item.nama_daerah] = {
                    name: item.nama_daerah,
                    data: [],
                    color : CHART_COLORS[index % CHART_COLORS.length]
                };
            }
            groupedPricesByArea[item.nama_sayur][item.nama_daerah].data.push(item.harga);
        });
        return { chartSeries: groupedPricesByArea, categories: allUniqueVegetables }; 

    }, [data]);

    if (loading) return <div>Loading data...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className='mt-20 space-y-4 mb-4'>
            <div className='mx-30' 
            >
                <h1 className='text-3xl font-bold'
                >Data Harga Sayur Dari Berbagai Daerah</h1>
                <p>Data harga dibawah ini dari petani ke pengepul/Bandar sayur dari berbagai daerah.</p>
            </div>
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
