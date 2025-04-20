// const Factory = require("../models/Factory");

// async function seedFactories() {
//   const factories = await Factory.findOrCreate([
//     { name: "KCE Electronic", address: "72 72/1-3 ซอย นิคมอุตสาหกรรมลาดกระบัง แขวงลำปลาทิว เขตลาดกระบัง กรุงเทพมหานคร 10520" },

//   ], { returning: true });

//   return factories; // return inserted factories for reuse
// }
// module.exports = seedFactories;
// seedFactories();

const Factory = require("../models/Factory");

async function seedFactories() {
  const [factory] = await Factory.findOrCreate({
    where: { name: "KCE Electronic" }, // ✅ This is required
    defaults: {
      address: "72 72/1-3 ซอย นิคมอุตสาหกรรมลาดกระบัง แขวงลำปลาทิว เขตลาดกระบัง กรุงเทพมหานคร 10520"
    }
  });

  return [factory]; // Return in an array for compatibility with bulk usage
}

module.exports = seedFactories;
