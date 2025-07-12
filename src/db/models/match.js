"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Match.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      p1: DataTypes.UUID,
      p2: DataTypes.UUID,
      skill_level: DataTypes.STRING,
      location: DataTypes.STRING,
      winner_fk: DataTypes.UUID,
      loser_fk: DataTypes.UUID,
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      timestamps: true,
      sequelize,
      modelName: "Match",
      tableName: "matchs",
    }
  );
  return Match;
};
