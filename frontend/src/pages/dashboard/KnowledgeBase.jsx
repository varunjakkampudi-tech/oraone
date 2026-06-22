import React, { useMemo, useRef, useState } from "react";
import {
  Upload,
  FileText,
  Globe,
  MessageSquare,
  Trash2,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Link2,
} from "lucide-react";
import { toast } from "sonner";

const SAMPLE_DOCS = [
  { id: "d1", title: "Product Catalog 2024.pdf",  type: "PDF",  size: "2.4 MB", date: "May 26, 2024", status: "Indexed" },
  { id: "d2", title: "Service Policies.docx",     type: "DOCX", size: "1.8 MB", date: "May 25, 2024", status: "Indexed" },
  { id: "d3", title: "FAQs - Customer Support",   type: "MD",   size: "45 KB",  date: "May 24, 2024", status: "Processing" },
  { id: "d4", title: "https://oraone.in/docs",    type: "URL",  size: "Indexed",date: "May 23, 2024", status: "Indexed" },
];

const TYPE_META = {
  PDF:  { Icon: FileText,      color: "#EF4444", bg: "#FEF2F2" },
  DOCX: { Icon: FileTextDocx,  color: "#2563EB", bg: "#EFF6FF" },
  MD:   { Icon: MessageSquare, color: "#7C3AED", bg: "#F3E8FF" },
  URL:  { Icon: Link2,         color: "#16A34A", bg: "#DCFCE7" },
  TXT:  { Icon: FileText,      color: "#0EA5E9", bg: "#E0F2FE" },
};

const STATUS_CLS = {
  Indexed:    "bg-green-50 text-green-700 border-green-200",
  Processing: "bg-amber-50 text-amber-700 border-amber-200",
  Failed:     "bg-red-50 text-red-700 border-red-200",
};

export default function KnowledgeBase() {
  const [docs, setDocs] = useState(SAMPLE_DOCS);
  const [q, setQ] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const fileInput = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const filtered = useMemo(
    () => docs.filter((d) => !q || d.title.toLowerCase().includes(q.toLowerCase())),
    [docs, q]
  );
  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const slice = filtered.slice((page - 1) * perPage, page * perPage);

  const handleFiles = (files) => {
    if (!files?.length) return;
    const added = Array.from(files).map((f, i) => {
      const ext = (f.name.split(".").pop() || "").toUpperCase();
      return {
        id: `up-${Date.now()}-${i}`,
        title: f.name,
        type: TYPE_META[ext] ? ext : "TXT",
        size: `${(f.size / 1024 / 1024).toFixed(1)} MB`,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        status: "Processing",
      };
    });
    setDocs((d) => [...added, ...d]);
    toast.success(`${added.length} document(s) uploading…`);
    // Simulate indexing for the demo.
    setTimeout(() => {
      setDocs((d) =>
        d.map((doc) => (added.find((a) => a.id === doc.id) ? { ...doc, status: "Indexed" } : doc))
      );
    }, 2200);
  };

  const handleDelete = (id) => {
    setDocs((d) => d.filter((x) => x.id !== id));
    toast.success("Document removed");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0F172A]">Knowledge Base</h2>
          <p className="text-sm text-[#64748B] mt-1">
            Train your AI agents with your documents, FAQs and website content.
          </p>
        </div>
        <button
          onClick={() => fileInput.current?.click()}
          data-testid="kb-upload-document"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-[13px] font-semibold shadow-[0_8px_24px_-8px_rgba(37,99,235,0.5)]"
        >
          <Upload size={14} /> Upload Document
        </button>
        <input
          ref={fileInput}
          type="file"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
          data-testid="kb-file-input"
        />
      </div>

      {/* Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`relative p-10 sm:p-14 rounded-2xl bg-white border-2 border-dashed transition-all text-center ${
          dragOver ? "border-[#2563EB] bg-[#F0F7FF]" : "border-[#BFDBFE]"
        }`}
        data-testid="kb-dropzone"
      >
        <button
          type="button"
          onClick={() => fileInput.current?.click()}
          aria-label="Upload files"
          className="mx-auto size-14 rounded-2xl bg-[#EFF6FF] grid place-items-center mb-4 hover:bg-[#DBEAFE] transition-colors"
        >
          <Upload size={22} className="text-[#2563EB]" />
        </button>
        <p className="text-[15px] font-semibold text-[#0F172A]">
          Drop files here or{" "}
          <button
            type="button"
            onClick={() => fileInput.current?.click()}
            className="text-[#2563EB] hover:underline"
          >
            upload
          </button>
        </p>
        <p className="mt-1 text-[12px] text-[#64748B]">
          Supported formats: PDF, DOCX, TXT, MD, Website URLs and more
        </p>

        {/* Source-type pills */}
        <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
          <SourcePill icon={FileText}      color="#EF4444" bg="#FEF2F2" label="PDF / DOCX"  testId="kb-source-pdf" />
          <SourcePill icon={Globe}         color="#2563EB" bg="#EFF6FF" label="Website URL" testId="kb-source-url" />
          <SourcePill icon={MessageSquare} color="#7C3AED" bg="#F3E8FF" label="FAQ / Q&A"   testId="kb-source-faq" />
        </div>
      </div>

      {/* Documents list */}
      <div className="rounded-2xl bg-white border border-[#E2E8F0] p-5">
        <div className="relative max-w-sm">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search documents..."
            data-testid="kb-search"
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] bg-white text-[13px] placeholder-[#94A3B8] focus:border-[#2563EB] focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10 transition-all"
          />
        </div>

        <ul className="mt-5 divide-y divide-[#F1F5F9]">
          {slice.map((d) => {
            const meta = TYPE_META[d.type] || TYPE_META.TXT;
            const Icon = meta.Icon;
            return (
              <li key={d.id} className="flex items-center gap-4 py-4" data-testid={`kb-doc-${d.id}`}>
                <div
                  className="size-11 rounded-xl grid place-items-center shrink-0"
                  style={{ background: meta.bg }}
                >
                  <Icon size={18} style={{ color: meta.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13.5px] font-semibold text-[#0F172A] truncate">{d.title}</p>
                  <p className="text-[11.5px] text-[#94A3B8] mt-0.5">
                    {d.type} <span className="text-[#CBD5E1] mx-1">•</span> {d.size}{" "}
                    <span className="text-[#CBD5E1] mx-1">•</span> {d.date}
                  </p>
                </div>
                <span
                  className={`inline-block text-[11px] px-2.5 py-1 rounded-full border font-medium ${
                    STATUS_CLS[d.status] || "bg-[#F1F5F9] text-[#475569] border-[#E2E8F0]"
                  }`}
                >
                  {d.status}
                </span>
                <button
                  onClick={() => handleDelete(d.id)}
                  className="size-9 rounded-lg grid place-items-center text-[#EF4444] hover:bg-red-50 transition-colors"
                  aria-label={`Delete ${d.title}`}
                  data-testid={`kb-delete-${d.id}`}
                >
                  <Trash2 size={15} />
                </button>
              </li>
            );
          })}
          {!slice.length && (
            <li className="py-10 text-center text-sm text-[#64748B]">No documents found.</li>
          )}
        </ul>

        {/* Footer */}
        <div className="mt-3 pt-4 border-t border-[#F1F5F9] flex items-center justify-between flex-wrap gap-3">
          <p className="text-[12px] text-[#64748B]">
            Showing <span className="font-semibold text-[#0F172A]">{Math.min(filtered.length, (page - 1) * perPage + 1)}</span> to{" "}
            <span className="font-semibold text-[#0F172A]">{Math.min(page * perPage, filtered.length)}</span> of{" "}
            <span className="font-semibold text-[#0F172A]">{filtered.length}</span> documents
          </p>
          <div className="flex items-center gap-2">
            <div className="relative">
              <select
                value={perPage}
                onChange={(e) => {
                  setPerPage(Number(e.target.value));
                  setPage(1);
                }}
                className="appearance-none pl-3 pr-8 py-2 rounded-xl border border-[#E2E8F0] bg-white text-[12px] font-medium text-[#475569] hover:bg-[#F8FAFC] cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10"
                data-testid="kb-per-page"
              >
                {[10, 25, 50].map((n) => (
                  <option key={n} value={n}>
                    {n} per page
                  </option>
                ))}
              </select>
              <ChevronDown size={13} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" />
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => page > 1 && setPage(page - 1)}
                disabled={page === 1}
                className="size-8 rounded-lg grid place-items-center hover:bg-[#F1F5F9] text-[#64748B] disabled:opacity-40"
                aria-label="Previous page"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                onClick={() => setPage(page)}
                className="size-8 rounded-lg font-semibold text-[12.5px] bg-[#2563EB] text-white"
              >
                {page}
              </button>
              <button
                onClick={() => page < totalPages && setPage(page + 1)}
                disabled={page >= totalPages}
                className="size-8 rounded-lg grid place-items-center hover:bg-[#F1F5F9] text-[#64748B] disabled:opacity-40"
                aria-label="Next page"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Subcomponents ---------- */

function SourcePill({ icon: Icon, color, bg, label, testId }) {
  return (
    <button
      type="button"
      data-testid={testId}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-[#F8FAFC] transition-colors"
    >
      <span className="size-6 rounded-md grid place-items-center" style={{ background: bg }}>
        <Icon size={13} style={{ color }} />
      </span>
      <span className="text-[12.5px] font-medium text-[#0F172A]">{label}</span>
    </button>
  );
}

/** Custom DOCX icon — looks like a "W" inside a document frame. */
function FileTextDocx({ size = 18, color = "#2563EB" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 14l1.5 4 1.5-3 1.5 3L14 14" />
    </svg>
  );
}
