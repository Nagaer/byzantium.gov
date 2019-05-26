<?php
  include 'conf.php';
  $query = mysqli_query($connect, 'SELECT node_data FROM `trees` WHERE node_id="'.$_COOKIE['node'].'" LIMIT 1');
  $res = $query->fetch_assoc();
  echo $res["node_data"];
?>
