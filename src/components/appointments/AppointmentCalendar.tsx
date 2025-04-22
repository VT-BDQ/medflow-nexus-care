
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format, isToday, isWeekend } from "date-fns";
import { Clock, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for appointments
interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  time: string;
  duration: number; // in minutes
  type: string;
  doctorId: string;
}

// Mock doctors
interface Doctor {
  id: string;
  name: string;
  specialty: string;
}

const doctors: Doctor[] = [
  { id: "d1", name: "Dr. Sarah Johnson", specialty: "Cardiologist" },
  { id: "d2", name: "Dr. Michael Chen", specialty: "Neurologist" },
  { id: "d3", name: "Dr. Emily Williams", specialty: "Pediatrician" },
  { id: "d4", name: "Dr. David Rodriguez", specialty: "Orthopedic Surgeon" },
  { id: "d5", name: "Dr. Jessica Taylor", specialty: "Dermatologist" },
];

// Generate random appointments for the next 30 days
const generateAppointments = (): Appointment[] => {
  const appointments: Appointment[] = [];
  const startDate = new Date();
  const endDate = new Date();
  endDate.setDate(endDate.getDate() + 30);

  for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
    // Skip weekends
    if (isWeekend(date)) continue;

    // Number of appointments for this day (random between 3-8)
    const numAppointments = Math.floor(Math.random() * 6) + 3;

    for (let i = 0; i < numAppointments; i++) {
      // Random hour between 9 AM and 4 PM
      const hour = Math.floor(Math.random() * 7) + 9;
      // Random minute (0, 15, 30, 45)
      const minute = [0, 15, 30, 45][Math.floor(Math.random() * 4)];
      
      const appointmentDate = new Date(date);
      appointmentDate.setHours(hour, minute);

      const duration = [15, 30, 45, 60][Math.floor(Math.random() * 4)];
      const doctorId = doctors[Math.floor(Math.random() * doctors.length)].id;
      
      appointments.push({
        id: `a${appointments.length + 1}`,
        patientName: [
          "James Wilson",
          "Emma Thompson",
          "Michael Brown",
          "Sophia Martinez",
          "David Lee",
          "Olivia Garcia",
          "Daniel Johnson",
          "Isabella Rodriguez",
          "Ethan Martin",
          "Mia Hernandez",
        ][Math.floor(Math.random() * 10)],
        patientId: `P-${1000 + Math.floor(Math.random() * 1000)}`,
        time: format(appointmentDate, "h:mm a"),
        duration,
        type: ["Check-up", "Follow-up", "Consultation", "Procedure", "Lab Results"][Math.floor(Math.random() * 5)],
        doctorId,
      });
    }
  }

  return appointments;
};

const appointments = generateAppointments();

export function AppointmentCalendar() {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedDoctor, setSelectedDoctor] = useState<string>("all");

  // Filter appointments for the selected date and doctor
  const filteredAppointments = appointments.filter((appointment) => {
    const appointmentDate = new Date(format(date, "yyyy-MM-dd"));
    const isSameDate = format(appointmentDate, "yyyy-MM-dd") === format(date, "yyyy-MM-dd");
    const matchesDoctor = selectedDoctor === "all" || appointment.doctorId === selectedDoctor;
    return isSameDate && matchesDoctor;
  });

  // Group appointments by time
  const appointmentsByTime = filteredAppointments.reduce<Record<string, Appointment[]>>(
    (acc, appointment) => {
      if (!acc[appointment.time]) {
        acc[appointment.time] = [];
      }
      acc[appointment.time].push(appointment);
      return acc;
    },
    {}
  );

  // Sort times
  const sortedTimes = Object.keys(appointmentsByTime).sort((a, b) => {
    const aDate = new Date(`2023-01-01 ${a}`);
    const bDate = new Date(`2023-01-01 ${b}`);
    return aDate.getTime() - bDate.getTime();
  });

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Calendar</CardTitle>
          <CardDescription>
            Select a date to view appointments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => date && setDate(date)}
            className="rounded-md border pointer-events-auto"
            modifiers={{
              booked: (date) => {
                const dateString = format(date, "yyyy-MM-dd");
                return appointments.some(
                  (a) => format(new Date(dateString), "yyyy-MM-dd") === format(date, "yyyy-MM-dd")
                );
              },
            }}
            modifiersClassNames={{
              booked: "border-2 border-medical-primary",
              today: "bg-medical-soft-purple text-medical-primary",
            }}
            components={{
              DayContent: (props) => (
                <div className="relative h-9 w-9 p-0 font-normal aria-selected:opacity-100">
                  <div className="flex h-full w-full items-center justify-center">
                    {props.date.getDate()}
                  </div>
                  {appointments.some(
                    (a) =>
                      format(new Date(format(props.date, "yyyy-MM-dd")), "yyyy-MM-dd") ===
                      format(props.date, "yyyy-MM-dd")
                  ) && (
                    <div className="absolute bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-medical-primary" />
                  )}
                </div>
              ),
            }}
          />

          <div className="mt-6">
            <Select
              value={selectedDoctor}
              onValueChange={setSelectedDoctor}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Doctor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Doctors</SelectItem>
                {doctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button className="mt-4 w-full">
            <Plus className="mr-2 h-4 w-4" />
            New Appointment
          </Button>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold">
              Appointments for {format(date, "MMMM d, yyyy")}
            </CardTitle>
            <CardDescription>
              {isToday(date) ? "Today" : format(date, "EEEE")}
              {filteredAppointments.length > 0
                ? ` • ${filteredAppointments.length} appointments`
                : " • No appointments"}
            </CardDescription>
          </div>
          <Badge
            variant="outline"
            className={cn(
              "px-2 py-1 text-xs font-medium",
              isWeekend(date) ? "bg-amber-100 text-amber-700" : "bg-medical-soft-purple text-medical-primary"
            )}
          >
            {isWeekend(date) ? "Weekend" : "Weekday"}
          </Badge>
        </CardHeader>
        <CardContent>
          {sortedTimes.length > 0 ? (
            <div className="space-y-6">
              {sortedTimes.map((time) => (
                <div key={time}>
                  <div className="mb-2 flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <h3 className="text-sm font-medium">{time}</h3>
                  </div>
                  <div className="space-y-2">
                    {appointmentsByTime[time].map((appointment) => {
                      const doctor = doctors.find((d) => d.id === appointment.doctorId);
                      return (
                        <div
                          key={appointment.id}
                          className="flex items-center justify-between rounded-lg border p-3"
                        >
                          <div className="space-y-1">
                            <div className="font-medium">{appointment.patientName}</div>
                            <div className="flex items-center text-xs text-muted-foreground">
                              <Badge variant="outline" className="mr-1 px-1 text-xs">
                                {appointment.patientId}
                              </Badge>
                              <span>
                                • {appointment.type} • {appointment.duration} min
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium">{doctor?.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {doctor?.specialty}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex h-32 items-center justify-center rounded-lg border border-dashed">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  No appointments scheduled for this date.
                </p>
                <Button size="sm" variant="outline" className="mt-2">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Appointment
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
