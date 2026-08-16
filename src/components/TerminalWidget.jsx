import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTerminal, FaTimes, FaExpand, FaCompress, FaPlay, FaTrash,
  FaFolder, FaFileCode, FaExternalLinkAlt, FaQuoteRight, FaGlobe, FaWifi, FaLaptopCode
} from 'react-icons/fa';
import { personalData, projectsData, terminalCommands } from '../data/portfolioData';
import { soundFx } from '../utils/SoundEffects';

const VIRTUAL_FILES = {
  'about.txt': `Tejas Thakare
Postgraduate Computer Science Student & Full Stack Engineer.
Specializing in FastAPI REST microservices, React/Next.js UI, PostgreSQL databases, and enterprise ERP solutions (Odoo 16 & Fly Ash Bricks ERP).
Location: Nashik, Maharashtra, India
Status: 🟢 Open for Software Engineer & Full Stack roles.`,
  'skills.json': `{
  "developer": "Tejas Thakare",
  "degree": "M.Sc. Computer Science (SGPA 8.0)",
  "backend": ["FastAPI", "Python", "Node.js", "REST APIs"],
  "frontend": ["React.js", "Next.js", "Tailwind CSS", "Framer Motion"],
  "databases": ["PostgreSQL", "MySQL"],
  "erp": ["Odoo 16 ERP", "Fly Ash Bricks ERP"],
  "tools": ["Git", "GitHub", "VS Code", "Vercel"]
}`,
  'projects.md': `# Featured Developer Projects

1. Discover Nashik Tourism Guide
   - Tech: React.js, Tailwind CSS, Leaflet Maps, Vercel
   - Live: https://nashik-tourism-eta.vercel.app/

2. Nashik's Best Misal Portal
   - Tech: React.js, Tailwind CSS, Vercel
   - Live: https://nashik-top-misal.vercel.app

3. Fly Ash Bricks ERP System
   - Tech: FastAPI, Next.js, PostgreSQL

4. E-Learning Platform
   - Tech: PHP, MySQL, Full Stack`,
  'contact.cfg': `[CONTACT_INFO]
email=${personalData.email}
phone=${personalData.phone}
location=${personalData.location}
github=${personalData.github}
linkedin=${personalData.linkedin}`,
  'secrets.env': `PUBLIC_KEY=pk_live_tejas_2026_portfolio
SECRET_KEY=fastapi_jwt_super_secret_token_998
ENVIRONMENT=production
SUPER_POWER=Python_FastAPI_PostgreSQL_NextJS_Architect`
};

const PROGRAMMING_QUOTES = [
  '"Simplicity is prerequisite for reliability." — Edsger W. Dijkstra',
  '"Talk is cheap. Show me the code." — Linus Torvalds',
  '"First, solve the problem. Then, write the code." — John Johnson',
  '"Make it work, make it right, make it fast." — Kent Beck',
  '"Code is like humor. When you have to explain it, it’s bad." — Cory House'
];

const ALL_SUGGESTIONS = [
  'help', 'api', 'whoami', 'skills', 'projects', 'open 1', 'open 2', 'open github', 'open linkedin',
  'ls', 'cat about.txt', 'cat skills.json', 'cat projects.md', 'cat contact.cfg', 'cat secrets.env',
  'sysinfo', 'ping vercel.app', 'matrix', 'quote', 'date', 'contact', 'resume', 'clear'
];

export default function TerminalWidget({ isOpen, onClose, onOpenResume, onOpenApiWorkbench }) {
  const [history, setHistory] = useState([
    { type: 'system', text: '⚡ Tejas Thakare Interactive Developer Terminal v2.5.0' },
    { type: 'system', text: 'Type "help" to view available shell commands, or "ls" to explore virtual filesystem.' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history, isMatrixActive]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const addOutputLine = (type, text) => {
    setHistory((prev) => [...prev, { type, text }]);
  };

  const handleCommand = (cmdStr) => {
    const rawCmd = cmdStr.trim();
    if (!rawCmd) return;

    soundFx.playBeep();
    setCommandHistory((prev) => [...prev, rawCmd]);
    setHistoryIdx(-1);

    const newHistory = [...history, { type: 'user', text: `tejas@portfolio:~$ ${rawCmd}` }];
    setHistory(newHistory);
    setInputVal('');

    const parts = rawCmd.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ').trim();

    // Command Dispatcher
    switch (mainCmd) {
      case 'clear':
        setHistory([]);
        setIsMatrixActive(false);
        return;

      case 'help':
        setHistory((prev) => [
          ...prev,
          { type: 'output', text: terminalCommands.help }
        ]);
        break;

      case 'api':
        setHistory((prev) => [
          ...prev,
          { type: 'highlight', text: terminalCommands.api }
        ]);
        if (onOpenApiWorkbench) {
          onOpenApiWorkbench();
        }
        break;

      case 'whoami':
        setHistory((prev) => [
          ...prev,
          { type: 'highlight', text: terminalCommands.whoami }
        ]);
        break;

      case 'skills':
        setHistory((prev) => [
          ...prev,
          { type: 'output', text: terminalCommands.skills }
        ]);
        break;

      case 'projects':
        setHistory((prev) => [
          ...prev,
          { type: 'output', text: terminalCommands.projects }
        ]);
        break;

      case 'ls':
        const fileList = Object.keys(VIRTUAL_FILES).join('   ');
        setHistory((prev) => [
          ...prev,
          { type: 'system', text: `📄 Virtual Directory Contents:\n${fileList}` }
        ]);
        break;

      case 'cat':
        if (!args) {
          setHistory((prev) => [
            ...prev,
            { type: 'error', text: 'Usage: cat <filename> (e.g. cat about.txt, cat skills.json)' }
          ]);
        } else if (args in VIRTUAL_FILES) {
          setHistory((prev) => [
            ...prev,
            { type: 'output', text: VIRTUAL_FILES[args] }
          ]);
        } else {
          setHistory((prev) => [
            ...prev,
            { type: 'error', text: `cat: ${args}: No such file or directory. Try "ls"` }
          ]);
        }
        break;

      case 'open':
        const target = args.toLowerCase();
        if (target === '1' || target.includes('tourism')) {
          setHistory((prev) => [
            ...prev,
            { type: 'system', text: '🚀 Opening Discover Nashik Tourism Guide in new tab...' }
          ]);
          window.open('https://nashik-tourism-eta.vercel.app/', '_blank');
        } else if (target === '2' || target.includes('misal')) {
          setHistory((prev) => [
            ...prev,
            { type: 'system', text: '🚀 Opening Nashik Best Misal Portal in new tab...' }
          ]);
          window.open('https://nashik-top-misal.vercel.app', '_blank');
        } else if (target === 'github' || target.includes('git')) {
          setHistory((prev) => [
            ...prev,
            { type: 'system', text: '🚀 Opening GitHub profile...' }
          ]);
          window.open(personalData.github, '_blank');
        } else if (target === 'linkedin') {
          setHistory((prev) => [
            ...prev,
            { type: 'system', text: '🚀 Opening LinkedIn profile...' }
          ]);
          window.open(personalData.linkedin, '_blank');
        } else if (target === 'resume' || target === 'cv') {
          setHistory((prev) => [
            ...prev,
            { type: 'system', text: '📄 Triggering PDF Resume Preview Modal...' }
          ]);
          if (onOpenResume) onOpenResume();
        } else {
          setHistory((prev) => [
            ...prev,
            {
              type: 'error',
              text: `Invalid open target "${args}". Try: open 1, open 2, open github, open linkedin, open resume`
            }
          ]);
        }
        break;

      case 'sysinfo':
      case 'uname':
        setHistory((prev) => [
          ...prev,
          {
            type: 'highlight',
            text: `💻 System Specifications:
  OS       : TejasOS v2026.1 (Linux x86_64)
  Kernel   : 6.8.0-45-generic
  User     : tejas@portfolio
  Shell    : zsh / bash interactive CLI
  Stack    : Python 3.12 | FastAPI | React 19 | Next.js | PostgreSQL
  Status   : Operational (100% Uptime)`
          }
        ]);
        break;

      case 'ping':
        const host = args || 'vercel.app';
        setHistory((prev) => [
          ...prev,
          {
            type: 'system',
            text: `PING ${host} (76.76.21.21): 56 data bytes
64 bytes from 76.76.21.21: icmp_seq=0 ttl=58 time=12.4 ms
64 bytes from 76.76.21.21: icmp_seq=1 ttl=58 time=14.1 ms
64 bytes from 76.76.21.21: icmp_seq=2 ttl=58 time=11.8 ms
64 bytes from 76.76.21.21: icmp_seq=3 ttl=58 time=13.0 ms
--- ${host} ping statistics ---
4 packets transmitted, 4 packets received, 0.0% packet loss
round-trip min/avg/max = 11.8/12.8/14.1 ms`
          }
        ]);
        break;

      case 'matrix':
        setIsMatrixActive(true);
        setHistory((prev) => [
          ...prev,
          {
            type: 'matrix',
            text: `01001001 01101110 01101001 01110100 01101001 01100001 01110100 01101001 01101110 01100111...
01010100 01100101 01101010 01100001 01110011 00100000 01010100 01101000 01100001 01101011 01100001 01110010 01100101
FastAPI > PostgreSQL > React.js > Next.js > Matrix Mode Online [CONNECTED]`
          }
        ]);
        break;

      case 'quote':
        const randomQuote = PROGRAMMING_QUOTES[Math.floor(Math.random() * PROGRAMMING_QUOTES.length)];
        setHistory((prev) => [...prev, { type: 'highlight', text: randomQuote }]);
        break;

      case 'date':
        setHistory((prev) => [
          ...prev,
          { type: 'system', text: `📅 Local Time : ${new Date().toString()}\n🌍 UTC Time   : ${new Date().toUTCString()}` }
        ]);
        break;

      case 'contact':
        setHistory((prev) => [
          ...prev,
          { type: 'output', text: terminalCommands.contact }
        ]);
        break;

      case 'resume':
      case 'cv':
        setHistory((prev) => [
          ...prev,
          { type: 'system', text: terminalCommands.resume }
        ]);
        if (onOpenResume) onOpenResume();
        break;

      case 'sudo':
        setHistory((prev) => [
          ...prev,
          { type: 'error', text: '[sudo] password for guest: Permission denied: Nice try! Tejas is root. 🔒' }
        ]);
        break;

      default:
        setHistory((prev) => [
          ...prev,
          {
            type: 'error',
            text: `Command not found: "${rawCmd}". Type "help" for a list of valid commands.`
          }
        ]);
        break;
    }
  };

  const handleKeyDown = (e) => {
    // Arrow Up / Down History Navigation
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIdx + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIdx(nextIdx);
          setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputVal('');
      }
    } else if (e.key === 'Tab') {
      // Tab Auto-Completion
      e.preventDefault();
      const current = inputVal.toLowerCase();
      if (!current) return;
      const match = ALL_SUGGESTIONS.find((s) => s.startsWith(current));
      if (match) {
        setInputVal(match);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommand(inputVal);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        {/* Terminal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`relative bg-slate-950 border border-cyan-500/30 rounded-2xl shadow-2xl overflow-hidden z-10 font-mono text-sm flex flex-col transition-all duration-300 ${
            isMaximized ? 'w-full h-full max-w-none rounded-none border-none' : 'w-full max-w-3xl my-6'
          }`}
        >
          {/* Terminal Title Bar */}
          <div className="bg-slate-900/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between shrink-0 select-none">
            <div className="flex items-center gap-2">
              <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-500/90 hover:bg-red-400 inline-block transition-colors" title="Close" />
              <button onClick={() => setIsMaximized(!isMaximized)} className="w-3 h-3 rounded-full bg-yellow-500/90 hover:bg-yellow-400 inline-block transition-colors" title="Toggle Size" />
              <button onClick={() => setHistory([])} className="w-3 h-3 rounded-full bg-green-500/90 hover:bg-green-400 inline-block transition-colors" title="Clear Screen" />
              <span className="ml-3 text-xs font-bold text-slate-300 flex items-center gap-2">
                <FaTerminal className="text-cyan-400" />
                <span className="text-cyan-400 font-bold">bash</span> — tejas@portfolio:~
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                <FaLaptopCode /> Interactive Shell
              </span>
              <button
                onClick={() => setIsMaximized(!isMaximized)}
                className="text-slate-400 hover:text-cyan-400 p-1.5 rounded hover:bg-slate-800 transition-colors"
                title={isMaximized ? 'Restore Size' : 'Maximize Window'}
              >
                {isMaximized ? <FaCompress className="w-3.5 h-3.5" /> : <FaExpand className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={onClose}
                className="text-slate-400 hover:text-white p-1.5 rounded hover:bg-slate-800 transition-colors"
                aria-label="Close Terminal"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Command Quick Launcher Bar */}
          <div className="bg-slate-900/60 px-4 py-2 border-b border-slate-800/80 flex flex-wrap items-center gap-2 text-xs shrink-0">
            <span className="text-slate-500 font-bold mr-1 uppercase text-[10px]">Shortcuts:</span>
            {[
              { cmd: 'whoami', label: 'whoami' },
              { cmd: 'skills', label: 'skills' },
              { cmd: 'projects', label: 'projects' },
              { cmd: 'open 1', label: 'open 1' },
              { cmd: 'open 2', label: 'open 2' },
              { cmd: 'ls', label: 'ls' },
              { cmd: 'cat about.txt', label: 'cat about.txt' },
              { cmd: 'sysinfo', label: 'sysinfo' },
              { cmd: 'matrix', label: 'matrix' },
              { cmd: 'help', label: 'help' }
            ].map((b) => (
              <button
                key={b.cmd}
                onClick={() => handleCommand(b.cmd)}
                className="px-2.5 py-1 rounded bg-slate-900 hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 border border-slate-800 hover:border-cyan-500/40 transition-all font-mono text-[11px]"
              >
                {b.label}
              </button>
            ))}
          </div>

          {/* Terminal Screen Body */}
          <div className={`p-4 sm:p-6 overflow-y-auto space-y-3 bg-slate-950 text-slate-200 ${
            isMaximized ? 'flex-1' : 'h-96'
          }`}>
            {history.map((item, idx) => (
              <div key={idx} className="leading-relaxed whitespace-pre-wrap font-mono text-xs sm:text-sm">
                {item.type === 'user' && (
                  <div className="flex items-center gap-2 text-cyan-400 font-bold pt-1">
                    <span>{item.text}</span>
                  </div>
                )}
                {item.type === 'system' && (
                  <span className="text-slate-400 italic block">{item.text}</span>
                )}
                {item.type === 'output' && (
                  <div className="text-slate-300 pl-3 border-l-2 border-cyan-500/40 my-1 py-0.5 bg-slate-900/40 rounded-r-lg font-mono">
                    {item.text}
                  </div>
                )}
                {item.type === 'highlight' && (
                  <div className="text-cyan-300 pl-3 border-l-2 border-emerald-400/80 my-1 py-1 bg-emerald-500/10 rounded-r-lg font-mono">
                    {item.text}
                  </div>
                )}
                {item.type === 'matrix' && (
                  <div className="text-emerald-400 font-mono text-xs leading-tight animate-pulse bg-slate-950 p-2 border border-emerald-500/30 rounded">
                    {item.text}
                  </div>
                )}
                {item.type === 'error' && (
                  <span className="text-red-400 block font-semibold">{item.text}</span>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Command Prompt Input Bar */}
          <form onSubmit={handleSubmit} className="border-t border-slate-800 bg-slate-900/90 px-4 py-3 flex items-center gap-2 shrink-0">
            <span className="text-cyan-400 font-bold text-xs sm:text-sm whitespace-nowrap">
              tejas@portfolio:~$
            </span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type command (press Tab to auto-complete, Up/Down for history)..."
              className="flex-1 bg-transparent text-slate-100 placeholder-slate-600 focus:outline-none text-xs sm:text-sm font-mono"
              autoFocus
            />
            <button
              type="submit"
              className="px-3.5 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded-lg font-semibold text-xs transition-colors flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
            >
              <FaPlay className="w-2.5 h-2.5" /> Run
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

