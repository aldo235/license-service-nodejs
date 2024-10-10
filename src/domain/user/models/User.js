class User {
    constructor(id, email, hashedPassword, passwordHasher) {
        this.id = id;
        this.email = email;
        this.hashedPassword = hashedPassword;
        this._passwordHasher = passwordHasher;
    }
    
    verifyPassword = (password) => {
        return this._passwordHasher.compare(password, this.hashedPassword);
    }

    hashPassword = async (password) => {
        this.hashedPassword = await this._passwordHasher.hash(password);
        return this;
    }

    response = () => {
        return {
            id: this.id,
            email: this.email
        };
    }
}
  
module.exports = User;