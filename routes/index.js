var express = require('express');var passport = require('passport');var router = express.Router();var mysql = require('mysql');var dbquerymodule = require('./../config/dbQuerymodule.js');var multer = require('multer');var connection = mysql.createConnection({	host:'localhost',	user:'root',	password:'root'});//connection.query('use auth');connection.query('use authapi');var Storage = multer.diskStorage({	destination: function (req, file, callback) {		//callback(null, "../../images");		callback(null, "./images");	},	filename: function (req, file, callback) {		callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);	}});var upload = multer({ storage: Storage }).single('imgUploader');/* GET home page. */router.get('/', function(req, res, next) {  res.render('index', { title: 'Authentication' });});router.get('/login', function(req, res, next){	res.render('login.ejs', {		message:req.flash('loginMessage')	});});router.get('/signup', function(req, res){	res.render('signup.ejs', {		message:req.flash('signupMessage')	});});router.get('/loginform', function (req, res, next) {	res.contentType('application/json').status(200);	//var errmsg=req.flash('loginMessage');	var x = {"msg": "Upload File Fail"};	var jsovval = JSON.stringify(x);	res.send(jsovval);});router.get('/profileGoogle',function(req,res){	res.render('profileGoogle.ejs', {		user:req.user	});});router.get('/profileFB',function(req,res){	res.render('profileFB.ejs', {		user:req.user	});});router.get('/profile', function(req, res){	//var userid=req.user.email;var xy='';	/*dbquerymodule.urlauth(userid,function(a){		console.log('The Call back value is ---------->'+ a);		res.contentType('application/json').status(200);		var r=dbquerymodule.getulrdata(req,res,userid);		var dev={"x":r,"y":a};		xy=a;		res.send(dev);	});*/	/*var dev=dbquerymodule.urlauth(userid,function(callback){		console.log('The Call back value is ---------->'+ callback);		//res.contentType('application/json').status(200);		//var r=dbquerymodule.getulrdata(req,res,userid);		//var dev={"x":r,"y":callback};		xy=callback;		console.log('bbbbbbbbbbb'+xy);		//res.send(dev);		return xy;	});	console.log('bbbbbbbbbbbbbbbbbbb xyxyxyxyyxy-->'+dev);*/	/*var urldta1=dbquerymodule.getulrdata(req,res,userid);	/!*console.log("the Req- mail-->"+req.user.email);*!/	//console.log('the url module is -->'+JSON.stringify(urldta));	console.log('the url module 11is -->'+JSON.stringify(urldta1));	console.log('the Url is  -->'+req.url);*/	res.render('profile.ejs', {		user:req.user	});});router.post('/uploadFile',function(req,res){//var upload = multer({ storage: Storage }).array("imgUploader", 3);	upload(req, res, function(err) {		if(err){			console.log(err);			res.end('The Error is ---'+err);		}else{			//res.end('File is uploaded')			/*res.contentType('application/json').status(200);			//var errmsg=req.flash('loginMessage');			var x = {"msg": "Upload File Successfull"};			var jsovval = JSON.stringify(x);			res.send(jsovval);*/			res.render('successMsg.ejs', {				successmsg:'The File uploaded Successfully'			});		}	});	});router.post('/uploadFileAPI',function(req,res){//var upload = multer({ storage: Storage }).array("imgUploader", 3);	upload(req, res, function(err) {		if(err){			console.log(err);			res.end('The Error is ---'+err);		}else{			//res.end('File is uploaded')			res.contentType('application/json').status(200);			//var errmsg=req.flash('loginMessage');			var x = {"msg": "Upload File Successfull"};			var jsovval = JSON.stringify(x);			res.send(jsovval);			/*res.render('successMsg.ejs', {				successmsg:'The File uploaded Successfully'			});*/		}	});});router.get('/logout', function(req, res){	req.logout();	res.redirect('/');});router.post('/signup', passport.authenticate('local-signup',{	successRedirect:'/profile',	failureRedirect:'/signup',	failureFlash:true}));router.post('/login', passport.authenticate('local-login',{	successRedirect:'/profile',	failureRedirect:'/login',	failureFlash:true,	session:true}));router.post('/loginform', passport.authenticate('local-login',{	successRedirect:'/uploadFileAPI',	failureRedirect:'/loginform',	failureFlash:true,	session:true}));// GET /auth/google//   Use passport.authenticate() as route middleware to authenticate the//   request.  The first step in Google authentication will involve//   redirecting the user to google.com.  After authorization, Google//   will redirect the user back to this application at /auth/google/callbackrouter.get('/authDev/google',	passport.authenticate('googleauthStretagy', { scope: ['email profile'] }));// GET /auth/google/callback//   Use passport.authenticate() as route middleware to authenticate the//   request.  If authentication fails, the user will be redirected back to the//   login page.  Otherwise, the primary route function function will be called,//   which, in this example, will redirect the user to the home page.router.get('/auth/google/callback',	passport.authenticate('googleauthStretagy', {		failureRedirect: '/login'	}),	function(req, res) {		// Authenticated successfully		console.log('Successfully Redirect to ----->/profileGoogle');		res.redirect('/profileGoogle');	});router.get('/login/facebook',	passport.authenticate('fbauthStretagy'));router.get('/auth/fb/callback',	passport.authenticate('fbauthStretagy', { failureRedirect: '/login' }),	function(req, res) {		res.redirect('/profileFB');	});module.exports = router;function isLoggedIn(req,res,next) {	if(req.isAuthenticated())		return next();	res.redirect('/');}