<?php
  #просто убиваем куки чтобы юзер мог выйти
  setcookie("id", "", time() - 100);
  setcookie("hash", "", time() - 100);
?>