import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
const ExpertChart = (props: any) => {
  const { chartData } = props;
  return <Bar data={chartData} />;
};
export default ExpertChart;
