import request from "@/utils/request";

// url列表
export function getUrlList(query) {
  return request({
    url: "/list",
    method: "post",
    data: query,
  });
}
