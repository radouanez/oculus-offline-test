import { Model, DataTypes, Optional, fn, UUIDV4 } from "sequelize";

import Note from "../../domain/model/note";
import sequelizeInstance from "./sequelize.connector";

interface NoteCreationAttributes extends Optional<Note, "id"> {}

class NoteModel extends Model<Note, NoteCreationAttributes> implements Note {
  public id!: string;
  public content!: string;
  public groupName!: string;
  public isPinned!: boolean;
  public title!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

NoteModel.init(
  {
    id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: UUIDV4
    },
    content: {
      type: new DataTypes.STRING(10485760),
      allowNull: false,
    },
    title: {
      type: new DataTypes.STRING(128),
      allowNull: true,
      defaultValue: ''
    },
    isPinned: {
      type: new DataTypes.BOOLEAN(),
      allowNull: true,
      defaultValue: false
    },
    groupName: {
      type: new DataTypes.STRING(128),
      allowNull: true,
    },
  },
  {
    tableName: "notes",
    modelName: "NoteModel",
    timestamps: true,
    sequelize: sequelizeInstance,
  }
);

export default NoteModel;
