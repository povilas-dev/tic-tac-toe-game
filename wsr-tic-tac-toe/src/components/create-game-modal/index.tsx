import React, { useState } from 'react';
import { Modal, MessageBoxFunctionalLayout, InputWithLabel, InfoIcon } from 'wix-style-react';
import {
    CONFIRM_TEXT,
    SET_GAME_BOARD_SIZE,
    SET_BOARD_SIZE_DESCRIPTION,
    BOARD_SIZE,
    SET_BOARD_SIZE_INFO_TOOLTIP,
    BOARD_SIZE_MORE_THAN_ZERO,
    BOARD_SIZE_NUMERIC,
    BOARD_SIZE_INPUT,
    CREATE_GAME_MODAL,
    CREATE_GAME_MESSAGE_BOX,
} from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import {
    createBoard,
    generateWinningScenariosAction,
    setIsCreateGameModalVisible,
} from '../../redux/actions';
import { AppState } from '../../redux/types';
export const CreateGameModal: React.FC<{}> = () => {
    const [boardSize, setBoardSize] = useState<string | null>(null);
    const isCreateGameModalVisible = useSelector(
        (state: AppState) => state.createGameModalIsVisible
    );
    const dispatch = useDispatch();
    const numericInputRegexp = /^\d+$/;
    function handleModalConfirmation(): void {
        if (boardSize && parseInt(boardSize) > 0 && numericInputRegexp.test(boardSize)) {
            dispatch(createBoard(parseInt(boardSize)));
            dispatch(generateWinningScenariosAction(parseInt(boardSize)));
            dispatch(setIsCreateGameModalVisible(false));
        }
    }
    return (
        <Modal isOpen={isCreateGameModalVisible} dataHook={CREATE_GAME_MODAL}>
            <MessageBoxFunctionalLayout
                dataHook={CREATE_GAME_MESSAGE_BOX}
                confirmText={CONFIRM_TEXT}
                onOk={() => handleModalConfirmation()}
                onClose={() => dispatch(setIsCreateGameModalVisible(false))}
                title={SET_GAME_BOARD_SIZE}
            >
                <p id="set-board-size-info">{SET_BOARD_SIZE_DESCRIPTION}</p>
                <InputWithLabel
                    onChange={(event) => setBoardSize(event.target.value)}
                    label={BOARD_SIZE}
                    dataHook={BOARD_SIZE_INPUT}
                    suffix={[<InfoIcon content={SET_BOARD_SIZE_INFO_TOOLTIP} />]}
                    status={
                        (boardSize && parseInt(boardSize) === 0) ||
                        (boardSize && !numericInputRegexp.test(boardSize))
                            ? 'error'
                            : undefined
                    }
                    statusMessage={
                        boardSize
                            ? parseInt(boardSize) === 0
                                ? BOARD_SIZE_MORE_THAN_ZERO
                                : numericInputRegexp.test(boardSize)
                                ? undefined
                                : BOARD_SIZE_NUMERIC
                            : undefined
                    }
                />
            </MessageBoxFunctionalLayout>
        </Modal>
    );
};
