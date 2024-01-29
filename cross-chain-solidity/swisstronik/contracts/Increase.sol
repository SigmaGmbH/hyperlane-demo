// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface Mailbox {
    function dispatch(
        uint32 destinationDomain,
        bytes32 recipientAddress,
        bytes calldata messageBody,
        bytes calldata hookMetadata
    ) external payable returns (bytes32);
}

contract Increase {
    address private recipient; // recipient address on destination chain
    uint256 public counter; // counter
    uint32 destinationDomain; // destination domain

    Mailbox private mailbox;

    event CounterIncremented(uint256 newCounter);

    constructor(address _mailbox, address _recipient) {
        mailbox     = Mailbox(_mailbox);
        recipient   = _recipient;
        counter     = 0;
        destinationDomain = 31338; // anvil chain
    }

    function incrementCounter() public {
        counter++;
        emit CounterIncremented(counter);

        bytes memory messageBody = abi.encode(counter);
        bytes32 recipientAddress = bytes32(uint256(uint160(recipient)));
        bytes memory hookMetadata = new bytes(0);
        // Call the dispatch method in the Mailbox contract to sync the counter
        mailbox.dispatch(destinationDomain, recipientAddress, messageBody, hookMetadata);
    }
}