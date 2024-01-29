// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IMessageRecipient {
    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes calldata _message
    ) external payable;
}

contract Sync is IMessageRecipient {
    uint256 private counter; // counter
    address private mailbox;

    event ReceivedMessage(
        uint32 indexed origin,
        bytes32 indexed sender,
        uint256 indexed value,
        string message
    );

    event ReceivedCounterValue(uint256 newCounter);

    modifier onlyMailbox() {
        require(msg.sender == mailbox, "Not the mailbox");
        _;
    }

    constructor(address _mailbox) {
        mailbox = _mailbox;
    }

    function handle(
        uint32 _origin,
        bytes32 _sender,
        bytes calldata _data
    ) external payable virtual override onlyMailbox {
        require(_data.length == 32, "Input data must be 32 bytes");
        emit ReceivedMessage(_origin, _sender, msg.value, string(_data));
        uint256 result = abi.decode(_data, (uint256));
        emit ReceivedCounterValue(result);
        counter++;
    }

    /**
     * @dev readCounter() retrieves the currently stored counter in the contract
     * @return The message associated with the contract
     */
    function readCounter() public view returns (uint256) {
        return counter;
    }
}
