import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { account, accountId } from './account'
import type { download, downloadId } from './download'
import type { file_info, file_infoId } from './file_info'
import type { flag, flagId } from './flag'
import type { login_sessions, login_sessionsId } from './login_sessions'
import type { user_mode, user_modeId } from './user_mode'

export interface userAttributes {
  user_id: number;
  flag_id: number;
  user_public_token: string;
  user_private_token: string;
  user_agent: string;
  user_ip: string;
  user_mode_id: number;
  user_registered_date?: Date;
}

export type userPk = "user_id" | "flag_id" | "user_mode_id"
export type userId = user[userPk]
export type userCreationAttributes = Optional<userAttributes, userPk>

export class user extends Model<userAttributes, userCreationAttributes> implements userAttributes {
  user_id!: number;
  flag_id!: number;
  user_public_token!: string;
  user_private_token!: string;
  user_agent!: string;
  user_ip!: string;
  user_mode_id!: number;
  user_registered_date?: Date;

  // user belongsTo flag via flag_id
  flag!: flag;
  getFlag!: Sequelize.BelongsToGetAssociationMixin<flag>;
  setFlag!: Sequelize.BelongsToSetAssociationMixin<flag, flagId>;
  createFlag!: Sequelize.BelongsToCreateAssociationMixin<flag>;
  // user belongsToMany account via user_id and account_id
  account_id_accounts!: account[];
  getAccount_id_accounts!: Sequelize.BelongsToManyGetAssociationsMixin<account>;
  setAccount_id_accounts!: Sequelize.BelongsToManySetAssociationsMixin<account, accountId>;
  addAccount_id_account!: Sequelize.BelongsToManyAddAssociationMixin<account, accountId>;
  addAccount_id_accounts!: Sequelize.BelongsToManyAddAssociationsMixin<account, accountId>;
  createAccount_id_account!: Sequelize.BelongsToManyCreateAssociationMixin<account>;
  removeAccount_id_account!: Sequelize.BelongsToManyRemoveAssociationMixin<account, accountId>;
  removeAccount_id_accounts!: Sequelize.BelongsToManyRemoveAssociationsMixin<account, accountId>;
  hasAccount_id_account!: Sequelize.BelongsToManyHasAssociationMixin<account, accountId>;
  hasAccount_id_accounts!: Sequelize.BelongsToManyHasAssociationsMixin<account, accountId>;
  countAccount_id_accounts!: Sequelize.BelongsToManyCountAssociationsMixin;
  // user hasMany download via user_id
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
  // user belongsToMany file_info via user_id and file_info_id
  file_info_id_file_infos!: file_info[];
  getFile_info_id_file_infos!: Sequelize.BelongsToManyGetAssociationsMixin<file_info>;
  setFile_info_id_file_infos!: Sequelize.BelongsToManySetAssociationsMixin<file_info, file_infoId>;
  addFile_info_id_file_info!: Sequelize.BelongsToManyAddAssociationMixin<file_info, file_infoId>;
  addFile_info_id_file_infos!: Sequelize.BelongsToManyAddAssociationsMixin<file_info, file_infoId>;
  createFile_info_id_file_info!: Sequelize.BelongsToManyCreateAssociationMixin<file_info>;
  removeFile_info_id_file_info!: Sequelize.BelongsToManyRemoveAssociationMixin<file_info, file_infoId>;
  removeFile_info_id_file_infos!: Sequelize.BelongsToManyRemoveAssociationsMixin<file_info, file_infoId>;
  hasFile_info_id_file_info!: Sequelize.BelongsToManyHasAssociationMixin<file_info, file_infoId>;
  hasFile_info_id_file_infos!: Sequelize.BelongsToManyHasAssociationsMixin<file_info, file_infoId>;
  countFile_info_id_file_infos!: Sequelize.BelongsToManyCountAssociationsMixin;
  // user hasMany file_info via user_id
  file_infos!: file_info[];
  getFile_infos!: Sequelize.HasManyGetAssociationsMixin<file_info>;
  setFile_infos!: Sequelize.HasManySetAssociationsMixin<file_info, file_infoId>;
  addFile_info!: Sequelize.HasManyAddAssociationMixin<file_info, file_infoId>;
  addFile_infos!: Sequelize.HasManyAddAssociationsMixin<file_info, file_infoId>;
  createFile_info!: Sequelize.HasManyCreateAssociationMixin<file_info>;
  removeFile_info!: Sequelize.HasManyRemoveAssociationMixin<file_info, file_infoId>;
  removeFile_infos!: Sequelize.HasManyRemoveAssociationsMixin<file_info, file_infoId>;
  hasFile_info!: Sequelize.HasManyHasAssociationMixin<file_info, file_infoId>;
  hasFile_infos!: Sequelize.HasManyHasAssociationsMixin<file_info, file_infoId>;
  countFile_infos!: Sequelize.HasManyCountAssociationsMixin;
  // user hasMany login_sessions via user_id
  login_sessions!: login_sessions[];
  getLogin_sessions!: Sequelize.HasManyGetAssociationsMixin<login_sessions>;
  setLogin_sessions!: Sequelize.HasManySetAssociationsMixin<login_sessions, login_sessionsId>;
  addLogin_session!: Sequelize.HasManyAddAssociationMixin<login_sessions, login_sessionsId>;
  addLogin_sessions!: Sequelize.HasManyAddAssociationsMixin<login_sessions, login_sessionsId>;
  createLogin_session!: Sequelize.HasManyCreateAssociationMixin<login_sessions>;
  removeLogin_session!: Sequelize.HasManyRemoveAssociationMixin<login_sessions, login_sessionsId>;
  removeLogin_sessions!: Sequelize.HasManyRemoveAssociationsMixin<login_sessions, login_sessionsId>;
  hasLogin_session!: Sequelize.HasManyHasAssociationMixin<login_sessions, login_sessionsId>;
  hasLogin_sessions!: Sequelize.HasManyHasAssociationsMixin<login_sessions, login_sessionsId>;
  countLogin_sessions!: Sequelize.HasManyCountAssociationsMixin;
  // user belongsTo user_mode via user_mode_id
  user_mode!: user_mode;
  getUser_mode!: Sequelize.BelongsToGetAssociationMixin<user_mode>;
  setUser_mode!: Sequelize.BelongsToSetAssociationMixin<user_mode, user_modeId>;
  createUser_mode!: Sequelize.BelongsToCreateAssociationMixin<user_mode>;

  static initModel(sequelize: Sequelize.Sequelize): typeof user {
    user.init({
      user_id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      flag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'flag',
          key: 'flag_id'
        }
      },
      user_public_token: {
        type: DataTypes.STRING(64),
        allowNull: false
      },
      user_private_token: {
        type: DataTypes.STRING(64),
        allowNull: false
      },
      user_agent: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      user_ip: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      user_mode_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'user_mode',
          key: 'user_mode_id'
        }
      },
      user_registered_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, {
      sequelize,
      tableName: 'user',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "user_id" },
            { name: "flag_id" },
            { name: "user_mode_id" },
          ]
        },
        {
          name: "flag_id",
          using: "BTREE",
          fields: [
            { name: "flag_id" },
          ]
        },
        {
          name: "user_mode_id",
          using: "BTREE",
          fields: [
            { name: "user_mode_id" },
          ]
        },
      ]
    })
    return user
  }
}
