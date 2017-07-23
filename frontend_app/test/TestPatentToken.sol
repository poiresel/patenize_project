pragma solidity ^0.4.11;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/PatentToken.sol";
import "../contracts/ProxyContract.sol";


contract TestPatentToken {

  function testSimplePatentTime() {
	    PatentToken patentTokenA = new PatentToken(0x15ecfc141e68ff6b3bacf0a1ac089329f9f90897);
	    uint expected = 20;
	    Assert.equal(patentTokenA.timeRemaining(), expected, "It should default to 20.");

	    patentTokenA.updateTimeSet(19);

	    Assert.equal(patentTokenA.timeRemaining(),19, "It should updated to 19");

	    patentTokenA.updateTimeSet(6);

	    Assert.equal(patentTokenA.timeRemaining(),6, "It should updated to 19");
  }

  function testSimplePatentTimeOutOfOrder() {
	    PatentToken patentTokenA = new PatentToken(0x15ecfc141e68ff6b3bacf0a1ac089329f9f90897);
	    uint expected = 20;
	    Assert.equal(patentTokenA.timeRemaining(), expected, "It should default to 20.");

	    patentTokenA.updateTimeSet(19);

	    Assert.equal(patentTokenA.timeRemaining(),19, "It should updated to 19");

	    ProxyContract throwTest = new ProxyContract(address(patentTokenA));
	    PatentToken(address(throwTest)).updateTimeSet(20);
	    bool r = throwTest.execute.gas(200000)();
	    Assert.isFalse(r, "Should be false, as it should throw out of bounds");

  }

}
