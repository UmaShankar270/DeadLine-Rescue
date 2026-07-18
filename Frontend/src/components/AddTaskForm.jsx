import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
    createTask,
    updateTask
} from "../services/taskService";

function AddTaskForm({
    loadTasks,
    editingTask,
    setEditingTask
}) {

    const [task, setTask] = useState({
        title: "",
        deadline: "",
        status: "PENDING",
        estimatedHours: "",
        priority: "MEDIUM",
         description: ""
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (editingTask) {
            setTask(editingTask);
        }
    }, [editingTask]);

    const handleChange = (e) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        });
    };

    const validate = () => {

        let newErrors = {};

        if (!task.title.trim()) {
            newErrors.title = "Title is required";
        }

        if (!task.deadline) {
            newErrors.deadline = "Deadline is required";
        }

        if (!task.status) {
            newErrors.status = "Status is required";
        }

        if (
            task.estimatedHours === "" ||
            task.estimatedHours <= 0
        ) {
            newErrors.estimatedHours =
                "Estimated Hours must be greater than 0";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const resetForm = () => {

        setTask({
            title: "",
            deadline: "",
            status: "PENDING",
            estimatedHours: "",
             priority: "MEDIUM",
              description: ""
        });

        setErrors({});
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!validate()) return;

        try {

           if (editingTask) {

    await updateTask(task.id, task);

    toast.success("✅ Task Updated Successfully");

    setEditingTask(null);

} else {

    await createTask(task);

    toast.success("🎉 Task Added Successfully");

}

            loadTasks();

            resetForm();

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="card shadow">

            <div className="card-header bg-primary text-white">

                <h4 className="mb-0">

                    {
                        editingTask
                            ? "Update Task"
                            : "Add New Task"
                    }

                </h4>

            </div>

            <div className="card-body">

                <form onSubmit={handleSubmit}>

                    <div className="mb-3">

                        <label className="form-label">

                            Title

                        </label>

                        <input
                            type="text"
                            name="title"
                            className="form-control"
                            value={task.title}
                            onChange={handleChange}
                        />

                        <small className="text-danger">

                            {errors.title}

                        </small>

                    </div>

                    <div className="mb-3">

                        <label className="form-label">

                            Deadline

                        </label>

                        <input
                            type="date"
                            name="deadline"
                            className="form-control"
                            value={task.deadline}
                            onChange={handleChange}
                        />

                        <small className="text-danger">

                            {errors.deadline}

                        </small>

                    </div>

                    <div className="mb-3">

                        <label className="form-label">

                            Status

                        </label>

                        <select
                            name="status"
                            className="form-select"
                            value={task.status}
                            onChange={handleChange}
                        >

                            <option value="PENDING">

                                Pending

                            </option>

                            <option value="IN_PROGRESS">

                                In Progress

                            </option>

                            <option value="COMPLETED">

                                Completed

                            </option>

                        </select>

                    </div>
                    <div className="mb-3">

    <label className="form-label">
        Priority
    </label>

    <select
        name="priority"
        className="form-select"
        value={task.priority}
        onChange={handleChange}
    >

        <option value="LOW">
            🟢 Low
        </option>

        <option value="MEDIUM">
            🟡 Medium
        </option>

        <option value="HIGH">
            🔴 High
        </option>

    </select>

</div>

                    <div className="mb-3">

                        <label className="form-label">

                            Estimated Hours

                        </label>

                        <input
                            type="number"
                            name="estimatedHours"
                            className="form-control"
                            value={task.estimatedHours}
                            onChange={handleChange}
                        />

                        <small className="text-danger">

                            {errors.estimatedHours}

                        </small>

                    </div>
                    <div className="mb-3">

    <label className="form-label">
        Description
    </label>

    <textarea
        name="description"
        className="form-control"
        rows="4"
        value={task.description}
        onChange={handleChange}
        placeholder="Describe the task..."
    />

</div>

                    <button
                        className={
                            editingTask
                                ? "btn btn-warning w-100"
                                : "btn btn-success w-100"
                        }
                    >

                        {
                            editingTask
                                ? "Update Task"
                                : "Save Task"
                        }

                    </button>

                </form>

            </div>

        </div>

    );

}

export default AddTaskForm;