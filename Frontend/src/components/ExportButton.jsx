import { exportTasksPDF } from "../services/pdfService";

function ExportButton({ tasks }) {

    return (

        <button

            className="btn btn-danger mb-3"

            onClick={() => exportTasksPDF(tasks)}

        >

            📄 Export PDF

        </button>

    );

}

export default ExportButton;