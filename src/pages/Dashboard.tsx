
import { 
  Calendar, 
  User, 
  FileText, 
  Receipt, 
  Users, 
  LayoutDashboard, 
  UserPlus 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { AppointmentList } from "@/components/dashboard/AppointmentList";
import { RecentPatients } from "@/components/dashboard/RecentPatients";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, Dr. Johnson! Here&apos;s your overview for today.
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Appointment
          </Button>
          <Button variant="outline">
            <UserPlus className="mr-2 h-4 w-4" />
            New Patient
          </Button>
        </div>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Patients"
          value="1,254"
          icon={<User />}
          description="Active patient records"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Today's Appointments"
          value="24"
          icon={<Calendar />}
          description="3 pending confirmation"
          trend={{ value: 5, isPositive: true }}
        />
        <StatsCard
          title="Open Reports"
          value="12"
          icon={<FileText />}
          description="Awaiting your review"
          trend={{ value: 8, isPositive: false }}
        />
        <StatsCard
          title="Revenue"
          value="$24,345"
          icon={<Receipt />}
          description="This month"
          trend={{ value: 14, isPositive: true }}
        />
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Department Overview</CardTitle>
            <CardDescription>
              Patient distribution by department
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[200px] flex items-center justify-center rounded-md border-2 border-dashed">
              <div className="text-center">
                <LayoutDashboard className="mx-auto h-10 w-10 text-muted-foreground" />
                <p className="mt-2 text-sm font-medium">Department Chart will be displayed here</p>
                <p className="text-xs text-muted-foreground">
                  Visualizing patient distribution across departments
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Staff Activity</CardTitle>
            <CardDescription>
              Consultations by healthcare providers
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-[200px] flex items-center justify-center rounded-md border-2 border-dashed">
              <div className="text-center">
                <Users className="mx-auto h-10 w-10 text-muted-foreground" />
                <p className="mt-2 text-sm font-medium">Staff Activity Chart will be displayed here</p>
                <p className="text-xs text-muted-foreground">
                  Tracking doctor consultations and staff workload
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
        <AppointmentList />
        <RecentPatients />
      </div>
    </div>
  );
}
