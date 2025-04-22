
import { Calendar, Clock, User } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// Mock appointment data
type Appointment = {
  id: string;
  patientName: string;
  patientId: string;
  time: string;
  type: string;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  doctor: string;
};

const appointments: Appointment[] = [
  {
    id: "1",
    patientName: "James Wilson",
    patientId: "P-1234",
    time: "09:00 AM - 09:30 AM",
    type: "Check-up",
    status: "upcoming",
    doctor: "Dr. Sarah Johnson",
  },
  {
    id: "2",
    patientName: "Emma Thompson",
    patientId: "P-5678",
    time: "10:00 AM - 10:45 AM",
    type: "Consultation",
    status: "upcoming",
    doctor: "Dr. Sarah Johnson",
  },
  {
    id: "3",
    patientName: "Michael Brown",
    patientId: "P-9012",
    time: "11:30 AM - 12:00 PM",
    type: "Follow-up",
    status: "upcoming",
    doctor: "Dr. Sarah Johnson",
  },
  {
    id: "4",
    patientName: "Sophia Martinez",
    patientId: "P-3456",
    time: "01:30 PM - 02:15 PM",
    type: "Surgery Consultation",
    status: "upcoming",
    doctor: "Dr. Sarah Johnson",
  },
  {
    id: "5",
    patientName: "David Lee",
    patientId: "P-7890",
    time: "03:00 PM - 03:30 PM",
    type: "Check-up",
    status: "upcoming",
    doctor: "Dr. Sarah Johnson",
  },
];

export function AppointmentList() {
  return (
    <Card className="col-span-1 lg:col-span-1">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Today's Appointments</CardTitle>
        <CardDescription>You have {appointments.length} appointments today</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex items-center justify-between rounded-lg border p-3 text-sm"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-medical-primary" />
                  <span className="font-semibold">{appointment.patientName}</span>
                  <Badge variant="outline" className="h-5 px-1.5 text-xs font-normal">
                    {appointment.patientId}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{appointment.time}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="secondary"
                  className="font-normal"
                >
                  {appointment.type}
                </Badge>
                <Badge
                  className={cn(
                    "font-normal",
                    appointment.status === "upcoming" && "bg-blue-100 text-blue-700 hover:bg-blue-100",
                    appointment.status === "ongoing" && "bg-green-100 text-green-700 hover:bg-green-100",
                    appointment.status === "completed" && "bg-gray-100 text-gray-700 hover:bg-gray-100",
                    appointment.status === "cancelled" && "bg-red-100 text-red-700 hover:bg-red-100",
                  )}
                >
                  {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
