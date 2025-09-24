// "use client";

// import { useState, useRef, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   CloudRain,
//   Droplets,
//   ThermometerSun,
//   IndianRupee,
//   TrendingUp,
//   AlertTriangle,
//   Stethoscope,
//   Camera,
//   UserCheck,
//   Activity,
//   PhoneCall,
//   Mic,
//   Square,
// } from "lucide-react";
// import { useI18n } from "@/lib/i18n";

// export const DashboardPage = () => {
//   const { t } = useI18n();
//   const [diagnosisImage, setDiagnosisImage] = useState<File | null>(null);
//   const [diagnosisResult, setDiagnosisResult] = useState<null | {
//     disease: string;
//     confidence: number;
//     advisory: string;
//   }>(null);
//   const [activities, setActivities] = useState<
//     Array<{ label: string; date: string }>
//   >([{ label: "Irrigation", date: "22 Sep 2025" }]);
//   const [otherNote, setOtherNote] = useState("");

//   // Voice logging state
//   const [isRecording, setIsRecording] = useState(false);
//   const [voiceError, setVoiceError] = useState<string | null>(null);
//   const recognitionRef = useRef<any>(null);

//   // File input ref to trigger camera/file picker
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const handleDiagnose = () => {
//     if (!diagnosisImage) return;
//     // Mocked result for demo as per spec
//     setDiagnosisResult({
//       disease: "Leaf Blight",
//       confidence: 85,
//       advisory:
//         "Ensure proper drainage and use a recommended copper-based fungicide.",
//     });
//   };

//   const handleUploadAndDiagnose = () => {
//     if (!diagnosisImage) {
//       // Open camera/file picker
//       fileInputRef.current?.click();
//       return;
//     }
//     handleDiagnose();
//   };

//   const quickLog = (label: string) => {
//     const date = new Date();
//     const dd = date.getDate().toString().padStart(2, "0");
//     const mmm = date.toLocaleString("en-US", { month: "short" });
//     const yyyy = date.getFullYear();
//     setActivities((prev) => [{ label, date: `${dd} ${mmm} ${yyyy}` }, ...prev]);
//   };

//   const logOther = () => {
//     if (!otherNote.trim()) return;
//     quickLog(otherNote.trim());
//     setOtherNote("");
//   };

//   const startVoiceLog = async () => {
//     setVoiceError(null);
//     // Prefer Web Speech API if available
//     const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
//     if (SpeechRecognition) {
//       try {
//         // Ask for mic permission explicitly to show prompt
//         await navigator.mediaDevices.getUserMedia({ audio: true });
//       } catch (e) {
//         setVoiceError("Microphone permission denied");
//         return;
//       }
//       const recognition = new SpeechRecognition();
//       recognition.lang = "en-IN"; // Works reasonably for multi-lingual basic phrases
//       recognition.interimResults = false;
//       recognition.maxAlternatives = 1;
//       recognition.onstart = () => setIsRecording(true);
//       recognition.onerror = (event: any) => {
//         setVoiceError(event?.error || "Voice recognition error");
//         setIsRecording(false);
//       };
//       recognition.onend = () => setIsRecording(false);
//       recognition.onresult = (event: any) => {
//         const transcript = event.results?.[0]?.[0]?.transcript || "";
//         if (transcript) quickLog(transcript);
//       };
//       recognitionRef.current = recognition;
//       recognition.start();
//       return;
//     }

//     // Fallback: request mic permission only (cannot transcribe without API)
//     try {
//       await navigator.mediaDevices.getUserMedia({ audio: true });
//       setVoiceError("Voice recognition not supported in this browser");
//     } catch (e) {
//       setVoiceError("Microphone not available");
//     }
//   };

//   const stopVoiceLog = () => {
//     try {
//       recognitionRef.current?.stop?.();
//     } catch {}
//     setIsRecording(false);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-emerald-50/70 to-white dark:from-zinc-900 dark:to-zinc-950">
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-12">
//         {/* Today's Focus */}
//         <Card className="relative overflow-hidden border-emerald-200/60 shadow-lg glow-soft animate-in fade-in-50 duration-700">
//           <div className="pointer-events-none absolute -inset-20 bg-emerald-500/10 blur-3xl" />
//           <CardHeader className="relative">
//             <CardTitle className="text-xl md:text-2xl font-semibold">
//               {t("focus_title")}: Tuesday, 23 September
//             </CardTitle>
//           </CardHeader>
//           <CardContent className="relative grid gap-4 md:grid-cols-3">
//             {/* Weather */}
//             <div className="rounded-xl border bg-white/70 p-4 backdrop-blur-md dark:bg-zinc-900/60">
//               <div className="flex items-center gap-2 text-emerald-700">
//                 <ThermometerSun className="h-4 w-4" />
//                 <span className="font-medium">{t("weather")}</span>
//               </div>
//               <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
//                 <span className="inline-flex items-center gap-1"><ThermometerSun className="h-4 w-4"/>31°C</span>
//                 <span className="inline-flex items-center gap-1"><Droplets className="h-4 w-4"/>85%</span>
//                 <span className="inline-flex items-center gap-1"><CloudRain className="h-4 w-4"/>40% rain</span>
//               </div>
//               <p className="mt-2 text-sm">"High humidity increases the risk of Leaf Blight. Check your plants today."</p>
//             </div>
//             {/* Market */}
//             <div className="rounded-xl border bg-white/70 p-4 backdrop-blur-md dark:bg-zinc-900/60">
//               <div className="flex items-center gap-2 text-emerald-700">
//                 <IndianRupee className="h-4 w-4" />
//                 <span className="font-medium">{t("market_price")}</span>
//               </div>
//               <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
//                 <IndianRupee className="h-4 w-4" />
//                 Pepper Price: ₹645/kg (Kochi Mandi)
//               </div>
//               <p className="mt-2 text-sm">"Market prices are stable. Good day for holding stock."</p>
//             </div>
//             {/* Government Alert */}
//             <div className="rounded-xl border bg-white/70 p-4 backdrop-blur-md dark:bg-zinc-900/60">
//               <div className="flex items-center gap-2 text-emerald-700">
//                 <AlertTriangle className="h-4 w-4" />
//                 <span className="font-medium">{t("government_alert")}</span>
//               </div>
//               <div className="mt-2 text-sm text-muted-foreground">Whitefly Alert: High</div>
//               <p className="mt-2 text-sm">"A whitefly infestation has been reported in your district. Inspect your crops for early signs."</p>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Vitals */}
//         <div className="mt-6 grid gap-4 md:grid-cols-3">
//           <Card>
//             <CardContent className="py-5">
//               <div className="text-sm text-muted-foreground">{t("greeting")}</div>
//               <div className="mt-1 text-lg font-medium">{t("welcome_back")}</div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="py-5">
//               <div className="text-sm text-muted-foreground">{t("primary_crop")}</div>
//               <div className="mt-1 inline-flex items-center gap-2 text-lg font-medium">
//                 {t("managing_pepper")}
//                 <Badge variant="secondary">Active</Badge>
//               </div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="py-5">
//               <div className="text-sm text-muted-foreground">{t("last_logged_activity")}</div>
//               <div className="mt-1 text-lg font-medium">Irrigation (22 Sep 2025)</div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Core Actions */}
//         <div className="mt-8 grid gap-6 md:grid-cols-2">
//           {/* Diagnosis */}
//           <Card className="border-emerald-100/80 shadow-sm">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2"><Stethoscope className="h-5 w-5"/> {t("diagnosis_title")}</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <p className="text-sm text-muted-foreground">{t("diagnosis_desc")}</p>
//               <Input
//                 ref={fileInputRef}
//                 type="file"
//                 accept="image/*"
//                 capture="environment"
//                 onChange={(e) => setDiagnosisImage(e.target.files?.[0] || null)}
//               />
//               <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleUploadAndDiagnose}>
//                 <Camera className="mr-2 h-4 w-4" /> {t("upload_and_diagnose")}
//               </Button>
//               {diagnosisResult && (
//                 <div className="rounded-lg border p-4 bg-white/70 dark:bg-zinc-900/60">
//                   <div className="text-sm text-muted-foreground">{t("ai_diagnosis")}</div>
//                   <div className="mt-1 text-lg font-semibold">{diagnosisResult.disease}</div>
//                   <div className="mt-1 text-sm">AI Confidence: {diagnosisResult.confidence}%</div>
//                   <div className="mt-2 text-sm">Advisory: {diagnosisResult.advisory}</div>
//                   <div className="mt-3">
//                     <Button variant="outline" size="sm" className="gap-2" asChild>
//                       <a href="/chat"><PhoneCall className="h-4 w-4"/> {t("unsure_ask")}</a>
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </CardContent>
//           </Card>

//           {/* Activity Logging */}
//           <Card className="border-emerald-100/80 shadow-sm">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5"/> {t("what_did_you_do")}</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <p className="text-sm text-muted-foreground">{t("keep_record_desc")}</p>
//               <div className="grid grid-cols-2 gap-3">
//                 {/* Make styles consistent across all four buttons */}
//                 <Button variant="secondary" className="justify-start" onClick={() => quickLog(t("log_irrigation"))}>
//                   💧 {t("log_irrigation")}
//                 </Button>
//                 <Button variant="secondary" className="justify-start" onClick={() => quickLog(t("log_fertilizing"))}>
//                   🌿 {t("log_fertilizing")}
//                 </Button>
//                 <Button variant="secondary" className="justify-start" onClick={() => quickLog(t("log_pest"))}>
//                   🐞 {t("log_pest")}
//                 </Button>
//                 <Button
//                   variant="secondary"
//                   className="justify-start"
//                   onClick={() => (isRecording ? stopVoiceLog() : startVoiceLog())}
//                 >
//                   {isRecording ? (
//                     <>
//                       <Square className="mr-2 h-4 w-4" /> {t("log_other_voice")}
//                     </>
//                   ) : (
//                     <>
//                       <Mic className="mr-2 h-4 w-4" /> {t("log_other_voice")}
//                     </>
//                   )}
//                 </Button>
//               </div>
//               {voiceError && (
//                 <div className="text-xs text-red-600">{voiceError}</div>
//               )}
//               <div className="rounded-lg border p-3">
//                 <div className="text-sm font-medium">{t("recent")}</div>
//                 <ul className="mt-2 space-y-2 max-h-40 overflow-auto pr-1">
//                   {activities.map((a, i) => (
//                     <li key={i} className="text-sm rounded-md border p-2 bg-white/60 dark:bg-zinc-800/60">
//                       <div className="font-medium">{a.label}</div>
//                       <div className="text-xs text-muted-foreground">{a.date}</div>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <div className="grid gap-2">
//                 <Textarea placeholder={t("write_note")} value={otherNote} onChange={(e) => setOtherNote(e.target.value)} />
//                 <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={logOther}>{t("save_note")}</Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Schemes ticker */}
//         <div className="mt-10 rounded-xl border bg-emerald-50/80 dark:bg-emerald-900/20">
//           <div className="relative overflow-hidden px-4 py-3">
//             <div className="marquee-scroll whitespace-nowrap text-sm font-medium text-emerald-800 dark:text-emerald-200">
//               New subsidy available for solar-powered water pumps. Click here to learn more... 
//               <span className="mx-6">•</span>
//               PM-KISAN eKYC deadline is approaching. Update now...
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;

"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  CloudRain,
  Droplets,
  ThermometerSun,
  IndianRupee,
  AlertTriangle,
  Stethoscope,
  Camera,
  Activity,
  PhoneCall,
  Mic,
  Square,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { apiService, FarmerProfile, Activity as ActivityType, WeatherInfo, MarketPriceInfo } from "@/services/api";

export const DashboardPage = () => {
  const { t } = useI18n();
  const [farmer, setFarmer] = useState<FarmerProfile | null>(null);
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [weather, setWeather] = useState<WeatherInfo | null>(null);
  const [marketPrice, setMarketPrice] = useState<MarketPriceInfo | null>(null);
  const [weatherError, setWeatherError] = useState<string | null>(null);
  const [marketPriceError, setMarketPriceError] = useState<string | null>(null);
  const [otherNote, setOtherNote] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [diagnosisImage, setDiagnosisImage] = useState<File | null>(null);
  const [diagnosisResult, setDiagnosisResult] = useState<any>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const recognitionRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    let marketPriceIntervalId: NodeJS.Timeout;

    const fetchData = async () => {
      const farmerId = localStorage.getItem('farmerId');
      if (!farmerId) {
        window.location.href = '/'; // Redirect to home if no farmerId
        setIsLoading(false);
        return;
      }

      try {
        // 1. Fetch primary data first (profile and activities)
        const profilePromise = apiService.getFarmerProfile(farmerId);
        const activitiesPromise = apiService.getFarmerActivities(farmerId);
        const [profileResponse, activitiesResponse] = await Promise.all([
          profilePromise,
          activitiesPromise,
        ]);

        setFarmer(profileResponse);
        setActivities(activitiesResponse);

        // 2. Once we have the profile, fetch secondary data (weather and market price)
        try {
          const weatherResponse = await apiService.getWeather(profileResponse.district);
          setWeather(weatherResponse);
        } catch (weatherErr) {
          // Display the specific error message from the backend
          const errorMessage = weatherErr.response?.data?.message || "Could not load weather data.";
          console.error("Failed to fetch weather:", errorMessage);
          setWeatherError(errorMessage);
        }

        const fetchMarketData = async () => {
          try {
            const priceData = await apiService.getMarketPrice(profileResponse.district, profileResponse.crop);
            setMarketPrice(priceData);
            setMarketPriceError(null);
          } catch (priceErr) {
            // Display the specific error message from the backend
            const errorMessage = priceErr.response?.data?.message || "Market data unavailable.";
            console.error("Failed to fetch market price:", errorMessage);
            setMarketPriceError(errorMessage);
          }
        };

        fetchMarketData(); // Fetch once immediately
        marketPriceIntervalId = setInterval(fetchMarketData, 5000); // Then poll every 5 seconds

      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    // This is the correct way to do cleanup in a useEffect hook.
    // This function will be called when the component is unmounted.
    return () => {
      if (marketPriceIntervalId) {
        clearInterval(marketPriceIntervalId);
      }
    };
  }, []);

  const logActivity = async (activityLabel: string) => {
    if (!farmer || !activityLabel.trim()) return;
    try {
      await apiService.logActivity({
        farmerId: farmer._id,
        activity: activityLabel.trim(),
      });
      const updatedActivities = await apiService.getFarmerActivities(farmer._id);
      setActivities(updatedActivities);
    } catch (error) {
      console.error("Failed to log activity:", error);
    }
  };

  const logOther = () => {
    if (!otherNote.trim()) return;
    logActivity(otherNote.trim());
    setOtherNote("");
  };

  const startVoiceLog = async () => {
    setVoiceError(null);
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (e) {
        setVoiceError("Microphone permission denied");
        return;
      }
      const recognition = new SpeechRecognition();
      recognition.lang = "en-IN";
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;
      recognition.onstart = () => setIsRecording(true);
      recognition.onerror = (event: any) => {
        setVoiceError(event?.error || "Voice recognition error");
        setIsRecording(false);
      };
      recognition.onend = () => setIsRecording(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results?.[0]?.[0]?.transcript || "";
        if (transcript) logActivity(transcript);
      };
      recognitionRef.current = recognition;
      recognition.start();
      return;
    }
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      setVoiceError("Voice recognition not supported in this browser");
    } catch (e) {
      setVoiceError("Microphone not available");
    }
  };

  const stopVoiceLog = () => {
    try {
      recognitionRef.current?.stop?.();
    } catch {}
    setIsRecording(false);
  };

  const handleDiagnose = async (imageFile: File) => {
    if (!imageFile || !farmer) return;
    setDiagnosisImage(imageFile); // Set the image for UI feedback
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('farmerId', farmer._id);
    try {
      const response = await apiService.diagnose(formData);
      // Transform the backend response to match the UI's expected state structure
      const transformedResult = {
        disease: response.prediction.predicted_label.replace(/_/g, ' '), // e.g., "tomato late blight"
        confidence: Math.round(response.prediction.confidence * 100), // e.g., 66
        advisory: "Based on the analysis, we recommend using a suitable fungicide. For more specific advice, please consult with our AI chat.",
      };
      setDiagnosisResult(transformedResult);
    } catch (error) {
      console.error("Failed to diagnose:", error);
      setDiagnosisResult({
        // Provide a fallback mock result on API failure
        disease: "AI Offline (Mock)",
        advisory: "Could not reach the AI model. This is a placeholder response.",
        confidence: 0
      });
    }
  };
  
  const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading Dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/70 to-white dark:from-zinc-900 dark:to-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        {/* Today's Focus */}
        <Card className="relative overflow-hidden border-emerald-200/60 shadow-lg glow-soft animate-in fade-in-50 duration-700">
          <div className="pointer-events-none absolute -inset-20 bg-emerald-500/10 blur-3xl" />
          <CardHeader className="relative">
            <CardTitle className="text-xl md:text-2xl font-semibold">
              {t("focus_title")}: Tuesday, 23 September
            </CardTitle>
          </CardHeader>
          <CardContent className="relative grid gap-4 md:grid-cols-3">
            {/* Weather */}
            <div className="rounded-xl border bg-white/70 p-4 backdrop-blur-md dark:bg-zinc-900/60">
              <div className="flex items-center gap-2 text-emerald-700">
                <ThermometerSun className="h-4 w-4" />
                <span className="font-medium">{t("weather")} in {farmer?.district}</span>
              </div>
              {weatherError ? (
                <p className="mt-2 text-sm text-red-500">{weatherError}</p>
              ) : weather ? (
                <>
                  <div className="mt-2 flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><ThermometerSun className="h-4 w-4"/>{weather.temperature}°C</span>
                    <span className="inline-flex items-center gap-1"><Droplets className="h-4 w-4"/>{weather.humidity}%</span>
                    <span className="inline-flex items-center gap-1"><CloudRain className="h-4 w-4"/>{weather.rainChance}% rain</span>
                  </div>
                  <p className="mt-2 text-sm">"{weather.advisory || 'Plan your day based on current conditions.'}"</p>
                </>
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">Loading weather data...</p>
              )}
            </div>
            {/* Market */}
            <div className="rounded-xl border bg-white/70 p-4 backdrop-blur-md dark:bg-zinc-900/60">
              <div className="flex items-center gap-2 text-emerald-700">
                <IndianRupee className="h-4 w-4" />
                <span className="font-medium">{t("market_price")}</span>
              </div>
              {marketPriceError ? (
                <p className="mt-2 text-sm text-red-500">{marketPriceError}</p>
              ) : marketPrice ? (
                <>
                  <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                    <IndianRupee className="h-4 w-4" />
                    {marketPrice.crop} Price: ₹{marketPrice.price}/quintal ({marketPrice.market})
                  </div>
                  <p className="mt-2 text-sm">"{marketPrice.advisory}"</p>
                </>
              ) : (
                <p className="mt-2 text-sm text-muted-foreground">Loading market prices...</p>
              )}
            </div>
            {/* Government Alert */}
            <div className="rounded-xl border bg-white/70 p-4 backdrop-blur-md dark:bg-zinc-900/60">
              <div className="flex items-center gap-2 text-emerald-700">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-medium">{t("government_alert")}</span>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">Whitefly Alert: High</div>
              <p className="mt-2 text-sm">"A whitefly infestation has been reported in your district. Inspect your crops for early signs."</p>
            </div>
          </CardContent>
        </Card>

        {/* Vitals */}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="py-5">
              <div className="text-sm text-muted-foreground">{t("greeting")}</div>
              <div className="mt-1 text-lg font-medium">Welcome back, {farmer?.name || "Farmer"}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-5">
              <div className="text-sm text-muted-foreground">{t("primary_crop")}</div>
              <div className="mt-1 inline-flex items-center gap-2 text-lg font-medium">
                Managing {farmer?.crop || "your crop"}
                <Badge variant="secondary">Active</Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="py-5">
              <div className="text-sm text-muted-foreground">{t("last_logged_activity")}</div>
              <div className="mt-1 text-lg font-medium">
                {activities.length > 0 ? 
                  `${activities[0].activity} (${formatDate(activities[0].createdAt)})`
                  : "No activity yet"}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
            <Card className="border-emerald-100/80 shadow-sm">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Stethoscope className="h-5 w-5"/> {t("diagnosis_title")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">{t("diagnosis_desc")}</p>
                    <Input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      className="hidden" // The input is hidden and triggered by the button
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          // Automatically trigger diagnosis after a file is selected
                          // We pass the file directly to avoid a race condition with setState
                          handleDiagnose(file);
                        }
                      }}
                    />
                    {/* This button now just opens the file picker */}
                    <Button className="bg-emerald-600 hover:bg-emerald-700 w-full" onClick={() => fileInputRef.current?.click()}>
                      <Camera className="mr-2 h-4 w-4" /> {t("upload_and_diagnose")}
                    </Button>
                    {diagnosisResult && (
                      <div className="rounded-lg border p-4 bg-white/70 dark:bg-zinc-900/60">
                        <div className="text-sm text-muted-foreground">{t("ai_diagnosis")}</div>
                        {/* Capitalize the first letter of the disease for better presentation */}
                        <div className="mt-1 text-lg font-semibold capitalize">{diagnosisResult.disease}</div>
                        <div className="mt-1 text-sm">AI Confidence: {diagnosisResult.confidence}%</div>
                        <div className="mt-2 text-sm">Advisory: {diagnosisResult.advisory}</div>
                        <div className="mt-3">
                          <Button variant="outline" size="sm" className="gap-2" asChild>
                            <a href="/chat"><PhoneCall className="h-4 w-4"/> {t("unsure_ask")}</a>
                          </Button>
                        </div>
                      </div>
                    )}
                </CardContent>
            </Card>
            <Card className="border-emerald-100/80 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Activity className="h-5 w-5"/> {t("what_did_you_do")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="secondary" className="justify-start" onClick={() => logActivity(t("log_irrigation"))}>
                    💧 {t("log_irrigation")}
                  </Button>
                  <Button variant="secondary" className="justify-start" onClick={() => logActivity(t("log_fertilizing"))}>
                    🌿 {t("log_fertilizing")}
                  </Button>
                  <Button variant="secondary" className="justify-start" onClick={() => logActivity(t("log_pest"))}>
                    🐞 {t("log_pest")}
                  </Button>
                  <Button
                    variant="secondary"
                    className="justify-start"
                    onClick={() => (isRecording ? stopVoiceLog() : startVoiceLog())}
                  >
                    {isRecording ? (
                      <><Square className="mr-2 h-4 w-4" /> Stop</>
                    ) : (
                      <><Mic className="mr-2 h-4 w-4" /> {t("log_other_voice")}</>
                    )}
                  </Button>
                </div>
                {voiceError && (
                  <div className="text-xs text-red-600">{voiceError}</div>
                )}
                <div className="rounded-lg border p-3">
                  <div className="text-sm font-medium">{t("recent")}</div>
                  <ul className="mt-2 space-y-2 max-h-40 overflow-auto pr-1">
                    {activities.map((act) => (
                      <li key={act._id} className="text-sm rounded-md border p-2 bg-white/60 dark:bg-zinc-800/60">
                        <div className="font-medium">{act.activity}</div>
                        <div className="text-xs text-muted-foreground">{formatDate(act.createdAt)}</div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid gap-2">
                  <Textarea placeholder={t("write_note")} value={otherNote} onChange={(e) => setOtherNote(e.target.value)} />
                  <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={logOther}>{t("save_note")}</Button>
                </div>
              </CardContent>
            </Card>
        </div>

        {/* Schemes ticker */}
        <div className="mt-10 rounded-xl border bg-emerald-50/80 dark:bg-emerald-900/20">
          <div className="relative overflow-hidden px-4 py-3">
            <div className="marquee-scroll whitespace-nowrap text-sm font-medium text-emerald-800 dark:text-emerald-200">
              New subsidy available for solar-powered water pumps. Click here to learn more...
              <span className="mx-6">•</span>
              PM-KISAN eKYC deadline is approaching. Update now...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
