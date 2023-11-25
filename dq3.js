import "//hashsan.github.io/fujiyama/fujiyama.js";
import "//hashsan.github.io/use/use.js"

function encode(text){
  return btoa(encodeURIComponent(text));
}
function decode(base64){
  return decodeURIComponent(atob(base64));
}

export class dq3{
  ed
  cls
  cls_edit
  attr
  val
  mode // edit or view

  ////
  constructor(data,cls){
    this.attr ='contenteditable';
    this.val ='plaintext-only';
    this.cls_readonly='readonly'
    this.cls_edit ='edit'
    this.cls = cls || 'dq3'    

    this.ed = document.createElement('div')
    this.ed.classList.add(this.cls)
    this.ed.innerHTML = data ||'＃あらたな'

    this.viewmode()

    this.ed.onclick = this.editmode.bind(this)
    this.ed.onblur  =  this.viewmode.bind(this)
  }

  isreadonly(){
    return !!fn.q('.'+this.cls_readonly)
  }
  isimagetag(el){
    return el.tagName.toLowerCase() === 'img'
  }
  editmode(e){
    if(this.isreadonly()){
      return
    }
    if(this.mode === 'edit'){
      return
    }
    if(this.isimagetag(e.target)){
      return
    }
    this.ed.innerHTML  = decode(this.ed.dataset.text);
    this.mode='edit';
    this.ed.classList.add(this.cls_edit)    
    this.ed.setAttribute(this.attr,this.val)
  }
  viewmode(e){
    const data = this.ed.innerHTML
    this.ed.dataset.text = encode (data)
    this.ed.innerHTML = fujiyama(data)
    this.mode='view'
    this.ed.classList.remove(this.cls_edit)    
    this.ed.setAttribute(this.attr,false)
  }

}
