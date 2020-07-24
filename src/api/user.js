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

export function getUserDelete(params) {
  return request({
    url: "/userRemove",
    method: "get",
    params: params,
  });
}

// 检测网站连通性

export function checkUrl(query) {
  return request({
    url: "/trys",
    method: "post",
    data: query,
  });
}