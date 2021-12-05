'use strict';

const SystemLog = require('../../../domain/SystemLog');
const BaseRepository = require('../BaseRepository');

class SystemLogRepository extends BaseRepository {
    constructor() {
        super();
        this.model = this.db.models.systemlog;
    }

    async read() {
        const systemlogs = await this.model.findAll({ raw: true });
        return systemlogs.map((systemlog) => new SystemLog(systemlog));
    }

    async create(data) {
        const systemlog = await this.model.create(data);
        return new SystemLog(systemlog);
    }
}

module.exports = SystemLogRepository;