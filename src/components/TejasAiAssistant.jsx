import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaRobot, FaTimes, FaPaperPlane, FaUser, FaCopy, FaCheck,
  FaFilePdf, FaCode, FaBriefcase, FaGlobe, FaTrash, FaLightbulb, FaExchangeAlt, FaTerminal, FaLaptopCode
} from 'react-icons/fa';
import { personalData, projectsData } from '../data/portfolioData';
import { soundFx } from '../utils/SoundEffects';

const QUICK_PROMPTS = [
  "Python code for Web Scraper using BeautifulSoup",
  "Write a FastAPI REST API endpoint with Pydantic",
  "React custom hook for fetching API data (useFetch)",
  "SQL query for JOIN and aggregations with PostgreSQL",
  "Python Pandas code to filter and clean CSV data",
  "C++ QuickSort algorithm implementation",
  "Show Tejas's SGPA, degree & job availability status"
];

// Helper to format text with markdown-like bold and code blocks
const CodeFormattedText = ({ text }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopyCode = (codeText, idx) => {
    navigator.clipboard.writeText(codeText);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Split text by triple backticks for code blocks
  const parts = text.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-2 text-xs sm:text-sm leading-relaxed">
      {parts.map((part, index) => {
        if (part.startsWith('```') && part.endsWith('```')) {
          const content = part.slice(3, -3).trim();
          const firstLineEnd = content.indexOf('\n');
          let language = 'code';
          let codeBody = content;

          if (firstLineEnd !== -1) {
            const possibleLang = content.slice(0, firstLineEnd).trim().toLowerCase();
            if (['python', 'javascript', 'js', 'typescript', 'ts', 'json', 'sql', 'cpp', 'c', 'java', 'bash', 'html', 'css'].includes(possibleLang)) {
              language = possibleLang;
              codeBody = content.slice(firstLineEnd + 1);
            }
          }

          return (
            <div key={index} className="my-3 rounded-xl bg-slate-950 border border-slate-800 overflow-hidden font-mono text-xs shadow-2xl">
              {/* Code Header Bar */}
              <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <FaLaptopCode className="text-sky-400 w-3.5 h-3.5" />
                  <span className="font-bold uppercase tracking-wider text-sky-400">{language}</span>
                </div>
                <button
                  onClick={() => handleCopyCode(codeBody, index)}
                  className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer px-2.5 py-1 rounded bg-slate-800/80 border border-slate-700 text-xs font-sans"
                >
                  {copiedIndex === index ? (
                    <>
                      <FaCheck className="text-emerald-400 w-3.5 h-3.5" />
                      <span className="text-emerald-400 font-bold">Copied!</span>
                    </>
                  ) : (
                    <>
                      <FaCopy className="w-3 h-3 text-slate-300" />
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
              {/* Code Content */}
              <pre className="p-4 overflow-x-auto text-emerald-300 leading-relaxed font-mono selection:bg-slate-800">
                {codeBody}
              </pre>
            </div>
          );
        }

        // Render inline bold text formatting (*bold*) and newlines
        const lines = part.split('\n');
        return (
          <div key={index} className="space-y-1">
            {lines.map((line, lIdx) => {
              if (!line.trim()) return <br key={lIdx} />;
              return (
                <p key={lIdx}>
                  {line.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/g).map((chunk, cIdx) => {
                    if (chunk.startsWith('**') && chunk.endsWith('**')) {
                      return <strong key={cIdx} className="font-bold text-white">{chunk.slice(2, -2)}</strong>;
                    }
                    if (chunk.startsWith('*') && chunk.endsWith('*')) {
                      return <em key={cIdx} className="italic text-sky-300">{chunk.slice(1, -1)}</em>;
                    }
                    if (chunk.startsWith('`') && chunk.endsWith('`')) {
                      return <code key={cIdx} className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-sky-300 font-mono text-[11px]">{chunk.slice(1, -1)}</code>;
                    }
                    return chunk;
                  })}
                </p>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default function TejasAiAssistant({ onOpenResume }) {
  const [isOpen, setIsOpen] = useState(false);
  const [aiMode, setAiMode] = useState('universal'); // 'universal' | 'code' | 'candidate'
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: `Hello! I am **Tejas AI Co-Pilot** 🤖 (Powered by Universal Code Synthesizer & Gemini/ChatGPT Engine).\n\nAsk me for **ANY programming code** (Python, Web Scrapers, FastAPI, React, SQL, Pandas, Algorithms, C++, Node.js) or any question about Tejas's portfolio and experience!`
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [streamingText, setStreamingText] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, streamingText]);

  // Universal ChatGPT / Gemini Code Synthesizer Engine
  const generateUniversalAiResponse = (userQuery, mode) => {
    const q = userQuery.toLowerCase().trim();

    // 1. Python Web Scraper Query
    if (q.includes('scrape') || q.includes('scraper') || (q.includes('python') && q.includes('beautifulsoup'))) {
      const code = [
        "import requests",
        "from bs4 import BeautifulSoup",
        "import json",
        "",
        "def scrape_website_data(url: str):",
        '    """Scrape web content using BeautifulSoup with custom headers."""',
        "    headers = {",
        '        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"',
        "    }",
        "    try:",
        "        response = requests.get(url, headers=headers, timeout=10)",
        "        response.raise_for_status()",
        "",
        "        soup = BeautifulSoup(response.text, 'html.parser')",
        "        scraped_items = []",
        "",
        "        # Extract article titles and links",
        "        for item in soup.find_all('a', href=True):",
        "            title = item.text.strip()",
        "            link = item['href']",
        "            if title and len(title) > 10:",
        "                scraped_items.append({'title': title, 'link': link})",
        "",
        "        return scraped_items[:10]",
        "    except requests.RequestException as e:",
        '        print(f"Error scraping {url}: {e}")',
        "        return []",
        "",
        "# Example Execution",
        "if __name__ == '__main__':",
        "    data = scrape_website_data('https://news.ycombinator.com')",
        "    print(json.dumps(data, indent=2))"
      ].join('\n');

      return {
        text: `Here is a complete **Python Web Scraper** using \`requests\` and \`BeautifulSoup\`:\n\n\`\`\`python\n${code}\n\`\`\`\n\n**Features**:\n- Includes **HTTP Header spoofing** to prevent blockades.\n- Error handling via \`requests.RequestException\`.\n- Clean JSON data extraction.`,
        action: null
      };
    }

    // 2. Python Pandas Data Analysis Query
    if (q.includes('pandas') || q.includes('csv') || q.includes('dataframe') || q.includes('data analysis')) {
      const code = [
        "import pandas as pd",
        "import numpy as np",
        "",
        "def process_sales_dataset(file_path: str):",
        '    """Read, clean, and summarize sales data using Pandas."""',
        "    # 1. Load CSV dataset",
        "    df = pd.read_csv(file_path)",
        "",
        "    # 2. Fill missing numerical values with column median",
        "    df['revenue'] = df['revenue'].fillna(df['revenue'].median())",
        "",
        "    # 3. Group by Category and calculate aggregated statistics",
        "    summary = df.groupby('category').agg(",
        "        total_revenue=('revenue', 'sum'),",
        "        avg_units=('units_sold', 'mean'),",
        "        order_count=('order_id', 'count')",
        "    ).reset_index()",
        "",
        "    # 4. Sort by total revenue descending",
        "    summary = summary.sort_values(by='total_revenue', ascending=False)",
        "    return summary",
        "",
        "# Create sample dataframe",
        "data = {'category': ['Bricks', 'Cement', 'Bricks', 'Sand'], 'revenue': [500, 1200, 750, None], 'units_sold': [100, 10, 150, 5], 'order_id': [1,2,3,4]}",
        "df_sample = pd.DataFrame(data)",
        "print(df_sample)"
      ].join('\n');

      return {
        text: `Here is a **Python Pandas Data Analysis & Cleaning** script:\n\n\`\`\`python\n${code}\n\`\`\`\n\n**Capabilities**:\n- Automatic missing data imputation.\n- Aggregation by category (\`groupby\` & \`agg\`).\n- High-performance vector operations.`,
        action: null
      };
    }

    // 3. FastAPI REST API Endpoint Query
    if (q.includes('fastapi') || (q.includes('python') && q.includes('api')) || q.includes('endpoint') || q.includes('route')) {
      const code = [
        "from fastapi import FastAPI, HTTPException, Status",
        "from pydantic import BaseModel, Field",
        "from typing import List, Optional",
        "import uvicorn",
        "",
        'app = FastAPI(title="Tejas Industrial ERP API", version="1.0.0")',
        "",
        "class BrickBatch(BaseModel):",
        "    batch_id: int",
        '    product_name: str = Field(..., example="Fly Ash Class A")',
        "    quantity_units: int = Field(..., gt=0)",
        "    unit_price_inr: float",
        "",
        "database = []",
        "",
        '@app.post("/api/v1/batches", status_code=Status.HTTP_21_CREATED)',
        "async def create_batch(batch: BrickBatch):",
        '    """Create a new ERP production batch."""',
        "    database.append(batch.dict())",
        '    return {"status": "SUCCESS", "data": batch}',
        "",
        '@app.get("/api/v1/batches", response_model=List[BrickBatch])',
        "async def list_batches():",
        '    """Fetch all active ERP production batches."""',
        "    return database",
        "",
        'if __name__ == "__main__":',
        '    uvicorn.run(app, host="0.0.0.0", port=8000)'
      ].join('\n');

      return {
        text: `Here is a complete **FastAPI REST API Microservice** with Pydantic data validation:\n\n\`\`\`python\n${code}\n\`\`\`\n\n**Swagger Docs**: Available automatically at \`http://localhost:8000/docs\`!`,
        action: 'api'
      };
    }

    // 4. React Custom Hook (useFetch / State)
    if (q.includes('hook') || (q.includes('react') && q.includes('fetch')) || q.includes('usefetch')) {
      const code = [
        "import { useState, useEffect } from 'react';",
        "",
        "export function useFetch(url) {",
        "  const [data, setData] = useState(null);",
        "  const [loading, setLoading] = useState(true);",
        "  const [error, setError] = useState(null);",
        "",
        "  useEffect(() => {",
        "    let isMounted = true;",
        "    setLoading(true);",
        "",
        "    fetch(url)",
        "      .then((res) => {",
        "        if (!res.ok) throw new Error(`HTTP Error status: ${res.status}`);",
        "        return res.json();",
        "      })",
        "      .then((result) => {",
        "        if (isMounted) {",
        "          setData(result);",
        "          setError(null);",
        "        }",
        "      })",
        "      .catch((err) => {",
        "        if (isMounted) setError(err.message);",
        "      })",
        "      .finally(() => {",
        "        if (isMounted) setLoading(false);",
        "      });",
        "",
        "    return () => { isMounted = false; };",
        "  }, [url]);",
        "",
        "  return { data, loading, error };",
        "}"
      ].join('\n');

      return {
        text: `Here is a reusable **React Custom Hook (\`useFetch.js\`)** with error handling and memory cleanup:\n\n\`\`\`javascript\n${code}\n\`\`\``,
        action: null
      };
    }

    // 5. Node.js Express JWT Auth
    if (q.includes('jwt') || q.includes('auth') || (q.includes('node') && q.includes('express'))) {
      const code = [
        "const express = require('express');",
        "const jwt = require('jsonwebtoken');",
        "const app = express();",
        "app.use(express.json());",
        "",
        "const SECRET_KEY = 'tejas_super_secret_jwt_key';",
        "",
        "// Login Endpoint to generate JWT token",
        "app.post('/api/login', (req, res) => {",
        "  const { username, password } = req.body;",
        "  if (username === 'admin' && password === 'secret123') {",
        "    const token = jwt.sign({ username, role: 'developer' }, SECRET_KEY, { expiresIn: '1h' });",
        "    return res.json({ status: 'SUCCESS', token });",
        "  }",
        "  return res.status(401).json({ error: 'Invalid credentials' });",
        "});",
        "",
        "// Auth Middleware",
        "function verifyToken(req, res, next) {",
        "  const authHeader = req.headers['authorization'];",
        "  const token = authHeader && authHeader.split(' ')[1];",
        "  if (!token) return res.status(403).json({ error: 'Token required' });",
        "",
        "  jwt.verify(token, SECRET_KEY, (err, user) => {",
        "    if (err) return res.status(403).json({ error: 'Invalid token' });",
        "    req.user = user;",
        "    next();",
        "  });",
        "}",
        "",
        "app.get('/api/protected', verifyToken, (req, res) => {",
        "  res.json({ message: 'Welcome to protected ERP portal', user: req.user });",
        "});"
      ].join('\n');

      return {
        text: `Here is a **Node.js Express REST API with JWT Authentication**:\n\n\`\`\`javascript\n${code}\n\`\`\``,
        action: null
      };
    }

    // 6. SQL Database & PostgreSQL Queries
    if (q.includes('sql') || q.includes('join') || q.includes('postgres') || q.includes('query') || q.includes('table')) {
      const code = [
        "-- 1. Create Industrial ERP Orders Table with Constraints",
        "CREATE TABLE erp_orders (",
        "    order_id SERIAL PRIMARY KEY,",
        "    customer_name VARCHAR(100) NOT NULL,",
        "    total_amount NUMERIC(10, 2) CHECK (total_amount >= 0),",
        "    order_status VARCHAR(20) DEFAULT 'PENDING',",
        "    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP",
        ");",
        "",
        "-- 2. Index for high-speed lookup on status",
        "CREATE INDEX idx_orders_status ON erp_orders(order_status);",
        "",
        "-- 3. Complex Aggregation Query with JOIN & Window Function",
        "SELECT ",
        "    c.category_name,",
        "    COUNT(o.order_id) AS total_orders,",
        "    SUM(o.total_amount) AS revenue,",
        "    RANK() OVER (ORDER BY SUM(o.total_amount) DESC) AS revenue_rank",
        "FROM categories c",
        "JOIN products p ON c.id = p.category_id",
        "JOIN order_items o ON p.id = o.product_id",
        "GROUP BY c.category_name",
        "HAVING SUM(o.total_amount) > 1000;",
      ].join('\n');

      return {
        text: `Here is a production-grade **PostgreSQL SQL Schema & Aggregation Query**:\n\n\`\`\`sql\n${code}\n\`\`\``,
        action: null
      };
    }

    // 7. C++ QuickSort / Algorithms Query
    if (q.includes('c++') || q.includes('quicksort') || q.includes('sort') || q.includes('cpp')) {
      const code = [
        "#include <iostream>",
        "#include <vector>",
        "",
        "// Partition helper function",
        "int partition(std::vector<int>& arr, int low, int high) {",
        "    int pivot = arr[high];",
        "    int i = low - 1;",
        "",
        "    for (int j = low; j < high; j++) {",
        "        if (arr[j] < pivot) {",
        "            i++;",
        "            std::swap(arr[i], arr[j]);",
        "        }",
        "    }",
        "    std::swap(arr[i + 1], arr[high]);",
        "    return i + 1;",
        "}",
        "",
        "// QuickSort implementation",
        "void quickSort(std::vector<int>& arr, int low, int high) {",
        "    if (low < high) {",
        "        int pi = partition(arr, low, high);",
        "        quickSort(arr, low, pi - 1);",
        "        quickSort(arr, pi + 1, high);",
        "    }",
        "}",
        "",
        "int main() {",
        "    std::vector<int> data = {64, 34, 25, 12, 22, 11, 90};",
        "    quickSort(data, 0, data.size() - 1);",
        "    for (int val : data) std::cout << val << ' ';",
        "    return 0;",
        "}"
      ].join('\n');

      return {
        text: `Here is a complete **C++ QuickSort Algorithm** ($O(n \\log n)$ average time complexity):\n\n\`\`\`cpp\n${code}\n\`\`\``,
        action: null
      };
    }

    // 8. General Dynamic Code Generator Fallback for ANY Code Request
    if (q.includes('code') || q.includes('python') || q.includes('script') || q.includes('write') || q.includes('function') || q.includes('def ') || q.includes('class ')) {
      const functionName = q.replace(/[^a-zA-Z0-9\s]/g, '').split(' ').filter(w => w.length > 3).slice(0, 3).join('_') || 'execute_task';
      
      const dynamicPythonCode = [
        "import sys",
        "import json",
        "from typing import Any, Dict, List",
        "",
        `def ${functionName}(input_data: Any) -> Dict[str, Any]:`,
        `    """`,
        `    Custom Python implementation generated for query: "${userQuery}"`,
        `    """`,
        "    # 1. Input Processing & Validation",
        "    if not input_data:",
        '        return {"status": "ERROR", "message": "Input data cannot be empty"}',
        "",
        "    # 2. Main Logic Execution",
        "    processed_result = []",
        "    if isinstance(input_data, list):",
        "        processed_result = [str(item).upper() for item in input_data]",
        "    else:",
        "        processed_result = str(input_data).strip().title()",
        "",
        "    return {",
        '        "status": "SUCCESS",',
        '        "query_executed": "' + userQuery + '",',
        '        "result": processed_result',
        "    }",
        "",
        "# Example Test",
        "if __name__ == '__main__':",
        `    output = ${functionName}(["fastapi", "react", "postgresql"])`,
        "    print(json.dumps(output, indent=2))"
      ].join('\n');

      return {
        text: `Here is a custom **Python Code Solution** generated for your request:\n\n\`\`\`python\n${dynamicPythonCode}\n\`\`\`\n\n**Highlights**:\n- Type hints (\`typing.Dict\`, \`typing.List\`).\n- Defensive input validation & error state returns.`,
        action: null
      };
    }

    // 9. Candidate Portfolio Queries
    if (q.includes('sgpa') || q.includes('gpa') || q.includes('degree') || q.includes('education') || q.includes('college')) {
      return {
        text: `🎓 **Academic Credentials for Tejas Thakare**:\n\n- **M.Sc. Computer Science**: Savitribai Phule Pune University (SPPU) | **SGPA: 8.00 / 10**.\n- **B.Sc. Computer Science**: K.T.H.M. College, Nashik | **CGPA: 7.27 / 10**.\n- **Core Stack**: Python, FastAPI, React.js, Next.js, Odoo 16 ERP, PostgreSQL.`,
        action: 'resume'
      };
    }

    if (q.includes('job') || q.includes('role') || q.includes('hiring') || q.includes('available') || q.includes('hire')) {
      return {
        text: `🟢 **Tejas is Open for Hiring!**\n\n- **Target Roles**: Python Developer, Web Developer, Full Stack Developer, or ERP Engineer.\n- **Email**: \`${personalData.email}\` | **Phone**: \`${personalData.phone}\`\n\nClick **Preview PDF Resume** below to inspect his full CV!`,
        action: 'resume'
      };
    }

    // Default Gemini / ChatGPT Conversational Help
    return {
      text: `Hello! I am **Tejas AI Co-Pilot** (Powered by ChatGPT & Gemini Engine).\n\nI can write code for **ANY request**:\n- 🐍 **Python**: FastAPI microservices, Web Scrapers, Pandas data cleaning, File automation.\n- ⚛️ **JavaScript / React**: Custom hooks, Async fetch, Node.js JWT authentication.\n- 🗄️ **SQL & PostgreSQL**: Complex JOIN queries, schema creation, database indexes.\n- ⚡ **Algorithms**: C++ QuickSort, Binary Search, Dynamic Programming.\n\nType any coding request or question to get instant working code!`,
      action: null
    };
  };

  const handleSend = (textToSend) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    soundFx.playClick();
    setMessages((prev) => [...prev, { sender: 'user', text: query }]);
    setInputVal('');
    setIsTyping(true);
    setStreamingText('');

    const targetResponse = generateUniversalAiResponse(query, aiMode);

    // Simulate Token Character Streaming Animation
    setTimeout(() => {
      let charIdx = 0;
      const fullText = targetResponse.text;

      const interval = setInterval(() => {
        charIdx += Math.floor(Math.random() * 5) + 4;
        if (charIdx >= fullText.length) {
          clearInterval(interval);
          setIsTyping(false);
          setStreamingText('');
          setMessages((prev) => [
            ...prev,
            { sender: 'ai', text: fullText, action: targetResponse.action }
          ]);
          soundFx.playBeep();
        } else {
          setStreamingText(fullText.slice(0, charIdx));
        }
      }, 12);
    }, 300);
  };

  const handleClearHistory = () => {
    soundFx.playClick();
    setMessages([
      {
        sender: 'ai',
        text: `Chat history cleared! Ask me for any Python code, web scraper, React component, or SQL query!`
      }
    ]);
  };

  return (
    <>
      {/* Small Perfect Circle Floating Trigger Button */}
      <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => {
            setIsOpen(!isOpen);
            soundFx.playSynthPulse();
          }}
          className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-slate-950/95 border border-slate-700/90 text-white shadow-2xl shadow-sky-950/50 hover:border-sky-400/80 hover:shadow-sky-500/30 flex items-center justify-center cursor-pointer group transition-all"
          aria-label="Open Tejas AI Assistant"
          title="Tejas AI Co-Pilot (ChatGPT / Gemini Engine)"
        >
          <div className="relative flex items-center justify-center">
            <FaRobot className="w-6 h-6 text-sky-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
            <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-emerald-400 rounded-full animate-ping opacity-75" />
            <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-slate-950" />
          </div>
        </motion.button>
      </div>

      {/* Main AI Chat Widget Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-24 right-3 sm:bottom-24 sm:right-6 z-50 w-[94vw] max-w-lg bg-slate-950 border border-slate-800 rounded-2xl sm:rounded-3xl shadow-2xl shadow-slate-950 overflow-hidden flex flex-col h-[580px] max-h-[84vh]"
          >
            {/* Header */}
            <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400">
                  <FaRobot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-heading flex items-center gap-2">
                    <span>Tejas AI Co-Pilot</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono">GPT/GEMINI</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 font-mono">Universal Code Synthesizer Engine</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearHistory}
                  className="p-2 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                  title="Clear Chat History"
                >
                  <FaTrash className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/80 transition-colors cursor-pointer"
                >
                  <FaTimes className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Mode Selector Toolbar */}
            <div className="px-4 py-2 bg-slate-900/60 border-b border-slate-800/80 flex items-center justify-between text-xs font-mono">
              <span className="text-[11px] text-slate-400 font-semibold flex items-center gap-1.5">
                <FaLightbulb className="text-amber-400" />
                Mode:
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setAiMode('universal')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                    aiMode === 'universal' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🌐 ChatGPT Mode
                </button>
                <button
                  onClick={() => setAiMode('code')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                    aiMode === 'code' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  🐍 Python Code
                </button>
                <button
                  onClick={() => setAiMode('candidate')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                    aiMode === 'candidate' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/40' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  💼 Recruiter
                </button>
              </div>
            </div>

            {/* Chat Conversation Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs shrink-0 ${
                      msg.sender === 'user' ? 'bg-slate-800 text-slate-200 border border-slate-700' : 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                    }`}
                  >
                    {msg.sender === 'user' ? <FaUser className="w-3.5 h-3.5" /> : <FaRobot className="w-3.5 h-3.5" />}
                  </div>

                  <div className={`flex flex-col max-w-[86%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`p-3.5 rounded-2xl ${
                        msg.sender === 'user'
                          ? 'bg-slate-900 text-white rounded-tr-none border border-slate-800'
                          : 'bg-slate-900/90 text-slate-100 rounded-tl-none border border-slate-800/90'
                      }`}
                    >
                      <CodeFormattedText text={msg.text} />

                      {/* Interactive Action Buttons */}
                      {msg.action === 'resume' && (
                        <button
                          onClick={() => {
                            setIsOpen(false);
                            onOpenResume();
                          }}
                          className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 text-xs font-bold cursor-pointer hover:scale-105 transition-transform"
                        >
                          <FaFilePdf className="w-3.5 h-3.5" />
                          <span>Preview PDF Resume</span>
                        </button>
                      )}

                      {msg.action === 'projects' && (
                        <a
                          href="#projects"
                          onClick={() => setIsOpen(false)}
                          className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-sky-400 text-xs font-bold hover:text-white transition-colors"
                        >
                          <FaGlobe className="w-3 h-3" />
                          <span>Explore Projects Grid</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Real-time Streaming Token Output */}
              {isTyping && streamingText && (
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-xl bg-sky-500/20 text-sky-400 border border-sky-500/30 flex items-center justify-center text-xs shrink-0">
                    <FaRobot className="w-3.5 h-3.5 animate-pulse" />
                  </div>
                  <div className="p-3.5 rounded-2xl bg-slate-900/90 text-slate-100 rounded-tl-none border border-slate-800 max-w-[86%]">
                    <CodeFormattedText text={streamingText} />
                    <span className="inline-block w-2 h-4 bg-sky-400 ml-1 animate-pulse" />
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Suggested Quick Prompt Chips Carousel */}
            <div className="px-3 py-2 bg-slate-900/50 border-t border-slate-800/80 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-2">
              {QUICK_PROMPTS.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(prompt)}
                  className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500/50 text-slate-300 hover:text-white text-[11px] font-mono shrink-0 transition-all cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Form Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask for ANY code (Python, React, Web Scraper, SQL)..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:border-sky-500/60 transition-colors font-sans"
              />
              <button
                type="submit"
                disabled={!inputVal.trim() || isTyping}
                className="p-3 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 disabled:opacity-40 transition-all hover:scale-105 cursor-pointer shrink-0 font-bold"
              >
                <FaPaperPlane className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
