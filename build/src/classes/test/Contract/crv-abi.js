"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "abi", {
    enumerable: true,
    get: ()=>abi
});
const abi = // 20210406000308
// http://api.etherscan.io/api?module=contract&action=getabi&address=0x575CCD8e2D300e2377B43478339E364000318E2c&format=raw
[
    {
        name: 'Fund',
        inputs: [
            {
                type: 'address',
                name: 'recipient',
                indexed: true
            },
            {
                type: 'uint256',
                name: 'amount',
                indexed: false
            }
        ],
        anonymous: false,
        type: 'event'
    },
    {
        name: 'Claim',
        inputs: [
            {
                type: 'address',
                name: 'recipient',
                indexed: true
            },
            {
                type: 'uint256',
                name: 'claimed',
                indexed: false
            }
        ],
        anonymous: false,
        type: 'event'
    },
    {
        name: 'ToggleDisable',
        inputs: [
            {
                type: 'address',
                name: 'recipient',
                indexed: false
            },
            {
                type: 'bool',
                name: 'disabled',
                indexed: false
            }
        ],
        anonymous: false,
        type: 'event'
    },
    {
        name: 'CommitOwnership',
        inputs: [
            {
                type: 'address',
                name: 'admin',
                indexed: false
            }
        ],
        anonymous: false,
        type: 'event'
    },
    {
        name: 'ApplyOwnership',
        inputs: [
            {
                type: 'address',
                name: 'admin',
                indexed: false
            }
        ],
        anonymous: false,
        type: 'event'
    },
    {
        outputs: [],
        inputs: [
            {
                type: 'address',
                name: '_token'
            },
            {
                type: 'uint256',
                name: '_start_time'
            },
            {
                type: 'uint256',
                name: '_end_time'
            },
            {
                type: 'bool',
                name: '_can_disable'
            },
            {
                type: 'address[4]',
                name: '_fund_admins'
            }
        ],
        stateMutability: 'nonpayable',
        type: 'constructor'
    },
    {
        name: 'add_tokens',
        outputs: [],
        inputs: [
            {
                type: 'uint256',
                name: '_amount'
            }
        ],
        stateMutability: 'nonpayable',
        type: 'function',
        gas: 39108
    },
    {
        name: 'fund',
        outputs: [],
        inputs: [
            {
                type: 'address[100]',
                name: '_recipients'
            },
            {
                type: 'uint256[100]',
                name: '_amounts'
            }
        ],
        stateMutability: 'nonpayable',
        type: 'function',
        gas: 3962646
    },
    {
        name: 'toggle_disable',
        outputs: [],
        inputs: [
            {
                type: 'address',
                name: '_recipient'
            }
        ],
        stateMutability: 'nonpayable',
        type: 'function',
        gas: 40280
    },
    {
        name: 'disable_can_disable',
        outputs: [],
        inputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
        gas: 21295
    },
    {
        name: 'disable_fund_admins',
        outputs: [],
        inputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
        gas: 21325
    },
    {
        name: 'vestedSupply',
        outputs: [
            {
                type: 'uint256',
                name: ''
            }
        ],
        inputs: [],
        stateMutability: 'view',
        type: 'function',
        gas: 4468
    },
    {
        name: 'lockedSupply',
        outputs: [
            {
                type: 'uint256',
                name: ''
            }
        ],
        inputs: [],
        stateMutability: 'view',
        type: 'function',
        gas: 5465
    },
    {
        name: 'vestedOf',
        outputs: [
            {
                type: 'uint256',
                name: ''
            }
        ],
        inputs: [
            {
                type: 'address',
                name: '_recipient'
            }
        ],
        stateMutability: 'view',
        type: 'function',
        gas: 5163
    },
    {
        name: 'balanceOf',
        outputs: [
            {
                type: 'uint256',
                name: ''
            }
        ],
        inputs: [
            {
                type: 'address',
                name: '_recipient'
            }
        ],
        stateMutability: 'view',
        type: 'function',
        gas: 6275
    },
    {
        name: 'lockedOf',
        outputs: [
            {
                type: 'uint256',
                name: ''
            }
        ],
        inputs: [
            {
                type: 'address',
                name: '_recipient'
            }
        ],
        stateMutability: 'view',
        type: 'function',
        gas: 6305
    },
    {
        name: 'claim',
        outputs: [],
        inputs: [],
        stateMutability: 'nonpayable',
        type: 'function'
    },
    // {
    //   name: 'claim',
    //   outputs: [],
    //   inputs: [
    //     {
    //       type: 'address',
    //       name: 'addr',
    //     },
    //   ],
    //   stateMutability: 'nonpayable',
    //   type: 'function',
    // },
    {
        name: 'commit_transfer_ownership',
        outputs: [
            {
                type: 'bool',
                name: ''
            }
        ],
        inputs: [
            {
                type: 'address',
                name: 'addr'
            }
        ],
        stateMutability: 'nonpayable',
        type: 'function',
        gas: 38032
    },
    {
        name: 'apply_transfer_ownership',
        outputs: [
            {
                type: 'bool',
                name: ''
            }
        ],
        inputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
        gas: 38932
    },
    {
        name: 'token',
        outputs: [
            {
                type: 'address',
                name: ''
            }
        ],
        inputs: [],
        stateMutability: 'view',
        type: 'function',
        gas: 1601
    },
    {
        name: 'start_time',
        outputs: [
            {
                type: 'uint256',
                name: ''
            }
        ],
        inputs: [],
        stateMutability: 'view',
        type: 'function',
        gas: 1631
    },
    {
        name: 'end_time',
        outputs: [
            {
                type: 'uint256',
                name: ''
            }
        ],
        inputs: [],
        stateMutability: 'view',
        type: 'function',
        gas: 1661
    },
    {
        name: 'initial_locked',
        outputs: [
            {
                type: 'uint256',
                name: ''
            }
        ],
        inputs: [
            {
                type: 'address',
                name: 'arg0'
            }
        ],
        stateMutability: 'view',
        type: 'function',
        gas: 1845
    },
    {
        name: 'total_claimed',
        outputs: [
            {
                type: 'uint256',
                name: ''
            }
        ],
        inputs: [
            {
                type: 'address',
                name: 'arg0'
            }
        ],
        stateMutability: 'view',
        type: 'function',
        gas: 1875
    },
    {
        name: 'initial_locked_supply',
        outputs: [
            {
                type: 'uint256',
                name: ''
            }
        ],
        inputs: [],
        stateMutability: 'view',
        type: 'function',
        gas: 1751
    },
    {
        name: 'unallocated_supply',
        outputs: [
            {
                type: 'uint256',
                name: ''
            }
        ],
        inputs: [],
        stateMutability: 'view',
        type: 'function',
        gas: 1781
    },
    {
        name: 'can_disable',
        outputs: [
            {
                type: 'bool',
                name: ''
            }
        ],
        inputs: [],
        stateMutability: 'view',
        type: 'function',
        gas: 1811
    },
    {
        name: 'disabled_at',
        outputs: [
            {
                type: 'uint256',
                name: ''
            }
        ],
        inputs: [
            {
                type: 'address',
                name: 'arg0'
            }
        ],
        stateMutability: 'view',
        type: 'function',
        gas: 1995
    },
    {
        name: 'admin',
        outputs: [
            {
                type: 'address',
                name: ''
            }
        ],
        inputs: [],
        stateMutability: 'view',
        type: 'function',
        gas: 1871
    },
    {
        name: 'future_admin',
        outputs: [
            {
                type: 'address',
                name: ''
            }
        ],
        inputs: [],
        stateMutability: 'view',
        type: 'function',
        gas: 1901
    },
    {
        name: 'fund_admins_enabled',
        outputs: [
            {
                type: 'bool',
                name: ''
            }
        ],
        inputs: [],
        stateMutability: 'view',
        type: 'function',
        gas: 1931
    },
    {
        name: 'fund_admins',
        outputs: [
            {
                type: 'bool',
                name: ''
            }
        ],
        inputs: [
            {
                type: 'address',
                name: 'arg0'
            }
        ],
        stateMutability: 'view',
        type: 'function',
        gas: 2115
    }
];
