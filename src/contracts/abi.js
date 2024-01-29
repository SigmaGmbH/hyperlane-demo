export const ANVIL_ABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_mailbox",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "newCounter",
                "type": "uint256"
            }
        ],
        "name": "ReceivedCounterValue",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint32",
                "name": "origin",
                "type": "uint32"
            },
            {
                "indexed": true,
                "internalType": "bytes32",
                "name": "sender",
                "type": "bytes32"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "message",
                "type": "string"
            }
        ],
        "name": "ReceivedMessage",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint32",
                "name": "_origin",
                "type": "uint32"
            },
            {
                "internalType": "bytes32",
                "name": "_sender",
                "type": "bytes32"
            },
            {
                "internalType": "bytes",
                "name": "_data",
                "type": "bytes"
            }
        ],
        "name": "handle",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "readCounter",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

export const SWISSTRONIK_ABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_mailbox",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_recipient",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "newCounter",
                "type": "uint256"
            }
        ],
        "name": "CounterIncremented",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "counter",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "incrementCounter",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]