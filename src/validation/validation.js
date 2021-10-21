import Joi from "joi";

const validateSignUp = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string().regex(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/).required()
});

const validateInput = Joi.object({
    value: Joi.number().required(),
    description: Joi.string().required()
});

export {
    validateSignUp,
    validateInput
};