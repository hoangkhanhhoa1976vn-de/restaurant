// kiem btn order => add event => click => log ban hien dang chon => kiem select => log bien .value

const btnOrder = document.querySelector(".pill-green");

btnOrder.addEventListener("click", function () {
  const select = document.querySelector(".topbar select");// ban nao
  const listfood = document.querySelectorAll(".food-grid .col");
  const bill = [];
   listfood.forEach(s => {
     const quantity = s.querySelector(".qty-input").value;
     if(quantity > 0) {
        const idFood = s.querySelector(".badge-num").innerText ;
        bill.push({quantity, idFood })
     }
   })
   const order = {
     idTable : select.value,
     bill : bill,
     creatAt : new Date()
   }
   add(urlOrder, order)
});
