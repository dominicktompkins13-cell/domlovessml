import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Play, ChevronLeft, Zap } from 'lucide-react';
import gamesData from './games.json';

const CATEGORIES = ["All", "Action", "Sports", "Driving", "Simulation", "Idle", "Puzzle", "Avoidance"];

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredGames = useMemo(() => {
    return gamesData.filter(game => {
      const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            game.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = activeCategory === "All" || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col p-6 gap-6 max-w-[1400px] mx-auto">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-center glass-header p-4 gap-4">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setSelectedGame(null)}
        >
          <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-transform">
            <Zap className="text-white fill-white" size={24} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight uppercase">ARCADE<span className="text-indigo-400">.NODE</span></h1>
        </div>

        {!selectedGame && (
          <div className="flex-1 max-w-lg mx-0 md:mx-8 relative w-full">
            <div className="bg-slate-800 rounded-lg border border-slate-700 flex items-center px-4 py-2 w-full">
              <Search className="text-slate-400 mr-2" size={18} />
              <input 
                type="text" 
                placeholder="Search index..." 
                className="w-full bg-transparent border-0 focus:ring-0 text-sm placeholder:text-slate-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700 flex items-center gap-3 shrink-0">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
          <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">System: Online ({filteredGames.length} Games)</span>
        </div>
      </header>

      <main className="flex-1 w-full">
        <AnimatePresence mode="wait">
          {selectedGame ? (
            <motion.div
              key="player"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setSelectedGame(null)}
                  className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors group px-4 py-2 rounded-xl bg-slate-900 border border-slate-800"
                >
                  <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                  RETURN TO NODES
                </button>
              </div>

              <div className="aspect-video w-full bg-slate-900 rounded-3xl overflow-hidden bento-card relative">
                <iframe 
                  src={selectedGame.iframeUrl}
                  className="w-full h-full border-0"
                  allowFullScreen
                  title={selectedGame.name}
                />
              </div>

              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-1 bento-card p-8">
                  <span className="bg-indigo-500 text-[10px] font-bold uppercase px-2 py-1 rounded inline-block mb-4">Instance Active</span>
                  <h2 className="text-4xl font-black mb-3">{selectedGame.name}</h2>
                  <p className="text-slate-400 leading-relaxed text-sm mb-6 max-w-2xl">
                    {selectedGame.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {selectedGame.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-bold uppercase px-3 py-1 bg-slate-800 rounded-lg border border-slate-700 text-slate-400 tracking-wider">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="w-full md:w-80 flex flex-col gap-4">
                  <div className="p-6 bento-card bg-indigo-600 border-indigo-400 flex flex-col justify-between relative overflow-hidden h-full">
                    <div className="relative z-10">
                      <h3 className="text-lg font-bold">Node Metadata</h3>
                      <p className="text-indigo-100 text-sm opacity-80 mt-1 uppercase tracking-tighter">v4.1.2-STABLE</p>
                    </div>
                    <div className="relative z-10 space-y-4 mt-8">
                      <div>
                        <div className="text-4xl font-black">99.9%</div>
                        <div className="text-[10px] uppercase tracking-widest font-bold text-indigo-200">Uptime Stability</div>
                      </div>
                      <div className="flex gap-2">
                         <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                            <div className="bg-white h-full w-[85%]"></div>
                         </div>
                      </div>
                    </div>
                    <div className="absolute -right-4 -top-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Featured Section */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="col-span-1 md:col-span-8 bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 group relative p-12 min-h-[400px] flex flex-col justify-end">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent z-10"></div>
                  <div className="absolute inset-0 bg-indigo-600/5"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity grayscale group-hover:grayscale-0 transition-all duration-700"
                    alt="Featured"
                  />
                  <div className="relative z-20">
                    <span className="bg-indigo-500 text-[10px] font-bold uppercase px-2 py-1 rounded mb-4 inline-block tracking-wider">New Core Sync</span>
                    <h2 className="text-5xl font-black mb-3 leading-tight tracking-tighter text-white">READY FOR <br /> DEPLOYMENT</h2>
                    <p className="text-slate-300 max-w-md text-sm leading-relaxed mb-6 italic opacity-80">
                      High-octane arcade experience directly in your browser. Low-latency, unblocked, and ready to launch.
                    </p>
                    <button className="bg-white text-slate-950 font-black px-10 py-3.5 rounded-full hover:bg-indigo-400 transition-colors shadow-2xl shadow-indigo-500/20 text-sm uppercase tracking-widest">
                      Enter Laboratory
                    </button>
                  </div>
                  <div className="absolute top-10 right-10 flex gap-2 z-20">
                    <div className="px-3 py-1 rounded-full border border-white/20 text-[10px] font-bold uppercase backdrop-blur-md">Local Manifest</div>
                  </div>
                </div>

                <div className="col-span-1 md:col-span-4 rounded-3xl grid grid-rows-2 gap-6">
                  <div className="bg-indigo-600 rounded-3xl p-8 border border-indigo-400 flex flex-col justify-between relative overflow-hidden group">
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold">Games Index</h3>
                      <p className="text-indigo-100 text-sm opacity-80">v2.4.rev8</p>
                    </div>
                    <div className="relative z-10 flex items-end justify-between">
                      <div>
                        <div className="text-5xl font-black">428</div>
                        <div className="text-[10px] uppercase tracking-widest font-bold text-indigo-200">Active Modules</div>
                      </div>
                      <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                        <span className="text-2xl">↗</span>
                      </div>
                    </div>
                    <div className="absolute -right-4 -top-4 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                  </div>

                  <div className="bento-card p-8 flex flex-col">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Popular Tags</h3>
                    <div className="flex flex-wrap gap-2">
                       {["Fast", "3D", "Logic", "Strategy", "Classic"].map(tag => (
                         <div key={tag} className="bg-slate-800 px-4 py-2 rounded-xl text-xs font-bold border border-slate-700/50 hover:bg-slate-700 cursor-pointer transition-colors uppercase tracking-wider text-slate-300">
                           {tag}
                         </div>
                       ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Browse Section */}
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between glass-header p-2">
                  <div className="flex flex-wrap gap-1">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-5 py-2.5 rounded-xl text-[10px] font-bold tracking-widest transition-all uppercase ${
                          activeCategory === cat 
                          ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/20' 
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredGames.map((game, index) => (
                    <motion.div
                      key={game.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleGameSelect(game)}
                      className="group"
                    >
                      <div className="bento-card bento-card-interactive p-4 h-full flex flex-col">
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-5 relative bg-slate-800 border border-slate-700/50">
                          <img 
                            src={game.thumbnail} 
                            alt={game.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                          />
                          <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-transparent transition-colors" />
                          <div className="absolute bottom-3 left-3">
                             <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                <Play size={16} className="fill-white text-white ml-0.5" />
                             </div>
                          </div>
                        </div>
                        <div className="space-y-2 flex-1">
                          <div className="flex justify-between items-start">
                            <span className="text-[9px] font-black uppercase text-indigo-400 tracking-widest">{game.category}</span>
                            <span className="text-[9px] font-bold text-slate-600 uppercase">id:{game.id.slice(0, 4)}</span>
                          </div>
                          <h3 className="font-bold text-lg text-slate-100 group-hover:text-indigo-400 transition-colors truncate">
                            {game.name}
                          </h3>
                          <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                            {game.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filteredGames.length === 0 && (
                  <div className="h-64 flex flex-col items-center justify-center text-slate-500 bento-card gap-4 border-dashed">
                    <div className="w-12 h-12 rounded-full border-2 border-slate-800 flex items-center justify-center animate-pulse">
                      <X size={20} className="text-slate-600" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em]">Zero Results in Search Index</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="flex flex-col md:flex-row justify-between items-center text-[10px] text-slate-600 uppercase tracking-[0.2em] border-t border-slate-900 pt-8 pb-4">
        <div className="flex items-center gap-4">
          <span>Host: Locally Distributed</span>
          <span className="w-1 h-1 bg-slate-800 rounded-full"></span>
          <span>Port: 3000</span>
        </div>
        <div className="flex gap-6 my-4 md:my-0">
          <span className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            Session: Active
          </span>
          <span>JSON Engine: v4.1</span>
        </div>
        <div className="text-slate-500">© 2026 NOVA.GAMES - UNBLOCKED NETWORK</div>
      </footer>
    </div>
  );
}
