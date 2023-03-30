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
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    phonenumber: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    emailverification: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
  });
  //Users.associate = (models) => {
  //  Users.hasMany(models.Likes, {
  //    onDelete: "cascade",
  //  });
  //  Users.hasMany(models.followers, {
  //    onDelete:"cascade"
  //  })
  //};
  return Users;
};
