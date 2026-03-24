import { useState } from "react";

const initialContacts = [
  { id: 1, name: "Arjun Sharma", company: "TechNova India", email: "arjun@technova.in", phone: "+91 98400 11223", status: "Active", value: "₹4,20,000", stage: "Closed Won", avatar: "AS", tag: "Enterprise" },
  { id: 2, name: "Priya Menon", company: "Infovista Pvt Ltd", email: "priya@infovista.co", phone: "+91 99001 44556", status: "Active", value: "₹1,85,000", stage: "Proposal", avatar: "PM", tag: "SMB" },
  { id: 3, name: "Ravi Krishnan", company: "BlueChip Solutions", email: "ravi@bluechip.in", phone: "+91 97700 88990", status: "Lead", value: "₹6,50,000", stage: "Discovery", avatar: "RK", tag: "Enterprise" },
  { id: 4, name: "Sneha Iyer", company: "Kairos Analytics", email: "sneha@kairos.io", phone: "+91 90000 22334", status: "Inactive", value: "₹75,000", stage: "Closed Lost", avatar: "SI", tag: "Startup" },
  { id: 5, name: "Vikram Nair", company: "Zenith Retail", email: "vikram@zenith.in", phone: "+91 96600 55678", status: "Active", value: "₹2,30,000", stage: "Negotiation", avatar: "VN", tag: "SMB" },
  { id: 6, name: "Kavya Reddy", company: "Nexgen Pharma", email: "kavya@nexgen.in", phone: "+91 98200 77891", status: "Lead", value: "₹9,10,000", stage: "Discovery", avatar: "KR", tag: "Enterprise" },
];

const initialDeals = [
  { id: 1, title: "TechNova ERP Rollout", contact: "Arjun Sharma", value: "₹4,20,000", stage: "Closed Won", close: "Mar 15, 2026" },
  { id: 2, title: "Infovista Analytics Suite", contact: "Priya Menon", value: "₹1,85,000", stage: "Proposal", close: "Apr 10, 2026" },
  { id: 3, title: "BlueChip Cloud Migration", contact: "Ravi Krishnan", value: "₹6,50,000", stage: "Discovery", close: "May 30, 2026" },
  { id: 4, title: "Zenith POS Integration", contact: "Vikram Nair", value: "₹2,30,000", stage: "Negotiation", close: "Apr 01, 2026" },
  { id: 5, title: "Nexgen CRM Deployment", contact: "Kavya Reddy", value: "₹9,10,000", stage: "Discovery", close: "Jun 20, 2026" },
];

const activities = [
  { id: 1, type: "call", text: "Called Arjun Sharma — ERP scope confirmed", time: "2h ago", color: "#22d3ee" },
  { id: 2, type: "email", text: "Sent proposal to Priya Menon", time: "5h ago", color: "#a78bfa" },
  { id: 3, type: "meeting", text: "Demo with BlueChip Solutions team", time: "Yesterday", color: "#f59e0b" },
  { id: 4, type: "note", text: "Zenith deal — pricing concern raised", time: "Yesterday", color: "#fb7185" },
  { id: 5, type: "email", text: "Follow-up sent to Kavya Reddy", time: "2 days ago", color: "#34d399" },
];

const stageColors = {
  "Discovery": { bg: "bg-violet-500/20", text: "text-violet-300", dot: "#a78bfa" },
  "Proposal": { bg: "bg-cyan-500/20", text: "text-cyan-300", dot: "#22d3ee" },
  "Negotiation": { bg: "bg-amber-500/20", text: "text-amber-300", dot: "#f59e0b" },
  "Closed Won": { bg: "bg-emerald-500/20", text: "text-emerald-300", dot: "#34d399" },
  "Closed Lost": { bg: "bg-rose-500/20", text: "text-rose-300", dot: "#fb7185" },
};

const statusColors = {
  "Active": "bg-emerald-500/20 text-emerald-300",
  "Lead": "bg-cyan-500/20 text-cyan-300",
  "Inactive": "bg-zinc-500/20 text-zinc-400",
};

const tagColors = {
  "Enterprise": "bg-violet-500/10 text-violet-400 border border-violet-500/30",
  "SMB": "bg-amber-500/10 text-amber-400 border border-amber-500/30",
  "Startup": "bg-pink-500/10 text-pink-400 border border-pink-500/30",
};

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: "⬡" },
  { id: "contacts", label: "Contacts", icon: "◈" },
  { id: "deals", label: "Deals", icon: "◆" },
  { id: "activities", label: "Activities", icon: "◉" },
];

function Avatar({ initials, size = "md" }) {
  const sizeClass = size === "sm" ? "w-8 h-8 text-xs" : size === "lg" ? "w-12 h-12 text-base" : "w-10 h-10 text-sm";
  return (
    <div className={`${sizeClass} rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center font-bold text-white shrink-0`}>
      {initials}
    </div>
  );
}

function Badge({ label, colorClass }) {
  return <span className={`px-2.5 py-0.5 rounded-lg text-xs font-semibold ${colorClass}`}>{label}</span>;
}

function StatCard({ label, value, sub, accent }) {
  return (
    <div className="relative rounded-2xl bg-white/5 border border-white/10 p-5 overflow-hidden hover:bg-white/8 transition-colors">
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-10 blur-2xl" style={{ background: accent }} />
      <p className="text-xs text-zinc-400 font-medium tracking-widest uppercase mb-2">{label}</p>
      <p className="text-3xl font-black text-white mb-1" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.04em" }}>{value}</p>
      <p className="text-xs text-zinc-500">{sub}</p>
    </div>
  );
}

function PipelineBar() {
  const stages = [
    { name: "Discovery", count: 2, color: "#a78bfa" },
    { name: "Proposal", count: 1, color: "#22d3ee" },
    { name: "Negotiation", count: 1, color: "#f59e0b" },
    { name: "Closed Won", count: 1, color: "#34d399" },
  ];
  const total = stages.reduce((a, b) => a + b.count, 0);
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
      <p className="text-xs text-zinc-400 font-medium tracking-widest uppercase mb-4">Pipeline Stages</p>
      <div className="flex rounded-xl overflow-hidden h-3 mb-4 gap-0.5">
        {stages.map(s => (
          <div key={s.name} style={{ width: `${(s.count / total) * 100}%`, background: s.color }} className="h-full first:rounded-l-xl last:rounded-r-xl transition-all" />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2">
        {stages.map(s => (
          <div key={s.name} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
            <span className="text-xs text-zinc-400">{s.name}</span>
            <span className="text-xs text-white font-bold ml-auto">{s.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-white mb-0.5" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.06em" }}>Welcome back, Bharath</h2>
        <p className="text-sm text-zinc-500">Here's what's happening in your pipeline today.</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label="Total Contacts" value="6" sub="+2 this month" accent="#a78bfa" />
        <StatCard label="Active Deals" value="5" sub="₹24,70,000 pipeline" accent="#22d3ee" />
        <StatCard label="Won This Month" value="1" sub="₹4,20,000 closed" accent="#34d399" />
        <StatCard label="Tasks Due" value="3" sub="2 overdue" accent="#f59e0b" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 rounded-2xl bg-white/5 border border-white/10 p-5">
          <p className="text-xs text-zinc-400 font-medium tracking-widest uppercase mb-4">Recent Deals</p>
          <div className="space-y-3">
            {initialDeals.slice(0, 4).map(deal => {
              const sc = stageColors[deal.stage];
              return (
                <div key={deal.id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div>
                    <p className="text-sm font-semibold text-white">{deal.title}</p>
                    <p className="text-xs text-zinc-500">{deal.contact} · {deal.close}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-white">{deal.value}</span>
                    <Badge label={deal.stage} colorClass={`${sc.bg} ${sc.text}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="space-y-4">
          <PipelineBar />
          <div className="rounded-2xl bg-white/5 border border-white/10 p-5">
            <p className="text-xs text-zinc-400 font-medium tracking-widest uppercase mb-4">Activity Feed</p>
            <div className="space-y-3">
              {activities.slice(0, 3).map(a => (
                <div key={a.id} className="flex gap-3 items-start">
                  <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: a.color }} />
                  <div>
                    <p className="text-xs text-zinc-300 leading-relaxed">{a.text}</p>
                    <p className="text-[10px] text-zinc-600 mt-0.5">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const emptyForm = { name: "", company: "", email: "", phone: "", status: "Lead", value: "", stage: "Discovery", tag: "SMB" };

function AddContactModal({ onClose, onSave }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErrors(e => ({ ...e, [k]: "" })); };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.company.trim()) e.company = "Company is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.phone.trim()) e.phone = "Phone is required";
    return e;
  };

  const handleSave = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    const initials = form.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
    onSave({ ...form, id: Date.now(), avatar: initials, value: form.value ? `₹${form.value}` : "₹0" });
    onClose();
  };

  const inputCls = (k) => `w-full bg-white/5 border rounded-xl px-3 py-2.5 text-sm text-white placeholder-zinc-600 outline-none transition-colors ${errors[k] ? "border-rose-500/60 focus:border-rose-500" : "border-white/10 focus:border-violet-500/60"}`;
  const selectCls = "w-full bg-[#18181f] border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-violet-500/60 transition-colors";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)" }}>
      <div className="w-full max-w-lg rounded-2xl border border-white/10 p-6 space-y-5" style={{ background: "#111118" }}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-black text-white" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.06em" }}>Add New Contact</h3>
            <p className="text-xs text-zinc-500 mt-0.5">Fill in the details below</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-colors text-lg">×</button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2 sm:col-span-1">
            <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block mb-1.5">Full Name *</label>
            <input value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Arjun Sharma" className={inputCls("name")} />
            {errors.name && <p className="text-[10px] text-rose-400 mt-1">{errors.name}</p>}
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block mb-1.5">Company *</label>
            <input value={form.company} onChange={e => set("company", e.target.value)} placeholder="e.g. TechNova India" className={inputCls("company")} />
            {errors.company && <p className="text-[10px] text-rose-400 mt-1">{errors.company}</p>}
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block mb-1.5">Email *</label>
            <input value={form.email} onChange={e => set("email", e.target.value)} placeholder="email@company.in" className={inputCls("email")} />
            {errors.email && <p className="text-[10px] text-rose-400 mt-1">{errors.email}</p>}
          </div>
          <div className="col-span-2 sm:col-span-1">
            <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block mb-1.5">Phone *</label>
            <input value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+91 98400 XXXXX" className={inputCls("phone")} />
            {errors.phone && <p className="text-[10px] text-rose-400 mt-1">{errors.phone}</p>}
          </div>
          <div>
            <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block mb-1.5">Status</label>
            <select value={form.status} onChange={e => set("status", e.target.value)} className={selectCls}>
              <option>Lead</option><option>Active</option><option>Inactive</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block mb-1.5">Stage</label>
            <select value={form.stage} onChange={e => set("stage", e.target.value)} className={selectCls}>
              <option>Discovery</option><option>Proposal</option><option>Negotiation</option><option>Closed Won</option><option>Closed Lost</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block mb-1.5">Deal Value (₹)</label>
            <input value={form.value} onChange={e => set("value", e.target.value)} placeholder="e.g. 4,20,000" className={inputCls("value")} />
          </div>
          <div>
            <label className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold block mb-1.5">Tag</label>
            <select value={form.tag} onChange={e => set("tag", e.target.value)} className={selectCls}>
              <option>SMB</option><option>Enterprise</option><option>Startup</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-300 text-sm font-semibold transition-colors border border-white/10">Cancel</button>
          <button onClick={handleSave} className="flex-1 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors">Save Contact</button>
        </div>
      </div>
    </div>
  );
}

function Contacts() {
  const [contacts, setContacts] = useState(initialContacts);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const filtered = contacts.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.company.toLowerCase().includes(search.toLowerCase())
  );

  const handleSave = (newContact) => setContacts(prev => [...prev, newContact]);

  return (
    <div className="space-y-5">
      {showModal && <AddContactModal onClose={() => setShowModal(false)} onSave={handleSave} />}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.06em" }}>Contacts</h2>
          <p className="text-sm text-zinc-500">{contacts.length} total contacts</p>
        </div>
        <button onClick={() => setShowModal(true)} className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors">+ Add Contact</button>
      </div>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Search by name or company..."
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-violet-500/50 transition-colors"
      />
      <div className="rounded-2xl border border-white/10 overflow-hidden">
        <div className="grid grid-cols-12 px-4 py-2.5 bg-white/5 text-[10px] font-bold tracking-widest uppercase text-zinc-500">
          <span className="col-span-4">Contact</span>
          <span className="col-span-2">Status</span>
          <span className="col-span-2">Stage</span>
          <span className="col-span-2">Value</span>
          <span className="col-span-2">Tag</span>
        </div>
        {filtered.length === 0 && (
          <div className="px-4 py-10 text-center text-sm text-zinc-600">No contacts found.</div>
        )}
        {filtered.map((c, i) => {
          const sc = stageColors[c.stage];
          return (
            <div key={c.id} className={`grid grid-cols-12 px-4 py-3 items-center hover:bg-white/5 transition-colors cursor-pointer ${i !== filtered.length - 1 ? "border-b border-white/5" : ""}`}>
              <div className="col-span-4 flex items-center gap-3">
                <Avatar initials={c.avatar} size="sm" />
                <div>
                  <p className="text-sm font-semibold text-white">{c.name}</p>
                  <p className="text-xs text-zinc-500">{c.company}</p>
                </div>
              </div>
              <div className="col-span-2"><Badge label={c.status} colorClass={statusColors[c.status]} /></div>
              <div className="col-span-2"><Badge label={c.stage} colorClass={`${sc.bg} ${sc.text}`} /></div>
              <div className="col-span-2 text-sm font-bold text-white">{c.value}</div>
              <div className="col-span-2"><span className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold ${tagColors[c.tag]}`}>{c.tag}</span></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Deals() {
  const columns = ["Discovery", "Proposal", "Negotiation", "Closed Won", "Closed Lost"];
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-black text-white" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.06em" }}>Deals Pipeline</h2>
        <p className="text-sm text-zinc-500">Drag deals across stages to update</p>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {columns.map(stage => {
          const sc = stageColors[stage];
          const deals = initialDeals.filter(d => d.stage === stage);
          return (
            <div key={stage} className="min-w-[220px] rounded-2xl bg-white/5 border border-white/10 p-3 flex flex-col gap-2">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: sc.dot }} />
                  <span className="text-xs font-bold text-zinc-300">{stage}</span>
                </div>
                <span className="text-xs text-zinc-600 font-semibold bg-white/5 px-2 py-0.5 rounded-lg">{deals.length}</span>
              </div>
              {deals.map(deal => (
                <div key={deal.id} className="rounded-xl bg-white/5 border border-white/10 p-3 hover:bg-white/10 transition-colors cursor-pointer">
                  <p className="text-sm font-semibold text-white leading-snug mb-1">{deal.title}</p>
                  <p className="text-xs text-zinc-500 mb-2">{deal.contact}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-white">{deal.value}</span>
                    <span className="text-[10px] text-zinc-600">{deal.close}</span>
                  </div>
                </div>
              ))}
              {deals.length === 0 && (
                <div className="rounded-xl border border-dashed border-white/10 p-4 text-center text-xs text-zinc-700">No deals</div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Activities() {
  const iconMap = { call: "📞", email: "✉️", meeting: "🗓", note: "📝" };
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.06em" }}>Activities</h2>
          <p className="text-sm text-zinc-500">{activities.length} recent activities</p>
        </div>
        <button className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold transition-colors">+ Log Activity</button>
      </div>
      <div className="space-y-3">
        {activities.map(a => (
          <div key={a.id} className="flex items-start gap-4 rounded-2xl bg-white/5 border border-white/10 p-4 hover:bg-white/8 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0" style={{ background: a.color + "22", border: `1px solid ${a.color}44` }}>
              {iconMap[a.type]}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white">{a.text}</p>
              <p className="text-xs text-zinc-500 mt-0.5 capitalize">{a.type} · {a.time}</p>
            </div>
            <span className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: a.color }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BharathCRM() {
  const [active, setActive] = useState("dashboard");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap');
        html, body, #root { height: 100%; margin: 0; padding: 0; }
        * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #3f3f46; border-radius: 8px; }
      `}</style>
      <div style={{ position: "fixed", inset: 0, display: "flex", background: "radial-gradient(ellipse at 20% 0%, #1a0a2e 0%, #0a0a0f 60%)" }} className="text-white">
        {/* Sidebar */}
        <aside className="w-56 shrink-0 border-r border-white/8 flex flex-col py-6 px-3 gap-1 h-full overflow-y-auto">
          {/* Logo */}
          <div className="px-3 mb-8">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white font-black text-sm">B</div>
              <div>
                <p className="text-white font-black text-sm leading-none" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.1em" }}>BHARATH</p>
                <p className="text-[10px] text-zinc-600 leading-none tracking-widest">CRM PLATFORM</p>
              </div>
            </div>
          </div>
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActive(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all text-left ${
                active === item.id
                  ? "bg-violet-600/30 text-violet-300 border border-violet-500/30"
                  : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}
          <div className="mt-auto px-3 pt-4 border-t border-white/8">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500 to-rose-500 flex items-center justify-center text-white font-bold text-xs">BK</div>
              <div>
                <p className="text-xs font-semibold text-white">Bharath Kumar</p>
                <p className="text-[10px] text-zinc-600">Sales Manager</p>
              </div>
            </div>
          </div>
        </aside>
        {/* Main */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 h-full">
          {active === "dashboard" && <Dashboard />}
          {active === "contacts" && <Contacts />}
          {active === "deals" && <Deals />}
          {active === "activities" && <Activities />}
        </main>
      </div>
    </>
  );
}