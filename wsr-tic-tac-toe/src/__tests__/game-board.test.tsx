import { ButtonTestkit, ModalTestkit } from 'wix-style-react/dist/testkit';
import { render } from '@testing-library/react';
import React from 'react';
// import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { CREATE_GAME_BUTTON, CREATE_GAME_MODAL } from '../constants';
import { App } from '../app';

describe('App', () => {
    let wrapper = render(
        <Provider store={store}>
            <App />
        </Provider>
    ).baseElement;
    it('create game button should open modal', async () => {
        // 2. initializing testkits
        // const inputDriver = InputWithLabelTestkit({
        //     wrapper: wrapper,
        //     dataHook: BOARD_SIZE_INPUT,
        // });

        const buttonDriver = ButtonTestkit({
            wrapper: wrapper,
            dataHook: CREATE_GAME_BUTTON,
        });

        const modalDriver = ModalTestkit({
            wrapper: wrapper,
            dataHook: CREATE_GAME_MODAL,
        });

        await buttonDriver.click();
        console.log(`Modal is open ? ${await modalDriver.isOpen()}`);
        expect(await modalDriver.isOpen()).toBeTruthy();

        // // 3. using testkits
        // await inputDriver.enterText('hello world');
        // expect(await inputDriver.getValue()).toEqual('hello world');
    });
});
