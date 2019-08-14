module.exports = (sequelize, DataTypes) => {
  const Photo = sequelize.define(
    'photo',
    {
      albumId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false
      },
      thumbnailUrl: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      paranoid: true,
      underscored: true
    }
  );

  Photo.createModel = photo => Photo.create(photo);

  Photo.getOne = photo => Photo.findOne({ where: photo });

  Photo.getAll = () => Photo.findAll();

  return Photo;
};
