import React from 'react'
import '../App.css';
import * as api from '../api';
import { Row, Col, Card, Modal, Form } from 'react-bootstrap';
import { Button } from '@rmwc/button';
import { Dialog, DialogContent, DialogTitle } from '@rmwc/dialog';
import { Typography } from '@rmwc/typography';

class IndividualTask extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			addCommentState: false,
			data: {
				id: '',
				name: '',
				desc: '',
				comments: []
			},
			commentData: {
				comment: ''
			}
		}
		this.addComment = this.addComment.bind(this);
		this.handleCloseComment = this.handleCloseComment.bind(this);
		this.handleCommentChange = this.handleCommentChange.bind(this);
		this.saveComment = this.saveComment.bind(this);
		this.deleteComment = this.deleteComment.bind(this);
	}

	componentDidMount() {
		let data = Object.assign({}, this.state.data)

		return api.getTaskInfo(this.props.match.params.id)
		.then((result) => {
			if(result.status === 'success'){
				if (result.status === 'success'){
					console.log(result.comments)
					data.id = result.data.id
					data.name = result.data.name
					data.desc = result.data.description
					data.comments = result.comments
					this.setState({data: data})
				}
			}
		})
	}

	addComment = (e) => {
		this.setState({addCommentState: true})
	}

	handleCloseComment = (e) => {
		this.setState({addCommentState: false})
	}

	handleCommentChange = (e) => {
    	let commentData = Object.assign({}, this.state.commentData)
    	commentData.comment = e.target.value;
    	this.setState({commentData: commentData})
  	}

	saveComment = (e) => {
		let value = {
			task_id: this.props.match.params.id,
			comment: this.state.commentData.comment,
		}

		api.addComment(value)
		.then((result) => {
			if (result.status === 'success') {
				this.setState({addTaskState: false})
				window.location.reload(true);
			}
		})
	}

	deleteComment = (e, id) => {
		let value = {
			id: id,
			active: false
		}

		api.deleteComment(value)
		.then((result) => {
			if (result.status === 'success') {
				window.location.reload(true);
			}
		})
	}

	deleteTask  = () => {
		let value = {
			id: this.props.match.params.id,
			active: false
		}

		api.deleteTask(value)
		.then((result) => {
			if (result.status === 'success') {
				this.props.history.push(`/board/ind/${result.data}`)
			}
		})
	}

	render() {
		let comments
		let addComment = this.addComment
		let deleteComment = this.deleteComment
		let deleteTask = this.deleteTask
		let addCommentState = this.state.addCommentState

		let addCommentSection = (
			<Modal show={addCommentState} onHide={this.handleCloseComment}>
                <Modal.Header closeButton>
                    <Modal.Title>Add a Comment</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Control as="textarea" 
                            	className="formInput" 
                            	placeholder="Comment" 
                            	onChange={this.handleCommentChange}
                                value={this.state.commentData.comment} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.saveComment}>
                        Save
                    </Button>
                    <Button variant="secondary" onClick={this.handleCloseComment}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
		)

		if (this.state.data.comments.length > 0) {
			comments = (
				<div className="leftAlign">
					{this.state.data.comments.map(function(comment){
						let commentId = comment.id
						return (
							<div key={comment.id}>
								<Row>
									<Col className="leftAlign"><Typography use="subtitle1"> {comment.comment}</Typography> - <Typography use="body1"><i><b>{comment.time}</b></i></Typography></Col>
									<Col className="rightAlign"><Button raised danger onClick={(e) => deleteComment(e, commentId)}>Delete</Button></Col>
								</Row>
								<br/>
							</div>	
						)
					})}
				</div>
			)
		}
		else {
			comments = (
				<div className="leftAlign">
					You do not have any comments yet. Please add some.
				</div>
			)
		}
		return(
			<div className="App header">
				<br/>
                <Card className="cardBody">
                    <br/>
                    <Row>
                        <Col>
                        	<h3>Task - {this.state.data.name}</h3>
                        </Col>
                    </Row>
                    <br/>
                </Card>
                <br/>
                <Row>
                	<Col className="leftAlign">
                		<span><Button raised onClick={(e) => addComment(e)}>Add Comment</Button></span>
                	</Col>
                	<Col className="rightAlign">
                		<span><Button outlined onClick={(e) => deleteTask(e)}>Delete Task</Button></span>
                	</Col>
                </Row>
                <br/>
                <br/>
                <div className="leftAlign">
                	<p>
                		<span className="descriptionHead">Description:</span><br/>
                		<span>{this.state.data.desc}</span>
                	</p>
                </div>
                <br/>
                <h5 className="leftAlign">Comment Section:</h5>
                {comments}
                {addCommentSection}
            </div>
		)
	}
}

export default IndividualTask