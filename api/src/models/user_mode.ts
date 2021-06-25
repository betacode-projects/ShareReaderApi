import * as Sequelize from 'sequelize'
import { DataTypes, Model, Optional } from 'sequelize'
import type { flag, flagId } from './flag'
import type { user, userId } from './user'

export interface user_modeAttributes {
  user_mode_id: number;
  mode_name: string;
}

export type user_modePk = "user_mode_id"
export type user_modeId = user_mode[user_modePk]
export type user_modeCreationAttributes = Optional<user_modeAttributes, user_modePk>

export class user_mode extends Model<user_modeAttributes, user_modeCreationAttributes> implements user_modeAttributes {
  user_mode_id!: number;
  mode_name!: string;

  // user_mode belongsToMany flag via user_mode_id and flag_id
  flag_id_flags!: flag[];
  getFlag_id_flags!: Sequelize.BelongsToManyGetAssociationsMixin<flag>;
  setFlag_id_flags!: Sequelize.BelongsToManySetAssociationsMixin<flag, flagId>;
  addFlag_id_flag!: Sequelize.BelongsToManyAddAssociationMixin<flag, flagId>;
  addFlag_id_flags!: Sequelize.BelongsToManyAddAssociationsMixin<flag, flagId>;
  createFlag_id_flag!: Sequelize.BelongsToManyCreateAssociationMixin<flag>;
  removeFlag_id_flag!: Sequelize.BelongsToManyRemoveAssociationMixin<flag, flagId>;
  removeFlag_id_flags!: Sequelize.BelongsToManyRemoveAssociationsMixin<flag, flagId>;
  hasFlag_id_flag!: Sequelize.BelongsToManyHasAssociationMixin<flag, flagId>;
  hasFlag_id_flags!: Sequelize.BelongsToManyHasAssociationsMixin<flag, flagId>;
  countFlag_id_flags!: Sequelize.BelongsToManyCountAssociationsMixin;
  // user_mode hasMany user via user_mode_id
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

  static initModel(sequelize: Sequelize.Sequelize): typeof user_mode {
    user_mode.init({
      user_mode_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      mode_name: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'user_mode',
      timestamps: false,
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: [
            { name: "user_mode_id" },
          ]
        },
      ]
    })
    return user_mode
  }
}
