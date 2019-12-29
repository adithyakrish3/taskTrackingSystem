import React from 'react'
import '../App.css';
import * as api from '../api';
import { Row, Col, Card, Modal, Form } from 'react-bootstrap';
import { Button } from '@rmwc/button';
import { Dialog, DialogContent, DialogTitle } from '@rmwc/dialog';

class IndividualList extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			addTaskState: false,
			data: {
				id: '',
				name: '',
				tasks: []
			},
			taskData: {
				name: '',
				description: '',
			},
			renderData: {
				id:'',
				name: '',
				desc: '',
				comments: []
			}
		}
		this.saveTask = this.saveTask.bind(this);
		this.addTask = this.addTask.bind(this);
		this.openTask = this.openTask.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleDescChange = this.handleDescChange.bind(this);
	}

	componentDidMount() {
		let data = Object.assign({}, this.state.data)

		data.id = this.props.id
		data.name = this.props.name
		data.tasks = this.props.tasks
		this.setState({data: data})
	}

	onDragContainer = (e) => {
		this.props.onDragContainer(e.target.id)
	}

	onDragModule = (e, id) => {
		this.props.onDragModule(id)
	}

	addTask = (e) => {
		this.setState({addTaskState: true})
	}

	handleCloseTaskAdd = (e) => {
		let taskData = Object.assign({}, this.state.taskData)
		taskData.name = ''
		taskData.description = ''
		this.setState({taskData: taskData, addTaskState: false})
	}

	handleNameChange = (e) => {
    	let taskData = Object.assign({}, this.state.taskData)
    	taskData.name = e.target.value;
    	this.setState({taskData: taskData})
  	}

  	handleDescChange = (e) => {
    	let taskData = Object.assign({}, this.state.taskData)
    	taskData.description = e.target.value;
    	this.setState({taskData: taskData})
  	}

	saveTask = (e) => {
		let value = {
			list_id: this.state.data.id,
			name: this.state.taskData.name,
			description: this.state.taskData.description
		}

		api.addTaskInfo(value)
		.then((result) => {
			if (result.status === 'success') {
				this.setState({addTaskState: false})
				window.location.reload(true);
			}
		})
	}

	openTask = (e, id) => {
		e.preventDefault()
		this.props.onRedirect(id)
	}

	handleCloseTask = (e) => {
		this.setState({openTaskState: false})
	}


	render() {
		let renderTasks, addTaskDialog, openTaskDalog
		let onDragContainer = this.onDragContainer
		let onDragModule = this.onDragModule
		let addTask = this.addTask
		let openTask = this.openTask
		let addTaskState = this.state.addTaskState

		addTaskDialog = (
			<Modal show={addTaskState} onHide={this.handleCloseTaskAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a Task to {this.state.data.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control type="text"
                                className="formInput"
                                placeholder="Name" 
                                onChange={this.handleNameChange}
                                value={this.state.taskData.name} />
                            <br />
                            <Form.Control as="textarea" 
                            	className="formInput" 
                            	placeholder="Description" 
                            	onChange={this.handleDescChange}
                                value={this.state.taskData.description} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.saveTask}>
                        Save
                    </Button>
                    <Button variant="secondary" onClick={this.handleCloseTaskAdd}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
		)

		if (this.state.data.tasks.length > 0) {
			renderTasks = (
				<div>
					{this.state.data.tasks.map(function(task){
						return (
							<div className="tasksInfo" onClick={(e) => openTask(e, task.id)} draggable onDragStart={(e) => onDragModule(e, task.id)} key={task.id}>
								{task.name}
							</div>
						)
					})}
				</div>
			)
		}
		return(
			<div onDragOver={(e) => onDragContainer(e)}>
				<div className="listInfo" id={this.state.data.id}>
					<Row>
						<Col> {this.state.data.name} </Col>
						<Col className="rightAlign"><Button outlined onClick={(e) => addTask(e)} >Add Task</Button></Col>
					</Row>
				</div>
				{renderTasks}
				{addTaskDialog}
			</div>
		)
	}
}

export default IndividualList