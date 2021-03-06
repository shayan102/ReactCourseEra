import React, { Component } from 'react';
import {
    Card, CardImg, CardBody, CardTitle, CardText, Breadcrumb, BreadcrumbItem,
    Modal, ModalBody, ModalHeader, Button,
    Row, Col, Label
} from 'reactstrap';
import { LocalForm, Errors, Control } from 'react-redux-form'
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


function RenderDish({ dish }) {
    return (
        <div>
            <FadeTransform in
                transformProps={{
                    exitTransform: 'scale:(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        </div>
    );
}

function RenderComments({ comments, postComment, dishId }) {
    if (comments != null)
        return (
            <div>
                <h4>Comments</h4>
                <ul className="list-unstyled">
                    <Stagger in >
                        < Fade in >
                            {comments.map((comment) => {
                                return (
                                    <li key={comment.id}>
                                        <p>{comment.comment}</p>
                                        <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', {
                                            year: 'numeric', month: 'short',
                                            day: '2-digit'
                                        }).format(new Date(Date.parse(comment.date)))}</p>
                                    </li>
                                );
                            })}
                        </ Fade>
                    </Stagger>
                </ul>
                < CommentForm dishId={dishId} postComment={postComment} />
            </div>
        );
    else return (
        <div></div>
    );
}


export class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.toggleModal = this.toggleModal.bind(this);
    }
    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"
                ></span>
                       Submit Comment
                </Button>


                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label md={12}> Rating </Label>
                                <Col md={12}>
                                    <Control.select model='.rating' name='rating'
                                        className='form-control'>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor='username' md={12}> Your Name </Label>
                                <Col md={12}>
                                    <Control.text model='.username' name='username'
                                        id='username' placeholder='Your Name'
                                        className='form-control'
                                        validators={{
                                            minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors
                                        className='text-danger'
                                        model='.username'
                                        show='touched'
                                        messages={{
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be less than 15 characters'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className='from-group'>
                                <Label htmlFor='commnent' md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model='.comment' id='comment'
                                        name='comment' placeholder='Write Your Comment'
                                        rows={6}
                                        className='form-control'
                                    />
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col md={{ size: 4 }}>
                                    <Button type='submit' color='primary' className='mt-2'>Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}


const DishDetail = (props) => {
    if (props.isLoading) {
        return (
            <div className='container'>
                <div className='row'>
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return (
            <div className='container'>
                <div className='row'>
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null)
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu' >Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active> {props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row row-content">
                    <div className="col-12 col-md">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md">
                        <RenderComments comments={props.comments}
                            postComment={props.postComment}
                            dishId={props.dish.id}
                        />
                    </div>
                </div>
            </div >
        );
    else return (
        <div></div>
    );
}

export default DishDetail;