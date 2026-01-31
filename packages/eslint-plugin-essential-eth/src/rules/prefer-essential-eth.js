'use strict';

/**
 * Mapping of function names from ethers/viem to their essential-eth equivalents.
 * Key: import name from ethers or viem
 * Value: equivalent function name in essential-eth
 */
const FUNCTION_MAP = {
  formatUnits: 'formatUnits',
  parseUnits: 'parseUnits',
  getAddress: 'getAddress',
  isAddress: 'isAddress',
  keccak256: 'keccak256',
  formatEther: 'weiToEther',
  parseEther: 'etherToWei',
  toUtf8Bytes: 'toUtf8Bytes',
  toUtf8String: 'toUtf8String',
  hexlify: 'hexlify',
  isHexString: 'isHexString',
};

const HEAVY_LIBRARIES = ['ethers', 'viem'];

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Suggest essential-eth alternatives for known ethers/viem imports',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      preferEssentialEth:
        "'{{importName}}' from '{{source}}' can be replaced with '{{alternative}}' from 'essential-eth'. essential-eth is a much lighter library.",
    },
    schema: [],
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        const source = node.source.value;

        // Only check imports from ethers or viem (including subpaths like 'ethers/lib/utils')
        const isHeavyLibrary = HEAVY_LIBRARIES.some(
          (lib) => source === lib || source.startsWith(`${lib}/`),
        );

        if (!isHeavyLibrary) {
          return;
        }

        for (const specifier of node.specifiers) {
          if (specifier.type !== 'ImportSpecifier') {
            continue;
          }

          const importedName = specifier.imported.name;
          const alternative = FUNCTION_MAP[importedName];

          if (alternative) {
            context.report({
              node: specifier,
              messageId: 'preferEssentialEth',
              data: {
                importName: importedName,
                source,
                alternative,
              },
            });
          }
        }
      },
    };
  },
};
