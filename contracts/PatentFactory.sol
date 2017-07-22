pragma solidity ^0.4.9;

/*
This is just a translation of the HumanStandardTokenFactory contract.
TODO: Consider using IPFS to store all contracts; need a means of updating the
registry based on active contracts.
*/

import "./PatentToken.sol"; //Replace with relevant name.

contract PatentFactory {

    mapping (address => address[]) created;
    mapping(address => bool) public isPatent; //verify without having to do a bytecode check.
    bytes public patentByteCode;

    function PatentFactory() {
     //upon creation of the factory, deploy a PatentToken (parameters are meaningless) and store the bytecode provably.
     address verifiedToken = createPatent(10000, "Verify Token", 3, "VTX");
     patentByteCode = codeAt(verifiedToken);
   }

   //verifies if a contract that has been deployed is a Human Standard Token.
   //NOTE: This is a very expensive function, and should only be used in an eth_call. ~800k gas
   function verifyPatentToken(address _tokenContract) returns (bool) {
     bytes memory fetchedTokenByteCode = codeAt(_tokenContract);

     if (fetchedTokenByteCode.length != patentByteCode.length) {
       return false; //clear mismatch
     }

     //starting iterating through it if lengths match
     for (uint i = 0; i < fetchedTokenByteCode.length; i ++) {
       if (fetchedTokenByteCode[i] != patentByteCode[i]) {
         return false;
       }
     }

     return true;
   }

   //for now, keeping this internal. Ideally there should also be a live version of this that any contract can use, lib-style.
   //retrieves the bytecode at a specific address.
   function codeAt(address _addr) internal returns (bytes o_code) {
     assembly {
         // retrieve the size of the code, this needs assembly
         let size := extcodesize(_addr)
         // allocate output byte array - this could also be done without assembly
         // by using o_code = new bytes(size)
         o_code := mload(0x40)
         // new "memory end" including padding
         mstore(0x40, add(o_code, and(add(add(size, 0x20), 0x1f), not(0x1f))))
         // store length in memory
         mstore(o_code, size)
         // actually retrieve the code, this needs assembly
         extcodecopy(_addr, add(o_code, 0x20), 0, size)
     }
   }

   function createPatentToken(uint256 _initialAmount, string _name, uint8 _decimals, string _symbol) returns (address) {

       PatentToken newToken = (new PatentToken(_initialAmount, _name, _decimals, _symbol));
       created[msg.sender].push(address(newToken));
       isHumanToken[address(newToken)] = true;
       newToken.transfer(msg.sender, _initialAmount); //the factory will own the created tokens. You must transfer them.
       return address(newToken);
   }
}
