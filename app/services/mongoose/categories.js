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

  // cari categories dengan field name
  const check = await Categories.findOne({
    name,
    organizer: req.user.organizer,
  });

  // apa bila check true / data categories sudah ada maka kita tampilkan error bad request dengan message kategori nama duplikat
  if (check)
    throw new BadRequestError("duplicate name category occur");

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

  // cari categories dengan field name dan id selain dari yang dikirim dari params
  const check = await Categories.findOne({
    name,
    organizer: req.user.organizer,
    _id: { $ne: id },
  });

  // apa bila check true / data categories sudah ada maka kita tampilkan error bad request dengan message kategori nama duplikat
  if (check)
    throw new BadRequestError("Duplicate name category occur");

  const result = await Categories.findOneAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidators: true }
  );

  // jika id result false / null maka akan menampilkan error `Tidak ada Kategori dengan id` yang dikirim client
  if (!result)
    throw new NotFoundError(`there is no category with id :  ${id}`);

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
