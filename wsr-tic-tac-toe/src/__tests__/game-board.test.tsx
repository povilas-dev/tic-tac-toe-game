import { InputWithLabelTestkit } from 'wix-style-react/dist/testkit';
import { render } from '@testing-library/react';
import React from 'react';
import { CreateGameModal } from '../components/create-game-modal';

describe('InputWithLabel', () => {
    it('should update the title', async () => {
        // 2. initializing testkits
        const inputDriver = InputWithLabelTestkit({
            wrapper: render(<CreateGameModal />).baseElement,
            dataHook: 'title-changer-input',
        });

        // 3. using testkits
        await inputDriver.enterText('hello world');
        expect(await inputDriver.getValue()).toEqual('hello world');
    });
});
