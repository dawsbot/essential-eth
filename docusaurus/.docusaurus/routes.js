import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/getting_started',
    component: ComponentCreator('/getting_started', '233'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', 'dbe'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '029'),
    routes: [
      {
        path: '/docs/api/',
        component: ComponentCreator('/docs/api/', '733'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/classes/AlchemyProvider',
        component: ComponentCreator('/docs/api/classes/AlchemyProvider', '74b'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/classes/BaseContract',
        component: ComponentCreator('/docs/api/classes/BaseContract', '738'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/classes/Contract',
        component: ComponentCreator('/docs/api/classes/Contract', '356'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/classes/FallthroughProvider',
        component: ComponentCreator('/docs/api/classes/FallthroughProvider', '9cf'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/classes/JsonRpcProvider',
        component: ComponentCreator('/docs/api/classes/JsonRpcProvider', 'd8e'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/functions/arrayify',
        component: ComponentCreator('/docs/api/functions/arrayify', 'a2e'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/functions/computeAddress',
        component: ComponentCreator('/docs/api/functions/computeAddress', 'cb0'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/functions/computePublicKey',
        component: ComponentCreator('/docs/api/functions/computePublicKey', '98d'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/functions/concat',
        component: ComponentCreator('/docs/api/functions/concat', '4f6'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/functions/decodeBytes32String',
        component: ComponentCreator('/docs/api/functions/decodeBytes32String', 'e22'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/functions/encodeBytes32String',
        component: ComponentCreator('/docs/api/functions/encodeBytes32String', 'ffc'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/functions/etherToGwei',
        component: ComponentCreator('/docs/api/functions/etherToGwei', 'ad8'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/functions/etherToWei',
        component: ComponentCreator('/docs/api/functions/etherToWei', '2f7'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/functions/formatUnits',
        component: ComponentCreator('/docs/api/functions/formatUnits', '066'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/functions/getAddress',
        component: ComponentCreator('/docs/api/functions/getAddress', '84c'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/functions/gweiToEther',
        component: ComponentCreator('/docs/api/functions/gweiToEther', '005'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/functions/hashMessage',
        component: ComponentCreator('/docs/api/functions/hashMessage', '84d'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/functions/hexConcat',
        component: ComponentCreator('/docs/api/functions/hexConcat', 'e07'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/functions/hexDataLength',
        component: ComponentCreator('/docs/api/functions/hexDataLength', '9b4'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/functions/hexDataSlice',
        component: ComponentCreator('/docs/api/functions/hexDataSlice', '738'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/functions/hexlify',
        component: ComponentCreator('/docs/api/functions/hexlify', 'a3a'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/functions/hexStripZeros',
        component: ComponentCreator('/docs/api/functions/hexStripZeros', '975'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/functions/hexValue',
        component: ComponentCreator('/docs/api/functions/hexValue', '3a5'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/functions/hexZeroPad',
        component: ComponentCreator('/docs/api/functions/hexZeroPad', 'dd2'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/functions/id',
        component: ComponentCreator('/docs/api/functions/id', '21f'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/functions/isAddress',
        component: ComponentCreator('/docs/api/functions/isAddress', '27f'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/functions/isBytes',
        component: ComponentCreator('/docs/api/functions/isBytes', '6f9'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/functions/isBytesLike',
        component: ComponentCreator('/docs/api/functions/isBytesLike', '92e'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/functions/isHexString',
        component: ComponentCreator('/docs/api/functions/isHexString', 'b86'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/functions/jsonRpcProvider',
        component: ComponentCreator('/docs/api/functions/jsonRpcProvider', '234'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/functions/keccak256',
        component: ComponentCreator('/docs/api/functions/keccak256', 'c14'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/functions/namehash',
        component: ComponentCreator('/docs/api/functions/namehash', '600'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/functions/pack',
        component: ComponentCreator('/docs/api/functions/pack', '76e'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/functions/parseUnits',
        component: ComponentCreator('/docs/api/functions/parseUnits', 'b59'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/functions/solidityKeccak256',
        component: ComponentCreator('/docs/api/functions/solidityKeccak256', '05f'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/functions/splitSignature',
        component: ComponentCreator('/docs/api/functions/splitSignature', '8e0'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/functions/stripZeros',
        component: ComponentCreator('/docs/api/functions/stripZeros', 'b33'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/functions/toChecksumAddress',
        component: ComponentCreator('/docs/api/functions/toChecksumAddress', '924'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/functions/toUtf8Bytes',
        component: ComponentCreator('/docs/api/functions/toUtf8Bytes', '0c1'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/functions/toUtf8String',
        component: ComponentCreator('/docs/api/functions/toUtf8String', 'd68'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/functions/weiToEther',
        component: ComponentCreator('/docs/api/functions/weiToEther', '122'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/functions/zeroPad',
        component: ComponentCreator('/docs/api/functions/zeroPad', '8dc'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/globals',
        component: ComponentCreator('/docs/api/globals', 'c43'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/interfaces/ConstructorOptions',
        component: ComponentCreator('/docs/api/interfaces/ConstructorOptions', 'f53'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/interfaces/DataOptions',
        component: ComponentCreator('/docs/api/interfaces/DataOptions', 'd69'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/interfaces/Filter',
        component: ComponentCreator('/docs/api/interfaces/Filter', 'f74'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/interfaces/FilterByBlockHash',
        component: ComponentCreator('/docs/api/interfaces/FilterByBlockHash', 'ee2'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/interfaces/Hexable',
        component: ComponentCreator('/docs/api/interfaces/Hexable', '4be'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/interfaces/JSONABIArgument',
        component: ComponentCreator('/docs/api/interfaces/JSONABIArgument', '446'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/interfaces/Network',
        component: ComponentCreator('/docs/api/interfaces/Network', '782'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/interfaces/RPCBlock',
        component: ComponentCreator('/docs/api/interfaces/RPCBlock', 'fc1'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/interfaces/RPCLog',
        component: ComponentCreator('/docs/api/interfaces/RPCLog', '779'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/interfaces/RPCTransaction',
        component: ComponentCreator('/docs/api/interfaces/RPCTransaction', '782'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/interfaces/RPCTransactionReceipt',
        component: ComponentCreator('/docs/api/interfaces/RPCTransactionReceipt', '62d'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/interfaces/RPCTransactionRequest',
        component: ComponentCreator('/docs/api/interfaces/RPCTransactionRequest', 'd6f'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/interfaces/Signature',
        component: ComponentCreator('/docs/api/interfaces/Signature', 'fc0'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/interfaces/TransactionRequest',
        component: ComponentCreator('/docs/api/interfaces/TransactionRequest', '1da'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/modules',
        component: ComponentCreator('/docs/api/modules', 'd1e'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/type-aliases/BlockResponse',
        component: ComponentCreator('/docs/api/type-aliases/BlockResponse', '63e'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/type-aliases/BlockTag',
        component: ComponentCreator('/docs/api/type-aliases/BlockTag', '006'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/type-aliases/BlockTransactionResponse',
        component: ComponentCreator('/docs/api/type-aliases/BlockTransactionResponse', '5bd'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/type-aliases/Bytes',
        component: ComponentCreator('/docs/api/type-aliases/Bytes', '07f'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/type-aliases/BytesLike',
        component: ComponentCreator('/docs/api/type-aliases/BytesLike', '5d5'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/type-aliases/BytesLikeWithNumber',
        component: ComponentCreator('/docs/api/type-aliases/BytesLikeWithNumber', '5c2'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/type-aliases/ContractTypes',
        component: ComponentCreator('/docs/api/type-aliases/ContractTypes', 'bd5'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/type-aliases/JSONABI',
        component: ComponentCreator('/docs/api/type-aliases/JSONABI', '469'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/type-aliases/Log',
        component: ComponentCreator('/docs/api/type-aliases/Log', '031'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/type-aliases/SignatureLike',
        component: ComponentCreator('/docs/api/type-aliases/SignatureLike', '9f7'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/type-aliases/TransactionReceipt',
        component: ComponentCreator('/docs/api/type-aliases/TransactionReceipt', '788'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/type-aliases/TransactionResponse',
        component: ComponentCreator('/docs/api/type-aliases/TransactionResponse', 'c43'),
        exact: true,
        sidebar: "sidebar"
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'f73'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
