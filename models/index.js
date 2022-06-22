const User = require("./User");
const Post = require("./Post");
const Favorite = require('./Favorite');

User.hasMany(Post, {
    foreignKey: 'user_id'
  });
  
  Post.belongsTo(User, {
    foreignKey: 'user_id'
  });

  User.belongsToMany(Post, {
    through: Favorite,
    as: 'favorited_posts',
    foreignKey: 'user_id'
  });

  Post.belongsToMany(User, {
    through: Favorite,
    as: 'favorited_posts',
    foreignKey: 'post_id'
  });

  Favorite.belongsTo(User, {
    foreignKey: 'user_id'
  });
  
  Favorite.belongsTo(Post, {
    foreignKey: 'post_id'
  });
  
  User.hasMany(Favorite, {
    foreignKey: 'user_id'
  });
  
  Post.hasMany(Favorite, {
    foreignKey: 'post_id'
  });

module.exports = { User, Post, Favorite};