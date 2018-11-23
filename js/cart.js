
$(function () {
    var obj = {
        welcome: $(".welcome"),
        cart: $(".cart"),
        carts: $(".cart_item_box"),
        checkAll: $("#checkAll"),
        totalCount: $(".cart_ft .select_num"),
        selectPrice: $(".cart-sum .selectPrice"),
        totalPrice: $(".cart_ft .total_price"),
        delCartGoods: $(".del")
    };
    new GoCount(obj);

});
class GoCount {
    constructor(obj) {
        //若登陆
        this.welcome = obj.welcome;
        this.cart = obj.cart;
        this.checkAll = obj.checkAll;
        this.carts = obj.carts;
        this.isLogin();
        //获取购物车保存的商品信息
        this.getCartGoods();
        //获取所有商品信息
        this.getGoods();

    };
    isLogin() {
        if (localStorage.getItem("loginName")) {
            this.userName = localStorage.getItem("loginName");
            this.welcome.html(this.welcome.html() + this.userName);
            this.cart.attr("href", "html/cart.html");
        } else {
            // alert("注册不成功，请重新注册!");
            // location.href = "login.html";
        }
    };
    getCartGoods() {
        if (localStorage.getItem(this.userName + "Goods")) {
            var cartGoods = localStorage.getItem(this.userName + "Goods");
            var cartGoodsArr = JSON.parse(cartGoods);
            this.cartGoodsInfo = cartGoodsArr;
        } else {
            this.cartGoodsInfo = null;
        }

    };
    getGoods() {
        var _this = this;
        $.getJSON("../js/goods.json", function (res) {

            //console.log(res);
            _this.goods = res;
            //展示购物车商品
            _this.showGoods(res);

        })
    };
    showGoods(res) {
        //判断是否有购物车商品数据。
        if (this.cartGoodsInfo) {
            //购物车商品存在 
            //str用来保存将要面页面显示的html结构，用于展示购物车商品信息
            var str = "";
            var total = 0;
            // var tPrice = 0;
            for (var i = 0; i < res.length; i++) {
                for (var j = 0; j < this.cartGoodsInfo.length; j++) {
                    //根据购物车信息中商品的编号bid从所有商品数据中获取需要的商品数据。
                    if (res[i].bid == this.cartGoodsInfo[j].bid) {
                        // tPrice = (Number(this.cartGoodsInfo[j].count) * Number(res[i].price)).toFixed(2);
                        str += `
                            <ul class="cart_items">
                                <li>
                                    <input class="checkOne" type="checkbox"/>
									<input class="goodsBid" type="hidden" value="${this.cartGoodsInfo[j].bid}"/>
                                </li>
                                <li class="info">
                                    <img src="../images/goods${this.cartGoodsInfo[j].bid}/s1.png" />
                                    <a class="notes" href="#">${res[i].notes}</a>
                                </li>
                                <li class="uprice">
                                    <span>${res[i].price}</span>
                                </li>
                                <li>
                                    <div class="item-amount">
                                        <a href="#" class="minus">-</a>
                                        <input type="text" class="text-amount" value="${this.cartGoodsInfo[j].count}">
                                        <a href="#" class="plus">+</a>
                                    </div>
                                </li>
                                <li class="price">
                                    <span class="tPrice">${(Number(this.cartGoodsInfo[j].count) * Number(res[i].price)).toFixed(2)}</span>
                                </li>
                                <li class="delete">
                                    <a href="#">删除</a>
                                </li>
                            </ul>
                        `;
                        total += parseInt(this.cartGoodsInfo[j].count);
                    }
                }
            }
            this.carts.html(str);
        }
        this.totalGoods = $(".totalGoods");
        this.totalGoods.html(total);
        //实现购物车的增删改。
        new OperateCartGoods(this);
    };
};
class OperateCartGoods {
    constructor(obj) {
        this.goods = obj.goods;
        this.userName = obj.userName;
        this.carts = obj.carts;
        this.checkAll = obj.checkAll;
        this.totalGoods = $(".totalGoods");
        this.totalCount = $(".cart_ft .select_num")//obj.totalCount; //所选商品总条数
        this.selectPrice = $(".cart-sum .selectPrice")//obj.selectPrice;//所选商品总价
        this.totalPrice = $(".cart_ft .total_price")//obj.totalPrice;
        this.checkOne = $(".checkOne");
        this.delCartGoods = $(".del")//obj.del;//删除所选商品按钮
        this.del = $(".delete");
        this.selectAll();
        this.selectOne();
        this.updateCart(1, ".plus");
        this.updateCart(-1, ".minus");
        this.deleteSelectGoods();
        this.deleteGoods();
        this.computeCart = new ComputeCart(this.userName, this.goods);
    };
    selectAll() {
        var _this = this;
        this.checkAll.click(function () {
            _this.checkOne = $(".checkOne");
            _this.checkOne.prop("checked", $(this).prop("checked"));
            $(this).prop("disabled", true);

            var goodsBid = $(".goodsBid");
            var allCount = 0;
            var allPrice = 0;
            for (var i = 0; i < goodsBid.length; i++) {
                _this.computeCart.getBid(goodsBid.eq(i).val());
                _this.computeCart.getGoodsCount();
                _this.computeCart.getGoodsPrice();

                allCount += _this.computeCart.count;

                allPrice += _this.computeCart.count * _this.computeCart.price;
            }
            //在页面中显示商品总条数
            _this.totalCount.html(allCount);
            //在页面中显示商品总价。
            _this.totalPrice.html(allPrice);
            _this.selectPrice.html(allPrice);

        });

    };
    selectOne() {
        var _this = this;
        this.checkOne.click(function () {
            _this.checkOne = $(".checkOne");
            var flag = true;
            for (var i = 0; i < _this.checkOne.length; i++) {
                if (!_this.checkOne.eq(i).prop("checked")) {
                    flag = false;
                }
            }
            if (!flag) {
                _this.checkAll.prop("checked", false).prop("disabled", false);
            } else {
                _this.checkAll.prop("checked", true).prop("disabled", true);
            };
            var goodsBid = $(".goodsBid");
            var allCount = 0;
            var allPrice = 0;

            for (var i = 0; i < _this.checkOne.length; i++) {
                if (_this.checkOne.eq(i).prop("checked")) {
                    _this.computeCart.getBid(goodsBid.eq(i).val());
                    _this.computeCart.getGoodsCount();
                    _this.computeCart.getGoodsPrice();

                    allCount += _this.computeCart.count;

                    allPrice += _this.computeCart.count * _this.computeCart.price;
                }
            }
            //显示商品总数量
            _this.totalCount.html(allCount);
            //商品总价
            _this.totalPrice.html(allPrice);
            _this.selectPrice.html(allPrice);
        });
    };
    updateCart(num, className) {

        var checkOne = null;
        var _this = this;
        //console.log(1);
        this.carts.delegate(className, "click", function () {
            var bid = $(this).parent().parent().parent().find(".goodsBid").val();
            //console.log(bid);
            _this.computeCart.getBid(bid);
            _this.computeCart.getGoodsCount();
            _this.computeCart.getGoodsPrice();
            _this.computeCart.updateCount(num);
            var goodsCount = $(this).parent().parent().parent().find(".text-amount");
            //当前商品条数小于0时，删除当前ul，删除购物车中的当前商品信息。
            if (_this.computeCart.count < 0) {
                $(this).parent().parent().parent().remove();
                //删除购物车保存的当前商品信息。
                _this.computeCart.delCartGoods();
                _this.selectOne();
                _this.updateCart(0, ".plus");
                _this.updateCart(0, ".minus");
            } else {

                goodsCount.val(_this.computeCart.count);
                $(this).parent().parent().parent().find(".tPrice").html(_this.computeCart.count * _this.computeCart.price);
            }
            checkOne = _this.carts.find(".checkOne");

            var allCount = 0;
            var allPrice = 0;
            var total = 0;
            for (var i = 0; i < checkOne.length; i++) {
                total += Number(_this.carts.find(".text-amount").eq(i).val());
                _this.totalGoods.html(total);
                if (checkOne.eq(i).prop("checked")) {

                    allCount += Number(_this.carts.find(".text-amount").eq(i).val());

                    allPrice += Number(_this.carts.find(".tPrice").eq(i).html());
                }
            }
            console.log(checkOne.length);
            //在页面中显示商品总条数
            _this.totalCount.html(allCount);
            //在页面中显示商品总价。
            _this.totalPrice.html(allPrice);
            _this.selectPrice.html(allPrice);

            //更新localstorage数据
            _this.computeCart.setLocalStorage();
            //更新当前数据
            _this.computeCart.getCart();
            return false;
        });
    };
    deleteSelectGoods() {
        var _this = this;
        var sum = 0;
        //var checkOne = this.carts.find(".checkOne");
        //点击删除所选商品
        this.delCartGoods.click(function () {
            _this.checkOne = $(".checkOne");
            // //遍历所有选中商品
            for (var i = 0; i < _this.checkOne.length; i++) {
                if (_this.checkOne.eq(i).prop("checked")) {

                    _this.computeCart.getBid(_this.checkOne.eq(i).parent().parent().find(".goodsBid").val());
                    sum = Number(_this.checkOne.eq(i).parent().parent().find(".text-amount").val());

                    _this.checkOne.eq(i).parent().parent().remove();
                    _this.computeCart.delCartGoods();
                }
            }

            _this.totalGoods.html(_this.totalGoods.html() - sum);
            _this.totalCount.html(0);
            //在页面中显示商品总价。
            _this.totalPrice.html(0);
            _this.selectPrice.html(0);

            _this.selectOne();
            _this.updateCart(0, ".plus");
            _this.updateCart(0, ".minus");
            //更新localstorage数据
            //_this.computeCart.setLocalStorage();
            //更新当前数据
            //_this.computeCart.getCart();
            // return false;
        });

    };
    deleteGoods() {
        var _this = this;
        var sum = 0;
        //this.totalGoods = $(".totalGoods");
        var allPrice = 0;
        var total = 0;
        this.del.click(function () {
            _this.checkOne = $(".checkOne");
            _this.computeCart.getBid($(this).parent().find(".goodsBid").val());
            sum = Number($(this).parent().find(".text-amount").val());
            $(this).parent().remove();
            _this.computeCart.delCartGoods();

            // _this.totalGoods.html(_this.totalGoods.html() - sum);

            _this.checkOne = $(".checkOne");
            for (var i = 0; i < _this.checkOne.length; i++) {
                console.log(_this.carts.find(".text-amount").eq(i).val());
                total += Number(_this.carts.find(".text-amount").eq(i).val());

                allPrice += Number(_this.carts.find(".tPrice").eq(i).html());
            }

            _this.totalGoods.html(total);
            //在页面中显示商品总条数
            _this.totalCount.html(total);
            //在页面中显示商品总价。
            _this.totalPrice.html(allPrice);
            _this.selectPrice.html(allPrice);

            // _this.totalCount.html(0);
            // //在页面中显示商品总价。
            // _this.totalPrice.html(0);
            // _this.selectPrice.html(0);

            _this.selectOne();
            _this.updateCart(0, ".plus");
            _this.updateCart(0, ".minus");
            //更新localstorage数据
            //_this.computeCart.setLocalStorage();
            //更新当前数据
            //_this.computeCart.getCart();
            // return false;
        });

    }
}
class ComputeCart {
    constructor(userName, goods) {
        this.goods = goods;
        this.userName = userName;
        this.bid = "";
        this.cartArr = null;
        this.count = 0;
        this.price = 0;
        this.getCart();
    };
    getCart() {
        if (localStorage.getItem(this.userName + "Goods")) {
            var cartStr = localStorage.getItem(this.userName + "Goods");
            this.cartArr = JSON.parse(cartStr);
        } else {
            this.cartArr = null;
        }
    };
    //保存当前商品编号
    getBid(bid) {
        this.bid = bid;
    }
    //保存当前所有商品数量
    getGoodsCount() {
        if (this.cartArr) {
            for (var i = 0; i < this.cartArr.length; i++) {
                if (this.cartArr[i].bid == this.bid) {
                    this.count = Number(this.cartArr[i].count);
                }
            }
        }
    };
    //保存数据中所有商品的单价
    getGoodsPrice() {
        for (var i = 0; i < this.goods.length; i++) {
            if (this.goods[i].bid == this.bid) {
                //保存当前商品的单价
                this.price = parseInt(this.goods[i].price);
            }
        }
    };
    //根据num更新当前商品个数
    updateCount(num) {
        //在原来商品个数的基础上更新num个当前商品。
        this.count += num;

    };
    //根据现有的商品个数更新购物车中的商品信息。
    setLocalStorage() {
        var storageStr = localStorage.getItem(this.userName + "Goods");
        var storageArr = JSON.parse(storageStr);
        for (var i = 0; i < storageArr.length; i++) {
            if (storageArr[i].bid == this.bid) {
                storageArr[i].count = this.count;
            };
        }
        var storageJson = JSON.stringify(storageArr);
        localStorage.setItem(this.userName + "Goods", storageJson);
    };
    //删除购物车中该条商品信息。
    delCartGoods() {
        var storageStr = localStorage.getItem(this.userName + "Goods");
        var storageArr = JSON.parse(storageStr);
        for (var i = 0; i < storageArr.length; i++) {
            if (storageArr[i].bid == this.bid) {
                //删除整条该商品信息
                storageArr.splice(i, 1);
                break;
            };
        }
        var storageJson = JSON.stringify(storageArr);
        localStorage.setItem(this.userName + "Goods", storageJson);
    }
}