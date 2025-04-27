import { DataTypes, Model } from "sequelize";

class StudySession extends Model {
  declare id: string;
  declare name: string;
  declare userID: string;
}

export const initStudySession = (sequelizeInstance: any) => {
  StudySession.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userID: {
        type: DataTypes.UUID,
        allowNull: false,
      },
    },
    { sequelize: sequelizeInstance, modelName: "StudySession" }
  );
};

export default StudySession;
