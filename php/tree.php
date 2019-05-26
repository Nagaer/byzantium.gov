<?php
 $not_folder = -1;
 function getNode($node_id){
  include 'conf.php';
  $query = mysqli_query($connect, 'SELECT parent_id, node_name, node_data, node_mode FROM `trees` WHERE node_id='.strval($node_id));
  $res = $query->fetch_assoc();
  return $res;
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
 function getTree($node_id,$level){
  global $not_folder;
  if(($not_folder == -1)and(getNode($node_id)["node_mode"]=="article")){
   $not_folder = $node_id;
  }
  $button = '<div><p onclick="addNode('.$node_id.')">[добавить подраздел]</p></div>';
  if (($_POST["status"]!="admin")or($level>2)or(getNode($node_id)["node_mode"]=="article")) $button = "";
  if ((getChilds($node_id)==NULL)and(getNode($node_id)["parent_id"]!=NULL)){
    if (getNode($node_id)["node_mode"]=="folder"){
     $res = '<div><p id="node_'.$node_id.'" onclick="editFolder('.strval($node_id).')">'.getNode($node_id)["node_name"].'</p>'.$button.'</div>';
   } else {
     $res = '<div><p id="node_'.$node_id.'" onclick="selectNode('.strval($node_id).')">'.getNode($node_id)["node_name"].'</p>'.$button.'</div>';
   }
  } else {
    if (getNode($node_id)["parent_id"]==NULL) {
      $res = '<div class="treeHTML"><p id="node_'.$node_id.'">'.getNode($node_id)["node_name"].'</p>'.$button;
    } elseif (getNode($node_id)["node_mode"]=="folder"){
      $res = '<div><p id="node_'.$node_id.'" onclick="editFolder('.strval($node_id).')">'.getNode($node_id)["node_name"].'</p><details><summary></summary>'.$button;
    } else {
      $res = '<div><p id="node_'.$node_id.'" onclick="selectNode('.strval($node_id).')">'.getNode($node_id)["node_name"].'</p><details><summary></summary>'.$button;
    }
    $arr = getChilds($node_id);
    foreach($arr as $child){
      $res = $res.getTree(intval($child["node_id"]),$level+1);
    }
    if (getNode($node_id)["parent_id"]==NULL) {
      $res = $res.'</div>';
    } else {
      $res = $res.'</details></div>';
    }
  }
  return $res;
 }
 echo getTree($_POST["id"],0);
 echo '<div class="content" name="space"></div>';
 setcookie("node", $not_folder, time()+60*60*24*30);
?>
