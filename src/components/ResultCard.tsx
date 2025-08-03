import { StudentData } from "./StudentForm";

interface ResultCardProps {
  studentData: StudentData;
}

export const ResultCard = ({ studentData }: ResultCardProps) => {
  // Calculate percentages and grades
  const calculateGrade = (percentage: number): string => {
    if (percentage >= 85) return "A";
    if (percentage >= 70) return "B";
    if (percentage >= 50) return "S";
    return "NI";
  };

  const subjectResults = Object.entries(studentData.subjects).map(([subject, marks]) => {
    const termPercentage = marks.termMarks;
    const examPercentage = marks.examMarks;
    const average = Math.round((termPercentage + examPercentage) / 2);
    const grade = calculateGrade(average);
    
    return {
      subject,
      termPercentage,
      examPercentage,
      average,
      grade
    };
  });

  const overallAverage = Math.round(
    subjectResults.reduce((sum, result) => sum + result.average, 0) / subjectResults.length
  );

  const overallGrade = calculateGrade(overallAverage);

  // Calculate class statistics (mock data for demonstration)
  const classHighest = Math.max(...subjectResults.map(r => r.average)) + Math.floor(Math.random() * 10);
  const classLowest = Math.min(...subjectResults.map(r => r.average)) - Math.floor(Math.random() * 10);
  const classAverage = overallAverage - Math.floor(Math.random() * 5) + Math.floor(Math.random() * 5);

  // Mock position in class
  const positionInClass = Math.floor(Math.random() * 30) + 1;

  const getProgressLabel = (grade: string): string => {
    switch (grade) {
      case "A": return "Excellent";
      case "B": return "Good";  
      case "S": return "Satisfactory";
      case "NI": return "Needs Improvement";
      default: return "";
    }
  };

  const today = new Date().toLocaleDateString();

  return (
    <div id="result-card" className="bg-white p-8 max-w-4xl mx-auto border-2 border-result-border print:border-black print:shadow-none" style={{ fontFamily: 'Times, serif' }}>
      {/* Header */}
      <div className="text-center mb-6 pb-4 border-b-2 border-result-border print:border-black">
        <div className="flex items-center justify-between">
          <div className="w-20 h-20 border-2 border-result-border print:border-black flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-bold">The</div>
              <div className="text-sm">Smart</div>
              <div className="text-sm">School</div>
              <div className="text-xs mt-1">Tomorrow is our Destiny</div>
              <div className="text-xs">A Project of The City School</div>
            </div>
          </div>
          
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-bold mb-2">The Smart School</h1>
            <div className="text-sm">
              <div>Campus Name: {studentData.campusName}</div>
              <div>Academic Year: {studentData.academicYear}, Term I</div>
              <div>Class {studentData.className} Result Card</div>
            </div>
          </div>
          
          <div className="w-20"></div>
        </div>
      </div>

      {/* Student Info */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <span className="font-semibold">Name: </span>
          <span className="border-b border-result-border print:border-black inline-block w-64">{studentData.name}</span>
        </div>
        <div>
          <span className="font-semibold">Roll No: </span>
          <span className="border-b border-result-border print:border-black inline-block w-32">{studentData.rollNo}</span>
        </div>
        <div>
          <span className="font-semibold">Class/Section: </span>
          <span className="border-b border-result-border print:border-black inline-block w-40">{studentData.className}/{studentData.section}</span>
        </div>
        <div>
          <span className="font-semibold">Age: </span>
          <span className="border-b border-result-border print:border-black inline-block w-32">{studentData.age}</span>
        </div>
      </div>

      {/* Academic Performance */}
      <div className="mb-6">
        <h3 className="text-center font-bold mb-4">Academic Performance</h3>
        <table className="w-full border-2 border-result-border print:border-black">
          <thead>
            <tr className="bg-result-table-header print:bg-gray-200">
              <th className="border border-result-border print:border-black p-2 text-left">Subject</th>
              <th className="border border-result-border print:border-black p-2">Term %</th>
              <th className="border border-result-border print:border-black p-2">Examination %</th>
              <th className="border border-result-border print:border-black p-2">Average %</th>
              <th className="border border-result-border print:border-black p-2">Grade</th>
            </tr>
          </thead>
          <tbody>
            {subjectResults.map((result, index) => (
              <tr key={index}>
                <td className="border border-result-border print:border-black p-2">{result.subject}</td>
                <td className="border border-result-border print:border-black p-2 text-center">{result.termPercentage}</td>
                <td className="border border-result-border print:border-black p-2 text-center">{result.examPercentage}</td>
                <td className="border border-result-border print:border-black p-2 text-center">{result.average}</td>
                <td className="border border-result-border print:border-black p-2 text-center">{result.grade}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="bg-result-table-header print:bg-gray-200 border-2 border-result-border print:border-black p-2">
            <div className="font-semibold">Overall %</div>
            <div>{overallAverage}</div>
          </div>
        </div>
        <div className="text-center">
          <div className="bg-result-table-header print:bg-gray-200 border-2 border-result-border print:border-black p-2">
            <div className="font-semibold">Overall Grade %</div>
            <div>{overallGrade}</div>
          </div>
        </div>
        <div className="text-center">
          <div className="bg-result-table-header print:bg-gray-200 border-2 border-result-border print:border-black p-2">
            <div className="font-semibold">Position in Class</div>
            <div>{positionInClass}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="bg-result-table-header print:bg-gray-200 border-2 border-result-border print:border-black p-2">
            <div className="font-semibold">Class Highest %</div>
            <div>{classHighest}</div>
          </div>
        </div>
        <div className="text-center">
          <div className="bg-result-table-header print:bg-gray-200 border-2 border-result-border print:border-black p-2">
            <div className="font-semibold">Class Lowest %</div>
            <div>{classLowest}</div>
          </div>
        </div>
        <div className="text-center">
          <div className="bg-result-table-header print:bg-gray-200 border-2 border-result-border print:border-black p-2">
            <div className="font-semibold">Class Average %</div>
            <div>{classAverage}</div>
          </div>
        </div>
      </div>

      {/* General Progress */}
      <div className="mb-6">
        <h3 className="text-center font-bold mb-4 bg-result-table-header print:bg-gray-200 border-2 border-result-border print:border-black p-2">General Progress</h3>
        <table className="w-full border-2 border-result-border print:border-black">
          <tbody>
            <tr>
              <td className="border border-result-border print:border-black p-2 text-center font-semibold">Art</td>
              <td className="border border-result-border print:border-black p-2 text-center font-semibold">Attendance</td>
              <td className="border border-result-border print:border-black p-2 text-center font-semibold">Conduct</td>
            </tr>
            <tr>
              <td className="border border-result-border print:border-black p-2 text-center">{studentData.generalProgress.art}</td>
              <td className="border border-result-border print:border-black p-2 text-center">{studentData.generalProgress.attendance}</td>
              <td className="border border-result-border print:border-black p-2 text-center">{studentData.generalProgress.conduct}</td>
            </tr>
            <tr>
              <td className="border border-result-border print:border-black p-2 text-center font-semibold">Effort</td>
              <td className="border border-result-border print:border-black p-2 text-center font-semibold">PE/Games</td>
              <td className="border border-result-border print:border-black p-2 text-center font-semibold">Punctuality</td>
            </tr>
            <tr>
              <td className="border border-result-border print:border-black p-2 text-center">{studentData.generalProgress.effort}</td>
              <td className="border border-result-border print:border-black p-2 text-center">{studentData.generalProgress.peGames}</td>
              <td className="border border-result-border print:border-black p-2 text-center">{studentData.generalProgress.punctuality}</td>
            </tr>
          </tbody>
        </table>
        
        <div className="text-center mt-2 text-sm">
          <strong>A = Excellent &nbsp;&nbsp; B = Good &nbsp;&nbsp; S = Satisfactory &nbsp;&nbsp; NI = Needs Improvement</strong>
        </div>
      </div>

      {/* Comments Sections */}
      <div className="space-y-4 mb-6">
        <div className="border-2 border-result-border print:border-black">
          <div className="bg-result-table-header print:bg-gray-200 p-2 font-semibold text-center">
            Clubs, Societies & Other Co-Curricular Activities – Overall Comments
          </div>
          <div className="p-4 min-h-[60px]">
            {studentData.clubsComments}
          </div>
        </div>

        <div className="border-2 border-result-border print:border-black">
          <div className="bg-result-table-header print:bg-gray-200 p-2 font-semibold text-center">
            Values Education – Overall Comments
          </div>
          <div className="p-4 min-h-[60px]">
            {studentData.valuesComments}
          </div>
        </div>
      </div>

      {/* Teachers Comments */}
      <div className="space-y-4 mb-6">
        <div>
          <span className="font-semibold">Class Teacher's Comments: </span>
          <span className="border-b border-result-border print:border-black inline-block w-full">
            {studentData.classTeacherComments}
          </span>
        </div>
        <div>
          <span className="font-semibold">School Head's Comments: </span>
          <span className="border-b border-result-border print:border-black inline-block w-full">
            {studentData.schoolHeadComments}
          </span>
        </div>
      </div>

      {/* Signatures */}
      <div className="grid grid-cols-4 gap-4 text-center">
        <div>
          <div className="border-b border-result-border print:border-black mb-2 pb-8"></div>
          <div className="font-semibold">Class Teacher</div>
          <div className="text-sm">{studentData.classTeacher}</div>
        </div>
        <div>
          <div className="border-b border-result-border print:border-black mb-2 pb-8"></div>
          <div className="font-semibold">Campus Stamp</div>
        </div>
        <div>
          <div className="border-b border-result-border print:border-black mb-2 pb-8"></div>
          <div className="font-semibold">Head of School</div>
          <div className="text-sm">{studentData.headOfSchool}</div>
        </div>
        <div>
          <div className="border-b border-result-border print:border-black mb-2 pb-8"></div>
          <div className="font-semibold">Date</div>
          <div className="text-sm">{today}</div>
        </div>
      </div>
    </div>
  );
};