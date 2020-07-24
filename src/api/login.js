import request from "@/utils/request";


//登录
export function getlogin(query){
	return request({
		url: "/login",
		method: "post",
		data: query,
	});
}