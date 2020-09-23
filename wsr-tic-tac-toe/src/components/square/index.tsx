import React, { useState } from 'react';
import { st, classes } from '../../app.st.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppState, SquareState } from '../../redux/types';
import {  selectSquare } from '../../redux/actions';

export interface SquareProps {
    id: number;
}
const Square: React.FunctionComponent<SquareProps> = (props: SquareProps) => {
    const turnOrder = useSelector((state: AppState) => state.board.turnOrder);
    const [hovering, setHovering] = useState<string>('');
    const squareState = useSelector((state: AppState) =>
        state.board.squares.find((square: SquareState) => square.id === props.id)
    );
    const dispatch = useDispatch();
    function handleClick(): void {
        if (!squareState!.selected) {
            dispatch(selectSquare(props.id, `${turnOrder.toLowerCase()}`));
        }
    }
    return (
        <div
            className={
                squareState!.selectedBy.length > 0
                    ? st(classes[squareState!.selectedBy])
                    : hovering.length > 0
                    ? st(classes[hovering])
                    : st(classes.square)
            }
            onClick={handleClick}
            onMouseEnter={() =>
                squareState!.selected ? null : setHovering(`${turnOrder.toLowerCase()}-choosing`)
            }
            onMouseLeave={() => setHovering('')}
            id={`${props.id}`}
        ></div>
    );
};
export { Square };
