
import { MedicalRecordsViewer } from "@/components/records/MedicalRecordsViewer";

export default function Records() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Medical Records</h1>
        <p className="text-muted-foreground">
          View and manage patient medical records
        </p>
      </div>
      
      <MedicalRecordsViewer />
    </div>
  );
}
