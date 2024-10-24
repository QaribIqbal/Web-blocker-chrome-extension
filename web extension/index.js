console.log('Service worker started.');
document.addEventListener("DOMContentLoaded", function () {
    let mylead = [];
    mydata = JSON.parse(localStorage.getItem("mylead"));
    if (mydata != null) {
        mylead = mydata;
    }
    const inputbox = document.getElementById("input");
    const savebtn = document.getElementById("save-btn");
    const delbtn = document.getElementById("del-btn");
    const removebtn = document.getElementsByClassName("remove");
    const msg = document.getElementById("error-msg");
    renderlead();
    function CheckRepeat()
    {
        let repeat = false;
        for (let j = 0; j < mylead.length; j++) {
            if (mylead[j] == inputbox.value) {
                repeat = true;
                break;
            }
        }
        if (repeat === true) {
            inputbox.value = "";
            msg.innerHTML = "This website is already in the blocklist!"
        }
        else {
            mylead.push(inputbox.value);
            localStorage.setItem("mylead", JSON.stringify(mylead));
            inputbox.value = "";
            msg.innerHTML="<span style='color: white;'>Website blocked successfully!</span>";  
            renderlead();
        }
    }
    savebtn.addEventListener("click", function () {
        //For Getting the url of host
        if (inputbox.value == "") {
             msg.innerHTML = "Enter a website url to block!"
        }
        //for saving the url entered by us
        else {
            CheckRepeat();
        }
    })
    //For Removing all sites
    delbtn.addEventListener("click", function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var url = new URL(tabs[0].url);
            inputbox.value=url.hostname;
            CheckRepeat();
        });
    })
    //Function for refreshing the site data and to Fetch and store data from and to local storages
    function renderlead() {
         //msg.innerHTML = "";
        chrome.storage.local.set({ block_list: mylead }, function () {
        });
    }
    
});
