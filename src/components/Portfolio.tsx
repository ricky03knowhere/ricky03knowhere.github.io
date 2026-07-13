import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ExternalLink, Code2, ChevronLeft, ChevronRight, Calendar, Layers, SlidersHorizontal } from 'lucide-react';
import { getProjects, getSettings } from '../lib/data';

export default function Portfolio() {
  const allProjects = useMemo(() => getProjects(), []);
  const settings = useMemo(() => getSettings(), []);
  const itemsPerPage = settings.projectPerPage || 6;

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedStack, setSelectedStack] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);

  // Dynamic filter lists
  const availableYears = useMemo(() => {
    const years = allProjects.map((p) => p.year.toString());
    return ['All', ...Array.from(new Set(years)).sort((a, b) => b.localeCompare(a))];
  }, [allProjects]);

  const availableStacks = useMemo(() => {
    const stacks = allProjects.flatMap((p) => p.stack);
    return ['All', ...Array.from(new Set(stacks)).sort()];
  }, [allProjects]);

  // Process projects (filter & sort)
  const filteredAndSortedProjects = useMemo(() => {
    let result = [...allProjects];

    // Filter by search
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.stack.some((s) => s.toLowerCase().includes(q))
      );
    }

    // Filter by year
    if (selectedYear !== 'All') {
      result = result.filter((p) => p.year.toString() === selectedYear);
    }

    // Filter by stack
    if (selectedStack !== 'All') {
      result = result.filter((p) => p.stack.includes(selectedStack));
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return a.year - b.year;
        case 'a-z':
          return a.title.localeCompare(b.title);
        case 'z-a':
          return b.title.localeCompare(a.title);
        case 'newest':
        default:
          return b.year - a.year;
      }
    });

    return result;
  }, [allProjects, searchQuery, selectedYear, selectedStack, sortBy]);

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(filteredAndSortedProjects.length / itemsPerPage));
  
  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedYear, selectedStack, sortBy]);

  const paginatedProjects = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedProjects.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedProjects, currentPage, itemsPerPage]);

  return (
    <section id="portfolio" className="relative section-padding overflow-hidden">
      {/* Background neon glows */}
      <div className="absolute top-[20%] right-0 w-[400px] h-[400px] rounded-full bg-accent-cyan/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-0 w-[350px] h-[350px] rounded-full bg-accent-purple/5 blur-[100px] pointer-events-none" />

      <div className="section-container">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-4"
        >
          <div className="h-[1px] w-12 bg-gradient-to-r from-accent-cyan to-transparent" />
          <span className="text-accent-cyan text-sm font-medium tracking-widest uppercase">
            Portfolio
          </span>
        </motion.div>

        {/* Section title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-light-text/70 max-w-[400px] text-sm md:text-base font-light">
            A showcase of my recent design systems, fullstack applications, and experimental creations.
          </p>
        </div>

        {/* Controls / Filter Bar */}
        <div className="glass rounded-[20px] p-6 mb-12">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-light-text/50 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search projects or tech stack..."
                className="w-full pl-12 pr-4 py-3 bg-secondary/50 rounded-xl border border-glass-border focus:border-accent-cyan focus:outline-none text-white text-sm transition-all duration-300 placeholder:text-light-text/40"
              />
            </div>

            {/* Select Dropdowns (Year, Stack, Sort) */}
            <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full lg:w-auto justify-end">
              {/* Dropdown Filter Tahun */}
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="flex-1 sm:flex-none px-4 py-3 bg-secondary/50 rounded-xl border border-glass-border focus:border-accent-cyan focus:outline-none text-white text-sm transition-all duration-300 cursor-pointer min-w-[120px]"
              >
                <option value="All">All Years</option>
                {availableYears.filter(y => y !== 'All').map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>

              {/* Dropdown Filter Stack */}
              <select
                value={selectedStack}
                onChange={(e) => setSelectedStack(e.target.value)}
                className="flex-1 sm:flex-none px-4 py-3 bg-secondary/50 rounded-xl border border-glass-border focus:border-accent-cyan focus:outline-none text-white text-sm transition-all duration-300 cursor-pointer min-w-[140px]"
              >
                <option value="All">All Stacks</option>
                {availableStacks.filter(s => s !== 'All').map((stack) => (
                  <option key={stack} value={stack}>{stack}</option>
                ))}
              </select>

              {/* Dropdown Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 sm:flex-none px-4 py-3 bg-secondary/50 rounded-xl border border-glass-border focus:border-accent-cyan focus:outline-none text-white text-sm transition-all duration-300 cursor-pointer min-w-[140px]"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="a-z">Name A-Z</option>
                <option value="z-a">Name Z-A</option>
              </select>
            </div>
          </div>
        </div>

        {/* Project Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {paginatedProjects.length > 0 ? (
              paginatedProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={(e) => {
                    // Prevent navigation if user is clicking on demo/repo links directly
                    const target = e.target as HTMLElement;
                    if (target.closest('a')) return;
                    window.open(project.demoUrl, '_blank', 'noopener,noreferrer');
                  }}
                  className="group relative rounded-[20px] overflow-hidden glass hover:border-accent-cyan/30 transition-all duration-500 flex flex-col h-full hover:-translate-y-2 cursor-pointer hover:shadow-[0_15px_40px_rgba(34,211,238,0.08)]"
                  style={{
                    boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)'
                  }}
                >
                  {/* Card Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/0 to-accent-purple/0 group-hover:from-accent-cyan/5 group-hover:to-accent-purple/5 transition-all duration-500 pointer-events-none" />

                  {/* Image Container */}
                  <div className="relative aspect-video w-full overflow-hidden">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                    
                    {/* Category & Year badges */}
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1 text-[10px] uppercase font-bold tracking-widest bg-primary/80 backdrop-blur-md rounded-full text-accent-cyan border border-accent-cyan/30">
                        {project.category}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 text-[10px] font-bold bg-primary/80 backdrop-blur-md rounded-full text-light-text border border-glass-border">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-accent-cyan transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-light-text/70 text-sm font-light leading-relaxed mb-6 flex-grow">
                      {project.description}
                    </p>

                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.stack.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[10px] font-medium bg-white/5 rounded-md text-light-text/90 border border-white/5"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.stack.length > 4 && (
                        <span className="px-2 py-0.5 text-[10px] font-medium bg-white/5 rounded-md text-accent-purple font-semibold">
                          +{project.stack.length - 4} more
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4 border-t border-glass-border">
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl btn-gradient text-xs font-semibold"
                      >
                        <span>Live Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl btn-outline text-xs font-semibold"
                      >
                        <span>GitHub</span>
                        <Code2 className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-20 flex flex-col items-center justify-center text-center glass rounded-[20px]"
              >
                <div className="text-accent-purple text-4xl mb-4 font-heading">:(</div>
                <h3 className="text-lg font-bold text-white mb-2">No Projects Found</h3>
                <p className="text-light-text/70 text-sm max-w-xs">
                  Try adjusting your search queries or filter choices to find matching results.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-16">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className={`p-2.5 rounded-xl border border-glass-border transition-all duration-300 ${
                currentPage === 1
                  ? 'opacity-40 cursor-not-allowed text-light-text/30'
                  : 'text-light-text hover:border-accent-cyan hover:text-accent-cyan'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="text-sm font-medium text-light-text">
              Page <span className="text-white font-bold">{currentPage}</span> of{' '}
              <span className="text-white font-bold">{totalPages}</span>
            </span>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className={`p-2.5 rounded-xl border border-glass-border transition-all duration-300 ${
                currentPage === totalPages
                  ? 'opacity-40 cursor-not-allowed text-light-text/30'
                  : 'text-light-text hover:border-accent-cyan hover:text-accent-cyan'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
