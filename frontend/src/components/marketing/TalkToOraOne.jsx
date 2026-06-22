import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Phone,
  MessageCircle,
  X,
  Send,
  Sparkles,
  CheckCircle2,
  Loader2,
  Bot,
  User as UserIcon,
  PhoneCall,
  PhoneOff,
  Mic,
} from "lucide-react";
import { API_BASE } from "@/lib/api";

const SESSION_KEY = "oraone_widget_session";
const TAB_KEY = "oraone_widget_tab";

/* ─────────────────────────────────────────────────────────── */
/* CHAT TAB (real AI via Emergent LLM key, streaming SSE)      */
/* ─────────────────────────────────────────────────────────── */

function ChatTab({ open }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState("");
  const scrollRef = useRef(null);
  const abortRef = useRef(null);

  // Bootstrap a session once on mount
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const existing = localStorage.getItem(SESSION_KEY);
        if (existing) {
          setSessionId(existing);
          // Keep a friendly opener even on resume
          if (messages.length === 0) {
            setMessages([
              {
                role: "assistant",
                content:
                  "Welcome back! Pick up where we left off — ask me anything about OraOne.",
              },
            ]);
          }
          return;
        }
        const res = await fetch(`${API_BASE}/widget/session`, { method: "POST" });
        if (!res.ok) throw new Error(`session http ${res.status}`);
        const data = await res.json();
        if (cancelled) return;
        try { localStorage.setItem(SESSION_KEY, data.session_id); } catch (_) { /* noop */ }
        setSessionId(data.session_id);
        setMessages([{ role: "assistant", content: data.greeting }]);
      } catch (e) {
        if (!cancelled) setError("Couldn't reach the chat service. Try again in a moment.");
      }
    })();
    return () => {
      cancelled = true;
      if (abortRef.current) abortRef.current.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Auto-scroll on new content
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, streaming]);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || streaming || !sessionId) return;
    setInput("");
    setError("");
    setMessages((m) => [...m, { role: "user", content: text }, { role: "assistant", content: "" }]);
    setStreaming(true);

    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      const res = await fetch(`${API_BASE}/widget/chat/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "text/event-stream" },
        body: JSON.stringify({ session_id: sessionId, message: text }),
        signal: ctrl.signal,
      });
      if (!res.ok || !res.body) throw new Error(`stream http ${res.status}`);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        // Process SSE events split by double newline
        let idx;
        while ((idx = buf.indexOf("\n\n")) !== -1) {
          const chunk = buf.slice(0, idx);
          buf = buf.slice(idx + 2);
          const line = chunk.split("\n").find((l) => l.startsWith("data: "));
          if (!line) continue;
          let payload;
          try {
            payload = JSON.parse(line.slice(6));
          } catch (_) {
            continue;
          }
          if (payload.type === "delta") {
            setMessages((m) => {
              const next = m.slice();
              const last = { ...next[next.length - 1] };
              last.content = (last.content || "") + payload.content;
              next[next.length - 1] = last;
              return next;
            });
          } else if (payload.type === "done") {
            setMessages((m) => {
              const next = m.slice();
              const last = { ...next[next.length - 1] };
              last.content = payload.content || last.content;
              next[next.length - 1] = last;
              return next;
            });
          } else if (payload.type === "error") {
            setMessages((m) => {
              const next = m.slice();
              const last = { ...next[next.length - 1] };
              last.content = payload.content;
              next[next.length - 1] = last;
              return next;
            });
          }
        }
      }
    } catch (e) {
      if (e.name !== "AbortError") {
        setError("Something went wrong. Please try again.");
        setMessages((m) => {
          const next = m.slice();
          if (next.length && next[next.length - 1].role === "assistant" && !next[next.length - 1].content) {
            next[next.length - 1] = {
              role: "assistant",
              content: "Sorry — I hit a snag. Could you rephrase or try again in a moment?",
            };
          }
          return next;
        });
      }
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  }, [input, sessionId, streaming]);

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const suggestions = [
    "What channels do you support?",
    "How much does it cost?",
    "Is my data secure?",
    "Book me a demo",
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#F8FAFC]">
        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role} content={m.content} streaming={streaming && i === messages.length - 1} />
        ))}
        {error && (
          <div className="text-[12px] text-[#DC2626] bg-[#FEF2F2] border border-[#FECACA] rounded-lg px-3 py-2">
            {error}
          </div>
        )}
        {/* Suggestions: only show before any user message */}
        {messages.length <= 1 && !streaming && (
          <div className="pt-2">
            <p className="text-[10px] font-bold tracking-[0.18em] text-[#94A3B8] uppercase mb-2">
              Try asking
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setInput(s);
                    setTimeout(() => send(), 50);
                  }}
                  className="px-3 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-[12px] text-[#475569] hover:border-[#2563EB] hover:text-[#2563EB] transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Composer */}
      <div className="border-t border-[#E2E8F0] bg-white p-3">
        <div className="flex items-end gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={streaming || !sessionId}
            placeholder={sessionId ? "Ask me anything about OraOne…" : "Connecting…"}
            rows={1}
            className="flex-1 resize-none rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-2.5 text-[13.5px] text-[#0F172A] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-[#2563EB] disabled:opacity-60"
            data-testid="widget-chat-input"
            style={{ maxHeight: 96 }}
          />
          <button
            onClick={send}
            disabled={!input.trim() || streaming || !sessionId}
            data-testid="widget-chat-send"
            className="size-10 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white grid place-items-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Send"
          >
            {streaming ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
          </button>
        </div>
        <p className="mt-2 text-[10px] text-[#94A3B8] flex items-center gap-1.5">
          <Sparkles size={10} /> Real AI · Claude Sonnet 4.5 · No login required
        </p>
      </div>
    </div>
  );
}

function MessageBubble({ role, content, streaming }) {
  const isUser = role === "user";
  return (
    <div className={`flex gap-2 ${isUser ? "justify-end" : "justify-start"}`}>
      {!isUser && (
        <div className="size-7 rounded-full bg-[#2563EB] grid place-items-center shrink-0 mt-0.5">
          <Bot size={14} className="text-white" />
        </div>
      )}
      <div
        className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-[13.5px] leading-relaxed whitespace-pre-wrap ${
          isUser
            ? "bg-[#2563EB] text-white rounded-br-md"
            : "bg-white text-[#0F172A] border border-[#E2E8F0] rounded-bl-md"
        }`}
      >
        {content}
        {streaming && !content && (
          <span className="inline-flex gap-1 items-center">
            <span className="size-1.5 rounded-full bg-[#94A3B8] animate-bounce" style={{ animationDelay: "0ms" }} />
            <span className="size-1.5 rounded-full bg-[#94A3B8] animate-bounce" style={{ animationDelay: "150ms" }} />
            <span className="size-1.5 rounded-full bg-[#94A3B8] animate-bounce" style={{ animationDelay: "300ms" }} />
          </span>
        )}
        {streaming && content && (
          <span className="inline-block w-1 h-3.5 bg-[#94A3B8] ml-0.5 align-middle animate-pulse" />
        )}
      </div>
      {isUser && (
        <div className="size-7 rounded-full bg-[#0F172A] grid place-items-center shrink-0 mt-0.5">
          <UserIcon size={14} className="text-white" />
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* VOICE TAB (scripted demo — call animation)                  */
/* ─────────────────────────────────────────────────────────── */

const VOICE_SCRIPT = [
  { who: "agent", text: "Hi! Thanks for calling Apollo Dental — this is Maya, the AI receptionist. How can I help today?" },
  { who: "caller", text: "Hi, I'd like to book a teeth-cleaning appointment for this Saturday." },
  { who: "agent", text: "Of course! Could I get your name and a contact number please?" },
  { who: "caller", text: "Rohan Mehta, 98XXX-23489." },
  { who: "agent", text: "Thanks, Rohan. I have an 11 AM and a 3 PM slot open this Saturday with Dr. Khanna. Which works better?" },
  { who: "caller", text: "11 AM works." },
  { who: "agent", text: "Booked! You'll get an SMS and WhatsApp confirmation in 30 seconds. Anything else I can help with?" },
];

function VoiceTab({ open }) {
  const [running, setRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [secs, setSecs] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setStep((s) => Math.min(s + 1, VOICE_SCRIPT.length));
      setSecs((t) => t + 4);
    }, 2500);
    return () => clearInterval(intervalRef.current);
  }, [running]);

  useEffect(() => {
    if (step >= VOICE_SCRIPT.length && running) {
      setRunning(false);
    }
  }, [step, running]);

  const start = () => {
    setStep(0);
    setSecs(0);
    setRunning(true);
  };
  const stop = () => {
    setRunning(false);
    setStep(VOICE_SCRIPT.length);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#0F172A] to-[#1E1B4B] text-white">
      {/* Phone header */}
      <div className="px-4 pt-4 pb-3 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-white/10 grid place-items-center">
              <Bot size={18} className="text-[#A5B4FC]" />
            </div>
            <div>
              <p className="text-[13px] font-semibold">Maya — AI Receptionist</p>
              <p className="text-[11px] text-white/55">
                {running ? `Connected · ${formatTime(secs)}` : step >= VOICE_SCRIPT.length ? "Call ended" : "Ready to demo"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <span
              className={`size-2 rounded-full ${running ? "bg-[#22C55E] animate-pulse" : "bg-white/30"}`}
            />
            <span className="text-[10px] font-bold tracking-[0.16em] text-white/65 uppercase">
              {running ? "Live" : "Idle"}
            </span>
          </div>
        </div>
      </div>

      {/* Transcript */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5">
        {VOICE_SCRIPT.slice(0, step).map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex gap-2 ${line.who === "caller" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[80%] px-3 py-2 rounded-2xl text-[12.5px] leading-relaxed ${
                line.who === "caller"
                  ? "bg-[#6366F1] text-white rounded-br-md"
                  : "bg-white/10 text-white rounded-bl-md"
              }`}
            >
              <p className="text-[10px] font-bold tracking-[0.14em] opacity-65 mb-0.5 uppercase">
                {line.who === "caller" ? "Caller" : "Maya · AI"}
              </p>
              {line.text}
            </div>
          </motion.div>
        ))}
        {step === 0 && !running && (
          <div className="text-center pt-8">
            <div className="size-16 mx-auto rounded-full bg-white/5 grid place-items-center mb-3">
              <PhoneCall size={26} className="text-[#A5B4FC]" />
            </div>
            <p className="text-[13px] text-white/75 max-w-[200px] mx-auto leading-relaxed">
              Scripted demo of a real OraOne Voice Agent answering an inbound call.
            </p>
          </div>
        )}
        {running && step > 0 && step < VOICE_SCRIPT.length && (
          <div className="flex gap-2 justify-start">
            <div className="bg-white/10 px-3 py-2 rounded-2xl rounded-bl-md inline-flex gap-1 items-center">
              <span className="size-1.5 rounded-full bg-white/65 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="size-1.5 rounded-full bg-white/65 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="size-1.5 rounded-full bg-white/65 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}
      </div>

      {/* Call controls */}
      <div className="p-3 border-t border-white/10 flex items-center justify-center gap-3">
        {!running ? (
          <button
            onClick={start}
            data-testid="widget-voice-start"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white text-[13px] font-semibold shadow-lg transition-all"
          >
            <Mic size={14} /> {step >= VOICE_SCRIPT.length ? "Replay demo call" : "Start demo call"}
          </button>
        ) : (
          <button
            onClick={stop}
            data-testid="widget-voice-stop"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#EF4444] hover:bg-[#DC2626] text-white text-[13px] font-semibold shadow-lg transition-all"
          >
            <PhoneOff size={14} /> End call
          </button>
        )}
      </div>
      <p className="px-4 pb-3 text-[10px] text-white/45 text-center">
        Voice agent — scripted demo. Real voice with Twilio/Vapi available on request.
      </p>
    </div>
  );
}

function formatTime(s) {
  const m = String(Math.floor(s / 60)).padStart(2, "0");
  const sec = String(s % 60).padStart(2, "0");
  return `${m}:${sec}`;
}

/* ─────────────────────────────────────────────────────────── */
/* WHATSAPP TAB (scripted demo)                                */
/* ─────────────────────────────────────────────────────────── */

const WA_SCRIPT = [
  { who: "user", text: "Hi, is the 2BHK on MG Road still available?", time: "10:21 AM" },
  { who: "agent", text: "Hi! Yes, the 2BHK on MG Road (1,250 sqft, ₹1.2 Cr) is available. Want to schedule a visit?", time: "10:21 AM" },
  { who: "user", text: "Yes, can I see it tomorrow evening?", time: "10:22 AM" },
  { who: "agent", text: "Sure! I have 5 PM, 6 PM and 7 PM open. Which works?", time: "10:22 AM" },
  { who: "user", text: "6 PM is good.", time: "10:23 AM" },
  { who: "agent", text: "Booked for tomorrow at 6 PM. I've sent a calendar invite to your number and shared the address. See you then!", time: "10:23 AM" },
];

function WhatsAppTab({ open }) {
  const [shown, setShown] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    if (shown >= WA_SCRIPT.length) {
      setRunning(false);
      return;
    }
    const t = setTimeout(() => setShown((s) => s + 1), 1400);
    return () => clearTimeout(t);
  }, [shown, running]);

  const start = () => {
    setShown(0);
    setRunning(true);
  };

  return (
    <div className="flex flex-col h-full bg-[#075E54]">
      {/* WhatsApp-like header */}
      <div className="px-4 py-3 bg-[#075E54] text-white flex items-center gap-3 border-b border-white/10">
        <div className="size-9 rounded-full bg-white/20 grid place-items-center text-[14px] font-bold">
          O
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-semibold truncate">OraOne · Real Estate Bot</p>
          <p className="text-[11px] text-white/75 truncate">
            {running ? "typing…" : "online"}
          </p>
        </div>
        <span className="size-2 rounded-full bg-[#22C55E]" />
      </div>

      {/* Chat area with WA pattern */}
      <div
        className="flex-1 overflow-y-auto px-3 py-3 space-y-1.5"
        style={{
          backgroundColor: "#0B1410",
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "8px 8px",
        }}
      >
        {WA_SCRIPT.slice(0, shown).map((m, i) => {
          const mine = m.who === "user";
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className={`flex ${mine ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[78%] px-3 py-2 rounded-lg text-[12.5px] leading-snug shadow-sm ${
                  mine ? "bg-[#005C4B] text-white" : "bg-[#1F2C34] text-white"
                }`}
              >
                <p>{m.text}</p>
                <p className="text-[9.5px] text-white/55 mt-1 text-right flex items-center gap-1 justify-end">
                  {m.time}
                  {mine && <CheckCircle2 size={10} className="text-[#34D399]" />}
                </p>
              </div>
            </motion.div>
          );
        })}
        {shown === 0 && !running && (
          <div className="h-full flex items-center justify-center py-6">
            <div className="text-center text-white/75 max-w-[200px]">
              <div className="size-14 rounded-full bg-white/10 grid place-items-center mx-auto mb-3">
                <MessageCircle size={22} className="text-[#34D399]" />
              </div>
              <p className="text-[12.5px] leading-relaxed">
                Watch a scripted WhatsApp Agent qualify a lead and book a visit.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-[#0B1410] p-3 flex items-center justify-center">
        {shown < WA_SCRIPT.length || !running ? (
          <button
            onClick={start}
            data-testid="widget-wa-start"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white text-[13px] font-semibold transition-colors"
          >
            <MessageCircle size={14} />
            {shown >= WA_SCRIPT.length ? "Replay demo" : "Start WhatsApp demo"}
          </button>
        ) : (
          <p className="text-[11px] text-white/55">Playing scripted demo…</p>
        )}
      </div>
      <p className="px-4 pb-3 text-[10px] text-white/45 text-center bg-[#0B1410]">
        Scripted demo. Real WhatsApp via Meta Business Platform on Growth+ plans.
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────── */
/* WIDGET SHELL (floating button + popover)                    */
/* ─────────────────────────────────────────────────────────── */

const TABS = [
  { id: "chat", label: "Chat", icon: MessageSquare, badge: "Real AI", badgeColor: "#22C55E" },
  { id: "voice", label: "Voice", icon: Phone, badge: "Demo", badgeColor: "#A78BFA" },
  { id: "whatsapp", label: "WhatsApp", icon: MessageCircle, badge: "Demo", badgeColor: "#34D399" },
];

export default function TalkToOraOne() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState(() => {
    try { return localStorage.getItem(TAB_KEY) || "chat"; } catch (_) { return "chat"; }
  });

  useEffect(() => {
    try { localStorage.setItem(TAB_KEY, tab); } catch (_) { /* noop */ }
  }, [tab]);

  // Lock body scroll on small screens when widget open
  useEffect(() => {
    if (!open) return undefined;
    const prev = document.body.style.overflow;
    const isMobile = window.innerWidth < 640;
    if (isMobile) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  return (
    <>
      {/* Floating launcher */}
      <AnimatePresence>
        {!open && (
          <motion.button
            key="launcher"
            initial={{ opacity: 0, scale: 0.7, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 12 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(true)}
            data-testid="widget-launcher"
            className="fixed bottom-5 right-5 z-[60] inline-flex items-center gap-2.5 pl-3.5 pr-4 py-3 rounded-full bg-[#0F172A] hover:bg-[#1E293B] text-white shadow-[0_18px_38px_-8px_rgba(15,23,42,0.55)] hover:shadow-[0_22px_46px_-8px_rgba(15,23,42,0.65)] hover:-translate-y-0.5 transition-all duration-200 group"
            aria-label="Talk to OraOne — open chat"
          >
            <span className="relative">
              <span className="absolute inset-0 rounded-full bg-[#2563EB] animate-ping opacity-40" />
              <span className="relative size-7 grid place-items-center rounded-full bg-[#2563EB]">
                <Sparkles size={14} className="text-white" />
              </span>
            </span>
            <span className="text-[13px] font-semibold tracking-tight">Talk to OraOne</span>
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold text-[#22C55E] bg-[#22C55E]/10 px-1.5 py-0.5 rounded-md tracking-[0.14em]">
              <span className="size-1 rounded-full bg-[#22C55E] animate-pulse" /> LIVE
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Popover */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="popover"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed z-[60] bg-white border border-[#E2E8F0] shadow-[0_30px_60px_-15px_rgba(15,23,42,0.35)] flex flex-col overflow-hidden
              bottom-0 right-0 left-0 sm:bottom-5 sm:right-5 sm:left-auto
              h-[100dvh] sm:h-[640px] max-h-[100dvh] sm:max-h-[calc(100dvh-2.5rem)]
              w-full sm:w-[400px]
              sm:rounded-3xl"
            role="dialog"
            aria-label="Talk to OraOne"
          >
            {/* Header */}
            <div className="bg-[#0F172A] text-white px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="size-9 rounded-full bg-[#2563EB] grid place-items-center shrink-0">
                  <Sparkles size={16} className="text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-[13.5px] font-semibold truncate">Talk to OraOne</p>
                  <p className="text-[10.5px] text-white/65 flex items-center gap-1 truncate">
                    <span className="size-1.5 rounded-full bg-[#22C55E] animate-pulse" />
                    Chat with real AI · No login required
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close widget"
                data-testid="widget-close"
                className="size-9 rounded-lg hover:bg-white/10 grid place-items-center transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Tab bar */}
            <div className="bg-white border-b border-[#E2E8F0] px-2 pt-2 pb-1.5 flex gap-1">
              {TABS.map((t) => {
                const active = tab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setTab(t.id)}
                    data-testid={`widget-tab-${t.id}`}
                    className={`flex-1 px-2 py-2 rounded-lg text-[12px] font-semibold transition-all relative ${
                      active
                        ? "bg-[#F8FAFC] text-[#0F172A]"
                        : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]/60"
                    }`}
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <t.icon size={13} />
                      {t.label}
                    </span>
                    <span
                      className="absolute top-1 right-1 text-[8.5px] font-bold tracking-[0.12em] px-1 rounded-sm"
                      style={{ background: `${t.badgeColor}20`, color: t.badgeColor }}
                    >
                      {t.badge}
                    </span>
                    {active && (
                      <motion.span
                        layoutId="widget-tab-underline"
                        className="absolute bottom-0 left-2 right-2 h-0.5 rounded-full bg-[#2563EB]"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Body */}
            <div className="flex-1 min-h-0">
              {tab === "chat" && <ChatTab open={open} />}
              {tab === "voice" && <VoiceTab open={open} />}
              {tab === "whatsapp" && <WhatsAppTab open={open} />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
