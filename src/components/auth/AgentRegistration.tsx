// =============================================================================
// AGENT REGISTRATION FORM - For New Agents After Google OAuth
// =============================================================================
// This component is shown when a user authenticates with Google but is not
// yet registered as an agent. It collects their business details.
// =============================================================================

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Building2 } from "lucide-react";

interface AgentRegistrationProps {
  onSuccess: () => void;
}

export const AgentRegistration = ({ onSuccess }: AgentRegistrationProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  
  // =============================================================================
  // REGISTRATION FORM STATE
  // =============================================================================
  const [formData, setFormData] = useState({
    businessName: "",
    phone: "",
    address: "",
    description: "",
    experience: ""
  });

  // =============================================================================
  // REGISTRATION FORM SUBMISSION HANDLER
  // =============================================================================
  // Submits agent registration details after Google OAuth authentication
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // STEP 1: Send registration data to backend with cookie authentication
      // Backend endpoint: POST /api/agents/register
      // Uses session cookie from Google OAuth for authentication
      const response = await fetch('/api/agents/register', {
        method: 'POST',
        credentials: 'include', // ✅ Include session cookie
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        // STEP 2: Registration successful
        toast({
          title: "Registration Complete!",
          description: "Your agent profile has been created successfully.",
        });
        onSuccess(); // Trigger parent component to refresh
      } else {
        // STEP 3: Handle registration failure
        toast({
          title: "Registration Failed",
          description: result.message || "Failed to complete registration.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // =============================================================================
  // FORM INPUT CHANGE HANDLER
  // =============================================================================
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-2 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Building2 className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Complete Your Profile</CardTitle>
            <p className="text-sm text-muted-foreground">
              Please provide your business details to start listing rooms
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Business name input */}
              <div>
                <Label htmlFor="businessName">Business/Agency Name</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => handleInputChange('businessName', e.target.value)}
                  placeholder="e.g., Lagos Student Housing Ltd"
                  required
                  disabled={loading}
                />
              </div>

              {/* Phone number input */}
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="e.g., +234 801 234 5678"
                  required
                  disabled={loading}
                />
              </div>

              {/* Business address input */}
              <div>
                <Label htmlFor="address">Business Address</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="e.g., Victoria Island, Lagos"
                  required
                  disabled={loading}
                />
              </div>

              {/* Business description */}
              <div>
                <Label htmlFor="description">Business Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder="Brief description of your business and services..."
                  rows={3}
                  disabled={loading}
                />
              </div>

              {/* Years of experience */}
              <div>
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  type="number"
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  placeholder="e.g., 5"
                  min="0"
                  disabled={loading}
                />
              </div>

              {/* Submit button */}
              <Button type="submit" className="w-full" disabled={loading}>
                <UserPlus className="w-4 h-4 mr-2" />
                {loading ? "Creating Profile..." : "Complete Registration"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentRegistration;