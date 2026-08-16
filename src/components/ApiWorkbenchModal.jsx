import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaPlay, FaCheck, FaCopy, FaTerminal, FaServer, FaCode, FaNetworkWired, FaSync } from 'react-icons/fa';
import { soundFx } from '../utils/SoundEffects';

const API_ENDPOINTS = [
  {
    id: 'get-profile',
    name: 'Get Developer Profile',
    method: 'GET',
    path: '/api/v1/developer/profile',
    description: 'Fetch core developer identity, postgraduate credentials, and current availability status.',
    params: { format: 'json', include_skills: 'true' },
    headers: { 'X-Api-Key': 'tejas_guest_demo_token', 'Accept': 'application/json' },
    response: {
      status: 200,
      statusText: 'OK',
      data: {
        developer: "Tejas Thakare",
        degree: "M.Sc. Computer Science Postgraduate",
        specialization: "Python, FastAPI REST Microservices & ERP Systems",
        availability: "Open to Software Engineer & Full-Stack Roles",
        location: "Nashik, Maharashtra, India",
        contact: {
          email: "tthakare67@gmail.com",
          phone: "+91 7058638277",
          github: "https://github.com/Tejas143220",
          linkedin: "https://www.linkedin.com/in/tejas-thakare-440799251/"
        },
        stats: {
          sgpa: 8.0,
          enterprise_systems: 4,
          rest_api_endpoints: 25,
          workflow_efficiency: "100%"
        }
      }
    }
  },
  {
    id: 'get-projects',
    name: 'Get Active Enterprise Projects',
    method: 'GET',
    path: '/api/v1/projects/active',
    description: 'Retrieve live production projects, web portals, and ERP backend modules.',
    params: { category: 'all', limit: 5 },
    headers: { 'X-Api-Key': 'tejas_guest_demo_token', 'Accept': 'application/json' },
    response: {
      status: 200,
      statusText: 'OK',
      data: [
        {
          id: "fly-ash-bricks-erp",
          title: "Fly Ash Bricks Industrial ERP System",
          stack: ["FastAPI", "Next.js", "PostgreSQL", "Odoo 16 Architecture"],
          role: "Lead Full-Stack ERP Engineer",
          highlights: ["Batch calculations", "Raw material tracking", "Real-time automated billing"]
        },
        {
          id: "discover-nashik",
          title: "Discover Nashik Tourism Portal",
          liveUrl: "https://nashik-tourism-eta.vercel.app/",
          stack: ["React.js", "Tailwind CSS", "Framer Motion"],
          role: "Frontend Architect"
        },
        {
          id: "nashik-top-misal",
          title: "Nashik's Best Misal Culinary Directory",
          liveUrl: "https://nashik-top-misal.vercel.app",
          stack: ["Next.js", "Tailwind CSS", "SEO Matrix"],
          role: "Full-Stack Developer"
        }
      ]
    }
  },
  {
    id: 'post-erp-inventory',
    name: 'Calculate ERP Production Batch',
    method: 'POST',
    path: '/api/v1/erp/inventory/calculate',
    description: 'Simulate industrial raw material ratio requirements for brick manufacturing.',
    params: {},
    headers: { 'X-Api-Key': 'tejas_guest_demo_token', 'Content-Type': 'application/json' },
    body: {
      target_brick_units: 50000,
      fly_ash_ratio_percent: 60,
      cement_ratio_percent: 10,
      gypsum_ratio_percent: 5,
      sand_ratio_percent: 25
    },
    response: {
      status: 201,
      statusText: 'Created',
      data: {
        batch_id: "ERP-BATCH-2026-9042",
        calculated_requirements_tonnes: {
          fly_ash: 75.0,
          cement: 12.5,
          gypsum: 6.25,
          sand_powder: 31.25,
          total_raw_material: 125.0
        },
        estimated_production_hours: 14.5,
        inventory_status: "RAW_MATERIALS_RESERVED",
        cost_per_unit_inr: 4.85
      }
    }
  },
  {
    id: 'get-skills-matrix',
    name: 'Get Technical Skill Matrix',
    method: 'GET',
    path: '/api/v1/skills/matrix',
    description: 'Fetch detailed skill proficiencies, backend languages, and framework experience.',
    params: { level: 'advanced' },
    headers: { 'X-Api-Key': 'tejas_guest_demo_token', 'Accept': 'application/json' },
    response: {
      status: 200,
      statusText: 'OK',
      data: {
        backend: [
          { name: "Python", proficiency: "95%" },
          { name: "FastAPI", proficiency: "92%" },
          { name: "PostgreSQL & SQL", proficiency: "88%" },
          { name: "Odoo 16 ERP", proficiency: "85%" },
          { name: "Node.js & REST APIs", proficiency: "82%" }
        ],
        frontend: [
          { name: "React.js", proficiency: "90%" },
          { name: "Next.js", proficiency: "86%" },
          { name: "Tailwind CSS", proficiency: "94%" },
          { name: "JavaScript (ES6+)", proficiency: "90%" }
        ]
      }
    }
  },
  {
    id: 'get-system-health',
    name: 'System Health & Gateway Telemetry',
    method: 'GET',
    path: '/api/v1/system/health',
    description: 'Check server gateway uptime, latency, memory load, and database connection state.',
    params: {},
    headers: { 'X-Api-Key': 'tejas_guest_demo_token', 'Accept': 'application/json' },
    response: {
      status: 200,
      statusText: 'OK',
      data: {
        status: "HEALTHY",
        uptime_seconds: 1428940,
        gateway: "FastAPI-ASGI-v0.110",
        environment: "Production",
        database_connection: "PostgreSQL 16 - Connected (3ms latency)",
        memory_usage_mb: 184.2,
        cpu_load_percent: 2.4,
        timestamp: new Date().toISOString()
      }
    }
  }
];

export default function ApiWorkbenchModal({ isOpen, onClose }) {
  const [selectedEndpoint, setSelectedEndpoint] = useState(API_ENDPOINTS[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastResponse, setLastResponse] = useState(null);
  const [responseTime, setResponseTime] = useState(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState('response'); // 'response' | 'curl' | 'python' | 'js'

  if (!isOpen) return null;

  const handleExecuteRequest = () => {
    soundFx.playBeep();
    setIsLoading(true);
    setLastResponse(null);
    const simulatedLatency = Math.floor(Math.random() * 18) + 12;

    setTimeout(() => {
      setIsLoading(false);
      setLastResponse(selectedEndpoint.response);
      setResponseTime(simulatedLatency);
    }, 400);
  };

  const generateCurlSnippet = () => {
    let cmd = `curl -X ${selectedEndpoint.method} "https://tejas-api.dev${selectedEndpoint.path}" \\\n`;
    cmd += `  -H "X-Api-Key: tejas_guest_demo_token" \\\n`;
    cmd += `  -H "Content-Type: application/json"`;
    if (selectedEndpoint.body) {
      cmd += ` \\\n  -d '${JSON.stringify(selectedEndpoint.body, null, 2)}'`;
    }
    return cmd;
  };

  const generatePythonSnippet = () => {
    let code = `import requests\n\n`;
    code += `url = "https://tejas-api.dev${selectedEndpoint.path}"\n`;
    code += `headers = {\n  "X-Api-Key": "tejas_guest_demo_token",\n  "Content-Type": "application/json"\n}\n`;
    if (selectedEndpoint.body) {
      code += `payload = ${JSON.stringify(selectedEndpoint.body, null, 2)}\n`;
      code += `response = requests.post(url, headers=headers, json=payload)\n`;
    } else {
      code += `response = requests.get(url, headers=headers)\n`;
    }
    code += `print(response.status_code)\nprint(response.json())`;
    return code;
  };

  const generateJsSnippet = () => {
    let code = `const fetchTejasApi = async () => {\n`;
    code += `  const response = await fetch('https://tejas-api.dev${selectedEndpoint.path}', {\n`;
    code += `    method: '${selectedEndpoint.method}',\n`;
    code += `    headers: {\n      'X-Api-Key': 'tejas_guest_demo_token',\n      'Content-Type': 'application/json'\n    }`;
    if (selectedEndpoint.body) {
      code += `,\n    body: JSON.stringify(${JSON.stringify(selectedEndpoint.body, null, 2)})`;
    }
    code += `\n  });\n  const data = await response.json();\n  console.log(data);\n};\n\nfetchTejasApi();`;
    return code;
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-md"
        />

        {/* Main Modal Card */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="relative w-full max-w-5xl bg-slate-900 border border-slate-700/80 rounded-2xl sm:rounded-3xl shadow-2xl shadow-slate-950/80 overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Header Bar */}
          <div className="px-5 py-4 bg-slate-950/95 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400">
                <FaNetworkWired className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white font-heading flex items-center gap-2">
                  <span>FastAPI REST API Studio Workbench</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-sky-300 font-mono">v1.4.0</span>
                </h3>
                <p className="text-xs text-slate-400">Interactive Developer API Testing Sandbox for Tejas's Backend Services</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/60 hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <FaTimes className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Grid Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-800 flex-1 overflow-y-auto">
            
            {/* Sidebar Endpoint List */}
            <div className="lg:col-span-4 p-4 bg-slate-950/60 space-y-2 overflow-y-auto">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-3 font-mono">
                Available REST Endpoints ({API_ENDPOINTS.length})
              </span>

              {API_ENDPOINTS.map((ep) => {
                const isSelected = selectedEndpoint.id === ep.id;
                return (
                  <button
                    key={ep.id}
                    onClick={() => {
                      setSelectedEndpoint(ep);
                      setLastResponse(null);
                      soundFx.playClick();
                    }}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex flex-col gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-sky-500/10 border-sky-500/50 shadow-md shadow-sky-500/5'
                        : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded font-mono ${
                          ep.method === 'GET'
                            ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                            : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        }`}
                      >
                        {ep.method}
                      </span>
                      <span className="text-xs font-bold text-slate-200 truncate">{ep.name}</span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-400 truncate">{ep.path}</span>
                  </button>
                );
              })}
            </div>

            {/* Main Workbench Pane */}
            <div className="lg:col-span-8 p-5 flex flex-col justify-between space-y-4">
              
              {/* Endpoint Header Details */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-mono overflow-x-auto max-w-full">
                    <span
                      className={`text-xs font-extrabold px-2.5 py-1 rounded ${
                        selectedEndpoint.method === 'GET'
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                          : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      }`}
                    >
                      {selectedEndpoint.method}
                    </span>
                    <span className="text-slate-200 font-bold">https://tejas-api.dev</span>
                    <span className="text-cyan-400 font-bold">{selectedEndpoint.path}</span>
                  </div>

                  <button
                    onClick={handleExecuteRequest}
                    disabled={isLoading}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-950 bg-gradient-to-r from-cyan-400 to-sky-400 hover:from-cyan-300 hover:to-sky-300 transition-all shadow-md shadow-cyan-500/20 disabled:opacity-50 cursor-pointer shrink-0"
                  >
                    {isLoading ? (
                      <>
                        <FaSync className="animate-spin w-3.5 h-3.5" />
                        <span>Sending Request...</span>
                      </>
                    ) : (
                      <>
                        <FaPlay className="w-3 h-3" />
                        <span>Send Request</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedEndpoint.description}
                </p>

                {/* Request Payload Details (if POST) */}
                {selectedEndpoint.body && (
                  <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 font-mono text-xs">
                    <span className="text-[10px] text-slate-500 uppercase block mb-1">JSON Request Body Payload:</span>
                    <pre className="text-emerald-400 overflow-x-auto">
                      {JSON.stringify(selectedEndpoint.body, null, 2)}
                    </pre>
                  </div>
                )}
              </div>

              {/* Response & Snippet View Tabs */}
              <div className="flex flex-col flex-1 border border-slate-800 rounded-xl bg-slate-950/80 overflow-hidden min-h-[260px]">
                {/* Tabs Bar */}
                <div className="flex items-center justify-between bg-slate-900 px-3 py-2 border-b border-slate-800 text-xs">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setActiveTab('response')}
                      className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 ${
                        activeTab === 'response' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <FaServer className="w-3 h-3" />
                      <span>Response Payload</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('python')}
                      className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 ${
                        activeTab === 'python' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <FaCode className="w-3 h-3" />
                      <span>Python</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('curl')}
                      className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 ${
                        activeTab === 'curl' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <FaTerminal className="w-3 h-3" />
                      <span>cURL</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('js')}
                      className={`px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 ${
                        activeTab === 'js' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <FaCode className="w-3 h-3" />
                      <span>JavaScript</span>
                    </button>
                  </div>

                  {/* Status & Latency Badges */}
                  {lastResponse && activeTab === 'response' && (
                    <div className="flex items-center gap-2 font-mono text-[11px]">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                        {lastResponse.status} {lastResponse.statusText}
                      </span>
                      <span className="text-cyan-400">
                        ⚡ {responseTime} ms
                      </span>
                    </div>
                  )}
                </div>

                {/* Tab Contents */}
                <div className="p-4 flex-1 overflow-y-auto font-mono text-xs text-slate-200 relative">
                  {activeTab === 'response' && (
                    <>
                      {!lastResponse && !isLoading && (
                        <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-2 py-10">
                          <FaNetworkWired className="w-8 h-8 opacity-40 text-cyan-400" />
                          <span>Click "Send Request" to trigger this API endpoint execution.</span>
                        </div>
                      )}

                      {isLoading && (
                        <div className="h-full flex flex-col items-center justify-center text-cyan-400 gap-3 py-10">
                          <FaSync className="w-7 h-7 animate-spin" />
                          <span className="text-xs font-semibold">Executing FastAPI endpoint logic...</span>
                        </div>
                      )}

                      {lastResponse && !isLoading && (
                        <div className="relative group">
                          <button
                            onClick={() => handleCopy(JSON.stringify(lastResponse.data, null, 2))}
                            className="absolute top-0 right-0 p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-[11px]"
                          >
                            {copiedCode ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                            <span>{copiedCode ? 'Copied' : 'Copy JSON'}</span>
                          </button>
                          <pre className="text-cyan-300 leading-relaxed overflow-x-auto pt-1">
                            {JSON.stringify(lastResponse.data, null, 2)}
                          </pre>
                        </div>
                      )}
                    </>
                  )}

                  {activeTab === 'python' && (
                    <div className="relative">
                      <button
                        onClick={() => handleCopy(generatePythonSnippet())}
                        className="absolute top-0 right-0 p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-[11px]"
                      >
                        {copiedCode ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                        <span>{copiedCode ? 'Copied' : 'Copy Python Code'}</span>
                      </button>
                      <pre className="text-emerald-300 leading-relaxed overflow-x-auto pt-1">
                        {generatePythonSnippet()}
                      </pre>
                    </div>
                  )}

                  {activeTab === 'curl' && (
                    <div className="relative">
                      <button
                        onClick={() => handleCopy(generateCurlSnippet())}
                        className="absolute top-0 right-0 p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-[11px]"
                      >
                        {copiedCode ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                        <span>{copiedCode ? 'Copied' : 'Copy cURL'}</span>
                      </button>
                      <pre className="text-amber-300 leading-relaxed overflow-x-auto pt-1">
                        {generateCurlSnippet()}
                      </pre>
                    </div>
                  )}

                  {activeTab === 'js' && (
                    <div className="relative">
                      <button
                        onClick={() => handleCopy(generateJsSnippet())}
                        className="absolute top-0 right-0 p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-[11px]"
                      >
                        {copiedCode ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
                        <span>{copiedCode ? 'Copied' : 'Copy JS Code'}</span>
                      </button>
                      <pre className="text-sky-300 leading-relaxed overflow-x-auto pt-1">
                        {generateJsSnippet()}
                      </pre>
                    </div>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* Modal Footer Note */}
          <div className="px-5 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              FastAPI Endpoint Telemetry Mock Engine Ready
            </span>
            <span className="font-mono text-[11px] text-slate-400">Powered by Python & FastAPI Architecture</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
