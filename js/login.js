//Вход зареганого пользователя
function sendSigninData(){
    login = document.getElementsByName("nick")[0].value;
    passw = document.getElementsByName("passw")[0].value;
    message = "login="+encodeURIComponent(login)+"&passw="+encodeURIComponent(passw);
    xhr.open("POST", "php/login.php", false);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(message);
    alert(xhr.responseText);
    if(xhr.responseText == "Добро пожаловать!"){
        document.location.reload();
    }
}
//Регистрация нового юзверя
function sendSignupData(){
    login = document.getElementsByName("nick")[0].value;
    passw = document.getElementsByName("passw")[0].value;
    email = document.getElementsByName("email")[0].value;
    alert(email);
    message = "login="+encodeURIComponent(login)+"&passw="+encodeURIComponent(passw)+"&email="+encodeURIComponent(email);
    xhr.open("POST", "php/register.php", false);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(message);
    alert(xhr.responseText);
}
