
function addCollapseHandler(event)
{ let btn=document.getElementById("add-button");
    let addForm=document.getElementById("add-form");
    if(addForm.style.display.toLowerCase()==="block") {
        addForm.style.display = "none";
        btn.style.backgroundColor="rgba(0,0,0,.1) ";
    }
    else {
        addForm.style.display = "block";
        btn.style.backgroundColor="rgba(0,0,0,.8)";

    }
}

document.getElementById("add-form-inner").addEventListener('submit',(event)=>{
    let n=document.getElementById("name").value;
    let p=document.getElementById("phone").value;
    if(n===""||p==="")
    {event.preventDefault();
        alert("Name or phone number cannot be empty");
    }
});

function closeForm( event) {
    let btn=document.getElementById("add-button");
    let addForm=document.getElementById("add-form");
    let n=document.getElementById("name");
    let p=document.getElementById("phone");
    addForm.style.display = "none";
    btn.style.backgroundColor="rgba(0,0,0,.1) ";
n.value="";
p.value="";
}