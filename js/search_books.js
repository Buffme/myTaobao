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
            J_login.attr("href", "login.html").html("亲，请登录").css("color", "#f22e00");
            cancel.removeClass("active");
            cancel.css("display", "none");

        });
        cart.attr("href", "html/cart.html");
    } else {
        // alert("注册不成功，请重新注册!");
        // location.href = "login.html";
    }

    //显示筛选
    var expand = $(".expand");
    var collapse = $(".collapse");
    var cat_bd = $(".cat_bd");
    var down = $(".down");
    var up = $(".up");
    var cat_bd_con = $(".cat_bd_con");
    var cBody = $(".cat_bd_con .body");
    expand.click(function () {
        $(this).hide();
        collapse.show();
        cat_bd.show();
    });
    collapse.click(function () {
        $(this).hide();
        expand.show();
        cat_bd.hide();
    });
    down.click(function () {
        $(this).hide();
        up.show();
        cat_bd_con.css("height", "108px");
        cBody.css("overflow", "scroll");

    });
    up.click(function () {
        $(this).hide();
        down.show();
        cat_bd_con.css("height", "38px")
        cBody.css("overflow", "hidden");
    });
    //加载数据
    var main_goods = $(".main_goods");
    var hot_items = $(".hot_items");
    $(window).load(function () {
        $.getJSON("../js/goods.json", function (res) {
            var str = "";
            for (var i = 0; i < res.length - 4; i++) {
                str += `
                    <div class="goods_item">
                    <input class="goodsBid" type="hidden" value="${res[i + 4].bid}">
                        <div class="pic_box">
                            <a class="pic" href="details_book.html">
                                <img src="../images/${res[i + 4].src}" alt="">
                            </a>
                            <div class="similars">
                                <i class="bar"></i>
                                <a class="disabled" href="#">找同款</a>
                                <a href="#">找相似</a>
                            </div>
                        </div>
                        <div class="ctx-box">
                            <div class="row row-1 clearfix">
                                <div class="price">
                                    <span>¥</span>
                                    <strong>${res[i + 4].price}</strong>
                                </div>
                                <div class="deal-cnt">${res[i + 4].deals}人付款</div>
                                <div class="ship icon-service-free"></div>
                            </div>
                            <div class="row row-2 clearfix">
                                <a href="details_book.html">${res[i + 4].notes}</a>
                            </div>
                            <div class="row row-3 clearfix">
                                <div class="shop">
                                    <a class="shopname" href="#">
                                        <i class="iconfont icon-goutongye_santiaogang_tiaozhuanxuanzehaizi"></i>
                                        <span>${res[i + 4].shopname}</span>
                                    </a>
                                </div>
                                <div class="location">${res[i + 4].location}</div>
                            </div>
                            <div class="row row-4 clearfix">
                                <ul class="icons">
                                    <li class="icon">
                                        <span class="icon_tmall" title="尚天猫，就购了"></span>
                                    </li>
                                </ul>
                                <a class="wangwang" href="#">旺旺在线</a>
                            </div>
                        </div>
                    </div>
                `;

            }

            main_goods.append(str);
            //显示找同款找相似
            var pic_box = $(".pic_box");
            pic_box.mouseenter(function () {
                $(this).find(".similars").stop().slideDown("fast");//.css("bottom", "0px")
            });
            pic_box.mouseleave(function () {
                $(this).find(".similars").stop().slideUp("fast");
            });
            //保存goodsBid
            var notes = $(".row-2 a");

            pic_box.click(function () {
                var goodsBid = $(this).parent().find(".goodsBid").val();
                console.log(goodsBid);
                localStorage.removeItem("goodsBid");
                localStorage.setItem("goodsBid", goodsBid);
            });
            notes.click(function () {
                localStorage.removeItem("goodsBid");
                localStorage.setItem("goodsBid", goodsBid);
            });
        });
        $.getJSON("../js/hotgoods.json", function (res) {
            var hStr = "";
            for (var i = 0; i < res.length - 1; i++) {
                hStr += `
                    <li class="hot_item">
                        <div class="img">
                            <a href="#">
                                <img src="../images/${res[i + 1].src}" alt="">
                            </a>
                        </div>
                        <a class="info" href="#">
                            <span class="tmall"></span>
                            <span class="yuan">¥</span>
                            <strong>${res[i + 1].price}</strong>
                            <div class="sell" href="#">
                                <span>销量：</span>
                                <em>${res[i + 1].deals}</em>
                            </div>
                        </a>
                        <div class="feedback">
                            <a class="like" href="#">喜欢</a>
                            <a class="unlike" href="#">不喜欢</a>
                            <div class="bar">
                                <p>${res[i + 1].notes}</p>
                            </div>

                        </div>
                    </li>         
                `;
            }
            hot_items.append(hStr);

            //显示找同款找相似
            var hot_item = $(".hot_item");
            hot_item.mouseenter(function () {
                $(this).find(".feedback").stop().show();//.css("bottom", "0px")
            });
            hot_item.mouseleave(function () {
                $(this).find(".feedback").stop().hide();
            });

        });
    });
})



