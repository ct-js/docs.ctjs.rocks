# Conceitos básicos

**Ct.js** é uma ferramenta modular escrita em JavaScript, com um editor visual embutido. O editor também é chamado como **ct.IDE**. Os jogos criados com o ct.js também são escritos em JavaScript: ela é uma linguagem de programação para a web, é flexível, fácil de aprender, e infinitamente profunda com muitos recursos que você pode usar.

Qualquer jogo em ct.js consites de **texturas**, **copies**, **templates**, and **rooms**.

* Uma **textura** é uma imagem que sozinha não faz muita coisa, mas ela é usada pelas copies e lá, podemos renderizar e fornecer comportamentos por código. Esse asset também é sinômio de sprite, mas ele também pode ser um tileset, um background, etc.
* Uma **copy** é uma entidade lógica em seu jogo que pode interagir com as entradas do usuário bem como com outras copies. Inimigos, árvores, balas, gemas, bônus, gatos — tudo isso é uma copy. As copies normalmente são chamadas de *"objetos"*, *"atores"* ou *"instâncias"* em outros motores de jogos.
* Cada copy corresponde a um **template** específico. Um **template** é um modelo para novas copies com definições e comportamentos comuns. Em outros motores de jogos, o template pode ser chamado de *classe* ou de *objeto*.
* Uma **room** é um espaço 2D em seu jogo onde você põe as suas copies. Rooms pode ter os seus próprios comportamentos adicionais (scripts de nível). Rooms normalmente são chamadas de *fases* ou *mapas*. Uma diferença notável é que as rooms em ct.js são ilimitadas, bem diferente de outros motores 2D que tende a determinar um tamanho específico.

Existem recursos adicionais que ajudam a tornar os jogos mais interessantes, melhores, devertidos de jogar e mais fáceis de desenvolver:

* [**Ações**](actions.html) que combinam diferente métodos de entrada em uma API, o que te permite codificar apenas uma vez para teclados, gamepads, joysticks virtuais e outras coisas.
* **Catmods** são módulos adicionais que vão dentro da biblioteca principal, adicionando novas ferramentas para a programação e novos recursos ao motor de jogos.
* **Fontes personalizadas** permite que você use arquivos .ttf em seus jogos, para que assim ele tenha uma aparência e um destaque melhor em cada navegador ou computador.
* **Emissor de partículas,** ou simplesmente sistema de partículas, são efeitos visuais flexíveis feitos de texturas. Explosões, efeitos mágicos, chuva, neve e muitos outros efeitos especiais podem ser criados com ele.
* [**Animações por ossos**](skeletal-animation.html) para personagens que precisam de animações mais suaves.
* **Sons** são recursos de áudio que são tocados via código.
* **Estilos** são modelos para renderizar rótulos que são usados durante a criação da interface de usuário.