import request from "@/utils/request";

// 获取用户信息
export function getUserInfo(params) {
  return request({
    url: "/userDetail",
    method: "get",
    params: params,
  });
}

// 登录
export function getLogin(params) {
  return request({
    url: "/login",
    method: "post",
    data: params,
  });
}
