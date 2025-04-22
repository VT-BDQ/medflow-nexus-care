
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  FileText, 
  FilePlus, 
  FileImage, 
  FileIcon, 
  Download, 
  Printer, 
  Share2, 
  Pill, 
  ClipboardList
} from "lucide-react";
import { format } from "date-fns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Select, 
  SelectContent, 
  SelectItem,
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

// Mock patient data
const patient = {
  id: "P-1234",
  name: "James Wilson",
  dob: "1980-05-15",
  age: 43,
  gender: "Male",
  bloodType: "O+",
  allergies: ["Penicillin", "Sulfa drugs"],
  chronicConditions: ["Hypertension", "Type 2 Diabetes"],
};

// Mock visits data
const visits = [
  {
    id: "V-1001",
    date: "2023-04-15",
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    reason: "Chest pain and shortness of breath",
    diagnosis: "Unstable angina",
    notes: "Patient reported intermittent chest pain with exertion. ECG showed ST depression. Stress test scheduled.",
  },
  {
    id: "V-1002",
    date: "2023-05-20",
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    reason: "Follow-up for unstable angina",
    diagnosis: "Coronary artery disease",
    notes: "Stress test positive. Angiogram recommended. Started on beta blockers and statins.",
  },
  {
    id: "V-1003",
    date: "2023-06-05",
    doctor: "Dr. Michael Chen",
    specialty: "Interventional Cardiology",
    reason: "Coronary angiogram",
    diagnosis: "70% stenosis in LAD",
    notes: "Stent placed in LAD. Procedure well-tolerated. Dual antiplatelet therapy started.",
  },
  {
    id: "V-1004",
    date: "2023-07-10",
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    reason: "Post-stent follow-up",
    diagnosis: "Recovery from PCI",
    notes: "Patient reports improved exercise tolerance. No chest pain. Continue current medications.",
  },
  {
    id: "V-1005",
    date: "2023-09-05",
    doctor: "Dr. Emily Roberts",
    specialty: "Endocrinology",
    reason: "Diabetes management",
    diagnosis: "Type 2 Diabetes - suboptimal control",
    notes: "HbA1c 7.8%. Increased metformin dose. Nutritionist referral. Foot exam performed - normal.",
  },
];

// Mock prescriptions data
const prescriptions = [
  {
    id: "RX-5001",
    medication: "Metformin",
    dosage: "1000mg",
    frequency: "Twice daily",
    prescribed: "2023-09-05",
    duration: "3 months",
    prescriber: "Dr. Emily Roberts",
    refills: 2,
    active: true,
  },
  {
    id: "RX-5002",
    medication: "Atorvastatin",
    dosage: "40mg",
    frequency: "Once daily at bedtime",
    prescribed: "2023-07-10",
    duration: "6 months",
    prescriber: "Dr. Sarah Johnson",
    refills: 5,
    active: true,
  },
  {
    id: "RX-5003",
    medication: "Aspirin",
    dosage: "81mg",
    frequency: "Once daily",
    prescribed: "2023-06-05",
    duration: "12 months",
    prescriber: "Dr. Michael Chen",
    refills: 11,
    active: true,
  },
  {
    id: "RX-5004",
    medication: "Clopidogrel",
    dosage: "75mg",
    frequency: "Once daily",
    prescribed: "2023-06-05",
    duration: "3 months",
    prescriber: "Dr. Michael Chen",
    refills: 2,
    active: false,
  },
  {
    id: "RX-5005",
    medication: "Metoprolol",
    dosage: "50mg",
    frequency: "Twice daily",
    prescribed: "2023-05-20",
    duration: "Indefinite",
    prescriber: "Dr. Sarah Johnson",
    refills: 11,
    active: true,
  },
];

// Mock documents data
const documents = [
  {
    id: "DOC-001",
    name: "ECG Report",
    type: "pdf",
    date: "2023-04-15",
    uploadedBy: "Dr. Sarah Johnson",
    size: "2.4 MB",
  },
  {
    id: "DOC-002",
    name: "Stress Test Results",
    type: "pdf",
    date: "2023-05-10",
    uploadedBy: "Dr. Sarah Johnson",
    size: "3.1 MB",
  },
  {
    id: "DOC-003",
    name: "Coronary Angiogram",
    type: "image",
    date: "2023-06-05",
    uploadedBy: "Dr. Michael Chen",
    size: "5.7 MB",
  },
  {
    id: "DOC-004",
    name: "Post-Procedure Summary",
    type: "pdf",
    date: "2023-06-05",
    uploadedBy: "Dr. Michael Chen",
    size: "1.8 MB",
  },
  {
    id: "DOC-005",
    name: "Blood Work Results",
    type: "pdf",
    date: "2023-09-05",
    uploadedBy: "Dr. Emily Roberts",
    size: "1.2 MB",
  },
  {
    id: "DOC-006",
    name: "HbA1c Trend Chart",
    type: "image",
    date: "2023-09-05",
    uploadedBy: "Dr. Emily Roberts",
    size: "0.9 MB",
  },
];

// Create a mock lab results
const labResults = [
  {
    id: "LAB-001",
    test: "Complete Blood Count",
    date: "2023-09-05",
    orderedBy: "Dr. Emily Roberts",
    status: "Completed",
    hasAlert: true,
  },
  {
    id: "LAB-002",
    test: "Lipid Panel",
    date: "2023-07-10",
    orderedBy: "Dr. Sarah Johnson",
    status: "Completed",
    hasAlert: false,
  },
  {
    id: "LAB-003",
    test: "Metabolic Panel",
    date: "2023-07-10",
    orderedBy: "Dr. Sarah Johnson",
    status: "Completed",
    hasAlert: false,
  },
  {
    id: "LAB-004",
    test: "HbA1c",
    date: "2023-09-05",
    orderedBy: "Dr. Emily Roberts",
    status: "Completed",
    hasAlert: true,
  },
  {
    id: "LAB-005",
    test: "Thyroid Function",
    date: "2023-09-05",
    orderedBy: "Dr. Emily Roberts",
    status: "Pending",
    hasAlert: false,
  },
];

export function MedicalRecordsViewer() {
  const [activeTab, setActiveTab] = useState("summary");

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16 border border-border">
            <AvatarFallback className="bg-medical-soft-purple text-medical-primary text-xl">
              {patient.name.split(" ").map(n => n[0]).join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{patient.name}</h1>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>{patient.age} yrs, {patient.gender}</span>
              <span className="text-xl font-bold">•</span>
              <span>DOB: {format(new Date(patient.dob), "MMM d, yyyy")}</span>
              <Badge variant="outline">{patient.id}</Badge>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print Record
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <FilePlus className="mr-2 h-4 w-4" />
            Add Record
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="visits">Visits</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="labs">Lab Results</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        
        {/* Summary Tab */}
        <TabsContent value="summary" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Patient Information</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <dt className="font-medium text-muted-foreground">Age</dt>
                    <dd>{patient.age} years</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-muted-foreground">Gender</dt>
                    <dd>{patient.gender}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-muted-foreground">Blood Type</dt>
                    <dd>{patient.bloodType}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-muted-foreground">Patient ID</dt>
                    <dd>{patient.id}</dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Health Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <h3 className="font-medium text-muted-foreground">Allergies</h3>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {patient.allergies.map((allergy) => (
                        <Badge key={allergy} variant="outline" className="bg-red-50">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium text-muted-foreground">Chronic Conditions</h3>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {patient.chronicConditions.map((condition) => (
                        <Badge key={condition} variant="outline" className="bg-yellow-50">
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {visits.slice(0, 3).map((visit) => (
                  <div key={visit.id} className="rounded-lg border p-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-medical-primary" />
                        <span className="font-medium">{visit.doctor}</span>
                        <span className="text-sm text-muted-foreground">
                          {format(new Date(visit.date), "MMM d, yyyy")}
                        </span>
                      </div>
                      <Badge>{visit.specialty}</Badge>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-medium">{visit.diagnosis}</p>
                      <p className="text-sm text-muted-foreground">{visit.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t bg-muted/50 px-6 py-3">
              <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setActiveTab("visits")}>
                View All Visits
              </Button>
            </CardFooter>
          </Card>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Active Medications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {prescriptions.filter(p => p.active).slice(0, 3).map((prescription) => (
                    <div key={prescription.id} className="flex items-center justify-between rounded-lg border p-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <Pill className="h-4 w-4 text-medical-primary" />
                          <p className="font-medium">{prescription.medication}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {prescription.dosage} • {prescription.frequency}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {prescription.refills} refills
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 px-6 py-3">
                <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setActiveTab("prescriptions")}>
                  View All Medications
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">Recent Lab Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {labResults.filter(l => l.status === "Completed").slice(0, 3).map((lab) => (
                    <div key={lab.id} className="flex items-center justify-between rounded-lg border p-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <ClipboardList className="h-4 w-4 text-medical-primary" />
                          <p className="font-medium">{lab.test}</p>
                          {lab.hasAlert && (
                            <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Alert</Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(lab.date), "MMM d, yyyy")} • {lab.orderedBy}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">View</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50 px-6 py-3">
                <Button variant="ghost" size="sm" className="ml-auto" onClick={() => setActiveTab("labs")}>
                  View All Lab Results
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        
        {/* Visits Tab */}
        <TabsContent value="visits" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Visit History</CardTitle>
                <Button size="sm">
                  <FilePlus className="mr-2 h-4 w-4" />
                  New Visit
                </Button>
              </div>
              <CardDescription>
                Complete record of patient visits and consultations
              </CardDescription>
              <div className="flex items-center space-x-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by specialty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Specialties</SelectItem>
                    <SelectItem value="cardiology">Cardiology</SelectItem>
                    <SelectItem value="endocrinology">Endocrinology</SelectItem>
                  </SelectContent>
                </Select>
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search visits..."
                    className="w-full bg-background pl-8"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Specialty</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Diagnosis</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {visits.map((visit) => (
                    <TableRow key={visit.id}>
                      <TableCell>
                        {format(new Date(visit.date), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>{visit.doctor}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{visit.specialty}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="max-w-[200px] truncate" title={visit.reason}>
                          {visit.reason}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="font-medium">{visit.diagnosis}</div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View Details</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Prescriptions Tab */}
        <TabsContent value="prescriptions" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Medications & Prescriptions</CardTitle>
                <Button size="sm">
                  <FilePlus className="mr-2 h-4 w-4" />
                  New Prescription
                </Button>
              </div>
              <CardDescription>
                Current and past medications prescribed to the patient
              </CardDescription>
              <div className="flex items-center space-x-2">
                <Select defaultValue="active">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Prescriptions</SelectItem>
                    <SelectItem value="active">Active Only</SelectItem>
                    <SelectItem value="inactive">Inactive Only</SelectItem>
                  </SelectContent>
                </Select>
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search medications..."
                    className="w-full bg-background pl-8"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medication</TableHead>
                    <TableHead>Dosage</TableHead>
                    <TableHead>Frequency</TableHead>
                    <TableHead>Prescribed</TableHead>
                    <TableHead>Refills</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {prescriptions.map((prescription) => (
                    <TableRow key={prescription.id}>
                      <TableCell className="font-medium">
                        {prescription.medication}
                      </TableCell>
                      <TableCell>{prescription.dosage}</TableCell>
                      <TableCell>{prescription.frequency}</TableCell>
                      <TableCell>
                        {format(new Date(prescription.prescribed), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>{prescription.refills}</TableCell>
                      <TableCell>
                        <Badge 
                          className={cn(
                            prescription.active 
                              ? "bg-green-100 text-green-700 hover:bg-green-100" 
                              : "bg-gray-100 text-gray-700 hover:bg-gray-100"
                          )}
                        >
                          {prescription.active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Manage</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Lab Results Tab */}
        <TabsContent value="labs" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Laboratory Tests & Results</CardTitle>
                <Button size="sm">
                  <FilePlus className="mr-2 h-4 w-4" />
                  Order New Test
                </Button>
              </div>
              <CardDescription>
                Complete record of laboratory tests and their results
              </CardDescription>
              <div className="flex items-center space-x-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tests</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search tests..."
                    className="w-full bg-background pl-8"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Test Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Ordered By</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {labResults.map((lab) => (
                    <TableRow key={lab.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{lab.test}</span>
                          {lab.hasAlert && (
                            <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Alert</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        {format(new Date(lab.date), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>{lab.orderedBy}</TableCell>
                      <TableCell>
                        <Badge 
                          className={cn(
                            lab.status === "Completed" 
                              ? "bg-green-100 text-green-700 hover:bg-green-100" 
                              : "bg-blue-100 text-blue-700 hover:bg-blue-100"
                          )}
                        >
                          {lab.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">View Results</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Medical Documents</CardTitle>
                <div className="space-x-2">
                  <Button size="sm" variant="outline">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload
                  </Button>
                  <Button size="sm">
                    <FilePlus className="mr-2 h-4 w-4" />
                    New Document
                  </Button>
                </div>
              </div>
              <CardDescription>
                Medical reports, images, and other documents related to the patient
              </CardDescription>
              <div className="flex items-center space-x-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Documents</SelectItem>
                    <SelectItem value="pdf">PDF Reports</SelectItem>
                    <SelectItem value="image">Images</SelectItem>
                  </SelectContent>
                </Select>
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search documents..."
                    className="w-full bg-background pl-8"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {documents.map((document) => (
                  <Card key={document.id} className="overflow-hidden">
                    <div className="aspect-video bg-muted flex items-center justify-center">
                      {document.type === "pdf" ? (
                        <FileIcon className="h-12 w-12 text-red-500" />
                      ) : (
                        <FileImage className="h-12 w-12 text-blue-500" />
                      )}
                    </div>
                    <CardContent className="p-4">
                      <div className="space-y-1">
                        <h3 className="font-medium">{document.name}</h3>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>{format(new Date(document.date), "MMM d, yyyy")}</span>
                          <span>{document.size}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t p-4">
                      <Button variant="ghost" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Missing icon imports
function Search(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function Upload(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" x2="12" y1="3" y2="15" />
    </svg>
  );
}
