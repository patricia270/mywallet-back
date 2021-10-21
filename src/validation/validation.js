import Joi from "joi";

const validateSignUp = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string().regex(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/).required()
});

export {
    validateSignUp
};