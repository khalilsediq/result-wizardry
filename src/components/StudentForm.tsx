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
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold text-primary">
          Student Result Card Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Student Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="name">Student Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="className">Class</Label>
              <Input
                id="className"
                value={formData.className}
                onChange={(e) => setFormData(prev => ({ ...prev, className: e.target.value }))}
                placeholder="e.g., IV"
                required
              />
            </div>
            <div>
              <Label htmlFor="section">Section</Label>
              <Input
                id="section"
                value={formData.section}
                onChange={(e) => setFormData(prev => ({ ...prev, section: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="rollNo">Roll No</Label>
              <Input
                id="rollNo"
                value={formData.rollNo}
                onChange={(e) => setFormData(prev => ({ ...prev, rollNo: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                value={formData.age}
                onChange={(e) => setFormData(prev => ({ ...prev, age: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="campusName">Campus Name</Label>
              <Input
                id="campusName"
                value={formData.campusName}
                onChange={(e) => setFormData(prev => ({ ...prev, campusName: e.target.value }))}
                required
              />
            </div>
          </div>

          {/* Academic Performance */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">Academic Performance</h3>
            <div className="space-y-3">
              {subjects.map((subject) => (
                <div key={subject} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                  <Label className="font-medium">{subject}</Label>
                  <div>
                    <Label htmlFor={`${subject}-term`} className="text-sm">Term Marks (out of 100)</Label>
                    <Input
                      id={`${subject}-term`}
                      type="number"
                      min="0"
                      max="100"
                      value={formData.subjects[subject]?.termMarks || ""}
                      onChange={(e) => updateSubjectMarks(subject, 'termMarks', parseInt(e.target.value) || 0)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor={`${subject}-exam`} className="text-sm">Exam Marks (out of 100)</Label>
                    <Input
                      id={`${subject}-exam`}
                      type="number"
                      min="0"
                      max="100"
                      value={formData.subjects[subject]?.examMarks || ""}
                      onChange={(e) => updateSubjectMarks(subject, 'examMarks', parseInt(e.target.value) || 0)}
                      required
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* General Progress */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-primary">General Progress</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries({
                art: "Art",
                attendance: "Attendance", 
                conduct: "Conduct",
                effort: "Effort",
                peGames: "PE/Games",
                punctuality: "Punctuality"
              }).map(([key, label]) => (
                <div key={key}>
                  <Label>{label}</Label>
                  <Select value={formData.generalProgress[key as keyof typeof formData.generalProgress]} onValueChange={(value) => updateGeneralProgress(key, value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {gradeOptions.map(grade => (
                        <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </div>

          {/* Comments */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="clubsComments">Clubs, Societies & Other Co-Curricular Activities Comments</Label>
              <Input
                id="clubsComments"
                value={formData.clubsComments}
                onChange={(e) => setFormData(prev => ({ ...prev, clubsComments: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="valuesComments">Values Education Comments</Label>
              <Input
                id="valuesComments"
                value={formData.valuesComments}
                onChange={(e) => setFormData(prev => ({ ...prev, valuesComments: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="classTeacherComments">Class Teacher's Comments</Label>
              <Input
                id="classTeacherComments"
                value={formData.classTeacherComments}
                onChange={(e) => setFormData(prev => ({ ...prev, classTeacherComments: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="schoolHeadComments">School Head's Comments</Label>
              <Input
                id="schoolHeadComments"
                value={formData.schoolHeadComments}
                onChange={(e) => setFormData(prev => ({ ...prev, schoolHeadComments: e.target.value }))}
              />
            </div>
          </div>

          {/* Authorities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="classTeacher">Class Teacher Name</Label>
              <Input
                id="classTeacher"
                value={formData.classTeacher}
                onChange={(e) => setFormData(prev => ({ ...prev, classTeacher: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="headOfSchool">Head of School Name</Label>
              <Input
                id="headOfSchool"
                value={formData.headOfSchool}
                onChange={(e) => setFormData(prev => ({ ...prev, headOfSchool: e.target.value }))}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Generate Result Card
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};