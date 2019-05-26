<?php
    include 'conf.php';
    function addUser($users_login, $users_password, $users_status, $users_email, $connect)
    {
        $err = array();
        #идет проврека пользователя на соответствие правилам регистрации
        if(!preg_match("/^[a-zA-Z0-9]+$/",$users_login))
        {
            $err[] = "Логин может состоять только из букв английского алфавита и цифр!";
        }

        if(strlen($users_login) < 3 or strlen($users_login) > 30)
        {
            $err[] = "Логин должен быть не меньше 3-х символов и не больше 30!";
        }

        if (!filter_var($users_email, FILTER_VALIDATE_EMAIL)) {
            $err[] = "Адрес указан не правильно.";
        }

        $query = mysqli_query($connect, 'SELECT count(users_id) FROM `users` WHERE users_login="'.$users_login.'"');
        $res = $query->fetch_assoc();
        if ($res["count(users_id)"]>0){
            $err[] = "Пользователь с таким логином уже существует";
        }
        $query = mysqli_query($connect, 'SELECT count(users_id) FROM `users` WHERE users_email="'.$users_email.'"');
        $res = $query->fetch_assoc();
        if ($res["count(users_id)"]>0){
            $err[] = "Пользователь с таким email уже существует";
        }
        #Если все норм создаём юзверя и шифруем пароль
        if(count($err) == 0){
            $password = md5(md5(trim($users_password)));
            $add = $connect->query("INSERT INTO byzantium_bd.users (users_id, users_login, users_password, users_status, users_email) VALUES  (NULL, '$users_login', '$password', '$users_status', '$users_email')");
        }
        if ($err!=null) {
            print "При регистрации произошли следующие ошибки:";
            foreach($err AS $error)
            {
              print $error." ";
            }
        } else {
            print "Вы успешно зарегистрировались! Введите ваши логин и пароль и нажмите <вход>";
        }
    }
    addUser($_POST["login"], $_POST["passw"], "civil", $_POST["email"], $connect);
?>
