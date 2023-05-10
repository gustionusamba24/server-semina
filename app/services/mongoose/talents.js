// import model Talents
const Talents = require("./../../api/v1/talents/model");
const { checkingImage } = require("./images");

// import custom error not found dan bad request
const { NotFoundError, BadRequestError } = require("./../../errors");

const getAllTalents = async (req) => {
  const { keyword } = req.query;

  let condition = { organizer: req.user.organizer };

  if (keyword) {
    condition = {
      ...condition,
      name: { $regex: keyword, $options: "i" },
    };
  }

  const result = await Talents.find(condition)
    .populate({
      path: "image",
      select: "_id name",
    })
    .select("_id name role image");

  return result;
};

const createTalent = async (req) => {
  const { name, role, image } = req.body;

  // cari image dengan field image
  await checkingImage(image);

  // cari talents dengan field name
  const check = await Talents.findOne({
    name,
    organizer: req.user.organizer,
  });

  // apa bila check true / data talents sudah ada maka kita tampilkan error bad request dengan message pembicara duplikat
  if (check)
    throw new BadRequestError("the speaker has been registered");

  const result = await Talents.create({
    name,
    image,
    role,
    organizer: req.user.organizer,
  });

  return result;
};

const getOneTalent = async (req) => {
  const { id } = req.params;

  const result = await Talents.findOne({
    _id: id,
    organizer: req.user.organizer,
  })
    .populate({
      path: "image",
      select: "_id name",
    })
    .select("_id name role image");

  if (!result)
    throw new NotFoundError(`There are no speaker with id :  ${id}`);

  return result;
};

const updateTalent = async (req) => {
  const { id } = req.params;
  const { name, image, role } = req.body;

  // cari image dengan field image
  await checkingImage(image);

  // cari talents dengan field name dan id selain dari yang dikirim dari params
  const check = await Talents.findOne({
    name,
    organizer: req.user.organizer,
    _id: { $ne: id },
  });

  // apa bila check true / data talents sudah ada maka kita tampilkan error bad request dengan message pembicara sudah terdaftar
  if (check)
    throw new BadRequestError("speaker has already been registered");

  const result = await Talents.findOneAndUpdate(
    { _id: id },
    { name, image, role, organizer: req.user.organizer },
    { new: true, runValidators: true }
  );

  // jika id result false / null maka akan menampilkan error `Tidak ada pembicara dengan id` yang dikirim client
  if (!result)
    throw new NotFoundError(`there are no speaker with id :  ${id}`);

  return result;
};

const deleteTalent = async (req) => {
  const { id } = req.params;

  const result = await Talents.findOne({
    _id: id,
    organizer: req.user.organizer,
  });

  if (!result)
    throw new NotFoundError(`There are no speaker with id :  ${id}`);

  await result.deleteOne();

  return result;
};

const checkingTalent = async (id) => {
  const result = await Talents.findOne({ _id: id });

  if (!result)
    throw new NotFoundError(`There are no speaker with id :  ${id}`);

  return result;
};

module.exports = {
  getAllTalents,
  createTalent,
  getOneTalent,
  updateTalent,
  deleteTalent,
  checkingTalent,
};
