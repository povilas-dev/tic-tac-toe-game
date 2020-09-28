import React, { useState } from 'react';
import { st, classes } from '../../app.st.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppState, SquareState, GAME_STATE } from '../../redux/types';
import { selectSquare } from '../../redux/actions';

export interface SquareProps {
    id: number;
}
const Square: React.FunctionComponent<SquareProps> = (props: SquareProps) => {
    const turnOrder = useSelector((state: AppState) => state.board.turnOrder); // shouldn't I be able to do: useSelector((state: BoardState) => state.turnOrder); here ?
    const gameState = useSelector((state: AppState) => state.board.gameState);
    const [hovering, setHovering] = useState<string | null>(null);
    const squareState = useSelector((state: AppState) =>
        state.board.squares.find((square: SquareState) => square.id === props.id)
    );
    const dispatch = useDispatch();
    function handleClick(): void {
        if (!squareState!.selectedBy && gameState === GAME_STATE.ONGOING) {
            dispatch(selectSquare(props.id, `${turnOrder.toLowerCase()}`));
        }
    }
    return squareState !== undefined ? (
        <div
            aria-label={
                squareState.selectedBy === null
                    ? hovering
                        ? hovering
                        : "square"
                    : squareState.selectedBy
            }
            className={
                squareState.selectedBy === null
                    ? hovering
                        ? st(classes[hovering])
                        : st(classes.square)
                    : st(classes[squareState.selectedBy])
            }
            onClick={handleClick}
            onMouseEnter={() =>
                squareState.selectedBy ? null : setHovering(`${turnOrder.toLowerCase()}-choosing`)
            }
            onMouseLeave={() => setHovering(null)}
            id={`${props.id}`}
        ></div>
    ) : null;
};
export { Square };
