import React, { useState } from "react";
import { Upload, FileText, Link as LinkIcon, MessageSquare, Trash2, Search, MoreHorizontal } from "lucide-react";
import { KNOWLEDGE_DOCS } from "@/lib/mockData";
import { toast } from "sonner";

const TYPE_ICONS = { PDF: FileText, DOCX: FileText, FAQ: MessageSquare, URL: LinkIcon, TXT: FileText };

export default function KnowledgeBase() {
  const [docs, setDocs] = useState(KNOWLEDGE_DOCS);
  const [query, setQuery] = useState("");

  const remove = (id) => {
    setDocs(docs.filter(d => d.id !== id));
    toast.success("Removed from knowledge base");
  };

  const upload = () => toast.info("File upload will be available once you connect AWS S3.");

  const filtered = docs.filter(d => !query || d.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-[#0F172A]">Knowledge Base</h2>
          <p className="text-sm text-[#64748B] mt-0.5">Train your AI agents on your documents, FAQs and website content.</p>
        </div>
        <button onClick={upload} className="px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-sm font-semibold inline-flex items-center gap-2" data-testid="kb-upload-btn">
          <Upload size={14} /> Upload Document
        </button>
      </div>

      {/* Upload tile */}
      <div className="p-6 rounded-2xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] text-center mb-6">
        <div className="size-12 mx-auto rounded-2xl bg-white grid place-items-center mb-3">
          <Upload size={20} className="text-[#2563EB]" />
        </div>
        <p className="text-sm font-medium text-[#0F172A]">Drop files here or click to upload</p>
        <p className="text-xs text-[#64748B] mt-1">Supports PDF, DOCX, TXT · or paste a website URL · or add an FAQ</p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <button onClick={upload} className="px-3 py-1.5 rounded-lg bg-white border border-[#E2E8F0] text-xs font-medium text-[#0F172A]">📄 PDF / DOCX</button>
          <button onClick={upload} className="px-3 py-1.5 rounded-lg bg-white border border-[#E2E8F0] text-xs font-medium text-[#0F172A]">🌐 Website URL</button>
          <button onClick={upload} className="px-3 py-1.5 rounded-lg bg-white border border-[#E2E8F0] text-xs font-medium text-[#0F172A]">❓ Add FAQ</button>
        </div>
      </div>

      <div className="rounded-2xl bg-white border border-[#E2E8F0] overflow-hidden">
        <div className="p-4 border-b border-[#E2E8F0] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] w-72">
            <Search size={14} className="text-[#64748B]" />
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search documents..." className="bg-transparent text-sm flex-1 outline-none" />
          </div>
        </div>
        <ul className="divide-y divide-[#E2E8F0]">
          {filtered.map(d => {
            const Icon = TYPE_ICONS[d.type] || FileText;
            return (
              <li key={d.id} className="p-4 flex items-center gap-3 hover:bg-[#F8FAFC]" data-testid={`kb-doc-${d.id}`}>
                <div className="size-10 rounded-xl bg-[#EFF6FF] grid place-items-center text-[#2563EB] flex-shrink-0"><Icon size={16} /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#0F172A] truncate">{d.name}</p>
                  <p className="text-xs text-[#64748B]">{d.type} · {d.size} · {d.uploaded}</p>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${d.status === "trained" ? "bg-green-50 text-green-700" : "bg-yellow-50 text-yellow-700"}`}>
                  {d.status === "trained" ? "Trained" : "Training..."}
                </span>
                <button onClick={() => remove(d.id)} className="p-2 rounded-lg hover:bg-red-50 text-red-500" aria-label="Delete">
                  <Trash2 size={14} />
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
