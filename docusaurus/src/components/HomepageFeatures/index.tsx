import CodeBlock from '@theme/CodeBlock';
import clsx from 'clsx';
import React from 'react';
import Link from '@docusaurus/Link';
import HomepageContributions from '../Contributions';

interface FeatureItem {
  title: string;
  src: string;
  description: JSX.Element;
}

const FeatureList: FeatureItem[] = [
  {
    title: 'Lite',
    src: '/img/feather.png',
    description: (
      <>
        Essential Eth was designed from the ground up to be <strong>20x smaller than
        ethers.js and web3.js.</strong> This compact form facilitates quicker setups and optimizes storage.
      </>
    ),
  },
  {
    title: 'Supports Decentralization',
    src: '/img/globe.png',
    description: (
      <>
        Choosing Essential Eth means more than using a lean and efficient tool - it 
        supports Ethereum's decentralized tech stack. This library diversifies front-end tools, 
        echoing Ethereum's multi-client approach and mitigating risks tied to ecosystem single library reliance.
      </>
    ),
  },
  {
    title: 'Fast',
    src: '/img/high-voltage.png',
    description: (
      <>
        The bundle size of essential-eth is <strong>less than 5kb</strong> for
        most functions. Smaller bundles mean faster load times, 
        leading to a more responsive and efficient user experience.{' '}
        <a
          href="https://bundlephobia.com/package/essential-eth"
          target="_blank"
        >
          See for yourself
        </a>
      </>
    ),
  },
  {
    title: 'Tested and Typed',
    src: '/img/test-tube.png',
    description: (
      <>
        Thanks to Essential Eth's slim codebase, fortified by full TypeScript integration and 
        Jest testing, bugs have nowhere to hide – ensuring a delightful coding experience.
      </>
    ),
  },
  {
    title: 'Easy to Try',
    src: '/img/sparkles.png',
    description: (
      <>
        Essential Eth matches the API of ethers.js as closely as possible. This
        is also similar to web3.js, so upgrading is a breeze.
      </>
    ),
  },
  {
    title: 'Ready for Production',
    src: '/img/crossed-swords.png',
    description: (
      <>
        The reliability and stability of Essential Eth are clearly demonstrated by its extensive 
        real-world usage. It is used in production by over 100,000 visitors per month on{' '}
        <a href="https://earni.fi" target="_blank">
          Earnifi 🚁
        </a>
      </>
    ),
  },
];

function Feature({ title, src, description }: FeatureItem) {
  return (
    <div className={clsx('glossy-border bottomMargin set-width ')}>
      <div className="text--center">
        <img src={src} style={{ height: '120px', paddingBottom: '20px' }} />
      </div>
      <div className={'text--center padding-horiz--md'}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <>
      <div className={clsx('feature-row')}>
        <section className={clsx('feature-section')}>
          <div className="container">
            <div className="row" style={{ justifyContent: 'center' }}>
              {FeatureList.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </section>
      </div>
      <section className="secondaryBackground">
        <HomepageContributions />
      </section>
      <br />
      <br />
      <div className={clsx('text-margin')}  id="core-features" >
        <h1 style={{fontSize: '40px'}}> Core Features</h1>
        <p style={{fontSize: '18px'}}>Welcome to the Essential Eth library! Designed for both seasoned developers
         and those new to the Ethereum blockchain, Essential Eth provides easy-to-use functions for all your 
         development needs. In the following section, we've outlined some of the most popular features of the library 
         along with simple examples to get you started:</p>
  
        <h2 style={{fontSize: '28px'}}>Utils 🔧 </h2>
        <p style={{fontSize: '18px', lineHeight: '1.6'}}>The Utils module is your go-to for common Ethereum needs.
         Whether you're converting between Ether and Wei or validating Ethereum addresses, Utils has you covered.
          Check out these examples:</p>
  
        <h3 style={{fontSize: '24px'}}>etherToWei and weiToEther 💸 </h3>
        <p style={{fontSize: '16px'}}>These functions allow you to easily convert between the two standard units 
        of ether: Ether and Wei. Much like dollars and cents, Ether is often used for high-level transactions, 
        while Wei is the smallest possible unit of the currency, ideal for precision.</p>
        <CodeBlock language="typescript">
          {`import { etherToWei, weiToEther } from 'essential-eth';
            
            weiToEther(1000000000000000000).toNumber();
            // returns: 1
  
            etherToWei('1000').toString();
            // returns: '1000000000000000000000'
          `}
        </CodeBlock>
        <br />
  
        <h3 style={{fontSize: '24px'}}>isAddress ✅ </h3>
        <p style={{fontSize: '16px'}}>The 'isAddress' function validates Ethereum addresses. It checks whether the 
        input string meets the formatting rules for a valid Ethereum address, which is essential for preventing errors 
        during transactions.</p>
        <CodeBlock language="typescript">
          {`import { isAddress } from 'essential-eth';
  
            isAddress('0xc0deaf6bd3f0c6574a6a625ef2f22f62a5150eab');
            // returns: true
  
            isAddress('bad');
            // returns: false
          `}
        </CodeBlock>
        <br />
  
        <h3 style={{fontSize: '24px'}}>toChecksumAddress 🔑</h3>
        <p style={{fontSize: '16px'}}>The 'toChecksumAddress' function converts an Ethereum address to a checksum address.
         Checksum addresses include a mix of capital and lowercase letters, which can help prevent errors due to typos and 
         incorrect input.</p>
        <CodeBlock language="typescript">
          {`import { toChecksumAddress } from 'essential-eth';
  
            toChecksumAddress('0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359');
            // returns: '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359'
          `}
        </CodeBlock>
  
        <div>
          <Link
            className="button button--secondary button--lg"
            to="/docs/api/modules#functions"
          >
            View All Utils
          </Link>
        </div>
        <br />
        <br />
        <h2 style={{fontSize: '28px'}}>Providers 🌐 </h2>
        <p style={{fontSize: '18px', lineHeight: '1.6'}}>A provider is a connection to an Ethereum node that allows you to communicate with the network. 
        It serves as an interface between your application and the blockchain. Providers handle the underlying protocol and provide methods to interact 
        with the Ethereum network, such as sending transactions, retrieving account balances, and querying contract data.
       </p>
        <h3 style={{fontSize: '24px'}}>JsonRpcProvider 📡 </h3>
        <p style={{ fontSize: '18px', lineHeight: '1.6' }}>
        The JsonRpcProvider module provides a straightforward way to 
        interact with Ethereum nodes. Whether you're querying account balances or performing other operations, JsonRpcProvider 
        simplifies the process. Here's an example of how to use it:
        </p>
  
        <CodeBlock language="typescript">
          {`import { JsonRpcProvider } from 'essential-eth';
            
            const provider = new JsonRpcProvider();
            await provider
            .getBalance('0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8')
            .then((balance) => console.log(balance.toString()));
            // returns: "28798127851528138"
          `}
        </CodeBlock>
        <br />
  
        <h3 style={{fontSize: '24px'}}>FallthroughProvider 🔄 </h3>
        <p style={{fontSize: '18px', lineHeight: '1.6'}}>The FallthroughProvider is designed for reliability. If one Ethereum node 
        fails to respond, it automatically switches to the next provided URL. This guarantees that your application remains functional, 
        even if individual nodes become unresponsive. Here's an example:</p>
  
        <CodeBlock language="typescript">
          {`import { FallthroughProvider } from 'essential-eth';
            
            // The FallthroughProvider handles falling through to the next valid URL.
            // It's dynamic to never trust one URL again when it fails * until it has tried all other provided URLs
            // The default timeout for a request is 8 seconds after which it moves to the next URL
            const provider = new FallthroughProvider([
            'https://bad.com',
            'https://free-eth-node.com/api/eth',
            ]);
            provider.getGasPrice().toNumber();
            // returns: 39695942769
          `}
        </CodeBlock>

        <br />
        <Link
          className="button button--secondary button--lg"
          to="/docs/api"
        >
          View Full API
        </Link>
        <br />
        <br />
      </div>
    </>
  );    
}