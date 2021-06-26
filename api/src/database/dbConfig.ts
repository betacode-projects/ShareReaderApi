import * as sequelize from 'sequelize'

const DATABASE = String(process.env.DATABASE)
const USER = String(process.env.USER)
const PASSWORD = String(process.env.PASSWORD)
const HOST = String(process.env.HOST)

const DBConfig: sequelize.Sequelize = new sequelize.Sequelize(DATABASE, USER, PASSWORD, {
  host: HOST,
  dialect: 'mysql'
})

export default DBConfig