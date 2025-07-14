export async function fetchLegalMoves(fen: string): Promise<string[]> {
  const response = await fetch("http://localhost:8000/legal_moves", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({board_fen: fen }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Server error:", response.status, errorText);
    throw new Error("Failed to fetch legal moves");
  }

  const data = await response.json();
  return data.new_legal_moves;
}

export async function fetchComputerMove(fen: string, depth: number) {
  const response = await fetch("http://localhost:8000/make_move", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({board_fen: fen, max_depth: depth}),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Server error:", response.status, errorText);
    throw new Error("Failed to fetch computer moves");
  }

  const data = await response.json();
  return data.move;
}