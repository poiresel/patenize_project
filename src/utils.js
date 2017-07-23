const Web3 = require('web3');
const web3 = new Web3('http://localhost:8545');
const ipfsAPI = require('ipfs-api');
const bs58 = require('bs58')

//TODO: encrypting the files.
//input abi and address here
//It is important that these are initialized before the funcitons are called
const abi = [{"constant":false,"inputs":[{"name":"ipfs_hash","type":"bytes32"},{"name":"decision","type":"uint8"},{"name":"patent_token","type":"address"}],"name":"decideOnPatent","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"ipfs_hash","type":"bytes32"}],"name":"submitPatent","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"getReviewers","outputs":[{"name":"","type":"address[]"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"uint256"}],"name":"reviewers","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"ipfs_hash","type":"bytes32"}],"name":"isSubmitted","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"inputs":[{"name":"group","type":"uint256"},{"name":"mod","type":"uint256"},{"name":"num","type":"uint256"},{"name":"approved_reviewers","type":"address[]"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"patent_file","type":"bytes32"},{"indexed":false,"name":"decision","type":"uint8"},{"indexed":false,"name":"patent_token","type":"address"}],"name":"PatentDecision","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"patent_file","type":"bytes32"}],"name":"PatentSubmitted","type":"event"}]
const address = 0x0
const PatentStatusContract = new web3.eth.Contract(abi, address);


function submitPatent(file_descriptor) {
    PatentStatusContract.methods.submitPatent(file_descriptor).then(function() {
        PatentStatusContract.once('PatentSubmitted', {filter: {patent_file: file_descriptor}},
            function(error, event) {
            //Handle error
            //Trigger the submit notification here on the front end
        });
    }).then(function() {
        waitForDecision(file_descriptor);
    });
};

function waitForDecision(file_descriptor) {
    PatentStatusContract.once('PatentDecision', {
        filter: {patent_file: file_descriptor}
    }, function(error, event) {
        var decision = event.returnValues.decision;
        //Address for Patent Token, empty address is provided if decision == 0
        var address = event.returnValues.address;
        //Notify frontend on decision status
        //If approved also send new contract address
        //0 = rejected, 1 = approved, 2 = approved with swap
    });
};

function connectAndSubmitToIPFS(patent_information) {
    return ipfsAPI('ipfs.infura.io', '5001', {protocol: 'https'}).then(function(connection) {
        ipfs = connection;
        return ipfs.files.add(patent_information)
    }).then(function(hash) {
        return formatInputBytes(fromIPFSHash(hash));
    })
}

const fromIPFSHash = hash => {
    const bytes = bs58.decode(hash);
    const multiHashId = 2;
    // remove the multihash hash id
    bytes = bytes.slice(multiHashId, bytes.length);
    console.log(bytes);
    return bytes;
};

var formatInputBytes = function(value) {
    if (Buffer.isBuffer(value)) {
        return new SolidityParam(value.toString("hex"));
    }
    var result = utils.toHex(value).substr(2);
    var l = Math.floor((result.length + 63) / 64);
    result = utils.padRight(result, l * 64);
    return new SolidityParam(result);
};

const toIPFSHash = str => {
    // remove leading 0x
    const remove0x = str.slice(2, str.length);
    // add back the multihash id
    const bytes = Buffer.from(`1220${remove0x}`, "hex");
    const hash = bs58.encode(bytes);
    return hash;
};
