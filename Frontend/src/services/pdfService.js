import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportTasksPDF = (tasks) => {

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text("Deadline Rescue Report", 14, 18);

    doc.setFontSize(11);

    doc.text(
        `Generated : ${new Date().toLocaleString()}`,
        14,
        28
    );

    const tableData = tasks.map(task => [

        task.title,

        task.priority,

        task.status,

        task.deadline,

        task.estimatedHours

    ]);

    autoTable(doc, {

        startY: 40,

        head: [[
            "Title",
            "Priority",
            "Status",
            "Deadline",
            "Hours"
        ]],

        body: tableData

    });

    doc.save("Deadline-Rescue-Report.pdf");

};