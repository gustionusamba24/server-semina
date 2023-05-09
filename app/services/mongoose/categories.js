const Categories = require("./../../api/v1/categories/model");
const { NotFoundError, BadRequestError } = require("./../../errors");

const getAllCategories = async (req) => {
  const result = await Categories.find({
    organizer: req.user.organizer,
  });

  return result;
};

const createCategory = async (req) => {
  const { name } = req.body;

  //   Check category name
  const check = await Categories.findOne({ name });

  //   if the check true / data categories already exist then we display a bad request error with a duplicate name category message
  if (check)
    throw new BadRequestError("Duplicate category names occur");

  const result = await Categories.create({
    name,
    organizer: req.user.organizer,
  });

  return result;
};

const getOneCategory = async (req) => {
  const { id } = req.params;
  const result = await Categories.findOne({
    _id: id,
    organizer: req.user.organizer,
  });

  if (!result)
    throw new NotFoundError(
      `There are no data category with id: ${id}`
    );

  return result;
};

const updateCategory = async (req) => {
  const { id } = req.params;
  const { name } = req.body;

  const checkCategory = await Categories.findOne({
    _id: id,
  });

  // jika id result false / null maka akan menampilkan error `Tidak ada Kategori dengan id` yang dikirim client
  if (!checkCategory)
    throw new NotFoundError(
      `There are no data category with id: ${id}`
    );

  // cari categories dengan field name dan id selain dari yang dikirim dari params
  const check = await Categories.findOne({
    name,
    _id: { $ne: id },
    organizer: req.user.organizer,
  });

  // apa bila check true / data categories sudah ada maka kita tampilkan error bad request dengan message kategori nama duplikat
  if (check)
    throw new BadRequestError("Duplicate category names occur");

  const result = await Categories.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidators: true }
  );

  return result;
};

const deleteCategory = async (req) => {
  const { id } = req.params;

  const result = await Categories.findOne({
    _id: id,
    organizer: req.user.organizer,
  });

  if (!result)
    throw new NotFoundError(
      `There are no data category with id: ${id}`
    );

  await result.deleteOne();

  return result;
};

const checkingCategory = async (id) => {
  const result = await Categories.findOne({ _id: id });

  if (!result)
    throw new NotFoundError(
      `There are no data category with id: ${id}`
    );

  return result;
};

module.exports = {
  getAllCategories,
  createCategory,
  getOneCategory,
  updateCategory,
  deleteCategory,
  checkingCategory,
};
