import * as dev from './webpack.development'
import * as prod from './webpack.production'

export default [dev.clientConfig, dev.serverConfig, prod.clientConfig, prod.serverConfig]
