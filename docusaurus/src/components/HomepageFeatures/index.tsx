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
        Essential Eth was designed from the ground up to be minimal and fast.
        This brings web3 to emerging markets and slow internet connections.
      </>
    ),
  },
  {
    title: 'Easy to try',
    src: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/325/high-voltage_26a1.png',
    description: (
      <>
        Essential Eth matches the API of ethers.js and web3.js. Upgrading is a
        breeze.
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
];

function Feature({ title, src, description }: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img src={src} />
      </div>
      <div className="text--center padding-horiz--md">
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
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
