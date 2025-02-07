// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");

// const User = sequelize.define("User", {
//     id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
//     phone_number: { type: DataTypes.STRING, allowNull: false, unique: true },
//     dob: { type: DataTypes.DATEONLY, allowNull: false },
//     name: { type: DataTypes.STRING, allowNull: false },
//     email: { type: DataTypes.STRING, allowNull: false, unique: true },
//     line_id: { type: DataTypes.STRING },
//     created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
// }, { timestamps: false });

// module.exports = User;

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcryptjs");

const User = sequelize.define("User", {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    phone_number: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false }, // Hashed Password
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    line_id: { type: DataTypes.STRING },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { timestamps: false });

// Hash password before saving user
User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
});

module.exports = User;
