const Factory = require("../models/Factory");

async function seedFactories() {
  const factories = await Factory.bulkCreate([
    { name: "KCE Electronic", address: "72 72/1-3 ซอย นิคมอุตสาหกรรมลาดกระบัง แขวงลำปลาทิว เขตลาดกระบัง กรุงเทพมหานคร 10520" },

  ], { returning: true });

  return factories; // return inserted factories for reuse
}

module.exports = seedFactories;
// seedFactories();