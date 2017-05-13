// Creating the model for a Customer
module.exports = function(sequelize, DataTypes) {
  var Customer = sequelize.define("Customer", {
    customer_name: {
      type: DataTypes.STRING,
      defaultValue: "No name"
    },
  },
    {
      classMethods: {
        associate: function(models) {
          Customer.hasOne(models.Burger, {
            onDelete: "cascade"
          });
        }
      }
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: false
    }
  );
  return Customer;
};