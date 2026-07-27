const PAGES = [
  { id: "overview", label: "云机概览" },
  { id: "publicPool", label: "公共云机池" },
  { id: "orders", label: "客户订购" },
  { id: "customerPool", label: "客户云机池" },
  { id: "bindings", label: "绑定管理" },
  { id: "workorders", label: "更换/退回工单" },
  { id: "expiry", label: "续期到期中心" },
  { id: "config", label: "配置中心" },
  { id: "logs", label: "操作日志" },
];

const NAV = [
  "客户管理",
  "资金管理",
  "项目管理",
  "任务管理",
  "内容管理",
  "人群管理",
  "企微管理",
  "企微风控",
  "查询工具",
  "数据看板",
  "营销分析",
  "联盟推广",
  "会话管理",
];

const state = {
  page: "overview",
  role: "运营管理员",
  toastId: 1,
  modal: null,
  filters: {},
  expiryStage: "全部",
  logsCollapsed: false,
};

const machines = [
  {
    id: "CM-202607-001",
    type: "云手机",
    vendor: "微联",
    source: "采购单 PO-0718",
    status: "公共池可用",
    owner: "公共池",
    customer: "-",
    project: "-",
    account: "-",
    identity: "-",
    app: "-",
    loginStatus: "未绑定",
    supplierExpiry: "2027-07-31",
    customerExpiry: "-",
    remaining: 369,
    note: "推荐分配",
  },
  {
    id: "CM-202607-002",
    type: "云 PAD",
    vendor: "有机云",
    source: "采购单 PO-0719",
    status: "公共池可用",
    owner: "公共池",
    customer: "-",
    project: "-",
    account: "-",
    identity: "-",
    app: "-",
    loginStatus: "未绑定",
    supplierExpiry: "2027-06-30",
    customerExpiry: "-",
    remaining: 338,
    note: "可分配",
  },
  {
    id: "CM-202607-003",
    type: "云手机",
    vendor: "微联",
    source: "采购单 PO-0719",
    status: "待检测",
    owner: "公共池",
    customer: "-",
    project: "-",
    account: "-",
    identity: "-",
    app: "-",
    loginStatus: "未绑定",
    supplierExpiry: "2027-04-30",
    customerExpiry: "-",
    remaining: 277,
    note: "退回检测中",
  },
  {
    id: "CM-202607-014",
    type: "云手机",
    vendor: "微联",
    source: "分配批次 BA-1021",
    status: "客户池空闲",
    owner: "客户云机池",
    customer: "杭州星河科技",
    project: "-",
    account: "wx-xh-001",
    identity: "王澈",
    app: "企微助手",
    loginStatus: "在线",
    supplierExpiry: "2027-07-31",
    customerExpiry: "2026-09-30",
    remaining: 65,
    note: "可分配项目",
  },
  {
    id: "CM-202607-015",
    type: "云 PAD",
    vendor: "有机云",
    source: "分配批次 BA-1022",
    status: "项目使用中",
    owner: "客户项目",
    customer: "上海明川贸易",
    project: "私域转化 A 组",
    account: "wx-mc-018",
    identity: "李昂",
    app: "群运营",
    loginStatus: "在线",
    supplierExpiry: "2027-06-30",
    customerExpiry: "2026-08-08",
    remaining: 12,
    note: "项目中",
  },
  {
    id: "CM-202607-016",
    type: "云手机",
    vendor: "微联",
    source: "分配批次 BA-1018",
    status: "续期保护期",
    owner: "客户名下",
    customer: "成都青桥教育",
    project: "试听课邀约",
    account: "wx-qq-022",
    identity: "周琳",
    app: "企微助手",
    loginStatus: "在线",
    supplierExpiry: "2027-05-30",
    customerExpiry: "2026-07-23",
    remaining: -4,
    note: "已提醒 2 次",
  },
  {
    id: "CM-202607-017",
    type: "云 PAD",
    vendor: "有机云",
    source: "分配批次 BA-1016",
    status: "禁用保护期",
    owner: "客户名下",
    customer: "广州嘉禾餐饮",
    project: "门店会员召回",
    account: "wx-jh-004",
    identity: "陈思",
    app: "群运营",
    loginStatus: "限制登录",
    supplierExpiry: "2027-02-28",
    customerExpiry: "2026-07-15",
    remaining: -12,
    note: "待续期恢复",
  },
  {
    id: "CM-202607-018",
    type: "云手机",
    vendor: "微联",
    source: "退回单 RT-201",
    status: "待维护",
    owner: "公共池",
    customer: "-",
    project: "-",
    account: "-",
    identity: "-",
    app: "-",
    loginStatus: "未绑定",
    supplierExpiry: "2027-01-31",
    customerExpiry: "-",
    remaining: 188,
    note: "登录异常",
  },
];

const orders = [
  {
    id: "ORD-202607-101",
    customer: "杭州星河科技",
    type: "云手机",
    count: 2,
    leaseStart: "2026-07-27",
    leaseEnd: "2026-09-30",
    status: "待分配确认",
    creator: "刘祐宁",
    suggestion: "库存充足，推荐微联 2 台",
  },
  {
    id: "ORD-202607-102",
    customer: "深圳云启互动",
    type: "云 PAD",
    count: 4,
    leaseStart: "2026-07-28",
    leaseEnd: "2026-12-31",
    status: "库存不足",
    creator: "刘祐宁",
    suggestion: "缺口 3 台，建议补采有机云云 PAD",
  },
  {
    id: "ORD-202607-103",
    customer: "上海明川贸易",
    type: "云 PAD",
    count: 1,
    leaseStart: "2026-07-20",
    leaseEnd: "2026-08-08",
    status: "已分配",
    creator: "王茜",
    suggestion: "已进入客户池",
  },
];

const workorders = [
  {
    id: "WO-202607-071",
    type: "更换",
    customer: "杭州星河科技",
    oldMachine: "CM-202607-014",
    newMachine: "CM-202607-001",
    reason: "客户反馈旧机登录卡顿",
    status: "待审批",
    result: "待处理",
  },
  {
    id: "WO-202607-072",
    type: "退回",
    customer: "成都青桥教育",
    oldMachine: "CM-202607-016",
    newMachine: "-",
    reason: "客户确认不再使用",
    status: "待处理",
    result: "待处理",
  },
];

const configs = [
  { vendor: "微联", enabled: true, phoneRatio: 60, padRatio: 40, expiryPolicy: "T-7/T-3/T-1 提醒" },
  { vendor: "有机云", enabled: true, phoneRatio: 40, padRatio: 60, expiryPolicy: "T-7/T-3/T-1 提醒" },
];

const logs = [
  logSeed("CM-202607-015", "项目分配", "王茜", "客户池空闲", "项目使用中", "绑定项目：私域转化 A 组", "成功"),
  logSeed("CM-202607-016", "到期流转", "系统", "正常使用期", "续期保护期", "客户到期未续期", "成功"),
  logSeed("CM-202607-017", "到期流转", "系统", "续期保护期", "禁用保护期", "8 天保护期结束", "成功"),
  logSeed("ORD-202607-102", "库存校验", "刘祐宁", "草稿", "库存不足", "可用云 PAD 不足", "阻断"),
];

function logSeed(object, action, operator, before, after, reason, result) {
  return {
    id: `LOG-${Math.floor(Math.random() * 9000 + 1000)}`,
    object,
    action,
    operator,
    time: "2026-07-27 14:20",
    before,
    after,
    reason,
    result,
  };
}

function icon(name) {
  const common = `viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"`;
  const paths = {
    user: `<path d="M20 21a8 8 0 0 0-16 0"/><circle cx="12" cy="7" r="4"/>`,
    money: `<circle cx="12" cy="12" r="9"/><path d="M12 7v10M8.5 10.5c0-1.4 1.2-2.3 3.5-2.3s3.5.9 3.5 2.3-1.2 2.2-3.5 2.2-3.5.8-3.5 2.2 1.2 2.3 3.5 2.3 3.5-.9 3.5-2.3"/>`,
    doc: `<path d="M7 3h8l4 4v14H7z"/><path d="M15 3v5h5M9 13h6M9 17h6"/>`,
    task: `<path d="M8 6h12M8 12h12M8 18h12"/><path d="m3 6 1 1 2-3M3 12l1 1 2-3M3 18l1 1 2-3"/>`,
    folder: `<path d="M3 7h7l2 2h9v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>`,
    group: `<path d="M16 21a6 6 0 0 0-12 0"/><circle cx="10" cy="8" r="4"/><path d="M22 21a5 5 0 0 0-5-5M17 4a3 3 0 0 1 0 6"/>`,
    chat: `<path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/>`,
    search: `<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>`,
    chart: `<path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/>`,
    link: `<path d="M10 13a5 5 0 0 0 7.1.1l2-2a5 5 0 0 0-7.1-7.1l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.1-.1l-2 2A5 5 0 0 0 12 20l1.1-1.1"/>`,
    cloud: `<path d="M17.5 19H7a5 5 0 0 1-.9-9.9A7 7 0 0 1 19.7 11 4 4 0 0 1 17.5 19z"/>`,
  };
  return `<svg class="menu-icon" ${common}>${paths[name] || paths.doc}</svg>`;
}

function render() {
  document.getElementById("app").innerHTML = `
    <div class="app-shell">
      ${renderTopbar()}
      ${renderSidebar()}
      <main class="main-scroll">
        <div class="content">
          <div class="breadcrumb">云机管理&nbsp;&nbsp;/&nbsp;&nbsp;<b>${pageLabel(state.page)}</b></div>
          <section class="panel">
            ${renderTabs()}
            ${renderPage()}
          </section>
        </div>
      </main>
    </div>
  `;
  renderModal();
}

function renderTopbar() {
  return `
    <header class="topbar">
      <div class="brand"><span class="brand-mark"><span></span></span><span>微电云运管平台</span></div>
      <div class="top-actions">
        <button data-action="permissionApply">权限申请</button><span class="split">|</span>
        <button data-action="downloadCenter">下载中心</button><span class="split">|</span>
        <select aria-label="切换角色" data-action="roleChange">
          ${["超级管理员", "运营管理员", "实施/客服", "商务/财务", "只读/审计"].map((role) => `<option ${role === state.role ? "selected" : ""}>${role}</option>`).join("")}
        </select><span class="split">|</span>
        <button data-action="logout">退出</button>
      </div>
    </header>
  `;
}

function renderSidebar() {
  const icons = ["user", "money", "doc", "task", "folder", "group", "chat", "chat", "search", "chart", "chart", "link", "chat"];
  return `
    <aside class="sidebar">
      ${NAV.map((label, index) => `
        <button class="menu-item ${label === "数据看板" ? "" : ""}" data-action="navToast" data-label="${label}">
          ${icon(icons[index])}<span class="menu-label">${label}</span><span class="chevron"></span>
        </button>
      `).join("")}
      <button class="menu-item active" data-action="switchPage" data-page="overview">
        ${icon("cloud")}<span class="menu-label">云机管理</span><span class="chevron"></span>
      </button>
      <div class="submenu">
        ${PAGES.map((p) => `<button class="submenu-item ${state.page === p.id ? "active" : ""}" data-action="switchPage" data-page="${p.id}">${p.label}</button>`).join("")}
      </div>
    </aside>
  `;
}

function renderTabs() {
  return `
    <nav class="module-tabs" aria-label="云机管理模块">
      ${PAGES.map((p) => `<button class="module-tab ${state.page === p.id ? "active" : ""}" data-action="switchPage" data-page="${p.id}">${p.label}</button>`).join("")}
    </nav>
  `;
}

function renderPage() {
  const pages = {
    overview: renderOverview,
    publicPool: renderPublicPool,
    orders: renderOrders,
    customerPool: renderCustomerPool,
    bindings: renderBindings,
    workorders: renderWorkorders,
    expiry: renderExpiry,
    config: renderConfig,
    logs: renderLogs,
  };
  return pages[state.page]();
}

function renderOverview() {
  const metrics = getMetrics();
  return `
    ${renderTitle("数据明细", "数据更新时间：2026-07-27 14:56")}
    ${renderFilters([
      ["vendor", "合作方", "请选择合作方", ["", "微联", "有机云"]],
      ["type", "设备类型", "请选择设备类型", ["", "云手机", "云 PAD"]],
      ["status", "状态", "请选择状态", ["", ...statusList()]],
      ["customer", "客户名称", "请输入客户名称"],
      ["project", "项目名称", "请输入项目名称"],
      ["expiry", "到期区间", "请选择到期区间", ["", "7 天内", "30 天内", "已到期"]],
    ])}
    <div class="action-row">
      <button class="btn" data-action="resetFilters">重置</button>
      <button class="btn primary" data-action="search">搜索</button>
    </div>
    <div class="toolbar">
      <div class="toolbar-left">
        <button class="btn primary" data-action="exportAll">下载全部</button>
        <button class="btn" data-action="openImport">采购入库</button>
        <button class="btn" data-action="openOrder">新增订购</button>
      </div>
      <div class="toolbar-right"><span class="tag red">高风险操作需二次确认并填写原因</span></div>
    </div>
    <div class="summary-strip">
      <div class="summary-art"></div>
      <div class="summary-label">汇总结果：</div>
      <div>公共池可用 <span class="summary-num">${metrics.available}</span></div>
      <div>客户池空闲 <span class="summary-num">${metrics.customerIdle}</span></div>
      <div>项目使用中 <span class="summary-num">${metrics.inProject}</span></div>
      <div>待检测/维护 <span class="summary-num">${metrics.risk}</span></div>
      <div>保护期资源 <span class="summary-num">${metrics.expiring}</span></div>
    </div>
    <div class="kpi-grid">
      ${[
        ["公共池可用", metrics.available, "点击进入公共云机池", "publicPool", "公共池可用"],
        ["客户池空闲", metrics.customerIdle, "可继续分配项目", "customerPool", "客户池空闲"],
        ["项目使用中", metrics.inProject, "客户项目占用资源", "customerPool", "项目使用中"],
        ["续期/禁用保护", metrics.expiring, "需运营跟进", "expiry", ""],
        ["待检测/维护", metrics.risk, "回收后检测队列", "publicPool", "待检测"],
      ].map(([name, value, note, page, status]) => `
        <div class="kpi-card">
          <button data-action="metricJump" data-page="${page}" data-status="${status}">
            <div class="kpi-name">${name}</div>
            <div class="kpi-value">${value}</div>
            <div class="kpi-note">${note}</div>
          </button>
        </div>
      `).join("")}
    </div>
    <div class="board-grid">
      <div class="board-panel">
        <h3>生命周期流转</h3>
        <div class="flow">
          ${["采购入库", "公共池分配", "客户池/项目使用", "续期/退回/到期"].map((step, i) => `
            <div class="flow-step"><b>${i + 1}. ${step}</b><span>${["导入或生成云机资源，重复 ID 生成失败明细。", "仅公共池可用且类型、期限匹配的资源可分配。", "项目回收只回客户池；退回才进公共池待检测。", "8 天续期保护、3 天禁用保护后正式到期处理。"][i]}</span></div>
          `).join("")}
        </div>
      </div>
      <div class="board-panel">
        <h3>合作方库存占比</h3>
        <div class="mini-bars">
          ${configs.map((c) => {
            const total = machines.filter((m) => m.vendor === c.vendor).length;
            return `<div class="mini-bar"><span>${c.vendor}</span><span class="bar-track"><span class="bar-fill" style="width:${Math.max(12, total * 12)}%"></span></span><b>${total}</b></div>`;
          }).join("")}
        </div>
      </div>
    </div>
    ${renderMachineTable(machines.slice(0, 6), "overview")}
  `;
}

function renderPublicPool() {
  const rows = machines.filter((m) => m.owner === "公共池");
  return `
    ${renderTitle("公共云机池列表", "仅“公共池可用”可进入客户分配候选")}
    ${renderFilters([
      ["machineId", "云机ID", "请输入云机ID"],
      ["type", "设备类型", "请选择设备类型", ["", "云手机", "云 PAD"]],
      ["vendor", "合作方", "请选择合作方", ["", "微联", "有机云"]],
      ["status", "资源状态", "请选择资源状态", ["", "公共池可用", "待检测", "待维护", "暂停使用"]],
      ["supplierExpiry", "合作方到期", "请选择到期区间", ["", "90 天内", "180 天内", "一年内"]],
      ["source", "入库来源", "请输入采购单/批次"],
    ])}
    <div class="action-row">
      <button class="btn" data-action="resetFilters">重置</button>
      <button class="btn primary" data-action="search">搜索</button>
    </div>
    <div class="toolbar">
      <div class="toolbar-left">
        <button class="btn primary" data-action="openImport">导入入库</button>
        <button class="btn" data-action="exportAll">批量导出</button>
        <button class="btn" data-action="batchDetect">批量检测</button>
      </div>
      <span class="tag gray">非可用状态的分配按钮会置灰</span>
    </div>
    ${renderMachineTable(rows, "publicPool")}
  `;
}

function renderOrders() {
  return `
    ${renderTitle("客户订购列表", "库存校验通过后才能确认分配")}
    ${renderFilters([
      ["customer", "客户名称", "请输入客户名称"],
      ["orderStatus", "订购状态", "请选择状态", ["", "草稿", "待库存校验", "待分配确认", "库存不足", "已分配", "已取消"]],
      ["type", "设备类型", "请选择设备类型", ["", "云手机", "云 PAD"]],
      ["creator", "创建人", "请输入创建人"],
      ["leaseStart", "开始时间", "请选择开始时间"],
      ["leaseEnd", "结束时间", "请选择结束时间"],
    ])}
    <div class="action-row">
      <button class="btn" data-action="resetFilters">重置</button>
      <button class="btn primary" data-action="search">搜索</button>
    </div>
    <div class="toolbar">
      <div class="toolbar-left">
        <button class="btn primary" data-action="openOrder">新增订购</button>
        <button class="btn" data-action="exportAll">导出订购</button>
      </div>
    </div>
    ${renderOrdersTable()}
  `;
}

function renderCustomerPool() {
  const rows = machines.filter((m) => ["客户云机池", "客户项目", "客户名下"].includes(m.owner));
  return `
    ${renderTitle("客户云机池", "项目回收只回客户池；退回才进入公共池待检测")}
    ${renderFilters([
      ["customer", "客户ID/名称", "请输入客户ID或名称"],
      ["project", "项目名称", "请输入项目名称"],
      ["account", "企微账号", "请输入企微账号"],
      ["status", "保护期状态", "请选择状态", ["", "客户池空闲", "项目使用中", "续期保护期", "禁用保护期"]],
      ["expiry", "客户到期日", "请选择到期区间"],
      ["machineId", "云机ID", "请输入云机ID"],
    ])}
    <div class="action-row">
      <button class="btn" data-action="resetFilters">重置</button>
      <button class="btn primary" data-action="search">搜索</button>
    </div>
    ${renderMachineTable(rows, "customerPool")}
  `;
}

function renderBindings() {
  const rows = machines.filter((m) => m.account !== "-");
  return `
    ${renderTitle("绑定管理", "企微账号同一时间只能绑定一台云机")}
    ${renderFilters([
      ["account", "企微账号", "请输入企微账号"],
      ["identity", "真人身份", "请输入真人身份"],
      ["app", "应用", "请选择应用", ["", "企微助手", "群运营"]],
      ["loginStatus", "登录状态", "请选择登录状态", ["", "在线", "离线", "限制登录"]],
      ["machineId", "云机ID", "请输入云机ID"],
      ["customer", "客户名称", "请输入客户名称"],
    ])}
    <div class="action-row">
      <button class="btn" data-action="resetFilters">重置</button>
      <button class="btn primary" data-action="search">搜索</button>
    </div>
    ${renderBindingTable(rows)}
  `;
}

function renderWorkorders() {
  return `
    ${renderTitle("更换/退回工单", "更换展示旧机回收和新机分配两个步骤")}
    <div class="toolbar">
      <div class="toolbar-left">
        <button class="btn primary" data-action="openWorkorder" data-kind="更换">新建更换工单</button>
        <button class="btn" data-action="openWorkorder" data-kind="退回">新建退回工单</button>
      </div>
      <span class="tag red">审批、换机、退回均写入操作日志</span>
    </div>
    ${renderWorkorderTable()}
  `;
}

function renderExpiry() {
  const phases = ["全部", "正常使用期", "续期保护期", "禁用保护期", "正式到期处理"];
  const rows = machines.filter((m) => {
    if (state.expiryStage === "全部") return m.customerExpiry !== "-";
    if (state.expiryStage === "正常使用期") return m.customerExpiry !== "-" && m.remaining >= 0;
    if (state.expiryStage === "正式到期处理") return m.status === "已到期处理";
    return m.status === state.expiryStage;
  });
  return `
    ${renderTitle("续期到期中心", "到期后 8 天续期保护 + 3 天禁用保护")}
    <nav class="phase-tabs">
      ${phases.map((p) => `<button class="phase-tab ${state.expiryStage === p ? "active" : ""}" data-action="switchExpiry" data-stage="${p}">${p}</button>`).join("")}
    </nav>
    <div class="toolbar">
      <div class="toolbar-left">
        <button class="btn" data-action="runExpiryJob">执行日终到期检查</button>
        <button class="btn primary" data-action="exportAll">导出到期清单</button>
      </div>
    </div>
    ${renderExpiryTable(rows)}
  `;
}

function renderConfig() {
  return `
    ${renderTitle("配置中心", "合作方、分配比例、设备类型和提醒规则")}
    ${!can("config") ? renderPermissionBanner("当前角色仅可查看配置，不能编辑或启停合作方。") : ""}
    <div class="toolbar">
      <div class="toolbar-left">
        <button class="btn primary" data-action="addConfig" ${!can("config") ? "disabled" : ""}>新增合作方</button>
        <button class="btn" data-action="resetRatio" ${!can("config") ? "disabled" : ""}>按库存均分</button>
      </div>
    </div>
    ${renderConfigTable()}
  `;
}

function renderLogs() {
  return `
    ${renderTitle("操作日志", "高风险操作必须记录原因，不允许删除")}
    ${renderFilters([
      ["object", "对象ID", "请输入云机/客户/项目/账号"],
      ["action", "动作", "请选择动作", ["", "采购入库", "库存分配", "项目分配", "项目回收", "更换", "退回", "续期", "到期处理", "导出"]],
      ["operator", "操作人", "请输入操作人"],
      ["result", "结果", "请选择结果", ["", "成功", "阻断", "失败"]],
      ["from", "开始时间", "请选择开始时间"],
      ["to", "结束时间", "请选择结束时间"],
    ])}
    <div class="action-row">
      <button class="btn" data-action="resetFilters">重置</button>
      <button class="btn primary" data-action="search">搜索</button>
    </div>
    <div class="toolbar">
      <div class="toolbar-left">
        <button class="btn primary" data-action="exportAll">导出日志</button>
      </div>
    </div>
    ${renderLogTable(logs)}
  `;
}

function renderTitle(title, meta) {
  return `<div class="section-title"><h2>${title}</h2><span class="meta">${meta}</span></div>`;
}

function renderFilters(fields) {
  return `
    <div class="filter-grid">
      ${fields.map(([key, label, placeholder, options]) => `
        <div class="filter-field">
          <label>${label}</label>
          ${options ? `<select class="select" data-filter="${key}">${options.map((v) => `<option value="${v}">${v || placeholder}</option>`).join("")}</select>` : `<input class="input" data-filter="${key}" placeholder="${placeholder}" />`}
        </div>
      `).join("")}
    </div>
  `;
}

function renderMachineTable(rows, context) {
  if (!rows.length) return `<div class="empty">暂无符合条件的云机资源</div>`;
  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>云机 ID</th><th>设备类型</th><th>合作方</th><th>归属</th><th>状态</th><th>客户</th><th>项目</th><th>企微账号</th><th>客户到期日</th><th>剩余天数</th><th>操作</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((m) => `
            <tr>
              <td><button class="link-like" data-action="showMachine" data-id="${m.id}">${m.id}</button></td>
              <td>${m.type}</td>
              <td>${m.vendor}</td>
              <td>${m.owner}</td>
              <td>${statusTag(m.status)}</td>
              <td>${m.customer}</td>
              <td>${m.project}</td>
              <td>${m.account}</td>
              <td>${m.customerExpiry}</td>
              <td>${m.remaining}</td>
              <td>${machineActions(m, context)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function machineActions(m, context) {
  if (context === "publicPool") {
    return `
      <button class="btn ghost" data-action="allocateMachine" data-id="${m.id}" ${m.status !== "公共池可用" || !can("allocate") ? "disabled" : ""}>分配</button>
      <button class="btn ghost" data-action="detectMachine" data-id="${m.id}" ${!["待检测", "待维护"].includes(m.status) || !can("detect") ? "disabled" : ""}>检测</button>
      <button class="btn ghost warning" data-action="pauseMachine" data-id="${m.id}" ${!can("detect") ? "disabled" : ""}>暂停</button>
    `;
  }
  return `
    <button class="btn ghost" data-action="bindMachine" data-id="${m.id}" ${m.status !== "客户池空闲" || !can("bind") ? "disabled" : ""}>绑定</button>
    <button class="btn ghost" data-action="assignProject" data-id="${m.id}" ${m.status !== "客户池空闲" || !can("allocate") ? "disabled" : ""}>分配项目</button>
    <button class="btn ghost" data-action="recycleProject" data-id="${m.id}" ${m.status !== "项目使用中" || !can("return") ? "disabled" : ""}>项目回收</button>
    <button class="btn ghost warning" data-action="replaceMachine" data-id="${m.id}" ${!can("return") ? "disabled" : ""}>更换</button>
    <button class="btn ghost warning" data-action="returnMachine" data-id="${m.id}" ${!can("return") ? "disabled" : ""}>退回</button>
    <button class="btn ghost" data-action="renewMachine" data-id="${m.id}" ${!can("renew") ? "disabled" : ""}>续期</button>
  `;
}

function renderOrdersTable() {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr><th>订购单</th><th>客户</th><th>类型</th><th>数量</th><th>租期</th><th>状态</th><th>创建人</th><th>校验/建议</th><th>操作</th></tr></thead>
        <tbody>
          ${orders.map((o) => `
            <tr>
              <td>${o.id}</td><td>${o.customer}</td><td>${o.type}</td><td>${o.count}</td><td>${o.leaseStart} 至 ${o.leaseEnd}</td><td>${statusTag(o.status)}</td><td>${o.creator}</td><td>${o.suggestion}</td>
              <td>
                <button class="btn ghost" data-action="checkOrder" data-id="${o.id}" ${!can("allocate") ? "disabled" : ""}>库存校验</button>
                <button class="btn ghost" data-action="confirmOrder" data-id="${o.id}" ${o.status !== "待分配确认" || !can("allocate") ? "disabled" : ""}>确认分配</button>
                <button class="btn ghost warning" data-action="cancelOrder" data-id="${o.id}" ${o.status === "已分配" || !can("allocate") ? "disabled" : ""}>取消</button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderBindingTable(rows) {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr><th>云机 ID</th><th>客户</th><th>企微账号</th><th>真人身份</th><th>应用</th><th>登录状态</th><th>项目</th><th>操作</th></tr></thead>
        <tbody>
          ${rows.map((m) => `
            <tr>
              <td>${m.id}</td><td>${m.customer}</td><td>${m.account}</td><td>${m.identity}</td><td>${m.app}</td><td>${statusTag(m.loginStatus)}</td><td>${m.project}</td>
              <td>
                <button class="btn ghost" data-action="bindMachine" data-id="${m.id}" ${!can("bind") ? "disabled" : ""}>变更</button>
                <button class="btn ghost warning" data-action="unbindMachine" data-id="${m.id}" ${!can("bind") ? "disabled" : ""}>解绑</button>
                <button class="btn ghost" data-action="showMachine" data-id="${m.id}">日志</button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderWorkorderTable() {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr><th>工单号</th><th>类型</th><th>客户</th><th>旧云机</th><th>新云机</th><th>原因</th><th>状态</th><th>处理结果</th><th>操作</th></tr></thead>
        <tbody>
          ${workorders.map((w) => `
            <tr>
              <td>${w.id}</td><td>${w.type}</td><td>${w.customer}</td><td>${w.oldMachine}</td><td>${w.newMachine}</td><td>${w.reason}</td><td>${statusTag(w.status)}</td><td>${w.result}</td>
              <td>
                <button class="btn ghost" data-action="approveWorkorder" data-id="${w.id}" ${w.status !== "待审批" || !can("return") ? "disabled" : ""}>审批</button>
                <button class="btn ghost warning" data-action="finishWorkorder" data-id="${w.id}" ${!can("return") ? "disabled" : ""}>完成处理</button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderExpiryTable(rows) {
  if (!rows.length) return `<div class="empty">当前阶段暂无资源</div>`;
  return `
    <div class="table-wrap">
      <table>
        <thead><tr><th>云机 ID</th><th>客户</th><th>项目</th><th>客户到期日</th><th>剩余天数</th><th>阶段</th><th>提醒状态</th><th>可用性</th><th>操作</th></tr></thead>
        <tbody>
          ${rows.map((m) => `
            <tr>
              <td>${m.id}</td><td>${m.customer}</td><td>${m.project}</td><td>${m.customerExpiry}</td><td>${m.remaining}</td><td>${statusTag(m.status)}</td><td>${m.note}</td><td>${m.status === "禁用保护期" ? "限制登录" : "原则可用"}</td>
              <td>
                <button class="btn ghost" data-action="renewMachine" data-id="${m.id}" ${!can("renew") ? "disabled" : ""}>续期</button>
                <button class="btn ghost warning" data-action="disableMachine" data-id="${m.id}" ${m.status !== "续期保护期" || !can("renew") ? "disabled" : ""}>转禁用</button>
                <button class="btn ghost warning" data-action="expireMachine" data-id="${m.id}" ${m.status !== "禁用保护期" || !can("return") ? "disabled" : ""}>正式回收</button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderConfigTable() {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr><th>合作方</th><th>状态</th><th>云手机分配比例</th><th>云 PAD 分配比例</th><th>提醒规则</th><th>操作</th></tr></thead>
        <tbody>
          ${configs.map((c) => `
            <tr>
              <td>${c.vendor}</td><td>${c.enabled ? statusTag("启用") : statusTag("停用")}</td><td>${c.phoneRatio}%</td><td>${c.padRatio}%</td><td>${c.expiryPolicy}</td>
              <td>
                <button class="btn ghost" data-action="editConfig" data-vendor="${c.vendor}" ${!can("config") ? "disabled" : ""}>编辑</button>
                <button class="btn ghost warning" data-action="toggleConfig" data-vendor="${c.vendor}" ${!can("config") ? "disabled" : ""}>${c.enabled ? "停用" : "启用"}</button>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function renderLogTable(rows) {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr><th>日志 ID</th><th>对象</th><th>动作</th><th>操作人</th><th>时间</th><th>前值</th><th>后值</th><th>原因</th><th>结果</th></tr></thead>
        <tbody>
          ${rows.map((l) => `
            <tr><td>${l.id}</td><td>${l.object}</td><td>${l.action}</td><td>${l.operator}</td><td>${l.time}</td><td>${l.before}</td><td>${l.after}</td><td>${l.reason}</td><td>${statusTag(l.result)}</td></tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `;
}

function statusTag(status) {
  const cls = {
    "公共池可用": "green",
    "客户池空闲": "blue",
    "项目使用中": "blue",
    "续期保护期": "gold",
    "禁用保护期": "red",
    "待检测": "gold",
    "待维护": "red",
    "暂停使用": "gray",
    "已分配": "green",
    "待分配确认": "gold",
    "库存不足": "red",
    "已取消": "gray",
    "在线": "green",
    "限制登录": "red",
    "启用": "green",
    "停用": "gray",
    "成功": "green",
    "阻断": "red",
    "待审批": "gold",
    "待处理": "gold",
  }[status] || "gray";
  return `<span class="tag ${cls}">${status}</span>`;
}

function getMetrics() {
  return {
    available: machines.filter((m) => m.status === "公共池可用").length,
    customerIdle: machines.filter((m) => m.status === "客户池空闲").length,
    inProject: machines.filter((m) => m.status === "项目使用中").length,
    expiring: machines.filter((m) => ["续期保护期", "禁用保护期"].includes(m.status)).length,
    risk: machines.filter((m) => ["待检测", "待维护", "暂停使用"].includes(m.status)).length,
  };
}

function statusList() {
  return ["公共池可用", "客户池空闲", "项目使用中", "续期保护期", "禁用保护期", "待检测", "待维护", "暂停使用", "已退回合作方", "已到期处理"];
}

function pageLabel(id) {
  return PAGES.find((p) => p.id === id)?.label || "云机管理";
}

function can(action) {
  const role = state.role;
  if (role === "超级管理员" || role === "运营管理员") return true;
  if (role === "实施/客服") return ["bind", "return"].includes(action);
  if (role === "商务/财务") return ["renew"].includes(action);
  if (role === "只读/审计") return false;
  return true;
}

function renderPermissionBanner(text) {
  return `<div class="permission-banner"><span>${text}</span><button class="btn" data-action="permissionApply">申请权限</button></div>`;
}

function toast(title, message) {
  const root = document.getElementById("toast-root");
  const id = `toast-${state.toastId++}`;
  root.innerHTML = `<div class="toast-stack">${root.querySelector(".toast-stack")?.innerHTML || ""}<div id="${id}" class="toast"><strong>${title}</strong><div>${message}</div></div></div>`;
  setTimeout(() => document.getElementById(id)?.remove(), 3200);
}

function addLog(object, action, before, after, reason, result = "成功") {
  logs.unshift({
    id: `LOG-${String(logs.length + 1001).padStart(4, "0")}`,
    object,
    action,
    operator: state.role === "只读/审计" ? "审计用户" : "刘祐宁",
    time: "2026-07-27 14:56",
    before,
    after,
    reason,
    result,
  });
}

function findMachine(id) {
  return machines.find((m) => m.id === id);
}

function openModal(config) {
  state.modal = config;
  renderModal();
}

function closeModal() {
  state.modal = null;
  renderModal();
}

function renderModal() {
  const root = document.getElementById("modal-root");
  if (!state.modal) {
    root.innerHTML = "";
    return;
  }
  const m = state.modal;
  root.innerHTML = `
    <div class="modal-mask">
      <section class="modal" role="dialog" aria-modal="true">
        <div class="modal-head">
          <h3 class="modal-title">${m.title}</h3>
          <button class="btn" data-action="closeModal">关闭</button>
        </div>
        <div class="modal-body">${m.body}</div>
        <div class="modal-foot">
          <button class="btn" data-action="closeModal">取消</button>
          <button class="btn danger" data-action="${m.confirmAction}" ${m.id ? `data-id="${m.id}"` : ""}>确认</button>
        </div>
      </section>
    </div>
  `;
}

function modalForm(fields, warning = "") {
  return `
    ${warning ? `<div class="permission-banner">${warning}</div>` : ""}
    <div class="form-grid">
      ${fields.map(([label, value, type = "text"]) => `
        <div class="form-row">
          <label>${label}</label>
          ${type === "textarea" ? `<textarea class="textarea">${value}</textarea>` : `<input class="input" value="${value}" />`}
        </div>
      `).join("")}
    </div>
  `;
}

function showMachine(id) {
  const m = findMachine(id);
  const related = logs.filter((l) => l.object === id).slice(0, 4);
  openModal({
    id,
    title: `${id} 详情`,
    confirmAction: "closeModal",
    body: `
      <div class="form-grid">
        ${[
          ["当前归属", m.owner],
          ["上一归属", m.source],
          ["状态", m.status],
          ["客户/项目", `${m.customer} / ${m.project}`],
          ["企微账号", `${m.account} ${m.identity !== "-" ? `(${m.identity})` : ""}`],
          ["客户到期日", m.customerExpiry],
          ["备注", m.note],
        ].map(([k, v]) => `<div class="form-row"><label>${k}</label><div>${v}</div></div>`).join("")}
      </div>
      <h3>最近日志</h3>
      <div class="timeline">
        ${(related.length ? related : logs.slice(0, 2)).map((l) => `<div class="timeline-item"><div class="timeline-time">${l.time}</div><div>${l.action}：${l.before} -> ${l.after}，原因：${l.reason}</div></div>`).join("")}
      </div>
    `,
  });
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) return;
  const action = target.dataset.action;
  const id = target.dataset.id;

  if (action === "switchPage") {
    state.page = target.dataset.page;
    render();
    return;
  }
  if (action === "switchExpiry") {
    state.expiryStage = target.dataset.stage;
    render();
    return;
  }
  if (action === "metricJump") {
    state.page = target.dataset.page;
    state.filters.status = target.dataset.status;
    render();
    toast("已跳转", "指标已带入对应列表筛选口径。");
    return;
  }
  if (action === "closeModal") return closeModal();
  if (action === "search") return toast("查询完成", "原型已保留筛选区和结果刷新反馈。");
  if (action === "resetFilters") {
    document.querySelectorAll("[data-filter]").forEach((el) => (el.value = ""));
    toast("已重置", "筛选条件已清空。");
    return;
  }
  if (action === "navToast") return toast("导航提示", `${target.dataset.label} 为现有运管端菜单，本原型聚焦云机管理。`);
  if (action === "permissionApply") return toast("权限申请", "已模拟提交云机管理操作权限申请。");
  if (action === "downloadCenter" || action === "exportAll") {
    addLog("EXPORT", "导出", "-", state.page, "用户导出当前数据范围");
    render();
    return toast("导出已生成", "下载中心已新增一条导出任务，并写入导出审计。");
  }
  if (action === "logout") return toast("退出", "原型环境已拦截退出动作。");
  if (action === "openImport") {
    return openModal({
      title: "采购入库",
      confirmAction: "confirmImport",
      body: modalForm([
        ["合作方", "微联"],
        ["设备类型", "云手机"],
        ["采购单号", "PO-0727"],
        ["导入数量", "3"],
        ["失败处理", "重复云机 ID 生成失败明细"],
      ]),
    });
  }
  if (action === "confirmImport") {
    machines.unshift({
      ...machines[0],
      id: `CM-202607-${String(20 + machines.length).padStart(3, "0")}`,
      status: "公共池可用",
      owner: "公共池",
      source: "采购单 PO-0727",
    });
    addLog("PO-0727", "采购入库", "导入前", "公共池可用 +1", "合法行进入公共池");
    closeModal();
    render();
    return toast("入库成功", "合法云机已进入公共云机池，失败明细可下载。");
  }
  if (action === "openOrder") {
    return openModal({
      title: "新增客户订购",
      confirmAction: "confirmCreateOrder",
      body: modalForm([
        ["客户名称", "深圳云启互动"],
        ["设备类型", "云 PAD"],
        ["数量", "2"],
        ["租期开始", "2026-07-28"],
        ["租期结束", "2026-12-31"],
      ]),
    });
  }
  if (action === "confirmCreateOrder") {
    const order = {
      id: `ORD-202607-${100 + orders.length + 1}`,
      customer: "深圳云启互动",
      type: "云 PAD",
      count: 2,
      leaseStart: "2026-07-28",
      leaseEnd: "2026-12-31",
      status: "待库存校验",
      creator: "刘祐宁",
      suggestion: "待校验",
    };
    orders.unshift(order);
    addLog(order.id, "客户订购", "无", "待库存校验", "运营新增客户租赁单");
    closeModal();
    render();
    return toast("订购已保存", "草稿不占用库存，可继续提交库存校验。");
  }
  if (action === "allocateMachine") {
    const m = findMachine(id);
    return openModal({
      id,
      title: `分配 ${id}`,
      confirmAction: "confirmAllocate",
      body: modalForm([
        ["客户", "杭州星河科技"],
        ["客户到期日", "2026-09-30"],
        ["分配原因", "客户订购库存确认"],
      ], `${m.id} 当前状态为 ${m.status}，确认后将从公共池转入客户云机池。`),
    });
  }
  if (action === "confirmAllocate") {
    const m = findMachine(id);
    const before = m.status;
    Object.assign(m, {
      status: "客户池空闲",
      owner: "客户云机池",
      customer: "杭州星河科技",
      customerExpiry: "2026-09-30",
      remaining: 65,
      note: "手工分配",
    });
    addLog(id, "库存分配", before, "客户池空闲", "客户订购库存确认");
    closeModal();
    render();
    return toast("分配成功", "云机已进入客户云机池，并写入客户到期日。");
  }
  if (action === "detectMachine") {
    const m = findMachine(id);
    const before = m.status;
    m.status = "公共池可用";
    m.note = "检测通过";
    addLog(id, "检测通过", before, "公共池可用", "运营检测完成");
    render();
    return toast("检测通过", `${id} 已恢复为公共池可用。`);
  }
  if (action === "pauseMachine") {
    const m = findMachine(id);
    const before = m.status;
    m.status = "暂停使用";
    m.note = "人工暂停";
    addLog(id, "暂停", before, "暂停使用", "运营人工暂停");
    render();
    return toast("已暂停", `${id} 已暂停，不进入分配候选。`);
  }
  if (action === "bindMachine") {
    return openModal({
      id,
      title: `绑定企微账号 ${id}`,
      confirmAction: "confirmBind",
      body: modalForm([
        ["企微账号", "wx-new-027"],
        ["真人身份", "赵晴"],
        ["应用", "企微助手"],
        ["登录状态", "在线"],
        ["原因", "项目启动前账号绑定", "textarea"],
      ]),
    });
  }
  if (action === "confirmBind") {
    const m = findMachine(id);
    const before = m.account;
    Object.assign(m, { account: "wx-new-027", identity: "赵晴", app: "企微助手", loginStatus: "在线" });
    addLog(id, "企微绑定", before, m.account, "项目启动前账号绑定");
    closeModal();
    render();
    return toast("绑定成功", "企微账号绑定关系已生成。");
  }
  if (action === "assignProject") {
    const m = findMachine(id);
    const before = m.status;
    Object.assign(m, { status: "项目使用中", owner: "客户项目", project: "私域转化 B 组", note: "项目中" });
    addLog(id, "项目分配", before, "项目使用中", "项目属于同一客户");
    render();
    return toast("项目已分配", "云机状态已变为项目使用中。");
  }
  if (action === "recycleProject") {
    const m = findMachine(id);
    const before = m.status;
    Object.assign(m, { status: "客户池空闲", owner: "客户云机池", project: "-", note: "项目回收" });
    addLog(id, "项目回收", before, "客户池空闲", "只解除项目绑定，保留客户租赁归属");
    render();
    return toast("项目回收完成", "云机已回到客户云机池，未进入公共池。");
  }
  if (action === "replaceMachine" || action === "returnMachine") {
    return openModal({
      id,
      title: action === "replaceMachine" ? `更换云机 ${id}` : `退回云机 ${id}`,
      confirmAction: action === "replaceMachine" ? "confirmReplace" : "confirmReturn",
      body: modalForm([
        ["操作原因", action === "replaceMachine" ? "客户申请更换，旧机登录异常" : "客户确认不再使用", "textarea"],
        ["二次确认", "高风险操作，确认写入日志"],
      ], "该操作会解除项目和企微绑定，必须填写原因。"),
    });
  }
  if (action === "confirmReplace") {
    const old = findMachine(id);
    const fresh = machines.find((m) => m.status === "公共池可用");
    const before = old.status;
    if (!fresh) {
      closeModal();
      return toast("更换阻断", "公共池没有可用新云机，已保留旧机原状态。");
    }
    Object.assign(fresh, { status: "客户池空闲", owner: "客户云机池", customer: old.customer, customerExpiry: old.customerExpiry, remaining: old.remaining, note: "更换新机" });
    Object.assign(old, { status: "待检测", owner: "公共池", customer: "-", project: "-", account: "-", identity: "-", app: "-", loginStatus: "未绑定", customerExpiry: "-", note: "更换旧机待检测" });
    addLog(id, "更换", before, "待检测", `旧机回收，新机 ${fresh.id} 分配`);
    closeModal();
    render();
    return toast("更换完成", `旧机进入待检测，新机 ${fresh.id} 进入客户云机池。`);
  }
  if (action === "confirmReturn") {
    const m = findMachine(id);
    const before = m.status;
    Object.assign(m, { status: "待检测", owner: "公共池", customer: "-", project: "-", account: "-", identity: "-", app: "-", loginStatus: "未绑定", customerExpiry: "-", remaining: 0, note: "客户退回待检测" });
    addLog(id, "退回", before, "待检测", "客户确认不再使用");
    closeModal();
    render();
    return toast("退回完成", "云机已解除客户、项目和账号关系，进入公共池待检测。");
  }
  if (action === "renewMachine") {
    return openModal({
      id,
      title: `续期 ${id}`,
      confirmAction: "confirmRenew",
      body: modalForm([
        ["原到期日", findMachine(id).customerExpiry],
        ["新到期日", "2026-12-31"],
        ["续期天数", "93"],
        ["处理原因", "客户确认续期", "textarea"],
      ]),
    });
  }
  if (action === "confirmRenew") {
    const m = findMachine(id);
    const before = `${m.status}/${m.customerExpiry}`;
    Object.assign(m, { status: m.project !== "-" ? "项目使用中" : "客户池空闲", customerExpiry: "2026-12-31", remaining: 157, note: "续期成功", loginStatus: m.account !== "-" ? "在线" : "未绑定" });
    addLog(id, "续期", before, `${m.status}/2026-12-31`, "客户确认续期");
    closeModal();
    render();
    return toast("续期成功", "保护期资源已恢复正常使用。");
  }
  if (action === "disableMachine") {
    const m = findMachine(id);
    m.status = "禁用保护期";
    m.loginStatus = "限制登录";
    m.note = "日终任务转禁用";
    addLog(id, "到期流转", "续期保护期", "禁用保护期", "8 天续期保护结束");
    render();
    return toast("已转禁用", "保留项目与账号关联，限制登录。");
  }
  if (action === "expireMachine") {
    const m = findMachine(id);
    const before = m.status;
    Object.assign(m, { status: "待检测", owner: "公共池", customer: "-", project: "-", account: "-", identity: "-", app: "-", loginStatus: "未绑定", customerExpiry: "-", note: "正式到期回收" });
    addLog(id, "到期处理", before, "待检测", "禁用保护期结束仍未续期");
    render();
    return toast("到期处理完成", "云机已停止服务并回收到公共池待检测。");
  }
  if (action === "runExpiryJob") {
    let changed = 0;
    machines.forEach((m) => {
      if (m.customerExpiry !== "-" && m.remaining < 0 && m.status === "项目使用中") {
        m.status = "续期保护期";
        m.note = "日终任务提醒";
        changed += 1;
      }
    });
    addLog("EXPIRY-JOB", "到期检查", "待检查", `流转 ${changed} 条`, "系统日终任务");
    render();
    return toast("到期检查完成", `本次流转 ${changed} 条资源，失败项会生成待处理提醒。`);
  }
  if (action === "checkOrder") {
    const o = orders.find((item) => item.id === id);
    const available = machines.filter((m) => m.status === "公共池可用" && m.type === o.type).length;
    o.status = available >= o.count ? "待分配确认" : "库存不足";
    o.suggestion = available >= o.count ? `库存充足，推荐分配 ${o.count} 台` : `缺口 ${o.count - available} 台，建议补采 ${o.type}`;
    addLog(id, "库存校验", "待校验", o.status, o.suggestion, available >= o.count ? "成功" : "阻断");
    render();
    return toast("库存校验完成", o.suggestion);
  }
  if (action === "confirmOrder") {
    const o = orders.find((item) => item.id === id);
    let allocated = 0;
    machines.filter((m) => m.status === "公共池可用" && m.type === o.type).slice(0, o.count).forEach((m) => {
      Object.assign(m, { status: "客户池空闲", owner: "客户云机池", customer: o.customer, customerExpiry: o.leaseEnd, remaining: 157, note: "订购分配" });
      allocated += 1;
    });
    o.status = allocated === o.count ? "已分配" : "库存不足";
    addLog(id, "库存分配", "待分配确认", o.status, `确认分配 ${allocated} 台`);
    render();
    return toast("分配处理完成", `已分配 ${allocated} 台云机。`);
  }
  if (action === "cancelOrder") {
    const o = orders.find((item) => item.id === id);
    o.status = "已取消";
    addLog(id, "取消订购", "有效", "已取消", "运营取消");
    render();
    return toast("订购已取消", "未改变公共池库存归属。");
  }
  if (action === "openWorkorder") {
    return openModal({
      title: `新建${target.dataset.kind}工单`,
      confirmAction: "confirmCreateWorkorder",
      body: modalForm([
        ["工单类型", target.dataset.kind],
        ["客户", "杭州星河科技"],
        ["旧云机", "CM-202607-014"],
        ["新云机", target.dataset.kind === "更换" ? "CM-202607-001" : "-"],
        ["原因", "客户申请处理", "textarea"],
      ]),
    });
  }
  if (action === "confirmCreateWorkorder") {
    const w = { id: `WO-202607-0${workorders.length + 73}`, type: "更换", customer: "杭州星河科技", oldMachine: "CM-202607-014", newMachine: "CM-202607-001", reason: "客户申请处理", status: "待审批", result: "待处理" };
    workorders.unshift(w);
    addLog(w.id, "新建工单", "无", "待审批", w.reason);
    closeModal();
    render();
    return toast("工单已创建", "更换/退回工单已进入待审批。");
  }
  if (action === "approveWorkorder") {
    const w = workorders.find((item) => item.id === id);
    w.status = "待处理";
    addLog(id, "工单审批", "待审批", "待处理", "审批通过");
    render();
    return toast("审批通过", "工单已进入处理环节。");
  }
  if (action === "finishWorkorder") {
    const w = workorders.find((item) => item.id === id);
    w.status = "已完成";
    w.result = w.type === "更换" ? "旧机待检测，新机已分配" : "旧机已退回待检测";
    addLog(id, w.type, "待处理", "已完成", w.reason);
    render();
    return toast("工单完成", w.result);
  }
  if (action === "unbindMachine") {
    const m = findMachine(id);
    const before = m.account;
    Object.assign(m, { account: "-", identity: "-", app: "-", loginStatus: "未绑定" });
    addLog(id, "解绑", before, "未绑定", "运营填写解绑原因");
    render();
    return toast("解绑成功", "账号关系已解除，原因已写入日志。");
  }
  if (action === "toggleConfig") {
    const c = configs.find((item) => item.vendor === target.dataset.vendor);
    c.enabled = !c.enabled;
    addLog(c.vendor, "配置启停", c.enabled ? "停用" : "启用", c.enabled ? "启用" : "停用", "配置中心操作");
    render();
    return toast("配置已更新", `${c.vendor} 已${c.enabled ? "启用" : "停用"}。`);
  }
  if (action === "editConfig" || action === "addConfig" || action === "resetRatio" || action === "batchDetect") {
    addLog("CONFIG", "配置维护", "旧配置", "新配置", "原型模拟配置操作");
    render();
    return toast("操作完成", "配置变更已保存，并只影响后续分配推荐。");
  }
});

document.addEventListener("change", (event) => {
  if (event.target.dataset.action === "roleChange") {
    state.role = event.target.value;
    render();
    toast("角色已切换", `当前角色：${state.role}。无操作权限的按钮会置灰或隐藏。`);
  }
});

render();
