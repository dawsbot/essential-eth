// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Essential Eth',
  tagline: "🪶 A replacement for ethers & web3 that's 50x smaller",
  url: 'https://your-docusaurus-test-site.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon:
    'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/325/feather_1fab6.png',
  organizationName: 'earnifi', // Usually your GitHub org/user name.
  projectName: 'essential-eth', // Usually your repo name.
  plugins: [
    [
      'docusaurus-plugin-typedoc',

      // Plugin / TypeDoc options
      {
        entryPoints: ['../src/index.ts'],
        tsconfig: '../tsconfig.json',
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Essential Eth',
        logo: {
          alt: 'My Site Logo',
          src: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/apple/325/feather_1fab6.png',
        },
        items: [
          {
            type: 'doc',
            docId: 'api/index',
            position: 'left',
            label: 'API',
          },
          {
            href: 'pathname:///docs/api/modules#functions',
            label: 'utils',
            position: 'left',
          },
          {
            href: 'pathname:///docs/api/classes/JsonRpcProvider',
            label: 'providers',
            position: 'left',
          },
          {
            href: 'https://github.com/earnifi/essential-eth',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Navigation',
            items: [
              {
                label: 'Home',
                href: '/',
              },
              {
                label: 'API',
                href: '/docs/api',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Twitter',
                href: 'https://twitter.com/earni_fi',
              },
              {
                label: 'Contribute on GitHub',
                href: 'https://github.com/earnifi',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Earnifi Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
