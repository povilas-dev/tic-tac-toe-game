import {
    ButtonTestkit,
    ModalTestkit,
    InputWithLabelTestkit,
    HeadingTestkit,
} from 'wix-style-react/dist/testkit';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import {
    CREATE_GAME_BUTTON,
    CREATE_GAME_MODAL,
    BOARD_SIZE_INPUT,
    BOARD_SIZE_NUMERIC,
    BOARD_SIZE_MORE_THAN_ZERO,
    TURN_ORDER_HEADING,
    RESET_GAME_BUTTON,
} from '../constants';
import { App } from '../app';
import { createBoard, generateWinningScenariosAction } from '../redux/actions';

describe('App', () => {
    let wrapper: HTMLElement;

    // before each test, set initial store state
    beforeEach(() => {
        wrapper = render(
            <Provider store={store}>
                <App />
            </Provider>
        ).baseElement;
    });
    it('should oppen modal after clicking create game button', async () => {
        const buttonDriver = ButtonTestkit({
            wrapper: wrapper,
            dataHook: CREATE_GAME_BUTTON,
        });

        const modalDriver = ModalTestkit({
            wrapper: wrapper,
            dataHook: CREATE_GAME_MODAL,
        });

        await buttonDriver.click();
        expect(await modalDriver.isOpen()).toBeTruthy();
    });

    it('should show an error for alphabetical values in the input field when input is "abc"', async () => {
        const buttonDriver = ButtonTestkit({
            wrapper: wrapper,
            dataHook: CREATE_GAME_BUTTON,
        });

        await buttonDriver.click();
        const inputDriver = InputWithLabelTestkit({ wrapper: wrapper, dataHook: BOARD_SIZE_INPUT });

        await inputDriver.enterText('abc');
        expect(await inputDriver.getErrorMessage()).toEqual(BOARD_SIZE_NUMERIC);
    });

    it('should show an error in the input field if board size: 0', async () => {
        const buttonDriver = ButtonTestkit({
            wrapper: wrapper,
            dataHook: CREATE_GAME_BUTTON,
        });

        await buttonDriver.click();
        const inputDriver = InputWithLabelTestkit({ wrapper: wrapper, dataHook: BOARD_SIZE_INPUT });

        await inputDriver.enterText('0');
        expect(await inputDriver.getErrorMessage()).toEqual(BOARD_SIZE_MORE_THAN_ZERO);
    });
});

describe('GameBoard', () => {
    let wrapper: HTMLElement;
    // before each test, set initial store state with boardSize: 2
    beforeEach(() => {
        store.dispatch(createBoard(2));
        store.dispatch(generateWinningScenariosAction(2));
        wrapper = render(
            <Provider store={store}>
                <App />
            </Provider>
        ).baseElement;
    });

    it('should reset all squares after clicking reset game button', async () => {
        // click a square, so the state would change from initial state
        let squareElements = screen.getAllByLabelText('square');
        squareElements[0].click();
        const resetGameButtonDriver = ButtonTestkit({
            wrapper: wrapper,
            dataHook: RESET_GAME_BUTTON,
        });

        // click reset button to reset game state
        await resetGameButtonDriver.click();

        // only gets squares which are unclicked
        const turnOrderHeadingDriver = HeadingTestkit({
            wrapper,
            dataHook: TURN_ORDER_HEADING,
        });
        expect((await turnOrderHeadingDriver.getText()) === "Player1's turn").toBeTruthy();
        expect(screen.getAllByLabelText('square').length).toEqual(4);
    });

    it('should show "Player1\'s turn" after creating a game with boardSize: 2', async () => {
        const turnOrderHeadingDriver = HeadingTestkit({
            wrapper,
            dataHook: TURN_ORDER_HEADING,
        });
        expect(await turnOrderHeadingDriver.exists()).toBeTruthy();
        expect(await turnOrderHeadingDriver.getText()).toEqual("Player1's turn");
    });

    it('should show "Reset game" button after creating a game with boardSize: 2', async () => {
        const resetGameButtonDriver = ButtonTestkit({
            wrapper: wrapper,
            dataHook: RESET_GAME_BUTTON,
        });
        expect(await resetGameButtonDriver.exists()).toBeTruthy();
    });

    it('should show ONLY 4 squares after creating a game with boardSize: 2', async () => {
        expect(screen.getAllByLabelText('square').length).toEqual(4);
    });

    it('should change turn order after clicking a square', async () => {
        let squareElements = screen.getAllByLabelText('square');
        squareElements[0].click();
        const turnOrderHeadingDriver = HeadingTestkit({
            wrapper,
            dataHook: TURN_ORDER_HEADING,
        });
        expect(await turnOrderHeadingDriver.exists()).toBeTruthy();
        expect(await turnOrderHeadingDriver.getText()).toEqual("Player2's turn");
    });

    it('should change square to player1 after clicking it', async () => {
        let squareElements = screen.getAllByLabelText('square');
        squareElements[0].click();
        expect(screen.getAllByLabelText('square').length).toEqual(3);
        let selectedSquares = screen.getAllByLabelText('player1');
        expect(selectedSquares.length).toEqual(1);
    });
});
