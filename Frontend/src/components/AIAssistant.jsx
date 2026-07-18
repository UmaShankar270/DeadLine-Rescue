import { useState } from "react";
import { generateSuggestion } from "../services/aiService";

function AIAssistant() {

    const [answer, setAnswer] = useState("");

    const [loading, setLoading] = useState(false);

    const generate = async () => {

        setLoading(true);

        try {

            const response =
                await generateSuggestion();

            setAnswer(response.data.response);

        }
        catch {

            setAnswer("Unable to generate AI suggestion.");

        }

        setLoading(false);

    };

    return (

        <div className="card shadow mb-4">

            <div className="card-header bg-dark text-white">

                <h4>

                    🤖 Quick AI Planner

                </h4>

            </div>

            <div className="card-body">

                <button
                    className="btn btn-primary"
                    onClick={generate}
                >

                    Generate Today's Plan

                </button>

                {

                    loading &&

                    <p className="mt-3">

                        Thinking...

                    </p>

                }

                {

                    answer &&

                    <div className="alert alert-success mt-3">

                        <pre
                            style={{
                                whiteSpace: "pre-wrap",
                                margin: 0
                            }}
                        >
                            {answer}
                        </pre>

                    </div>

                }

            </div>

        </div>

    );

}

export default AIAssistant;