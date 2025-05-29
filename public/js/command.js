new BasicCommand(async ()=>{
    BFD=await openFile()
    await BFDSet()
},'bcd',true).add()
