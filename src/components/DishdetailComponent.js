import React, { Component } from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';
import { render } from '@testing-library/react';

class DishDetail extends Component {
    constructor(props) {
        super(props);

    }
    renderComments = () => {
        const comments = this.props.dish.comments.map((comm) => {
            if (comm != null)
                return (
                    <div key={comm.id}>
                        <p>
                            <li>{comm.comment}</li></p>
                        <p>
                            <li>-{comm.author}{comm.date}</li></p>
                    </div>
                );
        });
        return comments;
    }

    render() {
        return (
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg top src={this.props.dish.image} alt={this.props.dish.name} />
                        <CardBody>
                            <CardTitle>{this.props.dish.name}</CardTitle>
                            <CardText>{this.props.dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>

                <div className="col-12 col-md-5 m-1 float-right">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {this.renderComments()}
                    </ul>
                </div>

            </div>
        )
    };
}
export default DishDetail;