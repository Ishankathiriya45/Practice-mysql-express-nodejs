"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class GroupMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Group, { foreignKey: "group_fk" });
    }
  }
  GroupMember.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      group_fk: DataTypes.UUID,
      user_fk: DataTypes.UUID,
      points: DataTypes.DECIMAL,
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      is_blocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: true,
      sequelize,
      modelName: "GroupMember",
      tableName: "groupmembers",
    }
  );
  return GroupMember;
};
