import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

function CalendarView({ tasks }) {

    const events = tasks.map(task => ({
        title: task.title,
        start: new Date(task.deadline),
        end: new Date(task.deadline),
        allDay: true,
        resource: task
    }));

    const eventStyleGetter = (event) => {

        let backgroundColor = "#2563eb";

        if (event.resource.status === "COMPLETED") {
            backgroundColor = "#16a34a";
        } else if (event.resource.status === "IN_PROGRESS") {
            backgroundColor = "#f59e0b";
        } else {
            backgroundColor = "#dc2626";
        }

        return {
            style: {
                backgroundColor,
                color: "white",
                borderRadius: "6px",
                border: "none"
            }
        };

    };

    return (

        <div className="card shadow mb-4">

            <div className="card-header bg-primary text-white">

                <h4 className="mb-0">
                    📅 Task Calendar
                </h4>

            </div>

            <div
                className="card-body"
                style={{ height: "600px" }}
            >

                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    eventPropGetter={eventStyleGetter}
                />

            </div>

        </div>

    );

}

export default CalendarView;