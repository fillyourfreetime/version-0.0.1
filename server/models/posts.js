module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
      posttext: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postImage: {
        type: DataTypes.STRING,
        allowNull: true
      }
    });
    return Posts;
  };
  