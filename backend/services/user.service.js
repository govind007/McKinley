class UserService {
    constructor(body) {
        this.body = body
    }

    signIn(callback) {
        const { user, tokenDetail: { token } } = this.body;
        user.save((err) => {
            if (err) {
                console.log(err);
                return callback(err)
            }
            const { id, name, email } = user;
            callback(null, { id, name, email, token })
        })
    }
}

module.exports = UserService;
