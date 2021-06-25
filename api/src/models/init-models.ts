import type { Sequelize, Model } from "sequelize"
import { account } from "./account"
import type { accountAttributes, accountCreationAttributes } from "./account"
import { download } from "./download"
import type { downloadAttributes, downloadCreationAttributes } from "./download"
import { file_info } from "./file_info"
import type { file_infoAttributes, file_infoCreationAttributes } from "./file_info"
import { flag } from "./flag"
import type { flagAttributes, flagCreationAttributes } from "./flag"
import { login_sessions } from "./login_sessions"
import type { login_sessionsAttributes, login_sessionsCreationAttributes } from "./login_sessions"
import { user } from "./user"
import type { userAttributes, userCreationAttributes } from "./user"
import { user_mode } from "./user_mode"
import type { user_modeAttributes, user_modeCreationAttributes } from "./user_mode"

export {
  account,
  download,
  file_info,
  flag,
  login_sessions,
  user,
  user_mode,
}

export type {
  accountAttributes,
  accountCreationAttributes,
  downloadAttributes,
  downloadCreationAttributes,
  file_infoAttributes,
  file_infoCreationAttributes,
  flagAttributes,
  flagCreationAttributes,
  login_sessionsAttributes,
  login_sessionsCreationAttributes,
  userAttributes,
  userCreationAttributes,
  user_modeAttributes,
  user_modeCreationAttributes,
}

export function initModels(sequelize: Sequelize) {
  account.initModel(sequelize)
  download.initModel(sequelize)
  file_info.initModel(sequelize)
  flag.initModel(sequelize)
  login_sessions.initModel(sequelize)
  user.initModel(sequelize)
  user_mode.initModel(sequelize)

  account.belongsToMany(user, { as: 'user_id_user_login_sessions', through: login_sessions, foreignKey: "account_id", otherKey: "user_id" })
  file_info.belongsToMany(user, { as: 'user_id_users', through: download, foreignKey: "file_info_id", otherKey: "user_id" })
  flag.belongsToMany(user_mode, { as: 'user_mode_id_user_modes', through: user, foreignKey: "flag_id", otherKey: "user_mode_id" })
  user.belongsToMany(account, { as: 'account_id_accounts', through: login_sessions, foreignKey: "user_id", otherKey: "account_id" })
  user.belongsToMany(file_info, { as: 'file_info_id_file_infos', through: download, foreignKey: "user_id", otherKey: "file_info_id" })
  user_mode.belongsToMany(flag, { as: 'flag_id_flags', through: user, foreignKey: "user_mode_id", otherKey: "flag_id" })
  login_sessions.belongsTo(account, { as: "account", foreignKey: "account_id"})
  account.hasMany(login_sessions, { as: "login_sessions", foreignKey: "account_id"})
  download.belongsTo(file_info, { as: "file_info", foreignKey: "file_info_id"})
  file_info.hasMany(download, { as: "downloads", foreignKey: "file_info_id"})
  account.belongsTo(flag, { as: "flag", foreignKey: "flag_id"})
  flag.hasMany(account, { as: "accounts", foreignKey: "flag_id"})
  user.belongsTo(flag, { as: "flag", foreignKey: "flag_id"})
  flag.hasMany(user, { as: "users", foreignKey: "flag_id"})
  download.belongsTo(user, { as: "user", foreignKey: "user_id"})
  user.hasMany(download, { as: "downloads", foreignKey: "user_id"})
  file_info.belongsTo(user, { as: "user", foreignKey: "user_id"})
  user.hasMany(file_info, { as: "file_infos", foreignKey: "user_id"})
  login_sessions.belongsTo(user, { as: "user", foreignKey: "user_id"})
  user.hasMany(login_sessions, { as: "login_sessions", foreignKey: "user_id"})
  user.belongsTo(user_mode, { as: "user_mode", foreignKey: "user_mode_id"})
  user_mode.hasMany(user, { as: "users", foreignKey: "user_mode_id"})

  return {
    account: account,
    download: download,
    file_info: file_info,
    flag: flag,
    login_sessions: login_sessions,
    user: user,
    user_mode: user_mode,
  }
}
