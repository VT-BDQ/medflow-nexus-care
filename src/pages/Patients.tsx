
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PatientList } from "@/components/patients/PatientList";
import { PatientRegistrationForm } from "@/components/patients/PatientRegistrationForm";

export default function Patients() {
  const [activeTab, setActiveTab] = useState("list");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Patient Management</h1>
        <p className="text-muted-foreground">
          View, search, and manage patient records
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="list">Patient List</TabsTrigger>
          <TabsTrigger value="register">Register Patient</TabsTrigger>
          <TabsTrigger value="import" disabled>Import Patients</TabsTrigger>
        </TabsList>
        <TabsContent value="list" className="space-y-4">
          <PatientList />
        </TabsContent>
        <TabsContent value="register" className="space-y-4">
          <PatientRegistrationForm />
        </TabsContent>
        <TabsContent value="import" className="space-y-4">
          <div className="flex h-[400px] items-center justify-center rounded-md border-2 border-dashed">
            <div className="text-center">
              <h3 className="text-lg font-medium">Patient Import</h3>
              <p className="text-sm text-muted-foreground">
                This feature is coming soon.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
