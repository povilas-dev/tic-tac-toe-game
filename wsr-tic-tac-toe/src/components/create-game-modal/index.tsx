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
} from '../../constants';
import { useDispatch } from 'react-redux';
import { createBoard, generateWinningScenariosAction } from '../../redux/actions';
export interface ModalProps {
    isVisible: boolean;
    setIsModalVisible: (isModalVisible: boolean) => void;
}
export const CreateGameModal: React.FC<ModalProps> = (props: ModalProps) => {
    const [boardSize, setBoardSize] = useState<string | null>(null);
    const dispatch = useDispatch();
    const numericInputRegexp = /^\d+$/;
    function handleModalConfirmation(): void {
        if (boardSize && parseInt(boardSize) > 0 && numericInputRegexp.test(boardSize)) {
            dispatch(createBoard(parseInt(boardSize)));
            dispatch(generateWinningScenariosAction(parseInt(boardSize)));
            props.setIsModalVisible(false);
        }
    }
    return (
        <Modal isOpen={props.isVisible}>
            <MessageBoxFunctionalLayout
                confirmText={CONFIRM_TEXT}
                onOk={() => handleModalConfirmation()}
                onClose={() => props.setIsModalVisible(false)}
                title={SET_GAME_BOARD_SIZE}
            >
                <p id="set-board-size-info">{SET_BOARD_SIZE_DESCRIPTION}</p>
                <InputWithLabel
                    onChange={(event) => setBoardSize(event.target.value)}
                    label={BOARD_SIZE}
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
