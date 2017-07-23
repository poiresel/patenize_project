// var bcrypt = require('bcrypt');
var jsonfile = require('jsonfile');


exports.login = function(req,res){
  var patentId= req.body.patentId;
  var description = req.body.description;
  console.log(req.body)
  console.log(req.body.patentId);
  console.log(req.body.description)
  // console.log('The solution is: ', results[0].password,req.body.password,req.body.role);
  var file = './data/data.json'
  var obj = {patentId: patentId, description: description}
  jsonfile.writeFile(file, obj, function (err) {
    if(err){
      console.log("Error ocurred in writing json during login at login handler in login routes",err);
    }
  })
  res.send({
    "code":200,
    "success":"login sucessfull"
  })
    
}