"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _contracts = require("@ethersproject/contracts");
const _providers = require("@ethersproject/providers");
const _index = require("../../../index");
const _rpcUrls = require("../../../providers/test/rpc-urls");
const _contract = require("../../Contract");
const _crvAbi = require("./crv-abi");
// The JSONABI
const JSONABI = _crvAbi.abi;
const rpcURL = _rpcUrls.rpcUrls.mainnet;
const ethersProvider = new _providers.StaticJsonRpcProvider(rpcURL);
const essentialEthProvider = new _index.JsonRpcProvider(rpcURL);
// https://etherscan.io/address/0x575CCD8e2D300e2377B43478339E364000318E2c
const contractAddress = '0x575CCD8e2D300e2377B43478339E364000318E2c';
const ethersContract = new _contracts.Contract(contractAddress, JSONABI, ethersProvider);
const essentialEthContract = new _contract.Contract(contractAddress, JSONABI, essentialEthProvider);
describe('cRV contract', ()=>{
    const address = '0xf8cd644baf494d13406187cf8628754dca0a10c2';
    it('should fetch "uint256" balanceOf', async ()=>{
        const [ethersBalanceOf, essentialEthBalanceOf] = await Promise.all([
            ethersContract.balanceOf(address, {
                gasLimit: 40955
            }),
            essentialEthContract.balanceOf(address, {
                gasLimit: 40955
            })
        ]);
        expect(ethersBalanceOf.toString()).toBe(essentialEthBalanceOf.toString());
    });
    it('should fetch "uint256" total_claimed', async ()=>{
        const [ethersTotalClaimed, essentialEthTotalClaimed] = await Promise.all([
            // ensure library also handles empty options
            ethersContract.total_claimed(address, {}),
            essentialEthContract.total_claimed(address, {})
        ]);
        expect(ethersTotalClaimed.toString()).toBe(essentialEthTotalClaimed.toString());
        expect(ethersTotalClaimed.toNumber()).toBe(essentialEthTotalClaimed.toNumber());
    });
    it('should fetch "uint256" vested supply', async ()=>{
        const [ethersVestedSupply, essentialVestedSupply] = await Promise.all([
            ethersContract.vestedSupply({
                gasLimit: 40955
            }),
            essentialEthContract.vestedSupply({
                gasLimit: 40955
            })
        ]);
        expect(ethersVestedSupply.toString()).toBe(essentialVestedSupply.toString());
    });
    it('should fetch "uint256" locked supply', async ()=>{
        const [ethersLockedSupply, essentialLockedSupply] = await Promise.all([
            ethersContract.lockedSupply({
                gasLimit: 40955
            }),
            essentialEthContract.lockedSupply({
                gasLimit: 40955
            })
        ]);
        expect(ethersLockedSupply.toString()).toBe(essentialLockedSupply.toString());
    });
    it('should fetch "uint256" vested of', async ()=>{
        const [ethersVestedOf, essentialVestedOf] = await Promise.all([
            ethersContract.vestedOf(address, {
                gasLimit: 40955
            }),
            essentialEthContract.vestedOf(address, {
                gasLimit: 40955
            })
        ]);
        expect(ethersVestedOf.toString()).toBe(essentialVestedOf.toString());
    });
    it('should fetch "uint256" lockedOf', async ()=>{
        const [ethersLockedOf, essentialLockedOf] = await Promise.all([
            ethersContract.lockedOf(address, {
                gasLimit: 40955
            }),
            essentialEthContract.lockedOf(address, {
                gasLimit: 40955
            })
        ]);
        expect(ethersLockedOf.toString()).toBe(essentialLockedOf.toString());
    });
    it('should fetch "address" token', async ()=>{
        const [ethersToken, essentialToken] = await Promise.all([
            ethersContract.token({
                gasLimit: 40955
            }),
            essentialEthContract.token({
                gasLimit: 40955
            })
        ]);
        expect(ethersToken).toBe(essentialToken);
    });
    it('should fetch "uint256" start_time', async ()=>{
        const [ethersStartTime, essentialStartTime] = await Promise.all([
            ethersContract.start_time({
                gasLimit: 40955
            }),
            essentialEthContract.start_time({
                gasLimit: 40955
            })
        ]);
        expect(ethersStartTime.toString()).toBe(essentialStartTime.toString());
    });
    it('should fetch "uint256" end_time', async ()=>{
        const [ethersEndTime, essentialEndTime] = await Promise.all([
            ethersContract.end_time({
                gasLimit: 40955
            }),
            essentialEthContract.end_time({
                gasLimit: 40955
            })
        ]);
        expect(ethersEndTime.toString()).toBe(essentialEndTime.toString());
    });
    it('should fetch "uint256" initial_locked', async ()=>{
        const [ethersInitialLocked, essentialInitialLocked] = await Promise.all([
            ethersContract.initial_locked(address, {
                gasLimit: 40955
            }),
            essentialEthContract.initial_locked(address, {
                gasLimit: 40955
            })
        ]);
        expect(ethersInitialLocked.toString()).toBe(essentialInitialLocked.toString());
    });
    it('should fetch "uint256" initial_locked_supply', async ()=>{
        const [ethersInitialLockedSupply, essentialInitialLockedSupply] = await Promise.all([
            ethersContract.initial_locked_supply({
                gasLimit: 40955
            }),
            essentialEthContract.initial_locked_supply({
                gasLimit: 40955
            })
        ]);
        expect(ethersInitialLockedSupply.toString()).toBe(essentialInitialLockedSupply.toString());
    });
    it('should fetch "uint256" unallocated_supply', async ()=>{
        const [ethersUnAllSupply, essentialUnAllSupply] = await Promise.all([
            ethersContract.unallocated_supply({
                gasLimit: 40955
            }),
            essentialEthContract.unallocated_supply({
                gasLimit: 40955
            })
        ]);
        expect(ethersUnAllSupply.toString()).toBe(essentialUnAllSupply.toString());
    });
    it('should fetch "bool" can_disable', async ()=>{
        const [ethersCanDisable, essentialCanDisable] = await Promise.all([
            ethersContract.can_disable({
                gasLimit: 40955
            }),
            essentialEthContract.can_disable({
                gasLimit: 40955
            })
        ]);
        expect(ethersCanDisable).toBe(essentialCanDisable);
    });
    it('should fetch "uint256" disabled_at', async ()=>{
        const [ethersDisabledAt, essentialDisabledAt] = await Promise.all([
            ethersContract.disabled_at(address, {
                gasLimit: 40955
            }),
            essentialEthContract.disabled_at(address, {
                gasLimit: 40955
            })
        ]);
        expect(ethersDisabledAt.toString()).toBe(essentialDisabledAt.toString());
    });
    it('should fetch "address" admin', async ()=>{
        const [ethersAdmin, essentialAdmin] = await Promise.all([
            ethersContract.admin({
                gasLimit: 40955
            }),
            essentialEthContract.admin({
                gasLimit: 40955
            })
        ]);
        expect(ethersAdmin).toBe(essentialAdmin);
    });
    it('should fetch "address" future_admin', async ()=>{
        const [ethersFutureAdmin, essentialFutureAdmin] = await Promise.all([
            ethersContract.future_admin({
                gasLimit: 40955
            }),
            essentialEthContract.future_admin({
                gasLimit: 40955
            })
        ]);
        expect(ethersFutureAdmin).toBe(essentialFutureAdmin);
    });
    it('should fetch "bool" fund_admins_enabled', async ()=>{
        const [ethersFutureAdmin, essentialFutureAdmin] = await Promise.all([
            ethersContract.fund_admins_enabled({
                gasLimit: 40955
            }),
            essentialEthContract.fund_admins_enabled({
                gasLimit: 40955
            })
        ]);
        expect(ethersFutureAdmin).toBe(essentialFutureAdmin);
    });
    it('should fetch "bool" fund_admins', async ()=>{
        const [ethersFundAdmins, essentialFundAdmins] = await Promise.all([
            ethersContract.fund_admins(address, {
                gasLimit: 40955
            }),
            essentialEthContract.fund_admins(address, {
                gasLimit: 40955
            })
        ]);
        expect(ethersFundAdmins).toBe(essentialFundAdmins);
    });
});
