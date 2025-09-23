"use client";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, Send, Sparkles, Camera } from "lucide-react";

interface Message { id: number; role: "user" | "assistant"; text: string }

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, role: "assistant", text: "Namaskaram! I am your Krishi Sakhi. How can I help today?" },
  ]);
  const [text, setText] = useState("");
  const [listening, setListening] = useState(false);
  const idRef = useRef(2);
  const recRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(()=>{
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) return;
    const SR = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    recRef.current = new SR();
    recRef.current.lang = "en-IN";
    recRef.current.continuous = false;
    recRef.current.interimResults = false;
    recRef.current.onresult = (e: any)=>{
      const t = e.results[0][0].transcript;
      setText(t);
      setListening(false);
    };
    recRef.current.onend = ()=> setListening(false);
  }, []);

  function toggleMic(){
    if (!recRef.current) return;
    if (listening){ recRef.current.stop(); setListening(false); }
    else { setListening(true); recRef.current.start(); }
  }

  function send(msg?: string){
    const content = (msg ?? text).trim();
    if (!content) return;
    setMessages((m)=>[...m, { id: idRef.current++, role: "user", text: content }, { id: idRef.current++, role: "assistant", text: `Here are some tips for: ${content}. Use neem oil 3ml/L and monitor for 3 days.` }]);
    setText("");
  }

  function handlePickPhoto(){
    fileInputRef.current?.click();
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>){
    const file = e.target.files?.[0];
    if (!file) return;
    setMessages((m)=>[
      ...m,
      { id: idRef.current++, role: "user", text: `📷 Photo selected: ${file.name || "image"}` },
      { id: idRef.current++, role: "assistant", text: "Got your photo. Describe the issue or say 'analyze this photo'." }
    ]);
    // reset input so same file can be selected again if needed
    e.target.value = "";
  }

  const examples = [
    "How to improve soil fertility in paddy?",
    "Leaf turning yellow in banana, what to do?",
    "Best time to apply fertilizer for coconut?",
    "Organic pest control for okra?",
  ];

  return (
    <section id="chat" className="py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Card className="backdrop-blur bg-white/70 dark:bg-zinc-900/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Sparkles className="text-emerald-600"/> AI Chat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="flex flex-wrap gap-2">
                {examples.map((e,i)=> (
                  <button key={i} onClick={()=>send(e)} className="rounded-full border px-3 py-1 text-sm hover:bg-emerald-50 dark:hover:bg-zinc-800/80">
                    {e}
                  </button>
                ))}
              </div>
              <div className="h-64 overflow-y-auto rounded-lg border bg-white/50 p-4 dark:bg-zinc-950/30">
                {messages.map(m=> (
                  <div key={m.id} className={`mb-3 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${m.role==='user' ? 'bg-emerald-600 text-white' : 'bg-white/80 dark:bg-zinc-800/70 border'}`}>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Button type="button" onClick={toggleMic} variant={listening ? "default" : "outline"} className={listening ? "bg-emerald-600" : ""}>
                  <Mic className="mr-2 h-4 w-4" />{listening ? "Listening…" : "Voice"}
                </Button>
                <Button type="button" variant="outline" onClick={handlePickPhoto}>
                  <Camera className="mr-2 h-4 w-4" /> Photo
                </Button>
                <Input placeholder="Ask in Malayalam, English, or Hindi…" value={text} onChange={(e)=>setText(e.target.value)} onKeyDown={(e)=>{ if(e.key==='Enter') send(); }} />
                <Button onClick={()=>send()} className="bg-emerald-600 hover:bg-emerald-700"><Send className="h-4 w-4"/></Button>
                <input ref={fileInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFile} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}