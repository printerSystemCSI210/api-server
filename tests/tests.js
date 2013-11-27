var request = require("request");
var should = require("should");
var testUrl = "http://forest-api.herokuapp.com";

describe('Forest API Tests', function (){  
  
  before(function (done){
    done();
  });

  it("the api should work in general", function (done){
    request.get(testUrl + "/someAction", function (err, response, body){
      body = JSON.parse(body);
      should.exist(body.error);
      done();
    });
  });

  describe('Organizations', function (){

    var testCompanyId = "";

    it("Create an Organization", function (done){
      request.get(testUrl + "/organizationCreate?name=Test Company", function (err, response, body){
        body = JSON.parse(body);
        should.not.exist(body.error);
        should.exist(body.id);
        testCompanyId = body.id;
        done();
      });
    });

    it("Create a Duplicate Organization", function (done){
      request.get(testUrl + "/organizationCreate?name=Test Company", function (err, response, body){
        body = JSON.parse(body);
        should.exist(body.error);
        body.error.should.equal("An Organization with name 'Test Company' already exists.");
        done();
      })
    });

    it("Update an Organization", function (done){
      var newName = "Updated";
      request.get(testUrl + "/organizationUpdate?organizationId=" + testCompanyId +
                            "&name=" + newName, function (err, response, body){
        body = JSON.parse(body);
        should.not.exist(body.error);
        should.exist(body.name);
        should.exist(body.id);
        //id should not have changed
        testCompanyId.should.equal(body.id);
        //Name should have changed
        newName.should.equal(body.name);
        done();
      });
    });

    it("Delete an Organization", function (done){
      request.get(testUrl + "/organizationDelete?organizationId=" + testCompanyId, function (err, response, body){
        body = JSON.parse(body);
        should.not.exist(body.error);
        body.should.be.empty;
        done();
      });
    });
  });

  describe("Users", function (){

    var orgId = "";
    var userId = "";

    //Test information:
    var name = "Sample Name";
    var email = "sample@test.com";
    var password = "pass";
    var newName = "Changed Name";

    before(function (done){
      request.get(testUrl + "/organizationCreate?name=User+Test", function (err, response, body){
        body = JSON.parse(body);
        should.not.exist(body.error);
        should.exist(body.id);
        orgId = body.id;
        done();
      });
    });

    it("Create a User", function (done){
      request.get(testUrl + "/userCreate?organizationId=" + orgId +
                            "&name=" + name +
                            "&email=" + email +
                            "&password=" + password + "&admin=true", function (err, response, body){
        body = JSON.parse(body);
        should.not.exist(body.error);
        name.should.equal(body.name);
        email.should.equal(body.email);
        body.admin.should.be.true;
        orgId.should.equal(body.organizations[0]);
        should.exist(body.id);
        userId = body.id;
        done();
      });
    });

    it("Create a Duplicate User", function (done){
      request.get(testUrl + "/userCreate?name=Sample%20Name&email=" + email + 
                            "&password=pass&admin=true&organizationId=" + orgId, function (err, response, body){
        body = JSON.parse(body);
        should.exist(body.error);
        body.error.should.equal("A User with email '" + email + "'already exists.");
        done();
      })
    });

    it("Update a User", function (done){
      request.get(testUrl + "/userUpdate?userId=" + userId +
                            "&name=" + newName, function (err, response, body){
        body = JSON.parse(body);
        should.not.exist(body.error);
        newName.should.equal(body.name);
        userId.should.equal(body.id);
        done();
      });
    });

    it("Authenticate Valid Credentials", function (done){
      request.get(testUrl + "/authenticate?email=" + email +
                            "&password=" + password, function (err, response, body){
        body = JSON.parse(body);
        should.not.exist(body.error);
        should.exist(body.authenticated);
        body.authenticated.should.be.true;
        done();
      });
    });

    it("Authenticate Invalid Password", function (done){
      request.get(testUrl + "/authenticate?email=" + email +
                            "&password=sdkfj", function (err, response, body){
        body = JSON.parse(body);
        should.exist(body.error);
        body.error.should.equal("Incorrect Email/Password Combination");
        should.exist(body.authenticated);
        body.authenticated.should.be.false;
        done();
      });
    });

    it("Authenticate Invalid Email", function (done){
      request.get(testUrl + "/authenticate?email=hey@email.com" +
                            "&password=" + password, function (err, response, body){
        body = JSON.parse(body);
        should.exist(body.error);
        body.error.should.equal("Given Email does not Exist");
        should.exist(body.authenticated);
        body.authenticated.should.be.false;
        done();
      });
    });

    it("Delete a User", function (done){
      request.get(testUrl + "/userDelete?userId=" + userId, function (err, response, body){
        body = JSON.parse(body);
        should.not.exist(body.error);
        body.should.be.empty;
        done();
      });
    });

    after(function (done){
      request.get(testUrl + "/organizationDelete?organizationId=" + orgId, function (err, response, body){
        body = JSON.parse(body);
        should.not.exist(body.error);
        body.should.be.empty;
        done();
      });
    });
  });

  describe("Printers", function (){

    var orgId = "";
    var printerId = "";
    var testIp = "192.130.168.198";

    before(function (done){
      request.get(testUrl + "/organizationCreate?name=User+Test", function (err, response, body){
        body = JSON.parse(body);
        should.not.exist(body.error);
        should.exist(body.id);
        orgId = body.id;
        done();
      });
    });

    it("Create a Printer", function (done){
      var name = "Test Printer";
      var location = "Test Location";
      var manufacturer = "HP";
      var model = "Testjet 3600";
      var serial = "3827271";
      request.get(testUrl + "/printerCreate?organizationId=" + orgId +
                            "&name=" + name +
                            "&location=" + location +
                            "&ipAddress=" + testIp +
                            "&manufacturer=" + manufacturer +
                            "&model=" + model +
                            "&serial=" + serial, function (err, response, body){
        body = JSON.parse(body);
        should.not.exist(body.error);
        name.should.equal(body.name);
        location.should.equal(body.location);
        testIp.should.equal(body.ipAddress);
        manufacturer.should.equal(body.manufacturer);
        model.should.equal(body.model);
        serial.should.equal(body.serial);
        should.exist(body.id);
        printerId = body.id;
        done();
      });
    });

    it("Update a Printer", function (done){
      newIp = "192.168.130.123";
      request.get(testUrl + "/printerUpdate?organizationId=" + orgId +
                            "&printerId=" + printerId + 
                            "&ipAddress=" + newIp, function (err, response, body){
        body = JSON.parse(body);
        should.not.exist(body.error);
        newIp.should.equal(body.ipAddress);
        printerId.should.equal(body.id);
        done();
      });
    });

    it("Delete a Printer", function (done){
      request.get(testUrl + "/printerDelete?organizationId=" + orgId +
                            "&printerId=" + printerId, function (err, response, body){
        body = JSON.parse(body);
        should.not.exist(body.error);
        body.should.be.empty;
        done();
      })
    });

    after(function (done){
      request.get(testUrl + "/organizationDelete?organizationId=" + orgId, function (err, response, body){
        body = JSON.parse(body);
        should.not.exist(body.error);
        body.should.be.empty;
        done();
      });
    });
  });

});