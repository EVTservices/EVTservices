// seeders/seedAll.js
const sequelize = require("../config/database");
  
const seedFactories = require("./seedFactories");
const seedRoutes = require("./seedRoutes");
const seedStops = require("./seedStops");

async function seedAll() {
    await sequelize.sync({ force: true }); // Reset and recreate tables

    await seedFactories(); // create factories first
    await seedRoutes();    // uses factory_id
    // await seedStops();     // uses route_id

    console.log("🎉 All data seeded successfully!");
    await sequelize.close();
}

seedAll();
  