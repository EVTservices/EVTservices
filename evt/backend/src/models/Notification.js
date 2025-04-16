// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/database");
// const User = require("./User");

// const Notification = sequelize.define("Notification", {
//     id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
//     user_id: { type: DataTypes.UUID, references: { model: User, key: "id" } },
//     type: { type: DataTypes.STRING, allowNull: false },
//     message: { type: DataTypes.TEXT, allowNull: false },
//     sent_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
// }, { timestamps: false });

// module.exports = Notification;

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Notification = sequelize.define("Notification", {
    notification_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, references: { model: User, key: "user_id" } },
    type: { type: DataTypes.STRING, allowNull: false }, // Example: "Reservation", "Check-in Reminder"
    message: { type: DataTypes.TEXT, allowNull: false },
    sent_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    status: { 
        type: DataTypes.ENUM("Sent", "Failed"), 
        defaultValue: "Sent" 
    }, // <-- Track if message was delivered
    method: { 
        type: DataTypes.ENUM("LINE OA", "Email"), 
        defaultValue: "LINE OA" 
    } // <-- Track which method was used
}, { timestamps: false, freezeTableName: true });

module.exports = Notification;
