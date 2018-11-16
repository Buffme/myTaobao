$(function () {
    //若登陆
    var J_login = $(".J_login a");
    var cancel = $(".topnav .cancel");
    var cart = $(".cart");
    if (localStorage.getItem("loginName")) {
        //若localStorage有登录名，则登陆成功
        var loginName = localStorage.getItem("loginName");
        //console.log(loginName);
        J_login.attr("href", "#").html(loginName).css({ "color": "#6C6C6C", "margin-right": 0 });
        cancel.addClass("active");
        cancel.click(function () {
            localStorage.clear();
            J_login.attr("href", "../myTaobao/html/login.html").html("亲，请登录").css("color", "#f22e00");
            cancel.removeClass("active");
            cancel.css("display", "none");

        });
        cart.attr("href", "html/cart.html");
    } else {
        // alert("注册不成功，请重新注册!");
        // location.href = "../myTaobao/html/login.html";
    }
    //图片轮播
    var indexB = 0;
    var banner = $(".banner-l-t");
    var bannerImg = $(".bannerImg");
    var arrB = $(".banner-l-t .arrow a");
    var toLeftB = $(".banner-l-t .toLeft");
    var toRightB = $(".banner-l-t .toRight");
    var bnLi = $(".bannerNav li");
    var bnTimer = null;
    bnTimer = setInterval(bnAutoPlay, 1000);
    function bnAutoPlay() {
        if (indexB == 4) {
            bannerImg.css({ left: 0 });
            indexB = 1;
        } else {
            indexB++;
        }
        bannerImg.animate({ left: -indexB * 520 });
        bnLi.eq(indexB == bnLi.size() ? 0 : indexB).addClass("active").siblings().removeClass("active");
    }
    banner.mouseenter(function () {
        clearInterval(bnTimer);
        $(this).find(arrB).css("display", "flex");
    });
    banner.mouseleave(function () {
        bnTimer = setInterval(bnAutoPlay, 1500);
        $(this).find(arrB).css("display", "none");
    });
    toLeftB.click(function () {
        if (indexB == 0) {
            bannerImg.css({ left: -520 * 4 });
            indexB = 3;
        } else {
            indexB--;
        }
        bannerImg.stop().animate({ left: -520 * indexB });
        bnLi.eq(indexB).addClass("active").siblings().removeClass("active");
        return false;
    });
    toRightB.click(function () {
        if (indexB == 4) {
            bannerImg.css({ left: 0 });
            indexB = 1;
        } else {
            indexB++;
        }
        bannerImg.stop().animate({ left: -520 * indexB });
        bnLi.eq(indexB == bnLi.size() ? 0 : indexB).addClass("active").siblings().removeClass("active");
        return false;
    });
    //天猫轮播动画
    var indexT = 0
    var tmall = $(".banner-l-b");
    var tmImg = $(".banner-l-b .tmall-b-con");
    var tmNum = $(".banner-l-b .tmall-num");
    var tmBar = $(".tmall-bar li");
    var arrT = $(".banner-l-b .arrow a");
    var toLeftT = $(".banner-l-b .toLeft");
    var toRightT = $(".banner-l-b .toRight");
    //动态添加第一个li
    var liStr = `                                            
            <li>
                <a href="">
                    <img src="images/bb1.jpg" alt="">
                </a>
                <a href="">
                    <img src="images/bb2.jpg" alt="">
                </a>
            </li>`;
    tmImg.append(liStr);
    var tmTimer = null;
    tmTimer = setInterval(tmAutoPlay, 2000);
    function tmAutoPlay() {
        if (indexT == 6) {
            tmImg.css({ left: 0 });
            indexT = 1;
        } else {
            indexT++;
        }
        tmImg.animate({ left: -indexT * 520 });
        tmNum.html(indexT + 1 == 7 ? 1 + "/6" : indexT + 1 + "/6");
        tmBar.eq(indexT == 6 ? 0 : indexT).css("background", "#000").siblings().css("background", "#ff1648");
        //console.log(indexT);
    }
    tmall.hover(function () {
        clearInterval(tmTimer);
        $(this).find(arrT).css("display", "flex");
    }, function () {
        tmTimer = setInterval(tmAutoPlay, 1000);
        $(this).find(arrT).css("display", "none");
    })
    toLeftT.click(function () {
        if (indexT == 0) {
            tmImg.css({ left: -520 * 6 });
            indexT = 5;
        } else {
            indexT--;
        }
        tmImg.stop().animate({ left: -520 * indexT });
        tmNum.html(indexT + 1 == 7 ? 1 + "/6" : indexT + 1 + "/6");
        tmBar.eq(indexT == 6 ? 0 : indexT).css("background", "#000").siblings().css("background", "#ff1648");
        return false;
    });
    toRightT.click(function () {
        if (indexT == 6) {
            tmImg.css({ left: 0 });
            indexT = 1;
        } else {
            indexT++;
        }
        tmImg.stop().animate({ left: -520 * indexT });
        tmNum.html(indexT + 1 == 7 ? 1 + "/6" : indexT + 1 + "/6");
        tmBar.eq(indexT == 6 ? 0 : indexT).css("background", "#000").siblings().css("background", "#ff1648");
        return false;
    });
    //公告选项卡
    var notice = $(".notice-t ul li");
    var notice_con = $(".notice-b ul li");
    notice.mouseenter(function () {
        $(this).addClass("select").siblings().removeClass("select");
        //$(this).addClass("active").siblings().removeClass(function () { return $(this).attr("class") });
        console.log($(this).index());
        notice_con.eq($(this).index()).show().siblings().hide();
    })

})