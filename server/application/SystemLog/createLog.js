'use strict';

const SystemLog = require('../../domain/SystemLog');

module.exports = async (data, {SystemLogRepository}) => SystemLogRepository.create(new SystemLog(data));