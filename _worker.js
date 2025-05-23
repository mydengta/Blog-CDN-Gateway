// 简化版本 - 仅用于Cloudflare Worker环境
let urls = [
	'https://blog.cmliussss.com#Cloudflare CDN',
	'https://fastly.blog.cmliussss.com#Fastly CDN',
	'https://gcore.blog.cmliussss.com#Gcore CDN',
	'https://vercel.blog.cmliussss.com#Vercel CDN',
	'https://xn--1uto7rutmzjk.us.kg#备用地址'
];

export default {
	async fetch(request, env) {
		const url = new URL(request.url);
		
		// 处理环境变量配置
		if (env.URL) urls = await ADD(env.URL);
		
		const ads = env.ADS || 'google.com, pub-9350003957494520, DIRECT, f08c47fec0942fa0';
		const 网站图标 = env.ICO || 'https://raw.cmliussss.com/favicon.ico';
		
		// 特殊路由处理
		if (url.pathname.toLowerCase() == '/ads.txt') {
			return new Response(ads, {
				headers: {
					'content-type': 'text/plain;charset=UTF-8'
				}
			});
		} else if (url.pathname.toLowerCase() == '/favicon.ico') {
			return fetch(网站图标);
		} else {
			// 重定向到静态网站
			return Response.redirect('https://your-static-site.github.io', 302);
		}
	}
};

// 辅助函数：将env.URLS字符串处理成数组
async function ADD(envadd) {
	// 将制表符、双引号、单引号和换行符都替换为逗号
	// 然后将连续的多个逗号替换为单个逗号
	var addtext = envadd.replace(/[	|"'\r\n]+/g, ',').replace(/,+/g, ',');
	
	// 删除开头和结尾的逗号（如果有的话）
	if (addtext.charAt(0) == ',') addtext = addtext.slice(1);
	if (addtext.charAt(addtext.length - 1) == ',') addtext = addtext.slice(0, addtext.length - 1);
	
	// 使用逗号分割字符串，得到地址数组
	const add = addtext.split(',');

	return add;
}
