<?php
    function generateCode($length=6) {
        $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPRQSTUVWXYZ0123456789";
        $code = "";
        $clen = strlen($chars) - 1;
        while (strlen($code) < $length) {
            $code .= $chars[mt_rand(0,$clen)];
        }
        return $code;
    }
    include 'conf.php';
    if (isset($_COOKIE['errors'])){
        $errors = $_COOKIE['errors'];
        setcookie('errors', '', time() - 60*24*30*12, '/');
    }
    $query = mysqli_query($connect, 'SELECT users_id, users_password FROM `users` WHERE users_login="'.$_POST['login'].'"');
    $res = $query->fetch_assoc();
    if($res['users_password'] === md5(md5($_POST['passw'])))
    {
      # Генерируем случайное число и шифруем его
      $hash = md5(generateCode(10));

      # Записываем в БД новый хеш авторизации и IP
      mysqli_query($connect, "UPDATE users SET users_hash='".$hash."' WHERE users_id='".$res['users_id']."'");

      # Ставим куки
      setcookie("id", $res['users_id'], time()+60*60*24*30);
      setcookie("hash", $hash, time()+60*60*24*30);
      print "Добро пожаловать!";
    }
    else
    {
      print "Вы ввели неправильный логин/пароль";
    }
?>
