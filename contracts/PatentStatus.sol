pragma solidity ^0.4.8;

contract PatentStatus {

    event PatentDecision(
        bytes32 indexed patent_file,
        uint8 decision
    );

    event PatentSubmitted(
        bytes32 indexed patent_file
    );

    uint256 multiplicative_group;
    uint256 modulo;
    uint256 reviewer_number;
    address[] public reviewers;

    mapping (address => bool) is_reviewer;
    mapping (bytes32 => bool) submitted;

    modifier onlyReviewer(address addr) {
        if (!is_reviewer[addr])
            throw;
        _;
    }

    modifier isValidFile(bytes32 ipfs_hash) {
        if (!submitted[ipfs_hash])
            throw;
        _;
    }

    function PatentStatus(uint256 group, uint256 mod, uint256 num, address[] approved_reviewers) {
        reviewers = approved_reviewers;
        multiplicative_group = group;
        modulo = mod;
        reviewer_number = num;
        for (uint i = 0; i < approved_reviewers.length; i++) {
            is_reviewer[approved_reviewers[i]] = true;
        }
    }

    function submitPatent(bytes32 ipfs_hash) external {
        submitted[ipfs_hash] = true;
        PatentSubmitted(ipfs_hash);
    }

    function decideOnPatent(bytes32 ipfs_hash, uint8 decision)
        onlyReviewer(msg.sender)
        isValidFile(ipfs_hash)
        external
    {
        if (decision == 0) {
            submitted[ipfs_hash] = false;
        }
        PatentDecision(ipfs_hash, decision);
    }

    function isSubmitted(bytes32 ipfs_hash) returns(bool) {
        return submitted[ipfs_hash];
    }

    function getReviewers() returns(address[]) {
        return reviewers;
    }

}
