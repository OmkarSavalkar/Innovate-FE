import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { CategoryScale } from "chart.js";

const ExpertChart = (props: any) => {
  const { chartData } = props;
  ChartJS.register(CategoryScale);
  return <Bar data={chartData} />;
};
export default ExpertChart;
