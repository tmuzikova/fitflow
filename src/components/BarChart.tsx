import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels"; // Import the Data Labels plugin

// Register necessary components for Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels
);

interface BarChartProps {
  labels: string[];
  alltime_data: number[];
  ytd_data: number[];
  month_data: number[];
}

const BarChart: React.FC<BarChartProps> = ({
  labels,
  alltime_data,
  ytd_data,
  month_data,
}) => {
  const [selectedDataset, setSelectedDataset] = useState("alltime");

  // converts meters to kilometers and rounds to 2 decimals
  const formatDistance = (distance: number) => {
    return Number((distance / 1000).toFixed(2));
  };

  // converts the distance data from meters to kilometers
  const datasetMap: { [key: string]: number[] } = {
    alltime: alltime_data.map(formatDistance),
    ytd: ytd_data.map(formatDistance),
    month: month_data.map(formatDistance),
  };

  // Map the colors for each dataset
  const dataSetColors: {
    [key: string]: { bgColor: string; borderColor: string };
  } = {
    alltime: {
      bgColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
    },
    ytd: {
      bgColor: "rgba(192, 75, 75, 0.2)",
      borderColor: "rgba(192, 75, 75, 1)",
    },
    month: {
      bgColor: "rgba(206, 99, 154, 0.2)",
      borderColor: "rgba(206, 99, 154, 1)",
    },
  };

  // Function to handle the dataset change
  const handleDatasetChange = (timeframe: string) => {
    setSelectedDataset(timeframe);
  };

  const chartData = {
    labels,
    datasets: [
      {
        label:
          selectedDataset === "alltime"
            ? "All-time"
            : selectedDataset === "ytd"
            ? "YTD"
            : "Last 4 weeks",
        backgroundColor: dataSetColors[selectedDataset].bgColor,
        borderColor: dataSetColors[selectedDataset].borderColor,
        borderWidth: 1,
        data: datasetMap[selectedDataset], // Use the formatted dataset in kilometers
        borderRadius: 10,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
      datalabels: {
        display: true,
        color: "black",
        anchor: "end" as const,
        align: "top" as const,
        formatter: (value: number) => `${value} km`,
        font: {
          size: 12,
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "km",
          font: {
            size: 14,
          },
        },
        ticks: {
          callback: (value: string | number) => `${value} km`,
        },
      },
    },
  };

  return (
    <div className="flex flex-col ">
      {/* buttons for selecting dataset */}
      <div className="mb-4 flex flex-row gap-3 justify-center">
        <button
          onClick={() => handleDatasetChange("alltime")}
          className="rounded-md py-1 px-2"
          style={{
            backgroundColor:
              selectedDataset === "alltime"
                ? dataSetColors.alltime.bgColor
                : "gray",
            border: `2px solid ${
              selectedDataset === "alltime"
                ? dataSetColors.alltime.borderColor
                : "gray"
            }`,
            color: selectedDataset === "alltime" ? "white" : "black",
          }}
        >
          All-time
        </button>
        <button
          onClick={() => handleDatasetChange("ytd")}
          className="rounded-md py-1 px-2"
          style={{
            backgroundColor:
              selectedDataset === "ytd" ? dataSetColors.ytd.bgColor : "gray",
            border: `2px solid ${
              selectedDataset === "ytd" ? dataSetColors.ytd.borderColor : "gray"
            }`,
            color: selectedDataset === "ytd" ? "white" : "black",
          }}
        >
          YTD
        </button>
        <button
          onClick={() => handleDatasetChange("month")}
          className="rounded-md py-1 px-2"
          style={{
            backgroundColor:
              selectedDataset === "month"
                ? dataSetColors.month.bgColor
                : "gray",
            border: `2px solid ${
              selectedDataset === "month"
                ? dataSetColors.month.borderColor
                : "gray"
            }`,
            color: selectedDataset === "month" ? "white" : "black",
          }}
        >
          Last 4 weeks
        </button>
      </div>

      <div style={{ width: "50%", height: "250px", margin: "0 auto" }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
