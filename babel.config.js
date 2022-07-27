module.exports = {
  "presets": [
    // 注意presets的加载顺序是倒叙的。
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage', //"usage"选项或时会自动加载@babel/plugin-transform-runtime
        corejs: '3',
        targets: {
          browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'not ie 11'],
          node: true,
        },
      },
    ]
  ],
  "plugins": ["@vue/babel-plugin-jsx"]
};
