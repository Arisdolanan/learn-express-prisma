const prisma = require("../services/prisma");

const getAllProduct = async (req, res) => {
  try {
    const product = await prisma.product.findMany({});
    res.status(200).send({
      status: 200,
      data: product,
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
    const product = await prisma.product.findFirst({
      where: { id: Number(req.params.id) },
    });
    res.status(200).send({
      status: 200,
      data: product,
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
    const product = await prisma.product.create({ data });
    res.status(200).send({
      status: 200,
      data: product,
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
  const product = await prisma.product.update({
    where: { id: Number(req.params.id) },
    data: data,
  });

  if (!product) {
    return res.status(404).json({ message: "This product does not exist!" });
  }
  res.status(200).json({ message: "updated!" });
};
const deleteProduct = async (req, res) => {
  const product = await prisma.product.delete({
    where: {
      id: req.params.id,
    },
  });

  if (!product) {
    return res.status(404).json({ message: "This product does not exist!" });
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
