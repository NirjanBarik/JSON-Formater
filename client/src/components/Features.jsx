import React from 'react';
import { Sparkles, ShieldCheck, Database, Zap } from 'lucide-react';

export default function Features() {
    const featureData = [
        {
            icon: <Zap size={24} />,
            title: "Real-time Formatting",
            description: "Paste your raw JSON payloads and instantly watch them format into structured, color-coded trees. Indents are calculated in milliseconds."
        },
        {
            icon: <ShieldCheck size={24} />,
            title: "Strict Schema Validation",
            description: "No more parsing errors in production. Our validation engine points out missing commas, unescaped strings, and brackets precisely."
        },
        {
            icon: <Database size={24} />,
            title: "MERN Snippet History",
            description: "Securely save your formatted configurations directly to the cloud backend database. Load or clear past formatting logs instantly at any time."
        }
    ];

    return (
        <section className="section-padding features-grid-section" id="features">
            <div className="container">
                <div className="text-center">
                    <span className="badge">
                        <Sparkles size={14} />
                        <span>High Performance Toolset</span>
                    </span>
                    <h2 className="section-title">Designed for Fast API Development</h2>
                    <p className="section-subtitle">
                        Everything you need to inspect, polish, and validate JSON outputs without exposing your credentials.
                    </p>
                </div>

                <div className="features-grid">
                    {featureData.map((feat, idx) => (
                        <div className="feature-card" key={idx}>
                            <div className="feature-card-icon">
                                {feat.icon}
                            </div>
                            <h3 className="feature-card-title">{feat.title}</h3>
                            <p className="feature-card-description">{feat.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
