import registerSchema from "../middleware/validators";
import user from "../model/user";
import logger from "../utils/logger";

const registerUser = async (req, res) => {
  try {
    logger.info("Registering User endpoint ... ");
    const { username, email, password } = req.body;

    const { error } = registerSchema.validate({ username, email, password });

    // if (!username || !email || !password) {
    //   logger.error("Need something parameter ...");
    //   return res.status(404).json({
    //     success: false,
    //     message: "Need to fill parameter",
    //   });
    // }

    if (error) {
      const messages = error.details.map((details) => details.message);
      logger.error(messages);
      return res.status(400).json({
        success: false,
        message: "validation failed",
        errors: messages,
      });
    }

    const existingUser = await user.findOne({ email: email });

    if (existingUser) {
      logger.warn("User already exist with this email");
      return res.status(400).json({
        success: false,
        message: "User already exist, plase sign in with other email",
      });
    }

    // if no existin user save

    const newUser = await user.create({ username, email, password });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export { registerUser };
