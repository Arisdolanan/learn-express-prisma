const prisma = require("../services/prisma");
const { makeExecutableSchema } = require("@graphql-tools/schema");

const typeDefs = `
  type Product {
    id: ID
    name: String
    price: Int
    Category: Category!
    createdAt: String
  }
  
  input ProductInput {
    name: String
    price: Int
    categoryId: Int
  }

  type Category {
    id: ID
    name: String
  }

  input CategoryInput {
    name: String
  }

  type Query {
    getAllProduct: [Product!]!
    getAllByIdProduct(id: ID!): [Product!]!
    getAllCategory: [Category]
    getByIdCategory(id: ID!): Category!
  }

  type Mutation {
    createProduct(product: ProductInput!): Product
    deleteProduct(id: ID!): String
    updateProduct(id: ID!, product: ProductInput): Product

    createCategory(category: CategoryInput!): Category
    deleteCategory(id: ID!): String
    updateCategory(id: ID!, category: CategoryInput): Category
  }
`;

const resolvers = {
  Query: {
    getAllProduct: async () => {
      const data = await prisma.product.findMany({
        include: {
          Category: true,
        },
      });
      console.log(data);
      return data;
    },
    getAllByIdProduct: async (_, args) => {
      return await prisma.product.findFirst({
        where: { id: Number(args.id) },
      });
    },

    getAllCategory: async () => {
      return await prisma.category.findMany();
    },
    getByIdCategory: async (_, args) => {
      return await prisma.category.findFirst({
        where: { id: Number(args.id) },
      });
    },
  },

  Mutation: {
    // product
    createProduct: async (parent, args) => {
      // console.log(args);
      const newProduct = await prisma.product.create({
        data: { ...args.product },
      });
      return newProduct;
    },
    updateProduct: async (parent, { id, product }) => {
      const dataExist = await prisma.product.findFirst({
        where: {
          id: Number(id),
        },
      });

      if (!dataExist) throw new Error("Data is not exist");

      return await prisma.product.update({
        where: {
          id: Number(id),
        },
        data: product,
      });
    },
    deleteProduct: async (_, params) => {
      const dataExist = await prisma.product.delete({
        where: {
          id: Number(params.id),
        },
      });

      if (!dataExist) {
        throw new Error("Data is not exist");
      }
      return true;
    },

    // category
    createCategory: async (parent, args) => {
      const newCategory = prisma.category.create({
        data: { ...args.category },
      });
      return newCategory;
    },
    updateCategory: async (parent, { id, category }) => {
      console.log(id);
      const dataExist = await prisma.category.findFirst({
        where: {
          id: Number(id),
        },
      });

      if (!dataExist) throw new Error("Data is not exist");

      // console.log(category);

      return await prisma.category.update({
        where: {
          id: Number(id),
        },
        data: {
          name: category.name,
        },
      });
    },
    deleteCategory: async (_, params) => {
      const dataExist = await prisma.category.delete({
        where: {
          id: Number(params.id),
        },
      });

      if (!dataExist) {
        throw new Error("Data is not exist");
      }
      return true;
    },
  },
};

const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});

module.exports = schema;
