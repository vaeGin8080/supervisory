// 配置编译环境和线上环境之间的切换

let baseUrl = "";
const env = process.env;
if (env.NODE_ENV === "development") {
  baseUrl = `http://192.168.1.15:3000/super`; // 开发环境地址
} else if (env.NODE_ENV === "production") {
  baseUrl = ``; //生产环境地址
} else if (env.NODE_ENV === "test") {
  baseUrl = ``; //测试环境地址
}
export { baseUrl, env };
