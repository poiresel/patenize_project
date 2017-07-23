var PatentStatus = artifacts.require("PatentStatus");


contract('PatentStatus', function(accounts) {

    it("should match the right reviewer", function() {
        return PatentStatus.deployed().then(function(instance) {
            patentStatusInstance = instance;
            console.log("calling")
            return patentStatusInstance.getReviewers.call();
        }).then(function(revs) {
            assert.equal(revs[0], accounts[0], "Wrong reviewers")
        })
    })

  it("should submit a hash to the contract", function() {
    return PatentStatus.deployed().then(function(instance) {
      patentStatusInstance = instance;
      ipfs_hash = "\xe5\x00\xd5\xa4\xc9\x9a\x9doF\xd2G\xf2\x19%\xcd .\xb2@\n\xdfD\x11\x83\x8f\xd27\x1b\x04\x15\x0cP";
      //Submit trimmed ipfs hash
       return patentStatusInstance.submitPatent(ipfs_hash, {from: accounts[1]});
    }).then(function() {
       return patentStatusInstance.isSubmitted.call(ipfs_hash);
  }).then(function(response) {
      assert.equal(response, true, "The file was not submitted");
    });
  });

  it("should make a decision on a patent", function() {
      return PatentStatus.deployed().then(function(instance) {
          patentStatusInstance = instance;
          ipfs_hash = "\xe5\x00\xd5\xa4\xc9\x9a\x9doF\xd2G\xf2\x19%\xcd .\xb2@\n\xdfD\x11\x83\x8f\xd27\x1b\x04\x15\x0cP";
          //0 = rejected, 1 = approved, 2 = approved with swap
          decision = 1;
          //empty address
          address = "0x0";
          return patentStatusInstance.decideOnPatent(ipfs_hash, decision, address, {from: accounts[0]})
      }).then(function(result) {
          for (var i = 0; i < result.logs.length; i++) {
              var log = result.logs[i];
              if (log.event == "PatentDecision") {
                  console.log("Event triggered. Tests passed.");
                  break;
              }
          }
      }).catch(function(err) {
          console.log("Error occured: " + err);
      })
  })

});
