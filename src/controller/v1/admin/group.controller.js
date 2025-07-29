const { GroupService } = require("../../../service");
const {
  ApiResponse: { successResponse, serverError },
} = require("../../../responses");
const {
  db: { GroupMember, User },
} = require("../../../db/models");
const { MessageResponse: m } = require("../../../responses");
const { Sequelize } = require("sequelize");
const XLSX = require("xlsx");

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

  create = async (req, res) => {
    try {
      const workbook = XLSX.readFile(req.file.path);
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const users = XLSX.utils.sheet_to_json(sheet);

      let created = 0;
      let updated = 0;

      for (const userData of users) {
        const [user, wasCreated] = await User.upsert(
          {
            name: userData.name,
            email: userData.email,
            age: userData.age,
          },
          {
            returning: true,
            conflictFields: ["email"], // ensure email is set as unique in DB
          }
        );

        if (wasCreated) created++;
        else updated++;
      }

      return successResponse(1, "Users register successfully", created);
    } catch (err) {
      return serverError(0, "Failed", err.message);
    }
  };
}

module.exports = GroupController;
