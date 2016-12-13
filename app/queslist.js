var React=require('react');
var Qaitem=require('./qaitem.js');

module.exports=React.createClass({
	//注意下面的this作用域
	render:function(){
		var qarr=this.props.quesArr;
		var NewQuArr=qarr.map(function(qst){
			return <Qaitem
					key={qst.key}
					qk={qst.key} 
					title={qst.title} 
					desc={qst.description} 
					voteCount={qst.voteCount} 
					onvote={this.props.vote} />
		}.bind(this));
		
		return(
			<div id="questions" className="">
	          {NewQuArr}
	        </div>
		)
	}
});