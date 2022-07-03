const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment, Favorite } = require('../models');

router.get('/', (req, res) => {
  console.log(req.session);
  Post.findAll({
    attributes: [
      'id',
      'album_artist',
      'album_title',
      'albumart_url',
      'review',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM favorite WHERE favorite.id = favorite.post_id)'), 'favorite_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      // pass a single post object into the homepage template
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/post/:id', (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'album_artist',
      'album_title',
      'albumart_url',
      'review',
      'created_at',
      [sequelize.literal('(SELECT COUNT(*) FROM favorite WHERE favorite.id = favorite.post_id)'), 'favorite_count']
    ],
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      // serialize the data
      const post = dbPostData.get({ plain: true });

      // pass data to template
      res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;