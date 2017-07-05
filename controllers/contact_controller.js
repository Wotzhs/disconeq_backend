const Contact = require('../models/contact');
const jwt     = require('jsonwebtoken');
const config  = require('../config/config');

module.exports = {
	fetchContacts( req, res ) {
		Contact.find( { user: req.user.id } ).where('deleted').equals(false).sort( 'name' )
			.then( ( contacts ) => {
				if (!contacts) {
					return res.json({
						success: true,
						contacts: 'hehe'})
				}
				res.json({
					success: true,
					contacts: contacts
				}) 
			})
			.catch( (err) => {
				res.json({
					success: false
				})
			})
	},
	createContact( req, res ) {
		console.log(req.body)
		req.body['user'] = req.user.id;
		console.log(req.user)
		var newContact = new Contact( req.body );
		newContact.save()
			.then( () => res.json({
				success: true
			}))
			.catch( (err) => {
				console.log(err)
				res.json({
					success: false
				})	
			})
	},
	updateContact( req, res ) {
		Contact.findByIdAndUpdate( req.params.id, req.body )
			.then( result => {
				res.json({
					success: true
				})
			})
			.catch( () => {
				res.json({
					success: false
				})
			});
	},
	deleteContact( req, res ) {
		Contact.findByIdAndUpdate( req.params.id, { deleted: true } )
			.then( result => {
				res.json({
					success: true
				});
			})
			.catch( () => {
				res.json({
					success: false
				});
			})
	},
	loginRequired( req, res, next ) {
		var token = req.headers['x-access-token'];
		if ( !token ) {
			return res.json({ status: 'error', message: 'No token was provided' })
		}
		jwt.verify( token, config.secretKey, (error, decoded) => {
			if ( error ) {
				res.json({ status: 'error', message: 'Bad token'})
			}
			req.user = decoded;
			next();
		} )
	}
}