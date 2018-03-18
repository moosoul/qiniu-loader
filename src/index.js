const path = require('path')
const loaderUtils = require('loader-utils')

const qiniu = require('qiniu')

let upload = (accessKey, secretKey, bucket, domain, locaFile, key) => {
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
  const formUploader = new qiniu.form_up.FormUploader()
  const putExtra = new qiniu.form_up.PutExtra()
  const options = {
    scope: `${bucket}:${key}`
  }
  const putPolicy = new qiniu.rs.PutPolicy(options)
  const uploadToken = putPolicy.uploadToken(mac)
  return new Promise((resolve, reject) => {
    formUploader.putFile(uploadToken, key, localFile, putExtra, (respErr, respBody, respInfo) => {
      if (respErr) {
        throw respErr
      }
      if (respInfo.statusCode === 200) {
        resolve(`${domain}/${key}`)
      }
    })
  })
}

export default function loader(source){
  let callback = this.async()
  const options = loaderUtils.getOptions(this)
  let filePath = this.resourcePath
  let fileName = path.basename(filePath)
  let extName = path.extname(filePath)
  upload(filePath, fileName).then(url => {
    callback(null, `module.exports = ${JSON.stringify(
      `${url}`
    )}`)
  })
}

export const raw = true;