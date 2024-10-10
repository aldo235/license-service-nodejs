const AuthService = require('../../../../infrastructure/service/AuthService');

class AuthUseCase {
    constructor(userRepository) {
        this.userRepository = userRepository;
        this.authService = new AuthService();
    }

    login = async (payload) => {
        const { email, password } = payload
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }

        const passwordMatch = await this.authService.compare(password, user.hashedPassword);
        if (!passwordMatch) {
            throw new Error('Password not match');
        }

        const token = await this.authService.generateToken({id: user.id});
        return {token};
    }

    me = async (userId) => {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user.response();
    }
}

module.exports = AuthUseCase;