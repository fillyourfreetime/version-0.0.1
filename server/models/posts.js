module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("Posts", {
      posttitle: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      posttext: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postImage: {
        type: DataTypes.STRING,
        allowNull: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });

    Posts.associate = (models) => {
      Posts.hasMany(models.comments, {
        onDelete: "cascade",
      });
    };
    return Posts;
  };
  