import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { JsonRpcProvider } from '../../../providers/JsonRpcProvider';
import { rpcUrls } from '../../../providers/test/rpc-urls';
import { isAddress } from '../../../utils/is-address';
import { Contract } from '../../Contract';
import { decodeRPCResponse } from '../../utils/encode-decode-transaction';
import { abi } from './jokerrace-abi';

describe('jokerrace contract', () => {
  it('should decode "address[]"', async () => {
    // this was captured by running it on the live network first
    const nodeResponse =
      '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001300000000000000000000000067243d6c3c3bdc2f59d2f74ba1949a02973a529d0000000000000000000000000b06ca5dcc8a10be0951d4e140d4312702b8d0ec0000000000000000000000003fad8bcd2aea732d02a203c156b19205253f2a0600000000000000000000000073186b2a81952c2340c4eb2e74e89869e1183df000000000000000000000000087ece9936ad2254d03af83958fe3b202dc79793f00000000000000000000000068f272fcaae074cb33e68d88a32c325ed0df8379000000000000000000000000c9d20533c5b8a79526377e5d05dc79b87b28e92f000000000000000000000000e04885c3f1419c6e8495c33bdcf5f8387cd888460000000000000000000000000c887420937d8f9305ff872eaa5aaf5e379a811a0000000000000000000000007234c36a71ec237c2ae7698e8916e0735001e9af0000000000000000000000001c9f765c579f94f6502acd9fc356171d85a1f8d0000000000000000000000000ca85c622d4c61047f96e352cb919695486a193e6000000000000000000000000c11c6f47fe090a706ba82964b8a98f1682b244ff000000000000000000000000020f64f264ab7e90ef24a108c379a796a82175df000000000000000000000000eb2ee1250dc8c954da4eff4df0e4467a1ca6af6c0000000000000000000000003b60e31cfc48a9074cd5bebb26c9eaa77650a43f00000000000000000000000068d36dcbdd7bbf206e27134f28103abe7cf972df0000000000000000000000001a9cee6e1d21c3c09fb83a980ea54299f01920cd0000000000000000000000001d3bf13f8f7a83390d03db5e23a950778e1d1309';
    const addresses = z
      .array(z.string())
      .parse(decodeRPCResponse(abi[0], nodeResponse));
    expect(addresses.length).toBeGreaterThan(18);
    expect(addresses).toContain('0x0b06ca5DcC8A10Be0951d4E140D4312702B8D0EC');
    addresses.map((address) => {
      expect(isAddress(address)).toBeTruthy();
    });
  });

  const contractAddress = '0x5c11016ee4f8ad4ea2ab8b1b366f32d30d48a031';
  const provider = new JsonRpcProvider(rpcUrls.oeth);
  const contract = new Contract(contractAddress, abi as any, provider);

  it.only('should decode "uint256[]"', async () => {
    const res = z.array(z.any()).parse(await contract.getAllProposalIds());
    expect(res).toHaveLength(15);
    expect(res[0].toHexString()).toBe(
      '0xe8f98b88fddcd83cadcc563883e148b27c9f4f25f2f8f315227d8e3d6a0f72',
    );
    expect(res[14].toHexString()).toBe(
      '0xaf1338772f308dc5ff9821c05dcc221d4d5bba2c8545c0f1517bcbe95e701896',
    );
  });
});
