# HelpIN – Website (Vite + React + TS + Tailwind)

![Status](https://img.shields.io/badge/status-draft-lightgrey)
![Stack](https://img.shields.io/badge/stack-Vite%20%7C%20React%20%7C%20TypeScript%20%7C%20Tailwind-informational)

> Repo frontend HelpIN berbasis **Vite + React + TypeScript + TailwindCSS**. Dokumen ini menjelaskan struktur project, cara menjalankan, standar kode, serta _conventions_ komponen & halaman yang ada pada folder `src/` (Layout, Context, Pages, Types).

---

## 🔍 Ringkasan Teknis
- **Bundler/Dev Server**: Vite
- **UI Library**: React (TS)
- **Styling**: TailwindCSS + PostCSS
- **State**: React Context API (`src/context/AppContext.tsx`)
- **Linting**: ESLint (lihat `eslint.config.js`)
- **Konfigurasi**: `tsconfig*.json`, `tailwind.config.js`, `postcss.config.js`, `vite.config.ts`

---

## 📂 Struktur Proyek (berdasarkan repo saat ini)
```
HelpIn/
├─ src/
│  ├─ components/
│  │  └─ Layout/
│  │     ├─ Footer.tsx
│  │     ├─ Header.tsx
│  │     └─ Layout.tsx
│  ├─ context/
│  │  └─ AppContext.tsx
│  ├─ pages/
│  │  ├─ About.tsx
│  │  ├─ Contact.tsx
│  │  ├─ Dashboard.tsx
│  │  ├─ Home.tsx
│  │  ├─ ProviderProfile.tsx
│  │  └─ Search.tsx
│  ├─ types/
│  │  └─ index.ts
│  ├─ App.tsx
│  ├─ index.css
│  ├─ main.tsx
│  └─ vite-env.d.ts
├─ index.html
├─ package.json
├─ eslint.config.js
├─ tailwind.config.js
├─ postcss.config.js
├─ tsconfig.json
├─ tsconfig.app.json
├─ tsconfig.node.json
└─ vite.config.ts
```

> Dokumen pendukung: `HelpIn_Bedenks Project Canvas.docx`, `HelpIn_Project Proposal.doc`, `HelpIn_UIUX Design.docx` (simpatkan di folder `/docs` untuk rapi).

---

## 🧪 Prasyarat
- Node.js ≥ 18
- npm / pnpm / yarn

---

## ⚙️ Variabel Lingkungan
Buat file `.env` di root project untuk konfigurasi lintas lingkungan.
Contoh (sesuaikan):

```
# Base URL API backend
VITE_API_BASE_URL=http://localhost:4000

# Kunci publik (jika ada layanan pihak ketiga)
VITE_MAPS_KEY=
```

> Semua variabel yang dibaca oleh Vite **harus** diawali `VITE_`.

---

## 🏃 Menjalankan Proyek
```bash
# instal dependensi
npm install

# development
npm run dev

# production build
npm run build

# preview build produksi secara lokal
npm run preview

# lint (jika tersedia di scripts)
npm run lint
```

Akses dev server: `http://localhost:5173` (default Vite).

---

## 🧱 Arsitektur UI (ringkas)
- **Layout global**: `src/components/Layout/Layout.tsx` (membungkus halaman dengan `Header` + `Footer`).
- **Routing**: Jika menggunakan React Router v6, definisikan rute di `App.tsx` (atau file router terpisah). Contoh minimal:
  ```tsx
  import { BrowserRouter, Routes, Route } from 'react-router-dom';
  import Home from './pages/Home';
  import Search from './pages/Search';
  import ProviderProfile from './pages/ProviderProfile';

  export default function App() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/provider/:id' element={<ProviderProfile />} />
        </Routes>
      </BrowserRouter>
    );
  }
  ```
- **State Global**: `AppContext.tsx` – gunakan untuk state lintas halaman (mis. user session ringan, filter pencarian). Hindari menyimpan data sensitif di frontend.

---

## 🧩 Konvensi Kode
- **Penamaan**: Komponen `PascalCase`, hooks `useCamelCase`.
- **Struktur**: Satu komponen = satu file; komponen kompleks boleh punya subfolder.
- **TypeScript**: tipe bersama di `src/types/index.ts`.
- **Style**: Tailwind utility-first; ekstrak kelas berulang menjadi komponen UI.
- **Import**: gunakan relatif dari `src` (opsional set alias `@/*` melalui `tsconfig` & `vite.config.ts`).

---

## 🎨 Tailwind & PostCSS
- Atur tema/extend di `tailwind.config.js`.
- Pastikan `index.css` memuat direktif inti:
  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

---

## 🔒 Keamanan (Frontend)
- Jangan hardcode secrets (gunakan `VITE_` untuk **public config** saja).
- Validasi input di UI; sanitasi data render (hindari `dangerouslySetInnerHTML`).
- Gunakan HTTPS saat memanggil API di produksi.
- Jika ada autentikasi, simpan token di memory/httponly cookie (hindari `localStorage` untuk token sensitif).

---

## 🚀 Deploy
- **Output build**: `dist/`
- **Static hosting**: Vercel/Netlify/Cloudflare Pages → arahkan ke `dist`.
- **Server Nginx**: salin konten `dist` ke root web; aktifkan gzip/brotli; fallback ke `index.html` untuk SPA:
  ```nginx
  location / {
    try_files $uri /index.html;
  }
  ```

---

## 🧭 Peta Halaman Saat Ini
- `/` → `Home.tsx`
- `/search` → `Search.tsx`
- `/provider/:id` → `ProviderProfile.tsx`
- `/dashboard` → `Dashboard.tsx`
- `/about` → `About.tsx`
- `/contact` → `Contact.tsx`

> Rute dapat berbeda jika router belum diaktifkan. Sesuaikan contoh di atas.

---

## 🧱 Checklist Kualitas (Dev)
- [ ] Komponen bebas warning TypeScript dan ESLint.
- [ ] Responsif (mobile-first) & aksesibilitas dasar (label, alt, kontrast).
- [ ] Halaman memuat < 2s pada jaringan 3G cepat untuk konten awal.
- [ ] Tidak ada _unused deps_ di `package.json`.
- [ ] `.env.example` tersedia untuk developer lain.

---

## 🤝 Kontribusi
1. Buat branch `feat/nama-fitur` atau `fix/isu-xyz`.
2. Tulis deskripsi PR (tujuan, perubahan, cara uji).
3. Pastikan lint & build lulus.

---

## 📄 Lisensi
MIT (atau sesuai keputusan repo).

---

## 📎 Terkait Dokumen
- Proposal/Canvas/UIUX simpan di `/docs` dan rujuk di README root repositori utama.
