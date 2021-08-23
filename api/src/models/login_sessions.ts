import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { account, accountId } from './account'
import type { user, userId } from './user'

export interface login_sessionsAttributes {
  login_session_id: number;
  user_id: number;
  account_id: number;
}

export type login_sessionsPk = "login_session_id" | "user_id" | "account_id"
export type login_sessionsId = login_sessions[login_sessionsPk]
export type login_sessionsCreationAttributes = Optional<login_sessionsAttributes, login_sessionsPk>

export class login_sessions extends Model<login_sessionsAttributes, login_sessionsCreationAttributes> implements login_sessionsAttributes {
  login_session_id!: number;
  user_id!: number;
  account_id!: number;

  // login_sessions belongsTo account via account_id
  account!: account;
  getAccount!: Sequelize.BelongsToGetAssociationMixin<account>;
  setAccount!: Sequelize.BelongsToSetAssociationMixin<account, accountId>;
  createAccount!: Sequelize.BelongsToCreateAssociationMixin<account>;
  // login_sessions belongsTo user via user_id
  user!: user;
  getUser!: Sequelize.BelongsToGetAssociationMixin<user>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<user, userId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<user>;

  static initModel(sequelize: Sequelize.Sequelize): typeof login_sessions {
    login_sessions.init({
      login_session_id: {
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
      account_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'account',
          key: 'account_id'
        }
      }
    }, {
      sequelize,
      tableName: 'login_sessions',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "login_session_id" },
            { name: "user_id" },
            { name: "account_id" },
          ]
        },
        {
          name: "account_id",
          using: "BTREE",
          fields: [
            { name: "account_id" },
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
    return login_sessions
  }
}
