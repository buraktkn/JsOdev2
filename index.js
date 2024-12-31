let listDOM = document.querySelector('#list') 

// Sayfa yüklendiğinde localStorage'dan verileri yükle
document.addEventListener('DOMContentLoaded', loadTasksFromStorage);

function loadTasksFromStorage() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        createTaskElement(task.text, task.isCompleted);
    });
}

function saveTasksToStorage() {
    const tasks = [];
    document.querySelectorAll('#list li').forEach(li => {
        tasks.push({
            text: li.querySelector('span:first-child').textContent.replace('✓ ', ''),
            isCompleted: li.classList.contains('list-group-item-success')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function newElement(){
    let inputValue = document.getElementById('task').value;
    
    if(inputValue === "" || !inputValue.replace(/\s/g, '').length){
        $('.error.toast').toast('show');
        return;
    }

    createTaskElement(inputValue, false);
    saveTasksToStorage();
    
    // input değerini temizle
    document.getElementById("task").value = "";
    $('.success.toast').toast('show');
}

function createTaskElement(inputValue, isCompleted) {
    let liDOM = document.createElement('li');
    liDOM.innerHTML = `
    <div class="row d-flex justify-content-between align-items-center w-100">
        <span>${inputValue}</span>
        <span class="badge badge-pill" onclick="removeElement(this)">&times;</span>
    </div>`;
    
    liDOM.classList.add('list-group-item','d-flex','justify-content-between','align-items-center');
    
    if (isCompleted) {
        liDOM.classList.add('list-group-item-success');
        const spanElement = liDOM.querySelector('span:first-child');
        liDOM.style.backgroundColor = "#276678";
        liDOM.style.color = "white";
        spanElement.style.textDecoration = "line-through";
        spanElement.innerHTML = `✓ ${spanElement.textContent}`;
    }
    
    liDOM.addEventListener('click', function() {
        liDOM.classList.toggle('list-group-item-success');
        const spanElement = liDOM.querySelector('span:first-child');
        const isCompleted = liDOM.classList.contains('list-group-item-success');
        
        if (isCompleted) {
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
        
        saveTasksToStorage();
    });
    
    listDOM.appendChild(liDOM);
}

function removeElement(element){
    element.parentElement.parentElement.remove();
    saveTasksToStorage();
} 

// Enter tuşu ile görev ekleme
document.getElementById('task').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Formun varsayılan davranışını engelle
        newElement();
    }
}); 
