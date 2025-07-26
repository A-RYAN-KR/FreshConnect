import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { GradientButton } from "../GradientButton";
import { register } from "../../services/authService";
import { UtensilsCrossed, Truck, MapPin, Loader2 } from "lucide-react";
import { Button } from "../ui/button";

export function RegisterForm() {
  
  const [userType, setUserType] = useState<"vendor" | "supplier">("vendor");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: {
      city: "",
      area: "",
      colony: "",
      coordinates: {
        lat: null as number | null,
        lng: null as number | null,
      },
    },
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parentKey, childKey] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parentKey]: { ...(prev as any)[parentKey], [childKey]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleGetCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            address: {
              ...prev.address,
              coordinates: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
            },
          }));
        },
        (error) => {
          console.error("Error getting coordinates:", error);
          setErrorMessage("Failed to get coordinates. Please enable location services.");
        }
      );
    } else {
      setErrorMessage("Geolocation is not supported by this browser.");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    setIsLoading(true);
    setErrorMessage("");

    try {
      await register({ ...formData, userType });
      // On successful registration, navigate to the main part of the app
      navigate('/marketplace');
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || "Registration failed. Please check your details and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-lg animate-fade-up shadow-lg border-none">
      <CardContent className="p-8">
        <form onSubmit={handleRegister} className="space-y-6">
          {/* --- USER TYPE SELECTION --- */}
          <div className="space-y-2">
            <Label className="font-semibold text-gray-800">I am a...</Label>
            <RadioGroup
              value={userType}
              onValueChange={(v) => setUserType(v as "vendor" | "supplier")}
              className="grid grid-cols-2 gap-4"
            >
              <Label className="flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all data-[state=checked]:border-orange-500 data-[state=checked]:bg-orange-50/50 data-[state=checked]:shadow-inner">
                <RadioGroupItem value="vendor" id="vendor" className="sr-only" />
                <UtensilsCrossed className="h-8 w-8 mb-2 text-orange-600" />
                <span className="font-medium text-gray-700">Food Vendor</span>
              </Label>
              <Label className="flex flex-col items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all data-[state=checked]:border-teal-500 data-[state=checked]:bg-teal-50/50 data-[state=checked]:shadow-inner">
                <RadioGroupItem value="supplier" id="supplier" className="sr-only" />
                <Truck className="h-8 w-8 mb-2 text-teal-600" />
                <span className="font-medium text-gray-700">Supplier</span>
              </Label>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input id="firstName" name="firstName" placeholder="John" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input id="lastName" name="lastName" placeholder="Doe" value={formData.lastName} onChange={handleChange} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" placeholder="Minimum 8 characters" value={formData.password} onChange={handleChange} required />
          </div>

          <fieldset className="border-t pt-4">
            <legend className="text-sm font-semibold text-gray-600 px-2 -ml-2">Business Address</legend>
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="address.city">City</Label>
                <Input id="address.city" name="address.city" placeholder="e.g., Pune" value={formData.address.city} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address.area">Area / Locality</Label>
                <Input id="address.area" name="address.area" placeholder="e.g., Bibwewadi" value={formData.address.area} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address.colony">Street / Colony / Landmark</Label>
                <Input id="address.colony" name="address.colony" placeholder="e.g., Near City Pride" value={formData.address.colony} onChange={handleChange} />
              </div>
            </div>
          </fieldset>

          <div className="space-y-2">
            <Label>Get Pinpoint Location (Optional)</Label>
            <div className="flex items-center space-x-4">
              <Button type="button" variant="outline" onClick={handleGetCoordinates} className="flex-shrink-0">
                <MapPin className="mr-2 h-4 w-4" />
                Use My Location
              </Button>
              <div className="text-xs text-gray-500">
                {formData.address.coordinates.lat ? (
                  <span>Coordinates captured!</span>
                ) : (
                  <span>Click to auto-fill your exact spot.</span>
                )}
              </div>
            </div>
          </div>

          {errorMessage && <p className="text-red-600 text-sm font-medium text-center">{errorMessage}</p>}

          <GradientButton type="submit" className="w-full h-12 text-base" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : 'Create Account'}
          </GradientButton>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center p-6 bg-amber-50/50 border-t">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/auth/login" className="font-semibold text-orange-600 hover:underline">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}