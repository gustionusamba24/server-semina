const { NotFoundError } = require("./../../errors");
const Images = require("./../../api/v1/images/model");

const getAllImages = async () => {
  const result = await Images.find();

  return result;
};

const createImage = async (req) => {
  const result = await Images.create({
    name: req.file
      ? `uploads/${req.file.filename}`
      : "uploads/avatar/default.jpeg",
  });

  return result;
};

// Checking Image
const checkingImage = async (id) => {
  const result = await Images.findOne({ _id: id });
  console.log(result);

  if (!result)
    throw new NotFoundError(`There are no image with id : ${id}`);

  return result;
};

module.exports = { getAllImages, createImage, checkingImage };
