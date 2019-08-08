module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define(
    'album',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      paranoid: true,
      underscored: true
    }
  );

  Album.createModel = album => Album.create(album);

  Album.getOne = album => Album.findOne({ where: album });

  Album.getAll = () => Album.findAll();

  return Album;
};
