# qiniu-loader
Upload file to qiniu and replace file to qiniu url

- [x] Upload PNG
- [ ] TEST
- [ ] Support Other Static Resource
- [ ] Work Togather With Other Webpack Loader
- [ ] Documention

# Usage
The qiniu-loader works like the url-loader but return the uploaded resource url on qiniu.

```javascript
import img from './image.png'
```
webpack.config.js
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\(.png|jpg|gif)$/,
        use: [
          {
            loader: 'qiniu-loader',
            options: {
              accessKey: 'qiniu AccessKey',
              secretKey: 'qiniu SecretKey',
              bucket: 'qiniu bucket name',
              domain: 'The default domain with your bucket'
            }
          }
        ]
      }
    ]
  }
}
```

# Options
|Name|Type|Default|Description|
|-|-|-|-|
|accessKey|{String}|undefined|required|
|secretKey|{String}|undefined|required|
|bucket|{String}|undefined|required|
|domain|{String}|undefined|required|