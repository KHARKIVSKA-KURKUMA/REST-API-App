const getCurrent = async (req, res) => {
  console.log("req.user :>> ", req.user);
  const { subscription, email } = req.user;
  res.json({
    email,
    subscription,
  });
};

module.exports = getCurrent;
