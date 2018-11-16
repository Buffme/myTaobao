$(function () {
    new GoShopping();

})
// class IsLogin {
//     constructor() {

//     };

// };
class GoShopping {
    constructor() {
        //若登陆
        this.J_login = $(".J_login a");
        this.cancel = $(".topnav .cancel");
        this.cart = $(".cart");
        this.isLogin();

        this.add = $(".add");
        this.detail_pics_box = $(".detail_pics_box");
        this.my_curt = $(".my_curt");
        this.cartGoodsNum = $(".my_curt .num")
        //保存当前用户名
        this.userName = localStorage.getItem("loginName");
        //保存当前图片id
        this.bid = localStorage.getItem("goodsBid");
        //导入图片
        this.showImg();
        //加入购物车
        this.addCart();
        this.getCartCount();
    };

    showImg() {
        var str = `
                <div class="m_pics">
                    <a class="m_pic" href="#">
                        <img src="../images/goods${this.bid}/m1.png" alt="">
                        <span class="mask"></span>
                    </a>
                </div>
                <div class="l_pics">
                    <img src="../images/goods${this.bid}/l1.png" alt="">
                </div>
                <ul class="s_pics">
                    <li class="s_pic">
                        <a href="#">
                            <img src="../images/goods${this.bid}/s1.png" alt="">
                        </a>
                    </li>
                    <li class="s_pic">
                        <a href="#">
                            <img src="../images/goods${this.bid}/s2.png" alt="">
                        </a>
                    </li>
                    <li class="s_pic">
                        <a href="#">
                            <img src="../images/goods${this.bid}/s3.png" alt="">
                        </a>
                    </li>
                    <li class="s_pic">
                        <a href="#">
                            <img src="../images/goods${this.bid}/s4.png" alt="">
                        </a>
                    </li>
                    <li class="s_pic">
                        <a href="#">
                            <img src="../images/goods${this.bid}/s5.png" alt="">
                        </a>
                    </li>
                </ul>        
        `;
        this.detail_pics_box.append(str);
        this.m_pics = $(".m_pics");
        this.mask = $(".mask");
        this.l_pics = $(".l_pics");
        this.l_pic = $(".l_pics img");
        this.s_pic = $(".s_pic");
        this.m_pic = $(".m_pics img");
        //鼠标移入m_pic与切换图片
        this.moveImg();

    };
    moveImg() {
        var _this = this;
        this.s_pic.mouseover(function () {
            var _that = _this;
            var i = $(this).index();
            _this.m_pic.attr("src", "../images/goods" + _that.bid + "/m" + (i + 1) + ".png");
            _this.l_pic.attr("src", "../images/goods" + _that.bid + "/l" + (i + 1) + ".png");
        });
        this.m_pics.mouseenter(function () {
            _this.mask.show();
            _this.l_pics.show();//.css("display", "block");
            var bigImgL = (_this.m_pic.width() / _this.l_pic.width());
            var bigImgT = (_this.m_pic.height() / _this.l_pic.height());
            var _that = _this;
            _this.m_pics.mousemove(function (e) {
                var l = e.pageX - _that.m_pics.offset().left - _that.mask.width() / 2;
                var t = e.pageY - _that.m_pics.offset().top - _that.mask.height() / 2;
                var maxL = _that.m_pics.width() - _that.mask.width();
                var maxT = _that.m_pics.height() - _that.mask.height();
                l = l < 0 ? 0 : (l >= maxL ? maxL : l);
                t = t < 0 ? 0 : (t >= maxT ? maxT : t);
                _that.mask.css({
                    "left": l,
                    "top": t
                });

                _that.l_pic.css({
                    "left": l / -bigImgL,
                    "top": t / - bigImgT
                });
            });
        });
        this.m_pics.mouseleave(function () {
            _this.mask.hide();
            _this.l_pics.hide();//.css("display", "none");
        });
    };
    addCart() {
        var _this = this;
        this.add.click(function () {
            console.log(1);
            _this.isLogin();
            //点击添加购物车,保存所点击的商品的信息
            var obj = [
                { "bid": _this.bid, "count": 1 }
            ];
            var objStr = JSON.stringify(obj);
            if (!localStorage.getItem(_this.userName + "Goods")) {//当localStorage里面没有任何购物车信息，需要添加何购物车信息
                localStorage.setItem(_this.userName + "Goods", objStr);
            } else {
                var cartGoods = localStorage.getItem(_this.userName + "Goods", objStr);
                var cartGoodsArr = JSON.parse(cartGoods);
                var flag = false;
                for (var i = 0; i < cartGoodsArr.length; i++) {
                    if (cartGoodsArr[i].bid == _this.bid) {
                        cartGoodsArr[i].count++;
                        flag = true;//true表示购物车信息中已存在当前bid商品
                    }
                }
                if (!flag) {//购物车没有当前bid商品
                    var newBidInfo = { "bid": _this.bid, "count": 1 };
                    cartGoodsArr.push(newBidInfo);
                }
                //添加到localStorage中
                var cartGoodsStr = JSON.stringify(cartGoodsArr);
                localStorage.setItem(_this.userName + "Goods", cartGoodsStr);
            }

            //计算购物车的总条数(为了再次点击进页面时也能获取上次加入购物车的数量)
            _this.getCartCount();
        });
    };
    isLogin() {
        var _this = this;
        if (localStorage.getItem("loginName")) {
            //若localStorage有登录名，则登陆成功
            var loginName = localStorage.getItem("loginName");
            //console.log(loginName);
            this.J_login.attr("href", "#").html(loginName).css({ "color": "#6C6C6C", "margin-right": 0 });
            this.cancel.addClass("active").css("left", "200px");
            this.cancel.click(function () {
                localStorage.clear();
                _this.J_login.attr("href", "login.html").html("请登录").css("color", "#f22e00");
                _this.cancel.removeClass("active");
                _this.cancel.css("display", "none");
            });
            this.cart.attr("href", "html/cart.html");

        } else {
            alert("请先注册!");
            location.href = "login.html";
        }
    };
    getCartCount() {
        if (localStorage.getItem(this.userName + "Goods")) {
            var cartGoods = localStorage.getItem(this.userName + "Goods");
            var cartGoodsArr = JSON.parse(cartGoods);

            var sum = 0;
            for (var i = 0; i < cartGoodsArr.length; i++) {
                sum += cartGoodsArr[i].count
            }
            this.cartGoodsNum.html(sum);
            this.transfterToCart();
        } else {
            return;
        }

    }
    transfterToCart() {
        this.my_curt.attr("href", "cart.html?userName=" + this.userName)
    }

}


