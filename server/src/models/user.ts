import { DataTypes, Model } from "sequelize";
import bcrypt from "bcrypt";

class User extends Model {
  declare id: string;
  declare username: string;
  declare email: string;
  declare password: string;

  async verifyPassword(password: string): Promise<boolean> {
    console.log("Comparing:", password, "with hash:", this.password);
    return bcrypt.compare(password, this.password);
  }
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
    {
      sequelize: sequelizeInstance,
      modelName: "User",
      hooks: {
        beforeCreate: async (user: User) => {
          user.password = await bcrypt.hash(user.password, 10);
        },
        beforeUpdate: async (user: User) => {
          if (user.changed("password")) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
      },
    }
  );
};

export default User;
