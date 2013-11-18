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
      request.get(testUrl + "/organizationCreate?name=Test%20Company", function (err, response, body){
        body = JSON.parse(body);
        should.not.exist(body.error);
        should.exist(body.id);
        testCompanyId = body.id;
        done();
      });
    });

    it("Update an Organization", function (done){
      var newName = "Updated";
      request.get(testUrl + "/organizationUpdate?organizationId=" + testCompanyId +
                            "&name=" + newName, function (err, response, body){
        body = JSON.parse(body);
        should.not.exist(body.error);
        should.exist(body.name);
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
      var name = "Sample Name";
      var email = "sample@test.com";
      request.get(testUrl + "/userCreate?organizationId=" + orgId +
                            "&name=" + name +
                            "&email=" + email +
                            "&password=pass&admin=true", function (err, response, body){
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

    it("Update a User", function (done){
      var newName = "Changed Name";
      request.get(testUrl + "/userUpdate?userId=" + userId +
                            "&name=" + newName, function (err, response, body){
        body = JSON.parse(body);
        should.not.exist(body.error);
        newName.should.equal(body.name);
        userId.should.equal(body.id);
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
      var ip = "192.130.168.198";
      var manufacturer = "HP";
      var model = "Testjet 3600";
      var serial = "3827271";
      request.get(testUrl + "/printerCreate?organizationId=" + orgId +
                            "&name=" + name +
                            "&location=" + location +
                            "&ipAddress=" + ip +
                            "&manufacturer=" + manufacturer +
                            "&model=" + model +
                            "&serial=" + serial, function (err, response, body){
        body = JSON.parse(body);
        should.not.exist(body.error);
        name.should.equal(body.name);
        location.should.equal(body.location);
        ip.should.equal(body.ipAddress);
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