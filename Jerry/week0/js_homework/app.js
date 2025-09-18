var todoList = [];
var doneList = [];

// HTML 요소들 가져오기
var input = document.getElementById('todoInput');
var addButton = document.getElementById('addButton');
var todoUL = document.getElementById('todoList');
var doneUL = document.getElementById('doneList');

// 할 일 추가하기
function addTodo() {
    var text = input.value;
    
    todoList.push(text);
    input.value = '';
    showTodos();
}

// 완료하기
function complete(index) {
    var item = todoList[index];
    doneList.push(item);
    todoList.splice(index, 1);
    showTodos();
}

// 삭제하기
function deleteDone(index) {
    doneList.splice(index, 1);
    showTodos();
}

// 화면에 보여주기
function showTodos() {
    // 할 일 목록 보여주기
    todoUL.innerHTML = '';
    for (var i = 0; i < todoList.length; i++) {
        var li = document.createElement('li');
        li.innerHTML = todoList[i] + 
            '<div style="margin-top: 5px;"><button class="complete-button" onclick="complete(' + i + ')">완료</button></div>';
        todoUL.appendChild(li);
    }
    
    // 완료 목록 보여주기
    doneUL.innerHTML = '';
    for (var i = 0; i < doneList.length; i++) {
        var li = document.createElement('li');
        li.className = 'done-item';
        li.innerHTML = doneList[i] + 
            '<div style="margin-top: 5px;"><button class="delete-button" onclick="deleteDone(' + i + ')">삭제</button></div>';
        doneUL.appendChild(li);
    }
}

// 버튼 클릭하면 추가하기
addButton.onclick = addTodo;

// 엔터 누르면 추가하기
input.onkeypress = function(e) {
    if (e.key === 'Enter') {
        addTodo();
    }
};