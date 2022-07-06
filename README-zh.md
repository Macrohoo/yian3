##### 1、tsc -p complie project
##### 2、unpkg is a fast, global content delivery network for everything on npm. Use it to quickly and easily load any file from any package using a URL like: `unpkg.com/:package@:version/:file` example: `unpkg.com/react@16.7.0/umd/react.production.min.js`
##### 3、unpkg use UMD need webpack, main use CommonJS , module use ES just tsc -p
##### 4、vue-style-loader is in vue-loader, is needn't install
##### 5、setted paths still console error @/xxx can't find module, please reload vscode
##### 6、types、typings in package.json is the same meaning. The main declaration file is specified in the package.json file. Set the types attribute to point to the bundle's main declaration file. 同样要注意的是如果主声明文件名是index.d.ts并且位置在包的根目录里（与index.js并列），你可以不使用"types"属性指定。
##### 7、rimraf需要单独安装用来打包前删除dist文件夹 `rimraf -rf ./dist`
##### 8、@rollup/plugin-commonjs 将 CommonJS 转换成 ES2015 模块供 Rollup 处理
##### 9、`.pipe(sourcemaps.write('.', {includeContent: false, sourceRoot: '../src'}))` generate .map file. otherwise map in js file
##### 10、tsconfig.json
```
{
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "es",
    //ESNext是⼀个泛指, 它永远指向下⼀个版本. ⽐如当前最新版本是ES2021, 那么ESNext指的就是2022年6⽉将要发布的标准
    "target": "esnext",
    //默认赋值的方式就是所谓的 [[Set]] 语义，字段声明的方式从 = 赋值的方式变更成了 Object.defineProperty，也就是将 class 声明中的字段语义从 [[Set]] 变更到 [[Define]]
    "useDefineForClassFields": true,
    "module": "esnext",
    //模块解析策略，ts默认用node的解析策略，即相对的方式导入
    "moduleResolution": "node",
    //启用 --strict相当于启用 --noImplicitAny, --noImplicitThis, --alwaysStrict， --strictNullChecks和 --strictFunctionTypes和--strictPropertyInitialization。
    "strict": true,
    // 允许编译器编译JS，JSX文件
    "allowJs": true,
    // 允许使用jsx 其中一种模式
    "jsx": "preserve",
    //是否输出src2.js.map文件
    "sourceMap": true,
    //是否允许把json文件当做模块进行解析
    "resolveJsonModule": true,
    //提供'--isolatedModules'标志时，所有文件都必须是模块。一定需要为true，可以通过添加空export {}来欺骗TypeScript检查器。不然注释它
    //"isolatedModules": true,
    //export=导出，由import from 导入是否被支持
    "esModuleInterop": true,
    "lib": ["esnext", "dom"],  //注入的库列表
    "paths": {
      "@/*": ["src/*"],
      "~/*": ["typings/*"]
    },
    "skipLibCheck": true,  //忽略所有的声明文件（ *.d.ts）的类型检查。
    "declaration": true
  },
  //include包含文件夹会被ts进行读取
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue", "typings/*.d.ts"],
  "exclude": ["node_modules", "dist"]
}
```
##### 11、_ before parmas (_parmas to tell TypeScript “是的，我知道这个参数没有被使用，这不是一个错误”)
##### 12、gulp.task('tsc-cjs', ...）create a `gulp tsc-cjs` terminal command
##### 13、import type 仅仅导入被用于类型注解或声明的声明语句，它总是会被完全删除，因此在运行时将不会留下任何代码。与此相似，export type 仅仅提供一个用于类型的导出，在 TypeScript 输出文件中，它也将会被删除
##### 14、globalRegister.ts as UMD entry file, all components need to be registered as global components. needn't care es and lib, reserve part import feature.