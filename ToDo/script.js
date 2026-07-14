const btn = document.getElementById("btn");
// const x = document.querySelector("#btn");

const taskList = document.querySelector(".taskList");
const inp = document.getElementById("inp");

btn.addEventListener('click',(e)=>{
    // console.log("Clicked!")
    // console.log(e.target);
    // console.log(inp.value);

    const div = document.createElement("div");
    div.classList.add("task");
    

    const str = `<div class="section-A">
                    <input class="checkbox" type="checkbox">
                    <span>${inp.value}</span>
                </div>
                <div class="section-B">
                    <span class="up-arrow">↑</span>
                    <span class="bin"><i class="bin fa-regular fa-trash-can"></i></span>
                    <span class="down-arrow">↓</span>
                </div>`
    
    div.innerHTML=str;  
    
    console.log(div);
    taskList.appendChild(div);

    inp.value="";

})


taskList.addEventListener("click",(e)=>{
    console.log(e.target.getAttribute("class"));

    if(e.target.getAttribute("class")=="checkbox"){
        e.target.nextElementSibling.classList.toggle("checked")
    }else if(e.target.getAttribute("class")=="up-arrow"){
        let currTask = e.target.parentElement.parentElement;
        let prevTask = currTask.previousElementSibling;
        if(prevTask){
            currTask.after(prevTask)
        }
    }else if(e.target.getAttribute("class")=="down-arrow"){
        let currTask = e.target.parentElement.parentElement;
        let nextTask = currTask.nextElementSibling
        if(nextTask){
            currTask.before(nextTask);
        }
    }else if(e.target.classList.contains("bin")){
        const currTask = e.target.parentElement.parentElement.parentElement;
        console.log(currTask);
        currTask.remove();
    }
});