//Выход и убийство куки
function exitLogin(){
    xhr.open("GET", "php/exit.php", false);
    xhr.send(null);
    document.location.reload();
}
