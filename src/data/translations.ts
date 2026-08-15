export type Language = 'id' | 'zh';

export const translations = {
  id: {
    // Navbar
    appTitle: 'NK EXPRESS',
    appSubtitle: 'Logistik Jastip Jakarta - Ternate - Sofifi',
    langButton: '🇮🇩 ID',
    staffLogin: 'Login Staff',
    staffActive: 'Staff Active',
    
    // Hero Section
    heroBadge: 'Logistik Terpercaya Maluku Utara & Jastip',
    heroTitle: 'Kirim Paket Hemat Jakarta ke Maluku Utara',
    heroTitleLine1: 'Kirim Paket Hemat',
    heroTitleLine2: 'Jakarta ke Maluku Utara',
    heroDesc: 'Solusi Jastip Shopee & TikTok tanpa pusing ongkir mahal. Layanan kargo laut resmi, aman, dan transparan sampai tujuan',
    trackingBoxTitle: 'Cek resi dan pengiriman barang Jastip',
    searchPlaceholder: 'Masukkan nomor resi atau nama penerima...',
    searchBtn: 'Lacak Paket',
    sampleResiLabel: 'Contoh Resi:',
    
    // Quick Stats / Badges
    statSpeed: 'Pengiriman Cepat',
    statSpeedDesc: 'Jakarta-Ternate-Sofifi',
    statSafe: '100% Aman',
    statSafeDesc: 'Garansi & Bebas Khawatir',
    statJastip: 'Jastip China',
    statJastipDesc: 'Alamat Gudang Taobao/1688',

    // Jadwal Kapal
    scheduleTitle: 'Jadwal Keberangkatan Kapal',
    scheduleSubtitle: 'Update real-time jadwal kapal rute Ternate - Sofifi',
    shipName: 'Nama Kapal',
    route: 'Rute',
    departure: 'Keberangkatan',
    arrival: 'Perkiraan Tiba',
    status: 'Status',
    capacity: 'Kapasitas',
    refreshBtn: 'Segarkan Jadwal',
    statusOnTime: 'Tepat Waktu',
    statusDelayed: 'Tertunda',
    statusDeparted: 'Sudah Berlayar',

    // Alat Bantu Pengiriman
    toolsTitle: 'Alat Bantu Pengiriman',
    cekOngkirTitle: 'Kalkulator Cek Ongkir',
    cekOngkirDesc: 'Hitung estimasi biaya pengiriman barang & karung',
    destinationLabel: 'Tujuan Pengiriman',
    packageTypeLabel: 'Jenis Paket',
    typeKg: 'Per Kg (Barang Kecil)',
    typeKarung: 'Karung / Dus Medium',
    typeBesar: 'Karung Besar / Alat Berat',
    weightLabel: 'Berat / Jumlah (Kg / Unit)',
    calcBtn: 'Hitung Biaya',
    estimatedCost: 'Estimasi Biaya Ongkir',
    notes: 'Catatan Ongkir',
    ongkirNote: 'Harga sudah termasuk garansi muatan dasar. Hubungi admin untuk tarif khusus grosir.',

    // Label Alamat Gudang Jastip China
    jastipLabelTitle: '📝 Buat Label Alamat Jastip',
    jastipLabelDesc: 'Isi data diri Anda di bawah, lalu klik Salin Alamat.',
    copyAddressBtn: 'Salin Alamat Gudang',
    copiedBtn: 'Tersalin!',
    consigneeLabel: 'Nama Penerima (Consignee):',
    addressLabel: 'Alamat Gudang China:',
    phoneLabel: 'No. HP / WeChat Gudang:',
    postcodeLabel: 'Kode Pos:',

    // Cara Mengirim
    howToTitle: 'Cara Mengirim Paket',
    howToSubtitle: '4 Langkah Mudah Mengirim Paket Bersama NK EXPRESS',
    step1Title: '1. Antar Paket',
    step1Desc: 'Bawa paket Anda ke Pos/Gudang NK EXPRESS.',
    step2Title: '2. Terima Resi',
    step2Desc: 'Petugas akan menimbang paket dan memberikan Kode Resi Pengiriman.',
    step3Title: '3. Kapal Berlayar',
    step3Desc: 'Paket dimuat ke kapal cepat sesuai jadwal keberangkatan harian.',
    step4Title: '4. Paket Diterima',
    step4Desc: 'Penerima mengambil paket di gudang tujuan atau diantar kurir lokal.',

    // Footer
    footerDesc: 'Layanan Pengiriman Cepat & Terpercaya Maluku Utara.',
    quickLinks: 'Tautan Cepat',
    contactUs: 'Hubungi Kami',
    officeAddress: 'Jl. Pelabuhan Bastiong, Ternate Selatan, Maluku Utara',
    rights: 'Hak Cipta Dilindungi.',
    totalVisitors: 'Total Pengunjung Website',
    totalVisitorsDesc: 'Kunjungan & Pelanggan Terlayani',
    systemOnline: 'Online',

    // Tracking Modal
    trackingTitle: 'Detail Pelacakan Paket',
    resiNo: 'Nomor Resi',
    sender: 'Pengirim',
    receiver: 'Penerima',
    destination: 'Tujuan',
    currentStatus: 'Status Saat Ini',
    historyTitle: 'Riwayat Perjalanan Paket',
    closeBtn: 'Tutup',
    notFoundTitle: 'Paket Tidak Ditemukan',
    notFoundDesc: 'Nomor resi atau nama penerima yang Anda cari tidak ada dalam sistem.',

    // Staff Modal
    staffTitle: 'Dashboard Staff NK EXPRESS',
    loginTitle: 'Masuk Akses Staff',
    passwordPlaceholder: 'Masukkan password (123456 / nusakirim.123)',
    loginBtn: 'Masuk Staff',
    logoutBtn: 'Keluar Staff',
    tabPackages: 'Kelola Paket & Resi',
    tabSchedules: 'Kelola Jadwal Kapal',
    addPackageBtn: 'Tambah Paket Baru',
    addScheduleBtn: 'Tambah Jadwal Kapal',

    // AI Chat
    aiChatTitle: 'CS Asisten AI NK EXPRESS',
    aiChatSubtitle: 'Tanya ongkir, jadwal kapal, & panduan jastip China 24/7',
    chatPlaceholder: 'Ketik pertanyaan Anda di sini...',

    // Quick Menu
    quickMenuTitle: 'Lokasi Gudang & Kontak',
  },
  zh: {
    // Navbar
    appTitle: 'NK EXPRESS (努萨物流)',
    appSubtitle: '雅加达 - 特尔纳特 - 索菲菲 海运集运专线',
    langButton: '🇨🇳 中文',
    staffLogin: '员工登录',
    staffActive: '员工在线',

    // Hero Section
    heroBadge: '北马鲁古专业物流 & 代购集运专线',
    heroTitle: '雅加达至北马鲁古经济特快专线',
    heroTitleLine1: '经济特快专线',
    heroTitleLine2: '雅加达至北马鲁古',
    heroDesc: 'Shopee & TikTok 代购代运无忧方案，告别昂贵运费。官方正规海运，安全透明直达目的地。',
    trackingBoxTitle: '查询单号及代购集运转运包裹',
    searchPlaceholder: '输入运单号或收件人姓名...',
    searchBtn: '查询包裹',
    sampleResiLabel: '示例单号:',

    // Quick Stats / Badges
    statSpeed: '快速运输',
    statSpeedDesc: '每日往返特尔纳特-索菲菲',
    statSafe: '100% 运输安全',
    statSafeDesc: '包裹全额保险 & 破损包赔',
    statJastip: '中国代购集运',
    statJastipDesc: '提供淘宝/1688中国仓库地址',

    // Jadwal Kapal
    scheduleTitle: '船只发航时间表',
    scheduleSubtitle: '特尔纳特 - 索菲菲 航线实时船期更新',
    shipName: '船名',
    route: '航线',
    departure: '离港时间',
    arrival: '预计到达',
    status: '状态',
    capacity: '载重/容量',
    refreshBtn: '刷新船期',
    statusOnTime: '准时',
    statusDelayed: '延误',
    statusDeparted: '已起航',

    // Alat Bantu Pengiriman
    toolsTitle: '运费计算与实用工具',
    cekOngkirTitle: '运费快速计算器',
    cekOngkirDesc: '计算普通货物与包裹的预估运费',
    destinationLabel: '目的地',
    packageTypeLabel: '包裹类型',
    typeKg: '按公斤 (小件包裹)',
    typeKarung: '编织袋 / 中型纸箱',
    typeBesar: '大编织袋 / 重型设备',
    weightLabel: '重量 / 数量 (Kg / 件)',
    calcBtn: '计算运费',
    estimatedCost: '预估运费金额',
    notes: '运费说明',
    ongkirNote: '包含基础运输保险。如需批发或大宗运输，请联系客服。',

    // Label Alamat Gudang Jastip China
    jastipLabelTitle: '📝 生成代购转运地址标签',
    jastipLabelDesc: '请在下方填写您的信息，然后点击复制地址。',
    copyAddressBtn: '复制仓库地址',
    copiedBtn: '已复制!',
    consigneeLabel: '收货人姓名:',
    addressLabel: '中国仓库地址:',
    phoneLabel: '仓库电话 / 微信:',
    postcodeLabel: '邮政编码:',

    // Cara Mengirim
    howToTitle: '寄件流程说明',
    howToSubtitle: 'NK EXPRESS 轻松寄件 4 步流程',
    step1Title: '1. 送交包裹',
    step1Desc: '将包裹送至 NK EXPRESS 仓库。',
    step2Title: '2. 获取运单号',
    step2Desc: '工作人员称重核算后将生成专属快递运单号。',
    step3Title: '3. 船只运输',
    step3Desc: '包裹将按每日船期装船发往目的地。',
    step4Title: '4. 签收包裹',
    step4Desc: '收件人至目的地仓库提取或由本地快递送货上门。',

    // Footer
    footerDesc: '北马鲁古省快速可靠的海运物流服务。',
    quickLinks: '快捷链接',
    contactUs: '联系我们',
    officeAddress: '印尼北马鲁古省南特尔纳特 Bastiong 港口路',
    rights: '版权所有。',
    totalVisitors: '网站总访问量',
    totalVisitorsDesc: '累计访客与服务客户',
    systemOnline: '在线',

    // Tracking Modal
    trackingTitle: '包裹追踪详情',
    resiNo: '运单号',
    sender: '发件人',
    receiver: '收件人',
    destination: '目的地',
    currentStatus: '当前状态',
    historyTitle: '物流运输轨迹',
    closeBtn: '关闭',
    notFoundTitle: '未找到包裹记录',
    notFoundDesc: '您输入的运单号或收件人姓名在系统中未找到。',

    // Staff Modal
    staffTitle: 'NK EXPRESS 员工管理后台',
    loginTitle: '员工登录',
    passwordPlaceholder: '输入密码 (123456 / nusakirim.123)',
    loginBtn: '登录后台',
    logoutBtn: '退出登录',
    tabPackages: '包裹与运单管理',
    tabSchedules: '船期表管理',
    addPackageBtn: '添加新包裹',
    addScheduleBtn: '添加新船期',

    // AI Chat
    aiChatTitle: 'NK EXPRESS AI 智能客服',
    aiChatSubtitle: '24小时在线解答运费、船期及中国集运问题',
    chatPlaceholder: '请输入您的问题...',

    // Quick Menu
    quickMenuTitle: '仓库地址与联系方式',
  }
};
