import { useState } from "react";
import { StudentForm, StudentData } from "@/components/StudentForm";
import { ResultCard } from "@/components/ResultCard";
import { ExportButtons } from "@/components/ExportButtons";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Index = () => {
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleGenerateResult = (data: StudentData) => {
    setStudentData(data);
    setShowResult(true);
  };

  const handleBackToForm = () => {
    setShowResult(false);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      {!showResult ? (
        <div className="container mx-auto py-8">
          <StudentForm onGenerateResult={handleGenerateResult} />
        </div>
      ) : (
        <div className="container mx-auto py-8">
          <div className="mb-6 print:hidden">
            <Button onClick={handleBackToForm} variant="outline" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Form
            </Button>
          </div>
          
          {studentData && (
            <>
              <ResultCard studentData={studentData} />
              <ExportButtons studentData={studentData} />
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Index;