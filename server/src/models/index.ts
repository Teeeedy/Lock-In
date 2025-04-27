const { Sequelize } = require("sequelize");
import dotenv from "dotenv";
import User, { initUser } from "./user";
import StudySession, { initStudySession } from "./studySession";

dotenv.config();

// Option 1: Passing a connection URI
const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
});

initUser(sequelize);
initStudySession(sequelize);

User.hasMany(StudySession, { foreignKey: "userID" });
StudySession.belongsTo(User, { foreignKey: "userID" });

User.belongsToMany(User, {
  as: "Followers",
  through: "UserFollowers",
  foreignKey: "followingId",
  otherKey: "followerId",
});

User.belongsToMany(User, {
  as: "Following",
  through: "UserFollowers",
  foreignKey: "followerId",
  otherKey: "followingId",
});

const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

const syncModels = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully");
  } catch (error) {
    console.error(`Unable to sync models: ${error}`);
  }
};

checkConnection();
syncModels();

export default sequelize;
