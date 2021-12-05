'use strict';

const { Op } = require("sequelize");
const DirectoryUserMapping = require('../../../domain/DirectoryUserMapping');
const BaseRepository = require('../BaseRepository');

class DirectoryUserMappingRepository extends BaseRepository {
    constructor() {
        super();
        this.model = this.db.models.directoryusermapping;
    }

    async read(userId, directoryId) {
        const directoryusermapping = await this.model.findOne({
            where: { [Op.and]: [{ userId }, { directoryId }]},
            raw: true });

        if (directoryusermapping) {
            return new DirectoryUserMapping(directoryusermapping);
        } else {
            return null;
        }
    }

    async create(data) {
        const directoryusermapping = await this.model.create(data);
        return new DirectoryUserMapping(directoryusermapping);
    }

    async delete(id) {
        return this.model.destroy({
            where: { id },
        });
    }
}

module.exports = DirectoryUserMappingRepository;