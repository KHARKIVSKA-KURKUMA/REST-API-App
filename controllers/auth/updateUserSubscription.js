const { basedir } = global;
const { User, schemas } = require(`${basedir}/models/user`);
const { errorMessage } = require(`${basedir}/helpers`);

const updateUserSubscription = async (req, res) => {
  const { error } = schemas.subscription.validate(req.body);
  if (error) {
    if (error.details[0].type === "any.required") {
      throw errorMessage({
        status: 400,
        message: `missing required ${error.details[0].context.label} field`,
      });
    } else if (error.details[0].type === "any.only") {
      throw errorMessage({
        status: 400,
        message:
          "Please select a subscription plan from the available options: starter, pro, or business",
      });
    } else {
      throw errorMessage({
        status: 400,
        message: error.message,
      });
    }
  }

  const { userId } = req.params;

  const result = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
  });

  if (!result) throw errorMessage({ status: 404 });
  res.json(result);
};

module.exports = updateUserSubscription;
