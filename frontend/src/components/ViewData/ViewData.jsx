import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

function ViewData() {
  const [data, setData] = useState([]);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://expense-manager-xrfq.onrender.com/api/view-data");
        setData(res.data);

        const total = res.data.reduce(
          (sum, entry) => sum + entry.totalExpense,
          0
        );
        setGrandTotal(total);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  function formatToIndianCurrency(amount) {
    // Ensure amount is a number
    if (isNaN(amount)) {
      return "Invalid amount";
    }

    // Convert the number to a string
    amount = amount.toString();

    // Split the amount into integer and decimal parts
    let [integerPart, decimalPart] = amount.split(".");

    // Reverse the string, apply the regex to add commas, then reverse it back
    let reversedIntegerPart = integerPart.split("").reverse().join("");
    let reversedWithCommas = reversedIntegerPart.replace(
      /(\d{3})(?=\d)/g,
      "$1,"
    );
    let formattedInteger = reversedWithCommas.split("").reverse().join("");

    // Combine the integer and decimal parts
    let formattedAmount = formattedInteger;
    if (decimalPart !== undefined) {
      formattedAmount += "." + decimalPart;
    }

    // Add the currency prefix
    return `Rs.${formattedAmount}`;
  }
  // const generatePDF = () => {
  //   const doc = new jsPDF();
  //   doc.setFont("Noto Sans");
  //   const tableColumn = [
  //     "S.No",
  //     "Date-Time",
  //     "Logged By",
  //     "Item Name",
  //     "Quantity",
  //     "Expense",
  //     "Payment Method",
  //     "Remarks",
  //   ];
  //   const tableRows = [];

  //   data.forEach((entry, index) => {
  //     const entryData = [
  //       index + 1,
  //       new Date(entry.dateTime).toLocaleString(),
  //       entry.userName,
  //       entry.itemName,
  //       entry.itemQuantity,
  //       formatToIndianCurrency(entry.totalExpense),
  //       entry.paymentMethod,
  //       entry.remarks,
  //     ];
  //     tableRows.push(entryData);
  //   });

  //   // Total Expenses Sum
  //   const grandTotalExpenseRow = [
  //     "",
  //     "",
  //     "",
  //     "",
  //     "",
  //     formatToIndianCurrency(grandTotal),
  //     "",
  //     "Total Expense",
  //   ];
  //   tableRows.push(grandTotalExpenseRow);

  //   doc.autoTable(tableColumn, tableRows, { startY: 20 });
  //   doc.text("Expense Data", 14, 15);
  //   doc.save(`expense_data_${new Date().toISOString()}.pdf`);
  // };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont("Noto Sans");

    // Set heading font size, style, and color
    doc.setFontSize(28);
    doc.setFont("Noto Sans", "bold");
    doc.setTextColor(22, 160, 133); // Set the text color to a custom color (e.g., teal)

    // Center the heading text
    const pageWidth = doc.internal.pageSize.getWidth();
    const text = "Expense Data";
    const textWidth =
      (doc.getStringUnitWidth(text) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const textOffset = (pageWidth - textWidth) / 2;
    doc.text(text, textOffset, 15);

    // Reset font size, style, and color for table content
    doc.setFontSize(10);
    doc.setFont("Noto Sans", "normal");
    doc.setTextColor(0, 0, 0); // Reset text color to black

    const tableColumn = [
      "S.No",
      "Date-Time",
      "Logged By",
      "Item Name",
      "Quantity",
      "Expense",
      "Payment Method",
      "Remarks",
    ];

    const tableRows = [];

    data.forEach((entry, index) => {
      const entryData = [
        index + 1,
        new Date(entry.dateTime).toLocaleString(),
        entry.userName,
        entry.itemName,
        entry.itemQuantity,
        formatToIndianCurrency(entry.totalExpense),
        entry.paymentMethod,
        entry.remarks,
      ];
      tableRows.push(entryData);
    });

    // Total Expenses Sum
    const grandTotalExpenseRow = [
      "",
      "",
      "",
      "",
      "",
      formatToIndianCurrency(grandTotal),
      "",
      "Total Expense",
    ];
    tableRows.push(grandTotalExpenseRow);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30, // Start after the heading
      styles: {
        cellPadding: 2, // Adjust padding
        fontSize: 10, // Font size
        valign: "middle", // Vertical alignment
      },
      headStyles: {
        fillColor: [22, 160, 133], // Header background color
        textColor: 255, // Header text color
      },
      bodyStyles: {
        fillColor: [240, 240, 240], // Body cells background color
      },
      alternateRowStyles: {
        fillColor: [255, 255, 255], // Alternate row background color
      },
      margin: { top: 25 },
      tableLineColor: [255, 255, 255], // Color of the table's outer borders
      tableLineWidth: 1, // Width of the table's outer borders
    });

    doc.save(`expense_data_${new Date().toISOString()}.pdf`);
  };

  return (
    <>
      <div className="container mx-auto my-8 overflow-x-scroll">
        <h1 className="text-3xl font-bold mb-4">Expense Data</h1>
        <table className="min-w-full bg-white ">
          <thead>
            <tr>
              <th className="w-1/12 px-4 py-2">S.No</th>
              <th className="w-2/12 px-4 py-2">Date-Time</th>
              <th className="w-1/12 px-4 py-2">User Name</th>
              <th className="w-1/12 px-4 py-2">Item Name</th>
              <th className="w-1/12 px-4 py-2">Item Quantity</th>
              <th className="w-1/12 px-4 py-2">Total Expense</th>
              <th className="w-1/12 px-4 py-2">Payment Method</th>
              <th className="w-3/12 px-4 py-2">Remarks</th>
            </tr>
          </thead>
          <tbody>
            {data.map((entry, index) => (
              <tr key={entry._id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">
                  {new Date(entry.dateTime).toLocaleString()}
                </td>
                <td className="border px-4 py-2">{entry.userName}</td>
                <td className="border px-4 py-2">{entry.itemName}</td>
                <td className="border px-4 py-2">{entry.itemQuantity}</td>
                <td className="border px-4 py-2">{formatToIndianCurrency(entry.totalExpense)}</td>
                <td className="border px-4 py-2">{entry.paymentMethod}</td>
                <td className="border px-4 py-2">{entry.remarks}</td>
              </tr>
            ))}
            {/* Total Expense Row */}
            <tr>
              <td className="border px-4 py-2" colSpan="5"></td>
              <td className="border px-4 py-2 font-bold">{formatToIndianCurrency(grandTotal)}</td>
              <td className="border px-4 py-2 font-bold" colSpan="2">
                Total Expense
              </td>
            </tr>
          </tbody>
        </table>
        <button
          onClick={generatePDF}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Download PDF
        </button>
      </div>
    </>
  );
}

export default ViewData;
