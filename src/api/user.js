import request from "@/utils/request";

// 获取用户信息
export function getUserInfo(params) {
  return request({
    url: "/userDetail",
    method: "get",
    params: params,
  });
}
