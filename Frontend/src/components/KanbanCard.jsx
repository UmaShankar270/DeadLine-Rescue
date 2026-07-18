import { Draggable } from "@hello-pangea/dnd";

function KanbanCard({ task, index }) {

    const getPriorityColor = () => {

        switch (task.priority) {

            case "HIGH":
                return "danger";

            case "MEDIUM":
                return "warning";

            default:
                return "success";

        }

    };

    return (

        <Draggable
            draggableId={task.id.toString()}
            index={index}
        >

            {(provided, snapshot) => (

                <div

                    ref={provided.innerRef}

                    {...provided.draggableProps}

                    {...provided.dragHandleProps}

                    className={
                        snapshot.isDragging
                            ? "kanban-card dragging"
                            : "kanban-card"
                    }

                >

                    <h5>

                        {task.title}
                        <hr/>

<p>

<strong>Description</strong>

<br/>

{task.description}

</p>

                    </h5>

                    <hr />

                    <p>

                        <strong>📅 Deadline:</strong>

                        <br />

                        {task.deadline}

                    </p>

                    <p>

                        <strong>⏰ Hours:</strong>

                        <br />

                        {task.estimatedHours}

                    </p>

                    <p>

                        <strong>Status</strong>

                    </p>

                    <span
                        className="badge bg-primary"
                    >

                        {task.status}

                    </span>

                    <br />
                    <br />

                    <span

                        className={
                            `badge bg-${getPriorityColor()}`
                        }

                    >

                        {task.priority}

                    </span>

                </div>

            )}

        </Draggable>

    );

}

export default KanbanCard;