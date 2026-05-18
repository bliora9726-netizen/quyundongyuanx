const $ = (selector) => document.querySelector(selector);

const appView = $("#appView");
const pageTitle = $("#pageTitle");
const pageSubtitle = $("#pageSubtitle");
const headerAction = $("#headerAction");
const backBtn = $("#backBtn");
const pageIndex = $("#pageIndex");
const dialogMask = $("#dialogMask");
const dialogTitle = $("#dialogTitle");
const dialogBody = $("#dialogBody");
const dialogActions = $("#dialogActions");
const toast = $("#toast");

const stores = [
  { id: "s1", name: "星河体育中心", role: "跨店教练", headCoach: false },
  { id: "s2", name: "城西运动馆", role: "总教练", headCoach: true },
];

const state = {
  route: "training",
  history: [],
  storeId: "s1",
  selectedDate: "05-18",
  selectedFieldDate: "05-18",
  selectedFieldType: "篮球",
  selectedStudentId: "stu1",
  selectedStudentTab: "cards",
  studentScope: "current",
  lessonFilter: "all",
  cardFilter: "available",
  orderFilter: "all",
  query: "",
  selectedCourseId: "c1",
  selectedFieldId: "f1",
  selectedPackageId: "pkg1",
  currentOrderId: "o1",
  logs: [],
};

const students = [
  {
    id: "stu1",
    storeId: "s1",
    name: "陈小满",
    gender: "男",
    phone: "138****5621",
    memberNo: "M2026051801",
    owner: "周教练",
    current: true,
    avatar: "陈",
    cards: [
      { id: "card1", name: "少儿篮球 10 节卡", level: "L1-L2", coach: "周教练", course: "少儿篮球基础班", total: 10, remain: 1, expire: "2026-05-31", status: "即将用完" },
      { id: "card2", name: "少儿体能历史卡", level: "L1", coach: "周教练", course: "体能启蒙", total: 12, remain: 0, expire: "2026-03-10", status: "已用完" },
    ],
    records: [
      { date: "05-12", course: "少儿篮球基础班", sign: "已签到", leave: "未请假", charge: "已扣费", card: "少儿篮球 10 节卡" },
      { date: "05-09", course: "少儿篮球基础班", sign: "已签到", leave: "未请假", charge: "已扣费", card: "少儿篮球 10 节卡" },
    ],
    leaves: [{ time: "04-28 09:10", course: "少儿篮球基础班", result: "已通过", detail: "家长提前请假，未扣费，无需退还" }],
  },
  {
    id: "stu2",
    storeId: "s1",
    name: "李安然",
    gender: "女",
    phone: "136****9088",
    memberNo: "M2026042208",
    owner: "周教练",
    current: true,
    avatar: "李",
    cards: [
      { id: "card3", name: "篮球私教 20 节卡", level: "L2-L4", coach: "周教练", course: "青少年私教课", total: 20, remain: 12, expire: "2026-09-30", status: "可用" },
    ],
    records: [{ date: "05-15", course: "青少年私教课", sign: "已签到", leave: "未请假", charge: "已扣费", card: "篮球私教 20 节卡" }],
    leaves: [],
  },
  {
    id: "stu3",
    storeId: "s1",
    name: "王可",
    gender: "女",
    phone: "139****7162",
    memberNo: "M2026020109",
    owner: "许教练",
    current: false,
    avatar: "王",
    cards: [
      { id: "card4", name: "篮球班课 24 节卡", level: "L1-L3", coach: "许教练", course: "篮球班课", total: 24, remain: 4, expire: "2026-05-26", status: "即将过期" },
    ],
    records: [{ date: "05-02", course: "篮球班课", sign: "未签到", leave: "已请假", charge: "无需退还", card: "篮球班课 24 节卡" }],
    leaves: [{ time: "05-02 08:15", course: "篮球班课", result: "已通过", detail: "课前请假，未扣费" }],
  },
  {
    id: "stu4",
    storeId: "s2",
    name: "赵一诺",
    gender: "男",
    phone: "137****2121",
    memberNo: "M2026050703",
    owner: "何教练",
    current: true,
    avatar: "赵",
    cards: [
      { id: "card5", name: "羽毛球启蒙 16 节卡", level: "入门", coach: "何教练", course: "羽毛球启蒙", total: 16, remain: 2, expire: "2026-06-08", status: "即将用完" },
    ],
    records: [{ date: "05-16", course: "羽毛球启蒙", sign: "已签到", leave: "未请假", charge: "已扣费", card: "羽毛球启蒙 16 节卡" }],
    leaves: [],
  },
];

const courses = [
  {
    id: "c1",
    storeId: "s1",
    date: "05-18",
    title: "少儿篮球基础班",
    time: "10:00-11:00",
    field: "A3 场",
    type: "班课",
    capacity: 10,
    cost: 1,
    coach: "周教练",
    status: "未开始",
    roster: [
      { studentId: "stu1", relation: "已预约", sign: "未签到", charge: "未扣费", note: "剩余 1 节，扣费后触发续报提醒" },
      { studentId: "stu2", relation: "已预约", sign: "已签到", charge: "未扣费", note: "待扣费" },
      { studentId: "stu3", relation: "已请假", sign: "未签到", charge: "无需退还", note: "家长课前请假" },
    ],
  },
  {
    id: "c2",
    storeId: "s1",
    date: "05-18",
    title: "成人篮球团课",
    time: "19:00-20:00",
    field: "A2 场",
    type: "团课",
    capacity: 16,
    cost: 1,
    coach: "周教练",
    status: "未开始",
    roster: [
      { studentId: "stu2", relation: "已预约", sign: "未签到", charge: "未扣费", note: "可撤回测试课" },
    ],
  },
  {
    id: "c3",
    storeId: "s2",
    date: "05-18",
    title: "羽毛球启蒙",
    time: "15:00-16:00",
    field: "B1 场",
    type: "班课",
    capacity: 8,
    cost: 1,
    coach: "何教练",
    status: "上课中",
    roster: [
      { studentId: "stu4", relation: "已预约", sign: "未签到", charge: "未扣费", note: "总教练可代操作" },
    ],
  },
];

const packages = [
  { id: "pkg1", name: "少儿篮球 10 节续报卡", course: "少儿篮球基础班", level: "L1-L2", lessons: 10, price: 1980, valid: "180 天", coach: "周教练", storeId: "s1" },
  { id: "pkg2", name: "篮球私教 20 节卡", course: "青少年私教课", level: "L2-L4", lessons: 20, price: 5600, valid: "365 天", coach: "周教练", storeId: "s1" },
  { id: "pkg3", name: "羽毛球启蒙 16 节卡", course: "羽毛球启蒙", level: "入门", lessons: 16, price: 2280, valid: "240 天", coach: "何教练", storeId: "s2" },
];

const orders = [
  { id: "o1", storeId: "s1", studentId: "stu1", packageId: "pkg1", status: "未支付", createdAt: "05-18 11:20", payAt: "-", initiator: "周教练", studentCoach: "周教练", cardCoach: "周教练" },
  { id: "o2", storeId: "s1", studentId: "stu2", packageId: "pkg2", status: "已支付", createdAt: "05-12 16:45", payAt: "05-12 16:53", initiator: "周教练", studentCoach: "周教练", cardCoach: "周教练" },
  { id: "o3", storeId: "s1", studentId: "stu3", packageId: "pkg1", status: "已超期", createdAt: "05-10 14:10", payAt: "-", initiator: "许教练", studentCoach: "许教练", cardCoach: "许教练" },
  { id: "o4", storeId: "s2", studentId: "stu4", packageId: "pkg3", status: "未支付", createdAt: "05-18 09:08", payAt: "-", initiator: "何教练", studentCoach: "何教练", cardCoach: "何教练" },
];

const fieldSlots = [
  { id: "f1", storeId: "s1", time: "09:00", field: "A1 场", type: "篮球", status: "可约", courseId: null },
  { id: "f2", storeId: "s1", time: "10:00", field: "A3 场", type: "篮球", status: "我的课程", courseId: "c1" },
  { id: "f3", storeId: "s1", time: "14:30", field: "B1 场", type: "篮球", status: "可约", courseId: null },
  { id: "f4", storeId: "s1", time: "16:00", field: "C1 场", type: "篮球", status: "维护中", courseId: null },
  { id: "f5", storeId: "s2", time: "15:00", field: "B1 场", type: "羽毛球", status: "我的课程", courseId: "c3" },
  { id: "f6", storeId: "s2", time: "18:00", field: "B3 场", type: "羽毛球", status: "可约", courseId: null },
];

const routeMeta = {
  fields: ["场地", "场地库存查看与约课入口"],
  booking: ["约课确认", "复用系统现有约课流程的确认页"],
  students: ["学员", "搜索、筛选、课程卡提醒与续报入口"],
  studentDetail: ["学员详情", "基础信息、课程卡、上课记录与请假记录"],
  renew: ["续报课程", "选择课程卡并生成续报订单"],
  payQr: ["支付二维码", "30 分钟有效，支付后自动开卡"],
  training: ["训练", "课程日历、今日课程和课程详情处理"],
  courseDetail: ["课程详情", "签到、批量签到、学员请假、移除和撤回"],
  mine: ["我的", "教练主页、门店切换、上课记录和学员订单"],
  storeSwitch: ["切换门店", "跨店身份下所有数据随门店刷新"],
  classRecords: ["我的上课记录", "按当前门店统计已完成课程和异常"],
  studentOrders: ["我的学员订单", "查看支付状态、继续处理和重新发起"],
  logs: ["操作日志", "关键授课和订单操作留痕"],
};

const pageList = [
  ["fields", "1. 场地库存页"],
  ["booking", "2. 约课确认页"],
  ["students", "3. 学员列表页"],
  ["studentDetail", "4. 学员详情页"],
  ["renew", "5. 续报课程页"],
  ["payQr", "6. 支付二维码页"],
  ["training", "7. 训练课程日历"],
  ["courseDetail", "8. 课程详情页"],
  ["mine", "9. 我的页面"],
  ["storeSwitch", "10. 门店切换页"],
  ["classRecords", "11. 我的上课记录"],
  ["studentOrders", "12. 我的学员订单"],
  ["logs", "13. 操作日志"],
];

function currentStore() {
  return stores.find((store) => store.id === state.storeId);
}

function byId(list, id) {
  return list.find((item) => item.id === id);
}

function money(value) {
  return `¥${value.toLocaleString("zh-CN")}`;
}

function tag(text, tone = "") {
  return `<span class="tag ${tone}">${text}</span>`;
}

function button(label, className, attrs = "") {
  return `<button class="${className}" ${attrs} type="button">${label}</button>`;
}

function info(label, value) {
  return `<div class="info-item"><span>${label}</span><strong>${value}</strong></div>`;
}

function log(action, detail) {
  state.logs.unshift({ time: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }), action, detail, store: currentStore().name });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove("show"), 2200);
}

function navigate(nextRoute, push = true) {
  if (push && state.route !== nextRoute) state.history.push(state.route);
  state.route = nextRoute;
  render();
}

function openDialog(title, body, actions) {
  dialogTitle.textContent = title;
  dialogBody.innerHTML = body;
  dialogActions.innerHTML = actions
    .map((action) => `<button class="${action.className}" data-dialog-action="${action.key}" type="button">${action.label}</button>`)
    .join("");
  dialogMask.hidden = false;
}

function closeDialog() {
  dialogMask.hidden = true;
  dialogActions.innerHTML = "";
}

function toneForStatus(status) {
  if (["已签到", "已扣费", "已支付", "已结束", "可用", "无需退还", "已退还", "可约"].includes(status)) return "green";
  if (["未签到", "未扣费", "未支付", "待扣费", "未开始", "即将过期", "即将用完", "我的课程"].includes(status)) return "orange";
  if (["扣费失败", "退还失败", "已超期", "已作废", "已撤回", "维护中", "已移除"].includes(status)) return "red";
  return "blue";
}

function availableCards(student) {
  return student.cards.filter((card) => !["已过期", "已用完"].includes(card.status));
}

function cardReminder(student) {
  const cards = availableCards(student);
  if (!cards.length) return tag("暂无可用课程卡", "red");
  if (cards.some((card) => card.status === "即将用完" || card.remain <= 2)) return tag("即将用完", "red");
  if (cards.some((card) => card.status === "即将过期")) return tag("即将过期", "orange");
  return tag("正常", "green");
}

function courseStats(course) {
  const active = course.roster.filter((item) => item.relation !== "已移除");
  return {
    booked: active.filter((item) => item.relation === "已预约").length,
    signed: active.filter((item) => item.sign === "已签到").length,
    leave: active.filter((item) => item.relation === "已请假").length,
    charged: active.filter((item) => item.charge === "已扣费").length,
    abnormal: active.filter((item) => ["待扣费", "扣费失败", "退还失败"].includes(item.charge) || (item.sign === "已签到" && item.charge === "未扣费")).length,
  };
}

function courseTags(course) {
  const stats = courseStats(course);
  const tags = [tag(course.status, toneForStatus(course.status))];
  if (course.status !== "已撤回") {
    if (course.roster.some((item) => item.relation === "已预约" && item.sign === "未签到")) tags.push(tag("待签到", "orange"));
    if (course.roster.some((item) => item.sign === "已签到" && item.charge !== "已扣费")) tags.push(tag("待扣费", "orange"));
    if (stats.abnormal) tags.push(tag(`异常 ${stats.abnormal}`, "red"));
  }
  return tags.join("");
}

function canRevoke(course) {
  const store = currentStore();
  const hasSigned = course.roster.some((item) => item.sign === "已签到");
  const hasCharged = course.roster.some((item) => item.charge === "已扣费");
  const hasError = course.roster.some((item) => ["扣费失败", "退还失败"].includes(item.charge));
  const hasPermission = store.headCoach || (store.role === "跨店教练" && course.coach === "周教练");
  return hasPermission && !hasSigned && !hasCharged && !hasError && course.status !== "已撤回";
}

function studentCard(student) {
  const cards = availableCards(student);
  const mainCard = cards[0];
  const used = mainCard ? Math.max(mainCard.total - mainCard.remain, 0) : 0;
  const progress = mainCard ? Math.round((used / mainCard.total) * 100) : 0;
  return `
    <article class="student-card">
      <div class="student-main">
        <div class="avatar small">${student.avatar}</div>
        <div>
          <h3>${student.name}</h3>
          <p>${student.gender} · ${student.phone.slice(-4)} · ${student.owner}</p>
        </div>
        <div class="chip-row">${cardReminder(student)}</div>
      </div>
      <div class="info-grid">
        ${info("有效课程卡", `${cards.length} 张`)}
        ${info("可用课时", cards.reduce((sum, card) => sum + card.remain, 0))}
        ${info("最近上课", student.records[0]?.date || "-")}
        ${info("最近到期", cards[0]?.expire || "-")}
      </div>
      <div class="progress"><span style="width:${progress}%"></span></div>
      <div class="actions">
        ${button("查看详情", "secondary-btn wide", `data-student="${student.id}" data-route="studentDetail"`)}
        ${button("续报课程", "primary-btn wide", `data-student="${student.id}" data-route="renew"`)}
      </div>
    </article>
  `;
}

function courseCard(course, primaryLabel = "进入课程") {
  const stats = courseStats(course);
  return `
    <article class="course-card">
      <div class="course-main">
        <div>
          <h3>${course.title}</h3>
          <p>${course.date} ${course.time} · ${course.field} · ${course.type} · ${stats.booked + stats.leave}/${course.capacity} 人</p>
        </div>
        <div class="chip-row">${courseTags(course)}</div>
      </div>
      <div class="actions">
        ${button(primaryLabel, "primary-btn wide", `data-course="${course.id}" data-route="courseDetail"`)}
      </div>
    </article>
  `;
}

function orderCard(order) {
  const student = byId(students, order.studentId);
  const pkg = byId(packages, order.packageId);
  const statusTone = toneForStatus(order.status);
  const action =
    order.status === "未支付"
      ? `${button("继续处理", "primary-btn wide", `data-order="${order.id}" data-route="payQr"`)}${button("模拟超期", "secondary-btn wide", `data-order-expire="${order.id}"`)}`
      : order.status === "已超期"
        ? button("重新发起", "primary-btn wide", `data-reissue-order="${order.id}"`)
        : button("查看", "secondary-btn wide", `data-order="${order.id}" data-route="payQr"`);
  return `
    <article class="student-card">
      <div class="student-main">
        <div><h3>${student.name} · ${pkg.name}</h3><p>${order.createdAt} 发起 · ${money(pkg.price)}</p></div>
        ${tag(order.status, statusTone)}
      </div>
      <div class="info-grid">
        ${info("支付时间", order.payAt)}
        ${info("订单发起人", order.initiator)}
        ${info("学员负责教练", order.studentCoach)}
        ${info("课程卡负责教练", order.cardCoach)}
      </div>
      <div class="actions">${action}</div>
    </article>
  `;
}

function renderShell() {
  const [title, subtitle] = routeMeta[state.route] || routeMeta.training;
  pageTitle.textContent = title;
  pageSubtitle.textContent = `${currentStore().name} · ${subtitle}`;
  backBtn.style.visibility = state.history.length ? "visible" : "hidden";

  const headerMap = {
    fields: ["约课", "booking"],
    training: ["日志", "logs"],
    courseDetail: ["日志", "logs"],
    mine: ["切店", "storeSwitch"],
  };
  if (headerMap[state.route]) {
    headerAction.textContent = headerMap[state.route][0];
    headerAction.dataset.route = headerMap[state.route][1];
    headerAction.style.visibility = "visible";
  } else {
    headerAction.textContent = "";
    headerAction.removeAttribute("data-route");
    headerAction.style.visibility = "hidden";
  }

  document.querySelectorAll(".tab").forEach((tab) => {
    const routeGroup = {
      booking: "fields",
      studentDetail: "students",
      renew: "students",
      payQr: "students",
      courseDetail: "training",
      classRecords: "mine",
      studentOrders: "mine",
      storeSwitch: "mine",
      logs: "mine",
    };
    const activeRoute = routeGroup[state.route] || state.route;
    tab.classList.toggle("active", tab.dataset.route === activeRoute);
  });

  pageIndex.innerHTML = pageList
    .map(([id, label]) => `<button class="${id === state.route ? "active" : ""}" data-route="${id}" type="button">${label}</button>`)
    .join("");
}

function renderFields() {
  const slots = fieldSlots.filter((slot) => slot.storeId === state.storeId && slot.type === state.selectedFieldType);
  return `
    <div class="stack">
      <section class="card card-pad">
        <div class="card-title">
          <div><h2>${currentStore().name}</h2><p>${currentStore().role} · 场地只展示当前门店库存</p></div>
          ${tag(currentStore().role, "blue")}
        </div>
      </section>
      <div class="filter-bar">
        ${["05-18", "05-19"].map((date) => `<button class="chip ${date === state.selectedFieldDate ? "active" : ""}" data-field-date="${date}" type="button">${date}</button>`).join("")}
        ${["篮球", "羽毛球"].map((type) => `<button class="chip ${type === state.selectedFieldType ? "active" : ""}" data-field-type="${type}" type="button">${type}</button>`).join("")}
      </div>
      <section class="card card-pad">
        <div class="card-title"><h2>场地时间轴</h2>${tag("按现有约课流程", "green")}</div>
        <div class="field-timeline" style="margin-top:12px">
          ${slots
            .map((slot) => {
              const course = slot.courseId ? byId(courses, slot.courseId) : null;
              const action = slot.status === "可约" ? button("约课", "line-btn", `data-slot="${slot.id}" data-route="booking"`) : course ? button("查看课程", "line-btn", `data-course="${course.id}" data-route="courseDetail"`) : tag(slot.status, toneForStatus(slot.status));
              return `
                <div class="field-row ${slot.courseId ? "mine" : ""}">
                  <div class="time">${slot.time}</div>
                  <div><strong>${slot.field}</strong><p class="meta">${course ? `${course.title} · ${course.coach}` : slot.status}</p></div>
                  ${action}
                </div>
              `;
            })
            .join("") || `<div class="empty">当前筛选下暂无场地库存</div>`}
        </div>
      </section>
    </div>
  `;
}

function renderBooking() {
  const slot = byId(fieldSlots, state.selectedFieldId) || fieldSlots.find((item) => item.storeId === state.storeId && item.status === "可约");
  state.selectedFieldId = slot?.id || state.selectedFieldId;
  const coachOptions = currentStore().headCoach ? ["周教练", "何教练", "许教练"] : ["周教练"];
  return `
    <div class="stack">
      <section class="card card-pad">
        <div class="card-title"><h2>约课信息</h2>${tag(slot?.status || "可约", toneForStatus(slot?.status || "可约"))}</div>
        <div class="info-grid" style="margin-top:12px">
          ${info("门店", currentStore().name)}
          ${info("场地", slot ? `${slot.field} · ${slot.type}` : "-")}
          ${info("时间", `${state.selectedFieldDate} ${slot?.time || "09:00"}-10:00`)}
          ${info("约课权限", currentStore().headCoach ? "可为当前门店其他教练约课" : "仅可为自己约课")}
        </div>
      </section>
      <section class="card card-pad">
        <div class="card-title"><h2>选择教练</h2>${tag(currentStore().role, "blue")}</div>
        <div class="filter-bar" style="margin-top:12px">
          ${coachOptions.map((coach, index) => `<button class="chip ${index === 0 ? "active" : ""}" type="button">${coach}</button>`).join("")}
        </div>
      </section>
      <section class="card card-pad">
        <div class="card-title"><h2>操作留痕</h2>${tag("代约课需记录", "orange")}</div>
        <p class="meta">确认后记录操作人、被约课教练、门店、课程、学员、场地、时间与操作时间。</p>
      </section>
      ${button("确认约课并生成课程", "primary-btn wide", "data-confirm-booking")}
    </div>
  `;
}

function renderStudents() {
  const filtered = students
    .filter((student) => student.storeId === state.storeId)
    .filter((student) => (state.studentScope === "current" ? student.current : true))
    .filter((student) => {
      if (state.cardFilter === "low") return availableCards(student).some((card) => card.remain <= 2 || card.status === "即将用完");
      if (state.cardFilter === "expire") return availableCards(student).some((card) => card.status === "即将过期");
      return true;
    })
    .filter((student) => !state.query || `${student.name}${student.phone}`.includes(state.query));
  return `
    <div class="stack">
      <label class="search">⌕ <input id="studentSearch" value="${state.query}" placeholder="搜索学员姓名/手机号" /></label>
      <div class="filter-bar">
        ${[
          ["current", "当前学员"],
          ["all", "全部学员"],
        ]
          .map(([id, label]) => `<button class="chip ${state.studentScope === id ? "active" : ""}" data-student-scope="${id}" type="button">${label}</button>`)
          .join("")}
        ${[
          ["available", "全部课时"],
          ["low", "即将用完"],
          ["expire", "即将过期"],
        ]
          .map(([id, label]) => `<button class="chip ${state.cardFilter === id ? "active" : ""}" data-card-filter="${id}" type="button">${label}</button>`)
          .join("")}
      </div>
      <section class="card card-pad">
        <div class="card-title">
          <div><h2>${currentStore().name}学员</h2><p>${currentStore().headCoach ? "总教练可见当前门店全部学员" : "按当前门店和教练权限展示"}</p></div>
          ${tag(`${filtered.length} 人`, "blue")}
        </div>
      </section>
      <div class="list">${filtered.map(studentCard).join("") || `<div class="empty">没有符合条件的学员</div>`}</div>
    </div>
  `;
}

function renderStudentDetail() {
  const student = byId(students, state.selectedStudentId) || students.find((item) => item.storeId === state.storeId);
  if (!student) return `<div class="empty">当前门店暂无学员</div>`;
  state.selectedStudentId = student.id;
  const cards = student.cards.filter((card) => {
    if (state.selectedStudentTab === "low") return card.remain <= 2 || card.status === "即将用完";
    if (state.selectedStudentTab === "history") return ["已过期", "已用完"].includes(card.status);
    return !["已过期", "已用完"].includes(card.status);
  });
  const usable = availableCards(student);
  return `
    <div class="stack">
      <section class="profile-card">
        <div class="profile-row">
          <div class="avatar">${student.avatar}</div>
          <div><h2>${student.name}</h2><p>${student.phone} · 会员卡号 ${student.memberNo}</p></div>
        </div>
      </section>
      <div class="quick-stats">
        <div class="stat"><strong>${usable.length}</strong><span>有效课程卡</span></div>
        <div class="stat"><strong>${usable.reduce((sum, card) => sum + card.remain, 0)}</strong><span>可用课时</span></div>
        <div class="stat"><strong>${student.records.length}</strong><span>上课记录</span></div>
        <div class="stat"><strong>${student.leaves.length}</strong><span>请假记录</span></div>
      </div>
      <div class="filter-bar">
        ${[
          ["cards", "可用课程卡"],
          ["low", "即将用完"],
          ["history", "历史课程卡"],
          ["records", "上课记录"],
          ["leaves", "请假记录"],
        ]
          .map(([id, label]) => `<button class="chip ${state.selectedStudentTab === id ? "active" : ""}" data-student-tab="${id}" type="button">${label}</button>`)
          .join("")}
      </div>
      ${renderStudentDetailPanel(student, cards)}
      <div class="actions">
        ${button("续报课程", "primary-btn wide", `data-student="${student.id}" data-route="renew"`)}
        ${button("查看订单", "secondary-btn wide", "data-route=\"studentOrders\"")}
      </div>
    </div>
  `;
}

function renderStudentDetailPanel(student, cards) {
  if (["cards", "low", "history"].includes(state.selectedStudentTab)) {
    return `
      <div class="list">
        ${cards
          .map((card) => `
            <article class="student-card">
              <div class="student-main"><div><h3>${card.name}</h3><p>${card.level} · ${card.course}</p></div>${tag(card.status, toneForStatus(card.status))}</div>
              <div class="info-grid">
                ${info("绑定教练", card.coach)}
                ${info("总课时", `${card.total} 节`)}
                ${info("剩余课时", `${card.remain} 节`)}
                ${info("有效期至", card.expire)}
              </div>
            </article>
          `)
          .join("") || `<div class="empty">当前分类暂无课程卡</div>`}
      </div>
    `;
  }
  if (state.selectedStudentTab === "records") {
    return `<div class="list">${student.records.map((record) => recordRow(record.date, record.course, tag(record.sign, toneForStatus(record.sign)) + tag(record.leave, toneForStatus(record.leave)) + tag(record.charge, toneForStatus(record.charge)), `使用课程卡：${record.card}`)).join("")}</div>`;
  }
  return `<div class="list">${student.leaves.map((leave) => recordRow(leave.time, leave.course, tag(leave.result, toneForStatus(leave.result)), leave.detail)).join("") || `<div class="empty">暂无请假记录</div>`}</div>`;
}

function recordRow(date, title, tags, meta) {
  return `<article class="record-card"><div class="record-main"><div><h3>${date} · ${title}</h3><p>${meta}</p></div><div class="chip-row">${tags}</div></div></article>`;
}

function renderRenew() {
  const student = byId(students, state.selectedStudentId) || students.find((item) => item.storeId === state.storeId);
  const availablePackages = packages.filter((pkg) => pkg.storeId === state.storeId);
  const selected = byId(packages, state.selectedPackageId) || availablePackages[0];
  state.selectedPackageId = selected?.id || state.selectedPackageId;
  return `
    <div class="stack">
      <section class="card card-pad">
        <div class="student-main">
          <div class="avatar small">${student?.avatar || "学"}</div>
          <div><h3>${student?.name || "请选择学员"}</h3><p>${student?.phone || "-"} · ${student?.memberNo || "-"}</p></div>
          ${cardReminder(student)}
        </div>
      </section>
      <section class="card card-pad">
        <div class="card-title"><h2>当前持卡概览</h2>${tag("只统计有效可用卡", "blue")}</div>
        <div class="list" style="margin-top:12px">
          ${availableCards(student).map((card) => recordRow(card.expire, card.name, tag(card.status, toneForStatus(card.status)), `剩余 ${card.remain}/${card.total} 节 · ${card.coach}`)).join("") || `<div class="empty">暂无可用课程卡</div>`}
        </div>
      </section>
      <section class="card card-pad">
        <div class="card-title"><h2>续报课程卡</h2><p>价格不可改，不支持赠送课时或手动开卡</p></div>
        <div class="list" style="margin-top:12px">
          ${availablePackages
            .map((pkg) => `
              <button class="package ${pkg.id === state.selectedPackageId ? "selected" : ""}" data-package="${pkg.id}" type="button">
                <div class="student-main"><h3>${pkg.name}</h3>${tag(pkg.id === state.selectedPackageId ? "已选择" : "可售", pkg.id === state.selectedPackageId ? "blue" : "green")}</div>
                <div class="info-grid" style="margin-top:10px">
                  ${info("课时数", `${pkg.lessons} 节`)}
                  ${info("售价", money(pkg.price))}
                  ${info("有效期", pkg.valid)}
                  ${info("适用等级", pkg.level)}
                </div>
              </button>
            `)
            .join("")}
        </div>
      </section>
      <section class="card card-pad">
        <div class="amount-box"><span>订单金额<br><small class="muted">由后台套餐配置返回</small></span><strong>${money(selected?.price || 0)}</strong></div>
      </section>
      ${button("确认并生成支付二维码", "primary-btn wide", "data-create-order")}
    </div>
  `;
}

function renderPayQr() {
  const order = byId(orders, state.currentOrderId) || orders.find((item) => item.storeId === state.storeId);
  const student = byId(students, order?.studentId);
  const pkg = byId(packages, order?.packageId);
  const disabled = order?.status !== "未支付";
  return `
    <div class="stack">
      <section class="card card-pad qr-card">
        ${tag(order?.status || "无订单", toneForStatus(order?.status || ""))}
        <div class="qr ${disabled ? "disabled" : ""}" aria-label="支付二维码"></div>
        <h2>${pkg?.name || "-"}</h2>
        <p class="meta">${student?.name || "-"} · ${pkg ? money(pkg.price) : "-"} · 订单有效期 30 分钟</p>
        <div class="actions" style="margin-top:14px">
          ${order?.status === "未支付" ? button("模拟客户已支付", "primary-btn wide", `data-order-paid="${order.id}"`) + button("模拟订单超期", "secondary-btn wide", `data-order-expire="${order.id}"`) : ""}
          ${order?.status === "已超期" ? button("重新发起", "primary-btn wide", `data-reissue-order="${order.id}"`) : ""}
          ${order?.status === "已支付" ? button("查看学员课程卡", "secondary-btn wide", `data-student="${student.id}" data-route="studentDetail"`) : ""}
        </div>
      </section>
      <section class="card card-pad">
        <div class="card-title"><h2>订单归属</h2>${tag("只展示不改写财务口径", "blue")}</div>
        <div class="info-grid" style="margin-top:12px">
          ${info("订单发起人", order?.initiator || "-")}
          ${info("学员负责教练", order?.studentCoach || "-")}
          ${info("课程卡负责教练", order?.cardCoach || "-")}
          ${info("支付时间", order?.payAt || "-")}
        </div>
      </section>
    </div>
  `;
}

function renderTraining() {
  const storeCourses = courses.filter((course) => course.storeId === state.storeId && course.date === state.selectedDate);
  return `
    <div class="stack">
      <section class="card card-pad">
        <div class="calendar-grid">
          ${["一", "二", "三", "四", "五", "六", "日"].map((day) => `<div class="day-cell label">${day}</div>`).join("")}
          ${["05-13", "05-14", "05-15", "05-16", "05-17", "05-18", "05-19"]
            .map((date) => {
              const count = courses.filter((course) => course.storeId === state.storeId && course.date === date).length;
              return `<button class="day-cell ${date === state.selectedDate ? "today" : count ? "warn" : ""}" data-date="${date}" type="button"><strong>${date.slice(3)}</strong>${count ? `${count} 节` : "无课"}</button>`;
            })
            .join("")}
        </div>
      </section>
      <section class="card card-pad">
        <div class="card-title"><div><h2>今日课程</h2><p>课程状态与待处理事项同步展示</p></div>${tag(`${storeCourses.length} 节`, "blue")}</div>
        <div class="list" style="margin-top:12px">${storeCourses.map((course) => courseCard(course, "处理课程")).join("") || `<div class="empty">当天暂无课程</div>`}</div>
      </section>
    </div>
  `;
}

function renderCourseDetail() {
  const course = byId(courses, state.selectedCourseId) || courses.find((item) => item.storeId === state.storeId);
  if (!course) return `<div class="empty">当前门店暂无课程</div>`;
  state.selectedCourseId = course.id;
  const stats = courseStats(course);
  return `
    <div class="stack">
      <section class="card card-pad">
        <div class="card-title"><h2>${course.title}</h2><div class="chip-row">${courseTags(course)}</div></div>
        <div class="info-grid" style="margin-top:12px">
          ${info("场馆 / 场地", `${currentStore().name} · ${course.field}`)}
          ${info("上课时间", `${course.date} ${course.time}`)}
          ${info("消耗课次", `${course.cost} 次`)}
          ${info("课程类型", course.type)}
        </div>
      </section>
      <div class="quick-stats">
        <div class="stat"><strong>${stats.booked}</strong><span>已预约</span></div>
        <div class="stat"><strong>${stats.signed}</strong><span>已签到</span></div>
        <div class="stat"><strong>${stats.leave}</strong><span>已请假</span></div>
        <div class="stat"><strong>${stats.charged}</strong><span>已扣费</span></div>
      </div>
      <section class="card card-pad">
        <div class="card-title"><h2>学员列表</h2>${tag(`异常 ${stats.abnormal}`, stats.abnormal ? "red" : "green")}</div>
        <div class="list" style="margin-top:12px">
          ${course.roster.map((item) => renderRosterStudent(course, item)).join("")}
        </div>
      </section>
      <div class="actions sticky-actions">
        ${button("批量签到", "primary-btn wide", "data-batch-sign")}
        ${button("添加学员", "secondary-btn wide", "data-add-student")}
      </div>
      <div class="actions">
        ${button("完成课程", "secondary-btn wide", "data-complete-course")}
        ${canRevoke(course) ? button("撤回课程", "danger-btn wide", "data-revoke-course") : button("撤回条件不满足", "secondary-btn wide", "data-revoke-disabled")}
      </div>
    </div>
  `;
}

function renderRosterStudent(course, item) {
  const student = byId(students, item.studentId);
  const card = availableCards(student)[0];
  const canOperate = item.relation === "已预约" && course.status !== "已撤回";
  const signAction = item.sign === "已签到" && item.charge === "已扣费" ? button("查看", "secondary-btn wide", `data-student="${student.id}" data-route="studentDetail"`) : button("签到/扣费", "primary-btn wide", `data-sign-student="${student.id}"`);
  return `
    <article class="student-card ${item.relation === "已移除" ? "muted-card" : ""}">
      <div class="student-main">
        <div class="avatar small">${student.avatar}</div>
        <div><h3>${student.name}</h3><p>${student.phone.slice(-4)} · ${card?.name || "暂无可用课程卡"}</p></div>
        <div class="chip-row">${tag(item.relation, toneForStatus(item.relation))}${tag(item.sign, toneForStatus(item.sign))}${tag(item.charge, toneForStatus(item.charge))}</div>
      </div>
      <div class="info-grid">
        ${info("课程卡剩余", card ? `${card.remain}/${card.total} 节` : "-")}
        ${info("有效期", card?.expire || "-")}
      </div>
      <p class="meta">${item.note}</p>
      <div class="actions">
        ${canOperate ? signAction + button("学员请假", "secondary-btn wide", `data-leave-student="${student.id}"`) + button("移除", "secondary-btn wide", `data-remove-student="${student.id}"`) : button("查看学员", "secondary-btn wide", `data-student="${student.id}" data-route="studentDetail"`)}
      </div>
    </article>
  `;
}

function renderMine() {
  const store = currentStore();
  const storeOrders = orders.filter((order) => order.storeId === state.storeId);
  return `
    <div class="stack">
      <section class="profile-card">
        <div class="profile-row">
          <div class="avatar">周</div>
          <div><h2>周明</h2><p>${store.role} · 当前门店：${store.name}</p></div>
        </div>
      </section>
      <button class="menu-row" data-route="storeSwitch" type="button"><span>店</span><strong>门店切换</strong><em>›</em></button>
      <button class="menu-row" data-route="classRecords" type="button"><span>课</span><strong>我的上课记录</strong><em>›</em></button>
      <button class="menu-row" data-route="studentOrders" type="button"><span>单</span><strong>我的学员订单</strong><em>${storeOrders.length}</em></button>
      <button class="menu-row" data-route="logs" type="button"><span>记</span><strong>操作日志</strong><em>${state.logs.length}</em></button>
      <section class="card card-pad">
        <div class="card-title"><h2>权限说明</h2>${tag("V1.0 范围", "blue")}</div>
        <div class="chip-row wrap" style="margin-top:12px">
          ${tag("可查看场地", "green")}
          ${tag("可约课", "green")}
          ${tag("可签到扣费", "green")}
          ${tag("可学员请假", "green")}
          ${tag("可续报订单", "green")}
          ${tag("课程撤回按权限", "orange")}
          ${tag("订单 30 分钟有效", "orange")}
          ${tag("不可改价格", "red")}
        </div>
      </section>
    </div>
  `;
}

function renderStoreSwitch() {
  return `
    <div class="stack">
      ${stores
        .map((store) => `
          <button class="store-option ${store.id === state.storeId ? "active" : ""}" data-store="${store.id}" type="button">
            <div><strong>${store.name}</strong><p>${store.role} · ${store.headCoach ? "可查看当前门店全部课程和订单" : "仅当前门店自己课程"}</p></div>
            ${tag(store.id === state.storeId ? "当前门店" : "切换", store.id === state.storeId ? "blue" : "green")}
          </button>
        `)
        .join("")}
      <section class="card card-pad">
        <div class="card-title"><h2>切换规则</h2>${tag("状态联动", "orange")}</div>
        <p class="meta">切换后，场地、学员、训练、订单、上课记录都会按当前门店刷新；总教练权限也只对当前门店生效。</p>
      </section>
    </div>
  `;
}

function renderClassRecords() {
  const storeCourses = courses.filter((course) => course.storeId === state.storeId);
  const completed = storeCourses.filter((course) => course.status === "已结束").length;
  const abnormal = storeCourses.filter((course) => courseStats(course).abnormal > 0).length;
  return `
    <div class="stack">
      <div class="filter-bar"><button class="chip active" type="button">本月</button><button class="chip" type="button">班课</button><button class="chip" type="button">私教课</button></div>
      <div class="quick-stats">
        <div class="stat"><strong>${completed}</strong><span>已完成</span></div>
        <div class="stat"><strong>${storeCourses.length}</strong><span>课程数</span></div>
        <div class="stat"><strong>${storeCourses.reduce((sum, course) => sum + courseStats(course).signed, 0)}</strong><span>签到数</span></div>
        <div class="stat"><strong>${abnormal}</strong><span>异常数</span></div>
      </div>
      <div class="list">${storeCourses.map((course) => courseCard(course, "查看详情")).join("")}</div>
    </div>
  `;
}

function renderStudentOrders() {
  const list = orders
    .filter((order) => order.storeId === state.storeId)
    .filter((order) => state.orderFilter === "all" || order.status === state.orderFilter);
  return `
    <div class="stack">
      <div class="filter-bar">
        ${["all", "未支付", "已支付", "已超期", "已作废"].map((status) => `<button class="chip ${state.orderFilter === status ? "active" : ""}" data-order-filter="${status}" type="button">${status === "all" ? "全部状态" : status}</button>`).join("")}
      </div>
      <div class="list">${list.map(orderCard).join("") || `<div class="empty">当前状态暂无订单</div>`}</div>
    </div>
  `;
}

function renderLogs() {
  return `
    <div class="stack">
      <section class="card card-pad">
        <div class="card-title"><h2>操作日志</h2>${tag(`${state.logs.length} 条`, "blue")}</div>
        <p class="meta">签到、请假、扣费、移除、撤回、续报订单、重新发起订单和代约课都会在这里留下前端状态记录。</p>
      </section>
      <div class="list">
        ${state.logs.map((item) => recordRow(item.time, item.action, tag(item.store, "blue"), item.detail)).join("") || `<div class="empty">尚未产生操作日志</div>`}
      </div>
    </div>
  `;
}

const renderers = {
  fields: renderFields,
  booking: renderBooking,
  students: renderStudents,
  studentDetail: renderStudentDetail,
  renew: renderRenew,
  payQr: renderPayQr,
  training: renderTraining,
  courseDetail: renderCourseDetail,
  mine: renderMine,
  storeSwitch: renderStoreSwitch,
  classRecords: renderClassRecords,
  studentOrders: renderStudentOrders,
  logs: renderLogs,
};

function render() {
  renderShell();
  appView.innerHTML = renderers[state.route]();
  appView.scrollTop = 0;
}

function currentCourse() {
  return byId(courses, state.selectedCourseId);
}

function rosterItem(studentId) {
  return currentCourse()?.roster.find((item) => item.studentId === studentId);
}

function signAndCharge(studentId) {
  const item = rosterItem(studentId);
  const student = byId(students, studentId);
  const card = availableCards(student)[0];
  if (!item || item.relation !== "已预约") return;
  item.sign = "已签到";
  item.charge = "已扣费";
  item.note = "已完成签到并按后端返回结果扣费";
  if (card && card.remain > 0) {
    card.remain -= 1;
    if (card.remain <= 0) card.status = "已用完";
    else if (card.remain <= 2) card.status = "即将用完";
  }
  student.records.unshift({ date: state.selectedDate, course: currentCourse().title, sign: "已签到", leave: "未请假", charge: "已扣费", card: card?.name || "-" });
  log("单个签到", `${student.name} 已签到，扣费状态：已扣费`);
  showToast(`${student.name} 已签到并扣费`);
}

function createOrder(studentId = state.selectedStudentId, packageId = state.selectedPackageId) {
  const student = byId(students, studentId);
  const pkg = byId(packages, packageId);
  const id = `o${orders.length + 1}`;
  orders.unshift({
    id,
    storeId: state.storeId,
    studentId,
    packageId,
    status: "未支付",
    createdAt: "刚刚",
    payAt: "-",
    initiator: "周教练",
    studentCoach: student.owner,
    cardCoach: pkg.coach,
  });
  state.currentOrderId = id;
  log("续报订单生成", `${student.name} · ${pkg.name} · ${money(pkg.price)}`);
  navigate("payQr");
  showToast("支付二维码已生成");
}

function payOrder(orderId) {
  const order = byId(orders, orderId);
  const student = byId(students, order.studentId);
  const pkg = byId(packages, order.packageId);
  order.status = "已支付";
  order.payAt = "刚刚";
  student.cards.unshift({ id: `card${Date.now()}`, name: pkg.name, level: pkg.level, coach: pkg.coach, course: pkg.course, total: pkg.lessons, remain: pkg.lessons, expire: "2026-11-14", status: "可用" });
  log("订单支付成功", `${student.name} 支付 ${pkg.name}，系统自动开卡`);
  showToast("客户已支付成功，系统已自动开卡");
  render();
}

function expireOrder(orderId) {
  const order = byId(orders, orderId);
  order.status = "已超期";
  log("订单超期", `${byId(students, order.studentId).name} 的订单超过 30 分钟`);
  showToast("订单已超期，二维码失效");
  render();
}

function reissueOrder(orderId) {
  const oldOrder = byId(orders, orderId);
  oldOrder.status = "已作废";
  log("订单作废", `${oldOrder.id} 已作废，准备重新发起`);
  createOrder(oldOrder.studentId, oldOrder.packageId);
}

document.addEventListener("click", (event) => {
  const target = event.target.closest("button, [data-route], [data-student], [data-course], [data-store]");
  if (!target) return;

  if (target.matches("[data-close-dialog]")) {
    closeDialog();
    return;
  }

  const dialogAction = target.dataset.dialogAction;
  if (dialogAction) {
    if (dialogAction === "confirm-sign") signAndCharge(dialogActions.dataset.studentId);
    if (dialogAction === "confirm-batch") {
      currentCourse().roster.filter((item) => item.relation === "已预约" && (item.sign !== "已签到" || item.charge !== "已扣费")).forEach((item) => signAndCharge(item.studentId));
    }
    if (dialogAction === "confirm-leave") {
      const item = rosterItem(dialogActions.dataset.studentId);
      const student = byId(students, dialogActions.dataset.studentId);
      item.relation = "已请假";
      item.charge = item.charge === "已扣费" ? "已退还" : "无需退还";
      item.note = "学员请假结果以后端返回为准";
      student.leaves.unshift({ time: "刚刚", course: currentCourse().title, result: "已通过", detail: `扣费状态：${item.charge}` });
      log("学员请假", `${student.name} 请假，扣费状态：${item.charge}`);
      showToast("学员请假已处理");
    }
    if (dialogAction === "confirm-remove") {
      const item = rosterItem(dialogActions.dataset.studentId);
      const student = byId(students, dialogActions.dataset.studentId);
      item.relation = "已移除";
      item.note = "移除后课程卡与人数占位按现有系统逻辑处理";
      log("移除学员", `${student.name} 已从 ${currentCourse().title} 移除`);
      showToast("学员已移除");
    }
    if (dialogAction === "confirm-revoke") {
      currentCourse().status = "已撤回";
      log("课程撤回", `${currentCourse().title} 已撤回，场地库存按系统规则释放`);
      showToast("课程已撤回");
    }
    closeDialog();
    render();
    return;
  }

  if (target.dataset.store) {
    state.storeId = target.dataset.store;
    state.selectedCourseId = courses.find((course) => course.storeId === state.storeId)?.id;
    state.selectedStudentId = students.find((student) => student.storeId === state.storeId)?.id;
    state.currentOrderId = orders.find((order) => order.storeId === state.storeId)?.id;
    log("门店切换", `已切换至 ${currentStore().name}`);
    showToast(`已切换至${currentStore().name}`);
    render();
    return;
  }

  if (target.dataset.student) state.selectedStudentId = target.dataset.student;
  if (target.dataset.course) state.selectedCourseId = target.dataset.course;
  if (target.dataset.order) state.currentOrderId = target.dataset.order;
  if (target.dataset.slot) state.selectedFieldId = target.dataset.slot;

  if (target.dataset.fieldDate) {
    state.selectedFieldDate = target.dataset.fieldDate;
    render();
    return;
  }
  if (target.dataset.fieldType) {
    state.selectedFieldType = target.dataset.fieldType;
    render();
    return;
  }
  if (target.dataset.date) {
    state.selectedDate = target.dataset.date;
    render();
    return;
  }
  if (target.dataset.studentScope) {
    state.studentScope = target.dataset.studentScope;
    render();
    return;
  }
  if (target.dataset.cardFilter) {
    state.cardFilter = target.dataset.cardFilter;
    render();
    return;
  }
  if (target.dataset.studentTab) {
    state.selectedStudentTab = target.dataset.studentTab;
    render();
    return;
  }
  if (target.dataset.package) {
    state.selectedPackageId = target.dataset.package;
    render();
    return;
  }
  if (target.dataset.orderFilter) {
    state.orderFilter = target.dataset.orderFilter;
    render();
    return;
  }

  if (target.matches("[data-confirm-booking]")) {
    const slot = byId(fieldSlots, state.selectedFieldId);
    const id = `c${courses.length + 1}`;
    courses.push({ id, storeId: state.storeId, date: state.selectedFieldDate, title: `${slot.type}约课`, time: `${slot.time}-10:00`, field: slot.field, type: "私教课", capacity: 1, cost: 1, coach: "周教练", status: "未开始", roster: [] });
    slot.status = "我的课程";
    slot.courseId = id;
    state.selectedCourseId = id;
    log("代约课", `${slot.field} ${slot.time} 已生成课程记录`);
    navigate("courseDetail");
    showToast("约课成功，已生成课程");
    return;
  }

  if (target.matches("[data-create-order]")) {
    createOrder();
    return;
  }
  if (target.dataset.orderPaid) {
    payOrder(target.dataset.orderPaid);
    return;
  }
  if (target.dataset.orderExpire) {
    expireOrder(target.dataset.orderExpire);
    return;
  }
  if (target.dataset.reissueOrder) {
    reissueOrder(target.dataset.reissueOrder);
    return;
  }

  if (target.dataset.signStudent) {
    const student = byId(students, target.dataset.signStudent);
    dialogActions.dataset.studentId = student.id;
    openDialog(
      "确认签到并扣费",
      `<div class="deduct-box">${info("学员", student.name)}${info("扣费结果", "以后端返回为准")}</div><p class="alert-line">确认后将联动更新签到状态、扣费状态、课程卡剩余课时和学员上课记录。</p>`,
      [
        { key: "cancel", label: "取消", className: "secondary-btn" },
        { key: "confirm-sign", label: "确认签到扣费", className: "primary-btn" },
      ],
    );
    return;
  }
  if (target.dataset.leaveStudent) {
    const student = byId(students, target.dataset.leaveStudent);
    dialogActions.dataset.studentId = student.id;
    openDialog("学员请假", `<p class="meta">将按后台现有请假能力处理 ${student.name} 的请假；若已扣费，退还状态以后端返回为准。</p>`, [
      { key: "cancel", label: "取消", className: "secondary-btn" },
      { key: "confirm-leave", label: "确认请假", className: "primary-btn" },
    ]);
    return;
  }
  if (target.dataset.removeStudent) {
    const student = byId(students, target.dataset.removeStudent);
    dialogActions.dataset.studentId = student.id;
    openDialog("移除学员", `<p class="meta">确认从当前课程移除 ${student.name}？移除后的课程卡处理、人数占位释放按现有系统逻辑执行。</p>`, [
      { key: "cancel", label: "取消", className: "secondary-btn" },
      { key: "confirm-remove", label: "确认移除", className: "danger-btn" },
    ]);
    return;
  }
  if (target.matches("[data-batch-sign]")) {
    openDialog("批量签到", `<p class="meta">将对当前符合条件的学员执行批量签到，是否继续？</p>`, [
      { key: "cancel", label: "取消", className: "secondary-btn" },
      { key: "confirm-batch", label: "继续", className: "primary-btn" },
    ]);
    return;
  }
  if (target.matches("[data-add-student]")) {
    showToast("添加学员入口已保留，具体流程复用现有系统");
    return;
  }
  if (target.matches("[data-complete-course]")) {
    currentCourse().status = "已结束";
    log("完成课程", `${currentCourse().title} 已完成`);
    showToast("课程已完成");
    render();
    return;
  }
  if (target.matches("[data-revoke-course]")) {
    openDialog("撤回课程", `<p class="meta">当前课程内所有学员均未签到、未扣费，符合撤回条件。撤回后课程状态变为“已撤回”。</p>`, [
      { key: "cancel", label: "取消", className: "secondary-btn" },
      { key: "confirm-revoke", label: "确认撤回", className: "danger-btn" },
    ]);
    return;
  }
  if (target.matches("[data-revoke-disabled]")) {
    showToast("课程存在已签到、已扣费、异常或权限不足，不可撤回");
    return;
  }

  if (target.dataset.route) navigate(target.dataset.route);
});

document.addEventListener("input", (event) => {
  if (event.target.id === "studentSearch") {
    state.query = event.target.value.trim();
    render();
  }
});

backBtn.addEventListener("click", () => {
  if (!dialogMask.hidden) {
    closeDialog();
    return;
  }
  const previous = state.history.pop();
  if (previous) navigate(previous, false);
});

dialogMask.addEventListener("click", (event) => {
  if (event.target === dialogMask) closeDialog();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !dialogMask.hidden) closeDialog();
});

render();
