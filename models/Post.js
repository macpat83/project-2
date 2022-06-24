const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


// create our Post model
class Post extends Model {
  static upvote(body, models) {
    return models.Favorite.create({
      user_id: body.user_id,
      post_id: body.post_id
    }).then(() => {
      return Post.findOne({
        where: {
          id: body.post_id
        },
        attributes: [
          'id',
          'album_artist',
          'album_title',
          'albumart_url',
          'review',
          'created_at',
          [
            sequelize.literal('(SELECT COUNT(*) FROM favorite WHERE post.id = favorite.post_id)'),
            'favorite_count'
          ]
        ]
      });
    });
  }
}

// create fields/columns for Post model
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    album_title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    album_artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    albumart_url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isURL: true
        }
      },
      review: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  }
);

module.exports = Post;