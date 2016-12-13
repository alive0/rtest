var webpack = require('webpack');

module.exports = {
  entry: {
            'main':['webpack/hot/dev-server'],
             'build':'./app/main.js',
             'photo':'./p/js/photo.js'
            },
  output: {
    path: './build',
    publicPath:'/build/',
    filename: '[name].js'
  },
  resolve:{
      extensions:['','.js','.json','.css','.scss']
  },
  module: {
    loaders: [
        {
        	test: /\.js?$/,
          exclude: /node_modules/,
        	loaders: ['react-hot', 'babel?presets[]=react,presets[]=es2015']
        },
        {
            test:/\.scss/,
            loader:'style-loader!css-loader!sass-loader'
        },
        { test: /\.css$/, loader: 'style-loader!css-loader' },
        { test: /\.json$/, loader: 'json-loader' },
        { test: /\.(png|jpg)$/, loader: "url?limit=2500" },
        {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
        {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff2"},
        {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
        {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
        {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"}

    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      $:"jquery",
      jQuery:"jquery",
      "window.jQuery":"jquery"
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}