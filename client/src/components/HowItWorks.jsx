import React from 'react';
import { Terminal, Code2, ClipboardCopy, Save } from 'lucide-react';

export default function HowItWorks() {
    return (
        <section className="section-padding split-section" id="how-it-works">
            <div className="container split-grid">
                <div className="split-image-container">
                    <div className="visual-card" style={{ transform: 'none', boxShadow: 'none', border: 'none' }}>
                        <div className="visual-card-header">
                            <div className="dot-group">
                                <span className="dot dot-red"></span>
                                <span className="dot dot-yellow"></span>
                                <span className="dot dot-green"></span>
                            </div>
                            <span className="visual-card-title">validation_engine.json</span>
                        </div>
                        <div className="visual-card-body" style={{ minHeight: '320px' }}>
                            <p className="highlight-blue">// Auto-detected Schema Tree</p>
                            <p>&#123;</p>
                            <p>&nbsp;&nbsp;<span className="highlight-orange">"status"</span>: <span className="highlight-green">"success"</span>,</p>
                            <p>&nbsp;&nbsp;<span className="highlight-orange">"responseCode"</span>: <span className="highlight-purple">200</span>,</p>
                            <p>&nbsp;&nbsp;<span className="highlight-orange">"serverNode"</span>: <span className="highlight-green">"US-East-1"</span>,</p>
                            <p>&nbsp;&nbsp;<span className="highlight-orange">"data"</span>: &#123;</p>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="highlight-orange">"latencyMs"</span>: <span className="highlight-purple">42</span>,</p>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="highlight-orange">"payloadBytes"</span>: <span className="highlight-purple">1254</span>,</p>
                            <p>&nbsp;&nbsp;&nbsp;&nbsp;<span className="highlight-orange">"activeConnection"</span>: <span className="highlight-purple">true</span></p>
                            <p>&nbsp;&nbsp;&#125;</p>
                            <p>&#125;</p>
                        </div>
                    </div>
                </div>

                <div>
                    <h2 className="section-title">How Does the Redesigned JSON Tool Work?</h2>
                    <p className="section-subtitle" style={{ margin: '0 0 30px 0', textAlign: 'left' }}>
                        Streamlining API configuration and validation in three simple steps.
                    </p>

                    <div className="step-list">
                        <div className="step-item">
                            <div className="step-number">1</div>
                            <div className="step-content">
                                <h4 className="step-content-title">Paste or Drag Files</h4>
                                <p className="step-content-description">
                                    Drop a `.json` file from your computer or paste plain text into our editor. The size, characters, and lines are auto-calculated instantly.
                                </p>
                            </div>
                        </div>

                        <div className="step-item">
                            <div className="step-number">2</div>
                            <div className="step-content">
                                <h4 className="step-content-title">Structure and Validate</h4>
                                <p className="step-content-description">
                                    Click **Format** to clean up the indentation, **Minify** to compress the size, or **Validate** to run comprehensive lint checks.
                                </p>
                            </div>
                        </div>

                        <div className="step-item">
                            <div className="step-number">3</div>
                            <div className="step-content">
                                <h4 className="step-content-title">Export or Save Cloud Logs</h4>
                                <p className="step-content-description">
                                    One-click copy the results to your clipboard or save the snippet into your history, keeping them backed up securely.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
