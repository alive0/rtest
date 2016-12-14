var React = require('react');


module.exports=React.createClass({
	render:function(){
		
		var styleObj={};
		if(this.props.random.pos){
			styleObj=this.props.random.pos;
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

