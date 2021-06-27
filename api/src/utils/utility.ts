//便利関数ここにためとくといいよ

class Utility {
  static removeUndefined(value: any): Promise<any> {
    return new Promise((resolve, reject): any => {
      if(typeof value !== 'undefined'){
        resolve(value) 
      }else{
        reject("Type of undefined")
      }
    })
  }

  static getToken(token: string): string {
    return token.substring(7)
  }
}

export default Utility