/*var merge = require('webpack-merge')
var devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  API_ROOT: '"http://13.229.230.131:8100"'
})*/
module.exports = {
  NODE_ENV: '"production"',
  API_ROOT: '"http://13.229.230.131:8080"'   //测试API
}
