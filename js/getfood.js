// hien thi ra mon an
let dataFood;
async function getfood() {
  const data = await getAll(urlfood);
  dataFood = data;
  const food = document.querySelector(".food-grid");
  data.forEach((element) => {
    const item = document.createElement("div");
    item.classList.add("col");
    item.innerHTML = `<div class="card p-3">
                <div class="card-head">
                  <span class="badge-num">${element.id}</span>
                  <div class="d-flex gap-2">
                      <i onClick=openModalAdded(${element.id}) data-bs-toggle="modal" data-bs-target="#addfood" class="fa-solid fa-pen text-primary"></i>
                      <i onClick=openModalDeleted(${element.id}) data-bs-toggle="modal" data-bs-target="#deleted" class="fa-solid fa-trash text-danger"></i>        
                  </div>
                </div>
                <h6 class="food-name text-center">${element.name}</h6>
                <div class="food-img">
                  <img
                    src=${element.imgurl}
                    alt="Spaghetti"
                  />
                </div>
                <div class="food-price">${element.price} $</div>
                <div class="qty">
                  <button class="qty-btn minus">-</button>
                  <input class="qty-input" value="0" readonly />
                  <button class="qty-btn plus">+</button>
                </div>
              </div>`;
    food.appendChild(item);
    // kiem ve cho anh 2 nut cong tru va input  dung queryselector
    const qty = item.querySelector(".qty-input"); // input => value
    const btnMinus = item.querySelector(".minus");
    const btnPlus = item.querySelector(".plus");

    // addevent => click => log cai gi
    btnMinus.addEventListener("click", () => {
      if (parseInt(qty.value) > 0) {
         qty.value = parseInt(qty.value) - 1;
      }
    });
    btnPlus.addEventListener("click", () => {
      qty.value = parseInt(qty.value) + 1;
    });
  });
}
// goi ham
getfood();
let selectedFoodImageFile; // toan cuc
// Xử lý khi người dùng chọn file ảnh
function handleFoodImageSelect(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.readAsDataURL(file);

  // Sau khi đọc xong ảnh, hiển thị preview lên giao diện
  reader.onload = (e) => {
    document.getElementById("img_food").src = e.target.result;
  };

  selectedFoodImageFile = file; // Lưu lại file để upload sau
}

const inputFile = document.getElementById("formFileLg");
inputFile.addEventListener("change", handleFoodImageSelect);

const addBtn = document.getElementById("add-food");
let isEdit;
addBtn.addEventListener("click", async () => {
  // kiem ve 2 input do
  const foodNameInput = document.getElementById("foodname");
  const foodPriceInput = document.getElementById("foodprice");

  // log du lieu minh da nhap vao 2 o input do ( bien . value )
  const imgUrl = await uploadImageToCloudinary(selectedFoodImageFile);

  const newFood = {
    name: foodNameInput.value,
    price: foodPriceInput.value,
    imgurl: imgUrl,
  };
  if (isEdit) {
    edit(urlfood, { ...newFood, id: isEdit });
  } else {
    add(urlfood, newFood);
  }
});

function openModalDeleted(id) {
  const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
  confirmDeleteBtn.addEventListener("click", function () {
    deleted(urlfood, id);
  });
}
function openModalAdded(id) {
  // kiem ve mon an theo id
  isEdit = id;
  const food = dataFood.find((e) => e.id == id);
  const foodNameInput = document.getElementById("foodname");
  foodNameInput.value = food.name;
  const foodPriceInput = document.getElementById("foodprice");
  foodPriceInput.value = food.price;
  const title = document.getElementById("titleFood");
  title.innerText = "EDIT FOOD";
  const add = document.getElementById("add-food");
  add.innerText = "UPDATE FOOD";
  const img = document.getElementById("img_food");
  img.src = food.imgurl;
}
