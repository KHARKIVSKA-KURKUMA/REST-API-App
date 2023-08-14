const { basedir } = global;

const { User, schemas } = require(`${basedir}/models/user`);

const {
  errorMessage,
  emailSender,
  verificationLetter,
} = require(`${basedir}/helpers`);

const resendVerifyEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const { error } = schemas.email.validate({ email });
    if (error) {
      const label = error.details[0].context.label;
      if (error.details[0].type === "any.required") {
        throw errorMessage({
          status: 400,
          message: `missing required ${label} field`,
        });
      } else {
        throw errorMessage({
          status: 400,
          message: `${error.details[0].message}`,
        });
      }
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw errorMessage({ status: 400 });
    }
    if (user.verify) {
      throw errorMessage({
        status: 400,
        message: `Verification has already been passed`,
      });
    }
    await emailSender(verificationLetter(email, user.verificationToken));
    res.json({
      message: "Verification email sent",
    });
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};

module.exports = resendVerifyEmail;
