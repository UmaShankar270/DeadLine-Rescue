import { useState } from "react";
import { chatWithAI } from "../services/aiService";

function AIChat() {

    const [question, setQuestion] = useState("");

    const [messages, setMessages] = useState([]);

    const [loading, setLoading] = useState(false);

    const askAI = async () => {

        if(question.trim()==="") return;

        const userMessage = {
            sender:"You",
            text:question
        };

        setMessages(prev=>[
            ...prev,
            userMessage
        ]);

        setLoading(true);

        try{

            const response =
                await chatWithAI(question);

            const aiMessage={
                sender:"AI",
                text:response.data.answer
            };

            setMessages(prev=>[
                ...prev,
                aiMessage
            ]);

        }
        catch(error){

            setMessages(prev=>[
                ...prev,
                {
                    sender:"AI",
                    text:"Unable to connect to Gemini."
                }
            ]);

        }

        setLoading(false);

        setQuestion("");

    };

    return(

        <div className="card shadow mt-4">

            <div className="card-header bg-dark text-white">

                <h4 className="mb-0">

                    🤖 AI Productivity Coach

                </h4>

            </div>

            <div
                className="card-body"
                style={{
                    height:"400px",
                    overflowY:"auto"
                }}
            >

                {
                    messages.length===0 &&

                    <p className="text-muted">

                        Ask anything about your tasks...

                    </p>

                }

                {

                    messages.map((message,index)=>(

                        <div
                            key={index}
                            className={
                                message.sender==="You"
                                ?"text-end mb-3"
                                :"text-start mb-3"
                            }
                        >

                            <b>

                                {message.sender}

                            </b>

                            <br/>

                            <div
                                className={
                                    message.sender==="You"
                                    ?"alert alert-primary d-inline-block"
                                    :"alert alert-success d-inline-block"
                                }
                            >

                                {message.text}

                            </div>

                        </div>

                    ))

                }

                {

                    loading &&

                    <p>

                        🤖 Thinking...

                    </p>

                }

            </div>

            <div className="card-footer">

                <div className="input-group">

                    <input

                        className="form-control"

                        value={question}

                        placeholder="Ask anything..."

                        onChange={(e)=>
                            setQuestion(e.target.value)
                        }

                        onKeyDown={(e)=>{

                            if(e.key==="Enter"){

                                askAI();

                            }

                        }}

                    />

                    <button

                        className="btn btn-primary"

                        onClick={askAI}

                    >

                        Send

                    </button>

                </div>

            </div>

        </div>

    );

}

export default AIChat;