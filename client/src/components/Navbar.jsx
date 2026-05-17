import React, { useEffect, useState } from 'react';
import { Sparkles, Sun, Moon, Database, AlignRight } from 'lucide-react';

export default function Navbar({ theme, onToggleTheme, onOpenDrawer }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <a href="#" className="logo">
                    <Sparkles size={24} style={{ color: 'var(--brand-primary)' }} />
                    <span>Josify</span>
                </a>

                <ul className="nav-links">
                    <li><a href="#hero">Home</a></li>
                    <li><a href="#tool">Formatter Tool</a></li>
                    <li><a href="#features">Features</a></li>
                    <li><a href="#how-it-works">How It Works</a></li>
                    <li><a href="#faq">FAQ</a></li>
                </ul>

                <div className="nav-actions">
                    <button 
                        onClick={onOpenDrawer} 
                        className="theme-toggle-btn"
                        title="Saved Snippets"
                        style={{ position: 'relative' }}
                    >
                        <Database size={20} />
                    </button>

                    <button 
                        onClick={onToggleTheme} 
                        className="theme-toggle-btn" 
                        title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    <a href="#tool" className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '0.85rem' }}>
                        Format Now
                    </a>
                </div>
            </div>
        </header>
    );
}
