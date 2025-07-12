const { GroupService } = require("../../../service");
const {
  ApiResponse: { successResponse, serverError },
} = require("../../../responses");
const {
  db: { GroupMember },
} = require("../../../db/models");
const { MessageResponse: m } = require("../../../responses");
const { Sequelize } = require("sequelize");

class GroupController {
  constructor() {
    this.groupService = new GroupService();
  }

  list = async (req, res) => {
    try {
      let { currentPage, pageSize, isPaginate = false } = req.query;

      const options = {
        include: [
          {
            model: GroupMember,
            attributes: {
              include: [
                [
                  Sequelize.literal(`(
                      SELECT COUNT(*) FROM matchs 
                        WHERE matchs.p1 = groupMembers.user_fk
                        or matchs.p2 = groupMembers.user_fk
                    )`),
                  "matches_count",
                ],
                [
                  Sequelize.literal(`(
                      SELECT COUNT(*) FROM matchs 
                        WHERE matchs.winner_fk = groupMembers.user_fk
                    )`),
                  "match_winning_count",
                ],
                [
                  Sequelize.literal(`(
                      SELECT COUNT(*) FROM matchs 
                        WHERE matchs.loser_fk = groupMembers.user_fk
                    )`),
                  "match_losing_count",
                ],
              ],
            },
          },
        ],
      };

      if (isPaginate) {
        options.currentPage = currentPage;
        options.pageSize = pageSize;
        options.is_paginate = isPaginate;
      }

      const league = await this.groupService.findAll(options);

      return successResponse(1, "Retrieve group list successfully", league);
    } catch (error) {
      const errMsg = typeof error == "string" ? error : error.message;
      return serverError(0, m.internalServerError, errMsg);
    }
  };
}

module.exports = GroupController;
