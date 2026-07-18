import {
    Droppable
} from "@hello-pangea/dnd";

import KanbanCard from "./KanbanCard";

function KanbanColumn({
    title,
    status,
    tasks
}) {

    return (

        <div className="kanban-column">

           <h3
className={
status==="PENDING"
?"text-danger text-center mb-3"
:status==="IN_PROGRESS"
?"text-warning text-center mb-3"
:"text-success text-center mb-3"
}
>

                {title}

                <span
                    className="badge bg-dark ms-2"
                >
                    {tasks.length}
                </span>

            </h3>

            <Droppable
                droppableId={status}
            >

                {(provided, snapshot) => (

                    <div

                        ref={provided.innerRef}

                        {...provided.droppableProps}

                        className={
                            snapshot.isDraggingOver
                                ? "drop-area active"
                                : "drop-area"
                        }

                    >

                        {
                            tasks.length === 0 && (

                                <div className="empty-column">

                                    Drop Tasks Here

                                </div>

                            )
                        }

                        {

                            tasks.map(
                                (
                                    task,
                                    index
                                ) => (

                                    <KanbanCard

                                        key={task.id}

                                        task={task}

                                        index={index}

                                    />

                                )
                            )

                        }

                        {provided.placeholder}

                    </div>

                )}

            </Droppable>

        </div>

    );

}

export default KanbanColumn;