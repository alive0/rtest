var React = require('react');
var ShowBtn=require('./showbtn.js');
var Qaform=require('./form.js');
var Qalist=require('./queslist.js');


module.exports =React.createClass({
	getInitialState:function(){
		return{
			quesArr:[
				{
					key: 1,
					title:'产品经理与程序员矛盾的本质是什么111？',
					description:'理性探讨，请勿撕逼。产品经理的主要工作职责是产品设计。接受来自其他部门的需求，经过设计后交付研发。但这里有好些职责不清楚的地方。',
					voteCount: 10,
				},
				{
					key: 2,
					title:'热爱编程是一种怎样的体验？',
					description:'别人对玩游戏感兴趣，我对写代码、看技术文章感兴趣；把泡github、stackoverflow、v2ex、reddit、csdn当做是兴趣爱好；遇到重复的工作，总想着能不能通过程序实现自动化；喝酒的时候把写代码当下酒菜，边喝边想边敲；不给工资我也会来加班；做梦都在写代码。',
					voteCount: 8,
				},
			],
			flag:false
		}
	},
	onToggleshow:function(){
		this.setState({
			flag:!this.state.flag
		})
	},
	addDatefn:function(date){
		date.key=this.state.quesArr.length+1;
		var newquesArr=this.state.quesArr.concat(date);
		newquesArr=this.Qsort(newquesArr);

		this.setState({
			quesArr:newquesArr
		});
	},
	//排序
	Qsort:function(arr){
		arr.sort(function(a,b){
			return b.voteCount-a.voteCount;
		});
		return arr;
	},
	vote:function(k,n){
		var newArr=this.state.quesArr.slice();
		var newArrmap= newArr.map(function(qst){
			if(qst.key==k){
				qst.voteCount=n;
			}
			return qst;
		});
		newArrmap=this.Qsort(newArrmap);
		this.setState({
			quesArr:newArrmap
		});
		
	},
	render:function(){
		return (
			<div>
			      <div className="jumbotron text-center">
			          <div className="container">
			            <h1>React--问答</h1>
			            <ShowBtn Toggleshow={this.onToggleshow} />
			          </div>
			      </div>
			      <div className="main container">
			        	<Qaform addDate={this.addDatefn} formflag={this.state.flag} Toggleshow={this.onToggleshow} />
			        	<Qalist vote={this.vote} quesArr={this.state.quesArr} />
			      </div>
			</div>
		)
	}
});
