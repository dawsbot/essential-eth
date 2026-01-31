import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import starlightTypeDoc, { typeDocSidebarGroup } from 'starlight-typedoc';

export default defineConfig({
  site: 'https://eeth.dev',
  integrations: [
    starlight({
      title: 'Essential Eth',
      social: {
        github: 'https://github.com/dawsbot/essential-eth',
      },
      customCss: ['./src/styles/custom.css'],
      plugins: [
        starlightTypeDoc({
          entryPoints: ['../src/index.ts'],
          tsconfig: '../tsconfig.docs.json',
          sidebar: {
            label: 'API Reference',
            collapsed: true,
          },
        }),
      ],
      sidebar: [
        { label: 'Getting Started', link: '/api/readme/' },
        {
          label: 'Providers',
          items: [
            {
              label: 'JsonRpcProvider',
              link: '/api/classes/jsonrpcprovider/',
            },
            {
              label: 'FallthroughProvider',
              link: '/api/classes/fallthroughprovider/',
            },
            {
              label: 'AlchemyProvider',
              link: '/api/classes/alchemyprovider/',
            },
          ],
        },
        typeDocSidebarGroup,
      ],
    }),
  ],
});
