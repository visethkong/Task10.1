import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
	
	this.state = { isSetC: false, isSetD: false, isSetS: false, title: '', description:'', expiry_date: '', reward_per_person:'', require_master_workers: '', number_of_workers:'', mcqs_questions: [{ statement:'', options:[], answer:''}], true_false_questions: [{ statement:'', answer:''}], statement_questions: [{ statement:'', answer:''}]};
	this.handleChange = this.handleChange.bind(this);
	this.handleClick = this.handleClick.bind(this);
	this.handleInput = this.handleInput.bind(this);
	
	this.changeMCQS = this.changeMCQS.bind(this);
	this.changeTrueFalse = this.changeTrueFalse.bind(this);
	this.changeStatement = this.changeStatement.bind(this);
	
	this.changeRadio = this.changeRadio.bind(this);
  }
  
  handleChange(event) {
	let selection = event.currentTarget.value;
	
	if(selection == 'c') {
		var mcqs_questions = [ {statement: 'Pakistans Capital?', options: ['Isb', 'Kar', 'Mul', 'Lhr'], answer:'' }, {statement: 'National Poet of Pakistan?', options: ['Allama Iqbal', 'Quaid e Azam', 'Mirza Ghalib', 'Josh'], answer: ''} ];
		this.setState({isSetC: true, isSetD: false, isSetS: false, mcqs_questions:  mcqs_questions});
	}
	else if(selection == 'd') {
		var true_false_questions = [{statement: 'Peshawar is the city of Pakistan?', answer: '' }, { statement: 'Is Virat Kohli an Australian bowler?', answer: ''}]; 
		this.setState({isSetC: false, isSetD:true, isSetS: false, true_false_questions: true_false_questions});
	}
	else if(selection == 's') {
		var statement_questions = [{statement: 'What is your name?', answer: ''}, {statement: 'Describe about yourself', answer: ''}];
		this.setState({isSetC: false, isSetD: false, isSetS: true, statement_questions: statement_questions}); 
	}
	else {
		//
	}
	
  }
  
  handleClick() {	  
	if(this.state.title == '' || this.state.description == '' || this.state.expiry_date == '') {
		return window.alert("All fields are required");
		
	}
	else if(!this.state.isSetC && !this.state.isSetD && !this.state.isSetS) {
		return window.alert("Select atleast one task");
	}
	else {
		let answers = [];
		let type = "";
		if(this.state.isSetC) {
			this.state.mcqs_questions.forEach(function(question, index){
				if(question.answer == '') {
					return window.alert("Please Answer MCQS #" + (index + 1));
				}
			});
			answers = this.state.mcqs_questions;
			type = "Choice Task";
		}
		else if(this.state.isSetD) {
			this.state.true_false_questions.forEach(function(question, index){
				if(question.answer == '') {
					return window.alert("Please Answer True/False #" + (index + 1));
				}
			});
			answers = this.state.true_false_questions;
			type = "Decision-Making Task";
		}
		else {
			this.state.statement_questions.forEach(function(question, index){
				if(question.answer == '') {
					return window.alert("Please Answer Question #" + (index + 1));
				}
			});
			answers = this.state.statement_questions;
			type = "Sentence-Level Task";
		}
		 const article = { title: 'React POST Request Example' };
		axios.post('http://localhost:8000/add_task', {answers: answers, task_type: type, title: this.state.title, description: this.state.description, expiry_date: this.state.expiry_date, require_master_workers: this.state.require_master_workers, reward_per_response: this.state.reward_per_person, number_of_workers: this.state.number_of_workers})
			.then(response => window.alert(response));
	}
  }
 
  
  handleInput(event) {
	this.setState({
		[event.currentTarget.id]: event.currentTarget.value
	});
  }
  
  changeMCQS(event) {
	let index = event.currentTarget.name;
	let answer = event.currentTarget.value;
	
	let { mcqs_questions } = this.state;
	mcqs_questions[index].answer = answer;
	this.setState({
		mcqs_questions: mcqs_questions
	});
  }
  
  changeTrueFalse(event) {
	let index = event.currentTarget.name;
	let answer = event.currentTarget.value;
	
	let { true_false_questions } = this.state;
	true_false_questions[index].answer = answer;
	this.setState({
		true_false_questions: true_false_questions
	});
  }
  
  changeStatement(event) {
	let index = event.currentTarget.name;
	let answer = event .currentTarget.value;
	
	let { statement_questions } = this.state;
	statement_questions[index].answer = answer;
	this.setState({
		statement_questions: statement_questions
	});
  }
  
  changeRadio(event) {
	let value = event.currentTarget.value;
	
	if(value == "Yes") {
		this.setState({
			require_master_workers: "True"
		});
	}
	else {
		this.setState({
			require_master_workers: "False"
		});
	}
  }
  

  render() {
    
	return (
	
		
	
	  <div>
		<Navbar></Navbar>
		<div class="container mt-2">
			<div class="card">
				<div class="card-body">
					
					<h6 style={{backgroundColor: 'grey'}} class="p-2">New Requester Task</h6>
					<div class="my-2 py-2">
						<span>Select Task Type: </span>
						<div class="form-check-inline">
							<label class="form-check-label">
								<input type="radio" class="form-check-input" value="c" name="opt" onChange={this.handleChange}/>Choice Task
							</label>
						</div>
						<div class="form-check-inline">
							<label class="form-check-label">
								<input type="radio" class="form-check-input" value="d" name="opt" onChange={this.handleChange}/>Decision-Making Task
							</label>
						</div>
						<div class="form-check-inline">
							<label class="form-check-label">
								<input type="radio" class="form-check-input" value="s" name="opt" onChange={this.handleChange}/>Sentence-Level Task
							</label>
						</div>
					</div>
					
					<h6 style={{backgroundColor: 'grey'}} class="p-2">Describe your task to Workers</h6>
					<div class="my-2 py-2">
						<div class="row">
							<div class="form-group col-lg-2">
								<p>Title</p>
							</div>
							<div class="form-group col-lg-10" class="text-align: left;">
								<input type="text" placeholder="Enter task title" class="form-control" id="title" onChange={this.handleInput}/>
							</div>
						</div>
						<div class="row">
							<div class="form-group col-lg-2">
								<p>Description</p>
							</div>
							<div class="form-group col-lg-10" class="text-align: left;">
								<input type="text" placeholder="Enter task description" class="form-control" id="description" onChange={this.handleInput}/>
							</div>
						</div>
						<div class="row">
							<div class="form-group col-lg-2">
								<p>Expiry Date</p>
							</div>
							<div class="form-group col-lg-10" class="text-align: left;">
								<input type="date" class="form-control" id="expiry_date" onChange={this.handleInput}/>
							</div>
						</div>
					</div>
					
					<h6 style={{backgroundColor: 'grey'}} class="p-2">Setting up your task</h6>
					<div class="my-2 py-2">
						
						{
							this.state.isSetC && this.state.mcqs_questions.map((question, index) => {
								return (
									<div>
										<span> {question.statement} </span>
										<div class="form-check-inline my-3">
											<label class="form-check-label">
												<input type="radio" class="form-check-input" onChange={this.changeMCQS} value={question.options[0]} name={index}/>{question.options[0]}
											</label>
										</div>
										<div class="form-check-inline my-3">
											<label class="form-check-labe.l">
												<input type="radio" class="form-check-input" onChange={this.changeMCQS} value={question.options[1]} name={index}/>{question.options[1]}
											</label>
										</div>
										<div class="form-check-inline my-3">
											<label class="form-check-label">
												<input type="radio" class="form-check-input" onChange={this.changeMCQS} value={question.options[2]} name={index}/>{question.options[2]}
											</label>
										</div>
										<div class="form-check-inline my-3">
											<label class="form-check-label">
												<input type="radio" class="form-check-input" onChange={this.changeMCQS} value={question.options[3]} name={index}/>{question.options[3]}
											</label>
										</div>
									</div>
								);
							})
						}
						
						{
							this.state.isSetD && this.state.true_false_questions.map((question, index) => {
								return (
									<div>
										<span> {question.statement} </span>
										<div class="form-check-inline my-3">
											<label class="form-check-label">
												<input type="radio" class="form-check-input" value="True" onChange={this.changeTrueFalse} name={index}/>True
											</label>
										</div>
										<div class="form-check-inline my-3">
											<label class="form-check-label">
												<input type="radio" class="form-check-input" value="False" onChange={this.changeTrueFalse} name={index}/>False
											</label>
										</div>
									</div>
								);
							})
						}
						
						{
							this.state.isSetS && this.state.statement_questions.map((question, index) => {
								return (
									<div>
										<span> {question.statement} </span>
										<div>
											<label class="form-check-label">
												<input type="text" class="form-control" onChange={this.changeStatement} placeholder="Enter answer"  name={index}/>
											</label>
										</div>
									</div>
								);
							})
						}
						
					</div>
					
					<h6 style={{backgroundColor: 'grey'}} class="p-2">Worker Requirement</h6>
					<div class="my-2 py-2">
						<span>Require Master Workers : </span>	
						<div class="form-check-inline">
							<label class="form-check-label">
								<input type="radio" class="form-check-input" value="Yes" name="opt_1" onChange={this.changeRadio}/>Yes
							</label>
						</div>
						<div class="form-check-inline">
							<label class="form-check-label">
								<input type="radio" class="form-check-input" value="No" name="opt_1" onChange={this.changeRadio}/>No
							</label>
						</div>
						
						<div class="row mt-4">
							<div class="form-group col-lg-2">
								<p>Reward per response</p>
							</div>
							<div class="form-group col-lg-10" class="text-align: left;">
								<input type="text"  placeholder="Reward per response" class="form-control" id="reward_per_person" onChange={this.handleInput}/>
							</div>
						</div>
						
						<div class="row">
							<div class="form-group col-lg-2">
								<p>Number of Workers</p>
							</div>
							<div class="form-group col-lg-10" class="text-align: left;">
								<input type="text"  class="form-control" placeholder="Number of workers" id="number_of_workers" onChange={this.handleInput}/>
							</div>
						</div>
					</div>
					
					
					
					
					
				</div>	
				<button type="button" class="btn btn-success" onClick={this.handleClick}>Save</button>
				
			</div>
		</div>
	  </div>
	);
  } 
}

export default App;
