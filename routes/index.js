const router = require('express').Router();
const register = require('../controllers/account/register');
const login = require('../controllers/account/login');
const editPassword = require('../controllers/account/editPassword');
const music = require('../controllers/music');
const upload = require('../controllers/music/musicJobs');
const util = require('./util');

// account
router.get('/register', register.index);
router.post('/register', register.store);
router.get(['/', '/login'], login.index);
router.post('/signIn', login.signIn);
router.get('/signOut', util.hasSession, login.signOut);
router.get('/editPassword', util.hasSession, editPassword.edit);
router.put('/editPassword', editPassword.update);

// music manager
router.get('/main', util.hasSession, music.index);
router.get('/create', util.hasSession, music.create);
router.post('/main', upload.uploadMusic, music.store);
router.get('/:id/edit', util.hasSession, music.edit);
router.put('/update', upload.uploadMusic, music.update);

module.exports = router;