const form = document.querySelector("form");
const button = document.querySelector("button");
const input = document.querySelector("input");
const ul = document.querySelector("ul");
const error = document.getElementById("errormessage");

function debounce(fn, wait) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), wait);
  };
}

const validateInput = () => input.value.trim().length > 0;

const debouncedValidate = debounce(() => {
  if (validateInput()) {
    input.classList.remove("danger");
    error.classList.replace("error", "delet");
  }
}, 300);

const addNewItem = () => {
  const inputIsValid = validateInput();
  if (!inputIsValid) {
    input.classList.add("danger");
    error.classList.replace("delet", "error");
    return;
  }

  const li = document.createElement("li");
  li.classList.add("item");
  li.style.marginBottom = `.75rem`;

  const div = document.createElement("div");
  const checkbox = document.createElement("input");
  checkbox.setAttribute("type", "checkbox");
  const span = document.createElement("span");
  span.textContent = input.value;
  const del = document.createElement("button");
  del.classList.add("delete-init");
  del.innerHTML = `<img src="./assets/images/frame-3.svg" alt="">`;

  div.append(checkbox, span);
  li.prepend(div, del);
  ul.appendChild(li);

  input.value = "";
};

ul.addEventListener("click", event => {
  const initBtn = event.target.closest("button.delete-init");
  if (initBtn) {
    const li = initBtn.closest("li");
    const div = li.querySelector("div");
    const circle = document.createElement("small");
    circle.innerHTML = `<img src="./assets/images/warning-circle-filled.svg" alt="">`;
    div.prepend(circle);
    div.querySelector("input").remove();
    initBtn.remove();

    const finalBtn = document.createElement("button");
    finalBtn.classList.add("delete-final");
    finalBtn.innerHTML = `<img src="./assets/images/delete-small.svg" alt="">`;
    li.appendChild(finalBtn);
    li.querySelector("span").textContent = "O item foi removido da lista";
    li.classList.replace("item", "alert");
    return;
  }

  const finalBtn = event.target.closest("button.delete-final");
  if (finalBtn) {
    const li = finalBtn.closest("li");
    li.classList.replace("alert", "delet");
  }
});

input.addEventListener("input", debouncedValidate);
button.addEventListener("click", addNewItem);
form.onsubmit = event => event.preventDefault();
