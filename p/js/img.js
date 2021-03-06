var React = require('react');
var ReactDOM = require('react-dom');

//单个图片组件信息--图片地址-标题-描述
var Fig=require('./fig.js');
var Com=require('./com.js');

//存取图片信息，地址信息
var imageDatas = require('../data/imageDatas.json');
var w=document.getElementById('content').offsetHeight;

imageDatas=(function(imageDatasArr){

	for(var i=0;i<imageDatasArr.length;i++){
		imageDatasArr[i].url=require('../images/'+imageDatasArr[i].fileName);
	}
	return imageDatasArr;
})(imageDatas);

//获取区间内的随机值
function getRandom(low,high){
	return Math.ceil( Math.random()*(high-low)+low );
}

//随机获取旋转角度控制在正负30度
function get30Deg(){
	return ( (Math.random()>0.5?'':'-')+Math.ceil( Math.random()*30 ) );
}

module.exports=React.createClass({
	imgPos:{
		centerP:{//中心点取值范围
			left:0,
			right:0
		},
		hP:{ //左侧右侧位置取值范围
			leftPosx:[0,0],
			rightPosx:[0,0],
			y:[0,0]
		},
		vP:{//上侧取值范围
			x:[0,0],
			yTop:[0,0]
		}
	},
	getInitialState:function(){
		return {
			//每一个数组元素是一个状态对象，包含位置信息,旋转角度
			//为图片数组添加位置对象
			imgArr:[
				/*
				{
					pos:{
						left:0,
						top:0
					},
					rotate:0,
					//正反面标志，FALSE正面
					flag:false,
					iscenter:false
				}
				*/
			]
		}
	},

	//翻转，居中函数运用了闭包，以便传值index
	clickfn:function(index){
		return function(){
				var newimgArr=this.state.imgArr;
				newimgArr[index].flag=!newimgArr[index].flag;
				this.setState({
					imgArr:newimgArr
				});
		}.bind(this)
	},
	center:function(index){
		return function(){
			this.rerange(index);
		}.bind(this);
	},

	//重新布局图片状态，包含位置信息
	rerange:function(centerindex){
		//居中的图片的状态信息，是图片居中
		//splice取出来1个中心图片，原数组不存在该图片
		var stateImgArr=this.state.imgArr;
		var imgcenterArr=[];//存中心图片，只有一张中心图片
		imgcenterArr=stateImgArr.splice(centerindex,1);
		imgcenterArr[0].pos=this.imgPos.centerP;

		//居中的图片旋转角度为0
		imgcenterArr[0].rotate=0;
		imgcenterArr[0].iscenter=true;


		//上侧图片的状态信息，数量为一个或者0个
		var imgTopArr=[];//存上侧图片
		var topNum=Math.floor(Math.random()*2);//随机取0,1
		var topIndex=0; //上侧图片的位置索引

		topIndex=Math.ceil( Math.random()*(stateImgArr.length-topNum) );
		imgTopArr=stateImgArr.splice(topIndex,topNum);

		var _this=this;

		//上侧图片布局--imgTopArr不管有没有值用forEach遍历
		imgTopArr.forEach(function(v,i){
				imgTopArr[i].pos={
					//取值范围this.imgPos.vP.x[0]-[1]
					//this.imgPos.vP.yTop[0]-[1]
					top:getRandom( _this.imgPos.vP.yTop[0] , _this.imgPos.vP.yTop[0] ),
					left:getRandom( _this.imgPos.vP.x[0] , _this.imgPos.vP.x[1] )
				};
				//图片旋转
				imgTopArr[i].rotate=get30Deg();
				imgTopArr[i].iscenter=false;
		});

		//布局左侧，右侧的图片，前一半在左边，后一半在右边
		for( var i=0 , j=stateImgArr.length , k=j/2 ; i<j ; i++ ){
			var hPTemp=null;

			if(i<k){
				hPTemp=_this.imgPos.hP.leftPosx;
			}else{
				hPTemp=_this.imgPos.hP.rightPosx;
			}

			stateImgArr[i].pos={
				top:getRandom( _this.imgPos.hP.y[0], _this.imgPos.hP.y[1] ),
				left:getRandom( hPTemp[0], hPTemp[1] )
			};
			//图片旋转
			stateImgArr[i].rotate=get30Deg();
			stateImgArr[i].iscenter=false;

		}

		//重新拼接this.state.imgArr，splice已经改变了原来的数组元素
		//上侧元素添加进去
		if( imgTopArr && imgTopArr[0] ){
			stateImgArr.splice( topIndex , 0 , imgTopArr[0] );
		}
		//中心图片添加
		stateImgArr.splice( centerindex , 0 , imgcenterArr[0] );

		this.setState({
			imgArr:stateImgArr
		});

	},

	//组件加载后为每张图片计算位置
	componentDidMount:function(){
		//舞台大小计算
		var stageDom=ReactDOM.findDOMNode(this.refs.stage),
			stageW=document.body.scrollWidth,
			stageH=stageDom.scrollHeight;
			console.info(w);

		//图片大小计算
		var imgDom=ReactDOM.findDOMNode(this.refs.img0),
			imgW=imgDom.scrollWidth,
			imgH=imgDom.scrollHeight;

		//中心点的取值
		this.imgPos.centerP={
			left:stageW/2-imgW/2,
			top:stageH/2-imgH/2
		};

		//左侧范围的计算
		this.imgPos.hP.leftPosx[0]=-imgW/2;
		this.imgPos.hP.leftPosx[1]=stageW/2-imgW/2*3;

		//右侧范围的计算
		this.imgPos.hP.rightPosx[0]=stageW/2+imgW/2;
		this.imgPos.hP.rightPosx[1]=stageW-imgW/2;

		//Y值取值范围
		this.imgPos.hP.y[0]=-imgH/2;
		this.imgPos.hP.y[1]=stageH-imgH/2;

		//上侧X取值范围
		this.imgPos.vP.x[0]=stageW/2-imgW;
		this.imgPos.vP.x[1]=stageW/2;

		//上侧y取值范围
		this.imgPos.vP.yTop[0]=-imgH/2;
		this.imgPos.vP.yTop[1]=stageH/2-imgH/2*3;

		//图片排布函数
		this.rerange(0);


	},
	render:function(){

		var imgFigs=[],controllUnits=[];

		imageDatas.forEach(function(value,index){

			//为每张图片添加位置对象 初始化
			if(!this.state.imgArr[index]){
				this.state.imgArr[index]={
					pos:{
						left:0,
						top:0
					},
					rotate:0,
					flag:false,
					iscenter:false
				}
			}

			imgFigs.push(<Fig data={value} key={index} ref={'img'+index} random={this.state.imgArr[index] } clickfn={this.clickfn(index)} center={this.center(index)} />);

			controllUnits.push( <Com key={index} random={this.state.imgArr[index]} clickfn={this.clickfn(index)} center={this.center(index)} /> );
		}.bind(this));

		return (
			<section className="stage" ref="stage">
				<section className="img-sec">
					{imgFigs}
				</section>
				<nav className="controller-nav">
					{controllUnits}
				</nav>
			</section>
		)
	}
});

