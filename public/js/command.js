new BasicCommand(async ()=>{
    BFD=await openFile()
    await BFDSet()
},'bd',true).add()
new OptionCheckCommand((arg=[],opt,more)=>{
    console.log(more.opt.nb);
    if (more.opt.nb) {
        arg.find((item)=>{log(item,false)})
    }else{
        arg.find((item)=>{log(item,true)})
    }
},'echo',['nb'],false).add()
