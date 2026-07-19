import { useState } from "react";
import axios from "axios";

function AIPlanner() {

    const [plan, setPlan] = useState("");

    const [loading, setLoading] = useState(false);

    const generatePlan = async () => {

        setLoading(true);

        try {

            const response = await axios.post(
                "http://deadline-rescue-ps8b.onrender.com/ai/suggest"
            );

            setPlan(response.data.response);

        } catch {

            setPlan("Unable to generate plan.");

        }

        setLoading(false);

    };

    return (

        <div className="card shadow mb-4">

            <div className="card-header bg-success text-white">

                <h4 className="mb-0">

                    🤖 AI Weekly Planner

                </h4>

            </div>

            <div className="card-body">

                <button
                    className="btn btn-success mb-3"
                    onClick={generatePlan}
                >

                    Generate Weekly Planner

                </button>

                {

                    loading &&

                    <p>🤖 Generating...</p>

                }

                {

                    plan &&

                    <pre
                        style={{
                            whiteSpace: "pre-wrap",
                            fontFamily: "inherit"
                        }}
                    >
                        {plan}
                    </pre>

                }

            </div>

        </div>

    );

}

export default AIPlanner;