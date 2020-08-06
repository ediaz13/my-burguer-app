import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.module.css';
import Axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        // console.log(this.props.ingredients);
        this.setState({loading: true});
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Emanuelo',
                address: {
                    street: 'Libertad',
                    zipCode: '1012',
                    country: 'Argentina'
                },
                email: 'test@gmail.com'
            },
            deliveryMethod: 'fastest'
        }

        Axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false });
                this.props.history.push('/');
            })
            .catch(error => {
                this.setState({loading: false});
            });
    }

    render () {
        let form = (
            <form>
                <Input inputType="input" type="text" name="name" placeholder="Your name"/>
                <Input inputType="input" type="email" name="email" placeholder="Your email"/>
                <Input inputType="input" type="text" name="street" placeholder="Your street"/>
                <Input inputType="input" type="text" name="postal" placeholder="Your postal code"/>
                <Button btnType='Success' clicked= {this.orderHandler}>ORDER NOW</Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className= {classes.ContactData}>
                <h4>Enter your contact data son!</h4>
                {form}                
            </div>
        );
    }
}

export default ContactData;