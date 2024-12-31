let listDOM = document.querySelector('#list') 
function newElement(){
    // input değeri
    let inputValue = document.getElementById('task').value;
    
    // input değeri boş ise toast göster
    if(inputValue === "" || !inputValue.replace(/\s/g, '').length){
        $('.error.toast').toast('show');
        return;
    }
    // li elemanı oluşturma
    let liDOM = document.createElement('li');
    
    // li elemanının içeriğini oluşturma
    liDOM.innerHTML=`
    <div class="row d-flex justify-content-between align-items-center w-100">
        <span>${inputValue}</span>
        <span class="badge badge-pill" onclick="removeElement(this)">&times;</span>
    </div>`;
    // li elemanının classlarını ekleme
    liDOM.classList.add('list-group-item','d-flex','justify-content-between','align-items-center')
    liDOM.addEventListener('click', function (){
        liDOM.classList.toggle('list-group-item-success');
        const spanElement = liDOM.querySelector('span:first-child');
        if (liDOM.classList.contains('list-group-item-success')) {
            liDOM.style.backgroundColor = "#276678"; 
            liDOM.style.color = "white";  
            spanElement.style.textDecoration = "line-through";
            spanElement.innerHTML = `✓ ${spanElement.textContent}`;
        } else {
            liDOM.style.backgroundColor = "";
            liDOM.style.color = "";
            spanElement.style.textDecoration = "none";
            spanElement.innerHTML = spanElement.textContent.replace('✓ ', '');
        }
    });
    listDOM.appendChild(liDOM)
    // input değerini temizle
    document.getElementById("task").value ="";
}
function removeElement(element){
    element.parentElement.parentElement.remove();
} 
