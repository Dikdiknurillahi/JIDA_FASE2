import { useMemo } from 'react';
import { VegetableName, DataHargaSayuran} from "@/interface/sayuran";
import { CHART_COLORS } from "@/lib/color";

function sortCategories(data: DataHargaSayuran[]) {
    const allUniqueVegetables: string[] = Array.from(new Set(data.map(item => item.nama_sayur))).sort();
    return allUniqueVegetables;
}

function sortChart(data: DataHargaSayuran[]) {
    const { chartSeries} = useMemo(() => {
        if (data.length === 0) {
            return { chartSeries: []};
        }
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
        return { chartSeries: groupedPricesByArea}; 

    }, [data]);
    return chartSeries;
}

export { sortChart, sortCategories }