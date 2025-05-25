let DOM={
    domC:class {
    constructor(element) {
        this.element=element
    }
    text(text=""){
        if (text==null||text==undefined) {
            return this.element.innerText;
        }else{
            this.element.innerText=text
        }
    }
    attr(attr={}){
        for (const key in attr) {
            this.element.setAttribute(key,attr[key])
        }
    }
    css(css={}){
        let key
        for (key in css) {
            let result={}
            if (!(css=={})) {
                this.element.style[key]=css[key]
            }
            else{
                result[key]=this.element.style[key]
            }
        }
    }
    addChild(tagName="p",id="",content="",attr={}){
        let addElement=document.createElement(tagName)
        let element=this.element
        for (const key in attr) {
            addElement.setAttribute(key,attr[key])
        }
        addElement.innerText=content
        addElement.setAttribute("id",id)
        element.append(addElement)
    }
    move(index=0,parent=this.element.parentNode) {
        this.element=parent.insertBefore(this.element,index==0?parent.firstChild:parent.children[index+1])
    }
    rm(){
        this.element.remove()
        this.element=null
    }
    replace(newTagName="p"){
        const newElement = document.createElement(newTagName);
        for (const attr of this.element.attributes) {
            newElement.setAttribute(attr.name, attr.value);
        }
        newElement.innerHTML = this.element.innerHTML;
        this.element.replaceWith(newElement);
        this.element=newElement
}},

domO:{
    get(element="p"){
        return{
            element:typeof(element)==typeof("")?document.querySelector(element):element,
            text(text=""){
                if (text==null||text==undefined) {
                    return this.element.innerText;
                }else{
                    this.element.innerText=text
                }
            },
            attr(attr={}){
                for (const key in attr) {
                    this.element.setAttribute(key,attr[key])
                }
            },
            css(css={}){
                let key
                for (key in css) {
                    let result={}
                    if (!(css=={})) {
                        this.element.style[key]=css[key]
                    }
                    else{
                        result[key]=this.element.style[key]
                    }
                }
            },
            addChild(tagName="p",id="",content="",attr={}){
                let addElement=document.createElement(tagName)
                let element=this.element
                for (const key in attr) {
                    addElement.setAttribute(key,attr[key])
                }
                addElement.innerText=content
                addElement.setAttribute("id",id)
                element.append(addElement)
            },
            move(index=0,parent=this.element.parentNode){
                this.element=parent.insertBefore(this.element,index==0?parent.firstChild:parent.children[index+1])
            },
            rm(){
                this.element.remove()
                this.element=null
            },
            replace(newTagName="p"){
                const newElement = document.createElement(newTagName);
                for (const attr of this.element.attributes) {
                    newElement.setAttribute(attr.name, attr.value);
                }
                newElement.innerHTML = this.element.innerHTML;
                this.element.replaceWith(newElement);
                this.element=newElement
            }
        }
    },
    id(element=""){return document.getElementById(element)}
}}