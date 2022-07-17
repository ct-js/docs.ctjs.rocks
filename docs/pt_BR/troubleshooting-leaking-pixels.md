# Ao redimensionar copies ou partículas surge pixels extras no jogo em ct.js! O que eu devo fazer?

Você pode notar pixels extras em suas texturas, especialmente ao utilizar texturas redimensionadas. É particularmente comum para o sistema de partículas. Esse efeito ou defeito pode ser sutil ou exagerado, dependendo apenas de como você usa as suas texturas e de como as mesmas foram empacotadas para um jogo.

Aqui está um exemplo de como ele pode se parecer no sistema de partículas (observe a linha vertical escura — não era para elas estarem presentes):

![](./../images/ts_LeakingPixels_bad.png)

Isso pode ser resolvido apenas aumentando o preenchimento da textura afetada em alguns pixels. Abra a textura e encontre o campo "Padding":

![](./../images/ts_LeakingPixels_solution.png)

Você pode precisar definir o valor para ele em apenas uns 2 pixels (em meu caso, isso foi suficiente), mas, quanto maior for o redimensionamento da textura, maior será o valor de preenchimento necessário. Ainda assim, tente utilizar o menor valor necessário, pois valores muito grandes podem aumentar a quantidade de texture atlas em seu jogo, o que afeta o desempenho se usado em excesso.

![](./../images/ts_LeakingPixels_good.png)

Note que se você tiver algum problema com os backgrounds(planos de fundo), você certamente terá um problema diferente, o qual é [descrito aqui](troubleshooting-teared-background.html).