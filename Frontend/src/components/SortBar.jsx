function SortBar({
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder
}) {

    return (

        <div className="card shadow-sm mb-3">

            <div className="card-body">

                <div className="row">

                    <div className="col-md-8">

                        <div className="input-group">

                            <span className="input-group-text">
                                <i className="bi bi-sort-down"></i>
                            </span>

                            <select
                                className="form-select"
                                value={sortBy}
                                onChange={(e) =>
                                    setSortBy(e.target.value)
                                }
                            >

                                <option value="NONE">
                                    No Sorting
                                </option>

                                <option value="TITLE">
                                    Title
                                </option>

                                <option value="DEADLINE">
                                    Deadline
                                </option>

                                <option value="PRIORITY">
                                    Priority
                                </option>

                                <option value="HOURS">
                                    Estimated Hours
                                </option>

                            </select>

                        </div>

                    </div>

                    <div className="col-md-4">

                        <select
                            className="form-select"
                            value={sortOrder}
                            onChange={(e) =>
                                setSortOrder(e.target.value)
                            }
                        >

                            <option value="ASC">
                                Ascending ↑
                            </option>

                            <option value="DESC">
                                Descending ↓
                            </option>

                        </select>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default SortBar;