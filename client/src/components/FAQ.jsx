import React, { useState } from 'react';
import { Sparkles, Plus } from 'lucide-react';

export default function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null);

    const faqData = [
        {
            q: "What is a JSON Formatter & Validator?",
            a: "It is an interactive developer tool designed to parse messy, compacted JSON (JavaScript Object Notation) strings, format them with standardized indentations and line breaks, and check them against syntax rules to identify parsing errors."
        },
        {
            q: "Is my JSON data secure and private?",
            a: "Absolutely! All formatting, minifying, and validating tasks are executed entirely locally inside your browser's runtime. Your code payload is never transmitted to any third-party APIs. It is only sent to your MERN backend when you explicitly select the 'Save Snippet' action."
        },
        {
            q: "What does minifying JSON actually do?",
            a: "Minification strips away all unnecessary whitespaces, line breaks, indentations, and comments from the JSON payload. This drastically compresses the overall file size in bytes, which is optimal for decreasing latency when sending data across web APIs."
        },
        {
            q: "How does the cloud saved history database function?",
            a: "When you hit the 'Save Snippet' button, the application sends a secure HTTP request to your local Express server, which saves the code and live stats into MongoDB. You can access, load, and delete these snippets instantly via the database sidebar drawer."
        },
        {
            q: "Can I parse other data types like JS objects?",
            a: "Yes! If you paste a standard JavaScript object (with single quotes or unquoted keys), our parser will do its best to sanitize it, convert it to valid RFC-compliant JSON, and format it cleanly."
        }
    ];

    const handleToggle = (index) => {
        if (activeIndex === index) {
            setActiveIndex(null); // close if clicked again
        } else {
            setActiveIndex(index);
        }
    };

    return (
        <section className="section-padding faq-section" id="faq">
            <div className="container">
                <div className="text-center">
                    <span className="badge">
                        <Sparkles size={14} />
                        <span>Support Center</span>
                    </span>
                    <h2 className="section-title">Frequently Asked Questions</h2>
                    <p className="section-subtitle">
                        Clear answers to common queries regarding security, syntax formats, and API configurations.
                    </p>
                </div>

                <div className="faq-wrapper">
                    {faqData.map((faq, idx) => (
                        <div 
                            className={`faq-item ${activeIndex === idx ? 'active' : ''}`} 
                            key={idx}
                        >
                            <button 
                                className="faq-trigger" 
                                onClick={() => handleToggle(idx)}
                            >
                                <span>{faq.q}</span>
                                <Plus className="faq-icon" size={18} />
                            </button>
                            <div className="faq-content">
                                <div className="faq-content-inner">
                                    {faq.a}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
