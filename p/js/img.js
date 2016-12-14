var React = require('react');

//单个图片组件信息--图片地址-标题-描述
var Fig=require('./fig.js');

//存取图片信息，地址信息
var imageDatas = require('../data/imageDatas.json');


imageDatas=(function(imageDatasArr){
	for(var i=0;i<imageDatasArr.length;i++){
		imageDatasArr[i].url=require('../images/'+imageDatasArr[i].fileName);
	}
	return imageDatasArr;
})(imageDatas);

module.exports=React.createClass({
	render:function(){

		var imgFigs=[],controllUnits=[];
		imageDatas.forEach(function(value,index){
			imgFigs.push(<Fig data={value} key={index} />);
		})

		return (
			<section className="stage">
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

