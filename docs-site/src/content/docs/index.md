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
      <div class="eth-diamond-wrap">
        <div class="eth-glow"></div>
        <svg class="eth-diamond" viewBox="0 0 256 417" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
          <g>
            <polygon fill="#8C8C8C" fill-opacity=".6" points="127.962 0 125.166 9.5 125.166 285.168 127.962 287.958 255.903 212.32"/>
            <polygon fill="#B8B8B8" fill-opacity=".6" points="127.962 0 0 212.32 127.962 287.958 127.962 154.158"/>
            <polygon fill="#8C8C8C" fill-opacity=".6" points="127.962 312.187 126.386 314.107 126.386 412.698 127.962 416.905 255.999 236.587"/>
            <polygon fill="#B8B8B8" fill-opacity=".6" points="127.962 416.905 127.962 312.187 0 236.587"/>
            <polygon fill="#5F5F5F" fill-opacity=".6" points="127.962 287.958 255.903 212.32 127.962 154.158"/>
            <polygon fill="#8C8C8C" fill-opacity=".6" points="0 212.32 127.962 287.958 127.962 154.158"/>
          </g>
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

<div class="features-section">
  <h2 class="features-heading">Why Essential Eth?</h2>
  <div class="feature-grid">
    <div class="feature-card">
      <div class="feature-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
      </div>
      <h3>Tiny Bundle</h3>
      <p>Up to 20x smaller than ethers.js. Tree-shakeable ESM so you only ship the code you actually use.</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
      </div>
      <h3>Drop-in Compatible</h3>
      <p>Matches the ethers.js API surface. Migrate gradually without rewriting your application.</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      </div>
      <h3>TypeScript First</h3>
      <p>Written in TypeScript with full type coverage. Catch errors at compile time, not in production.</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      </div>
      <h3>Zero Config Providers</h3>
      <p>JsonRpcProvider, FallthroughProvider, and AlchemyProvider ready out of the box with sensible defaults.</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
      </div>
      <h3>Complete Toolkit</h3>
      <p>Addresses, ABIs, hashing, encoding, unit conversion, ENS resolution, and contract interactions in one package.</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>
      </div>
      <h3>Battle Tested</h3>
      <p>Thorough test suite with 100% coverage. Trusted in production by teams building on Ethereum.</p>
    </div>
  </div>
</div>

<div class="install-section">
  <code class="install-command">npm install essential-eth</code>
</div>
