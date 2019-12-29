import React from 'react'
import '../App.css';
import * as api from '../api';
import { Row, Col, Card, Modal, Form } from 'react-bootstrap';
import { Button } from '@rmwc/button';

class BoardHome extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			addBoardState: false,
			data: {
				name: '',
				boardData: []
			}
		}
		this.handleFetchBoards = this.handleFetchBoards.bind();
		this.addBoard = this.addBoard.bind(this);
		this.handleNameChange = this.handleNameChange.bind(this);
		this.handleCloseBoardAdd = this.handleCloseBoardAdd.bind(this);
		this.handleSaveBoard = this.handleSaveBoard.bind(this);
	}

	handleFetchBoards = () => {
		let data = this.state.data
		
		return api.getBoards()
		.then((result) => {
			if(result.status === 'success') {
				data.boardData = result.data
				this.setState({data: data})
			}
		})
	}

	componentDidMount() {
		this.handleFetchBoards()
	}

	addBoard = () => {
		this.setState({addBoardState: true})
	}

	handleCloseBoardAdd() {
    	let data = Object.assign({}, this.state.data)
    	data.name = ''
    	this.setState({addBoardState: false, data: data})
  	}

  	handleNameChange = (e) => {
    	let data = Object.assign({}, this.state.data)
    	data.name = e.target.value;
    	this.setState({data: data})
  	}

  	handleSaveBoard = (e) => {
	    let data = Object.assign({}, this.state.data)

	    let value = {
	    	name: this.state.data.name
	    }
	    api.addNewBoard(value)
	    .then((result) => {
	    	if (result.status === 'success'){
	    		data.name = ''
    			this.setState({addBoardState: false, data: data})
    			this.handleFetchBoards();
	    	}
	    })
	}

	redirectBoard = (id) => {
		console.log(id)
		this.props.history.push(`/board/ind/${id}`)
	}

	render() {
		let renderBoards
		let addBoard = this.addBoard
		let addBoardState = this.state.addBoardState
		let redirectBoard = this.redirectBoard


		let addBoardSection = (
            <Modal show={addBoardState} onHide={this.handleCloseBoardAdd}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a Board</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control type="text"
                                className="formInput"
                                placeholder="Name of the Board" 
                                onChange={this.handleNameChange}
                                value={this.state.data.name} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.handleSaveBoard}>
                        Save
                    </Button>
                    <Button variant="secondary" onClick={this.handleCloseBoardAdd}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        )
		if (this.state.data.boardData.length > 0) {
			renderBoards = (
				<Row>
					{this.state.data.boardData.map(function(board){
						return(
							<Col xs={{span: 12}} md={{span: 4}} lg={{span: 4}} onClick={(e) => redirectBoard(board.id)} key={board.id}>
								<div className="boardInfo">
									{board.name}
								</div>
							</Col>
						)
					})}
					<Col xs={{span: 12}} md={{span: 4}} lg={{span: 4}} onClick={(e) => addBoard(e)}>
						<div className="boardInfo">
							Click to add a board
						</div>
					</Col>
				</Row>
			)
		}
		else {
			renderBoards = (
				<Row>
					<Col xs={{span: 12}} md={{span: 4}} lg={{span: 4}} onClick={(e) => addBoard(e)}>
						<div className="boardInfo">
							<br/>
							<p>You do not have any boards yet. Wanna add some?</p>
							<br/>
						</div>
					</Col>
				</Row>
			)
		}

		return(
			<div className="App header">
				<br/>
                <Card className="cardBody">
                    <br/>
                    <Row>
                        <Col><h3>Trello - Kinda Application</h3></Col>
                    </Row>
                    <br/>
                </Card>
                <br/>
                <br/>
                {renderBoards}
                {addBoardSection}
            </div>
		)
	}
}

export default BoardHome