
import { User } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Mock patient data
type Patient = {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  condition: string;
  status: "New" | "Follow-up" | "Critical" | "Stable";
  lastVisit: string;
};

const patients: Patient[] = [
  {
    id: "P-1234",
    name: "James Wilson",
    age: 42,
    gender: "Male",
    condition: "Hypertension",
    status: "Stable",
    lastVisit: "Today, 09:30 AM",
  },
  {
    id: "P-5678",
    name: "Emma Thompson",
    age: 35,
    gender: "Female",
    condition: "Pregnancy (2nd Trimester)",
    status: "Follow-up",
    lastVisit: "Today, 10:45 AM",
  },
  {
    id: "P-9012",
    name: "Michael Brown",
    age: 58,
    gender: "Male",
    condition: "Diabetes Type 2",
    status: "Follow-up",
    lastVisit: "Today, 12:00 PM",
  },
  {
    id: "P-3456",
    name: "Sophia Martinez",
    age: 29,
    gender: "Female",
    condition: "Knee Injury",
    status: "New",
    lastVisit: "Today, 02:15 PM",
  },
  {
    id: "P-7890",
    name: "David Lee",
    age: 67,
    gender: "Male",
    condition: "Coronary Artery Disease",
    status: "Critical",
    lastVisit: "Today, 03:30 PM",
  },
];

export function RecentPatients() {
  return (
    <Card className="col-span-1 lg:col-span-1">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Recent Patients</CardTitle>
        <CardDescription>{patients.length} patients visited today</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className="flex items-center justify-between rounded-lg border p-3 text-sm"
            >
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9 border border-border">
                  <AvatarFallback className="bg-medical-soft-purple text-medical-primary">
                    {patient.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{patient.name}</span>
                    <Badge variant="outline" className="h-5 px-1.5 text-xs font-normal">
                      {patient.id}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{patient.age} yrs, {patient.gender}</span>
                    <span>•</span>
                    <span>{patient.condition}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  className={
                    patient.status === "New" ? "bg-blue-100 text-blue-700 hover:bg-blue-100" :
                    patient.status === "Follow-up" ? "bg-purple-100 text-purple-700 hover:bg-purple-100" :
                    patient.status === "Critical" ? "bg-red-100 text-red-700 hover:bg-red-100" :
                    "bg-green-100 text-green-700 hover:bg-green-100"
                  }
                >
                  {patient.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
