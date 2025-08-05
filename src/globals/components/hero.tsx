"use client";

import React, { useState } from "react";

/* ================================
   HERO COMPONENT
   Modern hero section with newsletter subscription
   ================================ */

interface HeroProps {
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ className = "" }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSubscribed(true);
    console.log("Newsletter subscription:", email);

    // Reset after showing success
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail("");
    }, 3000);
  };

  return (
    <section className={`hero ${className}`}>
      {/* Background gradients and effects */}
      <div className="hero-background">
        <div className="hero-gradient-orb hero-gradient-orb-1"></div>
        <div className="hero-gradient-orb hero-gradient-orb-2"></div>
        <div className="hero-gradient-orb hero-gradient-orb-3"></div>
      </div>

      <div className="hero-container">
        <div className="hero-content">
          {/* Main content */}
          <div className="hero-main">
            <div className="hero-badge">
              <span className="hero-badge-text">🚀 A 5-MINUTE BRIEFING</span>
              <span className="hero-badge-highlight"> FOR MODERN DEVS</span>
            </div>

            <h1 className="hero-title">
              Master the Modern Web.
              <span className="hero-title-gradient"> Ship Faster.</span>
            </h1>

            <p className="hero-subtitle">
              Stop drowning in docs and start delivering. The Ninja&apos;s
              Dispatch is your weekly 5-minute briefing with curated intel on
              Core Frontend, AI, Infra, and Security—all you need to build
              better and move faster.
            </p>

            {/* Newsletter subscription */}
            <div className="hero-newsletter">
              <form onSubmit={handleSubmit} className="hero-newsletter-form">
                <div className="hero-input-container">
                  <EmailIcon className="hero-input-icon" />
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="hero-input"
                    disabled={isLoading || isSubscribed}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className={`hero-cta ${isSubscribed ? "success" : ""}`}
                  disabled={isLoading || isSubscribed}
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner />
                      <span>Subscribing...</span>
                    </>
                  ) : isSubscribed ? (
                    <>
                      <CheckIcon />
                      <span>Subscribed!</span>
                    </>
                  ) : (
                    <>
                      <span>Get a Sharper Edge</span>
                      <ArrowRightIcon />
                    </>
                  )}
                </button>
              </form>

              <p className="hero-newsletter-note">
                Join hundreds of developers who are shipping better code,
                faster.
              </p>
            </div>

            {/* Stats */}
            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-number">Weekly</div>
                <div className="hero-stat-label">Intel</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">Zero</div>
                <div className="hero-stat-label">Fluff</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">No</div>
                <div className="hero-stat-label">Jargon</div>
              </div>
            </div>
          </div>

          {/* Side card */}
          <div className="hero-card">
            <div className="hero-card-header">
              <div className="hero-card-title">
                <div className="hero-card-icon">
                  <SparklesIcon />
                </div>
                <div>
                  <h3>Dashboard Preview</h3>
                  <p>Real-time analytics</p>
                </div>
              </div>
              <div className="hero-card-status">
                <div className="hero-status-dot"></div>
                <span>Live</span>
              </div>
            </div>

            <div className="hero-card-content">
              <div className="hero-metric">
                <div className="hero-metric-header">
                  <span className="hero-metric-label">Revenue</span>
                  <span className="hero-metric-change positive">+12.5%</span>
                </div>
                <div className="hero-metric-value">$47,832</div>
                <div className="hero-metric-bar">
                  <div
                    className="hero-metric-progress"
                    style={{ width: "68%" }}
                  ></div>
                </div>
              </div>

              <div className="hero-metric">
                <div className="hero-metric-header">
                  <span className="hero-metric-label">Users</span>
                  <span className="hero-metric-change positive">+8.2%</span>
                </div>
                <div className="hero-metric-value">12,847</div>
                <div className="hero-metric-bar">
                  <div
                    className="hero-metric-progress secondary"
                    style={{ width: "84%" }}
                  ></div>
                </div>
              </div>

              <div className="hero-metric">
                <div className="hero-metric-header">
                  <span className="hero-metric-label">Conversion</span>
                  <span className="hero-metric-change positive">+2.1%</span>
                </div>
                <div className="hero-metric-value">3.7%</div>
                <div className="hero-metric-bar">
                  <div
                    className="hero-metric-progress accent"
                    style={{ width: "37%" }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="hero-card-footer">
              <button className="hero-card-button">
                <span>View Details</span>
                <ExternalLinkIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ================================
   ICON COMPONENTS
   ================================ */

const EmailIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const ArrowRightIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12,5 19,12 12,19" />
  </svg>
);

const CheckIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="20,6 9,17 4,12" />
  </svg>
);

const SparklesIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
  </svg>
);

const ExternalLinkIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15,3 21,3 21,9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

const LoadingSpinner = ({ className = "" }: { className?: string }) => (
  <svg
    className={`hero-spinner ${className}`}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
      strokeDasharray="32"
      strokeDashoffset="32"
    >
      <animate
        attributeName="stroke-dasharray"
        dur="2s"
        values="0 32;16 16;0 32;0 32"
        repeatCount="indefinite"
      />
      <animate
        attributeName="stroke-dashoffset"
        dur="2s"
        values="0;-16;-32;-32"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

export default Hero;
