'use strict';
module.exports = (sequelize, DataTypes) => {
  const Link = sequelize.define('Link', {
    link: DataTypes.STRING,
    shortlink: DataTypes.STRING
  }, {
    tableName:'links'
  });
  Link.associate = function(models) {
    // associations can be defined here
  };
  return Link;
};