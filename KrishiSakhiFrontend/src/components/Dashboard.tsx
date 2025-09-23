"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Camera, Activity, CloudSun, Stethoscope } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const [activities, setActivities] = useState<Array<{note: string; date: string}>>([]);
  const [note, setNote] = useState("");
  const [image, setImage] = useState<string>("");

  function addActivity() {
    if (!note.trim()) return;
    setActivities([{ note, date: new Date().toLocaleString() }, ...activities].slice(0, 6));
    setNote("");
  }

  return (
    <section id="dashboard" className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Farmer Dashboard</h2>
            <p className="text-muted-foreground">Diagnosis, activity logging, and insights at a glance.</p>
          </div>
          <Badge className="bg-emerald-600">Beta</Badge>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="backdrop-blur bg-white/70 dark:bg-zinc-900/60 border-emerald-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Stethoscope size={18}/> Disease diagnosis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input placeholder="Paste image URL of affected leaf" value={image} onChange={(e)=>setImage(e.target.value)} />
              <Button className="bg-emerald-600 hover:bg-emerald-700 w-full"><Camera className="mr-2 h-4 w-4"/>Analyze</Button>
              {image && (
                <img src={image} alt="leaf" className="rounded-lg border object-cover w-full h-40"/>
              )}
            </CardContent>
          </Card>

          <Card className="backdrop-blur bg-white/70 dark:bg-zinc-900/60">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Activity size={18}/> Activity log</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Textarea placeholder="Added urea 20kg to plot A…" value={note} onChange={(e)=>setNote(e.target.value)} />
              <Button onClick={addActivity} className="bg-emerald-600 hover:bg-emerald-700 w-full">Save</Button>
              <ul className="space-y-2 max-h-40 overflow-auto pr-1">
                {activities.length === 0 && <li className="text-sm text-muted-foreground">No activities yet.</li>}
                {activities.map((a,i)=> (
                  <li key={i} className="text-sm rounded-md border p-2 bg-white/60 dark:bg-zinc-800/60">
                    <div className="font-medium">{a.note}</div>
                    <div className="text-xs text-muted-foreground">{a.date}</div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="relative overflow-hidden backdrop-blur bg-[url('https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=1200&auto=format&fit=crop')] bg-cover bg-center">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/70 to-emerald-900/70"/>
            <CardHeader className="relative">
              <CardTitle className="flex items-center gap-2 text-white"><CloudSun size={18}/> Weather & Tips</CardTitle>
            </CardHeader>
            <CardContent className="relative text-white space-y-2">
              <div className="text-4xl font-bold leading-none">29°C</div>
              <div className="text-sm/relaxed opacity-90">Light rain likely in the evening. Irrigation not required today in most parts of Ernakulam.</div>
              <div className="text-xs opacity-80">Powered by local agri insights</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}