function init(){
	timer=0;
	var preorder=document.getElementById("preorder");
	var inorder=document.getElementById("inorder");
	var postorder=document.getElementById("postorder");
	var rootnode=document.getElementById("root");
	preorder.addEventListener("click",function(){
		preOrder(rootnode);
		timer=0;
	},false);
	inorder.addEventListener("click",function(){
		inOrder(rootnode);
		timer=0;
	},false);
	postorder.addEventListener("click",function(){
		postOrder(rootnode);
		timer=0;
	},false);
}

function preOrder(node){
	if(node!=null){	
		show(node);
		preOrder(node.children[0]);
		preOrder(node.children[1]);
	}
}
function inOrder(node){
	if(node!=null){
		inOrder(node.children[0]);
		show(node);
		inOrder(node.children[1]);
	}
}
function postOrder(node){
	if(node!=null){
		postOrder(node.children[0]);
		postOrder(node.children[1]);
		show(node);
	}
}
function show(node){
	setTimeout(function(){
		node.style.backgroundColor="blue";
	},timer+=300);
	setTimeout(function(){
		node.style.backgroundColor="white";
	},timer+=300);
	
}

init();