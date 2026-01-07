import { useState, useEffect } from "react";
import TimerRow from "./TimerRow";
import { Plus, X, Save, ArrowLeft, Sun, Moon, Watch, Monitor, Zap } from "lucide-react";

function App() {
  const [timers, setTimers] = useState(() => {
    const saved = localStorage.getItem("my_timers");
    return saved ? JSON.parse(saved) : [];
  });

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined" && localStorage.getItem("theme")) {
      return localStorage.getItem("theme");
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  // New State for Visual Style
  const [visualStyle, setVisualStyle] = useState(() => {
    return localStorage.getItem("visual_style") || "flip";
  });

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", date: "" });
  const [editingId, setEditingId] = useState(null);
  const [fullscreenTimer, setFullscreenTimer] = useState(null);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("my_timers", JSON.stringify(timers));
  }, [timers]);

  useEffect(() => {
    localStorage.setItem("visual_style", visualStyle);
  }, [visualStyle]);

  const toggleTheme = () => setTheme(prev => prev === "dark" ? "light" : "dark");

  const handleSave = () => {
    if (!formData.title || !formData.date) return;
    if (editingId) {
      setTimers(timers.map(t => t.id === editingId ? { ...t, ...formData } : t));
      setEditingId(null);
    } else {
      setTimers([...timers, { id: Date.now(), ...formData }]);
    }
    setFormData({ title: "", date: "" });
    setShowForm(false);
  };

  const startEdit = (id) => {
    const timerToEdit = timers.find(t => t.id === id);
    setFormData({ title: timerToEdit.title, date: timerToEdit.date });
    setEditingId(id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const deleteTimer = (id) => {
    if (confirm("Delete this timer?")) setTimers(timers.filter(t => t.id !== id));
  };

  const openFullscreen = (id) => {
    const timer = timers.find(t => t.id === id);
    setFullscreenTimer(timer);
  };

  // --- FULLSCREEN ---
  if (fullscreenTimer) {
    return (
      <div className="fixed inset-0 z-50 bg-gray-50 dark:bg-zinc-950 flex flex-col">
        <button onClick={() => setFullscreenTimer(null)} className="absolute top-6 left-6 flex items-center gap-2 text-gray-500 hover:text-white transition-colors z-50 font-bold">
          <ArrowLeft size={24} /> BACK
        </button>
        <TimerRow id={fullscreenTimer.id} title={fullscreenTimer.title} date={fullscreenTimer.date} isFullscreen={true} theme={visualStyle} />
      </div>
    );
  }

  // --- DASHBOARD ---
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-zinc-950 text-gray-900 dark:text-zinc-100 font-mono selection:bg-cyan-500/30 transition-colors duration-500">
      <div className="max-w-5xl mx-auto p-6 md:p-12">
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <h1 className="text-2xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 dark:from-zinc-100 dark:to-zinc-500">
            CHRONOS DASHBOARD
          </h1>
          
          <div className="flex flex-wrap items-center gap-4">
            {/* Style Switcher */}
            <div className="flex bg-gray-200 dark:bg-zinc-900 rounded-lg p-1">
              <button onClick={() => setVisualStyle("flip")} className={`p-2 rounded-md transition-all ${visualStyle === 'flip' ? 'bg-white dark:bg-zinc-800 shadow-sm' : 'text-gray-500'}`} title="Flip Style">
                <Monitor size={18} />
              </button>
              <button onClick={() => setVisualStyle("casio")} className={`p-2 rounded-md transition-all ${visualStyle === 'casio' ? 'bg-white dark:bg-zinc-800 shadow-sm' : 'text-gray-500'}`} title="Casio Style">
                <Watch size={18} />
              </button>
              <button onClick={() => setVisualStyle("nixie")} className={`p-2 rounded-md transition-all ${visualStyle === 'nixie' ? 'bg-white dark:bg-zinc-800 shadow-sm' : 'text-gray-500'}`} title="Nixie Style">
                <Zap size={18} />
              </button>
            </div>

            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors text-gray-600 dark:text-zinc-400">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button onClick={() => { setShowForm(!showForm); setEditingId(null); setFormData({ title: "", date: "" }); }} className="flex items-center gap-2 bg-white dark:bg-zinc-100 text-gray-900 dark:text-zinc-950 px-4 py-2 rounded-lg font-bold hover:bg-cyan-50 dark:hover:bg-cyan-400 transition-colors text-sm shadow-sm">
              {showForm ? <><X size={16}/> Cancel</> : <><Plus size={16}/> New Timer</>}
            </button>
          </div>
        </header>

        {showForm && (
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-xl p-6 mb-8 shadow-sm animate-in slide-in-from-top-4 fade-in">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="text" placeholder="Timer Title" className="bg-gray-50 dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white outline-none" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              <input type="datetime-local" className="bg-gray-50 dark:bg-zinc-950 border border-gray-300 dark:border-zinc-700 rounded-lg px-4 py-3 text-gray-500 dark:text-zinc-400 outline-none" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
              <button onClick={handleSave} className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg py-3 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-cyan-900/20">
                {editingId ? <><Save size={18}/> Update</> : <><Plus size={18}/> Create</>}
              </button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {timers.map(timer => (
            <TimerRow key={timer.id} {...timer} theme={visualStyle} onDelete={deleteTimer} onEdit={startEdit} onSelect={openFullscreen} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;