import React from 'react';
import { X, Database, Trash2, Clock, FileText } from 'lucide-react';

export default function HistoryDrawer({ isOpen, onClose, history, onLoadSnippet, onDeleteSnippet }) {
    return (
        <>
            <div 
                className={`drawer-overlay ${isOpen ? 'open' : ''}`} 
                onClick={onClose} 
            />
            <div className={`drawer-sidebar ${isOpen ? 'open' : ''}`}>
                <div className="drawer-header">
                    <div className="drawer-title">
                        <Database size={20} style={{ color: 'var(--brand-primary)' }} />
                        <span>Saved Snippets</span>
                    </div>
                    <button className="drawer-close-btn" onClick={onClose} title="Close Sidebar">
                        <X size={20} />
                    </button>
                </div>

                <div className="drawer-body">
                    {history.length === 0 ? (
                        <div className="history-empty-text">
                            <Clock size={32} style={{ marginBottom: '12px', color: 'var(--text-muted)' }} />
                            <p>No saved snippets yet.</p>
                            <p style={{ fontSize: '0.8rem', marginTop: '4px' }}>Format JSON and hit "Save Snippet" to back them up here.</p>
                        </div>
                    ) : (
                        history.map((item) => (
                            <div 
                                key={item._id} 
                                className="drawer-history-item"
                                onClick={() => {
                                    onLoadSnippet(item);
                                    onClose(); // auto close drawer on load
                                }}
                            >
                                <div className="drawer-history-item-header">
                                    <span className="drawer-history-item-name">{item.name}</span>
                                    <button 
                                        className="drawer-item-delete-btn"
                                        onClick={(e) => onDeleteSnippet(item._id, e)}
                                        title="Delete Snippet"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                                
                                <div className="drawer-history-item-stats">
                                    <span className="drawer-history-item-stat-span">Chars: {item.stats?.chars || 'N/A'}</span>
                                    <span className="drawer-history-item-stat-span">Size: {item.stats?.size || 'N/A'}</span>
                                </div>

                                <span className="drawer-history-item-date">
                                    Saved: {new Date(item.createdAt).toLocaleString()}
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
