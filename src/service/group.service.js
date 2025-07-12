const { GroupRepository } = require("../repository");

class GroupService {
  findAll = async (options = {}) => {
    return await GroupRepository.findAll(options, true);
  };
}

module.exports = GroupService;
