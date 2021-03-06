'use strict';

var express = require('express');
var controller = require('./page.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/:slug', controller.show);
router.get('/', auth.hasRole('admin'), controller.list);
router.post('/', auth.hasRole('admin'), controller.create);
router.get('/:id/revisions', auth.isAuthenticated(), controller.revisions);
router.post('/publish/:id/:revision', auth.hasRole('admin'), controller.publish);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
