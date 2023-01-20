"use strict";

const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  errorFormat: "minimal",
  log: ["query", "info", "warn", "error"],
});

module.exports = prisma;
