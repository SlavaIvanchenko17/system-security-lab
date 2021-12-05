'use strict';

class SystemLog {
    constructor(data) {
        const {
            id = null, userId, message
        } = data;
        this.id = id;
        this.userId = userId;
        this.message = message;
    }
}

module.exports = SystemLog;