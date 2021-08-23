import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { account, accountId } from './account'
import type { user, userId } from './user'
import type { user_mode, user_modeId } from './user_mode'

export interface flagAttributes {
  flag_id: number;
  flag_name: string;
}

export type flagPk = "flag_id"
export type flagId = flag[flagPk]
export type flagCreationAttributes = Optional<flagAttributes, flagPk>

export class flag extends Model<flagAttributes, flagCreationAttributes> implements flagAttributes {
  flag_id!: number;
  flag_name!: string;

  // flag hasMany account via flag_id
  accounts!: account[];
  getAccounts!: Sequelize.HasManyGetAssociationsMixin<account>;
  setAccounts!: Sequelize.HasManySetAssociationsMixin<account, accountId>;
  addAccount!: Sequelize.HasManyAddAssociationMixin<account, accountId>;
  addAccounts!: Sequelize.HasManyAddAssociationsMixin<account, accountId>;
  createAccount!: Sequelize.HasManyCreateAssociationMixin<account>;
  removeAccount!: Sequelize.HasManyRemoveAssociationMixin<account, accountId>;
  removeAccounts!: Sequelize.HasManyRemoveAssociationsMixin<account, accountId>;
  hasAccount!: Sequelize.HasManyHasAssociationMixin<account, accountId>;
  hasAccounts!: Sequelize.HasManyHasAssociationsMixin<account, accountId>;
  countAccounts!: Sequelize.HasManyCountAssociationsMixin;
  // flag hasMany user via flag_id
  users!: user[];
  getUsers!: Sequelize.HasManyGetAssociationsMixin<user>;
  setUsers!: Sequelize.HasManySetAssociationsMixin<user, userId>;
  addUser!: Sequelize.HasManyAddAssociationMixin<user, userId>;
  addUsers!: Sequelize.HasManyAddAssociationsMixin<user, userId>;
  createUser!: Sequelize.HasManyCreateAssociationMixin<user>;
  removeUser!: Sequelize.HasManyRemoveAssociationMixin<user, userId>;
  removeUsers!: Sequelize.HasManyRemoveAssociationsMixin<user, userId>;
  hasUser!: Sequelize.HasManyHasAssociationMixin<user, userId>;
  hasUsers!: Sequelize.HasManyHasAssociationsMixin<user, userId>;
  countUsers!: Sequelize.HasManyCountAssociationsMixin;
  // flag belongsToMany user_mode via flag_id and user_mode_id
  user_mode_id_user_modes!: user_mode[];
  getUser_mode_id_user_modes!: Sequelize.BelongsToManyGetAssociationsMixin<user_mode>;
  setUser_mode_id_user_modes!: Sequelize.BelongsToManySetAssociationsMixin<user_mode, user_modeId>;
  addUser_mode_id_user_mode!: Sequelize.BelongsToManyAddAssociationMixin<user_mode, user_modeId>;
  addUser_mode_id_user_modes!: Sequelize.BelongsToManyAddAssociationsMixin<user_mode, user_modeId>;
  createUser_mode_id_user_mode!: Sequelize.BelongsToManyCreateAssociationMixin<user_mode>;
  removeUser_mode_id_user_mode!: Sequelize.BelongsToManyRemoveAssociationMixin<user_mode, user_modeId>;
  removeUser_mode_id_user_modes!: Sequelize.BelongsToManyRemoveAssociationsMixin<user_mode, user_modeId>;
  hasUser_mode_id_user_mode!: Sequelize.BelongsToManyHasAssociationMixin<user_mode, user_modeId>;
  hasUser_mode_id_user_modes!: Sequelize.BelongsToManyHasAssociationsMixin<user_mode, user_modeId>;
  countUser_mode_id_user_modes!: Sequelize.BelongsToManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof flag {
    flag.init({
      flag_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      flag_name: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'flag',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "flag_id" },
          ]
        },
      ]
    })
    return flag
  }
} 
