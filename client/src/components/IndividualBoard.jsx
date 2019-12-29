import React from 'react'
import '../App.css';
import * as api from '../api';
import { Row, Col, Card, Modal, Form } from 'react-bootstrap';
import IndividualList from './IndividualList';
import { Button } from '@rmwc/button';

class IndividualBoard extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			addListState: false,
			boardName: '',
			listData: [],
			listTasks: [],
			data: {
				name: '',
			},
			draggedTaskId: ''
		}
		this.handleCloseListAdd = this.handleCloseListAdd.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleSaveList = this.handleSaveList.bind(this);
		this.handleFetchList = this.handleFetchList.bind(this);
		this.onDragContainer = this.onDragContainer.bind(this);
		this.onDragModule = this.onDragModule.bind(this);
	}

	handleFetchList = () => {
		return api.getLists(this.props.match.params.id)
		.then((result) => {
			if(result.status === 'success'){
				console.log(result.data.list_data)
				let boardName = result.data.name
				let listData = result.data.list_data
				let listTasks = result.data.list_data.tasks
				this.setState({listData: listData, boardName: boardName})
			}
		})
	}

	componentDidMount() {
		this.handleFetchList();
	}

	addList = () => {
		this.setState({addListState: true})
	}

	handleCloseListAdd() {
    	let data = Object.assign({}, this.state.data)
    	data.name = ''
    	this.setState({addListState: false, data: data})
  	}

  	handleNameChange = (e) => {
    	let data = Object.assign({}, this.state.data)
    	data.name = e.target.value;
    	this.setState({data: data})
  	}

  	handleSaveList = (e) => {
	    let data = Object.assign({}, this.state.data)

	    let value = {
	    	board_id: this.props.match.params.id,
	    	name: this.state.data.name
	    }
	    api.addNewList(value)
	    .then((result) => {
	    	if (result.status === 'success'){
	    		data.name = ''
    			this.setState({addListState: false, data: data})
    			this.handleFetchList();
	    	}
	    })
	}

	onDragContainer = (id) => {
		let value = {
			list_id: id,
			task_id: this.state.draggedTaskId
		}

		api.updateTaskAssociation(value)
		.then((result) =>  {
			if(result.status === 'success') {
				window.location.reload(true);
			}
		})
	}

	onDragModule = (id) => {
		this.setState({draggedTaskId: id})
	}

	onRedirect = (id) => {
		this.props.history.push(`/task/ind/${id}`)
	}


	render() {
		let renderLists
		let addList = this.addList
		let addListState = this.state.addListState
		let onDragModule = this.onDragModule
		let onDragContainer = this.onDragContainer
		let handleFetchList = this.handleFetchList
		let onRedirect = this.onRedirect

		if (this.state.listData.length > 0) {
			renderLists = (
				<div className="horizontalDiv">
					<Row>
						{this.state.listData.map(function(list){
							return(
								<Col xs={{span: 12}} md={{span: 4}} lg={{span: 4}} key={list.id}>
									<IndividualList id = {list.id}
										name = {list.name}
										tasks = {list.tasks}
										onDragModule = {onDragModule}
										onDragContainer = {onDragContainer}
										onRefreshList = {handleFetchList} 
										onRedirect = {onRedirect}/>
								</Col>
							)
						})}
					</Row>
				</div>
			)
		}
		else {
			renderLists = (
				<Row>
					<Col xs={{span: 12}} md={{span: 4}} lg={{span: 4}} onClick={(e) => addList(e)}>
						<div className="boardInfo">
							<br/>
							<p>You do not have any lists yet. Please add a some.</p>
							<br/>
						</div>
					</Col>
				</Row>
			)
		}

		let addListSection = (
            <Modal show={addListState} onHide={this.handleCloseListAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a List to {this.state.boardName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control type="text"
                                className="formInput"
                                placeholder="Name of the List" 
                                onChange={this.handleNameChange}
                                value={this.state.data.name} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.handleSaveList}>
                        Save
                    </Button>
                    <Button variant="secondary" onClick={this.handleCloseListAdd}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        )

		return(
			<div className="App header">
				<br/>
                <Card className="cardBody">
                    <br/>
                    <Row>
                        <Col>
                        	<h3>{this.state.boardName}</h3>
                        </Col>
                    </Row>
                    <br/>
                </Card>
                <br/>
                <div className="rightAlign">
					<Button raised onClick={(e) => addList(e)} >Add List</Button>
				</div>
                <br/>
                <br/>
                {renderLists}
                {addListSection}
            </div>
		)
	}
}

export default IndividualBoard