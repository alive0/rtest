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
		var comClass='controller-unit';
		if(this.props.random.flag){
			comClass+=' is-inverse';
		}
		if(this.props.random.iscenter){
			comClass+=' is-center';
		}
		return (
			<span className={comClass} onClick={this.handclick}></span>
		)
	}
});

