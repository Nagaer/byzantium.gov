<?php
  include 'conf.php';
  $fp = fopen("../".$_POST["addr"], 'w+');
  fwrite($fp,$_POST["text"]);
  fclose($fp);
?>
