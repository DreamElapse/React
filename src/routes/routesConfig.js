
export const requireAll = (requireContext, key) => {
  let prePath = '';
  requireContext && requireContext.map((item) => {
    key = key.replace(/\//g, '')
    console.log("item",item, "key",key)
    if(require(item).default[key]) {
      prePath = require(item).default[key].prePath;
      return ;
    }
  });
  return prePath;
};


export const routerConfig = (key) => {
  const ROUTER_CONFIGS = require.context('routes', true, /^\.\/.*routerConfig\.js$/).keys();
  return requireAll(ROUTER_CONFIGS, key);
}

export default routerConfig;
