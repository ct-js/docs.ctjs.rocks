# ct.res

Esse objeto gerencia todos os recursos necessários para o seu jogo, incluindo imagens e som. Usualmente você não precisa utilizar esses métodos, porque todo o trabalho é feito pelo ct.IDE, entretanto você pode achar útil o carregamento adicional ou dinâmico de assets durante o processo do game.

## Métodos e propriedades

### `ct.res.registry`

 Um objeto com todos os metadados das texturas carregadas, incluíndo as própria texturas, as máscaras de colisões e os eixos de rotação.

### `ct.res.skelRegistry`

Contém todos os dados de animações skeletal importadas do jogo.

### `ct.res.sounds`

Um objeto com os metadados de todos os sons do jogo.

### `ct.res.getTexture(name: String, frame: Number)`

Retorna uma textura Pixi obtida através de uma textura ct.js, isso é necessário para fazer elementos UI personalizados e coisas do tipo, por exemplo, para adicionar um [Pixi's Sprites](http://pixijs.download/release/docs/PIXI.Sprite.html).

Se `name` é igual a `-1`, então uma textura vazia é rotornada.

Se `frame` é definido, então apenas uma textura é retornada. Caso contrário, todas as texturas em uma animação ct.js serão retornadas como um array.

### `ct.res.fetchImage(url: String, callback: Function)`

Carrega uma imagem e adiciona a mesma na lista de imagens atual (`ct.res.registry`). Quando um `callback` é fornecido, ele recebe uma lista dos recursos carregados.
