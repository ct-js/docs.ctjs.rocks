# Sons não tocam no carregamento inicial em certas (ou "completamente aleatórias") condições

Você pode notar que músicas ou efeitos de som não toca no carregamento inicial as vezes. Isso acontece por causa do comportamento dos navegadores: Eles não permitem que o você toque um som sem que exista uma interação do usuário com o jogo. Mover o ponteiro do mouse sobre o jogo parece ser suficiente, mas em alguns casos isso simplesmente não funciona. Isso não é um problema específico do ct.js e também não é algo que ele pode simplesmente mudar. Mas existem várias alternativas confiáveis de tocar o som:

- Crie uma tela de início, splash screen, com o seu logotipo ou algo do tipo;
- Crie uma room de início em que o jogador pode ativar o som ou não;
- No itch.io, selecione"Click to launch in fullscreen" nas opções de incorporação do seu projeto;
- Adicione qualquer coisa que precise de interação antes que o seu jogo comece de verdade :)
