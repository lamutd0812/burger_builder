import React, { useState, useEffect, useCallback } from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSumary from '../../components/Burger/OrderSumary/OrderSumary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../../store/actions/index';


const BurgerBuilder = props => {
    const [purchasing, setPurchasing] = useState(false);
    
    const ings = useSelector(state => state.burgerBuilder.ingredients);
    const price = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuthenticated = useSelector(state => state.auth.token !== null);

    const dispatch = useDispatch();
    
    const onIngredientAdded = ingName => dispatch(actionCreators.addIngredient(ingName));
    const onIngredientRemoved = ingName => dispatch(actionCreators.removeIngredient(ingName));
    const onInitIngredients = useCallback(() =>
        dispatch(actionCreators.initIngredients()), [dispatch]);
    const onInitPurchase = () => dispatch(actionCreators.purchaseInit());
    const onSetAuthRedirectPath = path => dispatch(actionCreators.setAuthRedirectPath(path));

    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    //#region Handler
    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        //this.setState({purschasable: true ? sum>0 : false}); //true if sum>0
        return sum > 0;
    }

    const purchaseHandler = () => {
        if (isAuthenticated) {
            setPurchasing(true);
        }
        else {
            onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        }
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        onInitPurchase(); // init purchase when click continue to checkout
        props.history.push('/checkout');
    }
    //#endregion


    const disabledInfo = {
        ...ings
    };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0; //(ex: {salad: true, meat:false,...})
    }

    let burger = error ? <p>Ingredients can't be loaded!</p> : <Spinner />;
    let orderSumary = null;
    if (ings) {
        burger = (
            <Aux>
                <Burger ingredients={ings} />
                <BuildControls
                    ingredientAdded={onIngredientAdded}
                    ingredientRemoved={onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={updatePurchaseState(ings)}
                    ordered={purchaseHandler}
                    price={price}
                    isAuth={isAuthenticated} />
            </Aux>);

        orderSumary = <OrderSumary
            ingredients={ings}
            price={price}
            purchaseCancel={purchaseCancelHandler}
            purchaseContinue={purchaseContinueHandler} />
    }

    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSumary}
            </Modal>
            {burger}
        </Aux>
    );
}

export default withErrorHandler(BurgerBuilder, axios);