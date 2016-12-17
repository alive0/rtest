var React = require('react');


module.exports=React.createClass({
	handclick:function(e){
		if(this.props.random.iscenter){
			//居中的图片翻转，不是居中的图片进行居中
			this.props.clickfn();
		}else{
			this.props.center();
		}
		e.stopPropagation();
		e.preventDefault();
	},
	render:function(){
		var styleObj={};
		if(this.props.random.pos){
			styleObj=this.props.random.pos;
		}

		//旋转角度不为0时候旋转
		if(this.props.random.rotate){
			var brow=['-webkit-','-moz-','-ms-','-o-',''];
			brow.forEach(function(v){
				styleObj[v+'transform']='rotate('+this.props.random.rotate+'deg)';
			}.bind(this));
		}

		var imgClass='img-figure';
		if(this.props.random.flag){
			imgClass+=' is-inverse'
		}

		if(this.props.random.iscenter){
			styleObj.zIndex=11;
		}

		return (
			<figure className={imgClass} style={styleObj} onClick={this.handclick}>
				<img src={this.props.data.url} alt={this.props.data.title}/>
				<figcaption>
					<h2 className="img-title">{this.props.data.title}</h2>
					<div className="img-back">
						<p>{this.props.data.desc}</p>
					</div>
				</figcaption>
			</figure>
		)
	}
});

