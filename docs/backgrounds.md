# backgrounds

`backgrounds` has some API to work with [`Background`](Background.md) objects.

## Methods and properties

### `backgrounds.list['TextureName']`

Contains an array of all the backgrounds of the current texture in the room. The array for this or that texture name may be absent if there are no such backgrounds yet, so you may need to check if the array itself exists before getting any of its elements.

Any backgrounds that did not use a name of a ct.js texture when created will be put into an array `backgrounds.list.OTHER`.

#### Example: Get the first background with a texture `BG_Sand` and make it darker

::: tabs#tutorial
@tab JavaScript
```js
if (backgrounds.list['BG_Sand']) {
    const bg = backgrounds.list['BG_Sand'][0];
    bg.tint = 0x999999;
}
```
@tab CoffeeScript
```coffee
if backgrounds.list['BG_Sand']
    bg = backgrounds.list['BG_Sand'][0]
    bg.tint = 0x999999
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed boolean boolean  ">  <img src="/assets/icons/bool.svg" class="feather"><span class="catnip-block-aTextLabel">to boolean</span>         <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">object's property</span>          <input type="text" class="catnip-block-aConstantInput string " value="BG_Sand" style=" width: 7.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">from</span>                  <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/image.svg" class="feather"><span class="catnip-block-aTextLabel">list of backgrounds</span>     </catnip-block>      </catnip-block>      </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Set</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">bg</span>              </catnip-block>  <span class="catnip-block-aTextLabel">value</span>                  <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/grid.svg" class="feather"><span class="catnip-block-aTextLabel">get array element</span>         <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">object's property</span>          <input type="text" class="catnip-block-aConstantInput string " value="BG_Sand" style=" width: 7.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">from</span>                  <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/image.svg" class="feather"><span class="catnip-block-aTextLabel">list of backgrounds</span>     </catnip-block>      </catnip-block>  <span class="catnip-block-aTextLabel">at</span>                   <input type="text" class="catnip-block-aConstantInput number " value="0" style=" width: 1.5ch;    " readonly="readonly">     </catnip-block>      </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Write</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">bg</span>              </catnip-block>  <span class="catnip-block-aTextLabel">property</span>                   <input type="text" class="catnip-block-aConstantInput string " style=" width: 4.5ch;    " value="tint" readonly="readonly"> <span class="catnip-block-aTextLabel">value</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " style=" width: 8.5ch;    " value="10066329" readonly="readonly">     </catnip-block>    </catnip-block-list> </div>     <img src="/assets/icons/alert-circle.svg" class="feather">         <span class="catnip-block-aTextLabel">Else</span>                <div class="catnip-block-Blocks"> <catnip-block-list> <div class="catnip-block-aBlockPlaceholder"> <img src="/assets/icons/thumbs-up.svg" class="feather"><span class="catnip-block-aTextLabel">Do nothing</span>  </div>   </catnip-block-list> </div>        </catnip-block>
:::

### `backgrounds.add(texName, frame, depth, container)`

Argument | Type | Description
-|-|-
`texName` | `string` | The name of a texture to be used as a background
`frame` | `number` | *(optional)* The index of a frame to use. Defaults to `0`.
`depth` | `number` | *(optional)* The depth to place the background at. Defaults to `0`.
`container` | `PIXI.Container` | *(optional)* Where to put the background. Defaults to `ct.room`, but can be set to any other room or valid pixi container.

**Returns** the created [`Background`](Background.html) instance.

::: tip
Visit the [`Background` class documentation](Background.html) to learn how to tweak backgrounds' position, look, and movement.
:::

#### Example: Create a background, set its opacity, and make it move horizontally

::: code-tabs#tutorial
@tab JavaScript
```js
const bg = backgrounds.add('BG_SkyClouds', 0, -1000);
bg.alpha = 0.5;
bg.movementX = 1;
```
@tab CoffeeScript
```coffee
bg = backgrounds.add 'BG_SkyClouds', 0, -1000
bg.alpha = 0.5
bg.movementX = 1
```
:::