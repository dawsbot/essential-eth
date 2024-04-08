/**
 * Helper function for mocking other functions.
 *
 * @param fn
 * @example mockOf(stripe.checkout.sessions.create).mockResolvedValue(mockSession);
 * @see https://twitter.com/scastiel/status/1631354119192473601?s=20
 */
export const mockOf = <
  FunctionParameters extends unknown[],
  FunctionReturnType,
>(
  fn: (...args: FunctionParameters) => FunctionReturnType,
) => fn;
