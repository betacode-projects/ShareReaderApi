import * as Sequelize from 'sequelize'
import DBConfig from './DBConfig'

const DBClient = () => {
  DBConfig.authenticate().then(() => {
    console.log('Connection has been established successfully.')
  }).catch((err) => {
    console.error('Unable to connect to the database:', err)
  })
  return DBConfig
}

export default DBClient