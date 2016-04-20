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

  res.render('/applicant/' + req.params.page);

});

router.get('/financial/:page', function (req, res) {

  res.render('/financial/' + req.params.page);

});

router.get('/project/:page', function (req, res) {

  res.render('/project/' + req.params.page);

});

router.get('/project-partners/:page', function (req, res) {

  res.render('/project_partners/' + req.params.page);

});

router.get('/strategy/:page', function (req, res) {

  res.render('/strategy/' + req.params.page);

});

module.exports = router;
