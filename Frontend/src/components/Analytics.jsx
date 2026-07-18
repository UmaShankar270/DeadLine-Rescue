import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
    Legend
} from "recharts";

function Analytics({ tasks }) {

    const total = tasks.length;

    const completed =
        tasks.filter(
            t => t.status === "COMPLETED"
        ).length;

    const pending =
        tasks.filter(
            t => t.status === "PENDING"
        ).length;

    const progress =
        tasks.filter(
            t => t.status === "IN_PROGRESS"
        ).length;

    const high =
        tasks.filter(
            t => t.priority === "HIGH"
        ).length;

    const medium =
        tasks.filter(
            t => t.priority === "MEDIUM"
        ).length;

    const low =
        tasks.filter(
            t => t.priority === "LOW"
        ).length;

    const estimatedHours =
        tasks.reduce(
            (sum, t) => sum + (t.estimatedHours || 0),
            0
        );

    const overdue =
        tasks.filter(
            t =>
                new Date(t.deadline) < new Date() &&
                t.status !== "COMPLETED"
        ).length;

    const completionRate =
        total === 0
            ? 0
            : ((completed / total) * 100).toFixed(1);

    const statusData = [
        { name: "Completed", value: completed },
        { name: "Pending", value: pending },
        { name: "In Progress", value: progress }
    ];

    const priorityData = [
        { name: "High", value: high },
        { name: "Medium", value: medium },
        { name: "Low", value: low }
    ];

    const COLORS = [
        "#22c55e",
        "#ef4444",
        "#f59e0b"
    ];

    return (

        <div className="card shadow mb-4">

            <div className="card-header bg-dark text-white">

                <h4>

                    📊 Analytics Dashboard

                </h4>

            </div>

            <div className="card-body">

                <div className="row text-center">

                    <div className="col">
                        <h5>Completion</h5>
                        <h2>{completionRate}%</h2>
                    </div>

                    <div className="col">
                        <h5>Overdue</h5>
                        <h2>{overdue}</h2>
                    </div>

                    <div className="col">
                        <h5>Hours</h5>
                        <h2>{estimatedHours}</h2>
                    </div>

                    <div className="col">
                        <h5>High Priority</h5>
                        <h2>{high}</h2>
                    </div>

                </div>

                <div className="row mt-5">

                    <div className="col-md-6">

                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >

                            <PieChart>

                                <Pie

                                    data={statusData}

                                    dataKey="value"

                                    outerRadius={100}

                                    label

                                >

                                    {

                                        statusData.map(
                                            (entry, index) => (

                                                <Cell

                                                    key={index}

                                                    fill={COLORS[index]}

                                                />

                                            )
                                        )

                                    }

                                </Pie>

                                <Tooltip />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>

                    <div className="col-md-6">

                        <ResponsiveContainer
                            width="100%"
                            height={300}
                        >

                            <BarChart
                                data={priorityData}
                            >

                                <CartesianGrid />

                                <XAxis dataKey="name" />

                                <YAxis />

                                <Tooltip />

                                <Legend />

                                <Bar
                                    dataKey="value"
                                    fill="#2563eb"
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Analytics;