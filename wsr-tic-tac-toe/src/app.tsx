import React, { useState, useEffect } from 'react';
import { st, classes } from './app.st.css';
import { Button, Modal, MessageBoxFunctionalLayout } from 'wix-style-react';
import { InfoIcon } from 'wix-style-react';
import {
    CREATE_GAME_BOARD,
    SET_GAME_BOARD_SIZE,
    BOARD_SIZE,
    SET_BOARD_SIZE_DESCRIPTION,
    CONFIRM_TEXT,
    SET_BOARD_SIZE_INFO_TOOLTIP,
} from './constants';
import { InputWithLabel } from 'wix-style-react';
import {
    createBoard,
    generateWinningConditions,
    removeBoard,
    setGameState,
} from './redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { GameBoard } from './components/game-board';
import { AppState, SquareState, GAME_STATE } from './redux/types';

export interface AppProps {
    className?: string;
}

export const App: React.FC<AppProps> = ({ className }) => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [boardSize, setBoardSize] = useState<number>(0);
    const turnOrder = useSelector((state: AppState) => state.board.turnOrder);
    const winningScenarios = useSelector((state: AppState) => state.winningScenarios);
    const boardCreated = useSelector((state: AppState) => state.board.created);
    const squares = useSelector((state: AppState) => state.board.squares);
    const dispatch = useDispatch();
    useEffect(() => {
        if (boardCreated) checkIfPlayerWon();
    }, [turnOrder]);
    function checkIfPlayerWon() {
        let result: boolean = false;
        let player1Selected = squares
            .filter((el: SquareState) => el.selectedBy === 'player1')
            .map((el: SquareState) => {
                return el.id;
            });
        let player2Selected = squares
            .filter((el: SquareState) => el.selectedBy === 'player2')
            .map((el: SquareState) => {
                return el.id;
            });
        winningScenarios.forEach((winningScenario: Array<number>) => {
            if (winningScenario.every((el: number) => player1Selected.includes(el))) {
                dispatch(setGameState(GAME_STATE.PLAYER1_WON));
            }
            if (winningScenario.every((el: number) => player2Selected.includes(el))) {
                dispatch(setGameState(GAME_STATE.PLAYER2_WON));
            }
        });
        return result;
    }
    function handleModalConfirmation(): void {
        setIsModalVisible(false);
        if (boardCreated) {
            dispatch(removeBoard());
        }
        dispatch(createBoard(boardSize));
        dispatch(generateWinningConditions(boardSize));
    }
    return (
        <main className={st(classes.root, className)}>
            <Button
                onClick={() => setIsModalVisible(!isModalVisible)}
                className={'create-game-button'}
            >
                {CREATE_GAME_BOARD}
            </Button>
            <Modal isOpen={isModalVisible}>
                <MessageBoxFunctionalLayout
                    confirmText={CONFIRM_TEXT}
                    onOk={() => handleModalConfirmation()}
                    onClose={() => setIsModalVisible(false)}
                    title={SET_GAME_BOARD_SIZE}
                >
                    <p id="set-board-size-info">{SET_BOARD_SIZE_DESCRIPTION}</p>
                    <InputWithLabel
                        onChange={(event) => setBoardSize(parseInt(event.target.value))}
                        label={BOARD_SIZE}
                        type="number"
                        suffix={[<InfoIcon content={SET_BOARD_SIZE_INFO_TOOLTIP} />]}
                    />
                </MessageBoxFunctionalLayout>
            </Modal>
            <GameBoard />
        </main>
    );
};
