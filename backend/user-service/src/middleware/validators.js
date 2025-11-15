import Joi from "joi";

const registerSchema = Joi.object({
  username: Joi.string().required().min(3).max(50),
  email: Joi.string()
    .required()
    .unique()
    .min(5)
    .max(50)
    .email({
      tlds: { allow: ["com", "net", "org"] },
    })
    .messages({
      "string.min": "Email must be at least 6 characters long",
      "string.max": "Email must be at most 60 characters long",
      "string.email": "Email must be a valid email address (com,net,org)",
      "any.required": "Email is required",
    }),
  password: Joi.string()
    .min(8)
    .max(30)
    .required()
    .pattern(/^(?=.*[a-z])/, "lowercase")
    .pattern(/^(?=.*[A-Z])/, "uppercase")
    .pattern(/^(?=.*\d)/, "number")
    .pattern(/^(?=.*[^a-zA-Z0-9])/, "special")
    .messages({
      "string.min": "Password must be at least 8 characters long.",
      "string.max": "Password cannot exceed 30 characters.",
      "any.required": "Password is required.",
      "string.pattern.name":
        "Password must include at least one {#name} character.",
    }),
});

export default registerSchema;
