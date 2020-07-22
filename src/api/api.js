import request from "@/utils/request";

// api列表
export function getapiList(query) {
  return request({
    url: "/apiList",
    method: "post",
    data: query,
  });
}

// 增加
export function getapiInsert(query) {
  return request({
    url: "/apiInsert",
    method: "post",
    data: query,
  });
}

// 删除
export function getapiRemove(id) {
  return request({
    url: "/apiRemove",
    method: "get",
    params: {
    	id
    },
  });
}

//修改

export function getapiUpdate(query) {
  return request({
    url: "/apiUpdate",
    method: "post",
    data: query,
  });
}

// export function getapiDetail(query){
// 	return request({
// 		url: "/apiUpdate",
// 		method: "get",
// 		data: query
// 	});
// }