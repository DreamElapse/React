/**
 * demo功能路由
 * */
export default {
  "/counter":{
    key: "",
    name: "示例",
    path: "/counter",
  },
  "/counterB": {
    key: "CounterB",
    name: "跳转路径B",
    path: "/counter/counterB",
  },
  "/counterC": {
    key: "CounterC",
    name: "跳转路径C",
    path: "/counter/counterB/counterC",
  }
}
