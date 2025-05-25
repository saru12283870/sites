let BFD,CFD,CD,BD,commands=[]
let BFDIdb=new LDBL({
    objectStore:[
        {
            autoIncrement:false,
            keyPath:false,
            name:"bcd"
        }
    ],
    name:"bcd"
})
let EVIdb=new LDBL({
    objectStore:[
        {
            autoIncrement:false,
            keyPath:"EV",
            name:"EV"
        }
    ],
    name:"EV"
})
class BasicCommand {
    constructor(callback,name) {
        this.callback=callback
        this.name=name
    }
    add(){
        commands[commands.length]=this
    }
}
async function init(){
    await BFDIdb.wait()
if (await BFDIdb.get("BFD")) {
    console.log("a");
}
BFD=await BFDIdb.get('BFD')
BD=await BFDIdb.get('BD')==undefined?'':await BFDIdb.get('BD')
CFD=await BFDIdb.get('CFD')
CD=await BFDIdb.get('CD')==undefined?'':await BFDIdb.get('CD')
}
function BFDSet() {
    CFD=BFD
    BD=BFD.name
    CD=CFD.name
    BFDIdb.set(BFD,"BFD")
    BFDIdb.set(BD,'BD')
    BFDIdb.set(CFD,"CFD")
    BFDIdb.set(CD,'CD')
}
function analysis(input="") {
    let inputs=input.trim().replace(/[\s\t]+/,' ').split(' ')
    const command=inputs[0]
    inputs=inputs.slice(1)
    const opt=inputs.filter((item)=>{return item.substring(0,1)==='-'})
    const arg=inputs.filter((item)=>{return !(item.substring(0,1)==='-')&!(item.substring(0,1)==='$')})
    return [arg,opt,command]
}
async function run(command,arg,opt) {
    Command=commands.find((item)=>{return command===item.name})
    try{
        await Command.callback(arg,opt)
    }catch{
        log("notFindCommand")
    }
}
async function main() {
    let arg,opt,command
    let input=analysis(await readline(`WS ${CD}>`))
    console.log(input);
    arg=input[0]
    opt=input[1]
    command=input[2]
    if(BFD==undefined){
        BFD=await openFile()
        BFDSet()
    }
    await run(command,arg,opt)
    main()
}
async function all() {
    await init()
    await main()
}
all()