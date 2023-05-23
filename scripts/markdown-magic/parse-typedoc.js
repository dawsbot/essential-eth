/**
 * Parse a typedoc output file and generate the markdown code
 * This markdown generated is injected into the root readme via markdown-magic
 */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const stats = require('./typedoc.out.json');

const functions = stats.groups.find((g) => g.title === 'Functions').children;

let functionsMarkdown = '';
let providerMarkdown = '';

class FunctionSignature {
  constructor(signature) {
    this.signature = signature;
  }
  selectParameters() {
    return this.signature.parameters;
  }
  selectSignatureType() {
    return this.signature.type;
  }
  selectExamples() {
    return this.signature.comment.blockTags
      ?.filter((item) => item.tag === '@example')
      ?.flatMap((item) => item.content.map((obj) => `${obj.text}\n`));
  }
}
functions.map((functionNumber) => {
  const child = stats.children.find((child) => child.id === functionNumber);

  const { name } = child; // zeroPad

  // const sig = child.signatures[0];
  const signature = new FunctionSignature(child.signatures[0]);
  const signatureType = signature.selectSignatureType();
  let returnType = signatureType.name;
  let parameters = signature.selectParameters();

  const examples = signature.selectExamples();
  if (signatureType === 'union') {
    returnType = signatureType?.types
      ?.map((type) => {
        const typeName = type.value === null ? 'null' : type.name;
        return String(typeName);
      })
      .join(' | ');
  }

  const paramsString = parameters
    ?.map((parameter) => {
      let parameterType = parameter.type.name;

      // array types (like "number[]")
      if (parameter.type.type === 'typeOperator') {
        parameterType = `Array<${parameter.type.target.elementType.name}>`;
      }

      // Type unions (like "number | string")
      if (parameter.type.type === 'union') {
        parameterType = parameter.type.types
          .map((type) => type.name)
          .join(' | ');
      }
      const separator = parameter.defaultValue ? '?:' : ':';
      return `${parameter.name}${separator} ${parameterType}`;
    })
    .join(', ');
  const examplesMarkdown = examples
    ? `
  <details>
  <summary>View Example</summary>

  \`\`\`js
  import { ${name} } from 'essential-eth';
  \`\`\`

  ${examples.join('')}
  </details>\n`
    : '';

  functionsMarkdown += `#### [\`${name}\`](https://eeth.dev/docs/api/modules#${name.toLowerCase()})
  \`\`\`typescript
  ${name}(${paramsString || ''}): ${returnType}
  \`\`\`
  ${examplesMarkdown}
  <br/>

`;
});

// end functions, start of rpc

const jsonRpcProvider = stats.children.find(
  (child) => child.name === 'JsonRpcProvider',
);
const fallthroughProvider = stats.children.find(
  (child) => child.name === 'FallthroughProvider',
);

// verify these two classes have the same children
function requireSameClassChildren(class1, class2) {
  class1.children.forEach((child) => {
    const { name } = child;
    const match = class2.children.find((fallthroughProviderChild) => {
      return fallthroughProviderChild.name === name;
    });
    if (!match) {
      throw new Error(
        `JsonRpcProvider has "${name}" fn that is not found in FallthroughProvider`,
      );
    }
  });
}

requireSameClassChildren(jsonRpcProvider, fallthroughProvider);

jsonRpcProvider.children
  .filter((child) => {
    // filters out the constructor
    return child.kindString === 'Method';
  })
  .map((childSignature) => {
    const name = childSignature.name;
    const signature = new FunctionSignature(childSignature.signatures[0]);
    const signatureType = signature.selectSignatureType();
    let returnType = signatureType.name;
    let parameters = signature.selectParameters();

    const examples = signature.selectExamples();
    if (returnType === 'Promise') {
      const typeArgument = signatureType.typeArguments[0];
      returnType = typeArgument.name;
      if (typeArgument.type === 'array') {
        returnType = `Array<${typeArgument.elementType.name}>`;
      }
      returnType = `Promise<${returnType}>`;
    } else if (signatureType === 'union') {
      returnType = signatureType?.types
        ?.map((type) => {
          const typeName = type.value === null ? 'null' : type.name;
          return String(typeName);
        })
        .join(' | ');
    }

    const paramsString = parameters
      ?.map((parameter) => {
        let parameterType = parameter.type.name;

        // array types (like "number[]")
        if (parameter.type.type === 'typeOperator') {
          parameterType = `Array<${parameter.type.target.elementType.name}>`;
        }

        // Type unions (like "number | string")
        if (parameter.type.type === 'union') {
          parameterType = parameter.type.types
            .map((type) => type.name)
            .join(' | ');
        }
        const separator = parameter.defaultValue ? '?:' : ':';
        return `${parameter.name}${separator} ${parameterType}`;
      })
      .join(', ');
    const examplesMarkdown = examples
      ? `
  <details>
  <summary>View Example</summary>

  \`\`\`js
  import { JsonRpcProvider } from 'essential-eth';
  const provider = new JsonRpcProvider(
    'RPC URL HERE' /* Try Infura or POKT */,
  );
  \`\`\`

  ${examples.join('')}
  </details>\n`
      : '';

    providerMarkdown += `#### [\`${name}\`](https://eeth.dev/docs/api/classes/JsonRpcProvider#${name.toLowerCase()})
  \`\`\`typescript
  provider.${name}(${paramsString || ''}): ${returnType}
  \`\`\`
  ${examplesMarkdown}
  <br/>

`;
  });

module.exports = {
  functionsMarkdown,
  providerMarkdown,
};
