import { describe, expect, it } from 'vitest';

import { JsonRpcProvider } from '../../../index';
import { rpcUrls } from '../../../providers/test/rpc-urls';
import { Contract as EssentialEthContract } from '../../Contract';
import { abi } from './crv-abi';

const rpcURL = rpcUrls.mainnet;
const provider = new JsonRpcProvider(rpcURL);

// https://etherscan.io/address/0x575CCD8e2D300e2377B43478339E364000318E2c
const contractAddress = '0x575CCD8e2D300e2377B43478339E364000318E2c';

const contract = new EssentialEthContract(contractAddress, abi, provider);
describe('cRV contract', () => {
  const address = '0xf8cd644baf494d13406187cf8628754dca0a10c2';
  it('should fetch "uint256" balanceOf', async () => {
    const balanceOf = (await contract.balanceOf(address, {
      gasLimit: 40955,
    })) as bigint;
    expect(balanceOf.toString()).toBe('6684485761284788581');
  });
  it('should fetch "uint256" vested supply', async () => {
    const vestedSupply = (await contract.vestedSupply({
      gasLimit: 40955,
    })) as bigint;
    expect(vestedSupply.toString()).toBe('151515151515151515151515151');
  });
  it('should fetch "uint256" locked supply', async () => {
    const lockedSupply = (await contract.lockedSupply({
      gasLimit: 40955,
    })) as bigint;
    expect(lockedSupply.toString()).toBe('0');
  });
  // it('should fetch "uint256" vested of', async () => {
  //   const vestedOf = (await contract.vestedOf(address, {
  //     gasLimit: 40955,
  //   })) as bigint;
  //   expect(vestedOf.toString()).toBe('6684485761284788581');
  // });
  // it('should fetch "uint256" lockedOf', async () => {
  //   const lockedOf = (await contract.lockedOf(address, {
  //     gasLimit: 40955,
  //   })) as bigint;
  //   expect(lockedOf.toString()).toBe('0');
  // });
  it('should fetch "address" token', async () => {
    const token = await contract.token({
      gasLimit: 40955,
    });
    expect(token).toBe('0xD533a949740bb3306d119CC777fa900bA034cd52');
  });
  // it('should fetch "uint256" start_time', async () => {
  //   const startTime = (await contract.start_time({
  //     gasLimit: 40955,
  //   })) as bigint;
  //   expect(startTime.toString()).toBe('1597357048');
  // });
  // it('should fetch "uint256" end_time', async () => {
  //   const endTime = (await contract.end_time({
  //     gasLimit: 40955,
  //   })) as bigint;
  //   expect(endTime.toString()).toBe('1628893048');
  // });
  it('should fetch "uint256" initial_locked', async () => {
    const initialLocked = (await contract.initial_locked(address, {
      gasLimit: 40955,
    })) as bigint;
    expect(initialLocked.toString()).toBe('6684485761284788581');
  });
  // it('should fetch "uint256" initial_locked_supply', async () => {
  //   const initialLockedSupply = (await contract.initial_locked_supply({
  //     gasLimit: 40955,
  //   })) as bigint;
  //   expect(initialLockedSupply.toString()).toBe('151515151515151515151515151');
  // });
  // it('should fetch "uint256" unallocated_supply', async () => {
  //   const unallocatedSupply = (await contract.unallocated_supply({
  //     gasLimit: 40955,
  //   })) as bigint;
  //   expect(unallocatedSupply.toString()).toBe('0');
  // });
  it('should fetch "bool" can_disable', async () => {
    const canDisable = await contract.can_disable({
      gasLimit: 40955,
    });
    expect(canDisable).toBe(false);
  });
  it('should fetch "uint256" disabled_at', async () => {
    const disabledAt = (await contract.disabled_at(address, {
      gasLimit: 40955,
    })) as bigint;
    expect(disabledAt.toString()).toBe('0');
  });
  it('should fetch "address" admin', async () => {
    const admin = await contract.admin({
      gasLimit: 40955,
    });
    expect(admin).toBe('0x00000000000000000000000000000010B57e6da0');
  });
  it('should fetch "address" future_admin', async () => {
    const futureAdmin = await contract.future_admin({
      gasLimit: 40955,
    });
    expect(futureAdmin).toBe('0x00000000000000000000000000000010B57e6da0');
  });
  it('should fetch "bool" fund_admins_enabled', async () => {
    const fundAdminsEnabled = await contract.fund_admins_enabled({
      gasLimit: 40955,
    });
    expect(fundAdminsEnabled).toBe(false);
  });
  it('should fetch "bool" fund_admins', async () => {
    const fundAdmins = await contract.fund_admins(address, {
      gasLimit: 40955,
    });
    expect(fundAdmins).toBe(false);
  });
});
