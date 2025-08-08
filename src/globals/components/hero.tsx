"use client";

import React, { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { subscribeEmail } from "@/utils/subscription.util";

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
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    setMessage("");

    try {
      const result = await subscribeEmail(email);

      if (result.success) {
        setIsSubscribed(true);
        setMessage(result.message);
        setEmail("");

        // Reset success state after showing message
        setTimeout(() => {
          setIsSubscribed(false);
          setMessage("");
        }, 5000);
      } else {
        setMessage(result.message);

        // Clear error message after some time
        setTimeout(() => {
          setMessage("");
        }, 5000);
      }
    } catch (error) {
      console.error("Subscription error:", error);
      setMessage("An unexpected error occurred. Please try again.");

      setTimeout(() => {
        setMessage("");
      }, 5000);
    } finally {
      setIsLoading(false);
    }
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
              Stop drowning in docs and start delivering. The{" "}
              <b className="highlight">Frontend Discovery</b> is your weekly
              5-minute briefing with curated intel on Core Frontend, AI, Infra,
              and Security—all you need to build better and move faster.
            </p>

            {/* Newsletter subscription */}
            <div className="hero-newsletter">
              <form onSubmit={handleSubmit} className="hero-newsletter-form">
                <div className="hero-input-container">
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
                      <Loader2 className="animate-spin" size={16} />
                      <span>Subscribing...</span>
                    </>
                  ) : isSubscribed ? (
                    <>
                      <Check size={16} />
                      <span>Subscribed!</span>
                    </>
                  ) : (
                    <>
                      <span>Get a Sharper Edge</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>

              {message && (
                <div
                  className={`hero-message ${isSubscribed ? "success" : "error"}`}
                >
                  {message}
                </div>
              )}
              <p className="hero-newsletter-note">
                Join hundreds of developers who are shipping better code,
                faster.
              </p>
            </div>

            {/* Stats */}
            {/* <div className="hero-stats">
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
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
