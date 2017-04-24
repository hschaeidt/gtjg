declare module "kanawana" {
  const content: any;
  export = content;
}

/**
 * Fix to silent no-implicit-any errors from json imports application wide.
 */
declare module "*.json" {
  const content: any;
  export = content;
}
