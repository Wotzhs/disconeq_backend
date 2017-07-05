const ContactController = require('../controllers/contact_controller');

module.exports = (app) => {

	app.use(ContactController.loginRequired);
	app.route('/api/contacts')
		.get(ContactController.fetchContacts)
		.post(ContactController.createContact);
	app.route('/api/contacts/:id')
		.patch(ContactController.updateContact)
		.delete(ContactController.deleteContact);
}