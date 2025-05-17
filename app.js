// ●タスクを保存する関数
// function saveTasks() {
//   const tasks = [];
//   document.querySelectorAll("#taskBody .taskRow").forEach(taskEl => {
//     const title = taskEl.querySelector(".taskTitleAdd")?.textContent || "";
//     const desc = taskEl.querySelector(".taskTitleAdd")?.textContent || "";
//     const isCompleted = taskEl.querySelector("button").classList.contains("delButton");

//     tasks.push({title, desc, isCompleted});
//   });

//   localStorage.setItem("taskList", JSON.stringify(tasks));

// }

// ●ページロード時に読み込む関数
// function loadTasks() {
//   const tasks = JSON.parse(localStorage.getItem("taskList") || "[]");
//     tasks.forEach(task => addTask(task.title, task.desc, task.isCompleted));
// }

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
  const addButton = document.querySelector(".taskButton .addButton");
  const taskBody = document.getElementById("taskBody");

  addButton.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const desc = descInput.value.trim();
    if (!title) return;

    // 新しいタスクの要素を作成
    const newTask = document.createElement("div");
    newTask.classList.add("taskContainerAdd", "taskContainer", "taskRow");

    // アニメーション用
    requestAnimationFrame(() => {
      newTask.classList.add("show");
  });

    // タイトルと説明部分
    const taskInputAdd = document.createElement("div");
      taskInputAdd.classList.add("taskInputAdd");

    const titleDiv = document.createElement("div");
      titleDiv.classList.add("taskTitle", "taskTitleAdd");
      titleDiv.textContent = title;

    const descDiv = document.createElement("div");
      descDiv.classList.add("taskDescription", "taskDescriptionAdd");
      descDiv.textContent = desc;
        if (!desc) descDiv.classList.add("noBorder");

    taskInputAdd.appendChild(titleDiv);
    taskInputAdd.appendChild(descDiv);

    // ボタン部分
    const taskButtonAdd = document.createElement("div");
      taskButtonAdd.classList.add("taskButtonAdd");

    const button = document.createElement("button");
      button.classList.add("compButton");
      button.textContent = "完了";

    taskButtonAdd.appendChild(button);

    // 追加の処理
    newTask.appendChild(taskInputAdd);
    newTask.appendChild(taskButtonAdd);

    // 登録バー（addRow）の前に挿入
    const addRow = document.querySelector(".addRow");
      taskBody.insertBefore(newTask, addRow);

    // 入力リセット
    titleInput.value = "";
    descInput.value = "";

    taskCount();

    // 完了 → 削除への切り替え
    button.addEventListener("click", () => {
      button.textContent = "削除";
      button.classList.remove("compButton");
      button.classList.add("delButton");
      taskInputAdd.classList.remove("taskInputAdd");
      taskInputAdd.classList.add("compStyle");

      taskCount();
      compCount();

      // 削除処理
      button.addEventListener("click", () => {
        newTask.remove();
        taskCount();
        compCount();
      }, { once: true });
    });
  });
});

