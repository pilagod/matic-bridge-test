// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract TestToken is ERC20 {
    using SafeMath for uint256;

    event CrossDeposit(address to, uint256 amount);
    event CrossTransfer(address to, uint256 amount);

    address private owner;

    constructor() ERC20("TestToken", "TKN") {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "not owner");
        _;
    }

    function crossDeposit(address _to, uint256 _amount)
        public
        onlyOwner
        returns (bool)
    {
        _mint(_to, _amount);
        emit CrossDeposit(_to, _amount);
        return true;
    }

    function crossTransfer(address _to, uint256 _amount)
        public
        onlyOwner
        returns (bool)
    {
        _burn(msg.sender, _amount);
        emit CrossTransfer(_to, _amount);
        return true;
    }

    function mint(address _to, uint256 _amount)
        public
        onlyOwner
        returns (bool)
    {
        _mint(_to, _amount);
        return true;
    }
}
