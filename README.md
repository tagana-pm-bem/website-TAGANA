# 🗺️ TAGANA - PETA Bencana Desa Sriharjo

Sistem informasi berbasis web untuk pemetaan risiko bencana dan manajemen data kependudukan di Desa Sriharjo. Dibangun dengan **Next.js 15**, **React 19**, **Leaflet**, dan **Tailwind CSS**.

---

## 📋 Daftar Isi

- [Tentang Project](#tentang-project)
- [Tech Stack](#tech-stack)
- [Fitur Utama](#fitur-utama)
- [Project Structure](#project-structure)
- [Panduan Setup](#panduan-setup)
- [Arsitektur Next.js](#arsitektur-nextjs)
- [Best Practices](#best-practices)

---

## 🎯 Tentang Project

**TAGANA (Tim Adaptasi Bencana)** adalah platform web yang membantu Desa Sriharjo:
- 📍 Memetakan zona risiko bencana (banjir, tanah longsor, gempa, dll)
- 👥 Mengelola data kependudukan dan RT/RW
- 📰 Menyebarkan berita dan informasi bencana
- 📊 Menyajikan dashboard dan statistik
- ⚠️ Memberikan peringatan dini bencana

### Target User
- **Admin**: Kelola data, berita, event
- **Public**: Lihat peta risiko, berita, detail dusun
- **TAGANA Team**: Monitor & koordinasi

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 15.5.6 (App Router) |
| **UI Library** | React 19.1.0 |
| **Styling** | Tailwind CSS 4 |
| **Maps** | Leaflet 1.9.4 + react-leaflet 5.0.0 |
| **Language** | TypeScript 5.9.3 |
| **Build** | Turbopack |

---

## ✨ Fitur Utama

### 🌍 Public
- **Peta Interaktif**: Zona risiko dengan satellite view
- **Berita Bencana**: Feed dengan filter kategori & status
- **Detail Dusun**: Info lengkap (demografi, RT, risiko, koordinat)
- **Responsive**: Desktop, tablet, mobile

### 🔧 Admin
- **Dashboard**: Statistik & aktivitas
- **Manajemen Berita**: CRUD berita
- **Data Dusun**: Edit data & bencana
- **Kalender Event**: Manajemen event
- **Data Kependudukan**: Kelola penduduk
- **Pengaturan**: Konfigurasi sistem

---

## 📂 Project Structure

```
website-TAGANA/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root + Providers
│   │   ├── page.tsx                # Homepage
│   │   ├── auth/                   # Login pages
│   │   ├── admin/                  # Admin dashboard
│   │   │   ├── layout.tsx          # Sidebar layout
│   │   │   ├── dashboard/
│   │   │   ├── berita/
│   │   │   ├── data-dusun/
│   │   │   ├── kalender/
│   │   │   ├── kependudukan/
│   │   │   └── pengaturan/
│   │   │
│   │   ├── BeritaBencana/ (MODULAR)
│   │   │   ├── page.tsx
│   │   │   ├── [id]/page.tsx
│   │   │   └── components/ (5)
│   │   │
│   │   ├── peta-page/ (MODULAR)
│   │   │   ├── page.tsx
│   │   │   └── components/ (4)
│   │   │
│   │   ├── detailDusun/ (MODULAR)
│   │   │   ├── page.tsx
│   │   │   └── components/ (7)
│   │   │
│   │   └── splash/
│   │
│   ├── components/
│   │   ├── layout/ (navbar, footer, LayoutProvider)
│   │   ├── admin/ (AdminHeader, AdminSidebar)
│   │   └── ui/ (Alert, Button, Badge, Modal)
│   │
│   ├── data/
│   │   ├── datadususn.ts
│   │   ├── DataBencana.ts
│   │   ├── beritaBencana.ts
│   │   ├── image.ts
│   │   ├── PetaSriharjoBoundary.ts
│   │   ├── sriharjoKMLData.ts
│   │   ├── zonabanjir.ts
│   │   └── utils/kmlParser.ts
│   │
│   └── lib/
│
├── public/ (assets, video)
├── package.json
├── tsconfig.json
├── next.config.ts
├── tailwind.config.js
└── README.md
```

---

## 🚀 Quick Start

```bash
# Clone & setup
git clone https://github.com/imamsmdraa/website-TAGANA.git
cd website-TAGANA
npm install

# Development
npm run dev
# Akses: http://localhost:3000

# Production
npm run build
npm start
```

---

## 📦 Commands

```bash
npm run dev    # Dev server (Turbopack)
npm run build  # Production build
npm start      # Run production
npm run lint   # ESLint
```

---

## 🏗️ Arsitektur Next.js

### 1. **App Router Pattern**

```
app/
├── layout.tsx              # Root layout + providers
├── page.tsx                # /
├── auth/
│   ├── layout.tsx          # Auth layout
│   └── login/page.tsx      # /auth/login
├── admin/
│   ├── layout.tsx          # Admin layout (sidebar)
│   └── dashboard/page.tsx  # /admin/dashboard
└── BeritaBencana/
    ├── page.tsx            # /BeritaBencana
    ├── [id]/page.tsx       # /BeritaBencana/:id
    └── components/
```

**Benefits**:
- ✅ Nested layouts dengan shared UI
- ✅ File-based routing
- ✅ Better code organization

### 2. **Modular Page Pattern** (✨ Best Practice)

Besar pages dipisah jadi modular components:

```tsx
// Composition Layer
export default function DetailDusunPage() {
  const [dusun, setDusun] = useState(null)
  
  return (
    <div>
      <Header dusunName={dusun.name} />
      <PhotoAndDescription {...props} />
      <RiskCard {...props} />
      <DemographicsCard {...props} />
      <MapCard {...props} />
    </div>
  )
}
```

**Advantages**:
- ✅ Reusable components
- ✅ Easy to test & maintain
- ✅ Type-safe props interface
- ✅ Clear data flow
- ✅ Better collaboration

### 3. **Client vs Server Components**

```tsx
// Server (default) - akses DB, secrets
export default function Page() {
  // server-only code
  return <div>Server component</div>
}

// Client - interaktif, hooks
'use client'
export default function Page() {
  const [state, setState] = useState()
  return <div>Client component</div>
}
```

Project ini gunakan **Client Components** untuk:
- 🗺️ Interactive maps
- 📝 Forms & inputs
- 🔍 Filters & searches
- 🎪 Modals & popups

### 4. **Providers Pattern**

```tsx
// Root layout dengan Context Providers
<AlertProvider>
  <LayoutProvider>
    {children}
  </LayoutProvider>
</AlertProvider>
```

**Providers**:
- `AlertProvider`: Global notifications/alerts
- `LayoutProvider`: Control navbar/footer per route

### 5. **Dynamic Imports** (Code Splitting)

```tsx
const MapContainer = dynamic(
  () => import('react-leaflet').then(mod => mod.MapContainer),
  { ssr: false }
)
```

**Alasan**:
- Maps tidak butuh SSR
- Reduce initial bundle size
- Better initial page load

---

## 🎨 Styling

**Tailwind CSS** untuk semua styling:

```tsx
<div className="min-h-screen bg-gray-50 p-4 md:p-8">
  <h1 className="text-2xl md:text-4xl font-bold text-[#044BB1]">
    Judul
  </h1>
</div>
```

**Color Palette**:
- Primary: `#044BB1` (Blue)
- Secondary: `#0566d6` (Light Blue)
- Responsive: Mobile-first

---

## 📊 Recent Updates (v2024.12)

✅ **Architecture**
- Inline AlertProvider & LayoutProvider ke root
- Cleaner provider setup

✅ **3 Pages Modularization** (16 new components)
- BeritaBencana: 5 components
- Peta-page: 4 components
- DetailDusun: 7 components

✅ **Cleanup** (-260 KB)
- Removed: `xml2js`, `@types/xml2js`, `@types/rxeact`
- No more unused dependencies

---

## 📚 Best Practices

### ✅ DO:
- ✓ Keep components under 200 lines
- ✓ Use TypeScript interfaces untuk props
- ✓ Nested layouts untuk UI sharing
- ✓ Client components hanya untuk interaksi
- ✓ Props-driven data flow

### ❌ DON'T:
- ✗ Monolithic pages (>300 lines)
- ✗ Prop drilling (use context)
- ✗ Unused imports/code
- ✗ Unnecessary re-renders

---

## 🤝 Contributing

### Branch Strategy
```
main (production)
├── develop
└── feature/* atau slicing/*
```

### Commit Format
```
feat: Add new feature
fix: Bug fix
refactor: Code improvement
docs: Documentation
```

### PR Checklist
- ✓ Tested locally
- ✓ No TypeScript errors
- ✓ Follows existing patterns
- ✓ Updated README if needed

---

## 📞 Contact

- **Repo**: github.com/imamsmdraa/website-TAGANA
- **Branch**: slicing/admin-page
- **Owner**: imamsmdraa

---

**Last Updated**: December 12, 2024 | **Version**: 2024.12
