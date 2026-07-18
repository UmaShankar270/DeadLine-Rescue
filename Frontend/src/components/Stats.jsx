import "../styles/Stats.css";

function Stats({ tasks }) {

    const total = tasks.length;

    const pending = tasks.filter(
        task => task.status === "PENDING"
    ).length;

    const completed = tasks.filter(
        task => task.status === "COMPLETED"
    ).length;


    const inProgress = tasks.filter(
        task => task.status === "IN_PROGRESS"
    ).length;
    const highPriority = tasks.filter(
    task => task.priority === "HIGH"
).length;

const today = new Date();

today.setHours(0,0,0,0);

const dueToday = tasks.filter(task => {

    const d = new Date(task.deadline);

    d.setHours(0,0,0,0);

    return d.getTime() === today.getTime();

}).length;

const overdue = tasks.filter(task => {

    const d = new Date(task.deadline);

    d.setHours(0,0,0,0);

    return d < today &&
           task.status !== "COMPLETED";

}).length;

const dueThisWeek = tasks.filter(task=>{

    const d=new Date(task.deadline);

    const diff=(d-today)/(1000*60*60*24);

    return diff>=0 && diff<=7;

}).length;

    return (

        <div className="stats-container">

            <div className="stat-card">
                <i className="bi bi-list-task fs-2 text-primary"></i>
                <h3>Total Tasks</h3>
                <h1>{total}</h1>
            </div>

            <div className="stat-card pending">
                <i className="bi bi-clock-history fs-2 text-warning"></i>
                <h3>Pending</h3>
                <h1>{pending}</h1>
            </div>

            <div className="stat-card progress-card">
                <i className="bi bi-arrow-repeat fs-2 text-info"></i>
                <h3>In Progress</h3>
                <h1>{inProgress}</h1>
            </div>

            <div className="stat-card completed">
                <i className="bi bi-check-circle-fill fs-2 text-success"></i>
                <h3>Completed</h3>
                <h1>{completed}</h1>
            </div>
            <div className="stat-card">

    <i className="bi bi-fire text-danger fs-2"></i>

    <h3>High Priority</h3>

    <h1>{highPriority}</h1>

</div>

<div className="stat-card">

    <i className="bi bi-alarm text-warning fs-2"></i>

    <h3>Due Today</h3>

    <h1>{dueToday}</h1>

</div>

<div className="stat-card">

    <i className="bi bi-calendar-week text-primary fs-2"></i>

    <h3>This Week</h3>

    <h1>{dueThisWeek}</h1>

</div>

<div className="stat-card">

    <i className="bi bi-exclamation-triangle text-danger fs-2"></i>

    <h3>Overdue</h3>

    <h1>{overdue}</h1>

</div>

        </div>

    );

}

export default Stats;