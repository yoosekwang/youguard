
1. User Routes
Route	Method	Controller Function	Purpose
/users/register	POST	registerUser	Register a new user.
/users/login	POST	loginUser	Authenticate user.
/users/password-recovery	POST	recoverPassword	Send password recovery email.
/users/messages	POST	sendMessage	Send a message to the admin.
/users/messages	GET	getMessages	Fetch all messages from the admin.
/users/software	GET	downloadSoftware	Download software (if approved).
2. Admin Routes
Route	Method	Controller Function	Purpose
/admin/users	GET	getAllUsers	Get all users.
/admin/users/:id	PUT	updateUser	Update user details.
/admin/users/:id/approve	PUT	approveUser	Approve a user for downloads.
/admin/users/:id/revoke	PUT	revokeUser	Revoke user approval.
/admin/messages	GET	getMessages	Fetch all messages from users.
/admin/messages/:id	POST	sendMessage	Respond to a user's message.
/admin/announcements	POST	createAnnouncement	Create a new announcement.
/admin/announcements	GET	getAnnouncements	Get the current announcement.
/admin/announcements/:id	DELETE	deleteAnnouncement	Delete an announcement.
/admin/software	POST	uploadSoftware	Upload a new software version.
/admin/software	GET	getSoftwareDetails	Get software version details.
