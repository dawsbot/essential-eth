'use strict';

const HEAVY_LIBRARIES = ['ethers', 'viem'];

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Warn when importing from heavy Ethereum libraries that may have lighter essential-eth alternatives',
      category: 'Best Practices',
      recommended: true,
    },
    messages: {
      noHeavyImports:
        "Importing from '{{source}}' adds significant bundle weight. Check if 'essential-eth' has a lighter alternative for: {{imports}}.",
    },
    schema: [],
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        const source = node.source.value;

        // Only flag direct imports from the top-level library
        if (!HEAVY_LIBRARIES.includes(source)) {
          return;
        }

        const importedNames = node.specifiers
          .filter((s) => s.type === 'ImportSpecifier')
          .map((s) => s.imported.name);

        // Also flag default/namespace imports
        const hasDefaultOrNamespace = node.specifiers.some(
          (s) =>
            s.type === 'ImportDefaultSpecifier' ||
            s.type === 'ImportNamespaceSpecifier',
        );

        if (importedNames.length === 0 && !hasDefaultOrNamespace) {
          return;
        }

        const imports =
          importedNames.length > 0
            ? importedNames.join(', ')
            : hasDefaultOrNamespace
              ? '(entire library)'
              : '';

        context.report({
          node,
          messageId: 'noHeavyImports',
          data: {
            source,
            imports,
          },
        });
      },
    };
  },
};
