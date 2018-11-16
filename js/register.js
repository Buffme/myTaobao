$(function () {
    $(".agreement-btn").click(function () {
        $(".agreement").css("display", "none");
    });
    //账户名验证
    var uname = $("#uname");
    var info_user = $("#info_user");
    var error_user = $("#error_user");
    var succ_user = $("#succ_user");
    var unameReg = /^([\u4e00-\u9fa5]|\w){2,12}$/;
    var unameFlag = false;
    uname.focus(function () {
        info_user.css("display", "block");
        succ_user.css("display", "none");
        error_user.css("display", "none");
    });
    uname.blur(function () {
        info_user.css("display", "none");
        if (unameReg.test($(this).val())) {//用户名合法
            succ_user.css("display", "block");
            unameFlag = true;
        } else {//不合法
            error_user.css("display", "block");
            unameFlag = false;
        }
    });
    //密码的验证
    var pwd = $("#pwd");
    var info_pass = $("#info_pass");
    var succ_pass = $("#succ_pass");
    var error_pass = $("#error_pass");
    var pwdFlag = false;
    var pwdReg = /^\S{6,20}$/;
    pwd.focus(function () {
        info_pass.css("display", "block");
        error_pass.css("display", "none");
        succ_pass.css("display", "none");
    });
    pwd.blur(function () {
        info_pass.css("display", "none");
        if (pwdReg.test($(this).val())) {
            succ_pass.css("display", "block");
            pwdFlag = true;
        } else {
            error_pass.css("display", "block");
            pwdFlag = false;
        }
    });
    //密码安全强度的验证
    var q1 = $("#q1");
    var q2 = $("#q2");
    var q3 = $("#q3");
    var s1 = $("#s1");
    var s2 = $("#s2");
    var s3 = $("#s3");
    var pwdReg1 = /.{6,20}/;
    var pwdReg2 = /^\S+$/;
    var pwdReg3 = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{6,20}$/;
    pwd.keyup(function () {
        if (pwdReg1.test($(this).val())) {//pass reg1
            q1.html("●");
            s1.css("color", "green");
            // if (checkPass()) {
            if (pwdReg3.test($(this).val())) {
                s2.css("color", "green");
                if (this.value.length > 9) {
                    s3.css("color", "green");
                } else {
                    s3.css("color", "#ccc");
                }
            } else {
                s2.css("color", "#ccc");
            }
        } else {
            q1.html("○");
            s1.css("color", "#ccc");
        };
        if (pwdReg2.test($(this).val())) {
            q2.html("●");
        } else {
            q2.html("○");
        };
        if (pwdReg3.test($(this).val())) {
            q3.html("●");
        } else {
            q3.html("○");
        };
    });
    //密码的确认验证
    var repwd = $("#repwd");
    var error_repass = $("#error_repass");
    var succ_repass = $("#succ_repass");
    var info_repass = $("#info_repass");
    var passFlag = false;
    repwd.focus(function () {
        error_repass.css("display", "none");
        succ_repass.css("display", "none");
        info_repass.css("display", "block");
    });
    repwd.blur(function () {
        info_repass.css("display", "none");
        if (repwd.val() != "") {
            if (repwd.val() == pwd.val()) {
                succ_repass.css("display", "block");
                passFlag = true;
            } else {
                error_repass.css("display", "block");
                passFlag = false;
            }
        }
    });
    //提交
    var btn = $(".submit-field button");
    var time = 3;
    btn.click(function () {
        if (unameFlag && pwdFlag && passFlag) {

            var pro = new Promise(function (suc, fail) {
                $.ajax({
                    type: "get",
                    data: {
                        uname: uname.val(),
                        upwd: pwd.val()
                    },
                    url: "../js/register.php",
                    success: function (res) {
                        suc(res);
                    }
                });
            });
            pro.then(function (res) {
                if (res == 1) {
                    alert("用户名已占用，请重新注册！");
                } else if (res == 0) {
                    alert("注册失败，请重新注册！");
                } else {
                    //console.log(res);
                    btn.parent().parent().removeClass("active").next().addClass("active");
                    $(".steps ol li").eq(btn.parent().parent().index()).removeClass("active").next().addClass("active");
                    $(".account").html($(".account").html() + uname.val());
                    var timer = setInterval(function () {
                        time--;
                        $(".time").html(time);
                    }, 1000);
                    setTimeout(function () {
                        clearInterval(timer);
                        location.href = "../html/login.html";
                    }, 3000);
                }
            });

        };
    });


});