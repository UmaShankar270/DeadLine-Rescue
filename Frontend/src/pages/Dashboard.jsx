import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Navbar from "../components/Navbar";
import Stats from "../components/Stats";
import Analytics from "../components/Analytics";
import TaskChart from "../components/TaskChart";
import CalendarView from "../components/CalendarView";
import AIPlanner from "../components/AIPlanner";
import AIChat from "../components/AiChat";

import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import ExportButton from "../components/ExportButton";

import AddTaskForm from "../components/AddTaskForm";
import TaskList from "../components/TaskList";
import KanbanBoard from "../components/KanbanBoard";

import {
    getAllTasks,
    deleteTask,
    updateTask
} from "../services/taskService";

function Dashboard() {

    const [tasks, setTasks] = useState([]);

    const [editingTask, setEditingTask] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");

    const [statusFilter, setStatusFilter] = useState("ALL");

    const [viewMode, setViewMode] = useState("LIST");

    const [reminderEmail, setReminderEmail] = useState("");

    useEffect(() => {

        loadTasks();

    }, []);

    const loadTasks = async () => {

        try {

            const response = await getAllTasks();

            setTasks(response.data);

        }
        catch (error) {

            console.error(error);

        }

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this task?")) return;

        try {

            await deleteTask(id);

            toast.success("🗑 Task Deleted Successfully");

            loadTasks();

        }
        catch {

            toast.error("Delete Failed");

        }

    };

    const handleStatusChange = async (id, newStatus) => {

        try {

            const task = tasks.find(t => t.id === id);

            if (!task) return;

            const updatedTask = {

                ...task,

                status: newStatus

            };

            await updateTask(id, updatedTask);

            toast.success("✅ Task Status Updated");

            loadTasks();

        }
        catch (error) {

            console.error(error);

            toast.error("Failed To Update Status");

        }

    };

    const filteredTasks = tasks.filter(task => {

        const search = task.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());

        const filter =
            statusFilter === "ALL"
                ? true
                : task.status === statusFilter;

        return search && filter;

    });

    return (

        <>

            <Navbar />

            <div className="container mt-4">

                <Stats tasks={tasks} />

                <Analytics tasks={tasks} />

                <TaskChart tasks={tasks} />

                <CalendarView tasks={tasks} />

                <AIPlanner />

                <AIChat />

                <div className="row mt-4">

                    <div className="col-lg-4">

                        <AddTaskForm
                            loadTasks={loadTasks}
                            editingTask={editingTask}
                            setEditingTask={setEditingTask}
                        />

                    </div>

                    <div className="col-lg-8">

                        <SearchBar
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                        />

                        <FilterBar
                            statusFilter={statusFilter}
                            setStatusFilter={setStatusFilter}
                        />

                        <ExportButton tasks={filteredTasks} />

                        <div className="d-flex justify-content-between align-items-center mb-3">

                            <h5 className="mb-0">

                                📋 Task View

                            </h5>

                            <div>

                                <button
                                    className={
                                        viewMode === "LIST"
                                            ? "btn btn-primary me-2"
                                            : "btn btn-outline-primary me-2"
                                    }
                                    onClick={() => setViewMode("LIST")}
                                >

                                    📄 List View

                                </button>

                                <button
                                    className={
                                        viewMode === "KANBAN"
                                            ? "btn btn-success"
                                            : "btn btn-outline-success"
                                    }
                                    onClick={() => setViewMode("KANBAN")}
                                >

                                    📋 Kanban View

                                </button>

                            </div>

                        </div>

                        <div className="card mb-3">

                            <div className="card-body">

                                <label className="form-label">

                                    📧 Reminder Email

                                </label>

                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter email to receive reminders"
                                    value={reminderEmail}
                                    onChange={(e) =>
                                        setReminderEmail(e.target.value)
                                    }
                                />

                            </div>

                        </div>

                        {

                            viewMode === "LIST"

                                ?

                                <TaskList
                                    tasks={filteredTasks}
                                    onDelete={handleDelete}
                                    onEdit={setEditingTask}
                                    reminderEmail={reminderEmail}
                                />

                                :

                                <KanbanBoard
                                    tasks={filteredTasks}
                                    onStatusChange={handleStatusChange}
                                />

                        }

                    </div>

                </div>

            </div>

        </>

    );

}

export default Dashboard;