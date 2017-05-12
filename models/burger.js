// Creating the model for a Burger
module.exports = function(sequelize, DataTypes) {
  var Burger = sequelize.define("Burger", {
    burger_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2]
      }
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false
    }
  );
  return Burger;
};