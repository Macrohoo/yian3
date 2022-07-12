import type { App, Plugin, Component} from 'vue';  //import App类型 DefineComponent类型

export const withInstall = <T>(comp: T) => {
  const c = comp as any;
  c.install = function (app: App) {
    app.component(c.displayName || c.name, comp as Component);
  };

  return comp as T & Plugin; //返回插件Plugin类型或者泛型
};
