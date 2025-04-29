import { jsPDF } from "jspdf";

const DownloadReportButton = ({ orders }) => {
  // Function to generate and download the PDF report
  const downloadReport = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    // Title for the PDF
    doc.text("Sales Report", 20, 20);

    // Add column headers
    const headers = ["Order ID", "User", "Date", "Total", "Status"];
    let yPosition = 30;

    // Draw the headers
    headers.forEach((header, index) => {
      doc.text(header, 20 + index * 40, yPosition);
    });

    yPosition += 10;

    // Add the order data
    orders.forEach((order) => {
      doc.text(order._id.slice(-8).toUpperCase(), 20, yPosition);
      doc.text(order.user?.username || "Guest", 60, yPosition);
      doc.text(new Date(order.createdAt).toLocaleDateString(), 120, yPosition);
      doc.text(`$${order.totalPrice.toFixed(2)}`, 160, yPosition);
      doc.text(order.isPaid ? "Paid" : "Pending", 200, yPosition);
      yPosition += 10;
    });

    // Save the PDF
    doc.save("sales-report.pdf");
  };

  return (
    <button
      onClick={downloadReport}
      className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
    >
      Download Sales Report
    </button>
  );
};

export default DownloadReportButton;
