import clsx from 'clsx';
import React from 'react';
import Link from '@docusaurus/Link';

interface ContributeItem {
  title: string;
  src: string;
  description: JSX.Element;
}

const ContributeList: ContributeItem[] = [
  {
    title: 'GitPOAP - Recognition for Contributions ',
    src: 'https://www.gitpoap.io/_next/image?url=https%3A%2F%2Fassets.poap.xyz%2Fgitpoap3a-2022-essential-eth-contributor-2022-logo-1667245904706.png&w=2048&q=75',
    description: (
      <>
        In partnership with GitPOAP, Essential ETH wants to recognize &nbsp;
        <b>all</b> contributors for their contributions toward the growth of
        this library. Developers can validate their contributions on Github and
        showcase their GitPOAP as proof-of-work toward their Web3 identity.
      </>
    ),
  },
];

function Contribute({ title, src, description }: ContributeItem) {
  return (
    <div className={clsx('col--9 glossy-border contribute-container')}>
      <div className="text--center">
        <img
          src={src}
          className='contribute-img'
        />
      </div>
      <div
        className={'padding-horiz--md'}
        style={{ padding: '3rem' }}
      >
        <h3>{title}</h3>
        <p>{description}</p>
        <div>
          <Link
            className="button button--secondary button--md"
            to="https://www.gitpoap.io/"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function HomepageContributions(): JSX.Element {
  return (
    <>
      <section>
        <div className="container">
            <div className="contribute-container">
              <div
                className="row"
                style={{ justifyContent: 'center' }}
              >
                {ContributeList.map((props, idx) => (
                  <Contribute key={idx} {...props} />
                ))}
              </div>
            </div>
        </div>
      </section>
    </>
  );
}
