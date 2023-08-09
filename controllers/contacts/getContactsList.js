const { basedir } = global;
const { Contact } = require(`${basedir}/models/contacts`);
const { errorMessage } = require(`${basedir}/helpers`);

const getContactsList = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const filter = { owner };

  if (favorite === "true") {
    filter.favorite = true;
  } else if (favorite === "false") {
    filter.favorite = false;
  }
  try {
    const result = await Contact.find(filter, "-createdAt -updatedAt", {
      skip,
      limit,
    }).populate("owner", "email subscription");
    res.json(result);
  } catch (error) {
    throw errorMessage({
      status: 400,
      message: "An unexpected error occurred while getting the contacts list",
    });
  }
};

module.exports = getContactsList;
