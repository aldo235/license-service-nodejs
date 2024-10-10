const AuthService = require('../../../../infrastructure/service/AuthService');

class AuthUseCase {
    constructor(userRepository, queryUserRepository) {
        this.userRepository = userRepository;
        this.queryUserRepository = queryUserRepository;
        this.authService = new AuthService();
    }

    register = async (payload) => {
        const { email, password } = payload;
        const user = await this.queryUserRepository.findByEmail(email);
        if (user) {
            throw new Error('User already exists');
        }

        const hashedPassword = await this.authService.hash(password);
        const newUser = await this.userRepository.save({email: email, hashedPassword});
        return newUser.response();
    }
}

module.exports = AuthUseCase;