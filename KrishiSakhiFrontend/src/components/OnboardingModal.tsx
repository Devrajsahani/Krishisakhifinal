// "use client";
// import { useState } from "react";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import { Check, Languages, Leaf, Mic } from "lucide-react";

// export default function OnboardingModal() {
//   const [open, setOpen] = useState(false);
//   const [name, setName] = useState("");
//   const [district, setDistrict] = useState<string | undefined>();
//   const [language, setLanguage] = useState<string | undefined>("ml");
//   const [crop, setCrop] = useState("");
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   function validate() {
//     const e: Record<string, string> = {};
//     if (!name.trim()) e.name = "Name is required";
//     if (!district) e.district = "Please select a district";
//     if (!language) e.language = "Pick a language";
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   }

//   function submit() {
//     if (!validate()) return;
//     setOpen(false);
//     const payload = { name, district, language, crop };
//     console.log("Onboarded farmer:", payload);
//   }

//   return (
//     <div id="onboard" className="shrink-0 inline-flex">
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogTrigger asChild>
//           <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 rounded-full px-6 py-3 text-base md:text-lg">Are you a farmer?</Button>
//         </DialogTrigger>
//         <DialogContent className="max-w-lg border-black/10 dark:border-white/10 backdrop-blur-xl bg-white/80 dark:bg-zinc-900/70">
//           <DialogHeader>
//             <div className="mx-auto h-12 w-12 grid place-content-center rounded-full bg-emerald-100 text-emerald-700"><Leaf/></div>
//             <DialogTitle className="text-center text-2xl">Farmer Onboarding</DialogTitle>
//             <DialogDescription className="text-center">
//               Get personalized agriculture guidance in your language.
//             </DialogDescription>
//             <div className="mt-2 flex items-center justify-center gap-2">
//               <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200"><Check className="mr-1 h-3 w-3"/> Crop Advisory</Badge>
//               <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200"><Languages className="mr-1 h-3 w-3"/> Multiple Languages</Badge>
//               <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200"><Mic className="mr-1 h-3 w-3"/> Voice</Badge>
//             </div>
//           </DialogHeader>
//           <div className="grid gap-4 pt-2">
//             <div className="grid gap-2">
//               <Label htmlFor="name">Full name</Label>
//               <Input id="name" placeholder="Suresh Kumar" value={name} onChange={(e)=>setName(e.target.value)} />
//               {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="crop">Primary crop</Label>
//               <Input id="crop" placeholder="Paddy, Coconut, Banana..." value={crop} onChange={(e)=>setCrop(e.target.value)} />
//             </div>
//             <div className="grid gap-2">
//               <Label>District</Label>
//               <Select onValueChange={setDistrict} value={district}>
//                 <SelectTrigger><SelectValue placeholder="Choose district" /></SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="thiruvananthapuram">Thiruvananthapuram</SelectItem>
//                   <SelectItem value="kollam">Kollam</SelectItem>
//                   <SelectItem value="pathanamthitta">Pathanamthitta</SelectItem>
//                   <SelectItem value="alappuzha">Alappuzha</SelectItem>
//                   <SelectItem value="kottayam">Kottayam</SelectItem>
//                   <SelectItem value="idukki">Idukki</SelectItem>
//                   <SelectItem value="ernakulam">Ernakulam</SelectItem>
//                   <SelectItem value="thrissur">Thrissur</SelectItem>
//                   <SelectItem value="palakkad">Palakkad</SelectItem>
//                   <SelectItem value="malappuram">Malappuram</SelectItem>
//                   <SelectItem value="kozhikode">Kozhikode</SelectItem>
//                   <SelectItem value="wayanad">Wayanad</SelectItem>
//                   <SelectItem value="kannur">Kannur</SelectItem>
//                   <SelectItem value="kasaragod">Kasaragod</SelectItem>
//                 </SelectContent>
//               </Select>
//               {errors.district && <p className="text-sm text-red-600">{errors.district}</p>}
//             </div>
//             <div className="grid gap-2">
//               <Label>Preferred language</Label>
//               <Select onValueChange={setLanguage} value={language}>
//                 <SelectTrigger><SelectValue placeholder="Select language" /></SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="ml">Malayalam</SelectItem>
//                   <SelectItem value="en">English</SelectItem>
//                   <SelectItem value="hi">Hindi</SelectItem>
//                   <SelectItem value="ta">Tamil</SelectItem>
//                 </SelectContent>
//               </Select>
//               {errors.language && <p className="text-sm text-red-600">{errors.language}</p>}
//             </div>
//             <Button onClick={submit} className="mt-2 bg-emerald-600 hover:bg-emerald-700">Start your journey</Button>
//             <Button variant="outline" onClick={()=>setOpen(false)}>I'm here for Business Solutions</Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }


// File: src/components/OnboardingModal.tsx
"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Check, Languages, Leaf, Mic } from "lucide-react";
import { apiService } from "@/services/api"; // Use our centralized API service

export default function OnboardingModal() {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [district, setDistrict] = useState<string | undefined>();
    const [language, setLanguage] = useState<string | undefined>("ml");
    const [crop, setCrop] = useState("");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    function validate() {
      const e: Record<string, string> = {};
      if (!name.trim()) e.name = "Name is required";
      if (!district) e.district = "Please select a district";
      if (!language) e.language = "Pick a language";
      if (!crop.trim()) e.crop = "Primary crop is required";
      setErrors(e);
      return Object.keys(e).length === 0;
    }

    const handleSubmit = async () => {
        if (!validate()) return;
        setIsLoading(true);
        setMessage('');
        // The payload now matches the backend requirements.
        // We can be confident because TypeScript would show an error if it didn't match our updated interface.
        const payload = {
            name,
            district: district!, // The '!' asserts that district is not undefined, which our validate() function ensures.
            language: language!,
            crop
        };

        try {
            const response = await apiService.createFarmerProfile(payload);
            setMessage(`Success! Profile for ${response.name} created.`);
            
            localStorage.setItem('farmerId', response._id);
            
            setTimeout(() => {
                setOpen(false);
                window.location.href = '/dashboard'; 
            }, 2000);
        } catch (error) {
            setMessage('Error: Could not create profile. Please try again.');
            console.error("API Error:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild> 
          <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 rounded-full px-6 py-3 text-base md:text-lg">Are you a farmer?</Button>
        </DialogTrigger> 
        <DialogContent className="max-w-lg border-black/10 dark:border-white/10 backdrop-blur-xl bg-white/80 dark:bg-zinc-900/70">
          <DialogHeader>
            <div className="mx-auto h-12 w-12 grid place-content-center rounded-full bg-emerald-100 text-emerald-700"><Leaf/></div>
            <DialogTitle className="text-center text-2xl">Farmer Onboarding</DialogTitle>
            <DialogDescription className="text-center">
              Get personalized agriculture guidance in your language.
            </DialogDescription>
            <div className="mt-2 flex items-center justify-center gap-2">
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 border-emerald-200"><Check className="mr-1 h-3 w-3"/> Crop Advisory</Badge>
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200"><Languages className="mr-1 h-3 w-3"/> Multiple Languages</Badge>
                <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-purple-200"><Mic className="mr-1 h-3 w-3"/> Voice</Badge>
            </div>
          </DialogHeader>
          <div className="grid gap-4 pt-2">
            <div className="grid gap-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" placeholder="Suresh Kumar" value={name} onChange={(e)=>setName(e.target.value)} />
                {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
            </div>
            <div className="grid gap-2">
                <Label htmlFor="crop">Primary crop</Label>
                <Input id="crop" placeholder="Paddy, Coconut, Banana..." value={crop} onChange={(e)=>setCrop(e.target.value)} />
                {errors.crop && <p className="text-sm text-red-600">{errors.crop}</p>} 
            </div>
            <div className="grid gap-2">
                <Label>District</Label>
                <Select onValueChange={setDistrict} value={district}>
                    <SelectTrigger><SelectValue placeholder="Choose district" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="thiruvananthapuram">Thiruvananthapuram</SelectItem>
                        <SelectItem value="kollam">Kollam</SelectItem>
                        <SelectItem value="pathanamthitta">Pathanamthitta</SelectItem>
                        <SelectItem value="alappuzha">Alappuzha</SelectItem>
                        <SelectItem value="kottayam">Kottayam</SelectItem>
                        <SelectItem value="idukki">Idukki</SelectItem>
                        <SelectItem value="ernakulam">Ernakulam</SelectItem>
                        <SelectItem value="thrissur">Thrissur</SelectItem>
                        <SelectItem value="palakkad">Palakkad</SelectItem>
                        <SelectItem value="malappuram">Malappuram</SelectItem>
                        <SelectItem value="kozhikode">Kozhikode</SelectItem>
                        <SelectItem value="wayanad">Wayanad</SelectItem>
                        <SelectItem value="kannur">Kannur</SelectItem>
                        <SelectItem value="kasaragod">Kasaragod</SelectItem>
                    </SelectContent>
                </Select>
                {errors.district && <p className="text-sm text-red-600">{errors.district}</p>}
            </div>
            <div className="grid gap-2">
                <Label>Preferred language</Label>
                <Select onValueChange={setLanguage} value={language}>
                    <SelectTrigger><SelectValue placeholder="Select language" /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ml">Malayalam</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">Hindi</SelectItem>
                        <SelectItem value="ta">Tamil</SelectItem>
                    </SelectContent>
                </Select>
                {errors.language && <p className="text-sm text-red-600">{errors.language}</p>}
            </div>
            {message && <p className="text-sm text-center my-2">{message}</p>}
            <DialogFooter className="flex-col gap-2">
                <Button onClick={handleSubmit} disabled={isLoading} className="w-full bg-emerald-600 hover:bg-emerald-700">
                    {isLoading ? "Saving..." : "Start Your Journey"}
                </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
  );
}