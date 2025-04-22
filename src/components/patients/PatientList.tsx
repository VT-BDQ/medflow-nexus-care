
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  FileText, 
  Calendar, 
  Edit, 
  Trash2 
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock patient data
type Patient = {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  phone: string;
  email: string;
  address: string;
  lastVisit: string;
  status: "Active" | "Inactive" | "Pending";
};

// Generate more mock data
const patients: Patient[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `P-${1000 + i}`,
  name: [
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
    "Alexander Davis",
    "Ava Martinez",
    "William Thompson",
    "Emily White",
    "Benjamin Taylor",
    "Abigail Brown",
    "Lucas Clark",
    "Elizabeth Lewis",
    "Mason King",
    "Charlotte Walker",
  ][i],
  age: Math.floor(Math.random() * 50) + 20,
  gender: ["Male", "Female", "Other"][Math.floor(Math.random() * 2)] as "Male" | "Female" | "Other",
  phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
  email: `patient${i}@example.com`,
  address: `${Math.floor(Math.random() * 9000) + 1000} Main St, Anytown, CA ${Math.floor(Math.random() * 90000) + 10000}`,
  lastVisit: new Date(Date.now() - Math.floor(Math.random() * 90) * 24 * 60 * 60 * 1000).toLocaleDateString(),
  status: ["Active", "Inactive", "Pending"][Math.floor(Math.random() * 3)] as "Active" | "Inactive" | "Pending",
}));

export function PatientList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [genderFilter, setGenderFilter] = useState<string>("all");

  // Filter patients based on search query and filters
  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      searchQuery === "" ||
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.phone.includes(searchQuery);

    const matchesStatus =
      statusFilter === "all" || patient.status === statusFilter;

    const matchesGender =
      genderFilter === "all" || patient.gender === genderFilter;

    return matchesSearch && matchesStatus && matchesGender;
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Patient Database</CardTitle>
        <CardDescription>
          View, search, and manage patient records.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <div className="flex flex-1 items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search by name, ID, email, or phone..."
                className="w-full bg-background pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
            >
              <SelectTrigger className="w-[160px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={genderFilter}
              onValueChange={setGenderFilter}
            >
              <SelectTrigger className="w-[160px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Genders</SelectItem>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead className="hidden md:table-cell">ID</TableHead>
                <TableHead className="hidden md:table-cell">Age/Gender</TableHead>
                <TableHead className="hidden md:table-cell">Contact</TableHead>
                <TableHead className="hidden md:table-cell">Last Visit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 border border-border">
                          <AvatarFallback className="bg-medical-soft-purple text-medical-primary">
                            {patient.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="font-medium">{patient.name}</div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Badge variant="outline" className="font-normal">
                        {patient.id}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {patient.age} / {patient.gender}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-col space-y-1">
                        <span className="text-xs">{patient.phone}</span>
                        <span className="text-xs text-muted-foreground">
                          {patient.email}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {patient.lastVisit}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          patient.status === "Active" ? "bg-green-100 text-green-700 hover:bg-green-100" :
                          patient.status === "Inactive" ? "bg-gray-100 text-gray-700 hover:bg-gray-100" :
                          "bg-blue-100 text-blue-700 hover:bg-blue-100"
                        }
                      >
                        {patient.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <FileText className="mr-2 h-4 w-4" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit Patient</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>Schedule Appointment</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete Record</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    No patients found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={filteredPatients.length === 0}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={filteredPatients.length === 0}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
