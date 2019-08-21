module.exports = (sequelize, DataTypes) => {
  const Purchase = sequelize.define(
    'purchase',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      albumId: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      paranoid: true,
      underscored: true
    }
  );

  Purchase.createModel = purchase => Purchase.create(purchase);

  Purchase.getOne = purchase => Purchase.findOne({ where: purchase });

  Purchase.getAll = () => Purchase.findAll();

  return Purchase;
};
