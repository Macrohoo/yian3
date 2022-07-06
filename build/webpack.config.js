const { VueLoaderPlugin } = require('vue-loader')
const path = require("path");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = {
  optimization: {
    minimize: false      //代码打包不压缩
  },
  entry: "./src/globalRegister.ts",
  output: {
    path: path.resolve(__dirname, '../dist'),
    //path: path.resolve(__dirname, '../../ytab/yiandist'),
    filename: "yian.min.js",
    library: 'yian',  //指定类库名,主要用于直接引用的方式(比如使用script 标签)
    libraryTarget: 'umd',  //Universal Module Definition,支持在CommonJS、AMD和全局变量使用
    globalObject: 'this'  //定义当前全局变量,兼容node和浏览器运行，避免出现"window is not defined"的情况
  },
  externals: {
    'axios': 'commonjs2 axios',
    'ant-design-vue': 'commonjs2 ant-design-vue',
    'vue': 'commonjs2 vue',
    '@ant-design/icons-vue': 'commonjs2 @ant-design/icons-vue'
  },
  mode: "production",
  resolve: {
    extensions: ['.ts', '.js', '.tsx'],   //将 `.ts` 添加为一个可解析的扩展名。
    alias: {
      '@': path.resolve(__dirname, '../src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ["@babel/preset-env"]
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
              appendTsSuffixTo: [/\.vue$/]
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: { importLoaders: 1 }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              additionalData: `@import "@/styles/variables.scss";`    //共享常见的变量
            }
          }
        ]
      }
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new ProgressBarPlugin()
  ]
};
