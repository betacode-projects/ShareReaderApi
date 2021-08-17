const { Storage } = require('@google-cloud/storage')

exports.main = (req, res) => {
  const storage = new Storage()

  res.status(200).send('cron job done')
}

