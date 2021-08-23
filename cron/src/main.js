const { Storage } = require('@google-cloud/storage')

exports.main = (req, res) => {
  

  res.status(200).send('cron job done')
}

