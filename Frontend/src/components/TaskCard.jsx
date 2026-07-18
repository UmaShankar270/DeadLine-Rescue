import "../styles/TaskCard.css";
import { sendReminder } from "../services/emailService";

function TaskCard({ task, onDelete, onEdit,  reminderEmail }) {

    const getRemainingDays = () => {

        const today = new Date();

        today.setHours(0, 0, 0, 0);

        const deadline = new Date(task.deadline);

        deadline.setHours(0, 0, 0, 0);

        const diff = Math.ceil(
            (deadline - today) / (1000 * 60 * 60 * 24)
        );

        if (diff > 1) {

            return {
                text: `⏳ ${diff} days left`,
                color: "text-success"
            };

        }

        if (diff === 1) {

            return {
                text: "⏳ Tomorrow",
                color: "text-warning"
            };

        }

        if (diff === 0) {

            return {
                text: "⚠ Due Today",
                color: "text-danger"
            };

        }

        return {
            text: `❌ Overdue by ${Math.abs(diff)} day(s)`,
            color: "text-danger"
        };

    };

    const getProgress = () => {

        if (task.status === "PENDING")
            return 20;

        if (task.status === "IN_PROGRESS")
            return 70;

        return 100;

    };

    const handleReminder = async () => {

    if (!reminderEmail) {

        alert("Please enter Reminder Email.");

        return;

    }

    try {

        await sendReminder(task.id, reminderEmail);

        alert("✅ Reminder Sent Successfully");

    } catch (error) {

        console.error(error);

        alert("❌ Failed To Send Email");

    }

};

    return (

        <div
            className="task-card"
            style={{
                borderLeft:
                    getRemainingDays().text.includes("Overdue")
                        ? "6px solid red"
                        : getRemainingDays().text.includes("Due Today")
                            ? "6px solid orange"
                            : "6px solid green"
            }}
        >

            <h3>{task.title}</h3>

            <p>
                <b>📅 Deadline:</b> {task.deadline}
            </p>

            <p className={getRemainingDays().color}>
                <b>{getRemainingDays().text}</b>
            </p>

            <p>
                <b>📌 Status:</b> {task.status}
            </p>

            <div className="mt-3">

                <div className="progress">

                    <div
                        className={
                            task.status === "COMPLETED"
                                ? "progress-bar bg-success"
                                : task.status === "IN_PROGRESS"
                                    ? "progress-bar bg-warning"
                                    : "progress-bar bg-danger"
                        }
                        role="progressbar"
                        style={{
                            width: `${getProgress()}%`
                        }}
                    >

                        {getProgress()}%

                    </div>

                </div>

            </div>

            <p className="mt-3">

                <b>Priority:</b>

                {
                    task.priority === "HIGH"
                        ? " 🔴 High"
                        : task.priority === "MEDIUM"
                            ? " 🟡 Medium"
                            : " 🟢 Low"
                }

            </p>

            <p>

                <b>⏰ Estimated Hours:</b> {task.estimatedHours}

            </p>

            <div className="d-flex gap-2 mt-3 flex-wrap">

                <button
                    className="btn btn-warning btn-sm"
                    onClick={() => onEdit(task)}
                >
                    ✏ Edit
                </button>

                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(task.id)}
                >
                    🗑 Delete
                </button>

                <button
                    className="btn btn-primary btn-sm"
                    onClick={handleReminder}
                >
                    📧 Reminder
                </button>

            </div>

        </div>

    );

}

export default TaskCard;