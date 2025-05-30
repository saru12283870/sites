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
    constructor(callback,name,await=false) {
        this.callback=callback
        this.name=name
        this.await=await
    }
    async run(arg,opt){
        this.callback(arg,opt)
    }
    add(){
        commands[commands.length]=this
    }
}
class OptionCheckCommand extends BasicCommand{
    constructor(callback,name,checkOptions=[],await=false){
        super(callback,name,await)
        this.checkOption=checkOptions
    }
    async run(arg=[],opt=[]){
        let more={opt:{}}
        console.log(this.checkOption);
        for(const item of this.checkOption){
            more.opt[item] = opt.find((element)=>{return element===item})==undefined?false:true
        }
        console.log(more);
        if (this.await) {
            await this.callback(arg,opt,more)
        }else{
            this.callback(arg,opt,more)
        }
    }
}
async function init(){
    await BFDIdb.wait()
    BFD=await BFDIdb.get('BFD')
    BD=await BFDIdb.get('BD')==undefined?'':await BFDIdb.get('BD')
    CFD=await BFDIdb.get('CFD')
    CD=await BFDIdb.get('CD')==undefined?'':await BFDIdb.get('CD')
}
async function BFDSet() {
    CFD=BFD
    BD=BFD.name
    CD=CFD.name
    await BFDIdb.set(BFD,"BFD")
    await BFDIdb.set(BD,'BD')
    await BFDIdb.set(CFD,"CFD")
    await BFDIdb.set(CD,'CD')
}
function analysis(input="") {
    let inputs=input.replace(/[\s\t]+/,' ').trim().split(' ')
    const command=inputs[0]
    inputs=inputs.slice(1)
    const opt=inputs.filter((item)=>{return item.substring(0,1)==='-'}).map((element)=>{console.log(element);return element.replace(/^-+(\w+)$-*/,'$1')})
    const arg=inputs.filter((item)=>{return !(item.substring(0,1)==='-')&!(item.substring(0,1)==='$')})
    return [arg,opt,command]
}
async function run(command,arg,opt) {
    const Command=commands.find((item)=>{return command===item.name})
    try{
        await Command.run(arg,opt)
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
        await BFDSet()
    }
    await run(command,arg,opt)
    log()
    await main()
}
async function all() {
    await init()
    await main()
}
all()