import React from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';
import CodeBlock from '@theme/CodeBlock';
import Link from '@docusaurus/Link';

function GettingStarted() {
  return (
    <Layout title="Getting Started">
      <div className={clsx('text-margin')}>
        <h1 style={{ fontSize: '40px' }}>🪶 Getting Started with Essential Eth 🪶</h1>
        <p style={{ fontSize: '18px' }}>Ready to start building on Ethereum? This guide will help you hit the ground running.</p>

        <h2 style={{ fontSize: '24px' }}>What is Essential Eth?</h2>
        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
          Essential Eth is a TypeScript front-end library for Ethereum. Just as the C++ iostream standard library provides ready-made
          functions and tools to interact with a computer's input and output devices, Essential Eth equips developers with pre-built
          functions and components to seamlessly connect their applications with the Ethereum blockchain nodes.
        </p>

        <h2 style={{ fontSize: '24px' }}>What is Bundle Size and why is it important?</h2>
        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
          Bundle size is a term in web development that refers to the total size of the files that are sent to a user's browser when they
          visit your website. It's important because it can affect your website's load time, data usage, search engine ranking, and battery
          drain on mobile devices. Essential Eth is designed with a minimalist modular architecture that achieves a bundle size of 32kb,
          compared to ethers' bundle size of 128kb. Plus, Essential Eth is tree-shaking, which means only the modules you use are included in your final bundle. 🌳✂️
        </p>

        <h2 style={{ fontSize: '28px' }}>Installation ⚙️</h2>
        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
          Before you can start using the Essential Eth library, you need to install it into your project. But before we dive into that, let's talk a bit about npm and yarn.
        </p>

        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
          <a href="https://docs.npmjs.com/about-npm" target="_blank" rel="noreferrer noopener">npm</a> (Node Package Manager) and <a href="https://yarnpkg.com/getting-started/install" target="_blank" rel="noreferrer noopener">Yarn</a> are two popular package managers used for installing Node.js packages (like Essential Eth). If you don't already have one of these installed, click on their names to go to their respective installation guides.
        </p>

        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
          Once you've installed either npm or yarn, you can use one of the following commands to install Essential Eth:
        </p>

        <CodeBlock language="shell">
          {`npm install --save essential-eth # TypeScript included

# or yarn

yarn add essential-eth # TypeScript included`}
        </CodeBlock>

        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
          For use directly in browsers, you can include Essential Eth via a script tag in your HTML file. This is handy if you're not using a module bundler like webpack or parcel in your project. 
          Here's how to do it:
        </p>

        <CodeBlock language="html">
          {`<!-- index.html -->
<script src="https://unpkg.com/essential-eth@0.9.0"></script>`}
        </CodeBlock>

        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
          The code above adds a script tag to your HTML that points to a specific version of Essential Eth hosted on Unpkg, a popular CDN for npm packages. After this script tag is processed by the browser, the Essential Eth library will be available globally in your JavaScript code.
        </p>

        <p style={{ fontSize: '18px' }}>
          Now that we've installed Essential Eth, let's get familiar with some of its core features. Check out the <Link to="/#core-features">Core Features</Link> for more information.
        </p>
      </div>
    </Layout>
  );
}

export default GettingStarted;
