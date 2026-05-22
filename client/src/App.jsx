import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { 
    Code, 
    FileJson, 
    Trash2, 
    Copy, 
    Check, 
    Save, 
    AlertTriangle,
    UploadCloud,
    FileCode,
    Activity,
    Binary,
    BarChart3,
    Database,
    HelpCircle
} from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import HistoryDrawer from './components/HistoryDrawer';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function App() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [status, setStatus] = useState({ type: 'idle', message: 'Ready to Format' });
    const [stats, setStats] = useState({ chars: '0', lines: '0', size: '0 bytes' });
    const [history, setHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isDragActive, setIsDragActive] = useState(false);
    
    const fileInputRef = useRef(null);

    // Apply Theme
    useEffect(() => {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    // Fetch Saved Snippets on Load
    useEffect(() => {
        fetchHistory();
    }, []);

    // Calculate Input Stats dynamically
    useEffect(() => {
        const chars = input.length;
        const lines = input ? input.split('\n').length : 0;
        const bytes = new Blob([input]).size;
        
        let sizeString = `${bytes} B`;
        if (bytes > 1024 * 1024) {
            sizeString = `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
        } else if (bytes > 1024) {
            sizeString = `${(bytes / 1024).toFixed(2)} KB`;
        }

        setStats({
            chars: chars.toLocaleString(),
            lines: lines.toLocaleString(),
            size: sizeString
        });
    }, [input]);

    const fetchHistory = async () => {
        let localSnippets = [];
        try {
            const localData = localStorage.getItem('local_snippets');
            if (localData) {
                localSnippets = JSON.parse(localData);
            }
        } catch (e) {
            console.error('Local storage error', e);
        }

        try {
            const response = await axios.get(`${API_BASE_URL}/snippets`);
            setHistory([...response.data, ...localSnippets]);
        } catch (error) {
            console.error('Error fetching history snippets:', error);
            setHistory(localSnippets);
        }
    };

    const formatJSON = () => {
        if (!input.trim()) {
            setStatus({ type: 'invalid', message: 'No Data' });
            setOutput('ERROR: Please enter JSON data to format.');
            return;
        }
        try {
            // Attempt standard JSON parse
            const parsed = JSON.parse(input);
            const formatted = JSON.stringify(parsed, null, 4);
            setOutput(formatted);
            setStatus({ type: 'valid', message: 'Formatted' });
        } catch (error) {
            // Attempt to recover JS objects (relaxed JSON)
            try {
                const recovered = eval('(' + input + ')');
                const formatted = JSON.stringify(recovered, null, 4);
                setOutput(formatted);
                setStatus({ type: 'valid', message: 'Cleaned & Formatted' });
            } catch (jsError) {
                setOutput(`ERROR: Invalid JSON structure.\n\n${error.message}`);
                setStatus({ type: 'invalid', message: 'Syntax Error' });
            }
        }
    };

    const validateJSON = () => {
        if (!input.trim()) {
            setStatus({ type: 'invalid', message: 'No Data' });
            setOutput('ERROR: Please enter JSON data to validate.');
            return;
        }
        try {
            const parsed = JSON.parse(input);
            const keyCount = typeof parsed === 'object' && parsed !== null ? Object.keys(parsed).length : 'N/A';
            const structureType = Array.isArray(parsed) ? 'Array' : typeof parsed;
            
            const successReport = `✓ JSON is valid and RFC compliant!\n\nStructure Type: ${structureType}\nTotal Elements: ${keyCount}\nSize Profile: ${stats.size}`;
            setOutput(successReport);
            setStatus({ type: 'valid', message: 'Valid JSON' });
        } catch (error) {
            setOutput(`ERROR: Invalid JSON structure.\n\n${error.message}`);
            setStatus({ type: 'invalid', message: 'Syntax Error' });
        }
    };

    const minifyJSON = () => {
        if (!input.trim()) {
            setStatus({ type: 'invalid', message: 'No Data' });
            setOutput('ERROR: Please enter JSON data to minify.');
            return;
        }
        try {
            const parsed = JSON.parse(input);
            const minified = JSON.stringify(parsed);
            setOutput(minified);
            setStatus({ type: 'valid', message: 'Minified' });
        } catch (error) {
            try {
                const recovered = eval('(' + input + ')');
                const minified = JSON.stringify(recovered);
                setOutput(minified);
                setStatus({ type: 'valid', message: 'Cleaned & Minified' });
            } catch (jsError) {
                setOutput(`ERROR: Invalid JSON structure.\n\n${error.message}`);
                setStatus({ type: 'invalid', message: 'Syntax Error' });
            }
        }
    };

    const saveSnippet = async () => {
        if (!input.trim()) return;
        setIsLoading(true);
        try {
            const defaultName = `Snippet ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
            const name = prompt('Name your saved JSON snippet:', defaultName) || 'Untitled JSON';
            
            let savedToDB = false;
            try {
                await axios.post(`${API_BASE_URL}/snippets`, {
                    name,
                    content: input,
                    stats
                });
                savedToDB = true;
            } catch (dbError) {
                console.error('Failed to save to DB:', dbError);
            }

            // Save to localStorage as well
            const newSnippet = {
                _id: 'local_' + Date.now(),
                name,
                content: input,
                stats,
                isLocal: true,
                createdAt: new Date().toISOString()
            };
                       const localData = localStorage.getItem('local_snippets');
            let localSnippets = localData ? JSON.parse(localData) : [];
            localSnippets.push(newSnippet);
            localStorage.setItem('local_snippets', JSON.stringify(localSnippets));

            fetchHistory();
            if (savedToDB) {
                alert('Snippet saved successfully to Cloud and Browser History!');
            } else {
                alert('Backend not reachable. Snippet saved to Browser History!');
            }
        } catch (error) {
            console.error('Failed to save snippet:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const copyToClipboard = () => {
        if (!output || output.startsWith('ERROR:') || output === 'Output JSON will appear here...') {
            alert('Nothing to copy!');
            return;
        }
        navigator.clipboard.writeText(output).then(() => {
            const oldStatus = status;
            setStatus({ type: 'valid', message: 'Copied to Clipboard!' });
            setTimeout(() => setStatus(oldStatus), 2000);
        });
    };

    const clearAll = () => {
        setInput('');
        setOutput('');
        setStatus({ type: 'idle', message: 'Ready to Format' });
    };

    const loadSnippet = (snippet) => {
        setInput(snippet.content);
        try {
            const parsed = JSON.parse(snippet.content);
            setOutput(JSON.stringify(parsed, null, 4));
            setStatus({ type: 'valid', message: 'Loaded from Database' });
        } catch (e) {
            setOutput(snippet.content);
            setStatus({ type: 'valid', message: 'Snippet Loaded' });
        }
    };

    const deleteSnippet = async (id, e) => {
        e.stopPropagation();
        if (!confirm('Are you sure you want to permanently delete this saved snippet?')) return;
        
        if (typeof id === 'string' && id.startsWith('local_')) {
            const localData = localStorage.getItem('local_snippets');
            if (localData) {
                let localSnippets = JSON.parse(localData);
                localSnippets = localSnippets.filter(s => s._id !== id);
                localStorage.setItem('local_snippets', JSON.stringify(localSnippets));
            }
            fetchHistory();
            return;
        }

        try {
            await axios.delete(`${API_BASE_URL}/snippets/${id}`);
            fetchHistory();
        } catch (error) {
            console.error('Error deleting snippet:', error);
            alert('Failed to delete snippet from database.');
        }
    };

    // File Drag and Drop logic
    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setIsDragActive(true);
        } else if (e.type === 'dragleave') {
            setIsDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleUploadedFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            handleUploadedFile(e.target.files[0]);
        }
    };

    const handleUploadedFile = (file) => {
        if (file.type !== 'application/json' && !file.name.endsWith('.json') && !file.name.endsWith('.txt')) {
            alert('Unsupported file format! Please upload a valid .json or .txt file.');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
            setInput(e.target.result);
            setStatus({ type: 'idle', message: 'File Loaded' });
        };
        reader.readAsText(file);
    };

    const triggerFileBrowser = () => {
        fileInputRef.current.click();
    };

    const loadSampleJSON = (e) => {
        e.preventDefault();
        const sample = {
            appName: "Josify Premium Formatter",
            version: 2.0,
            status: "online",
            license: "MIT",
            technologies: ["React 19", "Express", "NodeJS", "MongoDB"],
            developer: {
                name: "Nirjan Barik",
                title: "Full Stack Engineer"
            },
            features: [
                "Realtime syntax beautifying",
                "Ultra-dense minification",
                "JSON payload schema linter",
                "Drag-and-drop file uploaders",
                "Cloud persistent history database"
            ]
        };
        setInput(JSON.stringify(sample, null, 4));
        setStatus({ type: 'idle', message: 'Sample Loaded' });
    };

    return (
        <>
            <Navbar 
                theme={theme} 
                onToggleTheme={toggleTheme} 
                onOpenDrawer={() => setIsDrawerOpen(true)} 
            />

            <Hero />

            {/* MAIN REDESIGNED FORMATTER ENGINE */}
            <section className="section-padding tool-section" id="tool">
                <div className="container">
                    <div className="text-center">
                        <span className="badge">
                            <Activity size={14} />
                            <span>Interactive Console</span>
                        </span>
                        <h2 className="section-title">Formatter & Validator Workspace</h2>
                        <p className="section-subtitle">
                            Clean indentations, check structures, compile minified payloads, and store history snippets.
                        </p>
                    </div>

                    <div className="tool-container glass-panel" style={{ padding: '30px' }}>
                        
                        {/* Custom File Upload Dropzone */}
                        <div 
                            className={`upload-dropzone ${isDragActive ? 'drag-active' : ''}`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                            onClick={triggerFileBrowser}
                        >
                            <input 
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept=".json,.txt"
                                style={{ display: 'none' }}
                            />
                            <div className="upload-icon-wrapper">
                                <UploadCloud size={24} />
                            </div>
                            <span className="upload-text">Drag & drop your JSON file here, or <span style={{ color: 'var(--brand-primary)', textDecoration: 'underline' }}>Browse</span></span>
                            <span className="upload-subtext">Supports .json or .txt format payloads (Max size 10MB)</span>
                        </div>

                        {/* Interactive Editor Workspace */}
                        <div className="workspace-grid">
                            
                            {/* Input Panel */}
                            <div className="panel-container">
                                <div className="workspace-panel-header">
                                    <span className="panel-title">
                                        <FileCode size={16} style={{ color: 'var(--brand-primary)' }} />
                                        Input raw JSON code
                                    </span>
                                    <div className="panel-actions">
                                        <a 
                                            href="#" 
                                            onClick={loadSampleJSON}
                                            style={{ fontSize: '0.8rem', color: 'var(--brand-primary)', textDecoration: 'none', fontWeight: 600 }}
                                        >
                                            [Load Sample]
                                        </a>
                                    </div>
                                </div>
                                <textarea 
                                    className="editor-textarea"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder='Paste JSON here or upload a file. Example:&#10;{ "name": "Nirjan", "age": 22, "city": "Bhubaneswar" }'
                                />
                            </div>

                            {/* Output Panel */}
                            <div className="panel-container">
                                <div className="workspace-panel-header">
                                    <span className="panel-title">
                                        <Binary size={16} style={{ color: 'var(--brand-secondary)' }} />
                                        Console Output
                                    </span>
                                    <span className={`tool-status-badge status-${status.type}`}>
                                        {status.message}
                                    </span>
                                </div>
                                
                                {output.startsWith('ERROR:') ? (
                                    <div className="output-viewer error-state">
                                        <div className="error-card">
                                            <AlertTriangle size={18} style={{ flexShrink: 0 }} />
                                            <div>
                                                <h5 style={{ fontWeight: 700, marginBottom: '4px' }}>Invalid JSON Detected</h5>
                                                <p>{output.replace('ERROR: ', '')}</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <pre className="output-viewer">
                                        {output || 'Processed results will appear here after triggering formatting operations...'}
                                    </pre>
                                )}
                            </div>
                        </div>

                        {/* Actions Control Toolbar */}
                        <div className="controls-card">
                            <button className="btn btn-primary" onClick={formatJSON}>
                                <Code size={18} />
                                Format JSON
                            </button>
                            <button className="btn btn-accent" onClick={validateJSON}>
                                <Check size={18} />
                                Validate Payload
                            </button>
                            <button className="btn btn-secondary" onClick={minifyJSON}>
                                <Binary size={18} />
                                Minify Output
                            </button>
                            <button className="btn btn-success" onClick={saveSnippet} disabled={isLoading}>
                                <Save size={18} />
                                {isLoading ? 'Saving Snippet...' : 'Save Snippet'}
                            </button>
                            <button className="btn btn-warning" onClick={copyToClipboard}>
                                <Copy size={18} />
                                Copy Output
                            </button>
                            <button className="btn btn-danger" onClick={clearAll}>
                                <Trash2 size={18} />
                                Clear Console
                            </button>
                        </div>

                        {/* Live Statistical Logs */}
                        <div className="live-stats">
                            <div className="stat-box">
                                <div className="stat-info">
                                    <span className="stat-label-text">Character Count</span>
                                    <span className="stat-value-text">{stats.chars}</span>
                                </div>
                                <div className="stat-icon">
                                    <BarChart3 size={18} />
                                </div>
                            </div>

                            <div className="stat-box">
                                <div className="stat-info">
                                    <span className="stat-label-text">Total Lines</span>
                                    <span className="stat-value-text">{stats.lines}</span>
                                </div>
                                <div className="stat-icon">
                                    <FileCode size={18} />
                                </div>
                            </div>

                            <div className="stat-box">
                                <div className="stat-info">
                                    <span className="stat-label-text">File Size</span>
                                    <span className="stat-value-text">{stats.size}</span>
                                </div>
                                <div className="stat-icon">
                                    <Binary size={18} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <Features />

            <HowItWorks />

            <FAQ />

            <Footer />

            <HistoryDrawer 
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                history={history}
                onLoadSnippet={loadSnippet}
                onDeleteSnippet={deleteSnippet}
            />
        </>
    );
}

export default App;
