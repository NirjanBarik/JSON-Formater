import React from 'react';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';

export default function Articles() {
    const articlesData = [
        {
            title: "Mastering JSON Schema Validation: The Complete Guide",
            desc: "Learn how to write strict schemas to automatically validate complex incoming API requests. Prevent bugs and database pollution in production systems.",
            category: "API Design",
            date: "May 15, 2026",
            authorInitials: "NB",
            authorName: "Nirjan",
            pattern: "&#123;...&#125;"
        },
        {
            title: "Minification vs. Formatting: Optimizing Network Performance",
            desc: "Discover how stripping out blank spaces and indentations compresses JSON payloads. Learn when to use beatified formatting versus ultra-dense minified structures.",
            category: "Performance",
            date: "May 10, 2026",
            authorInitials: "JS",
            authorName: "John S.",
            pattern: "[ ]"
        },
        {
            title: "Top 5 JSON Security Vulnerabilities in Web Applications",
            desc: "Understand risks like JSON hijacking, Prototype Pollution, and large payload DoS attacks. Secure your backend parsers using best practices.",
            category: "Cybersecurity",
            date: "May 04, 2026",
            authorInitials: "SEC",
            authorName: "Security Team",
            pattern: "🔒"
        }
    ];

    return (
        <section className="section-padding articles-section" id="articles">
            <div className="container">
                <div className="text-center">
                    <span className="badge">
                        <Sparkles size={14} />
                        <span>Developer Guides</span>
                    </span>
                    <h2 className="section-title">Our Latest Articles & Resources</h2>
                    <p className="section-subtitle">
                        Level up your API development with detailed, highly technical walkthroughs and performance engineering tutorials.
                    </p>
                </div>

                <div className="articles-grid">
                    {articlesData.map((art, idx) => (
                        <article className="article-card" key={idx}>
                            <div className="article-banner">
                                <div className="banner-overlay"></div>
                                <div className="banner-pattern" dangerouslySetInnerHTML={{ __html: art.pattern }} />
                            </div>
                            <div className="article-body">
                                <div className="article-meta">
                                    <span className="article-category">{art.category}</span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Calendar size={12} />
                                        {art.date}
                                    </span>
                                </div>
                                <h3 className="article-title">{art.title}</h3>
                                <p className="article-description">{art.desc}</p>
                                
                                <div className="article-footer">
                                    <div className="article-author">
                                        <span className="author-avatar">{art.authorInitials}</span>
                                        <span className="author-name">{art.authorName}</span>
                                    </div>
                                    <a href="#" className="read-more-link" onClick={(e) => e.preventDefault()}>
                                        Read Guide
                                        <ArrowRight size={14} />
                                    </a>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
