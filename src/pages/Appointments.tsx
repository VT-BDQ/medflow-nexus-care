
import { AppointmentCalendar } from "@/components/appointments/AppointmentCalendar";

export default function Appointments() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Appointment Scheduling</h1>
        <p className="text-muted-foreground">
          Manage patient appointments and scheduling
        </p>
      </div>
      
      <AppointmentCalendar />
    </div>
  );
}
