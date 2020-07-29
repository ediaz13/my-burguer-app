// const { Component } = require("react");
import React, {Component} from 'react';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner'

const INGREDIENT_PRICES = {
    salad: 1,
    cheese: 2,
    bacon: 2,
    meat: 3
}


class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese:0,
            meat:0
        },  
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients)
          .map(igKey => {
              return ingredients[igKey];
          })
          .reduce((sum, el) => {
              return sum + el;
          }, 0);
          this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];

        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});

    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});

    }

    purchaseContinueHandler = () => {
        // alert('You continue!!');
        this.setState({loading: true});
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
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
                this.setState({loading: false, purchasing: false});
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false});
            });

    }

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSumary = <OrderSummary 
            ingredients= {this.state.ingredients}
            price= {this.state.totalPrice.toFixed(2)}
            purchaseCancelled= {this.purchaseCancelHandler}
            purchaseContinued= {this.purchaseContinueHandler} />;

        if (this.state.loading) {
            orderSumary = <Spinner />

        }

        // {salad: true, meat: false, ...}
        return(
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSumary}                    
                </Modal>
                <Burger ingredients= {this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled = {disabledInfo}
                    purchasable = {this.state.purchasable} 
                    ordered= {this.purchaseHandler}
                    price = {this.state.totalPrice}/>
            </Auxiliary>
        );
    }

}

export default BurgerBuilder;