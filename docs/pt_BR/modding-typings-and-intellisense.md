# Adicionando definições de tipos e autocompletação de código aos seus módulos

A partir da versão 1.2., o ct.js agora suporta a adição de definições de tipo para catmods. Com eles, você pode fornecer verificações de tipo ao vivo, autocompletação de código e documentação avançada quando os usuários passam o mouse sobre os nomes de seus métodos.

Ct.js procurará pelo arquivo `types.d.ts` no diretório raiz do seu módulo. Por exemplo, `ct.place`, `ct.mouse`, e `ct.sound.howler` todos eles tem. `types.d.ts` é um [arquivdo de declarção TypeScript](https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html),um arquivo especial do tipo manifesto que informa quais métodos e variáveis ​​seu módulo está fornecendo. Por favor veja a [documentação TypeScript](https://www.typescriptlang.org/docs/home.html) para maiores informações.

Por si só, um arquivo de declaração pode apenas fornecer verificações de tipo e uma lista de autocompletação. Com [anotações no estilo JSDoc](https://jsdoc.app/) e comentários markdown, você pode obter uma documentação rica diretamente no editor.

## Exemplo: descrevendo um módulo

um arquivo `types.d.ts` para um módulo imaginário chamado `sosiska` seria algo assim:

```typescript
declare namespace ct {
    /**
     * Um módulo para assar salsichas dentro do seu jogo.
     */
    namespace sausage {
        /* Aqui vai todos os métodos e propriedades */

        /**
         * Assa sua copy, adicionando uma crosta crocante
         * @param {Copy} me A copy que precisa ser assada
         */
        function roast(me: Copy): void;

        /**
         * Cobre sua copy em ketchup. Consome `ct.sosiska.ketchup`.
         * @param {Copy} me A copy para cobrir em ketchup
         * @param {boolean} tonsOfKetchup Se definido como `true`, gastará MUITO ketchup nesta copy em particular
         */
        function addKetchup(me: Copy, tonsOfKetchup?: boolean): void;

        /**
         * Quantidade de ketchup restante
         */
        var ketchup: number;
    }
}
```

## Exemplo: descrevendo novos campos e funções para tipos internos (incorporados)

Estender uma classe como Copy ou Background é mais complicado, pois o TypeScript não suporta a mesclagem de declarações de classe diretamente. Você terá que usar interfaces:

```ts
interface Copy {
    /**
     * Assa sua copy, adicionando uma crosta crocante
     */
    function roastMe(): void;
    /**
     * Determina qualidade de torração da copy
     */
    roastiness: number;
}
```

O código acima mostrará o método `roastMe` e o parâmetro `roastiness` na autocompletação para todas as copies no ct.IDE e verificará seu código quanto a erros de tipo.

## Classes internas (incorporadas)

Ct.js tem várias classes que representam entidades no jogo. Você deve usar esses nomes para descrever parâmetros e propriedades de seu módulo (como visto na seção "descrevendo um módulo").

* `Copy`,
* `Background`,
* `Tileset`,
* `Room`,
* [Todas as classes pixi.js'](https://pixijs.download/release/docs/index.html).

Desta forma, o ct.IDE será capaz de fornecer uma autocompletação razoável ​​para as suas propriedades e métodos.