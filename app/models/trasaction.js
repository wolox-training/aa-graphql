module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define(
    'transaction',
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

  Transaction.createModel = transaction => Transaction.create(transaction);

  Transaction.getOne = transaction => Transaction.findOne({ where: transaction });

  Transaction.getAll = () => Transaction.findAll();

  return Transaction;
};
