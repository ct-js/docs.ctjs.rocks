# Subsistema de conteúdo ( editor de conteúdo e ct.content)

O subsistema de conteúdo é um conjunto de procedimentos de edição e exportação que permite que você projete, crie, e use estrutura de dados em seu jogo. Você pode pensar nele como um banco de dados local para o seu projeto, podendo ser usado para projetar, por exemplo, loot drops, níveis e ondas em um jogo tower defence, missões ou diálogos em um RPG, e outras coisas que sejam estruturadas em forma de tabelas.

Subsistema de conteúdo pode armazenar valores simples como números, strings, valores booleanos, e também, referências para os seus assets, como templates e rooms.

Em sua essência, o Subsistema de conteúdo consiste de:

* Editor de tipo de conteúdo que que permite que você projete a sua estrutura de dados;
* O editor de entrada do tipo de conteúdo permite que você crie e altere o seu conteúdo em uma estrutura semelhante a de tabelas;
* Os dados exportados estão disponíveis sob o `ct.content` namespace.

## Planejando os dados

Você pode criar novos tipos de conteúdo na aba Project -> Content type editor.

Cada tipo de conteúdo tem esses campos:

* **O nome do tipo de conteúdo.** Esse é o nome da propriedade que você usará em seu código JS, então pense bem e escreva um nome simples sem espaços. Por exemplo, se você chamar o tipo de conteúdo de `Quests`, então você será capaz de acessá-lo em seu jogo com `ct.content.Quests`.
* **O nome legível.** Se o nome principal não é muito legível, como `BuffsNCurses`, você pode escrever um nome diferente que será exibido na GUI do ct.IDE. Ele não tem nenhum efeito no código que você escreve.
* **Um ícone** que é exibido na UI do ct.IDE.
* **O esquema de contéudo.** Essa é uma lista de todos os campos que cada entrada em seu tipo de conteúdo possui.

O esquema de conteúdo é descrito com uma tebela. cada linha será um campo em um objeto. Semelhante aos tipos de conteúdo, campos também têm um nome regular e um outro legível. Se você chama o seu campo de `title`, então você será capaz de acessar o título da primeira entrada em seu tipo de conteúdo com `ct.content.Quests[0].title`.

Além de um nome, cada campo tem um tipo. Campos podem ter valores simples como strings, números, e valores booleanos, mas eles também podem se referir aos assets em seu projeto: como texturas, templates, sons, emissor de partículas, e rooms. No código, essas referências se tornarão strings — os nomes de seus assets.

Existe também, duas caixas de seleção para cada campo: "Required" e "Array".

* **Required** campos que precisam ser preenchidos, ou eles mostrarão um alerta na UI do ct.IDE.
* Se **Array** estiver ativado, haverá um editor de lista em cada entrada, permitindo que você adicione um número arbitrário de valores.

![An example of a content type with array field](../images/contentEditor_Arrays.png)

Aqui está umm exemplo de um tipo de conteúdo "Gear":

![](../images/contentEditor_SchemaExample.png)

## Editando os dados

Editar é simples — uma vez que você tenha planejado os seus dados, você pode começar a criar entradas para o seu tipo de conteúdo. Para cada tipo de conteúdo que você cria, haverá uma nova seção na aba Project, no painel lateral a esquerda, embaixo das definições de módulos.

![](../images/contentEditor_Tabs.png)

Crie entradas com o botão "Add a row", e preencha a tabela. Note que você pode remover ou adicionar campos caso você precise alterar o esquema, mas note também, que remover os campos a partir do esquema de conteúdo é irreversível.

## Usando os dados

A forma mais simples de explorar o resultado da sua estrutura de dados é escrever `ct.content.TypeName` no console de depuração e expandir os campos:

![](../images/contentEditor_Inspect.png)

Você é livre para usar os dados que você quiser — tudo é apresentado como objetos dentro de array. Se você não sabe como manipular objetos e arrays, leia o nosso [terceiro capítulo de introdução ao JS](jsintro_pt3.html). Provavelmente você também vai precisar [ler sobre loops aqui](jsintro_pt2.html).