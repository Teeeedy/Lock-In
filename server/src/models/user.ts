import { DataTypes, Model } from "sequelize";

class User extends Model {
  declare id: string;
  declare username: string;
  declare email: string;
  declare password: string;
}

export const initUser = (sequelizeInstance: any) => {
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    { sequelize: sequelizeInstance, modelName: "User" }
  );
};

export default User;
