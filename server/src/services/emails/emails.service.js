// Initializes the `emails` service on path `/api/emails`
const { Emails } = require("./emails.class");
const hooks = require("./emails.hooks");
const Mailer = require("feathers-mailer");
const smtpTransport = require("nodemailer-smtp-transport");

module.exports = function(app) {
    // Initialize our service with any options it requires
    app.use(
        "/api/emails",
        Mailer(
            smtpTransport({
                service: "gmail",
                auth: {
                    user: "gabimezzanotte@gmail.com",
                    pass: "luvsoiukljhfhenl"
                }
            }),
            { from: "gabimezzanotte@gmail.com" }
        )
    );

    // Get our initialized service so that we can register hooks
    const service = app.service("api/emails");

    service.hooks(hooks);
};
