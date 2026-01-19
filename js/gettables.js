async function gettables() {
  const data = await getAll(urltable); // 12 ban  mang => vong lap => foreach
  const tables = document.querySelector(".tables"); // thung hung
  // kiem ve select => select
  const select = document.querySelector(".topbar select");

  console.log(select);
  tables.innerHTML = "";
  select.innerHTML = `<option selected>Open this select menu</option>`;

  data.forEach((element) => {
    // if element.status la fales bien select.innerHTML += ` <option value="1">Table ${element.id}</option> `
    
    if (!element.status) {
      select.innerHTML += `<option value="${element.id}">Table ${element.id}</option>`;
    }

    const img = element.status
      ? "../img/dining-table.png"
      : "../img/dinner.png";
    const btn = element.status
      ? `  <button onClick=idbooking(${element.id}) class="booking-btn" data-bs-toggle="modal" data-bs-target="#booking">
        <i class="fa-solid fa-calendar-check"></i> BOOKING
      </button>`
      : `  <div class="actions">
        <button class="add-btn"><i class="fa-solid fa-plus"></i> ADD</button>
        <button class="cart-btn"><i class="fa-solid fa-cart-shopping"></i> CART</button>
      </div>`;

    tables.innerHTML += ` <div class="table-card empty">
      <span class="badge-num">${element.id}</span>
      <div class="img-wrap">
        <img src=${img} alt="table 1">
      </div>
       ${btn}
    </div>`;
  });
}
gettables();
// kiem  button save id
const btnSave = document.getElementById("modalbooking");

function idbooking(idTable) {
  btnSave.addEventListener("click", () => {
    const customerInput = document.getElementById("customername").value;
    const quantityInput = document.getElementById("quantity").value;

    const tableUpdate = {
      id: idTable,
      namecustomer: customerInput,
      quantity: quantityInput,
      status: false,
    };
    edit(urltable, tableUpdate);
  });
}

// addevent click => kiem 2 input theo id
