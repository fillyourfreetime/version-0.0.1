module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    phonenumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    emailverification: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 0,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pfp: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "images/profile_pictures/defualtpfp.jpg",
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "hi I'm using fillyourfreetime",
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    theme: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "system",
    },
    numberofposts: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });
  Users.associate = (models) => {
    Users.hasMany(models.Posts, {
      onDelete: "cascade",
    });

    Users.hasMany(models.comments, {
      onDelete: "cascade",
    });
  };
  return Users;
};
