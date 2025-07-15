import chess
from fastapi import FastAPI
from fastapi import HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from engine import alpha_beta_minimax

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"], # add production domain here once deployed
    allow_credentials=True,           
    allow_methods=["*"],              
    allow_headers=["*"],              
)

class MakeMoveRequest(BaseModel):
    board_fen: str
    max_depth: int

class MakeMoveResponse(BaseModel):
    move: str

class LegalMoveRequest(BaseModel):
    board_fen: str

class LegalMoveResponse(BaseModel):
    new_legal_moves: list[str]

@app.post("/make_move", response_model=MakeMoveResponse)
async def make_move(req: MakeMoveRequest):
    try:
        board = chess.Board(req.board_fen)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid FEN")
    
    computer_move = str(alpha_beta_minimax(board, 0, int(req.max_depth)))
    
    return MakeMoveResponse(move=computer_move)

@app.post("/legal_moves", response_model=LegalMoveResponse)
async def legal_moves(req: LegalMoveRequest):
    try:
        board = chess.Board(req.board_fen)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid FEN")
    
    legal_moves = list(board.legal_moves)
    uci_moves = [str(move.uci()) for move in legal_moves]
    return LegalMoveResponse(new_legal_moves=uci_moves)