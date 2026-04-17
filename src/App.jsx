import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, 
  Search, 
  X, 
  Maximize2, 
  TrendingUp, 
  Gamepad, 
  Filter,
  Play
} from 'lucide-react';
import gamesData from './games.json';

export default function App() {
  const [games] = useState(gamesData);
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [isFullscreen, setIsFullscreen] = useState(false);

  const categories = useMemo(() => {
    const cats = ['All', ...new Set(games.map(g => g.category))];
    return cats;
  }, [games]);

  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [games, searchQuery, activeCategory]);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeGame = () => {
    setSelectedGame(null);
    setIsFullscreen(false);
  };

  return (
    <div className="min-h-screen relative gaming-grid">
      {/* Header */}
      <nav className="sticky top-0 z-40 bg-gaming-bg/80 backdrop-blur-md border-b border-gaming-border px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={closeGame}>
            <div className="w-10 h-10 bg-gaming-neon rounded-lg flex items-center justify-center neon-shadow">
              <Gamepad2 className="text-black w-6 h-6" />
            </div>
            <span className="text-2xl font-display font-bold text-white tracking-tighter">
              NEXUS<span className="text-gaming-neon">GAMES</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {categories.slice(0, 5).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-sm tracking-wider uppercase font-medium transition-colors ${
                  activeCategory === cat ? 'text-gaming-neon' : 'text-gray-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-gaming-neon transition-colors" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gaming-card border border-gaming-border rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-gaming-neon w-40 md:w-64 transition-all hover:border-gaming-neon/50"
            />
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {!selectedGame ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              {/* Hero */}
              <div className="mb-16 relative overflow-hidden rounded-3xl bg-gaming-card border border-gaming-border p-8 md:p-12">
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                  <div className="flex-1 text-center md:text-left">
                    <div className="inline-flex items-center gap-2 bg-gaming-neon/10 text-gaming-neon px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                      <TrendingUp className="w-4 h-4" />
                      Now Trending
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-none">
                      BATTLE THE <br />
                      <span className="text-gaming-neon">BOREDOM.</span>
                    </h1>
                    <p className="text-gray-400 text-lg mb-8 max-w-lg">
                      Explore our hand-picked collection of unblocked games. Premium performance, zero distractions.
                    </p>
                    <button 
                      onClick={() => handleGameSelect(games[0])}
                      className="bg-gaming-neon text-black px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform neon-shadow mx-auto md:mx-0"
                    >
                      <Play className="w-5 h-5 fill-current" />
                      PLAY FEATURED
                    </button>
                  </div>
                  <div className="flex-1 w-full max-w-sm aspect-video rounded-2xl overflow-hidden border-2 border-gaming-neon/20 shadow-2xl shadow-gaming-neon/20 md:rotate-3">
                    <img 
                      src={games[0].thumbnail} 
                      alt="Featured" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-gaming-neon/5 blur-[120px] -z-0" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gaming-purple/5 blur-[120px] -z-0" />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap items-center gap-3 mb-12">
                <div className="flex items-center gap-2 mr-4 text-gray-500">
                  <Filter className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Categories</span>
                </div>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2 rounded-full text-sm font-semibold transition-all border ${
                      activeCategory === cat 
                      ? 'bg-gaming-neon border-gaming-neon text-black neon-shadow' 
                      : 'bg-gaming-card border-gaming-border text-gray-400 hover:border-gaming-neon/50 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredGames.length > 0 ? (
                  filteredGames.map((game, idx) => (
                    <motion.div
                      key={game.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ y: -8 }}
                      onClick={() => handleGameSelect(game)}
                      className="group cursor-pointer bg-gaming-card border border-gaming-border rounded-2xl overflow-hidden neon-shadow-hover transition-all"
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src={game.thumbnail} 
                          alt={game.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gaming-bg to-transparent opacity-60" />
                        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md px-2 py-1 rounded-md text-[10px] font-bold text-gaming-neon border border-gaming-neon/20">
                          {game.category}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 flex items-center justify-between">
                          {game.title}
                          <Gamepad className="w-4 h-4 text-gaming-neon opacity-0 group-hover:opacity-100 transition-opacity" />
                        </h3>
                        <p className="text-gray-400 text-sm line-clamp-2">
                          {game.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {game.tags?.map(tag => (
                            <span key={tag} className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">#{tag}</span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-20">
                    <p className="text-gray-500 text-lg">No games found matching your search.</p>
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="player"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col gap-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <button 
                    onClick={closeGame}
                    className="flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors group"
                  >
                    <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                    <span className="text-sm font-bold uppercase tracking-widest">Back to Grid</span>
                  </button>
                  <h1 className="text-4xl font-bold text-gaming-neon">{selectedGame.title}</h1>
                </div>
                <div className="flex gap-4">
                  <button 
                    onClick={() => setIsFullscreen(!isFullscreen)}
                    className="p-3 bg-gaming-card border border-gaming-border rounded-xl text-gray-400 hover:text-gaming-neon hover:border-gaming-neon transition-all"
                    title="Fullscreen Mode"
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className={`relative bg-black rounded-3xl overflow-hidden border-4 border-gaming-card shadow-2xl transition-all duration-500 ${isFullscreen ? 'fixed inset-0 z-50 rounded-none border-0' : 'aspect-video'}`}>
                {isFullscreen && (
                  <button 
                    onClick={() => setIsFullscreen(false)}
                    className="absolute top-6 right-6 z-[60] p-4 bg-black/50 backdrop-blur-md rounded-full text-white hover:text-gaming-neon transition-all"
                  >
                    <X className="w-6 h-6" />
                  </button>
                )}
                <iframe
                  src={selectedGame.url}
                  className="w-full h-full border-0"
                  allow="fullscreen"
                  title={selectedGame.title}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                  <div className="bg-gaming-card border border-gaming-border p-8 rounded-3xl">
                    <h2 className="text-2xl font-bold mb-4">About the Game</h2>
                    <p className="text-gray-400 leading-relaxed text-lg">
                      {selectedGame.description}
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-gaming-card border border-gaming-border p-8 rounded-3xl">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Game Info</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Category</span>
                        <span className="text-gaming-neon font-bold">{selectedGame.category}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Status</span>
                        <span className="text-green-500 font-bold px-2 py-0.5 bg-green-500/10 rounded text-xs">UNBLOCKED</span>
                      </div>
                      <div className="pt-4 border-t border-gaming-border">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest block mb-3">Tags</span>
                        <div className="flex flex-wrap gap-2">
                          {selectedGame.tags?.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-gaming-bg rounded-lg text-xs text-gray-300 border border-gaming-border">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-gaming-border py-12 px-6 mt-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gaming-neon/20 rounded-lg flex items-center justify-center">
              <Gamepad2 className="text-gaming-neon w-4 h-4" />
            </div>
            <span className="text-xl font-display font-bold text-white tracking-tighter">
              NEXUS<span className="text-gaming-neon">GAMES</span>
            </span>
          </div>
          <p className="text-gray-500 text-sm">
            © 2026 Nexus Games. Curated collection of the best unblocked web experiences.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 hover:text-gaming-neon text-xs font-bold uppercase tracking-widest transition-colors">Discord</a>
            <a href="#" className="text-gray-500 hover:text-gaming-neon text-xs font-bold uppercase tracking-widest transition-colors">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-gaming-neon text-xs font-bold uppercase tracking-widest transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
