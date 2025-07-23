export interface ChartSeries{
  name: string,
  data: number[],
  color: string; 
}
export interface VegetableName {
  [vegetableName: string]: AreaName;
}

export interface AreaName {
  [areaName: string]: ChartSeries;
}

export interface HargaDataAPI {
  id: number;
  daerah_id: number;
  sayur_category_id: number;
  nama_sayur: string;
  nama_daerah: string;
  harga: number;
  timestamp: string;
}