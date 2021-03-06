var path = require('path');

module.exports = {
  outputDir: path.resolve(__dirname, "../myapp/public"), // 배포 파일의 위치를 지정
  devServer: {  // api 요청이 있을때 어디에서 처리할지를 설정
    proxy: { // proxyTable 설정
      '/api': {
        target: 'http://localhost:3000/api',
        changeOrigin: true ,
        pathRewrite:{
          "^/api" : ''
        }
      }
    },
    overlay: false,
  },
  // runtimeCompiler: true
}