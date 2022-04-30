// import fs from 'fs';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const stats = require('../../out.json');

const functions = stats.groups.find((g) => g.title === 'Functions').children;

let functionsMarkdown = '';
functions.map((functionNumber) => {
  const child = stats.children.find((child) => child.id === functionNumber);

  const { name } = child; // zeroPad
  const { fileName, line } = child.sources[0];

  const sig = child.signatures[0];
  const parameters = sig.parameters;
  let returnType = sig.type.name;
  if (sig.type.type === 'union') {
    returnType = sig.type.types
      .map((type) => {
        const typeName = type.value === null ? 'null' : type.name;
        return String(typeName);
      })
      .join(' | ');
  }

  const paramsString = parameters
    .map((parameter) => {
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
      return `${parameter.name}: ${parameterType}`;
    })
    .join(', ');
  functionsMarkdown += `#### [\`${name}\`](${fileName}#L${line})
  \`\`\`typescript
  ${name}(${paramsString}): ${returnType}
  \`\`\`

`;
});

module.exports = {
  functionsMarkdown,
};
// fs.writeFileSync('/tmp/out.md', toReturn);
