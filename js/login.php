<?php
	include("public.php");
	$db = getConnect("taobao");
	$sql = "select uname, upwd from user";
	$uname = $_GET["uname"];
	$upwd = $_GET["upwd"];
	$result = mysqli_query($db,$sql);
	$unameFlag = false;
    $flag = false;
    while($arr = mysqli_fetch_array($result)){
        if($uname == $arr['uname'] && $upwd == $arr['upwd']){
            $flag = true;
        }     
    }
    if($flag){
		echo $uname;
		//"<script>alert('登录成功');location.href='../index.html'</script>";
    }else{
		echo 0;//密码不正确
		//"<script>alert('用户名或密码不正确，请重新登录或注册！');location.href='../login.html'</script>";
	}

	
	
	
?>