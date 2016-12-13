var React = require('react');

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
		return (
			<section className="stage">
				<section className="img-sec">
						
				</section>
				<nav className="controller-nav"></nav>
			</section>
		)
	}
});

