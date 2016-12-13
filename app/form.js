var React=require('react');
var ReactDOM=require('react-dom');

module.exports=React.createClass({
	handsubmit:function(e){
		e.preventDefault();
		if(!ReactDOM.findDOMNode(this.refs.title).value) return;

		var Ndates={
			title:ReactDOM.findDOMNode(this.refs.title).value,
			description:ReactDOM.findDOMNode(this.refs.dec).value,
			voteCount: 0,
		};
		ReactDOM.findDOMNode(this.refs.tform).reset();
		this.props.addDate( Ndates );
	},
	render:function(){
		var styleObj={display:this.props.formflag?'block':'none'};

		return (
			<form ref="tform" onSubmit={this.handsubmit} style={styleObj} name="addQuestion" className="clearfix">
		          <div className="form-group">
		            <label htmlFor="qtitle">问题</label>
		            <input ref="title" type="text" className="form-control" id="qtitle" placeholder="您的问题的标题" />
		          </div>
		          <textarea ref="dec" className="form-control" rows="3" placeholder="问题的描述"></textarea>
		          <button className="btn btn-success pull-right">确认</button>
		          <button name="btn" className="btn btn-default pull-right" onClick={this.props.Toggleshow} >取消</button>
	        </form>
		)
	}
});

