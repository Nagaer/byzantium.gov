<?php
 include 'conf.php';
  $query = mysqli_query($connect, 'DELETE FROM `trees` WHERE node_id='.strval($_POST["id"]));
  Delete("../".$_POST["addr"]);
?>
