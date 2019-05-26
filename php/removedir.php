<?php
  function Delete($path){
    if (is_dir($path) === true){
     $files = array_diff(scandir($path), array('.', '..'));
      foreach ($files as $file){
       Delete(realpath($path) . '/' . $file);
      }
      return rmdir($path);
    } else if (is_file($path) === true) {
     return unlink($path);
    }
    return false;
  }
  function getChilds($node_id){
   include 'conf.php';
   $query = mysqli_query($connect, 'SELECT node_id, node_name, node_data, node_mode FROM `trees` WHERE parent_id='.strval($node_id));
   $arr = [];
   while($res = $query->fetch_assoc()){
    $arr[] = $res;
   }
   return $arr;
  }
  function removeAll($node_id){
    include 'conf.php';
    $childs = getChilds($node_id);
    foreach($childs as $child){
      removeAll($child["node_id"]);
    }
    $query = mysqli_query($connect, 'DELETE FROM `trees` WHERE node_id='.strval($node_id));
  }
  removeAll($_POST["id"]);
  Delete("../".$_POST["addr"]);
?>
