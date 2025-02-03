import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";

import { Chart, CategoryScale, LinearScale, BarElement, PointElement, LineElement, RadialLinearScale, Tooltip, Filler, Legend, ArcElement } from "chart.js";
Chart.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, RadialLinearScale, Tooltip, Filler, Legend, ArcElement);

export const BarChart = ({ data, stacked }) => {
    return (
        <Bar
            data={data}
            options={{
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        enabled: true,
                        displayColors: false,
                        backgroundColor: "#eff6ff",
                        titleFont: {
                            size: '13px',
                        },
                        titleColor: "#6783b8",
                        titleMarginBottom: 6,
                        bodyColor: "#9eaecf",
                        bodyFont: {
                            size: '12px',
                        },
                        bodySpacing: 4,
                        padding: 10,
                        footerMarginTop: 0,
                    },
                },
                maintainAspectRatio: false,
                scales: {
                    y:{
                        display: true,
                        stacked: !!stacked,
                        ticks: {
                            beginAtZero: true,
                            color:"#9eaecf",
                            font: {
                                size: '12px',
                            },
                            padding: 5,
                        },
                        grid: {
                            tickMarkLength: 0,
                        },
                    },
                    x:
                        {
                            display: true,
                            stacked: !!stacked,
                            ticks: {
                                color:"#9eaecf",
                                font: {
                                    size: '12px',
                                },
                                source: "auto",
                                padding: 5,
                            },
                            grid: {
                                color: "transparent",
                                tickMarkLength: 10,
                                zeroLineColor: "transparent",
                            },
                        },
                },
            }}
        />
    );
};

export const DoughnutChart = ({ data }) => {
    return (
        <Doughnut
            data={data}
            options={{
                plugins: {
                    legend: {
                        display: false,
                    },
                    tooltip: {
                        enabled: true,
                        displayColors: false,
                        backgroundColor: "#1c2b46",
                        titleFont: {
                            size: '13px',
                        },
                        titleColor: "#fff",
                        titleMarginBottom: 6,
                        bodyColor: "#fff",
                        bodyFont: {
                            size: '12px',
                        },
                        bodySpacing: 4,
                        padding: 10,
                        footerMarginTop: 0,
                        callbacks: {
                            label: function (context) {
                                return context.parsed.y;
                            },
                        },
                    },
                },
                rotation: 1,
                cutoutPercentage: 40,
                maintainAspectRatio: false,
            }}
        />
    );
};