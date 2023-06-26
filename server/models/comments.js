module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("comments", {
    commentext: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Comments;
};
