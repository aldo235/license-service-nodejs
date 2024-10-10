
const moment = require('moment');

class UserUseCase {
    constructor(userRepository, passwordHasher) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
    }

    async createUser(email, password) {
        const user = await this.userRepository.findByEmail(email);
        if (user) {
            throw new Error('User already exists');
        }

        const hashedPassword = await this.passwordHasher.hash(password);
        const newUser = await this.userRepository.save({email, hashedPassword, createdAt: moment().toISOString()});
        return newUser;
    }
}

module.exports = UserUseCase;