module.exports = (sequelize, DataTypes) => {
  const Posts = sequelize.define("Posts", {
    posttitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    posttext: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    postImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    numberofposts: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Posts.associate = (models) => {
    Posts.hasMany(models.comments, {
      onDelete: "cascade",
    });
  };
  return Posts;
};
