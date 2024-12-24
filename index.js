let listDOM = document.querySelector('#list') 
function newElement(){
    let inputValue = document.getElementById('task').value;
    // input değeri
    let liDOM = document.createElement('li');
    // li elemanı oluşturma
    liDOM.innerHTML=inputValue;
    //input değerini li'ye atama
    listDOM.appendChild(liDOM)
    //ul'ye append ile input değeri atanmış li atama
    document.getElementById("task").value =" ";
}