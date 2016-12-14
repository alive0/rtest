var React = require('react');


module.exports=React.createClass({
	render:function(){
		return (
			<figure className="img-figure">
				<img src={this.props.data.url} alt={this.props.data.title}/>
				<figcaption>
					<h2 className="img-title">{this.props.data.title}</h2>
				</figcaption>
			</figure>
		)
	}
});

