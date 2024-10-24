document.addEventListener("DOMContentLoaded", function () {
    const listt = document.getElementById("list-body");
    let mylead = [];
    chrome.storage.local.get(["block_list"], function (result) {
        mylead = result.block_list;
        console.log("right console");
        function renderlead() {
            if (mylead.length == 0) {
                //listt.innerHTML = `<li class="list-group-item">No websites blocked yet!</li>`;
               listt.innerHTML=`<tr>
                    <th scope="row" class="no"></th>
                    <td class="url">No website added yet!</td>
                    <td class="action">
                    </td>
                  </tr>`
            }
            else {
                let listitem = "";
                for (let i = 0; i < mylead.length; i++) {
                    //listitem += `<li class="list-group-item"><button data-index= "${i}" class="remove">-</button>${mylead[i]}</li>`;
                
                    listitem+=`<tr>
                    <th scope="row" class="no">${i+1}</th>
                    <td class="url">${mylead[i]}</td>
                    <td class="action">
                      <button type="submit" data-mdb-button-init data-mdb-ripple-init class="remove btn btn-danger" data-index=${i}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="remove2 bi bi-trash3"  data-index=${i}  viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
</svg></button>
                    </td>
                  </tr>`
                }
                console.log("full");
                listt.innerHTML = listitem;
            }
            chrome.storage.local.set({ block_list: mylead }, function () {
            });
        }
        //For Removing indiviual link
        function removal(int) {
            mylead.splice(int, 1);
            localStorage.setItem("mylead", JSON.stringify(mylead));
            renderlead();
        }
        //Eventlistner for remove buttons
        listt.addEventListener("click", function (event) {
            if(event.target.classList.contains("remove2"))
            {
                const index = event.target.getAttribute("data-index");
                removal(index);
            }
           else if (event.target.classList.contains("remove")|| event.target.closest('.remove')) {
                const index = event.target.getAttribute("data-index")|| event.target.closest('.remove').getAttribute('data-index');
                removal(index);
            }
            
        });
        renderlead();

    });
});

