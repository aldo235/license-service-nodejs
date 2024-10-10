
const moment = require('moment');

class UserUseCase {
    constructor(userRepository, passwordHasher) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
    }
}

module.exports = UserUseCase;