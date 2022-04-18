export function solidityKeccak256(
  types: ReadonlyArray<string>,
  values: ReadonlyArray<any>,
): string {
  if (types.length != values.length) {
    throw new Error(
      `Number of types and values should be the same. (types=${types.toString()}, values=${values.toString()})`,
    );
  }

  const tight: Array<Uint8Array> = [];
  types.forEach((type, index) => {
    tight.push();
  });

  // make sure types and values are same length
  // create new Uint8Array
  // concat array and turn into hex
  return '';
}
