//创建新的span元素
function display(input_value){
	var new_span=document.createElement("span");
	// var span_text=document.createTextNode(input_value);
	// new_span.appendChild(span_text);
	new_span.style.height=input_value+"px";
	return new_span;
}
//将text input框中之前的输入去掉并且给文本框聚焦
function focusTextInput(){
	input_text.value="";
	// input_text.select();
	input_text.focus();
}
//查看arr的长度
function countQueue(maxLength){
	if(arr.length==maxLength){
		alert("队列元素超过上限"+maxLength);
		input_text.value="";
		return false;
	}else if(arr.length<maxLength){
		return true;
	}
}

//在id为queue的元素queue下，将new_span插入queue的div的第一个子元素前，并绑定上click事件，以便点击删除之
function insertLeftSpan(input_value){
	var new_span=display(input_value);
	queue.insertBefore(new_span,queue.firstChild);	
	new_span.addEventListener("click",removeSpan,false);
}
//将arr数组从头insert入一个元素，也将span加入页面(是左侧入btn的点击事件)
function insertLeft(){
	if(countQueue(60)==true){
		var input_value=parseInt(input_text.value);	
		if(pattern()==true){
			hideElement();
			arr.unshift(input_value);
			// console.log(arr);
			insertLeftSpan(input_value);
			try{
				focusTextInput();
			}catch(err){
				console.log('清除text错误');
			}

		}
	}
}
//将new_span插入queue的div的最后一个子元素后，并绑定上click事件，以便点击删除之
function insertRightSpan(input_value){
	var new_span=display(input_value);
	queue.appendChild(new_span);
	new_span.addEventListener("click",removeSpan,false);
}
//将arr数组从尾insert入一个元素，也将span加入页面(是右侧入btn的点击事件)
function insertRight(){
	if(countQueue(60)==true){
		var input_value=parseInt(input_text.value);
		if(pattern()==true){
			hideElement();			
			// alert(typeof input_value);
			arr.push(input_value);
			console.log(arr);
			insertRightSpan(input_value);
			try{
			focusTextInput();
			}catch(err){
				console.log('清除text错误');
			}
		}
	}
}
//删除arr数组index位置上的元素
function removeArrElement(index){
	for(var i=index;i<arr.length-1;i++){
		arr[i]=arr[i+1];
	}
	arr.pop();
}
//通过点击队列中任何一个元素，删除之，并把对应的arr数组中的元素也删除
function removeSpan(){	
	this.setAttribute("id","delete");
	var child_num=this.parentNode.childNodes;
	for(var i=0,j=0;i<child_num.length;i++){
		if(child_num[i].nodeType==1){
			j++;
		}else{
			continue;
		}
		if(this.getAttribute("id")==child_num[i].getAttribute("id")){
			removeArrElement(j-1);
			console.log(arr);
			break;
		}
	}
	this.parentNode.removeChild(this);
}

function removeSpace(){
	// queue=document.getElementById("queue");
	var queue_child=queue.childNodes;
	// var queue_length=queuechild_array.length;
	for(var i=0;i<queue_child.length;i++){
		if(queue_child[i].nodeType!=1){
			queue.removeChild(queue_child[i]);
			// console.log("remove success");
		}
	}
	console.log(queue);
}

//将arr数组从头shift一个元素，也将span删掉
function outLeft(){	
	if(arr.length){
		arr.shift();
		console.log(arr);
		try{
		outLeftSpan()
		}catch(err){
			console.log('删除left错误');
		}
	}else{		
		hidden.style.display="block";
	}
}
//移除queue的第一个子元素
function outLeftSpan(){
	// removeSpace();
	queue.removeChild(queue.firstChild);
	return true;
}

//将arr数组从尾pop一个元素，也将span删掉
function outRight(){
	if(arr.length){
		arr.pop();
		console.log(arr);
		try{
		outRightSpan()
		}catch(err){
			console.log('删除right错误');
		}
	}else{	
		hidden.style.display="block";
	}
}

//移除queue的最后一个子元素
function outRightSpan(){
	// removeSpace()
	queue.removeChild(queue.lastChild);
	return true;
}

//排序
function sortQueue(){
	// bubbleSort();
	// selectionSort();
	// console.log(arr);
	// bubbleSortQueue();
	// insertSort();
	// var cp_arr=arr.splice(0);
	// arr=mergeSort(cp_arr);
	// console.log(arr);
	Quicksort();
	console.log(arr);
	Visualization();


}
//改变span的位置
function changeBubbleSortPosition(after,before){
	var queue_child=queue.childNodes;
	queue.insertBefore(queue_child[after],queue_child[before]);	
	// console.log("移动span");
}
function swap(num1,num2){
	var tmp=arr[num1];
	arr[num1]=arr[num2];
	arr[num2]=tmp;
	// console.log('hh');
}
//冒泡排序
function bubbleSort(){
	var arr_length=arr.length;
	var queue_child=queue.childNodes;
	for(var i=0;i<arr_length-1;i++){
		for(var j=0;j<arr_length-1-i;j++){
			if(arr[j]>arr[j+1]){
				
				swap(j+1,j);
				changeBubbleSortPosition(j+1,j);
				console.log("bubbleSort了:"+arr);
			}
		}
	}
}
//选择排序
function selectionSort(){
	var arr_length=arr.length;
	var index_min;
	for(var i=0;i<arr_length-1;i++){
		index_min=i;
		for(var j=i;j<arr_length;j++){
			if(arr[index_min]>arr[j]){
				index_min=j;
			}
		}
		if(i!=index_min){
			swap(i,index_min);
			changeSelectionSortPosition(i,index_min);
		}
	}
	console.log(arr);
}

function changeSelectionSortPosition(before,after){
	var queue_child=queue.childNodes;
	if(after==queue_child.length-1){
		console.log('hh');
		queue.insertBefore(queue_child[after],queue_child[before]);
		queue.appendChild(queue_child[before+1]);
	}else{
		var next_sibling=after+1;
		queue.insertBefore(queue_child[after],queue_child[before]);
		queue.insertBefore(queue_child[before+1],queue_child[next_sibling]);
	}
	
}
//插入排序
function insertSort(){
	var arr_length=arr.length;
	for(var i=1;i<arr_length;i++){
		var j=i;
		var tmp=arr[i];
		while(j>0&&tmp<arr[j-1]){
			arr[j] = arr[j-1];
			j--; 
		}
		arr[j]=tmp;	
	}
	console.log(arr);
	Visualization();
}
function mergeSort(cp_arr){
	if(cp_arr.length===1){
		return cp_arr;
	}
	var child_len=Math.floor(cp_arr.length/2);
	var left_arr=cp_arr.slice(0,child_len);
	var right_arr=cp_arr.slice(child_len);
	// console.log(left_arr);
	// console.log(right_arr);
	return Combination(mergeSort(left_arr),mergeSort(right_arr));
}
function Combination(left,right){
	var li=0,ri=0;
	var result=[];
	while(left.length>li&&right.length>ri){
		if(left[li]<right[ri]){
			result.push(left[li++]);
		}else{
			result.push(right[ri++]);
		}
	}
	while(left.length>li){
		result.push(left[li++]);
	}
	while(right.length>ri){
		result.push(right[ri++]);
	}
	return result;
}
//快速排序
function Quicksort(){
	var left=0;
	var right=arr.length-1;
	quick(arr,left,right);
}
function quick(arr,left,right){
	var index=partition(arr,left,right);
	if(left<index-1){
		quick(arr,left,index-1);
	}
	if(index<right){
		quick(arr,index,right);
	}
}
function partition(arr,left,right){
	var i=left;
	var j=right;
	var mid=arr[Math.floor((right+left)/2)];
	while(i<=j)
	{
		while(arr[i]<mid){
			i++;
		}
		while(arr[j]>mid){
			j--;
		}
		if(i<=j){
			swap(i,j);
			i++;
			j--;
		}
	}
	return i;
}
//一个通用的改变queue下span的大小排序
function Visualization(){
	queue.parentNode.removeChild(queue);
	queue=document.createElement("div");
	queue.setAttribute("id","queue");
	var hide=document.getElementById("hide");
	hide.parentNode.insertBefore(queue,hide);
	for(var i=0;i<arr.length;i++){
		var new_span=display(arr[i]);
		new_span.addEventListener("click",removeSpan,false);
		// new_span.appendChild(new_spantext);
		queue.appendChild(new_span);
	}


}

//匹配输入的只有数字
function pattern(){
	
	var pattern_text=/^([1-9]\d|100)$/;
	if(pattern_text.exec(input_text.value)){
		return true;
	}else{
		return false;
	}
}
//隐藏“没有可移除的元素了！”
function hideElement(){
	if(hidden.style.display=="block"){
			hidden.style.display="none"
		}
}
//当焦点离开input输入框，判断输入框中的输入值是否符合匹配
function blurLeave(){
	// input_value=input_text.value;
	if(pattern()==false){
		var warn=document.createElement("p");
		warn.setAttribute("id","warn_mesg");
		var warn_text=document.createTextNode("请输入10-100数字");
		warn.appendChild(warn_text);
		queue.parentNode.insertBefore(warn,queue);
		hideElement();
	}
}
//当爆出"请输入数字"的警告后，用户再次点击input输入框，就将警告移除
function focusText(){
	if(document.getElementById("warn_mesg")){
		var warn=document.getElementById("warn_mesg");
		warn.parentNode.removeChild(warn);
	}		
}


function init(){
	arr=[];
	input_text=document.getElementById("text-input");
	input_text.focus();
	queue=document.getElementById("queue");
	removeSpace();
	hidden=document.getElementById("hide");
	input_text.addEventListener("blur",blurLeave,false);
	input_text.addEventListener("focus",focusText,false);
	var insert_left_btn=document.getElementById("insert-left");
	if(insert_left_btn){
		insert_left_btn.addEventListener("click",insertLeft,false);
	}else{
		console.log('hh');
	}

	var insert_right_btn=document.getElementById("insert-right");
	if(insert_right_btn){
		insert_right_btn.addEventListener("click",insertRight,false);
	}else{
		console.log('hh');
	}
	
	var out_left_btn=document.getElementById("out-left");
	if(out_left_btn){
		out_left_btn.addEventListener("click",outLeft,false);
	}else{
		console.log('hh');
	}
	
	var out_right_btn=document.getElementById("out-right");
	if(out_right_btn){
		out_right_btn.addEventListener("click",outRight,false);
	}else{
		console.log('hh');
	}

	var sort_btn=document.getElementById("sort");
	if(sort_btn){
		sort_btn.addEventListener("click",sortQueue,false);
	}else{
		console.log('hh');
	}
}

init();