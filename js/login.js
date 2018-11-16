$(function () {
    new GoLogin();
})
class GoLogin {
    constructor() {
        this.uname = $("#uname");
        this.pwd = $("#pwd");
        this.btn = $(".submit-field button");
        this.login();

    };
    login() {
        var _this = this;
        this.btn.click(function () {
            _this.userName = _this.uname.val();
            var pro = new Promise(function (suc, fail) {
                $.ajax({
                    type: "get",
                    data: {
                        uname: _this.userName,
                        upwd: _this.pwd.val()
                    },
                    url: "../js/login.php",
                    success: function (res) {
                        suc(res);
                    }
                });
            });
            _this.showIndex(pro);
        });
    };
    showIndex(pro) {
        var _this = this;
        pro.then(function (res) {
            if (res == 1) {
                alert("用户名不存在");
            } else if (res == 0) {
                alert("用户名或密码不正确，请重新登录或注册!");
            } else {
                //console.log(res);
                localStorage.setItem("loginName", _this.userName);
                location.href = "../index.html";
            };
        });
    };

}