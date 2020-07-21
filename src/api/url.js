import request from "@/utils/request";

// url列表
export function getUrlList(query) {
  return request({
    url: "/list",
    method: "post",
    data: query,
  });
}

// 删除
export function getUrlRemove(query) {
  return request({
    url: "/remove",
    method: "post",
    data: query,
  });
}

// 检测网站连通性
export function getUrlInsert(query) {
  return request({
    url: "/insert",
    method: "post",
    data: query,
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