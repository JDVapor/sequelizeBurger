module.exports = function(sequelize, DataTypes) {
  var Burger = sequelize.define('Burger', {
    burger_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    devoured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, {
    timestamps: false
  });

  Burger.associate = function(models) {
    Burger.hasOne(models.Customer, {
      onDelete: "cascade"
    });
  };

  return Burger;
}
