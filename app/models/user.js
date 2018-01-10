// My model that contains the schema of the user
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
        email        : String,
        name         : String,
        password     : String,
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);

// user = {'username': bla, 'password': SHA512, 'email': email@bla.com}
// message = {'text': bla} ist verbunden mit user message x-->User und mit message-->1recipients
// group = {'name': bla} ist verbunden 0..*group<-->1..*user
// recipients = {} verbunden mit x-->0..*user und x-->0..*group
