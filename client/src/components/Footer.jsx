import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container footer-grid">
                <div className="footer-brand">
                    <a href="#" className="footer-logo">
                        <Sparkles size={24} style={{ color: 'var(--brand-primary)' }} />
                        <span>JSONfy</span>
                    </a>
                    <p className="footer-tagline">
                        Redesigning developer productivity. Clean, optimize, inspect, and parse your API integrations directly within a secure, responsive environment.
                    </p>
                    <div className="social-links">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="GitHub">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="Twitter">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" title="LinkedIn">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                        </a>
                    </div>
                </div>

                <div>
                    <h4 className="footer-column-title">Features & Tools</h4>
                    <ul className="footer-links-list">
                        <li><a href="#tool">JSON Formatter</a></li>
                        <li><a href="#tool">JSON Validator</a></li>
                        <li><a href="#tool">JSON Minifier</a></li>
                        <li><a href="#features">Saved Snippets DB</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="footer-column-title">Platform</h4>
                    <ul className="footer-links-list">
                        <li><a href="#how-it-works">How It Works</a></li>
                        <li><a href="#faq">Frequently Asked FAQs</a></li>
                        <li><a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a></li>
                        <li><a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a></li>
                    </ul>
                </div>
            </div>

            <div className="container footer-bottom">
                <p>&copy; {currentYear} JSONfy. Open Source under MIT License.</p>
                <p style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    Crafted with 
                    <Heart size={14} style={{ color: 'var(--error)', fill: 'var(--error)' }} />
                    by 
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none', fontWeight: 600 }}>
                        Nirjan Barik
                    </a>
                </p>
            </div>
        </footer>
    );
}
