import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Zap, 
  Check, 
  Trash2, 
  Copy, 
  Code, 
  FileJson, 
  Clock, 
  Save,
  AlertCircle,
  Sun,
  Moon
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('Formatted JSON will appear here...');
  const [status, setStatus] = useState({ type: 'idle', message: 'Ready' });
  const [stats, setStats] = useState({ chars: 0, lines: 0, size: '0 bytes' });
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-mode' : '';
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    const chars = input.length;
    const lines = input ? input.split('\n').length : 0;
    const bytes = new Blob([input]).size;
    setStats({
      chars: chars.toLocaleString(),
      lines: lines.toLocaleString(),
      size: `${bytes.toLocaleString()} bytes`
    });
  }, [input]);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/snippets`);
      setHistory(response.data);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const formatJSON = () => {
    if (!input.trim()) {
      showError('Please enter JSON data');
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      setStatus({ type: 'valid', message: '✓ Valid JSON' });
    } catch (error) {
      showError(`Invalid JSON: ${error.message}`);
      setStatus({ type: 'invalid', message: '✗ Invalid' });
    }
  };

  const validateJSON = () => {
    if (!input.trim()) {
      showError('Please enter JSON data');
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const message = `✓ Valid JSON!\n\nType: ${Array.isArray(parsed) ? 'Array' : typeof parsed}\nKeys: ${Object.keys(parsed).length || 'N/A'}`;
      setOutput(message);
      setStatus({ type: 'valid', message: '✓ Valid JSON' });
    } catch (error) {
      showError(`❌ Invalid JSON\n\nError: ${error.message}`);
      setStatus({ type: 'invalid', message: '✗ Invalid' });
    }
  };

  const minifyJSON = () => {
    if (!input.trim()) {
      showError('Please enter JSON data');
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setStatus({ type: 'valid', message: '✓ Minified' });
    } catch (error) {
      showError(`Invalid JSON: ${error.message}`);
      setStatus({ type: 'invalid', message: '✗ Invalid' });
    }
  };

  const saveSnippet = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    try {
      const name = prompt('Enter a name for this snippet:', `Snippet ${new Date().toLocaleTimeString()}`) || 'Untitled Snippet';
      await axios.post(`${API_BASE_URL}/snippets`, {
        name,
        content: input,
        stats
      });
      fetchHistory();
      alert('Snippet saved successfully!');
    } catch (error) {
      alert('Failed to save snippet. Is the server running?');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!output || output.startsWith('Formatted') || output.startsWith('Please')) {
      alert('Nothing to copy!');
      return;
    }
    navigator.clipboard.writeText(output).then(() => {
      const oldStatus = status;
      setStatus({ type: 'valid', message: '✓ Copied!' });
      setTimeout(() => setStatus(oldStatus), 2000);
    });
  };

  const clearAll = () => {
    setInput('');
    setOutput('Formatted JSON will appear here...');
    setStatus({ type: 'idle', message: 'Ready' });
  };

  const showError = (message) => {
    setOutput(`ERROR: ${message}`);
  };

  const loadFromHistory = (snippet) => {
    setInput(snippet.content);
    // Automatically format it
    try {
      const parsed = JSON.parse(snippet.content);
      setOutput(JSON.stringify(parsed, null, 2));
      setStatus({ type: 'valid', message: '✓ Loaded from history' });
    } catch (e) {
      setOutput(snippet.content);
    }
  };

  const deleteSnippet = async (id, e) => {
    e.stopPropagation();
    if (!confirm('Are you sure?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/snippets/${id}`);
      fetchHistory();
    } catch (error) {
      console.error('Error deleting snippet:', error);
    }
  };

  return (
    <div className="app-layout">
      <div className="container">
        <header>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h1><Zap size={32} style={{ verticalAlign: 'middle', marginRight: '10px' }} /> JSON Formatter & Validator</h1>
              <p className="subtitle">MERN Edition - Format, validate, and save snippets</p>
            </div>
            <button className="theme-toggle" onClick={toggleTheme} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </header>

        <div className="main-content">
          <div className="panel">
            <div className="panel-header">
              <span><Code size={16} /> Input JSON</span>
            </div>
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Paste your JSON here... Example: {"name": "John", "age": 30}'
            />
          </div>

          <div className="panel">
            <div className="panel-header">
              <span><FileJson size={16} /> Output</span>
              <span className={`status ${status.type}`}>{status.message}</span>
            </div>
            <div className="output">
              {output.startsWith('ERROR:') ? (
                <div className="error-message">
                  <AlertCircle size={16} style={{ marginBottom: '8px' }} />
                  <br />
                  {output.replace('ERROR: ', '')}
                </div>
              ) : output}
            </div>
          </div>
        </div>

        <div className="controls">
          <button className="btn-primary" onClick={formatJSON}><Code size={18} /> Format</button>
          <button className="btn-success" onClick={validateJSON}><Check size={18} /> Validate</button>
          <button className="btn-secondary" onClick={minifyJSON}><Zap size={18} /> Minify</button>
          <button className="btn-primary" onClick={saveSnippet} disabled={isLoading}>
            <Save size={18} /> {isLoading ? 'Saving...' : 'Save Snippet'}
          </button>
          <button className="btn-primary" onClick={copyToClipboard}><Copy size={18} /> Copy</button>
          <button className="btn-danger" onClick={clearAll}><Trash2 size={18} /> Clear</button>
        </div>

        <div className="stats">
          <div className="stat-item">
            <span className="stat-label">Characters:</span>
            <span className="stat-value">{stats.chars}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Lines:</span>
            <span className="stat-value">{stats.lines}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Size:</span>
            <span className="stat-value">{stats.size}</span>
          </div>
        </div>
      </div>

      <div className="history-sidebar">
        <h2 style={{ fontSize: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={20} /> History
        </h2>
        <div style={{ overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {history.length === 0 ? (
            <p className="history-date">No saved snippets yet.</p>
          ) : (
            history.map(item => (
              <div key={item._id} className="history-item" onClick={() => loadFromHistory(item)}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span className="history-name">{item.name}</span>
                  <Trash2 size={14} className="btn-danger-text" onClick={(e) => deleteSnippet(item._id, e)} />
                </div>
                <span className="history-date">{new Date(item.createdAt).toLocaleString()}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
