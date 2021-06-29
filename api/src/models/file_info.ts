import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { download, downloadId } from './download'
import type { user, userId } from './user'

export interface file_infoAttributes {
  file_info_id: number;
  user_id: number;
  file_size: number;
  file_name: string;
  file_extension: string;
  file_format: string;
  file_hash: string;
}

export type file_infoPk = "file_info_id" | "user_id"
export type file_infoId = file_info[file_infoPk]
export type file_infoCreationAttributes = Optional<file_infoAttributes, file_infoPk>

export class file_info extends Model<file_infoAttributes, file_infoCreationAttributes> implements file_infoAttributes {
  file_info_id!: number;
  user_id!: number;
  file_size!: number;
  file_name!: string;
  file_extension!: string;
  file_format!: string;
  file_hash!: string;

  // file_info hasMany download via file_info_id
  downloads!: download[];
  getDownloads!: Sequelize.HasManyGetAssociationsMixin<download>;
  setDownloads!: Sequelize.HasManySetAssociationsMixin<download, downloadId>;
  addDownload!: Sequelize.HasManyAddAssociationMixin<download, downloadId>;
  addDownloads!: Sequelize.HasManyAddAssociationsMixin<download, downloadId>;
  createDownload!: Sequelize.HasManyCreateAssociationMixin<download>;
  removeDownload!: Sequelize.HasManyRemoveAssociationMixin<download, downloadId>;
  removeDownloads!: Sequelize.HasManyRemoveAssociationsMixin<download, downloadId>;
  hasDownload!: Sequelize.HasManyHasAssociationMixin<download, downloadId>;
  hasDownloads!: Sequelize.HasManyHasAssociationsMixin<download, downloadId>;
  countDownloads!: Sequelize.HasManyCountAssociationsMixin;
  // file_info belongsToMany user via file_info_id and user_id
  user_id_users!: user[];
  getUser_id_users!: Sequelize.BelongsToManyGetAssociationsMixin<user>;
  setUser_id_users!: Sequelize.BelongsToManySetAssociationsMixin<user, userId>;
  addUser_id_user!: Sequelize.BelongsToManyAddAssociationMixin<user, userId>;
  addUser_id_users!: Sequelize.BelongsToManyAddAssociationsMixin<user, userId>;
  createUser_id_user!: Sequelize.BelongsToManyCreateAssociationMixin<user>;
  removeUser_id_user!: Sequelize.BelongsToManyRemoveAssociationMixin<user, userId>;
  removeUser_id_users!: Sequelize.BelongsToManyRemoveAssociationsMixin<user, userId>;
  hasUser_id_user!: Sequelize.BelongsToManyHasAssociationMixin<user, userId>;
  hasUser_id_users!: Sequelize.BelongsToManyHasAssociationsMixin<user, userId>;
  countUser_id_users!: Sequelize.BelongsToManyCountAssociationsMixin;
  // file_info belongsTo user via user_id
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof file_info {
    file_info.init({
      file_info_id: {
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
      file_size: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      file_name: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      file_extension: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      file_format: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      file_hash: {
        type: DataTypes.STRING(64),
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'file_info',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "file_info_id" },
            { name: "user_id" },
          ]
        },
        {
          name: "user_id",
          using: "BTREE",
          fields: [
            { name: "user_id" },
          ]
        },
      ]
    })
    return file_info
  }
}
