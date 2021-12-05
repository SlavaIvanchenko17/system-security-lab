'use strict';

class User {
    constructor(data) {
        const {
            id = null, email, password, countLogin = 0, isBlocked = false, isAdmin = false
        } = data;
        this.id = id;
        this.email = email;
        this.password = password;
        this.isBlocked = isBlocked;
        this.isAdmin = isAdmin;
        this.countLogin = countLogin;
    }
}

module.exports = User;