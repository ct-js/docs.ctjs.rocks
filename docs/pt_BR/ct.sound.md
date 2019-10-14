# ct.sound

Esse módulo carrega e toca os sons no seu jogo.


## Métodos

### `ct.sound.init(name: String[, wav: String, mp3: String, options: object])`
Carrega um novo som para a lista de sons do jogo. Normalmente isso é feito via editor, mas você pode precisar carregar um som adicional durante a execução do jogo.

Options inclui:
* `poolSize` que define o número máximo de sons reproduzidos simultaneamente, sendo 5 o padrão definido;
* `music` sendo `false` definido por padrão. Definindo o valor para `true` desabilita o pré-carregamento desse arquivo.


### `ct.sound.spawn(name: String[, opts: Object, cb: Function])`

Cria um novo som e o reproduz.

- `name` nome do som a ser reproduzido;
- `opts` é um [objeto de configurações](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio) que é aplicado a tag `<audio></audio>` do novo som criado;
- `cb` é um callback, o qual é invocado quando a reprodução do som termina.

Esse método retorna um `HTMLTagAudio` – que é a tag do som criado, ou `false` no caso do som não ter sido criado.

### `ct.sound.exists(name: String)`

Retorna se um determinado som existe ou não no jogo.
