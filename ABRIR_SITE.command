#!/bin/bash
cd "$(dirname "$0")"
PORT=8000
URL="http://localhost:${PORT}/index.html"

# Open the browser shortly after the server starts.
(sleep 1; open "$URL") &

if command -v python3 >/dev/null 2>&1; then
  python3 -m http.server "$PORT"
elif command -v python >/dev/null 2>&1; then
  python -m http.server "$PORT"
else
  echo "Python não foi encontrado. Instale o Python 3 ou publique o site em uma hospedagem HTTP/HTTPS."
  read -n 1 -s -r -p "Pressione qualquer tecla para fechar..."
fi
