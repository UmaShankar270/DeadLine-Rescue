import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

function TaskChart({ tasks }) {

    const pending = tasks.filter(
        t => t.status === "PENDING"
    ).length;

    const progress = tasks.filter(
        t => t.status === "IN_PROGRESS"
    ).length;

    const completed = tasks.filter(
        t => t.status === "COMPLETED"
    ).length;

    const data = {
        labels: [
            "Pending",
            "In Progress",
            "Completed"
        ],
        datasets: [
            {
                data: [
                    pending,
                    progress,
                    completed
                ],
                backgroundColor: [
                    "#f59e0b",
                    "#3b82f6",
                    "#22c55e"
                ]
            }
        ]
    };

    return (

        <div className="card shadow mb-4">

            <div className="card-header bg-primary text-white">

                <h5 className="mb-0">

                    📊 Task Analytics

                </h5>

            </div>

            <div className="card-body">

                <div
                    style={{
                        width: "320px",
                        margin: "auto"
                    }}
                >

                    <Pie data={data} />

                </div>

            </div>

        </div>

    );

}

export default TaskChart;