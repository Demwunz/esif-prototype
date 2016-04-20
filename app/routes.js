var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {

  res.render('index');

});

router.get('/dashboard', function (req, res) {

  res.render('dashboard');

});

router.get('/full-application', function (req, res) {

  res.render('full-application');

});

router.get('/applicant/:page', function (req, res) {

  res.render('/applicant/' + req.params.page + '.html');

});

router.get('/financial/:page', function (req, res) {

  res.render('/financial/' + req.params.page + '.html');

});

router.get('/project/:page', function (req, res) {

  res.render('/project/' + req.params.page + '.html');

});

router.get('/project-partners/:page', function (req, res) {

  res.render('/project_partners/' + req.params.page + '.html');

});

router.get('/strategy/:page', function (req, res) {

  res.render('/strategy/' + req.params.page + '.html');

});

module.exports = router;
