const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const UserRepository = require('../repository/user-repository.js');
const {JWT_KEY} = require('../config/serverConfig.js');

class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }
    
    async create(data){
        try {
            const user = await this.userRepository.create(data);
            return user;
        } catch (error) {
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }

    createToken(user){ //user is object
        try {
            const result = jwt.sign(user, JWT_KEY, {expiresIn: '1d'});
            return result;
        } catch (error) {
            console.log("Something went wrong in the service layer while token creation");
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY); //returns the payload (data) that was used when the token was created, after verifying it
            return response;
        } catch (error) {
            console.log("Something went wrong in the service layer while token validation", error);
            throw error;
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } catch (error) {
            console.log("Something went wrong in service layer in password comparison");
            throw error;
        }
    }
}

module.exports = UserService;