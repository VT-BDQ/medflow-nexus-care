
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-medical-primary p-4">
      <div className="mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-3xl font-bold text-medical-secondary">MedFlow</span>
          <span className="text-xl text-medical-accent">Nexus</span>
        </div>
        <p className="text-medical-accent/80">
          Healthcare Management System
        </p>
      </div>
      
      <Card className="w-full max-w-md shadow-medical border-2 border-medical-secondary/30 bg-medical-primary/90">
        <CardHeader className="space-y-1 bg-medical-secondary/20">
          <CardTitle className="text-2xl font-bold text-center text-medical-accent">Sign In</CardTitle>
          <CardDescription className="text-center text-medical-accent/70">
            Enter your credentials to access your account
          </CardDescription>
          {error && (
            <p className="text-sm font-medium text-red-500 text-center">
              {error}
            </p>
          )}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-medical-accent">Email</Label>
              <div className="relative">
                <Mail className="absolute left-2.5 top-2.5 h-4 w-4 text-medical-secondary" />
                <Input 
                  id="email" 
                  placeholder="Enter your email" 
                  type="email" 
                  className="pl-9 bg-medical-primary/50 border-medical-secondary text-medical-accent placeholder-medical-accent/50 focus:border-medical-secondary"
                  defaultValue="doctor@example.com"
                  required 
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-medical-accent">Password</Label>
                <a href="#" className="text-xs text-medical-secondary hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-2.5 top-2.5 h-4 w-4 text-medical-secondary" />
                <Input 
                  id="password" 
                  placeholder="Enter your password" 
                  type="password" 
                  className="pl-9 bg-medical-primary/50 border-medical-secondary text-medical-accent placeholder-medical-accent/50 focus:border-medical-secondary"
                  defaultValue="password123" 
                  required 
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="role" className="text-medical-accent">Role</Label>
              <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
                <SelectTrigger 
                  id="role" 
                  className="bg-medical-primary/50 border-medical-secondary text-medical-accent focus:border-medical-secondary"
                >
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent className="bg-medical-primary text-medical-accent">
                  <SelectItem value="admin" className="hover:bg-medical-secondary/20">Administrator</SelectItem>
                  <SelectItem value="doctor" className="hover:bg-medical-secondary/20">Doctor</SelectItem>
                  <SelectItem value="receptionist" className="hover:bg-medical-secondary/20">Receptionist</SelectItem>
                  <SelectItem value="billing" className="hover:bg-medical-secondary/20">Billing Staff</SelectItem>
                  <SelectItem value="pharmacy" className="hover:bg-medical-secondary/20">Pharmacy Staff</SelectItem>
                  <SelectItem value="lab" className="hover:bg-medical-secondary/20">Laboratory Staff</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="remember" 
                className="border-medical-secondary data-[state=checked]:bg-medical-secondary" 
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none text-medical-accent peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-medical-secondary hover:bg-medical-secondary/90 text-medical-primary"
            >
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-xs text-medical-accent/70">
            <p>By signing in, you agree to our</p>
            <div className="flex justify-center space-x-2">
              <a href="#" className="text-medical-secondary hover:underline">Terms of Service</a>
              <span>and</span>
              <a href="#" className="text-medical-secondary hover:underline">Privacy Policy</a>
            </div>
          </div>
          <div className="text-center text-xs bg-medical-secondary/10 rounded-md p-2">
            <p className="font-medium text-medical-secondary">HIPAA & GDPR Compliant</p>
            <p className="text-medical-accent/70">All data is encrypted and securely stored</p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

