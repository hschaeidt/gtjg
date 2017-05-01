/**
 * Fix to silent no-implicit-any errors from json imports application wide.
 */
declare module "*.json" {
  const content: any;
  export = content;
}

declare module "clean-webpack-plugin" {
  const content: any;
  export = content;
}

declare module "kanawana" {
  const content: any;
  export = content;
}

declare module "offline-plugin" {
  const content: any;
  export = content;
}
