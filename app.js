// window.onload = function () {
//   // ローカルストレージから保存されたタスクを取得
//   const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

//   // タスクを表示するul要素を取得
//   const taskList = document.getElementById("task-list");

//   // // 保存されたタスクをリストに追加
//   // savedTasks.forEach(function (taskText) {
//   //   const taskItem = document.createElement("li");
//   //   taskItem.textContent = taskText;
//   //   taskList.appendChild(taskItem);
//   // });
// };


// ●未済タスクの数カウント関数
function taskCount() {
  const taskCount = document.querySelectorAll("#taskBody .compButton").length;
    document.getElementById("taskCountNum").innerText = taskCount;
}
// ●完了タスクの数カウント関数
function compCount() {
  const taskCount = document.querySelectorAll("#taskBody .delButton").length;
    document.getElementById("compCountNum").innerText = taskCount;
}

document.addEventListener("DOMContentLoaded", () => {
  const titleInput = document.querySelector(".taskTitle input");
  const descInput = document.querySelector(".taskDescription input");
  const addButton = document.querySelector(".taskButton .button");
  const taskTable = document.querySelector("#taskBody");

  // ボタンがクリックされたらタスクを追加
  addButton.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const desc = descInput.value.trim();
    if (!title) return;

    const newTr = document.createElement("tr");
    newTr.classList.add("task", "taskRow");

    const addRow = document.querySelector("#taskBody .addRow");

    requestAnimationFrame(() => {
      newTr.classList.add("show");
    });

    const contentTd = document.createElement("td");
    contentTd.className = "taskContent";

    const titleDiv = document.createElement("div");
    titleDiv.classList.add("taskTitle", "taskTitleDisplay");
    titleDiv.textContent = title;

    const descDiv = document.createElement("div");
    descDiv.classList.add("taskDescription", "taskDescriptionDisplay");
    descDiv.textContent = desc;
    if (!desc) {
      descDiv.classList.add("noBorder");
    };

    contentTd.appendChild(titleDiv);
    contentTd.appendChild(descDiv);

    const buttonTd = document.createElement("td");
    buttonTd.classList.add("button", "taskButton");

    const button = document.createElement("button");
    button.textContent = "完了";
    button.className = "compButton";

    // 完了ボタンクリック時の処理
    button.addEventListener("click", () => {
      button.textContent = "削除";
      button.classList.add("completed");
      button.classList.add("delButton");
      button.classList.remove("compButton");

      titleDiv.classList.add("compStyle");
      descDiv.classList.add("compStyle");

      taskCount();
      compCount();

      // 削除ボタンに切り替えた後の処理
      button.addEventListener("click", () => {
        taskCount();
        compCount();
      }, { once: true });

      // 削除ボタンクリック時の処理
      button.addEventListener("click", () => {
        newTr.remove();
        taskCount();
        compCount();
      });
    });

    buttonTd.appendChild(button);
    newTr.appendChild(contentTd);
    newTr.appendChild(buttonTd);
    taskTable.insertBefore(newTr, addRow);

    titleInput.value = "";
    descInput.value = "";

    taskCount();

  });
});

