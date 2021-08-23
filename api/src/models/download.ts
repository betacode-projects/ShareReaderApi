import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { file_info, file_infoId } from './file_info'
import type { user, userId } from './user'

export interface downloadAttributes {
  download_id: number;
  user_id: number;
  file_info_id: number;
  download_date: Date;
}

export type downloadPk = "download_id" | "user_id" | "file_info_id"
export type downloadId = download[downloadPk]
export type downloadCreationAttributes = Optional<downloadAttributes, downloadPk>

export class download extends Model<downloadAttributes, downloadCreationAttributes> implements downloadAttributes {
  download_id!: number;
  user_id!: number;
  file_info_id!: number;
  download_date!: Date;

  // download belongsTo file_info via file_info_id
  file_info!: file_info;
  getFile_info!: Sequelize.BelongsToGetAssociationMixin<file_info>;
  setFile_info!: Sequelize.BelongsToSetAssociationMixin<file_info, file_infoId>;
  createFile_info!: Sequelize.BelongsToCreateAssociationMixin<file_info>;
  // download belongsTo user via user_id
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof download {
    download.init({
      download_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'user',
          key: 'user_id'
        }
      },
      file_info_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'file_info',
          key: 'file_info_id'
        }
      },
      download_date: {
        type: DataTypes.DATE,
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'download',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "download_id" },
            { name: "user_id" },
            { name: "file_info_id" },
          ]
        },
        {
          name: "user_id",
          using: "BTREE",
          fields: [
            { name: "user_id" },
          ]
        },
        {
          name: "file_info_id",
          using: "BTREE",
          fields: [
            { name: "file_info_id" },
          ]
        },
      ]
    })
    return download
  }
}
