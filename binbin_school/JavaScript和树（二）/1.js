function traverseDF(node){
	show(node);
	DFS(node);
}
function DFS(current_node){
	for(var i=0;i<current_node.children.length;i++){
		show(current_node.children[i]);
		
		DFS(current_node.children[i]);
	}
}

function traverseBF(node){
	var nodes_arr = new Array();
	nodes_arr.push(node);
	BFS(nodes_arr);
}
function BFS(nodes_arr){
	var current_node=nodes_arr.shift();
	while(current_node){
		show(current_node);
		for(var i=0;i<current_node.children.length;i++){
			nodes_arr.push(current_node.children[i]);
		}
		current_node=nodes_arr.shift();		
	}
}
var t,m,p,e;
function show(highlight_node){
	var search=document.getElementById("search").value;
	if(highlight_node.firstChild.nodeValue.trim()===search){
		t=setTimeout(function(){highlight_node.style.backgroundColor='tomato';},timer+=300);
		m=setTimeout(function(){highlight_node.style.backgroundColor='white';},timer+=500);
	}else{
		p=setTimeout(function(){highlight_node.style.backgroundColor='pink';},timer+=300);
		e=setTimeout(function(){highlight_node.style.backgroundColor='white';},timer+=300);	
	}
}
function clear(){
	clearTimeout(t);
	clearTimeout(m);
	clearTimeout(p);
	clearTimeout(e);
}
function focus(node){
	console.log('hh');
	var div_ele=document.getElementsByTagName("div");
	for(var i=0;i<div_ele.length;i++){
		if(div_ele[i].className.indexOf("highlight")!=-1){
			console.log(div_ele[i].className.indexOf("highlight"));
			div_ele[i].style.backgroundColor="white";
			div_ele[i].className=div_ele[i].className.split(" ")[0];
		}

	}
	node.style.backgroundColor="green";
	// var origin_classname=node.className;
	node.className+=" highlight";
}
function delet(node){
	for(var i=0;i<node.length;i++){
		if(node[i]){
			node[i].parentNode.removeChild(node[i]);
		}
		
	}
	
}
function addFunc(node){
	var div_text=document.createElement("div");
	// div_text.setAttribute("class","add_later");
	var add_text=document.getElementById("add_text").value;
	// console.log(add_text);
	
	var text=document.createTextNode(add_text);
	div_text.appendChild(text);
	// console.log(text);
	node[0].appendChild(div_text);
}
function init(){
	timer=0;
	var depth=document.getElementById("depth_btn");
	var width=document.getElementById("width_btn");
	var rootNode=document.getElementsByClassName("first")[0];
	var search=document.getElementById("search").value;
	// console.log(search);
	depth.addEventListener("click",function(){
		traverseDF(rootNode);
		timer=0;
		},false);
	width.addEventListener("click",function(){
		traverseBF(rootNode);
		timer=0;
		},false);
	var stop=document.getElementById("stop_btn");
	stop.addEventListener("click",function(){
		clear();
	},false);
	var div_ele=document.getElementsByTagName("div");
	
	for(var i=0;i<div_ele.length;i++){
		div_ele[i].addEventListener("click",function(){
			event.stopPropagation();//消除冒泡
			focus(event.target);//这里不能用focus(div_ele[i]),不然无论点击哪一个div，始终只有最后一个div会变颜色
		},false);
	}

	var del=document.getElementById("delete_btn");
	del.addEventListener("click",function(){
		event.stopPropagation();
		del_ele=document.getElementsByClassName("highlight");
		delet(del_ele);
	},false);

	var add=document.getElementById("add_btn");
	add.addEventListener("click",function(){
		event.stopPropagation();
		add_parentele=document.getElementsByClassName("highlight");
		// console.log(add_parentele);
		addFunc(add_parentele);
	},false);

}
init();


