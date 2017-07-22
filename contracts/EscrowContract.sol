pragma solidity ^0.4.11;

contract EscrowContract {

    bool funded;
    address buyer;
    address seller;
    address agent; // currently some trusted party like the USPTO
    address patentToken; // ERC20 address that will be used
    uint escrowedAmount;
    bool sellerSatisfied;
    bool buyerSatisfied;

    /*
    * Escrow contract currently working with ether/ need to be changed to work for only patentToken
    * ensure the agent cannot be the buyer or the seller
    */
	function EscrowContract(address _agent, address _seller, address _patentToken) {
		require (agent != msg.sender);
		require (agent != _seller);
		buyer = msg.sender;
		agent = _agent;
		seller = _seller;
		patentToken = _patentToken;
	}

	function fundContract() payable {
		// only the buyer funds and it can only be funded once
		if (msg.sender != buyer || funded) throw;
		escrowedAmount = msg.value;
		funded = true;

	}

    // ensure that only the buyer or seller are part of this 
	modifier buyerOrSellerOnly()
    {
        if(msg.sender != buyer || msg.sender != seller) throw;
        else _;
    }


    function partiesSatisfied() buyerOrSellerOnly
    {
    	if (msg.sender == seller) {
    		sellerSatisfied = true;
    	}
    	else {
    		buyerSatisfied = true;
    	}
    	if (sellerSatisfied && buyerSatisfied) {
    		wrapUp();
    	}
    }

    // buyer of seller can choose to cancel contract which sends funds to agent 
    function cancel() buyerOrSellerOnly {
    	suicide(agent);
    }

    // kill the contract and give the funds to seller
    function wrapUp() internal {
        suicide(seller);
    }
}