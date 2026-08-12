import React, { useState } from 'react';
import { X, Lock, CheckCircle, Trash2, KeyRound, Ship } from 'lucide-react';
import { PackageData, ShipSchedule } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface StaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoggedIn: boolean;
  onLoginSuccess: () => void;
  onLogout: () => void;
  packages: PackageData[];
  onAddPackage: (pkg: PackageData) => void;
  onUpdatePackageStatus: (resi: string, newStatus: PackageData['status'], newLoc: string) => void;
  schedules: ShipSchedule[];
  onAddSchedule: (sched: ShipSchedule) => void;
  onDeleteSchedule: (id: string) => void;
}

export const StaffModal: React.FC<StaffModalProps> = ({
  isOpen,
  onClose,
  isLoggedIn,
  onLoginSuccess,
  onLogout,
  packages,
  onAddPackage,
  onUpdatePackageStatus,
  schedules,
  onAddSchedule,
  onDeleteSchedule,
}) => {
  const { lang } = useLanguage();

  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'packages' | 'schedules' | 'newPackage'>('packages');

  // Form New Package
  const [newResi, setNewResi] = useState(`NK-${Math.floor(100000 + Math.random() * 900000)}`);
  const [senderName] = useState('');
  const [receiverName, setReceiverName] = useState('');
  const [receiverPhone, setReceiverPhone] = useState('');
  const [destination, setDestination] = useState('Sofifi');
  const [weightKg, setWeightKg] = useState('5');
  const [shipName] = useState('KM Speedboat Express');

  // Form New Schedule
  const [schedShipName, setSchedShipName] = useState('KM Speedboat Express');
  const [schedOrigin, setSchedOrigin] = useState('Ternate');
  const [schedDest, setSchedDest] = useState('Sofifi');
  const [schedDeptDate, setSchedDeptDate] = useState('12 Agustus 2026');
  const [schedClosingDate, setSchedClosingDate] = useState('10 Agustus 2026 (18:00 WIB)');
  const [schedStatus, setSchedStatus] = useState<ShipSchedule['status']>('Buka Cargo');

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'nusakirim.123' || password === '123456' || password === 'admin' || password === 'andri') {
      onLoginSuccess();
      setLoginError('');
      setPassword('');
    } else {
      setLoginError(lang === 'zh' ? '密码错误，请重试' : 'Password salah. Silakan coba lagi.');
    }
  };

  const handleCreatePackageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!receiverName || !destination) return;

    const w = parseFloat(weightKg) || 5;
    const priceMap: Record<string, number> = {
      Ternate: 6500,
      Tobelo: 8500,
      Sofifi: 7500,
      Sanana: 9500,
      Labuha: 9000,
      Morotai: 10000,
    };
    const rate = priceMap[destination] || 8000;
    const totalCost = w * rate;

    const newPkg: PackageData = {
      resi: newResi,
      senderName: senderName || 'Shopee / Jastip Admin',
      receiverName,
      receiverPhone: receiverPhone || '0812-xxxx-xxxx',
      destination,
      weightKg: w,
      totalCost,
      status: 'Di Gudang Ternate',
      shipName,
      currentLocation: 'Gudang Ternate',
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      estimatedArrival: '7 Hari Kerja',
      history: [
        {
          timestamp: new Date().toISOString().slice(0, 16).replace('T', ' '),
          status: 'Di Gudang Ternate',
          location: 'Gudang Ternate',
          description: 'Resi baru dibuat & ditempel pada kargo',
        },
      ],
    };

    onAddPackage(newPkg);
    setActiveTab('packages');
    setNewResi(`NK-${Math.floor(100000 + Math.random() * 900000)}`);
    setReceiverName('');
    setReceiverPhone('');
  };

  const handlePublishSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!schedShipName || !schedOrigin || !schedDest) return;

    const newSched: ShipSchedule = {
      id: Date.now().toString(),
      shipName: schedShipName,
      origin: schedOrigin,
      destination: schedDest,
      departureDate: schedDeptDate || 'Sesuai Jadwal',
      arrivalEstimate: '1-2 Hari',
      closingCargoDate: schedClosingDate || 's/d Hari H',
      status: schedStatus,
    };
    onAddSchedule(newSched);
    setSchedShipName('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-5 text-left text-slate-800 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-all cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {!isLoggedIn ? (
          /* Login Form */
          <div className="py-4 space-y-4">
            <div className="text-center">
              <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto mb-3">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-extrabold text-slate-900">
                {lang === 'zh' ? '员工/管理员登录 Staff Login' : 'Login Staff NK EXPRESS'}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {lang === 'zh' ? '仓库管理员专用后台，用于录入运单和发布船期。' : 'Akses khusus admin gudang untuk input resi & publikasi jadwal kapal.'}
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-3.5 max-w-sm mx-auto">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  {lang === 'zh' ? '管理员密码' : 'Password Admin / Staff'}
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={lang === 'zh' ? '请输入管理员密码' : 'Masukkan password staff'}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              {loginError && (
                <p className="text-xs text-red-600 font-medium bg-red-50 p-2 rounded-lg border border-red-200">
                  {loginError}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold text-xs py-3 rounded-xl shadow-md transition-all cursor-pointer"
              >
                {lang === 'zh' ? '进入员工后台' : 'Masuk Dashboard Staff'}
              </button>
            </form>
          </div>
        ) : (
          /* Staff Dashboard */
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>{lang === 'zh' ? '物流员工后台 Dashboard' : 'Dashboard Staff Logistik'}</span>
                </h3>
                <p className="text-[10px] text-red-600 font-medium">Logged in as Admin NK EXPRESS</p>
              </div>
              <button
                onClick={onLogout}
                className="text-[11px] text-red-600 hover:text-red-700 font-semibold px-2.5 py-1 bg-red-50 rounded-lg border border-red-200 cursor-pointer"
              >
                {lang === 'zh' ? '退出登录' : 'Logout'}
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 border-b border-slate-100 pb-3 mb-4 text-xs font-semibold overflow-x-auto">
              <button
                onClick={() => setActiveTab('packages')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'packages'
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {lang === 'zh' ? `运单列表 (${packages.length})` : `Daftar Resi (${packages.length})`}
              </button>
              <button
                onClick={() => setActiveTab('newPackage')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'newPackage'
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {lang === 'zh' ? '+ 新建运单' : '+ Buat Resi Baru'}
              </button>
              <button
                onClick={() => setActiveTab('schedules')}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeTab === 'schedules'
                    ? 'bg-red-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {lang === 'zh' ? '发布船期' : 'Publikasi Jadwal Kapal'}
              </button>
            </div>

            {/* Tab 1: Packages List */}
            {activeTab === 'packages' && (
              <div className="space-y-3">
                {packages.map((pkg) => (
                  <div key={pkg.resi} className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-mono font-bold text-red-600 text-sm">{pkg.resi}</span>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">{pkg.status}</span>
                    </div>
                    <div className="text-slate-700 text-[11px] grid grid-cols-2 gap-1">
                      <p>Penerima: <strong>{pkg.receiverName}</strong></p>
                      <p>Tujuan: <strong>{pkg.destination}</strong></p>
                      <p>Berat: {pkg.weightKg} kg</p>
                      <p>Kapal: {pkg.shipName || 'Pelni'}</p>
                    </div>

                    {/* Quick Update Status */}
                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between gap-2">
                      <span className="text-[10px] text-slate-500 font-medium">{lang === 'zh' ? '更新状态:' : 'Ubah Status:'}</span>
                      <select
                        value={pkg.status}
                        onChange={(e) =>
                          onUpdatePackageStatus(
                            pkg.resi,
                            e.target.value as PackageData['status'],
                            e.target.value === 'Dalam Pelayaran' ? `Kapal ${pkg.shipName}` : 'Tiba Agen Cabang'
                          )
                        }
                        className="bg-white border border-slate-300 text-slate-800 text-[10px] px-2 py-1 rounded focus:outline-none focus:border-red-500"
                      >
                        <option value="Di Gudang Ternate">Di Gudang Ternate</option>
                        <option value="Proses Muat Kapal">Proses Muat Kapal</option>
                        <option value="Dalam Pelayaran">Dalam Pelayaran</option>
                        <option value="Tiba di Port Tujuan">Tiba di Port Tujuan</option>
                        <option value="Siap Diambil">Siap Diambil</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: New Package Form */}
            {activeTab === 'newPackage' && (
              <form onSubmit={handleCreatePackageSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-medium mb-1">
                    {lang === 'zh' ? '自动生成运单号' : 'Nomor Resi Auto-generated'}
                  </label>
                  <input
                    type="text"
                    value={newResi}
                    readOnly
                    className="w-full bg-slate-100 border border-slate-300 rounded-xl px-3 py-2 text-red-600 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-medium mb-1">
                    {lang === 'zh' ? '收货人姓名与电话' : 'Nama Penerima & HP'}
                  </label>
                  <input
                    type="text"
                    required
                    value={receiverName}
                    onChange={(e) => setReceiverName(e.target.value)}
                    placeholder="Contoh: Siti Rahma"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 placeholder-slate-400 mb-2 focus:bg-white focus:outline-none focus:border-red-500"
                  />
                  <input
                    type="text"
                    value={receiverPhone}
                    onChange={(e) => setReceiverPhone(e.target.value)}
                    placeholder="No. HP Penerima (0812...)"
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">
                      {lang === 'zh' ? '目的城市' : 'Kota Tujuan'}
                    </label>
                    <select
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:outline-none focus:border-red-500"
                    >
                      <option value="Ternate">Ternate</option>
                      <option value="Sofifi">Sofifi</option>
                      <option value="Tobelo">Tobelo</option>
                      <option value="Sanana">Sanana</option>
                      <option value="Labuha">Labuha</option>
                      <option value="Morotai">Morotai</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-700 font-medium mb-1">
                      {lang === 'zh' ? '重量 (kg)' : 'Berat (kg)'}
                    </label>
                    <input
                      type="number"
                      value={weightKg}
                      onChange={(e) => setWeightKg(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-500 text-white font-semibold py-2.5 rounded-xl shadow-md mt-2 cursor-pointer transition-all"
                >
                  {lang === 'zh' ? '保存并发布运单' : 'Simpan & Terbitkan Resi'}
                </button>
              </form>
            )}

            {/* Tab 3: Publish Ship Schedule */}
            {activeTab === 'schedules' && (
              <div className="space-y-4 text-xs">
                <form onSubmit={handlePublishSchedule} className="space-y-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                  <h4 className="font-bold text-slate-900 flex items-center gap-1">
                    <Ship className="w-4 h-4 text-red-600" /> {lang === 'zh' ? '新增船期表单' : 'Form Tambah Jadwal Kapal'}
                  </h4>

                  <div>
                    <label className="block text-slate-600 mb-1 font-semibold">{lang === 'zh' ? '船名' : 'Nama Kapal / Armada'}</label>
                    <input
                      type="text"
                      required
                      value={schedShipName}
                      onChange={(e) => setSchedShipName(e.target.value)}
                      placeholder="Contoh: KM Speedboat Express / KM Nggapulu"
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 font-medium"
                    />
                  </div>

                  {/* Origin & Destination route inputs */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-600 mb-1 font-semibold">{lang === 'zh' ? '始发港 / 城市' : 'Rute Asal (Origin)'}</label>
                      <input
                        type="text"
                        required
                        value={schedOrigin}
                        onChange={(e) => setSchedOrigin(e.target.value)}
                        placeholder="Contoh: Ternate / Jakarta"
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 mb-1 font-semibold">{lang === 'zh' ? '目的港 / 城市' : 'Rute Tujuan (Destination)'}</label>
                      <input
                        type="text"
                        required
                        value={schedDest}
                        onChange={(e) => setSchedDest(e.target.value)}
                        placeholder="Contoh: Sofifi / Ternate"
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 font-bold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-slate-600 mb-1">{lang === 'zh' ? '发航日期' : 'Tgl Berangkat'}</label>
                      <input
                        type="text"
                        value={schedDeptDate}
                        onChange={(e) => setSchedDeptDate(e.target.value)}
                        placeholder="12 Agustus 2026 / Setiap Hari"
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-600 mb-1">{lang === 'zh' ? '截单时间' : 'Closing Cargo Gudang'}</label>
                      <input
                        type="text"
                        value={schedClosingDate}
                        onChange={(e) => setSchedClosingDate(e.target.value)}
                        placeholder="10 Agustus 2026 (18:00 WIB)"
                        className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 mb-1">{lang === 'zh' ? '船期状态' : 'Status Pelayaran'}</label>
                    <select
                      value={schedStatus}
                      onChange={(e) => setSchedStatus(e.target.value as ShipSchedule['status'])}
                      className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-900 focus:outline-none focus:border-red-500 font-medium"
                    >
                      <option value="Buka Cargo">Buka Cargo</option>
                      <option value="Sedang Muat">Sedang Muat</option>
                      <option value="Berlayar">Berlayar</option>
                      <option value="Akan Datang">Akan Datang</option>
                      <option value="Selesai">Selesai</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2.5 rounded-lg cursor-pointer transition-all shadow-md active:scale-95 text-xs"
                  >
                    {lang === 'zh' ? '发布船期到官网' : 'Publikasikan Jadwal Kapal Live'}
                  </button>
                </form>

                {/* Schedule list */}
                <div className="space-y-2">
                  <p className="font-bold text-slate-800">{lang === 'zh' ? `当前生效船期 (${schedules.length}):` : `Jadwal yang Sedang Aktif (${schedules.length}):`}</p>
                  {schedules.map((sc) => (
                    <div key={sc.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <p className="font-bold text-slate-900 text-sm">{sc.shipName}</p>
                          <span className="text-[10px] bg-red-50 text-red-600 font-bold px-1.5 py-0.5 rounded border border-red-200">{sc.status}</span>
                        </div>
                        <p className="text-[11px] font-extrabold text-red-600 mt-0.5">
                          Rute: {sc.origin} → {sc.destination}
                        </p>
                        <p className="text-[10px] text-slate-500 mt-0.5">
                          Berangkat: {sc.departureDate} • Closing: {sc.closingCargoDate}
                        </p>
                      </div>
                      <button
                        onClick={() => onDeleteSchedule(sc.id)}
                        className="p-1.5 text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg border border-red-200 cursor-pointer transition-colors"
                        title="Hapus Jadwal"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

