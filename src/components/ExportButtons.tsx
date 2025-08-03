import { Button } from "@/components/ui/button";
import { Download, FileText, Printer } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun } from "docx";
import { StudentData } from "./StudentForm";

interface ExportButtonsProps {
  studentData: StudentData;
}

export const ExportButtons = ({ studentData }: ExportButtonsProps) => {
  const handlePrint = () => {
    window.print();
    toast({
      title: "Print",
      description: "Print dialog opened successfully.",
    });
  };

  const handleDownloadPDF = async () => {
    try {
      const element = document.getElementById('result-card');
      if (!element) {
        toast({
          title: "Error",
          description: "Result card not found. Please generate the result first.",
          variant: "destructive",
        });
        return;
      }

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${studentData.name}_Result_Card.pdf`);
      
      toast({
        title: "Success",
        description: "PDF downloaded successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDownloadDOCX = async () => {
    try {
      // Calculate results
      const subjectResults = Object.entries(studentData.subjects).map(([subject, marks]) => {
        const termPercentage = marks.termMarks;
        const examPercentage = marks.examMarks;
        const average = Math.round((termPercentage + examPercentage) / 2);
        const grade = average >= 85 ? "A" : average >= 70 ? "B" : average >= 50 ? "S" : "NI";
        return { subject, termPercentage, examPercentage, average, grade };
      });

      const overallAverage = Math.round(
        subjectResults.reduce((sum, result) => sum + result.average, 0) / subjectResults.length
      );

      // Create table rows for subjects
      const subjectRows = subjectResults.map(result =>
        new TableRow({
          children: [
            new TableCell({ children: [new Paragraph(result.subject)] }),
            new TableCell({ children: [new Paragraph(result.termPercentage.toString())] }),
            new TableCell({ children: [new Paragraph(result.examPercentage.toString())] }),
            new TableCell({ children: [new Paragraph(result.average.toString())] }),
            new TableCell({ children: [new Paragraph(result.grade)] }),
          ],
        })
      );

      const doc = new Document({
        sections: [
          {
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "The Smart School",
                    bold: true,
                    size: 32,
                  }),
                ],
                alignment: "center",
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Campus Name: ${studentData.campusName}`,
                    size: 24,
                  }),
                ],
                alignment: "center",
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Academic Year: ${studentData.academicYear}, Term I`,
                    size: 24,
                  }),
                ],
                alignment: "center",
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Class ${studentData.className} Result Card`,
                    size: 24,
                  }),
                ],
                alignment: "center",
              }),
              new Paragraph({ text: "" }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Name: ${studentData.name}`,
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Class/Section: ${studentData.className}/${studentData.section}`,
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Roll No: ${studentData.rollNo}`,
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Age: ${studentData.age}`,
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({ text: "" }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: "Academic Performance",
                    bold: true,
                    size: 28,
                  }),
                ],
                alignment: "center",
              }),
              new Table({
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Subject", bold: true })] })] }),
                      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Term %", bold: true })] })] }),
                      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Examination %", bold: true })] })] }),
                      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Average %", bold: true })] })] }),
                      new TableCell({ children: [new Paragraph({ children: [new TextRun({ text: "Grade", bold: true })] })] }),
                    ],
                  }),
                  ...subjectRows,
                ],
              }),
              new Paragraph({ text: "" }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Overall Average: ${overallAverage}%`,
                    bold: true,
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({ text: "" }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Class Teacher: ${studentData.classTeacher}`,
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Head of School: ${studentData.headOfSchool}`,
                    size: 24,
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new TextRun({
                    text: `Date: ${new Date().toLocaleDateString()}`,
                    size: 24,
                  }),
                ],
              }),
            ],
          },
        ],
      });

      const buffer = await Packer.toBuffer(doc);
      const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });
      saveAs(blob, `${studentData.name}_Result_Card.docx`);

      toast({
        title: "Success",
        description: "DOCX downloaded successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate DOCX. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex justify-center gap-4 mt-8 print:hidden">
      <Button onClick={handlePrint} variant="outline" className="flex items-center gap-2">
        <Printer className="h-4 w-4" />
        Print
      </Button>
      <Button onClick={handleDownloadPDF} className="flex items-center gap-2">
        <Download className="h-4 w-4" />
        Download PDF
      </Button>
      <Button onClick={handleDownloadDOCX} variant="secondary" className="flex items-center gap-2">
        <FileText className="h-4 w-4" />
        Download DOCX
      </Button>
    </div>
  );
};