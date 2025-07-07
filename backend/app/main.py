import chess
from fastapi import FastAPI
from pydantic import BaseModel
from engine import alpha_beta_minimax

app = FastAPI()

class Move(BaseModel):
    move: str
    from_square: int
    to_square: int
    is_capture: bool
    promotion: str

class MoveResponse(BaseModel):
    computer_move: Move
    new_legal_moves: list[str]

@app.post("/")
async def make_move(board_fen: str, max_depth: int):
    board = chess.Board(board_fen)
    computer_move = alpha_beta_minimax(board, 0, max_depth)
    
    isCapture = board.is_capture(computer_move)
    promotionPiece = computer_move.promotion.piece_name if computer_move.promotion else "None"
    
    board.push(computer_move)

    new_moves = [str(move) for move in board.legal_moves]

    return MoveResponse(computer_move=
                        Move(
                             move=str(computer_move),
                             from_square=computer_move.from_square,
                             to_square=computer_move.to_square,
                             is_capture=isCapture,
                             promotion=promotionPiece
                             ),
                        new_legal_moves=new_moves)
