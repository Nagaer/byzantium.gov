<?php
    #возвращаем в виде текста имя пользователя
    include 'conf.php';
    $parent_id = $_POST["parent_id"];
    $node_name = $_POST["node_name"];
    $node_data = $_POST["node_data"];
    $node_mode = $_POST["node_mode"];
    $add = $connect->query("INSERT INTO byzantium_bd.trees (node_id, parent_id, node_name, node_data, node_mode) VALUES  (NULL, '$parent_id', '$node_name', '$node_data', '$node_mode')");
    $res = $query->fetch_assoc();
    echo $res["users_status"];
?>
