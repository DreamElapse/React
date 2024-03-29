const argv = require('yargs').argv
const webpack = require('webpack')
const cssnano = require('cssnano')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const project = require('./project.config')
const debug = require('debug')('app:config:webpack')
const fs = require('fs')
const lessToJs = require('less-vars-to-js')
const vConsolePlugin = require('vconsole-webpack-plugin')

const __DEV__ = project.globals.__DEV__
const __PROD__ = project.globals.__PROD__
const __TEST__ = project.globals.__TEST__

debug('Creating configuration.')
const webpackConfig = {
  name    : 'client',
  target  : 'web',
  devtool : project.compiler_devtool,
  resolve : {
    root       : project.paths.client(),
    extensions : ['', '.web.js', '.js', '.jsx', '.json']
  },
  module : {}
}
// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY = project.paths.client('main.js')

// intl兼容依赖js去掉 打包后小70KB
webpackConfig.entry = {
  app : __DEV__
    ? ['intl',
      'intl/locale-data/jsonp/en.js', 'whatwg-fetch', APP_ENTRY]
      .concat(`webpack-hot-middleware/client?path=${project.compiler_public_path}__webpack_hmr`)
    : ['intl',
      'intl/locale-data/jsonp/en.js', 'whatwg-fetch', APP_ENTRY],
  vendor : project.compiler_vendors
}

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
  filename   : `[name].[${project.compiler_hash_type}].js`,
  path       : project.paths.dist(),
  publicPath : project.compiler_public_path
}

// ------------------------------------
// Externals
// ------------------------------------
webpackConfig.externals = {}
webpackConfig.externals['react/lib/ExecutionEnvironment'] = true
webpackConfig.externals['react/lib/ReactContext'] = true
webpackConfig.externals['react/addons'] = true

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
  new webpack.DefinePlugin(project.globals),
  new HtmlWebpackPlugin({
    template : project.paths.client('index.html'),
    hash     : false,
    favicon  : project.paths.public('favicon.ico'),
    filename : 'index.html',
    inject   : 'body',
    minify   : {
      collapseWhitespace : true
    }
  })
]

// Ensure that the compiler exits on errors during testing so that
// they do not get skipped and misreported.
if (__TEST__ && !argv.watch) {
  webpackConfig.plugins.push(function () {
    this.plugin('done', function (stats) {
      if (stats.compilation.errors.length) {
        // Pretend no assets were generated. This prevents the tests
        // from running making it clear that there were warnings.
        throw new Error(
          stats.compilation.errors.map(err => err.message || err)
        )
      }
    })
  })
}

if (__DEV__) {
  debug('Enabling plugins for live development (HMR, NoErrors).')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new vConsolePlugin({
      enable: __DEV__
    })
  )
} else if (__PROD__) {
  debug('Enabling plugins for production (OccurenceOrder, Dedupe & UglifyJS).')
  webpackConfig.plugins.push(
    new LodashModuleReplacementPlugin({
      'collections': true,
      'paths': true
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress : {
        unused    : true,
        dead_code : true,
        warnings  : false
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  )
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
  webpackConfig.plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
      names : ['vendor']
    })
  )
}

// ------------------------------------
// Loaders
// ------------------------------------
// JavaScript / JSON
webpackConfig.module.loaders = [{
  test    : /\.(js|jsx)$/,
  exclude : /node_modules/,
  loader  : 'babel',
  query   : project.compiler_babel
}, {
  test   : /\.json$/,
  loader : 'json'
}]

// ------------------------------------
// Style Loaders
// ------------------------------------
// We use cssnano with the postcss loader, so we tell
// css-loader not to duplicate minimization.
const BASE_CSS_LOADER = 'css?sourceMap&-minimize'

webpackConfig.module.loaders.push({
  test    : /\.scss$/,
  exclude : null,
  loaders : [
    'style',
    BASE_CSS_LOADER,
    'postcss',
    'sass?sourceMap'
  ]
})

const theme = lessToJs(fs.readFileSync(project.paths.client('styles/themes/xxxx.less'), 'utf8'))
webpackConfig.module.loaders.push({
  test    : /\.less$/,
  exclude : null,
  loaders : [
    'style',
    BASE_CSS_LOADER,
    'postcss',
    `less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(theme)}}`
  ]
})
webpackConfig.module.loaders.push({
  test    : /\.css$/,
  exclude : null,
  loaders : [
    'style',
    BASE_CSS_LOADER,
    'postcss'
  ]
})

webpackConfig.sassLoader = {
  includePaths : project.paths.client('styles')
}

webpackConfig.postcss = []

// ant-mobile pxtorem
const pxtorem = require('postcss-pxtorem')
webpackConfig.postcss.push(pxtorem({
  rootValue: 100, //'85.333',
  propWhiteList: []
}))

webpackConfig.postcss.push(cssnano({
    autoprefixer : {
      add      : true,
      remove   : true
    },
    discardComments : {
      removeAll : true
    },
    discardUnused : false,
    mergeIdents   : false,
    reduceIdents  : false,
    safe          : true,
    sourcemap     : true
  }));

// ant-mobile svg loader
const svgDirs = [
  require.resolve('antd-mobile').replace(/warn\.js$/, '')  // 1. 属于 antd-mobile 内置 svg 文件
  // path.resolve(__dirname, 'src/my-project-svg-foler'),  // 2. 自己私人的 svg 存放目录
]

// File loaders
/* eslint-disable */
webpackConfig.module.loaders.push(
  { test: /\.woff(\?.*)?$/,  loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
  { test: /\.woff2(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
  { test: /\.otf(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
  { test: /\.ttf(\?.*)?$/,   loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
  { test: /\.eot(\?.*)?$/,   loader: 'file?prefix=fonts/&name=[path][name].[ext]' },
  { test: /\.svg(\?.*)?$/,   loader: 'svg-sprite', include: svgDirs },
  { test: /\.(png|jpg)$/,    loader: 'url?limit=8192' }
)
/* eslint-enable */

// ------------------------------------
// Finalize Configuration
// ------------------------------------
// when we don't know the public path (we know it only when HMR is enabled [in development]) we
// need to use the extractTextPlugin to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
if (!__DEV__) {
  debug('Applying ExtractTextPlugin to CSS loaders.')
  webpackConfig.module.loaders.filter((loader) =>
    loader.loaders && loader.loaders.find((name) => /css/.test(name.split('?')[0]))
  ).forEach((loader) => {
    const first = loader.loaders[0]
    const rest = loader.loaders.slice(1)
    loader.loader = ExtractTextPlugin.extract(first, rest.join('!'))
    delete loader.loaders
  })

  webpackConfig.plugins.push(
    new ExtractTextPlugin('[name].[contenthash].css', {
      allChunks : true
    })
  )
}

module.exports = webpackConfig
