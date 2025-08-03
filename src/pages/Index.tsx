import { useState } from "react";
import { StudentForm, StudentData } from "@/components/StudentForm";
import { ResultCard } from "@/components/ResultCard";
import { ExportButtons } from "@/components/ExportButtons";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";

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
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-muted/30">
      <Navbar />
      <div className="p-4">
        {!showResult ? (
        <div className="container mx-auto py-8">
          <div className="animate-fade-in">
            <StudentForm onGenerateResult={handleGenerateResult} />
          </div>
        </div>
      ) : (
        <div className="container mx-auto py-8">
          <div className="mb-6 print:hidden animate-fade-in">
            <Button 
              onClick={handleBackToForm} 
              variant="outline" 
              className="flex items-center gap-2 hover:scale-105 transition-all duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Form
            </Button>
          </div>
          
          {studentData && (
            <div className="animate-fade-in">
              <ResultCard studentData={studentData} />
              <ExportButtons studentData={studentData} />
            </div>
          )}
        </div>
      )}
      </div>
    </div>
  );
};

export default Index;