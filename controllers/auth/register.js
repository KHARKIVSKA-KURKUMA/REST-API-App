const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4: uuid } = require("uuid");
const { basedir } = global;
const { User, schemas } = require(`${basedir}/models/user`);
const {
  errorMessage,
  emailSender,
  verificationLetter,
} = require(`${basedir}/helpers`);

const register = async (req, res) => {
  const { error } = schemas.register.validate(req.body);
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
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw errorMessage({ status: 409, message: `Email ${email} in use` });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);
  const verificationToken = uuid();
  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationToken,
  });
  await emailSender(verificationLetter(email, verificationToken));
  res.status(201).json({
    user: { email: result.email, subscription: "starter" },
  });
};

module.exports = register;
