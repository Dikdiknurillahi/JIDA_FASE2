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

export interface tableSayur{
  [nama_daerah: string]: DataHargaSayuran;
}

export interface DataHargaSayuran {
  id: number;
  daerah_id: number;
  sayur_category_id: number;
  nama_sayur: string;
  nama_daerah: string;
  harga: number;
  tanggal: string;
}

export interface SelecInput {
  name: string,
  id: number
}

export interface CategorySayuran {
  nama_sayur:string,
  id:number,
}

export interface Daerah {
  nama_daerah:string,
  id:number,
}