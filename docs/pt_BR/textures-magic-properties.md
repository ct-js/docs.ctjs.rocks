# Simplifique a importação de texturas com números mágicos

Ct.js tem um pouco de heurística que ajuda a importar grupos de assets de uma só vez.

Primeiro, ele chama um asset pelo nome base do arquivo importado. Por exemplo, se você tem um arquivo chamado de `Player_Walk.png`, então o asset será renomeado para `Player_Walk`. Se você nomear corretamente os seus arquivos, você não terá que renomeá-los no ct.js.

Segundo, você pode adicionar sufixos mágicos ao nome do arquivo para dividi-los automaticamente em frames. Existem duas variantes:

* `Name_NxM.format`, por exemplo, `Asteroid_3x2.png`, `Player_Running_8x1.png`. Aqui, `N` é o número de colunas, e `M` é o número de linhas. `Player_Running_8x1.png` se transformará em, `Player_Running` dividido em 8 colunas e uma linha.
* `Name_NxM@U.format`, por exemplo, `SmokeParticles_3x2@5.png`, `Player_Girl_8x5@37.png`. Aqui `U` significa o número de frames utilizados pelo ct.js, o que é útil para grids(grades) grandes que não são 100% preenchidas com frames ou tiles. `Player_Girl_8x5@37.png` será importado como um sprite dividido em 8 colunas, 5 linhas e usará um total de 37. Sem o último parâmetro, seria utilizado todos os 40 frames, sendo que os 3 últimos poderiam está vazios.