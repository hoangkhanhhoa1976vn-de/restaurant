const listli = document.querySelectorAll(".left li");
const listitem = document.querySelectorAll(".left .item");
const icon = document.querySelector(".left .icon");
const listbox = document.querySelectorAll(".right .box");
const avatarBtn = document.getElementById("avatarBtn");
const userDropdown = document.getElementById("userDropdown");


avatarBtn.addEventListener("click", () => {
  userDropdown.classList.toggle("show");
});


listli.forEach( (li,index) =>{
    li.addEventListener("click", () =>{
        listbox.forEach(e => e.style.display = 'none');
        listbox[index].style.display = 'block';
    })
})
icon.addEventListener("click",() =>{
    listitem.forEach(li => li.classList.toggle('d-none'))
});

