<?php
    #возвращаем в виде текста имя пользователя
    include 'conf.php';
    $query = mysqli_query($connect, 'SELECT users_status FROM `users` WHERE users_id="'.$_COOKIE['id'].'" LIMIT 1');
    $res = $query->fetch_assoc();
    echo $res["users_status"];
?>
