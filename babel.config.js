module.exports = {
  "presets": [
    // 注意presets的加载顺序是倒叙的。
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage', //"usage"选项或时会自动加载@babel/plugin-transform-runtime
        corejs: '3',
        targets: {
          browsers: ['> 1%', 'last 2 versions'],
          node: true,
        },
      },
    ]
  ],
  "plugins": ["@vue/babel-plugin-jsx"]
};
