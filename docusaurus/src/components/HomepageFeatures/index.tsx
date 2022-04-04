import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.css';

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
        Essential Eth was designed from the ground up to be 50x smaller than
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
        Essential Eth matches the API of ethers.js and web3.js. Upgrading is a
        breeze.
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
    <section className={styles.features} style={{ marginTop: '80px' }}>
      <div className="container">
        <div className="row" style={{ justifyContent: 'center' }}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
