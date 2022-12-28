import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js"

import { Line } from "react-chartjs-2";
import { LoadingSpinner } from "./LoadingSpinner"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

export function Chart({ prop }) {

    const labels = prop.map(data => {
        return data.date
    })

    const prices = prop.map(data => {
        return data.price
    })

    const options = {
        responsive: true,
        plugins: {
            color: '#9cdaff73',
            layout: {
                padding: 10
            },
            legend: {
                display: false,
                position: 'top',
            },
            title: {
                display: true,
                text: 'Bitcoin Price 7D (USD)',
                color: '#9cdaff73',
            },
        },
        scales: {
            y: {
                ticks: {
                    stepSize: 250,
                    color: '#9cdaff73',
                }
            },
            x: {
                ticks: {
                    stepSize: 250,
                    color: '#9cdaff73',
                }
            }
        }
    }

    const data = {
        labels,
        datasets: [
            {
                label: "Price",
                data: prices,
                backgroundColor: "#63b5dd",
                borderColor: "#63b5dd",
                tension: 0.5,
            },
        ],
    }

    if (!prop) return <LoadingSpinner />

    return (
        <div className="chart-container">
            <Line options={options} data={data} />
        </div>
    )
}