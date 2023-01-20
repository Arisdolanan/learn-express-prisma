const prisma = require("../services/prisma");

const getAllProduct = async (req, res) => {
  try {
    const category = await prisma.category.findMany({});
    res.status(200).send({
      status: 200,
      data: category,
      message: `Successfully retrieved`,
    });
  } catch (err) {
    res.send({
      status: false,
      message: "error, " + err.message,
    });
  }
};
const getAllByIdProduct = async (req, res) => {
  try {
    const category = await prisma.category.findFirst({
      where: { id: Number(req.params.id) },
    });
    res.status(200).send({
      status: 200,
      data: category,
      message: `Successfully retrieved`,
    });
  } catch (err) {
    res.send({
      status: false,
      message: "error, " + err.message,
    });
  }
};
const createProduct = async (req, res) => {
  const data = req.body;
  try {
    const category = await prisma.category.create({ data });
    res.status(200).send({
      status: 200,
      data: category,
      message: "created",
    });
  } catch (err) {
    res.send({
      status: false,
      message: "error, " + err.message,
    });
  }
};
const updateProduct = async (req, res) => {
  const data = req.body;
  const category = await prisma.category.update({
    where: { id: Number(req.params.id) },
    data: data,
  });

  if (!category) {
    return res.status(404).json({ message: "This category does not exist!" });
  }
  res.status(200).json({ message: "updated!" });
};
const deleteProduct = async (req, res) => {
  const category = await prisma.category.delete({
    where: { id: Number(req.params.id) },
  });

  if (!category) {
    return res.status(404).json({ message: "This category does not exist!" });
  }

  res.status(200).json({ message: "deleted!" });
};

module.exports = {
  getAllProduct,
  getAllByIdProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
