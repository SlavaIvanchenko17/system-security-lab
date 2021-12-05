'use strict';

const User= require('../../../domain/User');
const BaseRepository = require('../BaseRepository');

class UserRepository extends BaseRepository {
    constructor() {
        super();
        this.model = this.db.models.user;
    }

    async read() {
        const users = await this.model.findAll({ raw: true });
        return users.map((user) => new User(user));
    }

    async create(data) {
        const user = await this.model.create(data);
        return new User(user);
    }

    async readByEmail(data) {
        const user = await this.model.findOne({ raw: true, where: data });
        return new User(user);
    }

    async unBlocked(id) {
        await this.model.update({ isBlocked: false }, { where: { id } });
        await this.updateCountLogin(id, 0);
    }

    async blocked(id) {
        await this.model.update({ isBlocked: true }, { where: { id } });
    }

    async updateCountLogin (id, count) {
        await this.model.update({ countLogin: count }, { where: { id } });
    }

    async delete(id) {
        return this.model.destroy({
            where: { id },
        });
    }
}

module.exports = UserRepository;
