import {
    DragDropContext
} from "@hello-pangea/dnd";

import KanbanColumn from "./KanbanColumn";

import "../styles/Kanban.css";

function KanbanBoard({
    tasks,
    onStatusChange
}) {

    const pending = tasks.filter(
        task => task.status === "PENDING"
    );

    const progress = tasks.filter(
        task => task.status === "IN_PROGRESS"
    );

    const completed = tasks.filter(
        task => task.status === "COMPLETED"
    );

    const handleDragEnd = (result) => {

        if (!result.destination) {

            return;

        }

        const sourceStatus =
            result.source.droppableId;

        const destinationStatus =
            result.destination.droppableId;

        if (
            sourceStatus ===
            destinationStatus
        ) {

            return;

        }

        onStatusChange(

            Number(result.draggableId),

            destinationStatus

        );

    };

    return (

        <div className="mt-5">

            <h2 className="text-center mb-4">

                📋 Kanban Board

            </h2>

            <DragDropContext
                onDragEnd={handleDragEnd}
            >

                <div className="kanban-board">

                    <KanbanColumn

                        title="Pending"

                        status="PENDING"

                        tasks={pending}

                    />

                    <KanbanColumn

                        title="In Progress"

                        status="IN_PROGRESS"

                        tasks={progress}

                    />

                    <KanbanColumn

                        title="Completed"

                        status="COMPLETED"

                        tasks={completed}

                    />

                </div>

            </DragDropContext>

        </div>

    );

}

export default KanbanBoard;