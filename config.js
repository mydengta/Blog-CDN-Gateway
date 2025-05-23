// 网站配置
const CONFIG = {
    // CDN URLs列表
    urls: [
        'https://blog.cmliussss.com#Cloudflare CDN',
        'https://fastly.blog.cmliussss.com#Fastly CDN',
        'https://gcore.blog.cmliussss.com#Gcore CDN',
        'https://vercel.blog.cmliussss.com#Vercel CDN',
        'https://netlify.blog.cmliussss.com#Netlify CDN',
        'https://dooki.blog.cmliussss.com#DokiDoki CDN',
        'https://xn--1uto7rutmzjk.dpdns.org#备用地址'
    ],

    // 网站信息
    siteName: 'CMLiussss Blog',
    siteTitle: 'BlogCDN 智能访问网关',
    siteAvatar: 'https://raw.cmliussss.com/IMG_0038.png',
    favicon: 'https://raw.cmliussss.com/favicon.ico',

    // 背景图片列表（随机选择）
    backgroundImages: [
        'https://pic.imgdb.cn/item/66f6c445f21886ccc064b247.jpg'
    ],

    // 备案信息
    beianInfo: `<b>📢杨幂只是xp~ 🤣CM才是id!!!</b><br>
<b>📈今日访问人数:</b><span id="visitCount">加载中...</span>
<b>📊当前在线人数:</b><div id="liveuser" style="display: inline;">加载中...</div>
<script src="https://liveuser.030101.xyz/main.js?sessionId=blog.cmliussss.com"></script>
<script>
fetch('https://tongji.090227.xyz/?id=blog.cmliussss.com')
.then(r => r.json())
.then(d => document.getElementById('visitCount').innerText = d.visitCount)
.catch(e => document.getElementById('visitCount').innerText = '加载失败');
</script>`,

    // 广告配置
    adsContent: 'google.com, pub-9350003957494520, DIRECT, f08c47fec0942fa0',

    // 测速超时时间（毫秒）
    timeout: 3000
};
