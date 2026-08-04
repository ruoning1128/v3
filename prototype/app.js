const PAGES = [
  { id: "lifecycleRecords", label: "云机流转查询" },
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
  page: "lifecycleRecords",
  role: "运营管理员",
  toastId: 1,
  modal: null,
  filters: {},
  expiryStage: "全部",
  lifecycleAction: "全部",
  lifecycleExportMode: false,
  datePickerOpen: false,
  datePickerSelecting: "start",
  datePickerStartBase: "2026-08-01",
  datePickerEndBase: "2026-09-01",
  selectedLifecycleIds: new Set(),
  logsCollapsed: false,
  batchMode: null,
  selectedMachineIds: new Set(),
  tablePage: {
    overview: 1,
    lifecycleRecords: 1,
    publicPool: 1,
    orders: 1,
    customerPool: 1,
  },
};

const TABLE_PAGE_SIZE = 20;

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
    creator: "刘偌宁",
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
    creator: "刘偌宁",
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
  logSeed("ORD-202607-102", "库存校验", "刘偌宁", "草稿", "库存不足", "可用云 PAD 不足", "阻断"),
];

const lifecycleFields = [
  "变更时间",
  "操作来源",
  "操作人",
  "客户ID",
  "客户名称",
  "托管状态",
  "托管状态描述",
  "托管企微账号",
  "企微姓名",
  "资源编号",
  "设备ID",
  "设备来源",
  "设备分类",
  "自动化服务商",
  "替换后资源编号",
  "替换后设备ID",
  "替换后设备分类",
  "替换后自动化服务商",
  "项目ID",
  "项目名称",
  "云机订购时间",
  "客户订单号",
  "T客户订购到期时间",
  "T+8续费保护截止日",
  "T+11禁用保护截止日",
];

const lifecycleFieldLabels = {
  T客户订购到期时间: "客户订购到期时间",
  "T+8续费保护截止日": "续费保护截止日",
  "T+11禁用保护截止日": "禁用保护截止日",
};

const lifecycleMatrix = [
  {
    action: "运营采购",
    source: "运管端",
    note: "采购入库时沉淀资源基础字段和云机可用周期。",
    required: ["资源编号", "设备ID", "操作人", "变更时间", "操作来源", "设备来源", "设备分类", "自动化服务商", "云机订购时间"],
  },
  {
    action: "客户分配",
    source: "面客端/运管端",
    note: "客户分配后需要记录客户、项目、到期保护日期。",
    required: ["资源编号", "设备ID", "操作人", "客户ID", "客户名称", "托管状态", "托管状态描述", "托管企微账号", "企微姓名", "变更时间", "操作来源", "设备来源", "设备分类", "自动化服务商", "项目ID", "项目名称", "T客户订购到期时间", "T+8续费保护截止日", "T+11禁用保护截止日"],
  },
  {
    action: "客户回收",
    source: "面客端/运管端",
    note: "客户侧回收解除项目归属，更新后项目信息展示为空。",
    required: ["资源编号", "设备ID", "操作人", "客户ID", "客户名称", "托管状态", "托管状态描述", "托管企微账号", "企微姓名", "变更时间", "操作来源", "设备来源", "设备分类", "自动化服务商", "项目ID", "项目名称", "T客户订购到期时间", "T+8续费保护截止日", "T+11禁用保护截止日"],
  },
  {
    action: "客户订购",
    source: "面客端",
    note: "订购记录关注订单号、客户订购到期日和后续保护节点。",
    required: ["资源编号", "设备ID", "操作人", "客户ID", "客户名称", "托管状态", "托管状态描述", "托管企微账号", "企微姓名", "变更时间", "操作来源", "设备来源", "设备分类", "自动化服务商", "T客户订购到期时间", "T+8续费保护截止日", "T+11禁用保护截止日", "客户订单号"],
  },
  {
    action: "运管替换",
    source: "运管端",
    note: "替换需保留旧机和新机信息，方便追溯旧机与新机。",
    required: ["资源编号", "设备ID", "操作人", "客户ID", "客户名称", "托管状态", "托管状态描述", "托管企微账号", "企微姓名", "变更时间", "操作来源", "设备来源", "设备分类", "自动化服务商", "替换后资源编号", "替换后设备ID", "替换后设备分类", "替换后自动化服务商", "T客户订购到期时间", "T+8续费保护截止日", "T+11禁用保护截止日"],
  },
  {
    action: "运管回收",
    source: "运管端",
    note: "运管回收保留客户归属、保护期日期和回收时的资源信息。",
    required: ["资源编号", "设备ID", "操作人", "客户ID", "客户名称", "托管状态", "托管状态描述", "托管企微账号", "企微姓名", "变更时间", "操作来源", "设备来源", "设备分类", "自动化服务商", "项目ID", "项目名称", "T客户订购到期时间", "T+8续费保护截止日", "T+11禁用保护截止日"],
  },
  {
    action: "到期回收",
    source: "系统",
    note: "禁用保护截止日后一天由系统自动回收。",
    required: ["资源编号", "设备ID", "操作人", "客户ID", "客户名称", "托管状态", "托管状态描述", "托管企微账号", "企微姓名", "变更时间", "操作来源", "设备来源", "设备分类", "自动化服务商", "项目ID", "项目名称", "T客户订购到期时间", "T+8续费保护截止日", "T+11禁用保护截止日"],
  },
  {
    action: "运营退定",
    source: "运管端",
    note: "运营侧主动退定客户云机，保留基础操作、托管状态和资源信息。",
    required: ["变更时间", "操作来源", "操作人", "托管状态", "托管状态描述", "托管企微账号", "企微姓名", "资源编号", "设备ID", "设备来源", "设备分类", "自动化服务商"],
  },
];

const lifecycleRecords = [
  {
    id: "TR-202607-001",
    action: "运营采购",
    stage: "入库完成",
    fields: {
      资源编号: "RS-BAIDU-00081",
      设备ID: "CM-202607-001",
      操作人: "刘偌宁",
      变更时间: "2026-07-27 10:20",
      操作来源: "运管端",
      设备来源: "百度云",
      设备分类: "云手机",
      自动化服务商: "微联",
      云机订购时间: "2026-07-27",
    },
  },
  {
    id: "TR-202607-002",
    action: "客户订购",
    stage: "待分配确认",
    fields: {
      资源编号: "RS-YJY-00925",
      设备ID: "CM-202607-015",
      操作人: "wanghainan3",
      客户名称: "上海明川贸易",
      变更时间: "2026-07-27 11:36",
      操作来源: "面客端",
      设备来源: "京东云",
      设备分类: "PAD",
      自动化服务商: "有机云",
      T客户订购到期时间: "2026-08-08",
      "T+8续费保护截止日": "2026-08-16",
      "T+11禁用保护截止日": "2026-08-19",
      客户订单号: "870583189163237376",
    },
  },
  {
    id: "TR-202607-003",
    action: "客户分配",
    stage: "项目使用中",
    fields: {
      资源编号: "RS-WL-01014",
      设备ID: "CM-202607-014",
      操作人: "赵晴",
      客户名称: "杭州星河科技",
      变更时间: "2026-07-27 14:20",
      操作来源: "运管端",
      设备来源: "客户",
      设备分类: "云手机",
      自动化服务商: "微联",
      项目名称: "品类项目演示0710授权",
      T客户订购到期时间: "2026-09-30",
      "T+8续费保护截止日": "2026-10-08",
      "T+11禁用保护截止日": "2026-10-11",
    },
  },
  {
    id: "TR-202607-004",
    action: "客户回收",
    stage: "客户池空闲",
    fields: {
      资源编号: "RS-WL-01016",
      设备ID: "CM-202607-016",
      操作人: "王茜",
      客户名称: "成都青桥教育",
      变更时间: "2026-07-27 15:42",
      操作来源: "面客端",
      设备来源: "蜂助手",
      设备分类: "云手机",
      自动化服务商: "微联",
      T客户订购到期时间: "2026-07-23",
      "T+8续费保护截止日": "2026-07-31",
      "T+11禁用保护截止日": "2026-08-03",
    },
  },
  {
    id: "TR-202607-005",
    action: "运管替换",
    stage: "旧机待检测",
    fields: {
      资源编号: "RS-QK-00217",
      设备ID: "CM-202607-017",
      操作人: "gongziqian1",
      客户名称: "广州嘉禾餐饮",
      变更时间: "2026-07-27 16:08",
      操作来源: "运管端",
      设备来源: "群控厂商",
      设备分类: "PAD",
      自动化服务商: "有机云",
      T客户订购到期时间: "2026-07-15",
      "T+8续费保护截止日": "2026-07-23",
      "T+11禁用保护截止日": "2026-07-26",
    },
  },
  {
    id: "TR-202607-006",
    action: "运管回收",
    stage: "公共池待检测",
    fields: {
      资源编号: "RS-JDY-00631",
      设备ID: "CM-202607-018",
      操作人: "zhaoliquan",
      客户名称: "深圳云启互动",
      变更时间: "2026-07-27 17:19",
      操作来源: "运管端",
      设备来源: "京东云",
      设备分类: "云手机",
      自动化服务商: "微联",
      T客户订购到期时间: "2026-12-31",
      "T+8续费保护截止日": "2027-01-08",
      "T+11禁用保护截止日": "2027-01-11",
    },
  },
  {
    id: "TR-202607-031",
    action: "到期回收",
    stage: "到期回收完成",
    fields: {
      资源编号: "RS-WL-01060",
      设备ID: "CM-202607-043",
      操作人: "系统",
      客户名称: "宿迁达润信息科技有限公司",
      变更时间: "2026-08-04 09:30",
      操作来源: "系统",
      设备来源: "客户",
      设备分类: "云手机",
      自动化服务商: "微联",
      T客户订购到期时间: "2026-07-23",
      "T+8续费保护截止日": "2026-07-31",
      "T+11禁用保护截止日": "2026-08-03",
    },
  },
  {
    id: "TR-202607-032",
    action: "运营退定",
    stage: "运营退定完成",
    fields: {
      资源编号: "RS-WL-01061",
      设备ID: "CM-202607-044",
      操作人: "zhouyukang.7",
      变更时间: "2026-08-02 14:50",
      操作来源: "运管端",
      设备来源: "客户",
      设备分类: "云手机",
      自动化服务商: "微联",
    },
  },
];

const moreLifecycleRecords = [
  ["TR-202607-007", "运营采购", "入库完成", "RS-HBS-00082", "CM-202607-019", "liuruoning", "北京东世纪贸易", "2026-07-28 09:12", "运管端", "蜂助手", "自持", "云手机", "微联", "2026-07-28", "2027-07-27", "", "", "", "2027-07-27", "2027-08-04", "2027-08-07", "", ""],
  ["TR-202607-008", "客户分配", "项目使用中", "RS-JDY-00632", "CM-202607-020", "zhaoliquan", "北京东世纪贸易", "2026-07-28 10:05", "运管端", "京东云", "客户", "PAD", "有机云", "2026-07-28", "2026-10-31", "P-BJ-202607", "演示测试项目-品类2607", "是", "2026-10-31", "2026-11-08", "2026-11-11", "", ""],
  ["TR-202607-009", "客户回收", "客户池空闲", "RS-WL-01020", "CM-202607-021", "wanghainan3", "宿迁达润信息科技有限公司", "2026-07-28 10:42", "面客端", "客户", "客户", "云手机", "微联", "2026-06-01", "2026-09-01", "", "", "否", "2026-09-01", "2026-09-09", "2026-09-12", "", ""],
  ["TR-202607-010", "客户订购", "待分配确认", "RS-YJY-00931", "CM-202607-022", "yanghainan3", "上海呆呆食品有限公司", "2026-07-28 11:18", "面客端", "京东云", "客户", "PAD", "有机云", "2026-07-28", "2026-12-31", "", "", "", "2026-12-31", "2027-01-08", "2027-01-11", "869524648075747328", ""],
  ["TR-202607-011", "运管替换", "旧机待检测", "RS-QK-00224", "CM-202607-023", "xiongtiantia", "深圳京东健康有限公司", "2026-07-28 12:09", "运管端", "群控厂商", "客户", "云手机", "微联", "2026-05-02", "2026-11-30", "", "", "是", "2026-11-30", "2026-12-08", "2026-12-11", "", "客户反馈设备卡顿，替换新机"],
  ["TR-202607-012", "运管回收", "公共池待检测", "RS-JDY-00640", "CM-202607-024", "gongziqian1", "深圳京东健康有限公司", "2026-07-28 13:24", "运管端", "京东云", "客户", "PAD", "有机云", "2026-04-12", "2026-09-15", "", "", "否", "2026-09-15", "2026-09-23", "2026-09-26", "", "项目结束后统一回收"],
  ["TR-202607-013", "运营采购", "入库完成", "RS-BAIDU-00088", "CM-202607-025", "zhaoliquan", "无字号131", "2026-07-28 14:03", "运管端", "百度云", "自持", "PAD", "有机云", "2026-07-28", "2027-06-30", "", "", "", "2027-06-30", "2027-07-08", "2027-07-11", "", ""],
  ["TR-202607-014", "客户分配", "项目使用中", "RS-WL-01026", "CM-202607-026", "gongziqian1", "京东橡胶有限公司", "2026-07-28 14:47", "运管端", "蜂助手", "客户", "云手机", "微联", "2026-07-01", "2026-10-15", "P-XJ-202607", "私域承接二期", "是", "2026-10-15", "2026-10-23", "2026-10-26", "", ""],
  ["TR-202607-015", "客户回收", "客户池空闲", "RS-WL-01027", "CM-202607-027", "tianyan", "天津星海贸易", "2026-07-28 15:19", "面客端", "客户", "客户", "云手机", "微联", "2026-05-20", "2026-08-20", "", "", "否", "2026-08-20", "2026-08-28", "2026-08-31", "", ""],
  ["TR-202607-016", "客户订购", "待库存校验", "RS-YJY-00942", "CM-202607-028", "liuruoning", "成都青桥教育", "2026-07-28 15:50", "面客端", "京东云", "客户", "PAD", "有机云", "2026-07-28", "2026-11-30", "", "", "", "2026-11-30", "2026-12-08", "2026-12-11", "869463905074700288", ""],
  ["TR-202607-017", "运管替换", "旧机待检测", "RS-HBS-00102", "CM-202607-029", "zhaoliquan", "广州嘉禾餐饮", "2026-07-28 16:17", "运管端", "蜂助手", "客户", "云手机", "微联", "2026-06-15", "2026-09-30", "", "", "是", "2026-09-30", "2026-10-08", "2026-10-11", "", "旧机摄像头异常"],
  ["TR-202607-018", "运管回收", "公共池待检测", "RS-QK-00245", "CM-202607-030", "wanghainan3", "上海明川贸易", "2026-07-28 16:44", "运管端", "群控厂商", "客户", "PAD", "有机云", "2026-05-09", "2026-08-08", "", "", "否", "2026-08-08", "2026-08-16", "2026-08-19", "", "客户确认不再使用"],
  ["TR-202607-019", "运营采购", "入库完成", "RS-JDY-00652", "CM-202607-031", "gongziqian1", "深圳云启互动", "2026-07-29 09:31", "运管端", "京东云", "自持", "云手机", "微联", "2026-07-29", "2027-07-28", "", "", "", "2027-07-28", "2027-08-05", "2027-08-08", "", ""],
  ["TR-202607-020", "客户分配", "项目使用中", "RS-HBS-00111", "CM-202607-032", "xiongtiantia", "广西京东晴川电子商务有限公司", "2026-07-29 10:06", "运管端", "蜂助手", "客户", "云手机", "微联", "2026-07-10", "2026-12-29", "P-HN-202607", "测试账号迁移更换项目", "是", "2026-12-29", "2027-01-06", "2027-01-09", "", ""],
  ["TR-202607-021", "客户回收", "客户池空闲", "RS-JDY-00658", "CM-202607-033", "zhaoliquan", "无字号131", "2026-07-29 10:33", "面客端", "京东云", "客户", "PAD", "有机云", "2026-04-20", "2026-07-31", "", "", "否", "2026-07-31", "2026-08-08", "2026-08-11", "", ""],
  ["TR-202607-022", "客户订购", "待分配确认", "RS-WL-01039", "CM-202607-034", "wanghainan3", "西安港实业有限公司", "2026-07-29 11:22", "面客端", "客户", "客户", "云手机", "微联", "2026-07-29", "2026-10-31", "", "", "", "2026-10-31", "2026-11-08", "2026-11-11", "869459034502094849", ""],
  ["TR-202607-023", "运管替换", "旧机待检测", "RS-WL-01042", "CM-202607-035", "gongziqian1", "宜春测试企业服务有限公司", "2026-07-29 13:12", "运管端", "客户", "客户", "云手机", "微联", "2026-06-01", "2026-09-01", "", "", "是", "2026-09-01", "2026-09-09", "2026-09-12", "", "登录环境异常，换机处理"],
  ["TR-202607-024", "运管回收", "公共池待检测", "RS-BAIDU-00103", "CM-202607-036", "liuruoning", "北京东世纪贸易", "2026-07-29 13:55", "运管端", "百度云", "客户", "PAD", "有态度", "2026-03-01", "2026-09-30", "", "", "否", "2026-09-30", "2026-10-08", "2026-10-11", "", "客户合同终止"],
  ["TR-202607-025", "运营采购", "入库完成", "RS-YJY-00960", "CM-202607-037", "xiongtiantia", "天津星海贸易", "2026-07-29 14:40", "运管端", "京东云", "自持", "PAD", "有机云", "2026-07-29", "2027-06-29", "", "", "", "2027-06-29", "2027-07-07", "2027-07-10", "", ""],
  ["TR-202607-026", "客户分配", "项目使用中", "RS-QK-00261", "CM-202607-038", "zhaoliquan", "广州嘉禾餐饮", "2026-07-29 15:08", "运管端", "群控厂商", "客户", "PAD", "有机云", "2026-07-01", "2026-10-01", "P-GZ-202607", "门店会员召回", "是", "2026-10-01", "2026-10-09", "2026-10-12", "", ""],
  ["TR-202607-027", "客户回收", "客户池空闲", "RS-HBS-00122", "CM-202607-039", "wanghainan3", "深圳云启互动", "2026-07-29 16:11", "面客端", "蜂助手", "客户", "云手机", "微联", "2026-05-01", "2026-12-31", "", "", "否", "2026-12-31", "2027-01-08", "2027-01-11", "", ""],
  ["TR-202607-028", "客户订购", "库存不足", "RS-BAIDU-00108", "CM-202607-040", "gongziqian1", "深圳京东健康有限公司", "2026-07-29 16:44", "面客端", "百度云", "客户", "云手机", "微联", "2026-07-29", "2026-12-25", "", "", "", "2026-12-25", "2027-01-02", "2027-01-05", "862890528797122560", ""],
  ["TR-202607-029", "运管替换", "旧机待检测", "RS-JDY-00680", "CM-202607-041", "xiongtiantia", "成都青桥教育", "2026-07-29 17:02", "运管端", "京东云", "客户", "云手机", "有态度", "2026-04-18", "2026-09-18", "", "", "是", "2026-09-18", "2026-09-26", "2026-09-29", "", "设备维护失败后替换"],
  ["TR-202607-030", "运管回收", "公共池待检测", "RS-WL-01055", "CM-202607-042", "liuruoning", "京东橡胶有限公司", "2026-07-29 17:36", "运管端", "客户", "客户", "云手机", "微联", "2026-02-10", "2026-10-15", "", "", "否", "2026-10-15", "2026-10-23", "2026-10-26", "", "运营侧批量回收"],
];

lifecycleRecords.push(...moreLifecycleRecords.map(([id, action, stage, resourceNo, deviceId, operator, customerName, changeTime, source, deviceSource, deviceType, deviceCategory, provider, orderTime, expiryTime, projectCode, projectName, allocated, customerExpiry, renewProtect, disableProtect, orderNo, reason]) => ({
  id,
  action,
  stage,
  fields: Object.fromEntries(lifecycleFields.map((field) => [field, {
    资源编号: resourceNo,
    设备ID: deviceId,
    操作人: operator,
    客户名称: customerName,
    变更时间: changeTime,
    操作来源: source,
    设备来源: deviceSource,
    设备分类: deviceCategory,
    自动化服务商: provider,
    云机订购时间: orderTime,
    项目名称: projectName,
    T客户订购到期时间: customerExpiry,
    "T+8续费保护截止日": renewProtect,
    "T+11禁用保护截止日": disableProtect,
    客户订单号: orderNo,
  }[field]]).filter(([field, value]) => lifecycleRule(action).required.includes(field) && value)),
})));

lifecycleRecords.forEach(normalizeLifecycleRecord);

function normalizeLifecycleRecord(record, index) {
  const fields = record.fields;
  const project = lifecycleProjectSnapshot(record, index);
  const wecom = lifecycleWecomSnapshot(index);
  fields.资源编号 = lifecycleResourceNo(index);
  fields.设备ID = lifecycleDeviceId(index);
  fields.操作人 = lifecycleOperator(record, index);
  fields.客户ID = fields.客户名称 ? lifecycleCustomerId(fields.客户名称) : "";
  fields.托管状态 = record.action !== "运营采购" ? wecom.status : "";
  fields.托管状态描述 = record.action !== "运营采购" ? wecom.description : "";
  fields.托管企微账号 = record.action !== "运营采购" ? wecom.account : "";
  fields.企微姓名 = record.action !== "运营采购" ? wecom.name : "";
  fields.项目ID = project.id;
  fields.项目名称 = project.name;
  fields.替换后资源编号 = record.action === "运管替换" ? lifecycleResourceNo(index + 31) : "";
  fields.替换后设备ID = record.action === "运管替换" ? lifecycleDeviceId(index + 31) : "";
  fields.替换后设备分类 = record.action === "运管替换" ? alternateDeviceCategory(index) : "";
  fields.替换后自动化服务商 = record.action === "运管替换" ? alternateProvider(index) : "";
  if (fields.客户订单号) fields.客户订单号 = lifecycleOrderNo(index);
  if (record.action === "运营退定") {
    const allowedFields = new Set(lifecycleRule(record.action).required);
    lifecycleFields.forEach((field) => {
      if (!allowedFields.has(field)) fields[field] = "";
    });
  }
}

function lifecycleResourceNo(index) {
  return `YSJ${2026079699 - index}`;
}

function lifecycleDeviceId(index) {
  const batchNo = 10201022004 - Math.floor(index / 4) * 3;
  const suffix = String(3 - (index % 4)).padStart(2, "0");
  return `VHLC${batchNo}_${suffix}`;
}

function lifecycleOperator(record, index) {
  const accountOperators = [
    "liuruoning.1",
    "xiongtiantian1",
    "zhouyukang.7",
    "liqianyao",
    "fangyouxia1",
    "fangnan",
    "lizhuoheng.2002",
  ];
  const customerOperators = [
    "北京方博资元信息科技有限公司",
    "宿迁达润信息科技有限公司",
    "上海呆呆食品有限公司",
    "广西京东晴川电子商务有限公司",
    "西安港实业有限公司",
    "北京东世纪贸易",
    "上海明川贸易",
    "杭州星河科技",
    "成都青桥教育",
    "广州嘉禾餐饮",
    "深圳云启互动",
    "海南鑫汇成商贸有限公司",
    "深圳京东健康有限公司",
    "京东橡胶有限公司",
  ];

  if (record.action === "到期回收") return "自动回收";
  if (record.action.startsWith("客户")) {
    return record.fields.客户名称 || customerOperators[index % customerOperators.length];
  }
  return accountOperators[index % accountOperators.length];
}

function alternateDeviceCategory(index) {
  return index % 2 === 0 ? "云手机" : "PAD";
}

function alternateProvider(index) {
  return ["微联", "有机云", "有态度"][index % 3];
}

function lifecycleWecomSnapshot(index) {
  const snapshots = [
    ["在线", "上线", "18651068870", "赵寒"],
    ["离线", "账号于2026-08-02 14:50:56在机器VGZA10250052040_00下线，原因[01]：退登", "18360233279", "刘浩文"],
    ["在线", "上线", "GanLu", "甘露"],
    ["离线", "账号于2026-06-24 10:18:03在机器VHLC10201022001_02下线，原因[02]：设备异常", "ZuoShuaiKang", "左帅康"],
    ["在线", "上线", "DongZhengYu", "董政昱"],
    ["在线", "上线", "15152422455", "张亚运"],
    ["离线", "账号于2026-07-28 18:12:44在机器VHLC10201021992_01下线，原因[03]：网络断开", "WeiDianYun通知助手", "微电云通知助手"],
  ];
  const [status, description, account, name] = snapshots[index % snapshots.length];
  return { status, description, account, name };
}

function lifecycleOrderNo(index) {
  const orderNos = [
    "870583189163237376",
    "869563830781370369",
    "869557579146092544",
    "869524648075747328",
    "869478872154923008",
    "869463905074700288",
    "869459034502094849",
    "869406711889289218",
    "862890528797122560",
    "862890331534811137",
  ];
  return orderNos[index % orderNos.length];
}

function lifecycleCustomerId(customerName) {
  const customerIds = {
    上海明川贸易: "B12420474",
    杭州星河科技: "B51960910",
    成都青桥教育: "B86224909",
    广州嘉禾餐饮: "B73304429",
    深圳云启互动: "B90511569",
    北京东世纪贸易: "B89316083",
    宜春测试企业服务有限公司: "B68758875",
    海南鑫汇成商贸有限公司: "B72536554",
    深圳京东健康有限公司: "B96758867",
    无字号131: "B11184339",
    京东橡胶有限公司: "B31875429",
    天津星海贸易: "B54890631",
    宿迁达润信息科技有限公司: "B77204618",
    上海呆呆食品有限公司: "B60495127",
    广西京东晴川电子商务有限公司: "B83720461",
    西安港实业有限公司: "B45901836",
  };
  return customerIds[customerName] || "B20487566";
}

function lifecycleProjectSnapshot(record, index) {
  const fields = record.fields;
  if (record.action !== "客户分配" && record.action !== "客户回收" && record.action !== "运管回收" && record.action !== "到期回收") {
    return { id: "", name: "" };
  }

  const projectSeeds = [
    ["P00019846", "演示测试项目-品类2607", "P00020412", "品类项目演示0710授权"],
    ["P00020537", "测试创建项目", "P00021786", "测试账号迁移更换项目"],
    ["P00021904", "品牌测试项目", "P00023170", "品牌测试香米"],
    ["P00023758", "三星手机演示项目", "P00024893", "方大的项目-测试sku标签授权"],
    ["P00025341", "演示测试项目-品牌管理", "P00026058", "品类项目演示0710客户验证"],
  ];
  const seed = projectSeeds[index % projectSeeds.length];
  const isRecycleAction = ["客户回收", "运管回收", "到期回收"].includes(record.action);
  return {
    id: isRecycleAction ? seed[0] : seed[2],
    name: isRecycleAction ? seed[1] : seed[3],
  };
}

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
          <div class="breadcrumb">企微管理&nbsp;&nbsp;/&nbsp;&nbsp;<b>${pageLabel(state.page)}</b></div>
          <section class="panel">
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
  const wecomItems = ["手机分配路由", "手机资源", "账号授权", "企微账号", "获客链接", "加粉任务", "云机流转查询"];
  return `
    <aside class="sidebar">
      ${NAV.map((label, index) => `
        <button class="menu-item ${label === "企微管理" ? "active" : ""}" data-action="${label === "企微管理" ? "navToast" : "navToast"}" data-label="${label}">
          ${icon(icons[index])}<span class="menu-label">${label}</span><span class="chevron"></span>
        </button>
        ${label === "企微管理" ? `
          <div class="submenu wecom-submenu">
            ${wecomItems.map((item) => item === "云机流转查询"
              ? `<button class="submenu-item active" data-action="switchPage" data-page="lifecycleRecords">${item}</button>`
              : `<button class="submenu-item" data-action="navToast" data-label="${item}">${item}</button>`
            ).join("")}
          </div>
        ` : ""}
      `).join("")}
    </aside>
  `;
}

function renderTabs() {
  return "";
}

function renderPage() {
  return renderLifecycleRecords();
}

function renderOverview() {
  const metrics = getMetrics();
  return `
    ${renderTitle("数据明细", "数据更新时间：2026-07-27 14:56")}
    <div class="overview-filters">
      ${renderFilters([
        ["vendor", "合作方", "请选择合作方", ["", "微联", "有机云"]],
        ["type", "设备类型", "请选择设备类型", ["", "云手机", "云 PAD"]],
        ["status", "状态", "请选择状态", ["", ...statusList()]],
        ["customer", "客户名称", "请输入客户名称"],
        ["project", "项目名称", "请输入项目名称"],
        ["expiry", "到期区间", "请选择到期区间", ["", "7 天内", "30 天内", "已到期"]],
      ])}
    </div>
    <div class="overview-control-row">
      <div class="overview-control-left">
        <button class="btn primary" data-action="exportAll">下载全部</button>
        <button class="btn" data-action="openImport">采购入库</button>
        <button class="btn" data-action="openOrder">新增订购</button>
      </div>
      <div class="overview-control-right">
        <span class="tag red">高风险操作需二次确认并填写原因</span>
        <button class="btn" data-action="resetFilters">重置</button>
        <button class="btn primary" data-action="search">搜索</button>
      </div>
    </div>
    <div class="summary-strip">
      <div class="summary-label">汇总结果</div>
      <div class="summary-item"><span>公共池可用</span><b class="summary-num">${metrics.available}</b></div>
      <div class="summary-item"><span>客户池空闲</span><b class="summary-num">${metrics.customerIdle}</b></div>
      <div class="summary-item"><span>项目使用中</span><b class="summary-num">${metrics.inProject}</b></div>
      <div class="summary-item warning"><span>保护期资源</span><b class="summary-num">${metrics.expiring}</b></div>
      <div class="summary-item danger"><span>待检测/维护</span><b class="summary-num">${metrics.risk}</b></div>
    </div>
    <div class="kpi-grid">
      ${[
        ["公共池可用", metrics.available, "点击进入公共云机池", "publicPool", "公共池可用"],
        ["客户池空闲", metrics.customerIdle, "可继续分配项目", "customerPool", "客户池空闲"],
        ["项目使用中", metrics.inProject, "客户项目占用资源", "customerPool", "项目使用中"],
        ["续期/禁用保护", metrics.expiring, "需运营跟进", "operations", ""],
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
    ${renderMachineTable(machines, "overview")}
  `;
}

function renderLifecycleRecords() {
  const actions = ["全部", ...lifecycleMatrix.map((item) => item.action)];
  const rows = getFilteredLifecycleRecords();
  const selectedCount = rows.filter((record) => state.selectedLifecycleIds.has(record.id)).length;

  return `
    <div class="section-title single-title"><h2>云机状态流转查询</h2></div>
    <div class="compact-filters lifecycle-filters">
      ${renderFilters([
        ["actionType", "操作类型", "请选择操作类型", actions],
        ["deviceId", "设备ID", "请输入设备ID"],
        ["customerId", "客户ID", "请输入客户ID"],
        ["customer", "客户名称", "请输入客户名称"],
        ["projectId", "项目ID", "请输入项目ID"],
        ["projectName", "项目名称", "请输入项目名称"],
        ["source", "操作来源", "请选择操作来源", ["", "面客端", "运管端", "系统"]],
        ["operator", "操作人", "请输入操作人"],
        ["dateRange", "日期", "", null, "dateRange"],
      ])}
    </div>
    <div class="compact-control-row">
      <div class="compact-control-left">
        <button class="btn primary" data-action="enterLifecycleExport">批量导出</button>
        ${state.lifecycleExportMode ? `<span class="selection-tip">已选择 ${selectedCount} 条</span>` : ""}
      </div>
      <div class="compact-control-right">
        ${state.lifecycleExportMode ? `
          <button class="btn" data-action="exitLifecycleExport">取消选择</button>
          <button class="btn primary" data-action="confirmLifecycleExport">确认导出</button>
        ` : ""}
        <button class="btn" data-action="resetFilters">重置</button>
        <button class="btn primary" data-action="search">搜索</button>
      </div>
    </div>
    ${renderLifecycleTable(rows)}
  `;
}

function getFilteredLifecycleRecords() {
  const filters = state.filters;
  return lifecycleRecords.filter((record) => {
    const fields = record.fields;
    if (state.lifecycleAction !== "全部" && record.action !== state.lifecycleAction) return false;
    if (filters.deviceId && !String(fields.设备ID || "").includes(filters.deviceId)) return false;
    if (filters.customerId && !String(fields.客户ID || "").includes(filters.customerId)) return false;
    if (filters.customer && !String(fields.客户名称 || "").includes(filters.customer)) return false;
    if (filters.projectId && !String(fields.项目ID || "").includes(filters.projectId)) return false;
    if (filters.projectName && !String(fields.项目名称 || "").includes(filters.projectName)) return false;
    if (filters.source && fields.操作来源 !== filters.source) return false;
    if (filters.operator && !String(fields.操作人 || "").includes(filters.operator)) return false;
    const date = String(fields.变更时间 || "").slice(0, 10);
    if (filters.from && date < filters.from) return false;
    if (filters.to && date > filters.to) return false;
    return true;
  });
}

function renderFieldRuleCard(item) {
  const optionalCount = lifecycleFields.length - item.required.length;
  return `
    <article class="field-rule-card">
      <div class="field-rule-head">
        <div>
          <h3>${item.action}</h3>
          <span>${item.source}</span>
        </div>
        <strong>${item.required.length}/${lifecycleFields.length}</strong>
      </div>
      <p>${item.note}</p>
      <div class="field-chips">
        ${item.required.map((field) => `<span class="field-chip required">${field}</span>`).join("")}
      </div>
      <div class="field-rule-foot">${optionalCount} 个字段按矩阵留空</div>
    </article>
  `;
}

function renderPublicPool() {
  const rows = machines.filter((m) => m.owner === "公共池");
  const selectedCount = rows.filter((m) => state.selectedMachineIds.has(m.id)).length;
  const modeName = state.batchMode === "detect" ? "批量检测" : "批量导出";
  return `
    ${renderTitle("公共云机池列表", "仅“公共池可用”可进入客户分配候选")}
    <div class="compact-filters">
      ${renderFilters([
        ["machineId", "云机ID", "请输入云机ID"],
        ["type", "设备类型", "请选择设备类型", ["", "云手机", "云 PAD"]],
        ["vendor", "合作方", "请选择合作方", ["", "微联", "有机云"]],
        ["status", "资源状态", "请选择资源状态", ["", "公共池可用", "待检测", "待维护", "暂停使用"]],
        ["supplierExpiry", "合作方到期", "请选择到期区间", ["", "90 天内", "180 天内", "一年内"]],
        ["source", "入库来源", "请输入采购单/批次"],
      ])}
    </div>
    <div class="compact-control-row">
      <div class="compact-control-left">
        <button class="btn primary" data-action="openImport">导入入库</button>
        <button class="btn ${state.batchMode === "export" ? "primary" : ""}" data-action="enterBatchMode" data-mode="export">批量导出</button>
        <button class="btn ${state.batchMode === "detect" ? "primary" : ""}" data-action="enterBatchMode" data-mode="detect">批量检测</button>
      </div>
      <div class="compact-control-right">
        <span class="tag gray">非可用状态的分配按钮会置灰</span>
        <button class="btn" data-action="resetFilters">重置</button>
        <button class="btn primary" data-action="search">搜索</button>
      </div>
    </div>
    ${state.batchMode ? `
      <div class="batch-panel">
        <div>
          <b>${modeName}模式</b>
          <span>已选择 ${selectedCount} 台云机。先勾选多台云机，选中后可点任意选中行的“分配”或“检测”继续处理。</span>
        </div>
        <div class="batch-actions">
          <button class="btn" data-action="clearBatchSelection">清空选择</button>
          <button class="btn" data-action="exitBatchMode">取消</button>
          <button class="btn primary" data-action="${state.batchMode === "detect" ? "confirmBatchDetect" : "confirmBatchExport"}">${state.batchMode === "detect" ? "确认检测" : "确认导出"}</button>
        </div>
      </div>
    ` : ""}
    ${renderMachineTable(rows, "publicPool")}
  `;
}

function renderOrders() {
  return `
    ${renderTitle("客户订购列表", "库存校验通过后才能确认分配")}
    <div class="compact-filters">
      ${renderFilters([
        ["customer", "客户名称", "请输入客户名称"],
        ["orderStatus", "订购状态", "请选择状态", ["", "草稿", "待库存校验", "待分配确认", "库存不足", "已分配", "已取消"]],
        ["type", "设备类型", "请选择设备类型", ["", "云手机", "云 PAD"]],
        ["creator", "创建人", "请输入创建人"],
        ["leaseStart", "开始时间", "请选择开始时间", null, "date"],
        ["leaseEnd", "结束时间", "请选择结束时间", null, "date"],
      ])}
    </div>
    <div class="compact-control-row">
      <div class="compact-control-left">
        <button class="btn primary" data-action="openOrder">新增订购</button>
        <button class="btn" data-action="exportAll">导出订购</button>
      </div>
      <div class="compact-control-right">
        <button class="btn" data-action="resetFilters">重置</button>
        <button class="btn primary" data-action="search">搜索</button>
      </div>
    </div>
    ${renderOrdersTable()}
  `;
}

function renderCustomerPool() {
  const rows = machines.filter((m) => ["客户云机池", "客户项目", "客户名下"].includes(m.owner));
  return `
    ${renderTitle("客户云机池", "项目回收只回客户池；退回才进入公共池待检测")}
    <div class="compact-filters">
      ${renderFilters([
        ["customer", "客户ID/名称", "请输入客户ID或名称"],
        ["project", "项目名称", "请输入项目名称"],
        ["account", "企微账号", "请输入企微账号"],
        ["status", "保护期状态", "请选择状态", ["", "客户池空闲", "项目使用中", "续期保护期", "禁用保护期"]],
        ["expiry", "客户到期日", "请选择客户到期日", null, "date"],
        ["machineId", "云机ID", "请输入云机ID"],
      ])}
    </div>
    <div class="compact-control-row compact-control-row-end">
      <div class="compact-control-right">
        <button class="btn" data-action="resetFilters">重置</button>
        <button class="btn primary" data-action="search">搜索</button>
      </div>
    </div>
    ${renderMachineTable(rows, "customerPool")}
  `;
}

function renderBindings() {
  const rows = machines.filter((m) => m.account !== "-");
  return `
    ${renderTitle("绑定管理", "企微账号同一时间只能绑定一台云机")}
    <div class="compact-filters">
      ${renderFilters([
        ["account", "企微账号", "请输入企微账号"],
        ["identity", "操作人", "请输入操作人"],
        ["app", "应用", "请选择应用", ["", "企微助手", "群运营"]],
        ["loginStatus", "登录状态", "请选择登录状态", ["", "在线", "离线", "限制登录"]],
        ["machineId", "云机ID", "请输入云机ID"],
        ["customer", "客户名称", "请输入客户名称"],
      ])}
    </div>
    <div class="compact-control-row compact-control-row-end">
      <div class="compact-control-right">
        <button class="btn" data-action="resetFilters">重置</button>
        <button class="btn primary" data-action="search">搜索</button>
      </div>
    </div>
    ${renderBindingTable(rows)}
  `;
}

function renderOperationsCenter() {
  const phases = ["全部", "正常使用期", "续期保护期", "禁用保护期", "正式到期处理"];
  const expiryRows = machines.filter((m) => {
    if (state.expiryStage === "全部") return m.customerExpiry !== "-";
    if (state.expiryStage === "正常使用期") return m.customerExpiry !== "-" && m.remaining >= 0;
    if (state.expiryStage === "正式到期处理") return m.status === "已到期处理";
    return m.status === state.expiryStage;
  });
  return `
    ${renderTitle("运维中心", "更换/退回、续期到期和配置规则合并处理")}
    <div class="operations-summary">
      <div><b>${workorders.length}</b><span>待跟进工单</span></div>
      <div><b>${expiryRows.length}</b><span>当前到期筛选</span></div>
      <div><b>${configs.filter((c) => c.enabled).length}</b><span>启用合作方</span></div>
    </div>
    <section class="operation-section">
      <div class="operation-head">
        <div>
          <h3>更换/退回工单</h3>
          <p>更换展示旧机回收和新机分配两个步骤；退回只处理客户交还资源。</p>
        </div>
        <div class="toolbar-left">
          <button class="btn primary" data-action="openWorkorder" data-kind="更换">新建更换工单</button>
          <button class="btn" data-action="openWorkorder" data-kind="退回">新建退回工单</button>
        </div>
      </div>
      ${renderWorkorderTable()}
    </section>
    <section class="operation-section">
      <div class="operation-head">
        <div>
          <h3>续期到期中心</h3>
          <p>到期后 8 天续期保护，随后 3 天禁用保护，仍未续期再正式到期处理。</p>
        </div>
        <div class="toolbar-left">
          <button class="btn" data-action="runExpiryJob">执行日终到期检查</button>
          <button class="btn primary" data-action="exportAll">导出到期清单</button>
        </div>
      </div>
      <nav class="phase-tabs operation-tabs">
        ${phases.map((p) => `<button class="phase-tab ${state.expiryStage === p ? "active" : ""}" data-action="switchExpiry" data-stage="${p}">${p}</button>`).join("")}
      </nav>
      ${renderExpiryTable(expiryRows)}
    </section>
    <section class="operation-section">
      <div class="operation-head">
        <div>
          <h3>配置中心</h3>
          <p>维护合作方、分配比例、设备类型和提醒规则，配置变更只影响后续分配推荐。</p>
        </div>
        <div class="toolbar-left">
          <button class="btn primary" data-action="addConfig" ${!can("config") ? "disabled" : ""}>新增合作方</button>
          <button class="btn" data-action="resetRatio" ${!can("config") ? "disabled" : ""}>按库存均分</button>
        </div>
      </div>
      ${!can("config") ? renderPermissionBanner("当前角色仅可查看配置，不能编辑或启停合作方。") : ""}
      ${renderConfigTable()}
    </section>
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
      ${fields.map(([key, label, placeholder, options, type]) => {
        const value = key === "actionType" ? state.lifecycleAction : state.filters[key] || "";
        if (type === "dateRange") {
          return `
            <div class="filter-field date-range-field">
              <label>${label}</label>
              ${renderDateRangePicker()}
            </div>
          `;
        }
        return `
          <div class="filter-field">
            <label>${label}</label>
            ${options ? `<select class="select" data-filter="${key}">${options.map((v) => `<option value="${v}" ${v === value ? "selected" : ""}>${v || placeholder}</option>`).join("")}</select>` : `<input class="input" type="${type === "date" ? "date" : "text"}" data-filter="${key}" placeholder="${placeholder}" value="${value}" />`}
          </div>
        `;
      }).join("")}
    </div>
  `;
}

function renderDateRangePicker() {
  const from = state.filters.from || "";
  const to = state.filters.to || "";
  return `
    <div class="date-range-shell">
      <button class="date-range-trigger ${state.datePickerOpen ? "active" : ""}" data-action="toggleDateRange" type="button">
        <span class="${from ? "filled" : ""}">${from || "开始日期"}</span>
        <em>~</em>
        <span class="${to ? "filled" : ""}">${to || "结束日期"}</span>
        <i aria-hidden="true"></i>
      </button>
      ${state.datePickerOpen ? `
        <div class="date-picker-popover">
          <div class="date-picker-hint">请选择起止日期</div>
          <div class="date-picker-months">
            ${renderCalendarMonth(state.datePickerStartBase, "start")}
            ${renderCalendarMonth(state.datePickerEndBase, "end")}
          </div>
        </div>
      ` : ""}
    </div>
  `;
}

function renderCalendarMonth(monthDate, panel) {
  const base = parseDate(monthDate);
  const year = base.getFullYear();
  const month = base.getMonth();
  const first = new Date(year, month, 1);
  const start = addDays(first, -first.getDay());
  const days = Array.from({ length: 42 }, (_, index) => addDays(start, index));
  const labels = ["日", "一", "二", "三", "四", "五", "六"];
  const startControls = `
    <button data-action="shiftDateRangePanel" data-panel="start" data-unit="year" data-offset="-1" type="button">«</button>
    <button data-action="shiftDateRangePanel" data-panel="start" data-unit="month" data-offset="-1" type="button">‹</button>
  `;
  const endControls = `
    <button data-action="shiftDateRangePanel" data-panel="end" data-unit="month" data-offset="1" type="button">›</button>
    <button data-action="shiftDateRangePanel" data-panel="end" data-unit="year" data-offset="1" type="button">»</button>
  `;
  return `
    <div class="calendar-month">
      <div class="calendar-title ${panel}">
        <span class="calendar-controls">${panel === "start" ? startControls : ""}</span>
        <strong>${year} 年 ${month + 1} 月</strong>
        <span class="calendar-controls">${panel === "end" ? endControls : ""}</span>
      </div>
      <div class="calendar-week">${labels.map((label) => `<span>${label}</span>`).join("")}</div>
      <div class="calendar-grid">
        ${days.map((day) => {
          const date = formatDate(day);
          const outside = day.getMonth() !== month;
          const selected = date === state.filters.from || date === state.filters.to;
          const inRange = isDateInRange(date, state.filters.from, state.filters.to);
          return `<button class="${outside ? "outside" : ""} ${selected ? "selected" : ""} ${inRange ? "in-range" : ""}" data-action="pickDateRangeDate" data-date="${date}" type="button">${day.getDate()}</button>`;
        }).join("")}
      </div>
    </div>
  `;
}

function parseDate(value) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatDate(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function addMonths(date, months) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}

function isDateInRange(date, from, to) {
  return Boolean(from && to && date > from && date < to);
}

function pickDateRangeDate(date) {
  const from = state.filters.from;
  const to = state.filters.to;
  if (!from || to || state.datePickerSelecting === "start") {
    state.filters.from = date;
    state.filters.to = "";
    state.datePickerSelecting = "end";
    state.datePickerOpen = true;
  } else if (date < from) {
    state.filters.from = date;
    state.filters.to = from;
    state.datePickerSelecting = "start";
    state.datePickerOpen = false;
  } else {
    state.filters.to = date;
    state.datePickerSelecting = "start";
    state.datePickerOpen = false;
  }
  state.tablePage.lifecycleRecords = 1;
  state.selectedLifecycleIds.clear();
}

function renderMachineTable(rows, context) {
  if (!rows.length) return `<div class="empty">暂无符合条件的云机资源</div>`;
  const totalPages = Math.max(1, Math.ceil(rows.length / TABLE_PAGE_SIZE));
  const currentPage = Math.min(state.tablePage[context] || 1, totalPages);
  state.tablePage[context] = currentPage;
  const start = (currentPage - 1) * TABLE_PAGE_SIZE;
  const pageRows = rows.slice(start, start + TABLE_PAGE_SIZE);
  const selectable = context === "publicPool" && state.batchMode;
  const selectedRows = pageRows.filter((m) => state.selectedMachineIds.has(m.id));
  const allSelected = selectable && pageRows.length > 0 && selectedRows.length === pageRows.length;
  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            ${selectable ? `<th class="selection-cell"><input type="checkbox" data-action="toggleAllMachineSelection" data-context="${context}" ${allSelected ? "checked" : ""} /></th>` : ""}
            <th>云机 ID</th><th>设备类型</th><th>合作方</th><th>归属</th><th>状态</th><th>客户</th><th>项目</th><th>企微账号</th><th>客户到期日</th><th>剩余天数</th><th>操作</th>
          </tr>
        </thead>
        <tbody>
          ${pageRows.map((m) => `
            <tr class="${state.selectedMachineIds.has(m.id) ? "row-selected" : ""}">
              ${selectable ? `<td class="selection-cell"><input type="checkbox" data-action="toggleMachineSelection" data-id="${m.id}" ${state.selectedMachineIds.has(m.id) ? "checked" : ""} /></td>` : ""}
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
    ${renderPagination(context, rows.length, currentPage, totalPages)}
  `;
}

function renderLifecycleTable(rows) {
  if (!rows.length) return `<div class="empty">暂无符合条件的状态流转记录</div>`;
  const totalPages = Math.max(1, Math.ceil(rows.length / TABLE_PAGE_SIZE));
  const currentPage = Math.min(state.tablePage.lifecycleRecords || 1, totalPages);
  state.tablePage.lifecycleRecords = currentPage;
  const start = (currentPage - 1) * TABLE_PAGE_SIZE;
  const pageRows = rows.slice(start, start + TABLE_PAGE_SIZE);
  const selectable = state.lifecycleExportMode;
  const selectedRows = pageRows.filter((record) => state.selectedLifecycleIds.has(record.id));
  const allSelected = selectable && pageRows.length > 0 && selectedRows.length === pageRows.length;
  return `
    <div class="table-wrap lifecycle-table ${selectable ? "export-mode" : ""}">
      <table>
        <thead>
          <tr>
            ${selectable ? `<th class="sticky-col sticky-select selection-cell"><input type="checkbox" data-action="toggleAllLifecycleSelection" ${allSelected ? "checked" : ""} /></th>` : ""}
            <th class="sticky-col sticky-action">操作类型</th>
            ${lifecycleFields.map((field) => `<th>${fieldLabel(field)}</th>`).join("")}
          </tr>
        </thead>
        <tbody>
          ${pageRows.map((record) => {
            return `
              <tr class="${state.selectedLifecycleIds.has(record.id) ? "row-selected" : ""}">
                ${selectable ? `<td class="sticky-col sticky-select selection-cell"><input type="checkbox" data-action="toggleLifecycleSelection" data-id="${record.id}" ${state.selectedLifecycleIds.has(record.id) ? "checked" : ""} /></td>` : ""}
                <td class="sticky-col sticky-action">${actionTag(record.action)}</td>
                ${lifecycleFields.map((field) => `<td>${renderLifecycleCell(record, field)}</td>`).join("")}
              </tr>
            `;
          }).join("")}
        </tbody>
      </table>
    </div>
    ${renderPagination("lifecycleRecords", rows.length, currentPage, totalPages)}
  `;
}

function getCurrentLifecyclePageRows() {
  const rows = getFilteredLifecycleRecords();
  const totalPages = Math.max(1, Math.ceil(rows.length / TABLE_PAGE_SIZE));
  const currentPage = Math.min(state.tablePage.lifecycleRecords || 1, totalPages);
  const start = (currentPage - 1) * TABLE_PAGE_SIZE;
  return rows.slice(start, start + TABLE_PAGE_SIZE);
}

function fieldValue(record, field) {
  return record.fields[field] || "--";
}

function renderLifecycleCell(record, field) {
  const value = fieldValue(record, field);
  if (field === "托管状态" && value !== "--") return wecomStatusTag(value);
  const truncatable = ["操作人", "客户名称", "托管状态描述", "项目名称"].includes(field);
  if (field === "操作人" && isErpOperator(value)) return escapeHtml(value);
  if (!truncatable || value === "--" || value.length <= 10) return escapeHtml(value);
  return `<span class="truncated-cell" data-full-text="${escapeHtml(value)}">${escapeHtml(value.slice(0, 10))}...</span>`;
}

function wecomStatusTag(status) {
  const className = status === "在线" ? "online" : "offline";
  return `<span class="wecom-status ${className}">${escapeHtml(status)}</span>`;
}

function isErpOperator(value) {
  return /^[a-z][a-z0-9.]*$/i.test(value);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function fieldLabel(field) {
  return lifecycleFieldLabels[field] || field;
}

function actionTag(action) {
  return `<span class="action-tag ${actionClass(action)}">${action}</span>`;
}

function actionClass(action) {
  return ["到期回收", "运营退定"].includes(action) ? "expiry-recycle" : "support";
}

function lifecycleRule(action) {
  return lifecycleMatrix.find((item) => item.action === action) || lifecycleMatrix[0];
}

function lifecycleCompletion(record) {
  const required = lifecycleRule(record.action).required;
  const filled = required.filter((field) => Boolean(record.fields[field])).length;
  return {
    filled,
    total: required.length,
    percent: Math.round((filled / required.length) * 100),
  };
}

function renderPagination(context, total, currentPage, totalPages) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
  return `
    <div class="pagination-bar">
      <div class="pagination-info">
        共 <b>${total}</b> 条 · 每页 ${TABLE_PAGE_SIZE} 条
      </div>
      <div class="pagination-actions">
        <button class="page-btn" data-action="changeTablePage" data-context="${context}" data-page="${Math.max(1, currentPage - 1)}" ${currentPage === 1 ? "disabled" : ""}>上一页</button>
        <div class="page-numbers">
          ${pages.map((page) => `
            <button class="page-number ${page === currentPage ? "active" : ""}" data-action="changeTablePage" data-context="${context}" data-page="${page}">${page}</button>
          `).join("")}
        </div>
        <button class="page-btn" data-action="changeTablePage" data-context="${context}" data-page="${Math.min(totalPages, currentPage + 1)}" ${currentPage === totalPages ? "disabled" : ""}>下一页</button>
      </div>
    </div>
  `;
}

function getMachineRowsForContext(context) {
  if (context === "publicPool") return machines.filter((m) => m.owner === "公共池");
  if (context === "customerPool") return machines.filter((m) => ["客户云机池", "客户项目", "客户名下"].includes(m.owner));
  return machines;
}

function getCurrentMachinePageRows(context) {
  const rows = getMachineRowsForContext(context);
  const totalPages = Math.max(1, Math.ceil(rows.length / TABLE_PAGE_SIZE));
  const currentPage = Math.min(state.tablePage[context] || 1, totalPages);
  const start = (currentPage - 1) * TABLE_PAGE_SIZE;
  return rows.slice(start, start + TABLE_PAGE_SIZE);
}

function machineActions(m, context) {
  if (context === "publicPool") {
    const batchActive = Boolean(state.batchMode);
    const selected = state.selectedMachineIds.has(m.id);
    const batchGate = batchActive && !selected;
    return `
      <button class="btn ghost" data-action="allocateMachine" data-id="${m.id}" ${m.status !== "公共池可用" || !can("allocate") || batchGate ? "disabled" : ""}>分配</button>
      <button class="btn ghost" data-action="detectMachine" data-id="${m.id}" ${!["待检测", "待维护"].includes(m.status) || !can("detect") || batchGate ? "disabled" : ""}>检测</button>
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
  const totalPages = Math.max(1, Math.ceil(orders.length / TABLE_PAGE_SIZE));
  const currentPage = Math.min(state.tablePage.orders || 1, totalPages);
  state.tablePage.orders = currentPage;
  const start = (currentPage - 1) * TABLE_PAGE_SIZE;
  const pageRows = orders.slice(start, start + TABLE_PAGE_SIZE);
  return `
    <div class="table-wrap">
      <table>
        <thead><tr><th>订购单</th><th>客户</th><th>类型</th><th>数量</th><th>租期</th><th>状态</th><th>创建人</th><th>校验/建议</th><th>操作</th></tr></thead>
        <tbody>
          ${pageRows.map((o) => `
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
    ${renderPagination("orders", orders.length, currentPage, totalPages)}
  `;
}

function renderBindingTable(rows) {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr><th>云机 ID</th><th>客户</th><th>企微账号</th><th>操作人</th><th>应用</th><th>登录状态</th><th>项目</th><th>操作</th></tr></thead>
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
                <button class="btn ghost warning" data-action="finishWorkorder" data-id="${w.id}" ${w.status !== "待处理" || !can("return") ? "disabled" : ""}>完成处理</button>
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
    "入库完成": "green",
    "项目使用中": "blue",
    "公共池待检测": "gold",
    "旧机待检测": "gold",
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
    "已驳回": "red",
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
  return PAGES.find((p) => p.id === id)?.label || "企微管理";
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
    operator: state.role === "只读/审计" ? "审计用户" : "刘偌宁",
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

function modalValue(label, fallback = "") {
  const rows = [...document.querySelectorAll(".modal .form-row")];
  const row = rows.find((item) => item.querySelector("label")?.textContent.trim() === label);
  return row?.querySelector("input, textarea, select")?.value.trim() || fallback;
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
          ["企微账号/操作人", `${m.account} ${m.identity !== "-" ? `(${m.identity})` : ""}`],
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

function showLifecycleRecord(id) {
  const record = lifecycleRecords.find((item) => item.id === id);
  if (!record) return toast("记录不存在", "未找到对应状态流转记录。");
  const rule = lifecycleRule(record.action);
  const completion = lifecycleCompletion(record);
  openModal({
    id,
    title: `${record.id} 字段明细`,
    confirmAction: "closeModal",
    body: `
      <div class="detail-summary">
        <div><span>操作类型</span><b>${record.action}</b></div>
        <div><span>必填完整度</span><b>${completion.filled}/${completion.total}</b></div>
        <div><span>当前状态</span><b>${record.stage}</b></div>
      </div>
      <div class="field-detail-grid">
        ${lifecycleFields.map((field) => {
          const required = rule.required.includes(field);
          const value = fieldValue(record, field);
          return `
            <div class="field-detail ${required ? "required" : ""}">
              <label>${fieldLabel(field)}${required ? "<em>必填</em>" : "<em>留空</em>"}</label>
              <span>${value}</span>
            </div>
          `;
        }).join("")}
      </div>
    `,
  });
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("[data-action]");
  if (!target) {
    if (state.datePickerOpen && !event.target.closest(".date-range-field")) {
      state.datePickerOpen = false;
      render();
    }
    return;
  }
  const action = target.dataset.action;
  const id = target.dataset.id;

  if (action === "toggleDateRange") {
    state.datePickerOpen = !state.datePickerOpen;
    state.datePickerSelecting = state.filters.from && !state.filters.to ? "end" : "start";
    render();
    return;
  }
  if (action === "shiftDateRangePanel") {
    const key = target.dataset.panel === "end" ? "datePickerEndBase" : "datePickerStartBase";
    const offset = Number(target.dataset.offset) || 0;
    const unit = target.dataset.unit;
    const current = parseDate(state[key]);
    state[key] = formatDate(unit === "year" ? addMonths(current, offset * 12) : addMonths(current, offset));
    state.datePickerOpen = true;
    render();
    return;
  }
  if (action === "pickDateRangeDate") {
    pickDateRangeDate(target.dataset.date);
    render();
    return;
  }
  if (action === "switchPage") {
    state.page = target.dataset.page;
    if (state.page !== "publicPool") {
      state.batchMode = null;
      state.selectedMachineIds.clear();
    }
    render();
    return;
  }
  if (action === "switchExpiry") {
    state.expiryStage = target.dataset.stage;
    render();
    return;
  }
  if (action === "switchLifecycleAction") {
    state.lifecycleAction = target.dataset.stage;
    state.tablePage.lifecycleRecords = 1;
    render();
    return;
  }
  if (action === "showMachine") return showMachine(id);
  if (action === "showLifecycleRecord") return showLifecycleRecord(id);
  if (action === "metricJump") {
    state.page = target.dataset.page;
    state.filters.status = target.dataset.status;
    state.tablePage[state.page] = 1;
    render();
    toast("已跳转", "指标已带入对应列表筛选口径。");
    return;
  }
  if (action === "changeTablePage") {
    state.tablePage[target.dataset.context] = Number(target.dataset.page) || 1;
    render();
    return;
  }
  if (action === "closeModal") return closeModal();
  if (action === "search") {
    state.tablePage[state.page] = 1;
    state.selectedLifecycleIds.clear();
    render();
    return toast("查询完成", "列表已按当前筛选条件刷新。");
  }
  if (action === "resetFilters") {
    document.querySelectorAll("[data-filter]").forEach((el) => (el.value = ""));
    state.filters = {};
    if (state.page === "lifecycleRecords") state.lifecycleAction = "全部";
    state.lifecycleExportMode = false;
    state.datePickerOpen = false;
    state.datePickerSelecting = "start";
    state.selectedLifecycleIds.clear();
    state.tablePage[state.page] = 1;
    toast("已重置", "筛选条件已清空。");
    return;
  }
  if (action === "enterLifecycleExport") {
    state.lifecycleExportMode = true;
    state.selectedLifecycleIds.clear();
    render();
    return toast("请选择导出条目", "勾选需要导出的状态流转记录后点击确认导出。");
  }
  if (action === "exitLifecycleExport") {
    state.lifecycleExportMode = false;
    state.selectedLifecycleIds.clear();
    render();
    return toast("已取消选择", "状态流转列表已恢复普通浏览模式。");
  }
  if (action === "toggleLifecycleSelection") {
    if (target.checked) state.selectedLifecycleIds.add(id);
    else state.selectedLifecycleIds.delete(id);
    render();
    return;
  }
  if (action === "toggleAllLifecycleSelection") {
    const rows = getCurrentLifecyclePageRows();
    if (target.checked) rows.forEach((record) => state.selectedLifecycleIds.add(record.id));
    else rows.forEach((record) => state.selectedLifecycleIds.delete(record.id));
    render();
    return;
  }
  if (action === "confirmLifecycleExport") {
    const count = state.selectedLifecycleIds.size;
    if (!count) return toast("请选择记录", "至少选择一条状态流转记录后再确认导出。");
    addLog("LIFECYCLE_EXPORT", "批量导出", "-", `${count} 条状态流转记录`, "状态流转勾选导出");
    state.lifecycleExportMode = false;
    state.selectedLifecycleIds.clear();
    render();
    return toast("批量导出已生成", `已为 ${count} 条状态流转记录生成导出任务。`);
  }
  if (action === "enterBatchMode") {
    state.batchMode = target.dataset.mode;
    state.selectedMachineIds.clear();
    state.tablePage.publicPool = 1;
    render();
    return;
  }
  if (action === "exitBatchMode") {
    state.batchMode = null;
    state.selectedMachineIds.clear();
    render();
    return toast("已退出批量模式", "公共云机池已恢复普通列表操作。");
  }
  if (action === "clearBatchSelection") {
    state.selectedMachineIds.clear();
    render();
    return toast("已清空选择", "可以重新勾选需要处理的云机。");
  }
  if (action === "toggleMachineSelection") {
    if (target.checked) state.selectedMachineIds.add(id);
    else state.selectedMachineIds.delete(id);
    render();
    return;
  }
  if (action === "toggleAllMachineSelection") {
    const rows = getCurrentMachinePageRows(target.dataset.context);
    if (target.checked) rows.forEach((m) => state.selectedMachineIds.add(m.id));
    else rows.forEach((m) => state.selectedMachineIds.delete(m.id));
    render();
    return;
  }
  if (action === "confirmBatchExport") {
    const count = state.selectedMachineIds.size;
    if (!count) return toast("请选择云机", "至少选择一台云机后再确认导出。");
    addLog("PUBLIC_POOL_EXPORT", "批量导出", "-", `${count} 台云机`, "公共池勾选导出");
    state.batchMode = null;
    state.selectedMachineIds.clear();
    render();
    return toast("批量导出已生成", `已为 ${count} 台云机生成导出任务，并写入导出审计。`);
  }
  if (action === "confirmBatchDetect") {
    const selected = [...state.selectedMachineIds].map(findMachine).filter(Boolean);
    if (!selected.length) return toast("请选择云机", "至少选择一台云机后再确认检测。");
    let processed = 0;
    selected.forEach((m) => {
      if (["待检测", "待维护"].includes(m.status)) {
        m.status = "公共池可用";
        m.note = "批量检测通过";
        processed += 1;
      }
    });
    addLog("PUBLIC_POOL_DETECT", "批量检测", `${selected.length} 台待处理`, `${processed} 台检测通过`, "公共池勾选检测");
    state.batchMode = null;
    state.selectedMachineIds.clear();
    render();
    return toast("批量检测完成", `已选择 ${selected.length} 台，其中 ${processed} 台待检测/维护资源变为公共池可用。`);
  }
  if (action === "navToast") return toast("导航提示", `${target.dataset.label} 为现有运管端菜单，本原型聚焦企微管理状态流转。`);
  if (action === "permissionApply") return toast("权限申请", "已模拟提交云机管理操作权限申请。");
  if (action === "copyFieldSchema") return toast("字段口径已复制", "已模拟复制当前动作的必填字段清单，可粘贴到 PRD 或评审记录。");
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
      creator: "刘偌宁",
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
        ["操作人", "赵晴"],
        ["应用", "企微助手"],
        ["登录状态", "在线"],
        ["原因", "项目启动前账号绑定", "textarea"],
      ]),
    });
  }
  if (action === "confirmBind") {
    const m = findMachine(id);
    const before = m.account;
    const account = modalValue("企微账号", "wx-new-027");
    const identity = modalValue("操作人", "赵晴");
    const appName = modalValue("应用", "企微助手");
    const loginStatus = modalValue("登录状态", "在线");
    const reason = modalValue("原因", "项目启动前账号绑定");
    Object.assign(m, { account, identity, app: appName, loginStatus });
    addLog(id, "企微绑定", before, account, reason);
    closeModal();
    render();
    return toast("绑定成功", `${account} 已绑定到 ${id}。`);
  }
  if (action === "assignProject") {
    const m = findMachine(id);
    return openModal({
      id,
      title: `分配项目 ${id}`,
      confirmAction: "confirmAssignProject",
      body: modalForm([
        ["客户", m.customer],
        ["项目名称", "私域转化 B 组"],
        ["项目负责人", "周晓"],
        ["预计结束日", m.customerExpiry],
        ["分配原因", "客户池空闲资源投入项目使用", "textarea"],
      ], `${id} 当前属于 ${m.customer}，确认后将从客户云机池转入客户项目。`),
    });
  }
  if (action === "confirmAssignProject") {
    const m = findMachine(id);
    const before = m.status;
    const project = modalValue("项目名称", "私域转化 B 组");
    const reason = modalValue("分配原因", "客户池空闲资源投入项目使用");
    Object.assign(m, { status: "项目使用中", owner: "客户项目", project, note: "项目中" });
    addLog(id, "项目分配", before, "项目使用中", reason);
    closeModal();
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
    return openModal({
      id,
      title: `审批工单 ${id}`,
      confirmAction: "confirmApproveWorkorder",
      body: modalForm([
        ["工单类型", w.type],
        ["客户", w.customer],
        ["旧云机", w.oldMachine],
        ["新云机", w.newMachine],
        ["审批结论", "通过"],
        ["审批意见", "原因充分，允许进入处理环节", "textarea"],
      ], "审批通过后工单进入待处理；如填写“驳回”或“拒绝”，工单会结束在已驳回状态。"),
    });
  }
  if (action === "confirmApproveWorkorder") {
    const w = workorders.find((item) => item.id === id);
    const conclusion = modalValue("审批结论", "通过");
    const opinion = modalValue("审批意见", "原因充分，允许进入处理环节");
    const approved = !/驳回|拒绝|不通过/.test(conclusion);
    w.status = approved ? "待处理" : "已驳回";
    w.result = approved ? "审批通过，待处理" : "审批驳回";
    addLog(id, "工单审批", "待审批", w.status, opinion, approved ? "成功" : "阻断");
    closeModal();
    render();
    return toast(approved ? "审批通过" : "审批驳回", approved ? "工单已进入处理环节。" : "工单已结束，不再允许完成处理。");
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

let tableDrag = null;

document.addEventListener("pointerdown", (event) => {
  const wrap = event.target.closest(".lifecycle-table");
  if (!wrap || event.target.closest("button, input, select, textarea, a")) return;
  tableDrag = {
    wrap,
    pointerId: event.pointerId,
    startX: event.clientX,
    scrollLeft: wrap.scrollLeft,
  };
  wrap.classList.add("dragging");
  wrap.setPointerCapture?.(event.pointerId);
});

document.addEventListener("pointermove", (event) => {
  if (!tableDrag) return;
  const deltaX = event.clientX - tableDrag.startX;
  tableDrag.wrap.scrollLeft = tableDrag.scrollLeft - deltaX;
  event.preventDefault();
});

function stopTableDrag() {
  if (!tableDrag) return;
  tableDrag.wrap.classList.remove("dragging");
  tableDrag = null;
}

document.addEventListener("pointerup", stopTableDrag);
document.addEventListener("pointercancel", stopTableDrag);

let tooltipHideTimer = null;

function ensureCellTooltip() {
  let tooltip = document.getElementById("cell-tooltip");
  if (!tooltip) {
    tooltip = document.createElement("div");
    tooltip.id = "cell-tooltip";
    tooltip.className = "cell-tooltip";
    document.body.appendChild(tooltip);
    tooltip.addEventListener("mouseenter", () => clearTimeout(tooltipHideTimer));
    tooltip.addEventListener("mouseleave", hideCellTooltip);
  }
  return tooltip;
}

function showCellTooltip(target) {
  const tooltip = ensureCellTooltip();
  tooltip.textContent = target.dataset.fullText || "";
  const rect = target.getBoundingClientRect();
  tooltip.style.left = `${Math.min(rect.left, window.innerWidth - 260)}px`;
  tooltip.style.top = `${rect.top - 42}px`;
  tooltip.classList.add("show");
  clearTimeout(tooltipHideTimer);
}

function hideCellTooltip() {
  tooltipHideTimer = setTimeout(() => {
    document.getElementById("cell-tooltip")?.classList.remove("show");
  }, 180);
}

document.addEventListener("mouseover", (event) => {
  const target = event.target.closest(".truncated-cell");
  if (!target) return;
  showCellTooltip(target);
});

document.addEventListener("mouseout", (event) => {
  const target = event.target.closest(".truncated-cell");
  if (!target) return;
  const next = event.relatedTarget;
  if (next?.closest?.("#cell-tooltip")) return;
  hideCellTooltip();
});

document.addEventListener("change", (event) => {
  if (event.target.dataset.action === "roleChange") {
    state.role = event.target.value;
    render();
    toast("角色已切换", `当前角色：${state.role}。无操作权限的按钮会置灰或隐藏。`);
  }
  if (event.target.dataset.filter === "actionType") {
    state.lifecycleAction = event.target.value || "全部";
    state.tablePage.lifecycleRecords = 1;
    state.selectedLifecycleIds.clear();
    render();
    return;
  }
  if (event.target.dataset.filter) {
    state.filters[event.target.dataset.filter] = event.target.value;
    state.tablePage[state.page] = 1;
    state.selectedLifecycleIds.clear();
    render();
  }
});

document.addEventListener("input", (event) => {
  if (!event.target.dataset.filter || event.target.dataset.filter === "actionType") return;
  state.filters[event.target.dataset.filter] = event.target.value;
  state.tablePage[state.page] = 1;
  state.selectedLifecycleIds.clear();
});

render();
