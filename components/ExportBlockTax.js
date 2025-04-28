import 'jspdf-autotable';
import jsPDF from 'jspdf';

export default function ExportBlockTax({ filteredTx }) {
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text('BlockTax Steuerreport', 14, 15);
    doc.autoTable({ head: [['Datum','Asset','Menge','Typ','Kurs','Wert (EUR)','Steuerfrei']], body: filteredTx.map(tx=>[tx.date,tx.asset,tx.amount,tx.type,tx.price,tx.valueEur,tx.taxFree?'Ja':'Nein']) });
    doc.save('blocktax-report.pdf');
  };
  const exportToCSV = () => {
    const header = ['Datum','Asset','Menge','Typ','Kurs','Wert (EUR)','Steuerfrei'].join(',') + '\n';
    const rows = filteredTx.map(tx=>[tx.date,tx.asset,tx.amount,tx.type,tx.price,tx.valueEur,tx.taxFree?'Ja':'Nein'].join(',')).join('\n');
    const blob = new Blob([header+rows], { type:'text/csv' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download='blocktax-transactions.csv'; a.click();
  };
  return (
    <div className="space-x-4">
      <button onClick={exportToPDF} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Export als PDF</button>
      <button onClick={exportToCSV} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Export als CSV</button>
    </div>
  );
}
