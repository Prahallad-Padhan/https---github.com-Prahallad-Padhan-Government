import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="homepage">
            {/* Header Navigation */}
            <header className="header">
                <div className="nav-container">
                    <div className="logo">
                        <h2>YourBrand</h2>
                    </div>
                    <div className="nav-buttons">
                        <div className="language-selector">
                            <select className="language-dropdown">
                                <option>🌐 English</option>
                                <option>🌐 Hindi</option>
                                <option>🌐 Spanish</option>
                            </select>
                        </div>
                        <button className="nav-btn signin-btn" onClick={() => navigate('/login')}>
                            Sign In
                        </button>
                        <button className="nav-btn signup-btn" onClick={() => navigate('/register')}>
                            Sign Up
                        </button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-overlay"></div>
                <div className="hero-content">
                    <h1 className="hero-title">
                        Unlimited possibilities,
                        <br />
                        endless opportunities
                        <br />
                        and more
                    </h1>
                    <p className="hero-subtitle">
                        Connect with vendors and organizations worldwide. Start your journey today.
                    </p>
                    <div className="hero-signup">
                        <p className="signup-text">
                            Ready to get started? Enter your email to create or restart your account.
                        </p>
                        <div className="email-signup">
                            <input 
                                type="email" 
                                placeholder="Email address" 
                                className="email-input"
                            />
                            <button className="get-started-btn" onClick={() => navigate('/register')}>
                                Get Started <span className="arrow">›</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="container">
                    <h2 className="section-title">Why Choose Our Platform?</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🚀</div>
                            <h3>Fast & Reliable</h3>
                            <p>Lightning-fast connections with 99.9% uptime guarantee. Your business never stops.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🔒</div>
                            <h3>Secure & Safe</h3>
                            <p>Bank-level security with end-to-end encryption. Your data is always protected.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🌍</div>
                            <h3>Global Reach</h3>
                            <p>Connect with vendors and organizations from over 190 countries worldwide.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">📱</div>
                            <h3>Multi-Platform</h3>
                            <p>Access from any device - desktop, mobile, or tablet. Always stay connected.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">⚡</div>
                            <h3>Real-time Updates</h3>
                            <p>Get instant notifications and updates. Never miss an important opportunity.</p>
                        </div>
                        <div className="feature-card">
                            <div className="feature-icon">🎯</div>
                            <h3>Smart Matching</h3>
                            <p>AI-powered matching system connects you with the most relevant partners.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="about-section">
                <div className="container">
                    <div className="about-content">
                        <div className="about-text">
                            <h2>Revolutionizing Business Connections</h2>
                            <p>
                                Our platform bridges the gap between vendors and organizations, creating 
                                meaningful partnerships that drive growth and success. With advanced technology 
                                and user-centric design, we make business networking effortless and effective.
                            </p>
                            <p>
                                Join thousands of successful businesses who have transformed their operations 
                                through our innovative platform. Experience the future of business collaboration.
                            </p>
                            <button className="learn-more-btn" onClick={() => navigate('/register')}>
                                Start Your Journey
                            </button>
                        </div>
                        <div className="about-visual">
                            <div className="stats-grid">
                                <div className="stat-item">
                                    <h3>50K+</h3>
                                    <p>Active Users</p>
                                </div>
                                <div className="stat-item">
                                    <h3>190+</h3>
                                    <p>Countries</p>
                                </div>
                                <div className="stat-item">
                                    <h3>99.9%</h3>
                                    <p>Uptime</p>
                                </div>
                                <div className="stat-item">
                                    <h3>24/7</h3>
                                    <p>Support</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <div className="footer-content">
                        <div className="footer-section">
                            <h4>Company</h4>
                            <ul>
                                <li><a href="#about">About Us</a></li>
                                <li><a href="#careers">Careers</a></li>
                                <li><a href="#press">Press</a></li>
                                <li><a href="#blog">Blog</a></li>
                            </ul>
                        </div>
                        <div className="footer-section">
                            <h4>Support</h4>
                            <ul>
                                <li><a href="#help">Help Center</a></li>
                                <li><a href="#contact">Contact Us</a></li>
                                <li><a href="#status">System Status</a></li>
                                <li><a href="#security">Security</a></li>
                            </ul>
                        </div>
                        <div className="footer-section">
                            <h4>Legal</h4>
                            <ul>
                                <li><a href="#privacy">Privacy Policy</a></li>
                                <li><a href="#terms">Terms of Service</a></li>
                                <li><a href="#cookies">Cookie Policy</a></li>
                                <li><a href="#compliance">Compliance</a></li>
                            </ul>
                        </div>
                        <div className="footer-section">
                            <h4>Connect</h4>
                            <div className="social-links">
                                <a href="#" className="social-link">📱</a>
                                <a href="#" className="social-link">🐦</a>
                                <a href="#" className="social-link">💼</a>
                                <a href="#" className="social-link">📘</a>
                            </div>
                            <div className="language-footer">
                                <select className="language-dropdown-footer">
                                    <option>🌐 English</option>
                                    <option>🌐 Hindi</option>
                                    <option>🌐 Spanish</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2025 YourBrand. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;