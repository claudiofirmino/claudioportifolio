PLAYER DO YOUTUBE - ERRO 153

O erro 153 aparece quando o index.html é aberto diretamente do computador (file://),
porque o YouTube exige que o player incorporado receba um HTTP Referer.

PARA TESTAR NO MAC:
1. Dê dois cliques em ABRIR_SITE.command
2. O navegador abrirá http://localhost:8000/index.html
3. O vídeo do YouTube será reproduzido dentro do site.

Se o macOS bloquear o arquivo:
- botão direito > Abrir > Abrir

PARA TESTAR NO WINDOWS:
1. Dê dois cliques em ABRIR_SITE_WINDOWS.bat
2. O navegador abrirá o site em localhost.

NO SITE PUBLICADO:
Quando a pasta for publicada em uma hospedagem HTTP/HTTPS (domínio, Netlify, Vercel,
GitHub Pages, servidor próprio etc.), não é necessário usar esses arquivos. O navegador
envia o Referer normalmente e o player fica incorporado dentro do site.

Horizontal 01:
https://www.youtube.com/watch?v=SE4KOesGBLQ&t=39s
