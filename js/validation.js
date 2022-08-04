function getELE(id) {
    return document.getElementById(id);
}

function Validation() {
    // Empty check
    this.Empty = function (inputVal, spanID, message) {

        if (inputVal.trim() != "") {
            getELE(spanID).innerHTML = "";
            getELE(spanID).style.display = "none";

            return true;
        }

        getELE(spanID).innerHTML = message;
        getELE(spanID).style.display = "block";

        return false;
    }
    // kt tai khoan
    this.taiKhoan = function (inputVal, spanID, message, mangNV) {
        var isExist = false;

        isExist = mangNV.some(function (nv, index) {
            return nv.taiKhoan === inputVal.replaceAll(" ", "");
        });

        if (isExist) {
            getELE(spanID).innerHTML = message;
            getELE(spanID).style.display = "block";

            return false;
        }

        getELE(spanID).innerHTML = '';
        getELE(spanID).style.display = "none";

        return true;
    }

    // kt độ dài tai khoan
    this.taiKhoanNV = function (inputVal, spanID, message) {
        var pattern = /^.{4,6}$/

        if (inputVal.match(pattern)) {
            getELE(spanID).innerHTML = "";
            getELE(spanID).style.display = "none";

            return true;
        }

        getELE(spanID).innerHTML = message;
        getELE(spanID).style.display = "block";

        return false;
    }
    // kt tên nv
    this.tenNV = function (inputVal, spanID, message) {
        var pattern = /^[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$/

        if (inputVal.match(pattern)) {
            getELE(spanID).innerHTML = "";
            getELE(spanID).style.display = "none";

            return true;
        }

        getELE(spanID).innerHTML = message;
        getELE(spanID).style.display = "block";

        return false;
    }
    // kt định dạng email
    this.EmailNV = function (inputVal, spanID, message) {
        var pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if (inputVal.match(pattern)) {
            getELE(spanID).innerHTML = "";
            getELE(spanID).style.display = "none";

            return true;
        }

        getELE(spanID).innerHTML = message;
        getELE(spanID).style.display = "block";

        return false;
    }
    // kt định dạng mk
    this.PassNV = function (inputVal, spanID, message) {
        var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,10}$/

        if (inputVal.match(pattern)) {
            getELE(spanID).innerHTML = "";
            getELE(spanID).style.display = "none";

            return true;
        }

        getELE(spanID).innerHTML = message;
        getELE(spanID).style.display = "block";

        return false;
    }
    // kt định dạng lương
    this.luongNV = function (inputVal, spanID) {
        var pattern = /^[0-9]+[a-z A-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]$/

        if (inputVal.match(pattern)) {
            getELE(spanID).innerHTML = "Tiền lương phải là dạng chữ số!";
            getELE(spanID).style.display = "block";

            return false;

        } else if (inputVal < 0) {
            getELE(spanID).innerHTML = "Tiền lương phải là số dương";
            getELE(spanID).style.display = "block";

            return false;
        } else if (inputVal < 1e+6) {
            getELE(spanID).innerHTML = "Tiền lương tối thiểu là: 1.000.000 VNĐ";
            getELE(spanID).style.display = "block";

            return false;
        } else if (inputVal > 20e+6) {
            getELE(spanID).innerHTML = "Tiền lương tối đa là 20.000.000 VNĐ";
            getELE(spanID).style.display = "block";

            return false;
        }

        return true;
    }
    // kt định dạng ngaỳ làm việc
    this.ngayLam = function (inputVal, spanID, message) {
        var pattern = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/

        if (inputVal.match(pattern)) {
            getELE(spanID).innerHTML = '';
            getELE(spanID).style.display = "none";

            return true;
        }

        getELE(spanID).innerHTML = message;
        getELE(spanID).style.display = "block";

        return false;
    }
    // kt option
    this.chucVuNV = function (inputVal, spanID, message) {
        var index2 = getELE(inputVal).selectedIndex;

        if (index2 != 0) {
            getELE(spanID).innerHTML = "";
            getELE(spanID).style.display = "none";

            return true;
        }

        getELE(spanID).innerHTML = message;
        getELE(spanID).style.display = "block";

        return false;
    }
    // kt thời gian làm việc
    this.thoiGian = function (inputVal, spanID) {

        var pattern = /^[0-9]+$/

        if (!inputVal.match(pattern)) {
            getELE(spanID).innerHTML = "Thời gian làm việc phải là kiểu số";
            getELE(spanID).style.display = "block";

            return false;

        } else if (inputVal <= 0) {
            getELE(spanID).innerHTML = "Số giờ làm phải lớn hơn 0";
            getELE(spanID).style.display = "block";

            return false;

        } else if (inputVal < 80) {
            getELE(spanID).innerHTML = "Số giờ làm tối thiểu là: 80H";
            getELE(spanID).style.display = "block";

            return false;

        } else if (inputVal > 200) {
            getELE(spanID).innerHTML = "Số giờ làm tối đa là: 200H";
            getELE(spanID).style.display = "block";

            return false;
        }

        return true;
    }
    
}