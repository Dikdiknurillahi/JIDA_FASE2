"use client";
import { useState } from "react";
import MasterChart from "../chart/master-chart";
import Table from "../table/table";
import Link from "next/link";

export default function Tabs() {
  const [activeTab, setActiveTab] = useState<"chart" | "table">("chart");

  return (
    <div>
      <div className="border-b border-gray-800 mb-4 flex justify-between">
        <div>
        <button className="inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 ">
            <span className={`px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-transparent ${activeTab === "chart" ? "group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 text-white " : "bg-white"}`}
            onClick={() => setActiveTab("chart")}>
            Grafik
          </span>
        </button>
        <button className="inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 ">
            <span className={`px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-transparent ${activeTab === "table" ? "group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 text-white" : "bg-white"}`}
            onClick={() => setActiveTab("table")}>
            Tabel
          </span>
        </button>
        </div>
        <div>
          <Link href={`/harga/create`} className="inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 ">
            <span className={`px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-transparent`}
            >
            Tambah Data Sayuran
          </span>
        </Link>
        </div>
      </div>
      {activeTab === "chart" && <MasterChart />}
      {activeTab === "table" && <Table />}
    </div>
  );
}