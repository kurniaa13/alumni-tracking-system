// ==================== GLOBAL VARIABLES ====================
let editingIndex = null;

// ==================== DOM INITIALIZATION ====================
document.addEventListener("DOMContentLoaded", function () {
    let registerBtn = document.getElementById("registerBtn");
    if (registerBtn) {
        registerBtn.addEventListener("click", function () {
            window.location.href = "register.html";
        });
    }

    if (document.getElementById("tabelAlumni")) {
        loadAlumni();
        updateStatistik();
    }

    let sidebarLinks = document.querySelectorAll(".sidebar a");
    sidebarLinks.forEach(link => {
        link.addEventListener("click", function() {
            if (window.innerWidth <= 768) {
                closeSidebar();
            }
        });
    });

    document.addEventListener("click", function(event) {
        let sidebar = document.getElementById("sidebar");
        let hamburger = document.getElementById("hamburger");
        if (sidebar && hamburger && window.innerWidth <= 768) {
            if (!sidebar.contains(event.target) && !hamburger.contains(event.target)) {
                closeSidebar();
            }
        }
    });
});

// ==================== AUTHENTICATION ====================
function togglePassword() {
    let pass = document.getElementById("password");
    if (pass) pass.type = pass.type === "password" ? "text" : "password";
}

function login(e) {
    e.preventDefault();

    let email = document.getElementById("email")?.value || "";
    let password = document.getElementById("password")?.value || "";

    if (email === "admin@gmail.com" && password === "admin12") {
        window.location.href = "dashboard_admin.html";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find(u => u.email === email && u.pass === password);

    if (user) {
        localStorage.setItem("nama", user.nama);
        localStorage.setItem("email", user.email);
        localStorage.setItem("nim", user.nim);
        window.location.href = "dashboard_user.html";
    } else {
        let errorEl = document.getElementById("error");
        if (errorEl) errorEl.innerText = "Email atau password salah";
    }
}

function goLogin() {
    window.location.href = "index.html";
}

function registerUser(e) {
    e.preventDefault();

    let nama = document.getElementById("nama")?.value || "";
    let nim = document.getElementById("nim")?.value || "";
    let email = document.getElementById("emailReg")?.value || "";
    let pass = document.getElementById("passReg")?.value || "";
    let confirm = document.getElementById("confirmPass")?.value || "";

    if (pass.length < 6) {
        alert("Password minimal 6 karakter");
        return;
    }

    if (pass !== confirm) {
        alert("Konfirmasi password tidak sama");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(u => u.email === email)) {
        alert("Email sudah terdaftar!");
        return;
    }

    users.push({ nama, nim, email, pass });
    localStorage.setItem("users", JSON.stringify(users));

    let toast = document.getElementById("toast");
    if (toast) toast.style.display = "block";

    setTimeout(() => {
        window.location.href = "index.html";
    }, 2000);
}

function logout() {
    if (confirm("Yakin ingin logout?")) {
        localStorage.removeItem("nama");
        localStorage.removeItem("email");
        localStorage.removeItem("nim");
        window.location.href = "index.html";
    }
}

// ==================== RESPONSIVE SIDEBAR ====================
function toggleSidebar() {
    let sidebar = document.getElementById("sidebar");
    let hamburger = document.getElementById("hamburger");
    
    if (sidebar) {
        sidebar.classList.toggle("active");
        hamburger.classList.toggle("active");
    }
}

function closeSidebar() {
    let sidebar = document.getElementById("sidebar");
    let hamburger = document.getElementById("hamburger");
    
    if (sidebar) {
        sidebar.classList.remove("active");
        hamburger.classList.remove("active");
    }
}

// ==================== ALUMNI DATA MANAGEMENT ====================
function updateStatistik() {
    let data = JSON.parse(localStorage.getItem("alumni")) || [];

    let totalEl = document.getElementById("totalAlumni");
    let pnsEl = document.getElementById("totalPNS");
    let swastaEl = document.getElementById("totalSwasta");
    let wirausahaEl = document.getElementById("totalWirausaha");

    if (totalEl) totalEl.innerText = data.length;
    if (pnsEl) pnsEl.innerText = data.filter(a => a.status === "PNS").length;
    if (swastaEl) swastaEl.innerText = data.filter(a => a.status === "Swasta").length;
    if (wirausahaEl) wirausahaEl.innerText = data.filter(a => a.status === "Wirausaha").length;
}

function generateTableRow(alumni, index) {
    const verifikasiStyle = alumni.verif === 'Terverifikasi' 
        ? 'background: #d4edda; color: #155724;' 
        : 'background: #fff3cd; color: #856404;';
    
    const statusColor = {
        'PNS': '#e3f2fd',
        'Swasta': '#f3e5f5',
        'Wirausaha': '#e8f5e9'
    }[alumni.status] || '#fce4ec';
    
    return `<tr>
        <td style="font-weight: 600; color: #999;">${index + 1}</td>
        <td><strong>${alumni.nama}</strong></td>
        <td>${alumni.nim}</td>
        <td>${alumni.email}</td>
        <td>${alumni.hp}</td>
        <td><span style="font-size: 12px;">${alumni.posisi || '-'}</span></td>
        <td><span style="font-size: 12px;">${alumni.tempatKerja || '-'}</span></td>
        <td><span style="background: ${statusColor}; color: #333; padding: 4px 8px; border-radius: 4px; font-weight: 500; font-size: 12px;">${alumni.status}</span></td>
        <td><span class="verifikasi-badge" style="padding: 4px 8px; border-radius: 4px; ${verifikasiStyle}; font-size: 12px;">${alumni.verif}</span></td>
        <td>
            <button class="btn-verif" onclick="verifikasi(${index})" ${alumni.verif === 'Terverifikasi' ? 'disabled' : ''}>✔</button>
            <button class="btn-edit" onclick="editAlumni(${index})">✏️</button>
            <button class="btn-detail" onclick="lihatDetail(${index})">👁️</button>
            <button class="btn-hapus" onclick="hapusAlumni(${index})">🗑️</button>
        </td>
    </tr>`;
}

function loadAlumni() {
    let data = JSON.parse(localStorage.getItem("alumni")) || [];
    let tabel = document.getElementById("tabelAlumni");
    
    if (!tabel) return;

    if (data.length === 0) {
        tabel.innerHTML = '<tr><td colspan="10" style="text-align: center; padding: 30px; color: #999;">Belum ada data alumni. Tambahkan data atau import dari Excel.</td></tr>';
        updateDataCount();
        return;
    }

    let html = data.map((alumni, index) => generateTableRow(alumni, index)).join('');
    tabel.innerHTML = html;
    updateDataCount();
}

function tambahAlumni(e) {
    e.preventDefault();

    try {
        let nama = (document.getElementById("nama")?.value || "").trim();
        let nim = (document.getElementById("nim")?.value || "").trim();
        let email = (document.getElementById("email")?.value || "").trim();
        let hp = (document.getElementById("hp")?.value || "").trim();
        let linkedin = (document.getElementById("linkedin")?.value || "").trim();
        let instagram = (document.getElementById("instagram")?.value || "").trim();
        let facebook = (document.getElementById("facebook")?.value || "").trim();
        let tiktok = (document.getElementById("tiktok")?.value || "").trim();
        let status = document.getElementById("status")?.value || "";
        let tempatKerja = (document.getElementById("tempatKerja")?.value || "").trim();
        let alamatBekerja = (document.getElementById("alamatBekerja")?.value || "").trim();
        let posisi = (document.getElementById("posisi")?.value || "").trim();
        let linkedinPerusahaan = (document.getElementById("linkedinPerusahaan")?.value || "").trim();
        let instagramPerusahaan = (document.getElementById("instagramPerusahaan")?.value || "").trim();
        let facebookPerusahaan = (document.getElementById("facebookPerusahaan")?.value || "").trim();
        let tiktokPerusahaan = (document.getElementById("tiktokPerusahaan")?.value || "").trim();

        if (!nama || !nim || !email || !hp || !status || !tempatKerja) {
            alert("Field yang wajib diisi: Nama, NIM, Email, HP, Status, dan Tempat Kerja!");
            return;
        }

        let data = JSON.parse(localStorage.getItem("alumni")) || [];

        if (editingIndex !== null) {
            data[editingIndex] = {
                nama, nim, email, hp, status, tempatKerja,
                linkedin, instagram, facebook, tiktok,
                alamatBekerja, posisi,
                linkedinPerusahaan, instagramPerusahaan, facebookPerusahaan, tiktokPerusahaan,
                verif: data[editingIndex].verif || "Belum"
            };
            alert("Data alumni berhasil diupdate!");
            editingIndex = null;
        } else {
            data.push({
                nama, nim, email, hp, status, tempatKerja,
                linkedin, instagram, facebook, tiktok,
                alamatBekerja, posisi,
                linkedinPerusahaan, instagramPerusahaan, facebookPerusahaan, tiktokPerusahaan,
                verif: "Belum"
            });
            alert("Data alumni berhasil ditambahkan!");
        }

        localStorage.setItem("alumni", JSON.stringify(data));
        
        let form = document.getElementById("formAlumni");
        if (form) form.reset();
        
        let submitBtn = document.querySelector("form button[type='submit']");
        if (submitBtn) submitBtn.textContent = "💾 Simpan Alumni";
        
        loadAlumni();
        updateStatistik();
    } catch (error) {
        console.error("Error in tambahAlumni:", error);
        alert("Terjadi kesalahan: " + error.message);
    }
}

function verifikasi(index) {
    let data = JSON.parse(localStorage.getItem("alumni"));
    if (!data || !data[index]) return;
    
    if (data[index].verif !== "Terverifikasi") {
        data[index].verif = "Terverifikasi";
        localStorage.setItem("alumni", JSON.stringify(data));
        loadAlumni();
        updateStatistik();
        alert("Alumni berhasil diverifikasi!");
    }
}

function editAlumni(index) {
    let data = JSON.parse(localStorage.getItem("alumni"));
    if (!data || !data[index]) return;
    
    let alumni = data[index];

    document.getElementById("nama").value = alumni.nama;
    document.getElementById("nim").value = alumni.nim;
    document.getElementById("email").value = alumni.email;
    document.getElementById("hp").value = alumni.hp;
    document.getElementById("linkedin").value = alumni.linkedin || '';
    document.getElementById("instagram").value = alumni.instagram || '';
    document.getElementById("facebook").value = alumni.facebook || '';
    document.getElementById("tiktok").value = alumni.tiktok || '';
    document.getElementById("status").value = alumni.status;
    document.getElementById("tempatKerja").value = alumni.tempatKerja;
    document.getElementById("alamatBekerja").value = alumni.alamatBekerja || '';
    document.getElementById("posisi").value = alumni.posisi || '';
    document.getElementById("linkedinPerusahaan").value = alumni.linkedinPerusahaan || '';
    document.getElementById("instagramPerusahaan").value = alumni.instagramPerusahaan || '';
    document.getElementById("facebookPerusahaan").value = alumni.facebookPerusahaan || '';
    document.getElementById("tiktokPerusahaan").value = alumni.tiktokPerusahaan || '';

    editingIndex = index;
    
    let formBox = document.querySelector(".form-box");
    if (formBox) {
        formBox.scrollIntoView({ behavior: "smooth" });
    }
    
    let buttonSubmit = document.querySelector("form button[type='submit']");
    if (buttonSubmit) {
        buttonSubmit.textContent = "✏️ Update Alumni";
    }
}

function hapusAlumni(index) {
    if (confirm("Yakin ingin menghapus data alumni ini?")) {
        let data = JSON.parse(localStorage.getItem("alumni"));
        if (!data || !data[index]) return;
        
        let namaAlumni = data[index].nama;
        data.splice(index, 1);
        localStorage.setItem("alumni", JSON.stringify(data));
        loadAlumni();
        updateStatistik();
        alert(namaAlumni + " berhasil dihapus!");
    }
}

// ==================== VIEW DETAIL ====================
function lihatDetail(index) {
    let data = JSON.parse(localStorage.getItem("alumni"));
    if (!data || !data[index]) return;
    
    let alumni = data[index];
    
    let detail = `<h2>${alumni.nama}</h2>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
        <div>
            <h4>📋 Identitas Dasar</h4>
            <p><strong>NIM:</strong> ${alumni.nim}</p>
            <p><strong>Email:</strong> <a href="mailto:${alumni.email}">${alumni.email}</a></p>
            <p><strong>HP:</strong> <a href="tel:${alumni.hp}">${alumni.hp}</a></p>
        </div>
        <div>
            <h4>💼 Informasi Pekerjaan</h4>
            <p><strong>Status:</strong> <span style="background: #e3f2fd; padding: 4px 8px; border-radius: 4px;">${alumni.status}</span></p>
            <p><strong>Tempat Bekerja:</strong> ${alumni.tempatKerja || '-'}</p>
            <p><strong>Alamat:</strong> ${alumni.alamatBekerja || '-'}</p>
            <p><strong>Posisi:</strong> ${alumni.posisi || '-'}</p>
        </div>
        <div>
            <h4>📱 Sosial Media Pribadi</h4>
            <p><strong>LinkedIn:</strong> ${alumni.linkedin ? '<a href="' + alumni.linkedin + '" target="_blank">Buka</a>' : '-'}</p>
            <p><strong>Instagram:</strong> ${alumni.instagram ? '<a href="https://instagram.com/' + alumni.instagram.replace('@','') + '" target="_blank">' + alumni.instagram + '</a>' : '-'}</p>
            <p><strong>Facebook:</strong> ${alumni.facebook ? '<a href="' + alumni.facebook + '" target="_blank">Buka</a>' : '-'}</p>
            <p><strong>TikTok:</strong> ${alumni.tiktok ? '<a href="https://tiktok.com/@' + alumni.tiktok.replace('@','') + '" target="_blank">' + alumni.tiktok + '</a>' : '-'}</p>
        </div>
        <div>
            <h4>🏢 Sosial Media Perusahaan</h4>
            <p><strong>LinkedIn:</strong> ${alumni.linkedinPerusahaan ? '<a href="' + alumni.linkedinPerusahaan + '" target="_blank">Buka</a>' : '-'}</p>
            <p><strong>Instagram:</strong> ${alumni.instagramPerusahaan ? '<a href="https://instagram.com/' + alumni.instagramPerusahaan.replace('@','') + '" target="_blank">' + alumni.instagramPerusahaan + '</a>' : '-'}</p>
            <p><strong>Facebook:</strong> ${alumni.facebookPerusahaan ? '<a href="' + alumni.facebookPerusahaan + '" target="_blank">Buka</a>' : '-'}</p>
            <p><strong>TikTok:</strong> ${alumni.tiktokPerusahaan ? '<a href="https://tiktok.com/@' + alumni.tiktokPerusahaan.replace('@','') + '" target="_blank">' + alumni.tiktokPerusahaan + '</a>' : '-'}</p>
        </div>
    </div>
    <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd;">
        <p><strong>Status Verifikasi:</strong> <span style="background: ${alumni.verif === 'Terverifikasi' ? '#d4edda' : '#fff3cd'}; padding: 4px 8px; border-radius: 4px; color: ${alumni.verif === 'Terverifikasi' ? '#155724' : '#856404'};">${alumni.verif}</span></p>
    </div>`;
    
    let detailContent = document.getElementById("detailContent");
    if (detailContent) {
        detailContent.innerHTML = detail;
    }
    
    let detailModal = document.getElementById("detailModal");
    if (detailModal) {
        detailModal.style.display = "block";
    }
}

function closeDetailModal() {
    let detailModal = document.getElementById("detailModal");
    if (detailModal) {
        detailModal.style.display = "none";
    }
}

window.onclick = function(event) {
    let modal = document.getElementById("detailModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// ==================== SEARCH & FILTER ====================
function searchAlumni() {
    let keyword = (document.getElementById("search")?.value || "").toLowerCase();
    let data = JSON.parse(localStorage.getItem("alumni")) || [];
    let tabel = document.getElementById("tabelAlumni");

    if (!tabel) return;

    if (keyword === "") {
        loadAlumni();
        return;
    }

    let hasil = data.filter(a => 
        a.nama.toLowerCase().includes(keyword) || 
        a.nim.toLowerCase().includes(keyword) ||
        a.email.toLowerCase().includes(keyword)
    );

    if (hasil.length === 0) {
        tabel.innerHTML = '<tr><td colspan="10" style="text-align: center; padding: 30px; color: #999;">Tidak ada data yang cocok</td></tr>';
        return;
    }

    let html = hasil.map((alumni, idx) => {
        let originalIndex = data.findIndex(item => item.nim === alumni.nim);
        return generateTableRow(alumni, idx + 1);
    }).join('');
    
    tabel.innerHTML = html;
}

// ==================== EXPORT & IMPORT ====================
function exportExcel() {
    let data = JSON.parse(localStorage.getItem("alumni")) || [];

    if (data.length === 0) {
        alert("Data alumni kosong!");
        return;
    }

    let csvContent = "Nama,NIM,Email,HP,LinkedIn,Instagram,Facebook,TikTok,Status,Tempat Kerja,Alamat Kerja,Posisi,LinkedIn Perusahaan,Instagram Perusahaan,Facebook Perusahaan,TikTok Perusahaan,Verifikasi\n";
    csvContent += data.map(a => {
        let row = [
            a.nama, a.nim, a.email, a.hp,
            a.linkedin || '', a.instagram || '', a.facebook || '', a.tiktok || '',
            a.status, a.tempatKerja, a.alamatBekerja || '', a.posisi || '',
            a.linkedinPerusahaan || '', a.instagramPerusahaan || '', a.facebookPerusahaan || '', a.tiktokPerusahaan || '',
            a.verif
        ];
        return row.map(cell => '"' + cell.replace(/"/g, '""') + '"').join(',');
    }).join('\n');

    let blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    let url = URL.createObjectURL(blob);
    let link = document.createElement("a");
    link.href = url;
    link.download = "alumni.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert("Data alumni berhasil diekspor!");
}

function importExcel(e) {
    let file = e.target.files[0];
    if (!file) return;
    
    let reader = new FileReader();
    reader.onload = function(event) {
        try {
            let csv = event.target.result;
            let lines = csv.split('\n');
            let data = JSON.parse(localStorage.getItem("alumni")) || [];
            let imported = 0;

            for (let i = 1; i < lines.length; i++) {
                let line = lines[i].trim();
                if (!line) continue;
                
                let cells = line.split(',').map(cell => cell.replace(/^"|"$/g, ''));
                if (cells.length < 9) continue;

                let alumni = {
                    nama: cells[0]?.trim() || '',
                    nim: cells[1]?.trim() || '',
                    email: cells[2]?.trim() || '',
                    hp: cells[3]?.trim() || '',
                    linkedin: cells[4]?.trim() || '',
                    instagram: cells[5]?.trim() || '',
                    facebook: cells[6]?.trim() || '',
                    tiktok: cells[7]?.trim() || '',
                    status: cells[8]?.trim() || 'Belum',
                    tempatKerja: cells[9]?.trim() || '',
                    alamatBekerja: cells[10]?.trim() || '',
                    posisi: cells[11]?.trim() || '',
                    linkedinPerusahaan: cells[12]?.trim() || '',
                    instagramPerusahaan: cells[13]?.trim() || '',
                    facebookPerusahaan: cells[14]?.trim() || '',
                    tiktokPerusahaan: cells[15]?.trim() || '',
                    verif: cells[16]?.trim() || "Belum"
                };

                if (alumni.nama && alumni.nim && alumni.email) {
                    data.push(alumni);
                    imported++;
                }
            }

            if (imported > 0) {
                localStorage.setItem("alumni", JSON.stringify(data));
                loadAlumni();
                updateStatistik();
                alert(`Berhasil import ${imported} data alumni!`);
            } else {
                alert("Tidak ada data yang berhasil diimport!");
            }
        } catch (error) {
            alert("Error: " + error.message);
        }
    };
    
    reader.readAsText(file);
    e.target.value = '';
}

// ==================== FORM & UI UTILITIES ====================
function toggleForm(btn) {
    let form = document.getElementById("formAlumni");
    if (!form) return;
    
    if (form.style.display === "none" || !form.style.display) {
        form.style.display = "block";
        btn.textContent = "Sembunyikan";
    } else {
        form.style.display = "none";
        btn.textContent = "Tampilkan";
        resetForm();
    }
}

function resetForm() {
    let form = document.getElementById("formAlumni");
    if (form) form.reset();
    
    let submitBtn = document.querySelector("form button[type='submit']");
    if (submitBtn) submitBtn.textContent = "💾 Simpan Alumni";
    editingIndex = null;
}

function toggleTable() {
    alert("Fitur pengaturan kolom akan segera hadir!");
}

function updateDataCount() {
    let data = JSON.parse(localStorage.getItem("alumni")) || [];
    let countElement = document.getElementById("dataCount");
    if (countElement) {
        countElement.textContent = data.length;
    }
}
