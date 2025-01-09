// 更新时间显示
function updateTime() {
    const timeDisplay = document.getElementById('currentTime');
    const now = new Date();
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };
    timeDisplay.textContent = now.toLocaleString('zh-CN', options);
}

// 生成随机数据
function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 格式化数据大小
function formatSize(size) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB'];
    let index = 0;
    while (size >= 1024 && index < units.length - 1) {
        size /= 1024;
        index++;
    }
    return `${size.toFixed(2)}${units[index]}`;
}

// 更新进度条样式
function updateProgressStyle(element, percentage) {
    if (percentage >= 80) {
        element.setAttribute('data-usage', 'high');
    } else if (percentage >= 60) {
        element.setAttribute('data-usage', 'medium');
    } else {
        element.setAttribute('data-usage', 'low');
    }
}

// 更新CPU使用率
function updateCPU() {
    const usage = getRandomValue(1, 100);
    const gauge = document.getElementById('cpuGauge');
    const gaugeValue = gauge.querySelector('.gauge-value');
    
    gauge.style.background = `conic-gradient(
        ${usage >= 80 ? 'var(--status-high)' : usage >= 60 ? 'var(--status-medium)' : 'var(--status-low)'} ${usage}%,
        #e0e0e0 ${usage}%
    )`;
    gaugeValue.textContent = `${usage}%`;
    
    // 更新系统负载
    const loads = [
        (Math.random() * 2).toFixed(2),
        (Math.random() * 1.5).toFixed(2),
        (Math.random() * 1).toFixed(2)
    ];
    document.querySelector('.info-item .value:contains("系统负载")').textContent = loads.join(', ');
}

// 更新内存使用
function updateMemory() {
    const totalMem = 972.54; // MB
    const usedMem = getRandomValue(300, 500); // MB
    const cacheMem = getRandomValue(100, 200); // MB
    const availableMem = totalMem - usedMem - cacheMem;
    
    const usedPercentage = (usedMem / totalMem) * 100;
    const cachePercentage = (cacheMem / totalMem) * 100;
    
    // 更新内存详情
    document.querySelector('.memory-item:nth-child(1) .memory-value').textContent = 
        `${usedMem.toFixed(2)} MB`;
    document.querySelector('.memory-item:nth-child(2) .memory-value').textContent = 
        `${cacheMem.toFixed(2)} MB`;
    document.querySelector('.memory-item:nth-child(3) .memory-value').textContent = 
        `${availableMem.toFixed(2)} MB`;
    
    // 更新进度条
    const progressUsed = document.querySelector('.progress-used');
    const progressCache = document.querySelector('.progress-cache');
    progressUsed.style.width = `${usedPercentage}%`;
    progressCache.style.width = `${cachePercentage}%`;
    
    // 更新总使用量显示
    const totalUsedPercentage = ((usedMem + cacheMem) / totalMem) * 100;
    document.querySelector('.progress-text').textContent = 
        `${(usedMem + cacheMem).toFixed(2)}/${totalMem} MB (${totalUsedPercentage.toFixed(2)}%)`;
    
    // 更新颜色
    updateProgressStyle(progressUsed, totalUsedPercentage);
}

// 更新虚拟内存
function updateSwap() {
    const totalSwap = 2048; // 2GB
    const usedSwap = getRandomValue(0, totalSwap);
    const percentage = Math.round((usedSwap / totalSwap) * 100);
    
    const swapProgress = document.querySelector('.swap-usage .progress');
    const swapText = document.querySelector('.swap-usage .progress-text');
    
    swapProgress.style.width = `${percentage}%`;
    updateProgressStyle(swapProgress, percentage);
    swapText.textContent = `${formatSize(usedSwap)}/${formatSize(totalSwap)} (${percentage}%)`;
}

// 更新硬盘使用
function updateDiskUsage() {
    const mountPoints = document.querySelectorAll('.disk-mount-point');
    
    mountPoints.forEach(mount => {
        const total = getRandomValue(100, 1000) * 1024 * 1024 * 1024; // 100GB-1TB
        const used = getRandomValue(0, total);
        const percentage = Math.round((used / total) * 100);
        
        const progress = mount.querySelector('.progress');
        const text = mount.querySelector('.progress-text');
        
        progress.style.width = `${percentage}%`;
        updateProgressStyle(progress, percentage);
        text.textContent = `${formatSize(used)}/${formatSize(total)} (${percentage}%)`;
    });
}

// 国家代码转国旗emoji
function getCountryFlag(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

// 更新位置信息
function updateLocation(country, city) {
    const flag = getCountryFlag(country);
    const locationValue = document.querySelector('.info-item .value:contains("位置")');
    locationValue.textContent = `${flag} ${country} ${city}`;
}

// 更新网络流量
function updateNetwork() {
    const received = formatSize(getRandomValue(100, 200) * 1024 * 1024 * 1024);
    const sent = formatSize(getRandomValue(40, 60) * 1024 * 1024 * 1024);
    
    document.querySelector('.info-item .value:contains("总接收")').textContent = received;
    document.querySelector('.info-item .value:contains("总发送")').textContent = sent;
    
    // 更新系统时间
    const now = new Date();
    const timeString = now.toLocaleString('zh-CN', {
        timeZone: 'Asia/Shanghai',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    document.querySelector('.info-item .value:contains("系统时间")').textContent = 
        `Asia/Shanghai ${timeString}`;
    
    // 模拟更新位置信息
    updateLocation('JP', 'Togoshi');
    
    // 更新DNS状态显示
    const dnsStatus = document.querySelector('.info-item .value:contains("DNS")');
    if (dnsStatus) {
        // 这里可以添加DNS状态检查逻辑
        const dnsLatency = getRandomValue(1, 100);
        dnsStatus.style.color = dnsLatency > 50 ? 'var(--status-high)' : 'var(--text-color)';
    }
}

// 定时更新所有数据
function updateAllData() {
    updateCPU();
    updateMemory();
    updateSwap();
    updateDiskUsage();
    updateNetwork();
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    updateTime();
    updateAllData();
    
    // 定时更新
    setInterval(updateTime, 1000);
    setInterval(updateAllData, 3000);
    
    // 默认显示第一个标签页
    const firstTabButton = document.querySelector('.tab-btn');
    if (firstTabButton) {
        const tabId = firstTabButton.getAttribute('onclick').match(/switchTab\('(.+?)'\)/)[1];
        switchTab(tabId);
    }
});

// 编辑主机名
async function editHostname() {
    const currentHostname = document.querySelector('.info-item .value:contains("主机名")').textContent;
    
    const newHostname = await showConfirmModal(
        "修改主机名",
        `当前主机名: ${currentHostname}`,
        {
            input: true,
            defaultValue: currentHostname,
            placeholder: "请输入新的主机名",
            validate: (value) => {
                // 主机名验证规则
                const regex = /^[a-z0-9][a-z0-9-]*[a-z0-9]$/i;
                if (!value) {
                    return "主机名不能为空";
                }
                if (value.length > 63) {
                    return "主机名长度不能超过63个字符";
                }
                if (!regex.test(value)) {
                    return "主机名只能包含字母、数字和连字符，且不能以连字符开头或结尾";
                }
                return true;
            }
        }
    );
    
    if (newHostname && newHostname !== currentHostname) {
        showProgressModal("修改主机名");
        
        // 模拟修改过程
        let progress = 0;
        const interval = setInterval(() => {
            progress += 20;
            
            // 模拟不同阶段的消息
            let message = '';
            let log = '';
            
            if (progress <= 20) {
                message = '验证主机名...';
                log = '检查主机名格式是否合法...';
            } else if (progress <= 40) {
                message = '修改配置文件...';
                log = '更新 /etc/hostname 文件...';
            } else if (progress <= 60) {
                message = '更新系统...';
                log = '更新系统主机名...';
            } else if (progress <= 80) {
                message = '应用更改...';
                log = '应用主机名更改...';
            } else {
                message = '完成修改...';
                log = '主机名修改完成';
            }
            
            updateProgress(progress, message, log);
            
            if (progress >= 100) {
                clearInterval(interval);
                completeProgress(true, "主机名修改成功！");
                
                // 更新显示的主机名
                document.querySelector('.info-item .value:contains("主机名")').textContent = newHostname;
            }
        }, 300);
    }
}

// 显示进度模态框
function showProgressModal(title) {
    const modal = document.getElementById('progressModal');
    const modalTitle = document.getElementById('modalTitle');
    const progress = document.getElementById('modalProgress');
    const progressText = document.getElementById('progressText');
    const statusMessage = document.getElementById('statusMessage');
    const logContainer = document.getElementById('logContainer');
    const closeBtn = document.getElementById('modalCloseBtn');
    
    modalTitle.textContent = title;
    progress.style.width = '0%';
    progressText.textContent = '0%';
    statusMessage.textContent = '正在准备...';
    logContainer.innerHTML = '';
    closeBtn.style.display = 'none';
    
    modal.style.display = 'flex';
}

// 更新进度
function updateProgress(percent, message, log) {
    const progress = document.getElementById('modalProgress');
    const progressText = document.getElementById('progressText');
    const statusMessage = document.getElementById('statusMessage');
    const logContainer = document.getElementById('logContainer');
    
    progress.style.width = `${percent}%`;
    progressText.textContent = `${percent}%`;
    
    if (message) {
        statusMessage.textContent = message;
    }
    
    if (log) {
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry';
        logEntry.textContent = log;
        logContainer.appendChild(logEntry);
        logContainer.scrollTop = logContainer.scrollHeight;
    }
}

// 完成进度
function completeProgress(success, message) {
    const statusMessage = document.getElementById('statusMessage');
    const closeBtn = document.getElementById('modalCloseBtn');
    
    statusMessage.textContent = message;
    statusMessage.style.color = success ? 'var(--status-low)' : 'var(--status-high)';
    closeBtn.style.display = 'block';
    
    closeBtn.onclick = () => {
        document.getElementById('progressModal').style.display = 'none';
        statusMessage.style.color = 'var(--text-color)';
    };
}

// 显示确认对话框
function showConfirmModal(title, message, options = {}) {
    return new Promise((resolve) => {
        const modal = document.getElementById('confirmModal');
        const titleEl = document.getElementById('confirmTitle');
        const messageEl = document.getElementById('confirmMessage');
        const inputContainer = document.getElementById('confirmInputContainer');
        const input = document.getElementById('confirmInput');
        const okBtn = document.getElementById('confirmOkBtn');
        const cancelBtn = document.getElementById('confirmCancelBtn');
        
        titleEl.textContent = title;
        messageEl.textContent = message;
        
        // 如果需要输入框
        if (options.input) {
            inputContainer.style.display = 'block';
            input.value = options.defaultValue || '';
            input.placeholder = options.placeholder || '请输入...';
            
            // 添加输入验证
            input.oninput = () => {
                if (options.validate) {
                    const result = options.validate(input.value);
                    if (result !== true) {
                        okBtn.disabled = true;
                        input.setCustomValidity(result);
                        input.reportValidity();
                    } else {
                        okBtn.disabled = false;
                        input.setCustomValidity('');
                    }
                }
            };
        } else {
            inputContainer.style.display = 'none';
        }
        
        modal.style.display = 'flex';
        
        if (options.input) {
            input.focus();
            // 触发一次验证
            input.dispatchEvent(new Event('input'));
        }
        
        okBtn.onclick = () => {
            if (options.input && options.validate) {
                const result = options.validate(input.value);
                if (result !== true) {
                    input.setCustomValidity(result);
                    input.reportValidity();
                    return;
                }
            }
            modal.style.display = 'none';
            resolve(options.input ? input.value : true);
        };
        
        cancelBtn.onclick = () => {
            modal.style.display = 'none';
            resolve(false);
        };
        
        // 添加回车键确认功能
        if (options.input) {
            input.onkeyup = (e) => {
                if (e.key === 'Enter' && !okBtn.disabled) {
                    okBtn.click();
                }
            };
        }
    });
}

// 更新系统函数
async function updateSystem() {
    const confirmed = await showConfirmModal(
        "系统更新",
        "确定要执行系统更新吗？此操作可能需要几分钟时间。"
    );
    
    if (confirmed) {
        showProgressModal("系统更新");
        
        // 模拟更新过程
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            
            // 模拟不同阶段的更新消息
            let message = '';
            let log = '';
            
            if (progress <= 20) {
                message = '正在检查更新...';
                log = '正在获取软件源信息...';
            } else if (progress <= 40) {
                message = '下载更新包...';
                log = '下载: linux-headers-5.15.0-91...';
            } else if (progress <= 60) {
                message = '安装更新包...';
                log = '安装: linux-headers-5.15.0-91...';
            } else if (progress <= 80) {
                message = '配置系统...';
                log = '更新系统配置文件...';
            } else {
                message = '完成更新...';
                log = '清理临时文件...';
            }
            
            updateProgress(progress, message, log);
            
            if (progress >= 100) {
                clearInterval(interval);
                completeProgress(true, "系统更新完成！");
            }
        }, 500);
    }
}

// 系统清理函数
async function cleanSystem() {
    const confirmed = await showConfirmModal(
        "系统清理",
        "确定要执行系统清理吗？此操作将清理系统缓存和临时文件。"
    );
    
    if (confirmed) {
        showProgressModal("系统清理");
        
        // 模拟清理过程
        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            
            // 模拟不同阶段的清理消息
            let message = '';
            let log = '';
            
            if (progress <= 20) {
                message = '扫描系统...';
                log = '扫描系统文件...';
            } else if (progress <= 40) {
                message = '清理缓存...';
                log = '清理软件包缓存...';
            } else if (progress <= 60) {
                message = '清理日志...';
                log = '清理系统日志文件...';
            } else if (progress <= 80) {
                message = '清理临时文件...';
                log = '删除临时文件...';
            } else {
                message = '完成清理...';
                log = '优化系统存储空间...';
            }
            
            updateProgress(progress, message, log);
            
            if (progress >= 100) {
                clearInterval(interval);
                completeProgress(true, "系统清理完成！");
            }
        }, 300);
    }
}

// 清理内存
function cleanMemory() {
    if (confirm("确定要清理内存吗？")) {
        // 这里添加与后端API通信的代码
        console.log("执行内存清理");
    }
}

let selectedSwapSize = null;

function configureSwap() {
    selectedSwapSize = null;
    const modal = document.getElementById('swapModal');
    const customInput = document.querySelector('.custom-swap-input');
    const buttons = document.querySelectorAll('.swap-option-btn');
    
    // 重置所有按钮状态
    buttons.forEach(btn => btn.classList.remove('selected'));
    customInput.style.display = 'none';
    document.getElementById('customSwapSize').value = '';
    
    modal.style.display = 'flex';
}

function closeSwapModal() {
    document.getElementById('swapModal').style.display = 'none';
}

function selectSwapSize(size) {
    selectedSwapSize = size;
    const buttons = document.querySelectorAll('.swap-option-btn');
    const customInput = document.querySelector('.custom-swap-input');
    
    // 更新按钮选中状态
    buttons.forEach(btn => {
        if (btn.onclick.toString().includes(size)) {
            btn.classList.add('selected');
        } else {
            btn.classList.remove('selected');
        }
    });
    
    // 隐藏自定义输入
    customInput.style.display = 'none';
}

function showCustomSwapInput() {
    const customInput = document.querySelector('.custom-swap-input');
    const buttons = document.querySelectorAll('.swap-option-btn');
    
    // 清除其他按钮的选中状态
    buttons.forEach(btn => btn.classList.remove('selected'));
    
    // 选中自定义按钮
    buttons[3].classList.add('selected');
    
    // 显示自定义输入框
    customInput.style.display = 'block';
    document.getElementById('customSwapSize').focus();
}

function submitSwapSize() {
    let swapSize;
    
    if (document.querySelector('.swap-option-btn.custom').classList.contains('selected')) {
        // 获取自定义输入的大小
        swapSize = parseInt(document.getElementById('customSwapSize').value);
        if (!swapSize || swapSize <= 0) {
            alert('请输入有效的虚拟内存大小！');
            return;
        }
    } else if (selectedSwapSize) {
        swapSize = selectedSwapSize;
    } else {
        alert('请选择虚拟内存大小！');
        return;
    }
    
    // 这里添加与后端API通信的代码
    console.log(`设置虚拟内存大小为：${swapSize}M`);
    
    // 显示进度模态框
    showProgressModal("设置虚拟内存");
    closeSwapModal();
    
    // 模拟设置过程
    let progress = 0;
    const interval = setInterval(() => {
        progress += 20;
        
        let message = '';
        let log = '';
        
        if (progress <= 20) {
            message = '检查系统...';
            log = '验证系统支持...';
        } else if (progress <= 40) {
            message = '创建交换文件...';
            log = '分配磁盘空间...';
        } else if (progress <= 60) {
            message = '设置权限...';
            log = '设置交换文件权限...';
        } else if (progress <= 80) {
            message = '激活交换空间...';
            log = '启用虚拟内存...';
        } else {
            message = '完成设置...';
            log = '虚拟内存设置完成';
        }
        
        updateProgress(progress, message, log);
        
        if (progress >= 100) {
            clearInterval(interval);
            completeProgress(true, "虚拟内存设置成功！");
        }
    }, 500);
}

// 点击模态框外部关闭
window.onclick = function(event) {
    const modal = document.getElementById('swapModal');
    if (event.target === modal) {
        closeSwapModal();
    }
}

// 添加模拟进程数据
const mockProcesses = [
    { 
        name: 'nginx', 
        path: '/usr/sbin/nginx',
        pid: 1234, 
        cpu: 2.5, 
        memory: 128.5 
    },
    { 
        name: 'mysql', 
        path: '/usr/sbin/mysqld',
        pid: 1235, 
        cpu: 4.8, 
        memory: 356.2 
    },
    { 
        name: 'php-fpm', 
        path: '/usr/sbin/php-fpm7.4',
        pid: 1236, 
        cpu: 1.2, 
        memory: 82.4 
    },
    { 
        name: 'docker', 
        path: '/usr/bin/dockerd',
        pid: 1237, 
        cpu: 3.7, 
        memory: 245.8 
    },
    { 
        name: 'sshd', 
        path: '/usr/sbin/sshd',
        pid: 1238, 
        cpu: 0.5, 
        memory: 42.3 
    }
];

// 渲染进程列表
function renderProcessList() {
    const processList = document.getElementById('processList');
    processList.innerHTML = ''; // 清空现有内容

    mockProcesses.forEach(process => {
        const processItem = document.createElement('div');
        processItem.className = 'process-item';
        
        // 设置CPU和内存使用率的样式类
        const cpuClass = process.cpu > 5 ? 'high' : '';
        const memoryClass = process.memory > 300 ? 'high' : '';

        processItem.innerHTML = `
            <div class="process-col process-name">${process.name}</div>
            <div class="process-col process-path">${process.path}</div>
            <div class="process-col">${process.pid}</div>
            <div class="process-col">
                <span class="process-usage ${cpuClass}">${process.cpu}%</span>
            </div>
            <div class="process-col">
                <span class="process-usage ${memoryClass}">${process.memory}MB</span>
            </div>
            <div class="process-col">
                <button class="kill-btn" onclick="killProcess(${process.pid})">
                    <i class="fas fa-times"></i>
                    结束
                </button>
            </div>
        `;
        
        processList.appendChild(processItem);
    });
}

// 结束进程函数
function killProcess(pid) {
    if (confirm(`确定要结束进程 ${pid} 吗？`)) {
        // 这里添加实际的结束进程逻辑
        console.log(`结束进程: ${pid}`);
        // 从列表中移除该进程
        const index = mockProcesses.findIndex(p => p.pid === pid);
        if (index !== -1) {
            mockProcesses.splice(index, 1);
            renderProcessList();
        }
    }
}

// 在页面加载完成后渲染进程列表
document.addEventListener('DOMContentLoaded', () => {
    // ... 其他初始化代码 ...
    renderProcessList();
    
    // 每5秒更新一次进程数据
    setInterval(() => {
        // 随机更新CPU和内存使用率
        mockProcesses.forEach(process => {
            process.cpu = +(Math.random() * 8).toFixed(1);
            process.memory = +(Math.random() * 400).toFixed(1);
        });
        renderProcessList();
    }, 5000);
});

// 标签页切换函数
function switchTab(tabId) {
    // 隐藏所有标签页内容
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.classList.remove('active');
    });

    // 移除所有标签按钮的激活状态
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.classList.remove('active');
    });

    // 显示选中的标签页内容
    const selectedTab = document.getElementById(`${tabId}-tab`);
    if (selectedTab) {
        selectedTab.classList.add('active');
    }

    // 激活对应的标签按钮
    const selectedButton = document.querySelector(`.tab-btn[onclick*="${tabId}"]`);
    if (selectedButton) {
        selectedButton.classList.add('active');
    }
}

// Docker模拟数据
const mockContainers = [
    {
        id: 'abc123def456',
        name: 'nginx-web',
        status: 'running',
        ports: '80:80, 443:443'
    },
    {
        id: 'def456ghi789',
        name: 'mysql-db',
        status: 'running',
        ports: '3306:3306'
    },
    {
        id: 'jkl012mno345',
        name: 'redis-cache',
        status: 'stopped',
        ports: '6379:6379'
    },
    {
        id: 'mno345pqr678',
        name: 'wordpress',
        status: 'running',
        ports: '8080:80'
    },
    {
        id: 'stu901vwx234',
        name: 'phpmyadmin',
        status: 'running',
        ports: '8081:80'
    },
    {
        id: 'yza567bcd890',
        name: 'mongodb',
        status: 'stopped',
        ports: '27017:27017'
    }
];

const mockImages = [
    {
        id: 'sha256:abc123',
        repository: 'nginx',
        tag: 'latest',
        size: '142MB'
    },
    {
        id: 'sha256:def456',
        repository: 'mysql',
        tag: '8.0',
        size: '556MB'
    },
    {
        id: 'sha256:ghi789',
        repository: 'redis',
        tag: 'alpine',
        size: '32MB'
    },
    {
        id: 'sha256:jkl012',
        repository: 'wordpress',
        tag: 'latest',
        size: '436MB'
    },
    {
        id: 'sha256:mno345',
        repository: 'phpmyadmin',
        tag: 'latest',
        size: '166MB'
    },
    {
        id: 'sha256:pqr678',
        repository: 'mongodb',
        tag: 'latest',
        size: '692MB'
    },
    {
        id: 'sha256:stu901',
        repository: 'node',
        tag: '16',
        size: '345MB'
    }
];

const mockNetworks = [
    {
        id: 'net123',
        name: 'bridge',
        driver: 'bridge',
        scope: 'local'
    },
    {
        id: 'net456',
        name: 'host',
        driver: 'host',
        scope: 'local'
    },
    {
        id: 'net789',
        name: 'web_net',
        driver: 'bridge',
        scope: 'local'
    },
    {
        id: 'net012',
        name: 'db_net',
        driver: 'bridge',
        scope: 'local'
    }
];

const mockVolumes = [
    {
        name: 'mysql_data',
        driver: 'local',
        mountpoint: '/var/lib/docker/volumes/mysql_data'
    },
    {
        name: 'wordpress_data',
        driver: 'local',
        mountpoint: '/var/lib/docker/volumes/wordpress_data'
    },
    {
        name: 'mongodb_data',
        driver: 'local',
        mountpoint: '/var/lib/docker/volumes/mongodb_data'
    },
    {
        name: 'redis_data',
        driver: 'local',
        mountpoint: '/var/lib/docker/volumes/redis_data'
    }
];

// 网站管理模拟数据
const mockWebsites = [
    {
        domain: 'kejilion.pro',
        certExpiry: '2025-02-06',
        status: 'valid', // valid, expiring, expired
        type: 'wordpress'
    },
    {
        domain: 'blog.kejilion.pro',
        certExpiry: '2025-03-15',
        status: 'valid',
        type: 'typecho'
    },
    {
        domain: 'cloud.kejilion.pro',
        certExpiry: '2024-04-01',
        status: 'expiring',
        type: 'nextcloud'
    },
    {
        domain: 'forum.kejilion.pro',
        certExpiry: '2025-01-20',
        status: 'valid',
        type: 'discuz'
    },
    {
        domain: 'dev.kejilion.pro',
        certExpiry: '2024-03-25',
        status: 'expired',
        type: 'static'
    }
];

const mockDatabases = [
    {
        name: 'wp_kejilion_pro',
        size: '256 MB',
        type: 'MySQL',
        usage: 'WordPress主站'
    },
    {
        name: 'blog_db',
        size: '128 MB',
        type: 'MySQL',
        usage: '博客数据库'
    },
    {
        name: 'forum_db',
        size: '512 MB',
        type: 'MySQL',
        usage: '论坛数据库'
    },
    {
        name: 'cloud_db',
        size: '1.2 GB',
        type: 'MySQL',
        usage: '云存储数据库'
    },
    {
        name: 'app_cache',
        size: '64 MB',
        type: 'Redis',
        usage: '应用缓存'
    }
];

// 渲染网站列表
function renderWebsiteList() {
    const websiteList = document.querySelector('.website-table tbody');
    if (!websiteList) return;

    websiteList.innerHTML = mockWebsites.map(site => `
        <tr>
            <td>${site.domain}</td>
            <td>${site.certExpiry}</td>
            <td>
                <span class="certificate-status certificate-${site.status}">
                    ${site.status === 'valid' ? '有效' : 
                      site.status === 'expiring' ? '即将过期' : '已过期'}
                </span>
            </td>
            <td class="site-actions">
                <button class="action-btn edit" onclick="editWebsite('${site.domain}')">
                    <i class="fas fa-edit"></i> 编辑
                </button>
                <button class="action-btn delete" onclick="deleteWebsite('${site.domain}')">
                    <i class="fas fa-trash"></i> 删除
                </button>
            </td>
        </tr>
    `).join('');
}

// 渲染数据库列表
function renderDatabaseList() {
    const databaseList = document.querySelector('#database-tab .website-table tbody');
    if (!databaseList) return;

    databaseList.innerHTML = mockDatabases.map(db => `
        <tr>
            <td>${db.name}</td>
            <td>${db.size}</td>
            <td>${db.type}</td>
            <td class="site-actions">
                <button class="action-btn edit" onclick="manageDatabase('${db.name}')">
                    <i class="fas fa-edit"></i> 管理
                </button>
                <button class="action-btn delete" onclick="deleteDatabase('${db.name}')">
                    <i class="fas fa-trash"></i> 删除
                </button>
            </td>
        </tr>
    `).join('');
}

// 在页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    // ... 其他初始化代码 ...
    
    // 如果在网站管理页面，渲染网站相关列表
    if (document.querySelector('.website-table')) {
        renderWebsiteList();
        renderDatabaseList();
    }
});

// Docker列表渲染函数
function renderContainerList() {
    const containerList = document.getElementById('containerList');
    if (!containerList) return;
    
    containerList.innerHTML = mockContainers.map(container => `
        <tr>
            <td>${container.id.substring(0, 12)}</td>
            <td>${container.name}</td>
            <td>
                <span class="status-badge ${container.status === 'running' ? 'status-running' : 'status-stopped'}">
                    ${container.status}
                </span>
            </td>
            <td>${container.ports}</td>
            <td class="container-actions">
                ${container.status === 'running' ? `
                    <button class="action-btn-small stop" onclick="stopContainer('${container.id}')">
                        <i class="fas fa-stop"></i> 停止
                    </button>
                    <button class="action-btn-small restart" onclick="restartContainer('${container.id}')">
                        <i class="fas fa-sync"></i> 重启
                    </button>
                ` : `
                    <button class="action-btn-small start" onclick="startContainer('${container.id}')">
                        <i class="fas fa-play"></i> 启动
                    </button>
                `}
                <button class="action-btn-small delete" onclick="deleteContainer('${container.id}')">
                    <i class="fas fa-trash"></i> 删除
                </button>
            </td>
        </tr>
    `).join('');
    
    updateDockerStats(); // 更新统计数据
}

// 渲染Docker镜像列表
function renderImageList() {
    const imageList = document.getElementById('imageList');
    if (!imageList) return;
    
    imageList.innerHTML = mockImages.map(image => `
        <tr>
            <td>${image.id.substring(7, 19)}</td>
            <td>${image.repository}</td>
            <td>${image.tag}</td>
            <td>${image.size}</td>
            <td class="container-actions">
                <button class="action-btn-small delete" onclick="deleteImage('${image.id}')">
                    <i class="fas fa-trash"></i> 删除
                </button>
            </td>
        </tr>
    `).join('');
}

// 渲染Docker网络列表
function renderNetworkList() {
    const networkList = document.getElementById('networkList');
    if (!networkList) return;
    
    networkList.innerHTML = mockNetworks.map(network => `
        <tr>
            <td>${network.id}</td>
            <td>${network.name}</td>
            <td>${network.driver}</td>
            <td>${network.scope}</td>
            <td class="container-actions">
                <button class="action-btn-small delete" onclick="deleteNetwork('${network.id}')">
                    <i class="fas fa-trash"></i> 删除
                </button>
            </td>
        </tr>
    `).join('');
}

// 渲染Docker数据卷列表
function renderVolumeList() {
    const volumeList = document.getElementById('volumeList');
    if (!volumeList) return;
    
    volumeList.innerHTML = mockVolumes.map(volume => `
        <tr>
            <td>${volume.name}</td>
            <td>${volume.driver}</td>
            <td>${volume.mountpoint}</td>
            <td class="container-actions">
                <button class="action-btn-small delete" onclick="deleteVolume('${volume.name}')">
                    <i class="fas fa-trash"></i> 删除
                </button>
            </td>
        </tr>
    `).join('');
}

// 更新Docker统计数据
function updateDockerStats() {
    const runningContainers = mockContainers.filter(c => c.status === 'running').length;
    const totalContainers = mockContainers.length;
    const totalImages = mockImages.length;
    const totalNetworks = mockNetworks.length;
    const totalVolumes = mockVolumes.length;

    // 更新统计卡片
    const stats = document.querySelectorAll('.docker-stats .stat-value');
    if (stats.length >= 5) {
        stats[0].textContent = runningContainers;  // 运行中容器
        stats[1].textContent = totalContainers;    // 总容器数
        stats[2].textContent = totalImages;        // 总镜像数
        stats[3].textContent = totalNetworks;      // 网络数量
        stats[4].textContent = totalVolumes;       // 数据卷数量
    }
}

// Docker容器操作函数
function startContainer(id) {
    const container = mockContainers.find(c => c.id === id);
    if (container) {
        container.status = 'running';
        renderContainerList();
    }
}

function stopContainer(id) {
    const container = mockContainers.find(c => c.id === id);
    if (container) {
        container.status = 'stopped';
        renderContainerList();
    }
}

function restartContainer(id) {
    const container = mockContainers.find(c => c.id === id);
    if (container) {
        container.status = 'stopped';
        renderContainerList();
        setTimeout(() => {
            container.status = 'running';
            renderContainerList();
        }, 1000);
    }
}

function deleteContainer(id) {
    if (confirm('确定要删除此容器吗？')) {
        const index = mockContainers.findIndex(c => c.id === id);
        if (index !== -1) {
            mockContainers.splice(index, 1);
            renderContainerList();
        }
    }
}

// 修改页面加载事件，添加Docker列表的初始化
document.addEventListener('DOMContentLoaded', () => {
    // ... 其他初始化代码 ...
    
    // 如果在Docker页面，渲染Docker相关列表
    if (document.getElementById('containerList')) {
        renderContainerList();
        renderImageList();
        renderNetworkList();
        renderVolumeList();
        updateDockerStats();
    }
});
