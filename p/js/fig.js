var React = require('react');


module.exports=React.createClass({
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

		return (
			<figure className="img-figure" style={styleObj}>
				<img src={this.props.data.url} alt={this.props.data.title}/>
				<figcaption>
					<h2 className="img-title">{this.props.data.title}</h2>
				</figcaption>
			</figure>
		)
	}
});

