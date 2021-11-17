import Joi from 'joi';

const validateSignUp = Joi.object({
    name: Joi.string().regex(/^([a-z]|[à-ü])/i).required(),
    email: Joi.string().email(),
    password: Joi.string().regex(/^([a-z]|[à-ü]|[\d])/i).min(8),
});

const validateSignIn = Joi.object({
    email: Joi.string().email(),
    password: Joi.string().min(8),
});

const validateInputAndOutput = Joi.object({
    value: Joi.number().required(),
    description: Joi.string().regex(/^([a-z]|[à-ü])/i).required(),
});

export {
    validateSignUp,
    validateSignIn,
    validateInputAndOutput,
};
