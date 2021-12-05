'use strict';

class DirectoryUserMapping {
    constructor(data) {
        const {
            id = null, userId, directoryId
        } = data;
        this.id = id;
        this.userId = userId;
        this.directoryId = directoryId;
    }
}

module.exports = DirectoryUserMapping;