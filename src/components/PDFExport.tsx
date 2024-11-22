'use client';

import { useBudget } from '@/context/BudgetContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download } from 'lucide-react';

export default function PDFExport() {
  const { state } = useBudget();

  const generatePDF = async () => {
    const input = document.getElementById('pdf-content');
    if (!input) return;

    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('financial-report.pdf');
  };

  return (
    <button 
      onClick={generatePDF}
      className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      <Download size={20} />
      Export PDF
    </button>
  );
}