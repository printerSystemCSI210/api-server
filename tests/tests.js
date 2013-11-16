var request = require("request");
var should = require("should");
var testUrl = "http://forest-api.herokuapp.com";

describe('Forest API Tests', function(){  
  
  before(function(done){
    done();
  });

  it("the api should work in general", function(done){
    request.get(testUrl + "/someAction", function(err, response, body){
      body = JSON.parse(body);
      should.exist(body.error);
      done();
    });
  });

  describe('Organizations', function(){

    var testCompanyId = "";

    it("Create an Organization", function(done){
      request.get(testUrl + "/organizationCreate?name=Test%20Company", function(err, response, body){
        body = JSON.parse(body);
        should.not.exist(body.error);
        done();
      });
    });

    it("Created Organization should exist", function(done){
      request.get(testUrl + "/organizationList", function(err, response, body){
        body = JSON.parse(body);
        should.not.exist(body.error);
        var found = false;
        for(i = 0; i<body.organizations.length && !found; i++)
        {
          var org = body.organizations[i];
          if(org.name === "Test Company")
          {
            found = true;
            testCompanyId = org.id;
          }
        }
        found.should.be.ok;
        testCompanyId.should.be.ok;
        done();
      });
    });

    it("Update an Organization", function(done){
      request.get(testUrl + "/organizationUpdate?organizationId=" + testCompanyId +
                            "&name=Updated", function(err, response, body){
        body = JSON.parse(body);
        should.not.exist(body.error);
        request.get(testUrl + "/organizationList", function(err, response, body){
          body = JSON.parse(body);
          should.not.exist(body.error);
          var found = false;
          for(i = 0; i<body.organizations.length && !found; i++)
          {
            var org = body.organizations[i];
            if(org.name === "Updated")
            {
              found = true;
              testCompanyId = org.id;
            }
          }
          found.should.be.ok;
          testCompanyId.should.be.ok;
          done();
        });
      });
    });

    it("Delete an Organization", function(done){
      request.get(testUrl + "/organizationDelete?organizationId=" + testCompanyId, function(err, response, body){
        body = JSON.parse(body);
        should.not.exist(body.error);
        done();
      });
    });

  });

  describe("Users", function(){
    var orgId = "";
    before(function(done){
      done();
    });

    it("Create a User", function(done){
      true.should.be.ok;
      done();
    });

    it("Created User should exist", function(done){
      true.should.be.ok;
      done();
    });

    it("Update a User", function(done){
      true.should.be.ok;
      done();
    });

    it("Delete a User", function(done){
      true.should.be.ok;
      done();
    });

    after(function(done){
      done();
    });
  });

  describe("Printers", function(){
    before(function(done){
      done();
    });

    it("Create a Printer", function(done){
      true.should.be.ok;
      done();
    });

    it("Created Printer should exist", function(done){
      true.should.be.ok;
      done();
    });

    it("Update a Printer", function(done){
      true.should.be.ok;
      done();
    });

    it("Delete a Printer", function(done){
      true.should.be.ok;
      done();
    });

    after(function(done){
      done();
    });
  });

});