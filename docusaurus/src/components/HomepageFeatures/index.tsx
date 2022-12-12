import CodeBlock from '@theme/CodeBlock';
import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.css';
// organize-imports-ignore
import * as ee from '../../../../src/index';
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
    src: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/325/feather_1fab6.png',
    description: (
      <>
        Essential Eth was designed from the ground up to be 20x smaller than
        ethers.js and web3.js.
      </>
    ),
  },
  {
    title: 'Fast',
    src: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/325/high-voltage_26a1.png',
    description: (
      <>
        The bundle size of essential-eth is <strong>less than 5kb</strong> for
        most functions.{' '}
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
    src: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/325/test-tube_1f9ea.png',
    description: (
      <>
        With full TypeScript integration and jest tests, you can enjoy fewer
        bugs and a more delightful coding experience.
      </>
    ),
  },
  {
    title: 'Easy to Try',
    src: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/325/sparkles_2728.png',
    description: (
      <>
        Essential Eth matches the API of ethers.js as-closely as possible. This
        is also similar to web3.js, so upgrading is a breeze.
      </>
    ),
  },
  {
    title: 'Ready for Production',
    src: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/google/313/crossed-swords_2694-fe0f.png',
    description: (
      <>
        Used in production by over 100,000 visitors per month on{' '}
        <a href="https://earni.fi" target="_blank">
          Earnifi
        </a>
      </>
    ),
  },
];

function Feature({ title, src, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
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
      <section className={styles.features}>
        <div className="container">
          <section className={styles.features} style={{ marginTop: '80px' }}>
            <div className="container">
              <div className="row" style={{ justifyContent: 'center' }}>
                {FeatureList.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
          <HomepageContributions />
          <br />
          <br />
          <h2>Utils</h2>
          <CodeBlock language="typescript">
            {`import { etherToWei, weiToEther } from 'essential-eth';

weiToEther(1000000000000000000).toNumber();
// 1

etherToWei('1000').toString();
// '1000000000000000000000'
`}
          </CodeBlock>
          <br />
          <CodeBlock language="typescript">
            {`import { isAddress } from 'essential-eth';

isAddress('0xc0deaf6bd3f0c6574a6a625ef2f22f62a5150eab');
// true

isAddress('bad');
// false
`}
          </CodeBlock>
          <br />
          <CodeBlock language="typescript">
            {`import { toChecksumAddress } from 'essential-eth';

toChecksumAddress('0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359');
// '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359'
`}
          </CodeBlock>
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/api/modules#functions"
            >
              View All Utils
            </Link>
          </div>
          <br />
          <br />
          <h2 style={{ marginTop: '160px' }}>JsonRpcProvider</h2>
          <CodeBlock language="typescript">
            {`import { JsonRpcProvider } from 'essential-eth';

const provider = new JsonRpcProvider();
await provider
  .getBalance('0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8')
  .then((balance) => console.log(balance.toString()));
// "28798127851528138"
`}
          </CodeBlock>
          <br />
          <h2 style={{ marginTop: '100px' }}>FallthroughProvider</h2>
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
/*
39695942769
*/
`}
          </CodeBlock>
          <br />
          <div className={styles.buttons}>
            <Link
              className="button button--secondary button--lg"
              to="/docs/api"
            >
              View Full API
            </Link>
          </div>
          <br />
          <br />
        </div>
      </section>
    </>
  );
}
