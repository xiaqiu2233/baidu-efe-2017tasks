let ModalFunc = function(elem, opts){
    //定义options默认值
    const _default_options = {
        size:{
            width: '600px',
            height: '138px'
        },
        resizeable: true,
        dragable: true,
        //当按下 escape 键时关闭模态框，设置为 false 时则按键无效。
        keyboard: true,
        //当用户点击模态框外部是否会关闭模态框。
        backdrop: true,
        // open回调
        open: null,
        // close回调
        close: null,
        beforeClose: null
    }
    this.element = elem;
    this.options = {};
    if (opts === undefined) {
        this.options = _default_options;
    } else {
        for (let key in _default_options) {
            this.options[key] = opts[key]!==null ? opts[key] : _default_options[key];
        }
    }
    const cancel=document.getElementsByClassName("close");
    for(let item of cancel){
        item.addEventListener("click",() => {
            this.hide();
        },false);
    }
    this.setConfig();
};

ModalFunc.prototype = {
    setConfig: function(){
        if(this.options.keyboard){
            this.element.addEventListener("keydown",(e)=>{
                if(e.keyCode===27){
                    this.hide();
                }
            },false);
        }
        if(this.options.backdrop){
            const dialog = document.getElementsByClassName("modal-dialog");        
            dialog[0].addEventListener("click",(event)=>{
                event.stopPropagation();
            },false);
            this.element.addEventListener("click",(e)=>{
                this.hide();
            },false);
        }
        if(this.options.size){
            let dialogContent=document.getElementsByClassName("modal-content");
            dialogContent[0].style.width=this.options.size.width;
            dialogContent[0].style.height=this.options.size.height;
        }
        if(this.options.resizeable){
            let dialog=document.getElementsByClassName("modal-dialog");
            let dialogContent=document.getElementsByClassName("modal-content");
            let w_resize=document.getElementsByClassName("w-resize");
            let e_resize=document.getElementsByClassName("e-resize");
            let n_resize=document.getElementsByClassName("n-resize");
            let s_resize=document.getElementsByClassName("s-resize");
            let dragOffset={};
            let offsetLeft;
            let dialogWidth;
            let dialogHeight;
            let clientX;
            let clientY;
            // 左边的边移动
            w_resize[0].addEventListener('dragstart',(event) => {
                dialogWidth = parseInt(dialogContent[0].style.width);
                clientX = event.clientX;
                dragOffset.x = event.offsetX;
                dragOffset.y = event.offsetY;
            },false);
            w_resize[0].addEventListener('drag',(event) => {
                event.stopPropagation();
                dialogContent[0].style.width = (dialogWidth - (event.clientX - clientX)) + 'px';
                if(event.clientX - dragOffset.x<0){
                    dialog[0].style.left = '0px';
                }else if(event.clientY - dragOffset.y<0){
                    dialog[0].style.top = '0px';
                }else{
                    dialog[0].style.left = (event.clientX - dragOffset.x ) + 'px';
                    dialog[0].style.top = (event.clientY - dragOffset.y ) + 'px';
                }
            },false);
            w_resize[0].addEventListener("dragover", function(event) {
                // prevent default to allow drop
                event.preventDefault();
            }, false);
            //右边的边移动
            e_resize[0].addEventListener('dragstart',(event) => {
                dialogWidth = parseInt(dialogContent[0].style.width);
                clientX = event.clientX;
                dragOffset.x = event.offsetX;
                dragOffset.y = event.offsetY;
            },false);
            e_resize[0].addEventListener('drag',(event) => {
                event.stopPropagation();
                dialog[0].style.top = (event.clientY - dragOffset.y) + 'px';
                dialogContent[0].style.width = (dialogWidth + (event.clientX - clientX)) + 'px';
            },false);
            e_resize[0].addEventListener("dragover", function(event) {
                // prevent default to allow drop
                event.preventDefault();
            }, false);
            //上边的边移动
            n_resize[0].addEventListener('dragstart',(event) => {
                dialogHeight = parseInt(dialogContent[0].style.height);
                clientY = event.clientY;
                dragOffset.x = event.offsetX;
                dragOffset.y = event.offsetY;
            },false);
            n_resize[0].addEventListener('drag',(event) => {
                event.stopPropagation();
                dialogContent[0].style.height = (dialogHeight - (event.clientY - clientY)) + 'px';
                if(event.clientX - dragOffset.x<0){
                    dialog[0].style.left = '0px';
                    dialog[0].style.top = (event.clientY - dragOffset.y ) + 'px';
                }else if(event.clientY - dragOffset.y<0){
                    dialog[0].style.top = '0px';
                    dialog[0].style.left = (event.clientX - dragOffset.x ) + 'px';
                }else{
                    dialog[0].style.left = (event.clientX - dragOffset.x ) + 'px';
                    dialog[0].style.top = (event.clientY - dragOffset.y ) + 'px';
                }
            },false);
            n_resize[0].addEventListener("dragover", function(event) {
                // prevent default to allow drop
                event.preventDefault();
            }, false);
            //下边的边移动
            s_resize[0].addEventListener('dragstart',(event) => {
                dialogHeight = parseInt(dialogContent[0].style.height);
                clientY = event.clientY;
                dragOffset.x = event.offsetX;
                dragOffset.y = event.offsetY;
            },false);
            s_resize[0].addEventListener('drag',(event) => {
                event.stopPropagation();
                dialog[0].style.left = (event.clientX - dragOffset.x) + 'px';
                dialogContent[0].style.height = (dialogHeight + (event.clientY - clientY)) + 'px';
            },false);
            s_resize[0].addEventListener("dragover", function(event) {
                // prevent default to allow drop
                event.preventDefault();
            }, false);
        }
        if(this.options.dragable){
            let dialog=document.getElementsByClassName("modal-dialog");
            let dragOffset = {};
            this.element.addEventListener('dragstart',(event) => {
                dragOffset.x = event.offsetX;
                dragOffset.y = event.offsetY;
            },false);
            this.element.addEventListener('drag',(event) => {
                event.preventDefault();
                if(event.clientX - dragOffset.x<0){
                    dialog[0].style.left = '0px';
                }else if(event.clientY - dragOffset.y<0){
                    dialog[0].style.top = '0px';
                }else{
                    dialog[0].style.left = (event.clientX - dragOffset.x ) + 'px';
                    dialog[0].style.top = (event.clientY - dragOffset.y ) + 'px';
                }
            },false);
            this.element.addEventListener("dragover", function(event) {
                  // prevent default to allow drop
                  event.preventDefault();
            }, false);
            this.element.addEventListener("dragend", function(event) {
                // prevent default to allow drop
                event.preventDefault();
          }, false);
        }
    },
    show: function() {
        let back=document.createElement("div");
        const dialog = document.getElementsByClassName("modal-dialog");
        const dialogContent = document.getElementsByClassName("modal-content");
        const modal = document.getElementsByClassName("modal");
        back.className="modal-backdrop";
        this.element.parentNode.appendChild(back);
        this.element.style.display = 'block';
        // 获取焦点
        if(this.options.keyboard){
            this.element.setAttribute('tabindex', 0);
            this.element.focus();
        }
        if (this.options.open) {
            this.options.open();
        }
        dialog[0].style.left = parseInt(screen.width)*0.5-parseInt(dialogContent[0].style.width)*0.5+'px';
    },
    hide: function() {
        let done = () => {
            let back = document.querySelector(".modal-backdrop");
            if (back){
                back.parentNode.removeChild(back);
            }
            this.element.style.display = 'none';
            if (this.options.close) {
                this.options.close();
            }
        }
        if (this.options.beforeClose) {
            this.options.beforeClose(done);
        } else {
            done();
        }
    }
}
