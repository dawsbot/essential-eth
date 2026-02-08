---
title: Essential Eth
description: A minimal, performant, and correct library for interacting with the Ethereum blockchain.
template: splash
hero:
  title: |
    The Essential Library <br/><span class="gradient-text">for Ethereum</span>
  tagline: A minimal, performant, and correct toolkit for interacting with the Ethereum blockchain. Drop-in ethers.js replacement at a fraction of the size.
  image:
    html: |
      <div class="neon-logo-wrap">
        <div class="neon-glow"></div>
        <svg class="neon-logo" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <!-- Outer hexagon ring -->
          <path d="M100 20 L170 60 L170 140 L100 180 L30 140 L30 60 Z" 
                fill="none" 
                stroke="url(#neon-gradient)" 
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"/>
          
          <!-- Inner Ethereum diamond -->
          <g transform="translate(100, 100) scale(0.35)">
            <polygon fill="url(#diamond-gradient-1)" 
                     points="0,-120 -80,20 80,20"/>
            <polygon fill="url(#diamond-gradient-2)" 
                     points="0,-120 80,20 0,140"/>
            <polygon fill="url(#diamond-gradient-3)" 
                     points="0,-120 -80,20 0,140"/>
            <polygon fill="url(#diamond-gradient-4)" 
                     points="-80,20 0,140 0,60"/>
            <polygon fill="url(#diamond-gradient-5)" 
                     points="80,20 0,140 0,60"/>
          </g>
          
          <!-- Gradient definitions -->
          <defs>
            <linearGradient id="neon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#00d4ff;stop-opacity:1" />
              <stop offset="50%" style="stop-color:#a855f7;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#ec4899;stop-opacity:1" />
            </linearGradient>
            
            <linearGradient id="diamond-gradient-1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#00d4ff;stop-opacity:0.9" />
              <stop offset="100%" style="stop-color:#00d4ff;stop-opacity:0.6" />
            </linearGradient>
            
            <linearGradient id="diamond-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#a855f7;stop-opacity:0.9" />
              <stop offset="100%" style="stop-color:#ec4899;stop-opacity:0.6" />
            </linearGradient>
            
            <linearGradient id="diamond-gradient-3" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style="stop-color:#00d4ff;stop-opacity:0.8" />
              <stop offset="100%" style="stop-color:#a855f7;stop-opacity:0.5" />
            </linearGradient>
            
            <linearGradient id="diamond-gradient-4" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style="stop-color:#a855f7;stop-opacity:0.7" />
              <stop offset="100%" style="stop-color:#00d4ff;stop-opacity:0.4" />
            </linearGradient>
            
            <linearGradient id="diamond-gradient-5" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" style="stop-color:#ec4899;stop-opacity:0.7" />
              <stop offset="100%" style="stop-color:#a855f7;stop-opacity:0.4" />
            </linearGradient>
          </defs>
        </svg>
      </div>
  actions:
    - text: Get Started
      link: /api/readme/
      icon: right-arrow
      variant: primary
    - text: View on GitHub
      link: https://github.com/dawsbot/essential-eth
      variant: secondary
      icon: external
---

<div class="bundle-comparison">
  <h2>🚀 Up to 20× Smaller Bundle Size</h2>
  <p style="font-size: 1.1rem; color: var(--ee-text-2); margin: 1rem 0 2rem; position: relative; z-index: 1;">
    Essential Eth is laser-focused on performance. Ship less JavaScript, load faster, delight your users.
  </p>
  <div class="bundle-stats">
    <div class="stat-item">
      <div class="stat-number">8KB</div>
      <div class="stat-label">Essential Eth</div>
    </div>
    <div class="stat-item">
      <div class="stat-number">160KB</div>
      <div class="stat-label">ethers.js v5</div>
    </div>
  </div>
</div>

<div class="features-section">
  <h2 class="features-heading">Why Essential Eth?</h2>
  <div class="feature-grid">
    <div class="feature-card">
      <div class="feature-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
      </div>
      <h3>Blazing Fast</h3>
      <p>Tree-shakeable ESM modules mean you only ship what you use. Up to 20× smaller than alternatives—your users will notice the difference.</p>
    </div>
    
    <div class="feature-card">
      <div class="feature-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
      </div>
      <h3>Drop-in Compatible</h3>
      <p>Familiar ethers.js API surface. Migrate incrementally without breaking changes or rewriting your entire codebase.</p>
    </div>
    
    <div class="feature-card">
      <div class="feature-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      </div>
      <h3>TypeScript First</h3>
      <p>100% TypeScript with complete type coverage. Catch errors at compile time and enjoy best-in-class autocomplete.</p>
    </div>
    
    <div class="feature-card">
      <div class="feature-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      </div>
      <h3>Zero Config Providers</h3>
      <p>JsonRpcProvider, FallthroughProvider, and AlchemyProvider work out of the box with sensible, production-ready defaults.</p>
    </div>
    
    <div class="feature-card">
      <div class="feature-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
      </div>
      <h3>Complete Toolkit</h3>
      <p>Everything you need: addresses, ABIs, hashing, encoding, unit conversion, ENS resolution, and contract interactions in one package.</p>
    </div>
    
    <div class="feature-card">
      <div class="feature-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
      </div>
      <h3>Battle Tested</h3>
      <p>Comprehensive test suite with 100% coverage. Trusted in production by teams building the future of Ethereum.</p>
    </div>
  </div>
</div>

<div class="install-section">
  <code class="install-command">npm install essential-eth</code>
</div>
