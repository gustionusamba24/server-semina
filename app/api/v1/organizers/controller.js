const { StatusCodes } = require("http-status-codes");

const {
  createOrganizer,
  createUser,
  getAllUsers,
} = require("./../../../services/mongoose/users");

const createCMSOrganizer = async (req, res, next) => {
  try {
    const result = await createOrganizer(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const createCMSUser = async (req, res, next) => {
  try {
    const result = await createUser(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCMSOrganizer,
  createCMSUser,
};
