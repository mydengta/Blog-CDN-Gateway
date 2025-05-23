// 初始化页面
function initializePage() {
    // 设置页面标题和头像
    document.getElementById('page-title').textContent = `${CONFIG.siteName} - ${CONFIG.siteTitle}`;
    document.getElementById('site-title').textContent = CONFIG.siteTitle;
    document.getElementById('site-avatar').src = CONFIG.siteAvatar;
    document.getElementById('beian-info').innerHTML = CONFIG.beianInfo;
    
    // 设置随机背景图
    if (CONFIG.backgroundImages.length > 0) {
        const randomBg = CONFIG.backgroundImages[Math.floor(Math.random() * CONFIG.backgroundImages.length)];
        document.body.style.backgroundImage = `url('${randomBg}')`;
    }
    
    // 设置favicon
    const favicon = document.querySelector('link[rel="icon"]');
    if (favicon) {
        favicon.href = CONFIG.favicon;
    }
    
    // 生成URL列表
    generateUrlList();
}

// 动态生成URL列表
function generateUrlList() {
    const ul = document.getElementById("urls");
    CONFIG.urls.forEach((url, index) => {
        const [testUrl, name] = url.split('#');
        const li = document.createElement("li");
        li.id = `result${index}`;
        li.innerHTML = `${name} <span id="latency${index}">测速中...</span>`;
        ul.appendChild(li);
    });
}

// 测试延迟
function testLatency(url) {
    return new Promise((resolve) => {
        const start = Date.now();
        const xhr = new XMLHttpRequest();
        xhr.open('HEAD', url, true);
        xhr.timeout = CONFIG.timeout;

        xhr.onload = function () {
            const latency = Date.now() - start;
            if (xhr.status === 200) {
                resolve({ url, latency });
            } else {
                resolve({ url, latency: `状态码: ${xhr.status}` });
            }
        };

        xhr.ontimeout = function () {
            resolve({ url, latency: `响应超时 ${CONFIG.timeout}ms` });
        };

        xhr.onerror = function () {
            resolve({ url, latency: '请求失败' });
        };

        xhr.send();
    });
}

// 获取延迟颜色
function getLatencyColor(latency) {
    if (latency <= 100) return '#22c55e';
    if (latency <= 200) return '#84cc16';
    if (latency <= 500) return '#eab308';
    if (latency <= 1000) return '#f97316';
    if (latency > 1000) return '#ef4444';
    return '#dc2626';
}

// 运行测试
async function runTests() {
    const results = await Promise.all(CONFIG.urls.map(url => {
        const [testUrl, name] = url.split('#');
        return testLatency(testUrl).then(result => ({
            ...result,
            name
        }));
    }));

    // 更新测试结果显示
    results.forEach((result, index) => {
        const li = document.getElementById(`result${index}`);
        const latencySpan = document.getElementById(`latency${index}`);
        if (typeof result.latency === 'number') {
            latencySpan.textContent = `${result.latency}ms`;
            latencySpan.style.color = getLatencyColor(result.latency);
        } else {
            latencySpan.textContent = result.latency;
            latencySpan.style.color = '#dc2626';
        }
    });

    // 找到最快的CDN并跳转
    const validResults = results.filter(result => typeof result.latency === 'number');
    if (validResults.length > 0) {
        const fastest = validResults.reduce((prev, current) => 
            (prev.latency < current.latency ? prev : current), validResults[0]);

        // 高亮最快的CDN
        results.forEach((result, index) => {
            if (result.name === fastest.name) {
                const li = document.getElementById(`result${index}`);
                li.style.background = 'rgba(107, 223, 143, 0.3)';
                li.style.border = '2px solid rgba(107, 223, 143, 0.5)';
                li.style.transform = 'translateX(5px)';
            }
        });

        // 获取当前路径和参数并跳转
        const currentPath = window.location.pathname;
        const currentParams = window.location.search;
        const redirectUrl = fastest.url + currentPath + currentParams;
        
        // 延迟跳转以显示结果
        setTimeout(() => {
            window.location.href = redirectUrl;
        }, 1000);
    }
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', initializePage);
window.addEventListener('load', runTests);
