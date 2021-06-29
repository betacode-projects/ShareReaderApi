import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { flag, flagId } from './flag'
import type { login_sessions, login_sessionsId } from './login_sessions'
import type { user, userId } from './user'

export interface accountAttributes {
  account_id: number;
  flag_id: number;
  account_name: string;
  account_email: string;
  account_password: string;
  account_config: string;
  account_registered_date?: Date;
}

export type accountPk = "account_id" | "flag_id"
export type accountId = account[accountPk]
export type accountCreationAttributes = Optional<accountAttributes, accountPk>

export class account extends Model<accountAttributes, accountCreationAttributes> implements accountAttributes {
  account_id!: number;
  flag_id!: number;
  account_name!: string;
  account_email!: string;
  account_password!: string;
  account_config!: string;
  account_registered_date?: Date;

  // account hasMany login_sessions via account_id
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
  // account belongsToMany user via account_id and user_id
  user_id_user_login_sessions!: user[];
  getUser_id_user_login_sessions!: Sequelize.BelongsToManyGetAssociationsMixin<user>;
  setUser_id_user_login_sessions!: Sequelize.BelongsToManySetAssociationsMixin<user, userId>;
  addUser_id_user_login_session!: Sequelize.BelongsToManyAddAssociationMixin<user, userId>;
  addUser_id_user_login_sessions!: Sequelize.BelongsToManyAddAssociationsMixin<user, userId>;
  createUser_id_user_login_session!: Sequelize.BelongsToManyCreateAssociationMixin<user>;
  removeUser_id_user_login_session!: Sequelize.BelongsToManyRemoveAssociationMixin<user, userId>;
  removeUser_id_user_login_sessions!: Sequelize.BelongsToManyRemoveAssociationsMixin<user, userId>;
  hasUser_id_user_login_session!: Sequelize.BelongsToManyHasAssociationMixin<user, userId>;
  hasUser_id_user_login_sessions!: Sequelize.BelongsToManyHasAssociationsMixin<user, userId>;
  countUser_id_user_login_sessions!: Sequelize.BelongsToManyCountAssociationsMixin;
  // account belongsTo flag via flag_id
  flag!: flag;
  getFlag!: Sequelize.BelongsToGetAssociationMixin<flag>;
  setFlag!: Sequelize.BelongsToSetAssociationMixin<flag, flagId>;
  createFlag!: Sequelize.BelongsToCreateAssociationMixin<flag>;

  static initModel(sequelize: Sequelize.Sequelize): typeof account {
    account.init({
      account_id: {
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
      account_name: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      account_email: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      account_password: {
        type: DataTypes.STRING(64),
        allowNull: false
      },
      account_config: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      account_registered_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, {
      sequelize,
      tableName: 'account',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "account_id" },
            { name: "flag_id" },
          ]
        },
        {
          name: "flag_id",
          using: "BTREE",
          fields: [
            { name: "flag_id" },
          ]
        },
      ]
    })
    return account
  }
}
