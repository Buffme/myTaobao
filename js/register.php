<?php
	include("public.php");
	$db = getConnect("taobao");
    $uname = $_GET["uname"];
    $upwd = $_GET["upwd"];
    $sql = "select uname, upwd from user";
    $result = mysqli_query($db,$sql);
    $flag = false;//控制用户名是否重复，false代表不重复
    while($arr = mysqli_fetch_array($result)){
        if($uname == $arr['uname']){
            $flag = true;
        }     
    }
    if($flag){//用户名重复
        echo 1;
    }else{
        $sql = "insert into user(uname,upwd) values('$uname','$upwd')";
        $row = mysqli_query($db,$sql);
        if($row){
            echo $uname;
        }else{
            echo 0;//注册fail;
        }
    }


	
	
	
?>