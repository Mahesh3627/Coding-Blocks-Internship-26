const APILINK = "http://localhost:3000/todos";
const box = document.querySelector(".box");
fetch(APILINK)
    .then((res)=>{
        console.log(res);
        return res.json()
    })
    .then((data)=>{
        console.log(data.todos);

        for(let item of data.todos){
            const para = document.createElement("p");
            para.innerText=item;
            box.appendChild(para);
        }
    })