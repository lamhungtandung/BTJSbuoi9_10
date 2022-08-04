function DanhSachNhanVien() {
    this.mangNV = [];
   //thêm NV
    this.themNhanVien = function (nv) {
        this.mangNV.push(nv);
    }
//tìm vị trí
    this.timViTri = function (tk) {
        var viTri = -1;
        this.mangNV.map(function (nv, index) {
            if (nv.taiKhoan == tk) {
                viTri = index;
            }
        })
        return viTri;
    }
    //xóa nhân viên
    this.xoaNhanVien = function (tk) {
        var viTri = this.timViTri(tk);

        if (viTri > -1) {
            this.mangNV.splice(viTri, 1);
        }
    }
    //cập nhật
    this.capNhatNhanVien = function (nv) {
        var viTri = this.timViTri(nv.taiKhoan);
        if (viTri > -1) {
            dsnv.mangNV[viTri] = nv;
        }
    }
}

//tìm kiếm theo loại
DanhSachNhanVien.prototype.timKiemTheoLoai = function (loaiNV) {
    var mangTK = [];

    this.mangNV.map(function (nv) {
        var viTriTK = nv.xepLoai.toLowerCase().indexOf(loaiNV.toLowerCase());

        if (viTriTK > -1) {
            mangTK.push(nv);
        }
    });

    return mangTK;
}