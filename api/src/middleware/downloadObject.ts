import { Storage } from '@google-cloud/storage'

const downloadObject = () => {
  const storage = new Storage()
  const bucketName = ''
  const fileName = ''
  const destFileName = ''  

  async function downloadFile() {
    const options = {
      destination: destFileName,
    }

    await storage.bucket(bucketName).file(fileName).download(options)

    console.log('`gs://${bucketName}/${fileName} downloaded to ${destFileName}.`')
  }

  downloadFile().catch(console.error)
}

export default downloadObject