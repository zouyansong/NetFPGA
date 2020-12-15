const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const querystring = require('querystring');
//const mysql = require('mysql');

//const { findUser,findById,saveUser,deleteById } = require('./db/user.js')
//const { pool } = require('./db/pool');
const port = 8081;

const server = http.createServer((req, res) => {
  // 获取url的各个部分
  // url.parse可以将req.url解析成一个对象
  // 里面包含有pathname和querystring等
  //console.log(req);
  const urlObject = url.parse(req.url);
  const { pathname } = urlObject;

  // api开头的是API请求
  if (pathname.startsWith("/api")) {
    // 再判断路由
	if (pathname === "/api/uservalid"){
		const method = req.method;
		console.log("uservalid");
		if (method === 'POST'){
			console.log('post');
			let postData = "";
			req.on("data", (chunk) => {
				postData = postData + chunk;
			});
			req.on("end", () => {
				postData = querystring.parse(postData);
				//console.log(postData);
				console.log(postData['id'],postData['pwd']);
				db = [[2020210942,{pwd:123456,name:'zouyansong'}],
					[2020000000,{pwd:123456,name:'robot'}],
					[123,{pwd:123,name:'test'}]];
				var map = new Map(db);
				var resData = undefined;
				var v = map.get(Number(postData['id']));
				if(v){
					console.log("用户存在");
					if (v['pwd'] === Number(postData['pwd'])){
						console.log("密码正确");
						resData = [{flag:1,name:v['name']}];
					}
					else{
						console.log("密码错误");
						resData = [{flag:2}];
					}
				}
				else{
					console.log("用户不存在");
					resData = [{flag:3}];
				}
				res.setHeader("Content-Type", "application/json");
				res.end(JSON.stringify(resData));
			  //});
			});
		}
	}
	
	if (pathname === '/api/hotfile') {
		const resData = [{filename:"组合数学2019年期末",description:"哈简单"},
			{filename:"微积分A2018年春期末",description:"平均分90分"},
			{filename:"线性代数2018年秋",description:"好多人挂科"},
			{filename:"人工智能导论大作业",description:"四子棋的AI算法"},
			{filename:"高等计算机网络课件",description:"徐恪老师的PPT"},
			{filename:"操作系统2020年期中A卷",description:"送分题"},
			{filename:"离散数学A课件",description:"数理逻辑与集合论"},
			{filename:'复变函数期末总结',description:"背出来你就不会挂了，拜杨幂是没用的"},
			{filename:'数电A4小抄',description:"要带放大镜去看"},
			{filename:'自然辨证法作业',description:"4000字以上，太卷了吧"}];
		res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(resData));
        return;
	}
	
	if (pathname === '/api/upload'){
		console.log(urlObject);
		let postData = "";
			req.on("data", (chunk) => {
				postData = postData + chunk;
			});
			req.on("end", () => {
				postData = querystring.parse(postData);
				console.log(postData);
				console.log(postData.filename);
				resData = {};
				if (postData.filename.length > 6){resData['flag']=1}
				else{resData['flag']=0}
				res.setHeader("Content-Type", "application/json");
				res.end(JSON.stringify(resData));
				return;
			});
	}
	
	if (pathname === '/api/changename'){
		console.log(urlObject);
		let postData = "";
			req.on("data", (chunk) => {
				postData = postData + chunk;
			});
			req.on("end", () => {
				postData = querystring.parse(postData);
				console.log(postData);
				console.log(postData['id']);
				resData = {};
				if(postData['newname'].length >= 3){resData['flag']=1}
				else {resData['flag']=0}
				res.setHeader("Content-Type", "application/json");
				res.end(JSON.stringify(resData));
				return;
			});
					
	}
	
	if (pathname === '/api/download'){
		console.log(urlObject);
		let postData = "";
			req.on("data", (chunk) => {
				postData = postData + chunk;
			});
			req.on("end", () => {
				postData = querystring.parse(postData);
				console.log(postData);
				resData={};
				if(postData['downloadfileurl'].length > 10){
					resData['flag']=1;
				}
				else resData['flag']=0;
				res.setHeader("Content-Type", "application/json");
				res.end(JSON.stringify(resData));
				return;
			});
	}
	
	if (pathname === '/api/uploadrecord'){
		console.log(urlObject);
		const resData = [{
                    filename:"高等计算机网络项目3",
                    downloadtime:32,
                    uploadtime: "2020-11-19",
                },
                {
                    filename:"高等计算机网络项目4",
                    downloadtime:15,
                    uploadtime: "2018-11-18",
                },
                {
                    filename:"高等计算机网络项目10",
                    downloadtime:18,
                    uploadtime: "2020-11-13",
                },
                {
                    filename:"高等计算机网络报告",
                    downloadtime:4,
                    uploadtime: "2020-11-20",
                }];
		res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(resData));
        return;
				
	}
	
	if (pathname === '/api/downloadrecord'){
		console.log(urlObject);
		const resData=[
            {
                    filename:"组合数学2020期末A1",
                    downloadtime:12,
                    uploadtime: "2020-12-10",
                },
                {
                    filename:"组合数学2017期末A2我觉得很无聊",
                    downloadtime:19,
                    uploadtime: "2017-12-18",
                },
                {
                    filename:"高等计算机网络课件",
                    downloadtime:29,
                    uploadtime: "2020-11-11",
                },
                {
                    filename:"微积分A2020期末答案",
                    downloadtime:129,
                    uploadtime: "2020-10-11",
                },
                {
                    filename:"毛概展示PPT",
                    downloadtime:9,
                    uploadtime: "2014-12-11",
                },
                {
                    filename:"高等计算机网络项目1",
                    downloadtime:39,
                    uploadtime: "2020-11-18",
                },
                {
                    filename:"高等计算机网络项目2",
                    downloadtime:12,
                    uploadtime: "2020-11-18",
                }
            ];
		res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(resData));
        return;	
	}
	
	
	if (pathname === '/api/search'){
			console.log(urlObject);
            const resData = [{
                    filename:"组合数学2020期末A1",
                    course:"",
                    teacher:"马昱春",
                    downloadtime:12,
                    filesize:13*1024,
                    uploadtime: "2020-12-10",
                    fileformat: ".docx",
                    magnetURI: "magnet:?xt=urn:btih:08ada5a7a6183aae1e09d831df6748d566095a10&dn=Sintel&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F&xs=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2Fsintel.torrent",
                },
                {
                    filename:"组合数学2017期末A2我觉得很无聊",
                    course:"组合数学",
                    teacher:"",
                    downloadtime:19,
                    filesize:14*1024,
                    uploadtime: "2017-12-18",
                    fileformat: ".pdf",
                },
                {
                    filename:"高等计算机网络课件",
                    course:"",
                    teacher:"徐恪",
                    downloadtime:29,
                    filesize:13*1024*1024-234,
                    uploadtime: "2020-11-11",
                    fileformat: ".zip",
                },
                {
                    filename:"微积分A2020期末答案",
                    course:"",
                    teacher:"苏爷爷",
                    downloadtime:129,
                    filesize:1.2 *1024*1024,
                    uploadtime: "2020-10-11",
                    fileformat: ".docx",
                },
                {
                    filename:"毛概展示PPT",
                    course:"",
                    teacher:"",
                    downloadtime:9,
                    filesize:3*1024*1024,
                    uploadtime: "2014-12-11",
                    fileformat: ".ppt",
                },
                {
                    filename:"高等计算机网络项目1",
                    course:"",
                    teacher:"徐恪",
                    downloadtime:39,
                    filesize:13*1024*1024,
                    uploadtime: "2020-11-18",
                    fileformat: ".zip",
                },
                {
                    filename:"高等计算机网络项目2",
                    course:"",
                    teacher:"徐恪",
                    downloadtime:12,
                    filesize:110,
                    uploadtime: "2020-11-18",
                    fileformat: ".zip",
                },
                {
                    filename:"高等计算机网络项目3",
                    course:"高等计算机网络",
                    teacher:"",
                    downloadtime:32,
                    filesize:1.43*1024*1024,
                    uploadtime: "2020-11-19",
                    fileformat: ".pdf",
                },
                {
                    filename:"高等计算机网络项目4",
                    course:"",
                    teacher:"徐恪",
                    downloadtime:15,
                    filesize:13*1024*1024*1024,
                    uploadtime: "2018-11-18",
                    fileformat: ".zip",
                },
                {
                    filename:"高等计算机网络项目10",
                    course:"",
                    teacher:"徐恪",
                    downloadtime:18,
                    filesize:12*1024*1024,
                    uploadtime: "2020-11-13",
                    fileformat: ".zip",
                },
                {
                    filename:"高等计算机网络报告",
                    course:"",
                    teacher:"徐恪",
                    downloadtime:4,
                    filesize:11,
                    uploadtime: "2020-11-20",
                    fileformat: ".zip",
                },
                {
                    filename:"深入浅出统计学",
                    course:"统计学原理",
                    teacher:"",
                    downloadtime:40,
                    filesize:11*1024*1024,
                    uploadtime: "2020-11-26",
                    fileformat: ".pdf",
                    magnetURI: 'magnet:?xt=urn:btih:94092b324d99391e8ff6407368f4bfa6b1776670&dn=%E6%B7%B1%E5%85%A5%E6%B5%85%E5%87%BA%E7%BB%9F%E8%AE%A1%E5%AD%A6Head_First_Statistics.pdf&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com',
                },
                {
                    filename:"TCP SECURITY",
                    course:"高等计算机网络",
                    teacher:"",
                    downloadtime:15,
                    filesize:11*1024*1024,
                    uploadtime: "2020-11-26",
                    fileformat: ".pptx",
                    magnetURI: 'magnet:?xt=urn:btih:b8b803d71078e63dc70d37ac3e1af608ad362e0c&dn=TCP+SECURITY.pptx&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%3A6969&tr=udp%3A%2F%2Ftracker.opentrackr.org%3A1337&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com',
                    
                },
            ];
			res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(resData));
        return;
	}
}
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Server is running on http://127.0.0.1:${port}/`);
});
