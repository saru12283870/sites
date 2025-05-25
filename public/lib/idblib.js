const LDBLDefaultDatabase={
    objectStore:[
        {
            index:[
                {
                    index:0,
                    keyPath:"index",
                    option:{
                    }
                }
            ],
            keyPath:'myObjectStore',
            autoIncrement:true,
            name:'myObjectStore'
        }
    ],
    name:"myDatabase"
}
function waitFuncGet() {
    let resolve={async wait () {let go;await this.promise.then((re)=>{go=re});return go}}
    let promise=new Promise((r)=>{resolve.go=r})
    resolve.promise=promise
    return resolve
}

class LDBL{
    constructor(db=LDBLDefaultDatabase){
        let DB=indexedDB.open(db.name)
        this.name=db.name
        this.controlObjectStore=db.objectStore[0].name
        let onsuccess=(event)=>{
            console.log(event.target.result);
            this.db=event.target.result
            if(this.re)this.re()
        }
        DB.onsuccess=onsuccess
        DB.onupgradeneeded=(event)=>{
            let OS=[]
            console.log(event.target.result);
            this.db=event.target.result
            try {
                for (let x = 0; x < db.objectStore.length; x++) {
                    const element = db.objectStore[x];
                    OS[x]=this.db.createObjectStore(element.name,{autoIncrement:element.autoIncrement})
                    for (let i = 0; i < element.index.length; i++) {
                        const e = element.index[i];
                        OS[x].createIndex(e.index,e.keyPath,e.option)
                    }
                }
            } catch (e) {console.log(e);}
            DB=indexedDB.open(db.name)
            DB.onsuccess=onsuccess
        }
    }
    async wait(){
        this.db=undefined
        let p=new Promise((resolve) => {
            this.re = resolve
        })
        await p.then(()=>{})
    }
    remove(){
        indexedDB.deleteDatabase(this.name)
    }
    transactionInit(OSName=this.controlObjectStore,type="readonly",more=false) {
        let transaction = this.db.transaction(OSName,type)
        return more?[transaction.objectStore(OSName),transaction]:transaction.objectStore(OSName)
    }
    async get(key,OSName=this.controlObjectStore) {
        const transaction=this.transactionInit(OSName)
        const get=transaction.get(key)
        let r,result
        const wait=new Promise((resolve) => {
            r=resolve
        })
        get.onsuccess=()=>{
            result=get.result
            r()
        }
        get.onerror=()=>{
            result=undefined
            r()
        }
        await wait.then(()=>{})
        return result
    }
    async set(data,key=undefined,OSName=this.controlObjectStore) {
        let transaction=this.transactionInit(OSName,"readwrite")
        let stats
        let add
        let Resolve
        let Wait=new Promise((resolve)=>{Resolve=resolve})
        add=transaction.put(data,key)
        add.onerror=(event)=>{stats=event.target.error;Resolve(event)}
        add.onsuccess=()=>{stats="OK";Resolve()}
        await Wait.then(()=>{})
        return stats
    }
    delete(key,OSName){
        let transaction=this.transactionInit(OSName,"readwrite")
        transaction.delete(key)
    }
}