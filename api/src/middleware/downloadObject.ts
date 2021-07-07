import { Storage } from '@google-cloud/storage'

const downloadObject = (senderToken: string): {result: boolean, response: string} => {
  const storage = new Storage()
  const bucketName = 'share-objects'
  const fileName = senderToken
  const destFileName = ''
  let resultData: {result: boolean, response: string} = {
    result: false,
    response: JSON.stringify({
      "status": "error",
      "message": "server error"
    })
  }  

  async function downloadFile() {
    const options = {
      destination: destFileName,
    }

    await storage.bucket(bucketName).file(fileName).download(options)

    console.log('`gs://${bucketName}/${fileName} downloaded to ${destFileName}.`')
  }

  downloadFile().catch(
    (error) => {
      resultData = {
        result: false,
        response: JSON.stringify({
          "status": "error",
          "message": error
        })
      }
    }
  )

  return resultData
}

export default downloadObject