<<<<<<< HEAD
# Sistem Pelacakan Alumni

Aplikasi web sederhana untuk melakukan pelacakan alumni berdasarkan berbagai sumber publik.

## Fitur Sistem
- Input data alumni
- Menjalankan pelacakan alumni
- Menampilkan status alumni
- Menampilkan instansi alumni
- Menampilkan confidence score
- Dashboard statistik alumni

---

# Pengujian Kualitas Sistem

| No | Aspek Kualitas | Skenario Pengujian | Hasil yang Diharapkan | Hasil Pengujian | Status |
|----|---------------|--------------------|----------------------|----------------|-------|
| 1 | Functional Suitability | Menambahkan data alumni | Data alumni muncul di tabel | Data berhasil tampil | Berhasil |
| 2 | Functional Suitability | Menjalankan pelacakan alumni | Status alumni berubah | Status berubah sesuai sistem | Berhasil |
| 3 | Usability | Pengguna mengisi form input | Form mudah dipahami | Pengguna dapat mengisi form | Berhasil |
| 4 | Reliability | Pelacakan dijalankan beberapa kali | Sistem tetap berjalan | Tidak terjadi error | Berhasil |
| 5 | Performance | Membuka halaman aplikasi | Halaman terbuka cepat | Halaman dapat dimuat dengan baik | Berhasil |

---

## Teknologi yang Digunakan
- HTML
- CSS
- JavaScript

---

## Author
Nama : Rikza Ahmad Nur Muhammad  
NIM : 202310370311265  
Mata Kuliah : Rekayasa Kebutuhan
=======
"# Alumni Tracking System - Dokumentasi Tugas

## 📋 PEMBERITAHUAN PENTING
Semua data alumni yang disimpan dalam sistem ini **HANYA UNTUK KEPENTINGAN PEMBELAJARAN DAN PENELITIAN INSTITUSI**. Dilarang keras menyebarkan atau menggunakan data ini untuk kepentingan apapun tanpa persetujuan dari institusi.

---

## 🔐 AKUN LOGIN

### Admin Account
- **Email:** admin@gmail.com
- **Password:** admin12

### User Account (Alumni)
Dapat dibuat melalui halaman registrasi dengan klik "Daftar sekarang" di halaman login.

---

## 📊 FITUR SISTEM

### Data yang Dikumpulkan
Sesuai dengan instruksi tugas, sistem mengumpulkan data berikut:

1. **Identitas Dasar Alumni**
   - Nama Lengkap
   - NIM
   - Email
   - No. Handphone

2. **Alamat Sosial Media Pribadi**
   - LinkedIn
   - Instagram
   - Facebook
   - TikTok

3. **Informasi Pekerjaan**
   - Status Pekerjaan (PNS, Swasta, Wirausaha, Pengangguran)
   - Tempat Bekerja / Nama Perusahaan
   - Alamat Bekerja
   - Posisi / Jabatan

4. **Alamat Sosial Media Tempat Bekerja**
   - LinkedIn Perusahaan
   - Instagram Perusahaan
   - Facebook Perusahaan
   - TikTok Perusahaan

### Fitur Utama
- ✅ **Login & Registrasi:** Sistem keamanan dengan login yang protektif
- ✅ **Input Data Manual:** Form lengkap dengan fieldset terorganisir
- ✅ **Import dari Excel/CSV:** Import data massal dari file
- ✅ **Tampilkan Details:** Lihat semua informasi detail alumni dalam modal popup
- ✅ **Edit Data:** Ubah data alumni yang sudah tersimpan
- ✅ **Hapus Data:** Menghapus data alumni dari sistem
- ✅ **Verifikasi Data:** Menandai data yang sudah diverifikasi
- ✅ **Search & Filter:** Cari alumni berdasarkan nama, NIM, atau email
- ✅ **Export ke Excel:** Export semua data ke file CSV

---

## 📥 FORMAT IMPORT DATA (CSV/Excel)

Untuk mengimport data dari Excel, gunakan format CSV dengan kolom sebagai berikut:

```
Nama,NIM,Email,HP,LinkedIn,Instagram,Facebook,TikTok,Status,Tempat Kerja,Alamat Kerja,Posisi,LinkedIn Perusahaan,Instagram Perusahaan,Facebook Perusahaan,TikTok Perusahaan
```

### Contoh Data:
```
Joko Widodo,12345,joko@email.com,08123456789,https://linkedin.com/in/joko,@joko_official,facebook.com/joko,@joko_tik,Swasta,PT Indonesia Jaya,Jl. Merdeka No 1 Jakarta,Senior Manager,https://linkedin.com/company/pt-indonesia,@pt_indonesia,facebook.com/ptindonesia,@ptindonesia_official
```

### Panduan Kolom:
1. **Nama** - Nama lengkap alumni
2. **NIM** - Nomor Identitas Mahasiswa
3. **Email** - Email address (wajib, gunakan format valid)
4. **HP** - Nomor handphone
5. **LinkedIn** - URL profil LinkedIn atau kosongkan dengan "-"
6. **Instagram** - Username Instagram (dengan atau tanpa @)
7. **Facebook** - URL profil Facebook atau kosongkan
8. **TikTok** - Username TikTok (dengan atau tanpa @)
9. **Status** - PNS / Swasta / Wirausaha / Pengangguran
10. **Tempat Kerja** - Nama perusahaan atau institusi (wajib)
11. **Alamat Kerja** - Alamat lengkap tempat bekerja
12. **Posisi** - Nama jabatan atau posisi pekerjaan
13-16. **Sosial Media Perusahaan** - URL atau username media sosial perusahaan

---

## 🖥️ CARA PENGGUNAAN

### 1. Login ke Sistem
- Buka `index.html`
- Masukkan email: `admin@gmail.com`
- Masukkan password: `admin12`
- Klik Login

### 2. Menambah Data Alumni (Manual)
1. Klik tombol "Sembunyikan" untuk menutup form (jika ingin)
2. Isi semua field yang tersedia dengan data alumni
3. Klik tombol "💾 Simpan Alumni"
4. Data otomatis muncul di tabel

### 3. Import Data dari Excel
1. Siapkan file CSV dengan format yang benar
2. Klik tombol "📁 Pilih File Excel"
3. Pilih file CSV Anda
4. Sistem otomatis akan mengimport data
5. Pesan konfirmasi menunjukkan berapa data yang berhasil terimportasi

### 4. Melihat Detail Alumni
1. Klik tombol 👁️ (mata) pada baris alumni
2. Modal popup akan menampilkan semua informasi detail
3. Klik ×️ untuk menutup modal

### 5. Edit Data Alumni
1. Klik tombol ✏️ pada baris alumni
2. Form otomatis terisi dengan data alumni tersebut
3. Ubah data yang diperlukan
4. Klik tombol "✏️ Update Alumni"

### 6. Hapus Data Alumni
1. Klik tombol 🗑️ pada baris alumni
2. Konfirmasi penghapusan akan muncul
3. Data akan dihapus permanen

### 7. Verifikasi Data
1. Klik tombol ✔️ untuk menandai data sebagai "Terverifikasi"
2. Tombol akan otomatis disabled jika sudah terverifikasi

### 8. Search/Cari Alumni
1. Gunakan kolom pencarian untuk mencari alumni
2. Ketik nama, NIM, atau email
3. Hasil akan otomatis disaring saat mengetik

### 9. Export Data
1. Klik tombol "📥 Export Excel"
2. File CSV akan otomatis diunduh dengan nama "data_alumni_lengkap.csv"
3. File berisi semua data yang ada di sistem

---

## 📊 STATISTIK DASHBOARD

Dashboard menampilkan 4 kartu statistik:
- **Total Alumni** - Jumlah total alumni yang terdaftar
- **Alumni PNS** - Jumlah alumni dengan status PNS
- **Alumni Swasta** - Jumlah alumni bekerja di sektor swasta
- **Alumni Wirausaha** - Jumlah alumni yang berwirausaha

---

## 🔒 KEAMANAN DATA

1. **Login Protection:** Data hanya dapat diakses setelah login
2. **Local Storage:** Data tersimpan di browser lokal (tidak di server)
3. **Verifikasi Dua Langkah:** Admin dan user punya akses terpisah
4. **Privacy Notice:** Disclaimer prominently displayed di dashboard
5. **Konfirmasi Hapus:** Penghapusan data memerlukan konfirmasi

---

## ⚙️ TEKNOLOGI

- **Frontend:** HTML5, CSS3, JavaScript (Vanilla)
- **Storage:** Browser LocalStorage
- **Kompatibilitas:** Chrome, Firefox, Safari, Edge (modern versions)
- **Responsive:** Mobile-friendly design

---

## 📝 DATA YANG DISAMPAIKAN PADA DOSEN

Ketika mengumpulkan tugas, submit:
1. **File HTML/CSS/JS** - Seluruh folder sistem
2. **Demo Data** - File CSV contoh data alumni (opsional)
3. **Akun Login:** 
   - Admin: admin@gmail.com / admin12
   - User: Bisa dibuat melalui registrasi
4. **Dokumentasi** - File README.md ini

---

## ✅ CHECKLIST PEMENUHAN FITUR TUGAS

- ✅ Alamat sosial media (LinkedIn, IG, FB, TikTok) - Dikumpulkan
- ✅ Email - Dikumpulkan
- ✅ No HP - Dikumpulkan
- ✅ Tempat bekerja - Dikumpulkan
- ✅ Alamat bekerja - Dikumpulkan
- ✅ Posisi - Dikumpulkan
- ✅ Status (PNS, Swasta, Wirausaha) - Dikumpulkan
- ✅ Alamat sosial media tempat bekerja - Dikumpulkan
- ✅ Data untuk kepentingan pembelajaran saja - Pernyataan ada di disclaimer
- ✅ Sistem dilindungi login - Implementasi sudah ada
- ✅ Akun untuk login disediakan - Di file ini

---

## 📞 KONTAK SUPPORT

Jika ada pertanyaan teknis, silakan hubungi pengembang sistem.

---

**Last Updated:** April 4, 2026  
**Version:** 1.0.0" 
>>>>>>> 71d10cd (resolve conflict)
