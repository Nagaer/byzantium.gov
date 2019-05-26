col="#cf9f69";
/*Получаем узел элемента содержащего контент страницы*/
e = document.getElementsByTagName("article")[0];
/*Получаем список излов элементов пунктов меню*/
n = document.getElementById("menu").childNodes;
s=1; /*храним номер текущего выделенного пункта меню*/
o=1; /*храним номер текущего наведённого пункта меню*/
/*Стоит учитывать что переносы текста в HTML javascript тоже считает за узлы DOM
поэтому у узлов пунктов менб лишь нечетные номера*/
xhr = new XMLHttpRequest(); /*Создаём новый объект для запросов http*/
par = new DOMParser(); /*создаём парсер*/
//Функция проверки того что пользователь вощел на сайт
function checkLogin(){
    xhr.open("GET", "php/check.php", false);
    xhr.send(null);
    return xhr.responseText == "";
}
//Получаем логин текущего пользователя
function getLogin(){
    xhr.open("GET", "php/getlogin.php", false);
    xhr.send(null);
    return xhr.responseText;
}
function getStatus(){
    xhr.open("GET", "php/getstatus.php", false);
    xhr.send(null);
    return xhr.responseText;
}
//Меняем внешний вид пункта войти в зависимости от того вошел юзверь или нет
function logonView(){
    l = document.getElementsByName("login")[0];
    if (checkLogin()){
        l.innerHTML = getLogin();
    } else {
        l.innerHTML = "Войти";
    }
}
/*
Эта функция вставляет скриптовый тег в голову документа
В качестве параметров берёт адрес и соедржимое тега
*/
function include_script(url, inner) {
    script = document.createElement('script');
    if(url != null) script.src = url;
    script.innerHTML = inner;
    document.getElementsByTagName('head')[0].appendChild(script);
}
/*
Тоже самое но для прилинкованых объектов
*/
function include_link(url, rel) {
    link = document.createElement('link');
    link.href = url;
    link.rel = rel;
    document.getElementsByTagName('head')[0].appendChild(link);
}
/*
Возвращает исходный стиль после снятия наведения
*/
function OutItem(){
    if(s != o){
        //просто меняем тегу атрибут
        n[o].className = "itemcalm";
    }
}
/*
 функция применяет стиль при наведении
*/
function OverItem(id)
{
    if(s != id){
        if(s != o) n[o].className = "itemcalm";
        o = id;
        n[o].className = "itemcalm itemover";
    }
}
function LoadHTML(addr){
  xhr.open("GET", addr, false);
  xhr.send(null);
  return xhr.responseText;
}
//Показывает подгруженный контент
function ShowHTML(addr, id){
  n[s].className = "itemcalm";
  s = id;
  n[s].className = "itemcalm itemselect";
  //Получаем текст нужного нам файла
  res = LoadHTML("html/"+addr);
  //alert(LoadHTML("html/"+addr));
  //Получаем дерево DOM из текста файла
  res = par.parseFromString(res,"text/html");
  //Находим там тело файла и сохраняем его
  bod = res.getElementsByTagName("body")[0];
  start_src=bod.getAttribute("onload");
  //Находим скрипты и линки
  scripts = res.getElementsByTagName("script");
  links = res.getElementsByTagName("link");
  //Перебираем их все и добавляем в текущий документ
  for(var i = 0; i < scripts.length; i++){
      src = scripts[i].getAttribute("src");
      include_script(scripts[i].getAttribute("src"), scripts[i].innerHTML);
  }
  for(var i = 0; i < links.length; i++){
      include_link(links[i].getAttribute("href"), links[i].getAttribute("rel"));
  }
  //Заполняем тег артикл содержимым тега body из загруженного файла
  document.getElementsByTagName("article")[0].firstChild.remove();
  document.getElementsByTagName("article")[0].innerHTML = "<div>"+bod.innerHTML+"</div>";
  if (start_src!=null){
    eval(start_src)
  }
}
function getParent(id){
  message = "id="+encodeURIComponent(id);
  xhr.open("POST", "php/getparent.php", false);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(message);
  return xhr.responseText;
}
function getName(id){
  message = "id="+encodeURIComponent(id);
  xhr.open("POST", "php/getname.php", false);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(message);
  return xhr.responseText;
}
function getLevel(id){
  node = id;
  inc = 0;
  while (Number(getParent(node)!=0)){
   node = getParent(node);
   inc = inc+1;
  }
  return inc;
}
function createFolder(addr){
  message = "addr="+encodeURIComponent(addr);
  xhr.open("POST", "php/createdir.php", false);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(message);
}
function createFile(addr, text){
  alert(text);
  message = "addr="+encodeURIComponent(addr)+"&text="+encodeURIComponent(text);
  xhr.open("POST", "php/createfile.php", false);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(message);
}
function removeFile(id){
 if(confirm("Вы действительно хотите удалить раздел?")){
 message = "addr="+encodeURIComponent("html/"+getURL(id)+".html")+"&id="+encodeURIComponent(id);
 xhr.open("POST", "php/removefile.php", false);
 xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
 xhr.send(message);
 document.location.reload();
}
}
function editFolder(id){
 if(checkLogin()){
 if(getStatus()=="admin"){
  rename = confirm("Переименовать каталог разделов?");;
  remove = false;
  if(!rename){
   remove = confirm("Удалить каталог разделов?");
  }
  if(remove){
   message = "addr="+encodeURIComponent("html/"+getURL(id))+"&id="+encodeURIComponent(id);
   xhr.open("POST", "php/removedir.php", false);
   xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
   xhr.send(message);
  }
  if(rename){
   newname = prompt("Введите новое имя:", "Новое имя");
   renameFolder(id, newname);
  }
  document.location.reload();
 }
 }
}
function getURL(id){
 parent = getParent(id);
 res = toLatin(getName(id));
 while (Number(parent)!=0) {
   res = toLatin(getName(parent))+"/"+res;
   parent = getParent(parent);
 }
 return res;
}
function renameFolder(id, newname){
  message = "id="+encodeURIComponent(id)+"&oldname="+encodeURIComponent(getName(id))+"&newname="+encodeURIComponent(newname)+"&url="+encodeURIComponent("html/"+getURL(id));
  xhr.open("POST", "php/renamefile.php", false);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(message);
}
function addNode(id){
 isCreate = confirm("Создать новый узел дерева?");
 if(isCreate){
  name = prompt("Введите имя нового узла:", "newnode");
  data = "";
  if(getLevel(id)>1){
   isFolder = false;
  }else{
   isFolder = confirm("Создать каталог разделов? Нажмите отмена, чтобы создать обычный раздел.");
  }
  if (!isFolder){
   createFile("html/"+getURL(id)+"/"+toLatin(name)+".html","html/"+getURL(id)+"/"+toLatin(name)+".html");
   node_mode = "article";
   data = "html/"+getURL(id)+"/"+toLatin(name)+".html";
   alert("Раздел создан!");
  } else {
   createFolder("html/"+getURL(id)+"/"+toLatin(name));
   node_mode = "folder";
   alert("Каталог создан!");
  }
  message = "node_name="+encodeURIComponent(name)+"&parent_id="+encodeURIComponent(id)+"&node_data="+encodeURIComponent(data)+"&node_mode="+encodeURIComponent(node_mode);
  xhr.open("POST", "php/newnode.php", false);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(message);
  document.location.reload();
 }
}
function ShowLogin(){
  if(checkLogin()){
    addr = "user.html";
  } else {
    addr = "login.html";
  }
  ShowHTML(addr, 15);
}
function toLatin(cyril){
  message = "cyril="+encodeURIComponent(cyril);
  xhr.open("POST", "php/tolatin.php", false);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(message);
  return xhr.responseText;
}
function renameFile(id, newname){
 message = "id="+encodeURIComponent(id)+"&oldname="+encodeURIComponent(getName(id))+"&newname="+encodeURIComponent(newname)+"&url="+encodeURIComponent("html/"+getURL(id)+".html");
 xhr.open("POST", "php/renamedir.php", false);
 xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
 xhr.send(message);
}
function saveFile(id){
 newname = document.getElementsByName("filename")[0].value;
 filetext = document.getElementsByName("editor")[0].value;
 renameFile(id, newname);
 createFile("html/"+getURL(id)+".html", filetext);
 document.location.reload();
}
function loadEditor(id){
  text = LoadHTML("html/"+getURL(id)+".html");
  edit = "<form action='php/save.php' method='post'><table>"+
  "<tr> <td>Имя:</td><td><input name='filename' value='"+getName(id)+"'><td></tr>"+
  "<tr><td valign='top'>Исходный текст: </td><td><textarea name='editor' style='resize: none; width: 600px; height: 600px'>"+
  text+
  "</textarea></td></tr>"+
  "<tr><td><input type='button' onclick='removeFile("+id+
  ")' value='Удалить раздел' style='width: 100%;'></td><td><input type='button' onclick='saveFile("+id+
  ")' value='Сохранить изменения' style='width: 100%;'></td></tr>"+
  "</table></form>";
  return edit;
}
function selectNode(id){
  xhr.open("GET", "php/getselect.php", false);
  xhr.send(null);
  res = xhr.responseText;
  node = document.getElementById("node_"+res);
  node.style.backgroundColor = col;
  node = document.getElementById("node_"+id);
  col = node.style.backgroundColor;
  message = "node="+encodeURIComponent(id);
  xhr.abort();
  xhr.open("POST", "php/selectnode.php", false);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(message);
  xhr.abort();
  xhr.open("GET", "php/getdata.php", false);
  xhr.send(null);
  res = xhr.responseText;
  xhr.open("GET", res, false);
  xhr.send(null);
  res = xhr.responseText;
  node.style.backgroundColor = "red";
  document.getElementsByName("space")[0].innerHTML = res;
  if (getStatus()=="admin"){
   document.getElementsByName("space")[0].innerHTML = loadEditor(id);
  }
}
function loadTree(id){
  status = "";
  if(checkLogin()){
    status = getStatus();
  }
  message = "id="+encodeURIComponent(id)+"&status="+encodeURIComponent(status);
  xhr.open("POST", "php/tree.php", false);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.send(message);
  res = xhr.responseText;
  document.getElementsByName("content")[0].innerHTML = res;
  xhr.open("GET", "html/test2.html", false);
  xhr.send(null);
  res = xhr.responseText;
  xhr.open("GET", "php/getselect.php", false);
  xhr.send(null);
  res = xhr.responseText;
  xhr.abort();
  selectNode(res);
}
//Устанавливаем разделом по умолчанию о правительстве
ShowHTML('about.html', 1);
//renameFolder(67,"Совет Федерации");
