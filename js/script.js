let alumni = [];

function tambahAlumni(){

let nama = document.getElementById("nama").value;
let prodi = document.getElementById("prodi").value;
let tahun = document.getElementById("tahun").value;
let kota = document.getElementById("kota").value;

if(nama === ""){
alert("Nama alumni harus diisi");
return;
}

let data = {
nama:nama,
prodi:prodi,
tahun:tahun,
kota:kota,
status:"Belum Dilacak",
instansi:"-",
confidence:0
};

alumni.push(data);

tampilkanData();
updateDashboard();

document.getElementById("nama").value="";
document.getElementById("prodi").value="";
document.getElementById("tahun").value="";
document.getElementById("kota").value="";
}


function tampilkanData(){

let tabel = document.getElementById("tabelAlumni");

tabel.innerHTML = `
<tr>
<th>Nama</th>
<th>Prodi</th>
<th>Tahun</th>
<th>Kota</th>
<th>Status</th>
<th>Instansi</th>
<th>Confidence</th>
</tr>
`;

alumni.forEach(a => {

tabel.innerHTML += `
<tr>
<td>${a.nama}</td>
<td>${a.prodi}</td>
<td>${a.tahun}</td>
<td>${a.kota}</td>
<td>${a.status}</td>
<td>${a.instansi}</td>
<td>${a.confidence}</td>
</tr>
`;

});

}


function lacakAlumni(){

alumni.forEach(a => {

let instansi="Tidak ditemukan";
let status="Belum Ditemukan";
let confidence=40;

if(a.nama.toLowerCase().includes("kurnia")){

instansi="PT Telkom Indonesia";
status="Teridentifikasi";
confidence=90;

}
else if(a.nama.toLowerCase().includes("citra")){

instansi="Universitas Brawijaya";
status="Perlu Verifikasi";
confidence=60;

}
else if(a.nama.toLowerCase().includes("akbar")){

instansi="Tokopedia";
status="Teridentifikasi";
confidence=85;

}
else{

instansi="Belum diketahui";
status="Belum Ditemukan";
confidence=40;

}

a.instansi=instansi;
a.status=status;
a.confidence=confidence;

});

tampilkanData();
updateDashboard();

}


function updateDashboard(){

let total=alumni.length;

let teridentifikasi=alumni.filter(a=>a.status==="Teridentifikasi").length;
let verifikasi=alumni.filter(a=>a.status==="Perlu Verifikasi").length;
let belum=alumni.filter(a=>a.status==="Belum Ditemukan").length;

document.getElementById("totalAlumni").innerText=total;
document.getElementById("teridentifikasi").innerText=teridentifikasi;
document.getElementById("verifikasi").innerText=verifikasi;
document.getElementById("belum").innerText=belum;

}