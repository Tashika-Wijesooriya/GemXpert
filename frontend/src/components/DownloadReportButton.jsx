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
      className="inline-flex items-center px-6 py-2 text-sm font-medium text-center text-white bg-pink-600 rounded-full hover:bg-pink-700 transition-colors duration-200 focus:ring-4 focus:outline-none focus:ring-pink-300"
    >
      <svg
        className="w-5 h-5 mr-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
      Download Sales Report
    </button>
  );
};

export default DownloadReportButton;
