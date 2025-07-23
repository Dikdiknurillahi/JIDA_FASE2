'use client';
import React, { useEffect, useRef } from 'react';
import ApexCharts from 'apexcharts';
import { ChartSeries, HargaDataAPI } from "@/interface/chart";

type Props = {
  dataSeries: ChartSeries[],
  vegetableName: string
  Date: string
}

function Chart({dataSeries, vegetableName}: Props) {
  const chartContainerRef = useRef(null);
  let chartInstance: ApexCharts | null = null;
  const formatterIDR = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0, // Opsional: jumlah digit desimal minimum
  maximumFractionDigits: 0, // Opsional: jumlah digit desimal maksimum
  });
  // console.log('chart', dataSeries);
  // console.log("Final chartSeries:", JSON.stringify(dataSeries, null, 2));
  const options = {
    series: dataSeries,
    chart: {
      height: "100%",
      maxWidth: "100%",
      type: "area",
      fontFamily: "Inter, sans-serif",
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
tooltip: {
  enabled: true,
  x: {
    show: true,
  },
  y: {
    show: true,
  },
},
grid: {
  show: false,
  strokeDashArray: 4,
  padding: {
    left: 2,
    right: 2,
    top: -26
  },
},
    legend: {
      show: true,
      labels: {
        colors: "#FFFFFF",
      }
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#1C64F2",
        gradientToColors: ["#1C64F2"],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 6,
    },
    xaxis: {
      // categories: date,
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
      labels: {
        formatter: function (value: number) {
          if (value === undefined) {
            return "Data Harga Belum Ada";
          } else {
            return formatterIDR.format(value);
          }
        }
      }
    },
  };

  useEffect(() => {
    if (chartContainerRef.current && typeof ApexCharts !== 'undefined') {
      if (chartInstance) {
        chartInstance.updateOptions(options);
      } else {
        chartInstance = new ApexCharts(chartContainerRef.current, options);
        chartInstance.render();
      }
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
      }
    };
  }, [dataSeries]);

  return (
    
<div className="max-w-6xl w-full bg-white rounded-lg shadow-sm dark:bg-gray-800 p-4 md:p-6 mx-auto">
  <div className="flex justify-between">
    <div>
          <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">{ vegetableName }</h5>
          <p className="text-base font-normal text-gray-500 dark:text-gray-400">Harga { vegetableName } Dari berbagai Daerah</p>
    </div>
  </div>
<div id="data-series-chart" ref={chartContainerRef}></div>
  <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-5">
    <div className="flex justify-between items-center pt-5">
    </div>
  </div>
</div>

  );
}

export default Chart;