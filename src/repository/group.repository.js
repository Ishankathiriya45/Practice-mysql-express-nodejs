const {
  db: { Group },
} = require("../db/models");
const {
  CommonUtil: { fetchRecord },
} = require("../utils");

class GroupRepository {
  findAll = async (options, unscoped = false) => {
    return await fetchRecord(Group, options, options.is_paginate, unscoped);
  };
}

module.exports = new GroupRepository();
