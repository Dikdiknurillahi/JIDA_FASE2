import { VegetableName, DataHargaSayuran} from "@/interface/sayuran";
import { CHART_COLORS } from "@/lib/color";

function sortChart(data: DataHargaSayuran[]): VegetableName {
  const groupedPricesByArea: VegetableName = {};

  data.forEach((item, index) => {
    if (!groupedPricesByArea[item.nama_sayur]) {
      groupedPricesByArea[item.nama_sayur] = {};
    }

    if (!groupedPricesByArea[item.nama_sayur][item.nama_daerah]) {
      groupedPricesByArea[item.nama_sayur][item.nama_daerah] = {
        name: item.nama_daerah,
        data: [],
        color: CHART_COLORS[index % CHART_COLORS.length],
      };
    }

    groupedPricesByArea[item.nama_sayur][item.nama_daerah].data.push(item.harga);
  });

  return groupedPricesByArea;
}


export { sortChart };