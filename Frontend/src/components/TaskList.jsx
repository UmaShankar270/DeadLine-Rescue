import TaskCard from "./TaskCard";

function TaskList({

    tasks,

    onDelete,

    onEdit,

    reminderEmail

}) {

    return (

        <div>

            {

                tasks.map(task => (

                    <TaskCard

                        key={task.id}

                        task={task}

                        onDelete={onDelete}

                        onEdit={onEdit}

                        reminderEmail={reminderEmail}

                    />

                ))

            }

        </div>

    );

}

export default TaskList;