import { useEffect, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  service: "",
  description: "",
};

const serviceOptions = [
  "Corporate Events & Conferences",
  "Event Production & Stage Rigging",
  "Commercial & Food Photography",
  "Cinematic Videography & Film",
  "Exhibition & Industry Expos",
  "Luxury Weddings (Heavenly Weds)",
  "Other / Custom Production Brief",
];

export function QuoteModal({ open, onClose }) {
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) setForm(initialForm);
  }, [open]);

  if (!open) return null;

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const message = [
      "Hello Parekh Productions! I would like to request a quote.",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Email: ${form.email || "Not provided"}`,
      `Service: ${form.service}`,
      `Brief: ${form.description}`,
    ].join("\n");

    const whatsappUrl = `https://wa.me/918657754937?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[150] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md animate-fadeIn"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 text-neutral-900 shadow-2xl border border-neutral-100"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-6 pb-4 border-b border-neutral-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-red-50 text-[10px] font-bold uppercase tracking-wider text-red-600 mb-1 border border-red-200/50">
              <span className="h-1.5 w-1.5 rounded-full bg-red-600" />
              <span>Direct Dispatch · Instant Proposal</span>
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-950">
              Get A Quote
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-neutral-500">
              Share your production requirements and our technical directors will connect directly on WhatsApp.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close quote modal"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-900 hover:bg-black hover:text-white transition-colors cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-neutral-600">Name *</span>
              <input
                type="text"
                required
                value={form.name}
                onChange={updateField("name")}
                placeholder="Your name or company"
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-900 outline-none focus:border-black focus:bg-white transition-all"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-neutral-600">Phone *</span>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={updateField("phone")}
                placeholder="+91 98765 43210"
                className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-900 outline-none focus:border-black focus:bg-white transition-all"
              />
            </label>
          </div>

          <label className="block">
            <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-neutral-600">Email</span>
            <input
              type="email"
              value={form.email}
              onChange={updateField("email")}
              placeholder="name@company.com"
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-900 outline-none focus:border-black focus:bg-white transition-all"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-neutral-600">Production Type *</span>
            <select
              required
              value={form.service}
              onChange={updateField("service")}
              className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-900 outline-none focus:border-black focus:bg-white transition-all"
            >
              <option value="">Select a capability</option>
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-neutral-600">Brief Overview *</span>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={updateField("description")}
              placeholder="Tell us venue, date, scale, or gear specifications..."
              className="w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-2.5 text-sm text-neutral-900 outline-none focus:border-black focus:bg-white transition-all"
            />
          </label>

          <button
            type="submit"
            className="w-full mt-2 py-4 rounded-full bg-black text-white text-xs font-bold uppercase tracking-widest hover:bg-neutral-800 transition-all shadow-xl flex items-center justify-center gap-2 cursor-pointer active:scale-95"
          >
            <span>Proceed to WhatsApp Desk</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
