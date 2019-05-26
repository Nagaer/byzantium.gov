<?php
include 'conf.php';
# проверка авторизации
if (isset($_COOKIE['id']) and isset($_COOKIE['hash']))
{
    $query = mysqli_query($connect, "SELECT * FROM users WHERE users_id = '".intval($_COOKIE['id'])."' LIMIT 1");
    $res = $query->fetch_assoc();
    if(($res['users_hash'] !== $_COOKIE['hash']) or ($res['users_id'] !== $_COOKIE['id']))
    {
        setcookie('id', '', time() - 60*24*30*12, '/');
        setcookie('hash', '', time() - 60*24*30*12, '/');
        setcookie('errors', '1', time() + 60*24*30*12, '/');
        echo "1";
    }
}
else
{
    echo "2";
}
?>
