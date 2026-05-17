import React from 'react';
import { Terminal, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Hero() {
    return (
        <section className="hero" id="hero">
            <div className="blob blob-primary"></div>
            <div className="blob blob-secondary"></div>
            
            <div className="container hero-grid">
                <div className="hero-content">
                    <div className="badge">
                        <Sparkles size={14} />
                        <span>MERN Stack Saved Snippets Enabled</span>
                    </div>
                    
                    <h1 className="hero-title">
                        Format, Validate & Save Your <span>JSON Data</span> Instantly
                    </h1>
                    
                    <p className="hero-description">
                        Make your complex nested JSON readable in milliseconds. Beautiful structures, deep syntax checking, minification, and database integration — all in one modern development dashboard.
                    </p>
                    
                    <div className="hero-buttons">
                        <a href="#tool" className="btn btn-primary">
                            <Terminal size={18} />
                            Launch Formatter
                        </a>
                        <a href="#features" className="btn btn-secondary">
                            Explore Features
                        </a>
                    </div>
                </div>

                <div className="hero-visual">
                    <div className="visual-box">
                        <div className="visual-card">
                            <div className="visual-card-header">
                                <div className="dot-group">
                                    <span className="dot dot-red"></span>
                                    <span className="dot dot-yellow"></span>
                                    <span className="dot dot-green"></span>
                                </div>
                                <span className="visual-card-title">payload_formatter.js</span>
                                <CheckCircle2 size={14} style={{ color: 'var(--success)' }} />
                            </div>
                            <div className="visual-card-body">
                                <p><span className="highlight-purple">const</span> <span className="highlight-blue">developer</span> = &#123;</p>
                                <p>&nbsp;&nbsp;<span className="highlight-orange">"name"</span>: <span className="highlight-green">"Nirjan Barik"</span>,</p>
                                <p>&nbsp;&nbsp;<span className="highlight-orange">"role"</span>: <span className="highlight-green">"Full Stack Architect"</span>,</p>
                                <p>&nbsp;&nbsp;<span className="highlight-orange">"skills"</span>: [</p>
                                <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="highlight-green">"MERN Stack"</span>,</p>
                                <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="highlight-green">"Modern UI Design"</span>,</p>
                                <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="highlight-green">"API Formatting"</span></p>
                                <p>&nbsp;&nbsp;],</p>
                                <p>&nbsp;&nbsp;<span className="highlight-orange">"secureLocally"</span>: <span className="highlight-purple">true</span>,</p>
                                <p>&nbsp;&nbsp;<span className="highlight-orange">"features"</span>: &#123;</p>
                                <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="highlight-orange">"minify"</span>: <span className="highlight-purple">true</span>,</p>
                                <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="highlight-orange">"cloudStorage"</span>: <span className="highlight-purple">true</span></p>
                                <p>&nbsp;&nbsp;&#125;</p>
                                <p>&#125;;</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
