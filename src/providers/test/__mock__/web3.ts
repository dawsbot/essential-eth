// mock functions go here
const mockEthGetBalance = jest.fn();

// mock implementations
export default jest.fn().mockImplementation(() => ({
  eth: {
    getBalance: mockEthGetBalance,
  },
}));

// export the mock functions to control their behavior in tests
export const mockFunctions = {
  ethGetBalance: mockEthGetBalance,
};
