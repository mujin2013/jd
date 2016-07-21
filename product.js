//-------------------鼠标悬停在商品小图上时，显示中等图片------------------------
//给小图的每个img加鼠标悬停事件
var iconList=document.getElementById('icon_list');
var imgs=iconList.getElementsByTagName('img');
var mediumImg=document.getElementById('medium');
for(var i=0;i<imgs.length;i++){
	imgs[i].onmouseover=changeMediumImg;//给每个小图添加鼠标悬停事件
}
// 当鼠标悬停在商品小图上时，显示中等图片
function changeMediumImg(){
	var curSrc=this.src;//获得当前产生事件的那个图片的src
	var dotIndex=curSrc.lastIndexOf('.');
	mediumSrc=curSrc.substring(0,dotIndex)+'-m'+curSrc.substring(dotIndex);//得到中等图片的src
	mediumImg.src=mediumSrc;
}

//-----------------------------------商品的图片轮换-------------------------------------
var btnLeft=document.getElementById('btnLeft');//获得图片轮换左边那个button
var btnRight=document.getElementById('btnRight');//获得图片轮换左边那个button
const LIWIDTH=62;//每个小图li的宽度
var count=0;//对图片移动次数进行计数
var left;//保存整个ul向左移动的值
btnRight.onclick=function(){
	if(btnRight.className==="forward_disabled"){//如果右边那个按钮处于禁用状态，那么对单击事件不响应，直接返回
		return;
	}
	count++;
	left=LIWIDTH*count*(-1)+'px';
	iconList.style.left=left;
	btnLeft.className="backward";//只要前进了一次，后退按钮必然可以启用了
	if(count==imgs.length-5){//当移动到最后一张时，前进按钮就被禁用了
		btnRight.className="forward_disabled";
	}
}
btnLeft.onclick=function(){
	if(btnLeft.className==='backward_disabled'){//如果左边那个按钮处于禁用状态，那么对单击事件不响应，直接返回
		return;
	}
	count--;
	left=LIWIDTH*count*(-1)+'px';
	iconList.style.left=left;
	btnRight.className="forward";//只要后退了一次，前进按钮必然可以启用了
	if(count==0){
		btnLeft.className="backward_disabled";//当移动到最后一张时，后退按钮就被禁用了
	}
}

//-----------------------鼠标悬停在中等图片上时有放大镜效果---------------------
var bigMask=document.getElementById('bigMask');
var mask=document.getElementById('mask');
var bigImgArea=document.getElementById('bigImgArea');
//给bigMask添加鼠标移动事件
bigMask.onmousemove=function(event){
	//-----设置半透明遮罩
	var left=event.offsetX-175/2;
	left=left>0?left:0;//使得半透明遮罩左边不会超出边界
	left=left<175?left:175;//使得半透明遮罩右边不会超出边界
	var top=event.offsetY-175/2;
	top=top>0 ? top:0;//使得半透明遮罩上边不会超出边界
	top=top<175?top:175;//使得半透明遮罩下边不会超出边界
	mask.style.left=left+'px';//设置半透明的left
	mask.style.top=top+'px';//设置半透明的top

	//设置放大镜区域的图片
	//bigImgArea.style.backgroundPositionX = left*800/350*(-1)+'px';  //chrome支持
	//bigImgArea.style.backgroundPositionY = top*800/350*(-1)+'px';  //chrome支持
	bigImgArea.style.backgroundPosition=left*800/350*(-1)+'px  '+top*800/350*(-1)+'px';//firefox不支持backgroundPositionX等
}
//给bigMask添加鼠标移入事件
bigMask.onmouseover=function(){
	mask.style.visibility='visible';
	var sourceSrc=mediumImg.src;//获得当前中等图片的src
	var dotIndex=sourceSrc.lastIndexOf('.');
	bigImgAreaUrl=sourceSrc.substring(0,dotIndex-1)+'l'+sourceSrc.substring(dotIndex);
	bigImgArea.style.backgroundImage='url('+bigImgAreaUrl+')';
	bigImgArea.style.visibility='visible';
}
//给bigMask添加鼠标移出事件
bigMask.onmouseout=function(){
	mask.style.visibility='hidden';
	bigImgArea.style.visibility='hidden';
}
