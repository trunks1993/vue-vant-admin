const mysql = require('mysql2')
const config = require('./../../config/config.local.js')

const connectionPool = mysql.createPool({
  'host': config.database.host,
  'port': config.database.port,
  'user': config.database.user,
  'password': config.database.password,
  'database': config.database.database,
  'charset': config.database.charset,
  'connectionLimit': config.database.connectionLimit,
  'supportBigNumbers': true,
  'bigNumberStrings': true
})

export const query = (sql, args) => {
  return new Promise((resolve, reject) => {
    connectionPool.getConnection((error, connection) => {
      if (error) {
        reject(error)
      } else {
        connection.query(sql, args, function(error, results) {
          if (error) reject(error)
          else resolve(results)
          connection.release()
        })
      }
    })
  })
}
