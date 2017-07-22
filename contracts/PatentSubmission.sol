pragma solidity ^0.4.8;

contract PatentSubmission {

    //TODO: assign patents to reviewers specifically. Create a log of reviewer who approved patent
    address patentOffice;
    uint256 multiplicativeGroup;
    uint256 modulo;
    uint256 reviewerNumber;
    uint256 applicationFee; //Optional
    uint256 nextApp;
    uint256 applicationCount;

    mapping (uint256 => Application) apps;

    struct Application {
        bytes32 ipfsHash;
        bool underReview;
    }

    modifier onlyOffice() {
        if (msg.sender != patentOffice) {
            throw;
        }
        _;
    }

    event PatentDecision();

    function PatentSubmission(address office, uint256 group, uint256 mod, uint256 rev_number, uint256 fee) {
        patentOffice = office;
        multiplicativeGroup = group;
        modulo = mod;
        reviewerNumber = rev_number;
        applicationFee = fee;
        applicationCount = 0;
    }

    function decideOnPatent(bytes32 app, bool approval) onlyOffice() {

    }

    //TODO: make this a payable function
    function submitPatent(bytes32 app) {
        applicationCount += 1;
    }


}
