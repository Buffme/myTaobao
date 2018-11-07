<?php
	header("content-type:text/html;charset=utf-8");
	function getConnect($dataBase){
		$db = mysqli_connect("localhost","root","",$dataBase);
		mysqli_query($db,"set names utf8");
		return $db;
	}
?>