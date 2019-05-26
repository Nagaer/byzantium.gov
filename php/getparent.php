<?php
  include 'conf.php';
  $query = mysqli_query($connect, 'SELECT parent_id FROM `trees` WHERE node_id="'.strval($_POST["id"]).'" LIMIT 1');
  $res = $query->fetch_assoc();
  echo $res["parent_id"];
?>
