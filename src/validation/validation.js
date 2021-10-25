import Joi from "joi";

const validateSignUp = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string().min(8)
});

const validateInputAndOutput = Joi.object({
    value: Joi.number().required(),
    description: Joi.string().required()
});

export {
    validateSignUp,
    validateInputAndOutput
};