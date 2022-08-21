# Criando o seu próprio módulo de som

O núcleo do ct.js não fornece mais um sistema de som integrado. Desde a v2, que o desenvolvedor de jogos é obrigado a habilitar um dos módulos de som para que os sons funcionem, caso contrário o `ct.res` lançará um erro se houver sons no projeto.

Se você quiser criar o seu próprio sistema de som, você precisa saber quando que o jogo inicia, `ct.res` espera encontra um método `ct.sound.init`, e esse método é chamado com três parâmetros:

1) O nome do som como definido no ct.IDE (uma string);
2) Um objeto com três propriedades mostrando quais os formatos foram fornecidos:
    * `wav` — o caminho relativo para o arquivo de som WAV, se houver algum.
    * `mp3` — o mesmo que o primeiro, mas para arquivos MP3.
    * `ogg` — o mesmo que o primeiro, mas para arquivos OGG.
3) Propriedades adicionais dentro de um objeto:
    * `poolSize` — o número máximos de sons tacados juntos.
    * `isMusic` — se o som foi ou não marcado como um arquivo de música no ct.IDE. Você pode adicionar alguma heurística baseada nesse valor, como carregar o arquivos de música lentamente para agilizar o processo de carregamento do projeto.
