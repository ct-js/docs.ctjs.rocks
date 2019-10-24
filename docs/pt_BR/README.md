# Olá!

Prazer em conhecer você! Aqui você encontrará toda a documentação e tutorial oficial para o ct.js.

ct.js (`ct` é lido como `kΛtæ`) é um framework e editor de jogos destinado para a criação de jogos 2D. Ele é baseado em tecnologias web e suporta um monte de plataformas. O framework foi desenhado para ser modular, o que permite a criação de módulos adicionais para expandir as possibilidades e para um processo de desenvolvimento mais fácil.

## Por onde iniciar?

Comece por um dos nossos tutoriais. Eles te ensinarão como usar o ct.js, como a biblioteca funciona, como criar as características básica de um jogo e muito mais. E então veja os exemplos disponíveis na pasta `ctjs/examples` e observe como os projetos mais sérios são feitos.

Use essa documentação sempre que quiser a partir do painel lateral do ct.js e aprenda a sua biblioteca principal.

Alguns módulos adicionais são vitais para a criação de um bom jogo. Você precisará aprender como usar essas bibliotecas como `ct.place` e `ct.keyboard`. Cada módulo tem a sua própria documentação de referência dentro do ct.js na aba "Catmods". `ct.place` e `ct.keyboard` também são frequentemente utilizados em nossos tutoriais, e eles são bons para mostrar como usar essas bibliotecas.

Se você tiver alguma dificuldade, crie um tópico em [nosso fórum ct.js](https://comigo.itch.io/ct/community) para que outras pessoas possam te ajudar.

## Conceitos básicos

* **Ct.js** é uma biblioteca modular escrita em JavaScript e com um editor visual. Esse editor visual também é referenciado como **ct.IDE**.
* Esses módulos são combinados em um game engine básico. Esses módulos funcionam com entradas de mouse, desenhando objetos, com rooms e com o carregamento de imagens e sons. Eles existem em cada jogo e referenciados como **A biblioteca principal**.
* Existem **módulos adicionais** que complementam a biblioteca principal, adicionando novas ferramentas de desenvolvimento e novas funcionalidades ao game engine.

Os jogos em ct.js são escritos em JavaScript. Ela é uma linguagem de programação flexível e de tipagem fraca, não precisa especificar o tipo das variáveis, para a web.

Qualquer jogo em ct.js consiste de **assets gráficos**, **sons**, **estilos**, **types**, e **rooms**.

* Um **asset gráfico**  é uma imagem que não faz muito por si só, mas ela é usada pelas copies e podem ser desenhadas usando código. Esse asset também é referenciado como um sprite, mas ele também pode ser um tileset, uma background, etc.
* Uma **copy** é uma entidade lógica em seu jogo que pode interagir com as entradas do usuário e com outras copies. Inimigos, árvores, balas, gemas, bônus, gatos, todas essas coisas é uma copy. Copies são frequentemente chamadas de *"objetos"*, *"atores"* ou *"instâncias"* em outras game engines.
* Cada copy é de um **type** específico. Um **type** é um modelo para as novas copies com configurações e comportamentos em comum. Ele pode ser chamado de uma *classe* ou de *objeto* em outras engines.
* Uma **room** é um espaço 2D onde você coloca as suas copies. Rooms podem ter o seus próprios comportamentos adicionais (level scripts). Rooms tmabém são frequentemente associadas a *levels* ou *maps*. Uma notável diferença é que rooms em ct.js são de tamanhos ilimitados, enquanto que outras engines 2D tende a especificar um tamanho.
* **Estilos** são modelos de desenho para serem usados enquanto se cria a interface de usuário.
* **Sons** são audios que podem ser tocados via código.
