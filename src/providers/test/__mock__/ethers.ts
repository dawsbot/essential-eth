// jest mock functions go here
const mockGetBalance = jest.fn();

// mock implementations
export const providers = {
  StaticJsonRpcProvider: jest.fn().mockImplementation(() => ({
    getBalance: mockGetBalance,
  })),
};

// export the mock functions to control their behavior in tests
export const mockFunctions = {
  getBalance: mockGetBalance,
};
