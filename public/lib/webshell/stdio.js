let con=document.getElementById("con")
let inIn="<input type\"text\">"
async function openFile(){
    let result
    await showDirectoryPicker().then((Result=>{result=Result}))
    return result
}
function log(log="",br=true){
    let addOut=document.createElement("pre")
    addOut.innerText=log
    con.appendChild(addOut)
    if(br) con.appendChild(document.createElement("br"))
}
async function readline(massage="") {
    log(massage,false)
    let Resolve
    let promise=new Promise((resolve, reject) => {
        Resolve=resolve
    })
    let input=document.createElement("input")
    input.innerHTML=inIn
    input.addEventListener("change",()=>{
        Resolve()
        let inD = new DOM.domC(input)
        inD.replace("pre")
        inD.text(input.value)
        
    })
    con.appendChild(input)
    input.focus()
    con.appendChild(document.createElement("br"))
    await promise.then(()=>{})
    return input.value
}