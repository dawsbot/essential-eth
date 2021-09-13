type JSPrimitiveTypes =
  | 'string'
  | 'number'
  | 'bigint'
  | 'boolean'
  | 'symbol'
  | 'undefined'
  | 'object'
  | 'function';

export const validateType = (
  value: unknown,
  allowedTypes: JSPrimitiveTypes[],
) => {
  if (!allowedTypes.includes(typeof value)) {
    throw new Error(
      `${allowedTypes.join(' or ')} required. Received ${typeof value}`,
    );
  }
};
