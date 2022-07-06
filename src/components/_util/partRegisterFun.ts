import type { App, DefineComponent } from 'vue';  //import App类型 DefineComponent类型

export const withInstall = (comp: DefineComponent<{}, {}, any>) => {
  const c = comp;
  c.install = function (app: App) {
    app.component(c.displayName || c.name, comp);
  };

  return comp
};
