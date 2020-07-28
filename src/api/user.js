import request from "@/utils/request";

// url列表

export function getUserList(query) {
  return request({
    url: "/UserList",
    method: "post",
    data: query,
  });
}
// 新增

export function getUserInsert(query) {
  return request({
    url: "/register",
    method: "post",
    data: query,
  });
}

// 编辑

export function getUserUpdate(query) {
  return request({
    url: "/userUpdate",
    method: "post",
    data: query,
  });
}

// 删除

export function getUserDelete(id) {
	return request({
		url: "/userRemove",
		method: "get",
		params: {
			id,
		},
	})
}

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