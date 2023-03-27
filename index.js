// window.localStorage.clear();

// let se=document.querySelector("select");
let name = document.querySelector(".name");
let date = document.querySelector(".date");
let amount = document.querySelector(".amount");

const button = document.querySelector(".expense");
let count = 0;

const selectValue = () => {
  let selectedValue = document.querySelector("select").value;
  return selectedValue;
};

const localStorageCheck = () => {
  return window.localStorage.getItem("details");
};

const fieldValue = (type) => {
  const obj = {
    type,
    name: name.value,
    date: date.value,
    amount: amount.value,
  };
  return obj;
};

const setItem = (item) => {
  window.localStorage.setItem("details", JSON.stringify(item));
};

const getItem = () => {
  return JSON.parse(window.localStorage.getItem("details"));
};

const fillData = () => {
  count = 0;
  let data = getItem();
  let table = document.querySelector(".table");
  table.innerHTML = "";
  if (data != null) {
    for (da of data) {
      let newElement = document.createElement("tr");
      newElement.classList.add(`${count}`);
      newElement.innerHTML = `<td>${da.type}</td>
      <td>${da.name}</td>
      <td>${da.date}</td>
      <td>${da.amount}</td>
      <td onclick=deleteItems(${count}); class="hanji">Delete</td>`;
      table.append(newElement);
      count++;
    }
  }
};

const deleteItems = (id) => {
  let data = getItem();
  data.splice(id, 1);
  setItem(data);
  fillData();
};

function validate(type) {
  if (type == "choose") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Please Choose an expense type!",
    });
    return false;
  } else if (name.value == "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Name Cannot be empty!",
    });
    return false;
  } else if (name.value.length < 3) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Name should be greater than 3 characters!",
    });
    return false;
  } else if (date.value == "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Provide the complete date!",
    });
    return false;
  } else if (amount.value == "") {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Amount cannot be empty!",
    });
    return false;
  } else if (Number(amount.value) < 0) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Amount cannot be negative!",
    });
    return false;
  } else if (Number(amount.value) == 0) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Amount should be greater than zero!",
    });
    return false;
  }
  return true;
}

const reset = () => {
  document.querySelector("select").value="choose";
  name.value = "";
  date.value = "";
  amount.value = "";
};

fillData();

button.addEventListener("click", (e) => {
  let type = selectValue();
  let bool = validate(type);
  if (bool) {
    let check = localStorageCheck();
    const obj = fieldValue(type);
    if (check == null) {
      let arr = [];
      arr.push(obj);
      setItem(arr);
    } else {
      let fetch = getItem();
      fetch.push(obj);
      setItem(fetch);
    }
    fillData();
    reset(type);
    swal("Good job!", "Your data has saved!", "success");
  }
});
