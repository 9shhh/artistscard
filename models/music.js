'use strict';
module.exports = (sequelize, DataTypes) => {
  const Music = sequelize.define('Music', {
    userId: DataTypes.STRING,
    track: DataTypes.STRING,
    album: DataTypes.STRING,
    artist: DataTypes.STRING,
    filePath: DataTypes.STRING
  }, {});
  Music.associate = function(models) {
    // associations can be defined here
  };
  return Music;
};