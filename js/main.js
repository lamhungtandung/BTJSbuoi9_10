var dsnv = new DanhSachNhanVien();
var isValid = new Validation();

function getELE(id) {
    return document.getElementById(id);
}

function setLocalStorage() {
    localStorage.setItem('DSNV', JSON.stringify(dsnv.mangNV));
}

function getLocalStorage() {
    if (localStorage.getItem('DSNV') != undefined) {
        dsnv.mangNV = JSON.parse(localStorage.getItem('DSNV'));
    }
    hienThiDS(dsnv.mangNV);
}
getLocalStorage();

// gom
function Error() {
    var arrayE = document.querySelectorAll(".err_noti");

    arrayE.forEach((err_noti) => {
        err_noti.style.display = "none";
    });
}

// Validation
function checkAllInput(taiKhoanNV, hoTenNV, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam) {
    var hienTB = true;

    // Tài khoản

    if (!getELE("tknv").disabled) {
        hienTB &= isValid.Empty(taiKhoanNV, "tbTKNV", "Tài khoản không được để trống!") && isValid.taiKhoanNV(taiKhoanNV, "tbTKNV", "Tài khoản chỉ được tối đa 4-6 ký tự số !") && isValid.taiKhoan(taiKhoanNV, "tbTKNV", "Tài khoản không được lặp lại!", dsnv.mangNV);
    }

    // Họ và tên
    hienTB &= isValid.Empty(hoTenNV, "tbTen", "Họ và tên không được để trống!") && isValid.tenNV(hoTenNV, "tbTen", "Họ và tên không được định dạng!");

    // Email
    hienTB &= isValid.Empty(email, "tbEmail", "Email không được để trống!") && isValid.EmailNV(email, "tbEmail", "Email không hợp lệ hoặc không đúng định dạng!");

    // Password
    hienTB &= isValid.PassNV(matKhau, "tbMatKhau", "Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, 1 ký tự đặc biệt và từ 6-10 ký tự !");

    // ngay lam viec
    hienTB &= isValid.Empty(ngayLam, "tbNgay", "Ngày không được để trống!") && isValid.ngayLam(ngayLam, "tbNgay", "Ngày không đúng định dạng hoặc không hợp lệ!");

    // luong
    hienTB &= isValid.Empty(luongCoBan, "tbLuongCB", "Lương không được để trống!") && isValid.luongNV(luongCoBan, "tbLuongCB");

    // chức vụ
    hienTB &= isValid.chucVuNV("chucvu", "tbChucVu", "Chức vụ chưa được chọn!");

    // số giờ làm
    hienTB &= isValid.Empty(gioLam, "tbGiolam", "Giờ làm không được để trống!") && isValid.thoiGian(gioLam, "tbGiolam");

    return hienTB;

}

// Thêm nhân viên
function themNhanVien() {
    getELE("btnThemNV").style.display = "block";


    var taiKhoanNV = getELE('tknv').value;
    var hoTenNV = getELE('name').value;
    var email = getELE('email').value;
    var matKhau = getELE('password').value;
    var ngayLam = getELE('datepicker').value;
    var luongCoBan = getELE('luongCB').value;
    var chucVu = getELE('chucvu').value;
    var gioLam = getELE('gioLam').value;

    var thongBao = checkAllInput(taiKhoanNV, hoTenNV, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam);

    if (thongBao) {

        alert('Đã thêm nhân viên!');

        // Tạo thể hiện của NhanVien
        var nv = new NhanVien(taiKhoanNV, hoTenNV, email, matKhau, ngayLam, Number(luongCoBan), chucVu, Number(gioLam));
        nv.tinhTongLuong();
        nv.xepLoaiNV();
        dsnv.themNhanVien(nv);
        
        hienThiDS(dsnv.mangNV);
        setLocalStorage();

        location.reload();
    }
}

// Reset
function resetForm() {
    getELE('myForm').reset();
    getELE('tknv').disabled = false;
    getELE("btnCapNhat").style.display = "none";
    getELE("btnThemNV").style.display = "block";

}

// Hiển thị DS
function hienThiDS(mangNV) {
    var content = '';
    mangNV.map(function (nv) {
        content += `
            <tr>
                <td>${nv.taiKhoan}</td>
                <td>${nv.hoTen}</td>
                <td>${nv.email}</td>
                <td>${nv.ngayLam}</td>
                <td>${nv.chucVu}</td>
                <td>${nv.tongLuong}</td>
                <td>${nv.xepLoai}</td>
                <td>
                    <button class= "btn btn-info" data-toggle="modal"
									data-target="#myModal" onclick= "xemChiTietNV('${nv.taiKhoan}')"><i class="fa fa-search" aria-hidden="true"></i></button>
                    <button class= "btn btn-danger" onclick= "xoaNhanVien('${nv.taiKhoan}')"><i class="fa fa-trash" aria-hidden="true"></i></button>
                </td>
            </tr>
        `;
    })

    getELE('tableDanhSach').innerHTML = content;
}


// Xóa nhân viên
function xoaNhanVien(tk) {
    dsnv.xoaNhanVien(tk);
    hienThiDS(dsnv.mangNV);
    setLocalStorage(dsnv.mangNV);
}


// Xem chi tiết
function xemChiTietNV(tk) {
    getELE("btnThemNV").style.display = "none";
    getELE("btnCapNhat").style.display = "block";
    Error();

    var viTri = dsnv.timViTri(tk);
    if (viTri > -1) {
        var nvTim = dsnv.mangNV[viTri];
        getELE('tknv').value = nvTim.taiKhoan;
        getELE('tknv').disabled = true;
        getELE('name').value = nvTim.hoTen;
        getELE('email').value = nvTim.email;
        getELE('password').value = nvTim.password;
        getELE('datepicker').value = nvTim.ngayLam;
        getELE('luongCB').value = nvTim.luongCoBan;
        getELE('chucvu').value = nvTim.chucVu;
        getELE('gioLam').value = nvTim.gioLam;
    }
}


// Cập nhật nhân viên
function capNhatNhanVien() {
    var taiKhoanNV = getELE('tknv').value;
    var hoTenNV = getELE('name').value;
    var email = getELE('email').value;
    var matKhau = getELE('password').value;
    var ngayLam = getELE('datepicker').value;
    var luongCoBan = getELE('luongCB').value;
    var chucVu = getELE('chucvu').value;
    var gioLam = getELE('gioLam').value;

    var thongBao = checkAllInput(taiKhoanNV, hoTenNV, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam);

    if (thongBao) {
        alert("Cập nhật thành công!");

        var nv = new NhanVien(taiKhoanNV, hoTenNV, email, matKhau, ngayLam, Number(luongCoBan), chucVu, Number(gioLam));
        nv.tinhTongLuong();
        nv.xepLoaiNV();

        dsnv.capNhatNhanVien(nv);
        hienThiDS(dsnv.mangNV);
        setLocalStorage();

        location.reload();
    }
}


// Tìm kiếm nhân viên theo xếp loại nhân viên
function xuatNV() {
    var tuKhoa = getELE("searchName").value;
    var mangKQ = dsnv.timKiemTheoLoai(tuKhoa.replaceAll(" ",""));

    hienThiDS(mangKQ);
}
getELE("btnTimNV").onclick = xuatNV;
getELE("searchName").onkeyup = xuatNV;