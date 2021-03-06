exports.action = {
	name: 'authenticate',
	description: 'Authenticates a User\'s Credentials',
	version: 1,
	inputs: {
		required: [ 'email', 'password' ],
		optional: []
	},
	outputExample: {
		authenticated: true,
		name: "Example User",
		email: "email@example.com",
		admin: true,
		organizations: ["456"],
		id: "123"
	},
	run: function (api, connection, next) {
		api.mongoose.model('User').findOne({ email: connection.params.email }, function (err, res){
			if(res) {
				//Compare passwords
				var bcrypt = require('bcrypt');
				if(bcrypt.compareSync(connection.params.password, res.password))
				{
					//Valid user
					connection.response.authenticated = true;
					connection.response.name = res.name;
					connection.response.email = res.email;
					connection.response.admin = res.admin;
					connection.response.organizations = res.organizations;
					connection.response.id = res._id;
				}
				else {
					//Incorrect email/password combo
					connection.response.authenticated = false;
					connection.error = "Incorrect Email/Password Combination";
				}
			}
			else {
				//User does not exist
				connection.response.authenticated = false;
				connection.error = "Given Email does not Exist";
			}
			next(connection, true);
		});
	}
}