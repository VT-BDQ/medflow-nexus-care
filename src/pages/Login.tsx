
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Lock, Mail } from "lucide-react";

type UserRole = "admin" | "doctor" | "receptionist" | "billing" | "pharmacy" | "lab";

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState<UserRole>("doctor");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const email = (e.target as any).email.value;
    const password = (e.target as any).password.value;

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userRole', role);
    localStorage.setItem('userEmail', email);

    switch (role) {
      case 'doctor':
        navigate("/appointments");
        break;
      case 'receptionist':
        navigate("/patients");
        break;
      case 'billing':
        navigate("/billing");
        break;
      case 'pharmacy':
        navigate("/pharmacy");
        break;
      case 'lab':
        navigate("/laboratory");
        break;
      case 'admin':
        navigate("/dashboard");
        break;
      default:
        navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-medical-soft-purple p-4">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-3xl font-bold text-medical-primary">MedFlow</span>
          <span className="text-xl text-medical-secondary">Nexus</span>
        </div>
        <p className="text-muted-foreground">
          Healthcare Management System
        </p>
      </div>
      
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
          </CardDescription>
          {error && (
            <p className="text-sm font-medium text-destructive text-center">
              {error}
            </p>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="email" 
                  placeholder="Enter your email" 
                  type="email" 
                  className="pl-9"
                  defaultValue="doctor@example.com"
                  required 
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-xs text-medical-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  id="password" 
                  placeholder="Enter your password" 
                  type="password" 
                  className="pl-9"
                  defaultValue="password123" 
                  required 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Administrator</SelectItem>
                  <SelectItem value="doctor">Doctor</SelectItem>
                  <SelectItem value="receptionist">Receptionist</SelectItem>
                  <SelectItem value="billing">Billing Staff</SelectItem>
                  <SelectItem value="pharmacy">Pharmacy Staff</SelectItem>
                  <SelectItem value="lab">Laboratory Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="remember" />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-xs text-muted-foreground">
            <p>By signing in, you agree to our</p>
            <div className="flex justify-center space-x-2">
              <a href="#" className="text-medical-primary hover:underline">Terms of Service</a>
              <span>and</span>
              <a href="#" className="text-medical-primary hover:underline">Privacy Policy</a>
            </div>
          </div>
          <div className="text-center text-xs bg-medical-soft-purple rounded-md p-2">
            <p className="font-medium text-medical-primary">HIPAA & GDPR Compliant</p>
            <p className="text-muted-foreground">All data is encrypted and securely stored</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
