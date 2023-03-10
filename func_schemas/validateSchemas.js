const Joi = require('joi').extend(require('@joi/date'));

module.exports = {

    registerSchema: {
        body: Joi.object({
            email:Joi.string().min(6).email().required(),
            password:Joi.string().alphanum().min(6).required(),
            first_name: Joi.string().alphanum().min(3).max(30).required(),
            last_name: Joi.string().alphanum().min(3).max(30).required(),
            address: Joi.string().required(),
            postcode: Joi.string().required(),
            city: Joi.string().required(),
            country: Joi.string().trim().alphanum().required(),
            date_joined: Joi.date().format('DD-MM-YYYY').utc(),
            active: Joi.boolean(),
            user_role: Joi.string(),
            modified: Joi.date().format('DD-MM-YYYY').utc(),
            is_admin: Joi.boolean()

        })
    },
    loginSchema: {
        body: Joi.object({
            email: Joi.string().min(6).email().required(),
            password: Joi.string().alphanum().min(6).required(),
        })
    },
    updateSchema: {
        body: Joi.object({
            email: Joi.string().min(6).email(),
           
        })
    }
};


