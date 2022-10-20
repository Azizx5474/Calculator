const input = document.getElementById("input");
const btn_numbers = document.querySelectorAll(".btn_number");
const btn_basic_operation = document.querySelectorAll(".btn_basic_operation");
const equal = document.querySelector(".equal");
const btn_dot = document.querySelector(".btn_dot");
const btn_clear = document.querySelector(".btn_clear");
const btn_sqrt = document.querySelector(".btn_sqrt");
const btn_delete = document.querySelector(".btn_delete");

let first_number = 0;
let operation = "";
let key_operation = "";
let count_dot = 0;

function check_operation_and_clear_input(symbol) {
  first_number = input.value;
  input.value = "";
  operation = symbol;
}

function get_result(operation) {
  if (operation === "+") {
    console.log(parseInt(first_number));
    input.value = parseFloat(first_number) + parseFloat(input.value);
  }
  if (operation === "-") {
    input.value = parseFloat(first_number) - parseFloat(input.value);
  }

  if (operation === "*") {
    input.value = parseFloat(first_number) * parseFloat(input.value);
  }

  if (operation === "/") {
    if (parseFloat(input.value) === 0) {
      input.value = "На ноль делить нельзя!";
    } else {
      input.value = parseFloat(first_number) / parseFloat(input.value);
    }
  }

  if (operation === "%") {
    input.value = (parseFloat(first_number) * parseFloat(input.value)) / 100;
  }
  
}

function calculator() {
  // Проверяем инпут на цифры
  input.addEventListener("input", (e) => {
    if (isNaN(e.data)) {
      input.value = input.value.substring(0, input.value.length - 1);
    }
  });

  // Проверяем какие кнопки были нажаты
  input.addEventListener("keydown", (e) => {
    console.log(e.which);
    if (e.which === 107) {
      key_operation = "+";
      check_operation_and_clear_input(key_operation);
    }
    if (e.which === 109) {
      key_operation = "-";
      check_operation_and_clear_input(key_operation);
    }
    if (e.which === 106) {
      key_operation = "*";
      check_operation_and_clear_input(key_operation);
    }
    if (e.which === 111) {
      key_operation = "/";
      check_operation_and_clear_input(key_operation);
    }

    if (e.which === 46) {
      input.value = "";
    }

    if (e.which === 187) {
      get_result(key_operation);
    }
  });

  // Нажимаем цифры
  for (let i = 0; i < btn_numbers.length; i++) {
    btn_numbers[i].addEventListener("click", (e) => {
      input.value += e.target.textContent;
    });
  }

  // Если нажали точку, то десятичные числа
  btn_dot.addEventListener("click", (e) => {
    if (input.value !== "" && count_dot === 0) {
      input.value += e.target.textContent;
      count_dot++;
    }
  });

  // Нажимаем 4 базовые операции
  for (let i = 0; i < btn_basic_operation.length; i++) {
    btn_basic_operation[i].addEventListener("click", (e) => {
      const symbol = e.target.textContent;
      check_operation_and_clear_input(symbol);
    });
  }

  // Функция для очистки
  btn_clear.addEventListener("click", () => {
    input.value = "";
  });

  // Функция для корня
  btn_sqrt.addEventListener("click", () => {
    first_number = input.value;
    if (first_number < 0) {
      console.log("Отрицательные нельзя!");
    } else {
      input.value = (first_number ** 0.5).toFixed(2);
    }
  });

  // Функция для квадрата
  

  // Функция для очистки одного символа
  btn_delete.addEventListener("click", () => {
    if (input.value.substring(input.value.length - 1) === ".") {
      count_dot = 0;
    }
    input.value = input.value.substring(0, input.value.length - 1);
  });

  // Получаем результат
  equal.addEventListener("click", () => {
    get_result(operation);
  });
}

calculator();


