pragma solidity ^0.4.11;

import 'zeppelin-solidity/contracts/ownership/Ownable.sol';
import 'zeppelin-solidity/contracts/lifecycle/TokenDestructible.sol';
import 'zeppelin-solidity/contracts/token/StandardToken.sol';


//ERC20 + Escrow +  Extensions   |   Deepa
/*
 * @dev PatentToken is an ERC20 token and is also Destructible 
 *
 *
 */
contract PatentToken is StandardToken, TokenDestructible {
	using SafeMath for uint256;

    uint256 public INITIAL_SUPPLY = 1000;
    uint public TIME_SET = 20;
    uint public UBIQUITY = 1;
    string public DEFAULT_STATUS = "PENDING";
    uint public ubiquity;
    uint public timeRemaining;
    bytes32 public patentId;
    string public patentStatus;


	/**
	 * @dev Constructor that gives msg.sender all of existing tokens.
	 * balanceUpdates are done through transfers 
	*/
	function PatentToken(bytes32 _patentId) {
		// metadata for a token
		patentId = _patentId;
		ubiquity = UBIQUITY;
		timeRemaining = TIME_SET;
	    totalSupply = INITIAL_SUPPLY;
	    balances[msg.sender] = INITIAL_SUPPLY;
	    patentStatus = DEFAULT_STATUS;
    }

    function updatePatentStatus(string _updateStatus) {
    	patentStatus = _updateStatus;
    }

    function updateTimeSet(uint _updatedTime) public returns (bool) {
    	require(_updatedTime < timeRemaining);
    	timeRemaining = _updatedTime;
    	return true;
    }

    function updateUbiquity(uint _updatedUbiquity) {
        ubiquity = _updatedUbiquity;
    }

    function getTokenValue(address _patentValue) public returns (uint256) {
    	return 30; // need to add this calculation
    }

    function transferWealth() public returns (uint256) {
    	return 30;
    }

}