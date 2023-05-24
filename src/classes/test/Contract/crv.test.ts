import type { TinyBig } from '../../..';
import { JsonRpcProvider } from '../../../index';
import { rpcUrls } from '../../../providers/test/rpc-urls';
import { Contract as EssentialEthContract } from '../../Contract';
import { abi } from './crv-abi';

// The JSONABI
const JSONABI = abi;

const rpcURL = rpcUrls.mainnet;
const essentialEthProvider = new JsonRpcProvider(rpcURL);

// https://etherscan.io/address/0x575CCD8e2D300e2377B43478339E364000318E2c
const contractAddress = '0x575CCD8e2D300e2377B43478339E364000318E2c';

const essentialEthContract = new EssentialEthContract(
  contractAddress,
  JSONABI,
  essentialEthProvider,
);
describe('cRV contract', () => {
  const address = '0xf8cd644baf494d13406187cf8628754dca0a10c2';
  it('should fetch "uint256" balanceOf', async () => {
    const balanceOf = (await essentialEthContract.balanceOf(address, {
      gasLimit: 40955,
    })) as TinyBig;
    expect(balanceOf.toString()).toBe('6684485761284788581');
  });
  it('should fetch "uint256" total_claimed', async () => {
    const totalClaimed = (await essentialEthContract.total_claimed(
      address,
      {},
    )) as TinyBig;
    expect(totalClaimed.toString()).toBe('0');
    expect(totalClaimed.toNumber()).toBe(0);
  });
  it('should fetch "uint256" vested supply', async () => {
    const vestedSupply = (await essentialEthContract.vestedSupply({
      gasLimit: 40955,
    })) as TinyBig;
    expect(vestedSupply.toString()).toBe('151515151515151515151515151');
  });
  it('should fetch "uint256" locked supply', async () => {
    const lockedSupply = (await essentialEthContract.lockedSupply({
      gasLimit: 40955,
    })) as TinyBig;
    expect(lockedSupply.toString()).toBe('0');
  });
  it('should fetch "uint256" vested of', async () => {
    const vestedOf = (await essentialEthContract.vestedOf(address, {
      gasLimit: 40955,
    })) as TinyBig;
    expect(vestedOf.toString()).toBe('6684485761284788581');
  });
  it('should fetch "uint256" lockedOf', async () => {
    const lockedOf = (await essentialEthContract.lockedOf(address, {
      gasLimit: 40955,
    })) as TinyBig;
    expect(lockedOf.toString()).toBe('0');
  });
  it('should fetch "address" token', async () => {
    const token = await essentialEthContract.token({
      gasLimit: 40955,
    });
    expect(token).toBe('0xD533a949740bb3306d119CC777fa900bA034cd52');
  });
  it('should fetch "uint256" start_time', async () => {
    const startTime = (await essentialEthContract.start_time({
      gasLimit: 40955,
    })) as TinyBig;
    expect(startTime.toString()).toBe('1597357048');
  });
  it('should fetch "uint256" end_time', async () => {
    const endTime = (await essentialEthContract.end_time({
      gasLimit: 40955,
    })) as TinyBig;
    expect(endTime.toString()).toBe('1628893048');
  });
  it('should fetch "uint256" initial_locked', async () => {
    const initialLocked = (await essentialEthContract.initial_locked(address, {
      gasLimit: 40955,
    })) as TinyBig;
    expect(initialLocked.toString()).toBe('6684485761284788581');
  });
  it('should fetch "uint256" initial_locked_supply', async () => {
    const initialLockedSupply =
      (await essentialEthContract.initial_locked_supply({
        gasLimit: 40955,
      })) as TinyBig;
    expect(initialLockedSupply.toString()).toBe('151515151515151515151515151');
  });
  it('should fetch "uint256" unallocated_supply', async () => {
    const unallocatedSupply = (await essentialEthContract.unallocated_supply({
      gasLimit: 40955,
    })) as TinyBig;
    expect(unallocatedSupply.toString()).toBe('0');
  });
  it('should fetch "bool" can_disable', async () => {
    const canDisable = await essentialEthContract.can_disable({
      gasLimit: 40955,
    });
    expect(canDisable).toBe(false);
  });
  it('should fetch "uint256" disabled_at', async () => {
    const disabledAt = (await essentialEthContract.disabled_at(address, {
      gasLimit: 40955,
    })) as TinyBig;
    expect(disabledAt.toString()).toBe('0');
  });
  it('should fetch "address" admin', async () => {
    const admin = await essentialEthContract.admin({
      gasLimit: 40955,
    });
    expect(admin).toBe('0x00000000000000000000000000000010B57e6da0');
  });
  it('should fetch "address" future_admin', async () => {
    const futureAdmin = await essentialEthContract.future_admin({
      gasLimit: 40955,
    });
    expect(futureAdmin).toBe('0x00000000000000000000000000000010B57e6da0');
  });
  it('should fetch "bool" fund_admins_enabled', async () => {
    const fundAdminsEnabled = await essentialEthContract.fund_admins_enabled({
      gasLimit: 40955,
    });
    expect(fundAdminsEnabled).toBe(false);
  });
  it('should fetch "bool" fund_admins', async () => {
    const fundAdmins = await essentialEthContract.fund_admins(address, {
      gasLimit: 40955,
    });
    expect(fundAdmins).toBe(false);
  });
});
