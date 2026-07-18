import "../styles/FilterBar.css";
function FilterBar({ statusFilter, setStatusFilter }) {

    return (

        <div className="card shadow-sm mb-3">

            <div className="card-body">

                <div className="input-group">

                    <span className="input-group-text">

                        <i className="bi bi-funnel-fill"></i>

                    </span>

                    <select
                        className="form-select"
                        value={statusFilter}
                        onChange={(e) =>
                            setStatusFilter(e.target.value)
                        }
                    >

                        <option value="ALL">
                            All Tasks
                        </option>

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

            </div>

        </div>

    );

}

export default FilterBar;