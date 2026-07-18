import "../styles/SearchBar.css";

function SearchBar({ searchTerm, setSearchTerm }) {

    return (

        <div className="card shadow-sm mb-3">

            <div className="card-body">

                <div className="input-group">

                    <span className="input-group-text">

                        <i className="bi bi-search"></i>

                    </span>

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                </div>

            </div>

        </div>

    );

}

export default SearchBar;