import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface StudentData {
  name: string;
  className: string;
  section: string;
  rollNo: string;
  age: string;
  campusName: string;
  academicYear: string;
  subjects: {
    [key: string]: {
      termMarks: number;
      examMarks: number;
    };
  };
  generalProgress: {
    art: string;
    attendance: string;
    conduct: string;
    effort: string;
    peGames: string;
    punctuality: string;
  };
  clubsComments: string;
  valuesComments: string;
  classTeacherComments: string;
  schoolHeadComments: string;
  classTeacher: string;
  headOfSchool: string;
}

interface StudentFormProps {
  onGenerateResult: (data: StudentData) => void;
}

const subjects = [
  "English",
  "Urdu", 
  "Mathematics",
  "General Science",
  "Social Studies",
  "Islamiyat",
  "Tadrees-e-Quran (Naazrah Quran)",
  "Computer Studies"
];

const gradeOptions = ["A", "B", "S", "NI"];

export const StudentForm = ({ onGenerateResult }: StudentFormProps) => {
  const [formData, setFormData] = useState<StudentData>({
    name: "",
    className: "",
    section: "",
    rollNo: "",
    age: "",
    campusName: "",
    academicYear: "2024",
    subjects: subjects.reduce((acc, subject) => ({
      ...acc,
      [subject]: { termMarks: 0, examMarks: 0 }
    }), {}),
    generalProgress: {
      art: "",
      attendance: "",
      conduct: "",
      effort: "",
      peGames: "",
      punctuality: ""
    },
    clubsComments: "",
    valuesComments: "",
    classTeacherComments: "",
    schoolHeadComments: "",
    classTeacher: "",
    headOfSchool: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerateResult(formData);
  };

  const updateSubjectMarks = (subject: string, type: 'termMarks' | 'examMarks', value: number) => {
    setFormData(prev => ({
      ...prev,
      subjects: {
        ...prev.subjects,
        [subject]: {
          ...prev.subjects[subject],
          [type]: value
        }
      }
    }));
  };

  const updateGeneralProgress = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      generalProgress: {
        ...prev.generalProgress,
        [field]: value
      }
    }));
  };

  return (
    <Card className="w-full max-w-5xl mx-auto shadow-2xl border-0 bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 border-b border-border/50">
        <CardTitle className="text-center text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Student Result Card Generator
        </CardTitle>
        <p className="text-center text-muted-foreground mt-2">Enter student information and academic marks</p>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Student Basic Info */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-primary border-b border-border/50 pb-2">Student Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium text-foreground">Student Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter student name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="className" className="text-sm font-medium text-foreground">Class</Label>
                <Input
                  id="className"
                  value={formData.className}
                  onChange={(e) => setFormData(prev => ({ ...prev, className: e.target.value }))}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  placeholder="e.g., IV"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="section" className="text-sm font-medium text-foreground">Section</Label>
                <Input
                  id="section"
                  value={formData.section}
                  onChange={(e) => setFormData(prev => ({ ...prev, section: e.target.value }))}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter section"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rollNo" className="text-sm font-medium text-foreground">Roll No</Label>
                <Input
                  id="rollNo"
                  value={formData.rollNo}
                  onChange={(e) => setFormData(prev => ({ ...prev, rollNo: e.target.value }))}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter roll number"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="campusName" className="text-sm font-medium text-foreground">Campus Name</Label>
                <Input
                  id="campusName"
                  value={formData.campusName}
                  onChange={(e) => setFormData(prev => ({ ...prev, campusName: e.target.value }))}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter campus name"
                  required
                />
              </div>
            </div>
          </div>

          {/* Academic Performance */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-primary border-b border-border/50 pb-2">Academic Performance</h3>
            <div className="space-y-4">
              {subjects.map((subject) => (
                <div key={subject} className="bg-muted/30 rounded-lg p-4 border border-border/50 hover:border-primary/30 transition-all duration-200">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
                    <Label className="font-semibold text-foreground text-sm lg:text-base">{subject}</Label>
                    <div className="space-y-2">
                      <Label htmlFor={`${subject}-term`} className="text-xs text-muted-foreground">Term Marks (out of 100)</Label>
                      <Input
                        id={`${subject}-term`}
                        type="number"
                        min="0"
                        max="100"
                        value={formData.subjects[subject]?.termMarks || ""}
                        onChange={(e) => updateSubjectMarks(subject, 'termMarks', parseInt(e.target.value) || 0)}
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        placeholder="0"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`${subject}-exam`} className="text-xs text-muted-foreground">Exam Marks (out of 100)</Label>
                      <Input
                        id={`${subject}-exam`}
                        type="number"
                        min="0"
                        max="100"
                        value={formData.subjects[subject]?.examMarks || ""}
                        onChange={(e) => updateSubjectMarks(subject, 'examMarks', parseInt(e.target.value) || 0)}
                        className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                        placeholder="0"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* Comments */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-primary border-b border-border/50 pb-2">Comments (Optional)</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="clubsComments" className="text-sm font-medium text-foreground">Clubs & Co-Curricular Activities</Label>
                <Input
                  id="clubsComments"
                  value={formData.clubsComments}
                  onChange={(e) => setFormData(prev => ({ ...prev, clubsComments: e.target.value }))}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  placeholder="Optional comments"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="valuesComments" className="text-sm font-medium text-foreground">Values Education</Label>
                <Input
                  id="valuesComments"
                  value={formData.valuesComments}
                  onChange={(e) => setFormData(prev => ({ ...prev, valuesComments: e.target.value }))}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  placeholder="Optional comments"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="classTeacherComments" className="text-sm font-medium text-foreground">Class Teacher's Comments</Label>
                <Input
                  id="classTeacherComments"
                  value={formData.classTeacherComments}
                  onChange={(e) => setFormData(prev => ({ ...prev, classTeacherComments: e.target.value }))}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  placeholder="Optional comments"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="schoolHeadComments" className="text-sm font-medium text-foreground">School Head's Comments</Label>
                <Input
                  id="schoolHeadComments"
                  value={formData.schoolHeadComments}
                  onChange={(e) => setFormData(prev => ({ ...prev, schoolHeadComments: e.target.value }))}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  placeholder="Optional comments"
                />
              </div>
            </div>
          </div>

          {/* Authorities */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-primary border-b border-border/50 pb-2">School Authorities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="classTeacher" className="text-sm font-medium text-foreground">Class Teacher Name</Label>
                <Input
                  id="classTeacher"
                  value={formData.classTeacher}
                  onChange={(e) => setFormData(prev => ({ ...prev, classTeacher: e.target.value }))}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter teacher name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="headOfSchool" className="text-sm font-medium text-foreground">Head of School Name</Label>
                <Input
                  id="headOfSchool"
                  value={formData.headOfSchool}
                  onChange={(e) => setFormData(prev => ({ ...prev, headOfSchool: e.target.value }))}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  placeholder="Enter head name"
                  required
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl">
            Generate Result Card
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};