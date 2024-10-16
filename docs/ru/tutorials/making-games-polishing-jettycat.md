# Полировка JettyCat

::: note Автоматически переведённая страница
К сожалению, на полный ручной перевод у нас не хватает ресурсов.
Если вы увидели ошибку — отправьте пул-риквест с исправлениями (ссылка для редактирования в конце страницы).
:::

::: tip Привет!
В этом руководстве предполагается, что вы уже закончили руководство [Создание игр: JettyCat](./making-games-jettycat.md). Прежде чем приступать к этому, рекомендуем его завершить.
:::

Игра полная с точки зрения механики, но есть много способов улучшить ее как с эстетической, так и с игровой точки зрения!

[[toc]]

## Переход между комнатами

В Ct.js есть модуль под названием «transition» (переход). Он позволяет легко создавать приятные переходы между уровнями. Идея в том, чтобы начать первую половину перехода при нажатии кнопки или другом событии, а затем перейти к другой комнате и вызвать вторую половину перехода в коде старта комнаты.

Включите модуль «transition» в вкладке Catmods. Он указывает, что он зависит от catmod «tween», поэтому включите его также.

Теперь измените код события нажатия кнопки «Button_Play», чтобы при нажатии отображался синий круглый переход:


::: tabs#tutorial
@tab JavaScript
```js
if (!this.pressed) {
    this.pressed = true;
    transition.circleOut(1000, 0x446ADB)
    .then(() => {
        rooms.switch('InGame');
    });
}
```
@tab CoffeeScript
```coffee
if not @pressed
    @pressed = yes
    transition.circleOut 1000, 0x446ADB
    .then =>
        rooms.switch 'InGame'
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed boolean boolean  ">  <span class="catnip-block-aTextLabel">not</span>         <catnip-block class=" computed wildcard boolean userdefined ">  <img src="/assets/icons/archive.svg" class="feather"> <span class="catnip-block-aTextLabel">pressed</span>              </catnip-block>      </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Set</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/archive.svg" class="feather"> <span class="catnip-block-aTextLabel">pressed</span>              </catnip-block>  <span class="catnip-block-aTextLabel">value</span>                  <catnip-block class=" computed boolean wildcard constant ">  <img src="/assets/icons/bool.svg" class="feather"><span class="catnip-block-aTextLabel">true</span>     </catnip-block>      </catnip-block>   <catnip-block class=" command wildcard   ">  <img src="/assets/icons/monitor.svg" class="feather"><span class="catnip-block-aTextLabel">Transition circle out</span>          <input type="text" class="catnip-block-aConstantInput number " value="1000" style=" width: 4.5ch;    " readonly="readonly">          <input type="text" class="catnip-block-aConstantInput number " value="4483803" style=" width: 7.5ch;    " readonly="readonly">   <div class="catnip-block-aFiller"></div>         <span class="catnip-block-anAsyncMarker"> <img src="/assets/icons/clock.svg" class="feather"></span>            <div class="catnip-block-aBreak"></div>        <img src="/assets/icons/redo.svg" class="feather">         <span class="catnip-block-aTextLabel">Then</span>                <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command void   ">  <img src="/assets/icons/room.svg" class="feather"><span class="catnip-block-aTextLabel">Switch to</span>          <span class="catnip-block-aConstantInput menu string ">   <img src="/assets/icons/image.svg" class="feather"><span>InGame</span></span>     </catnip-block>    </catnip-block-list> </div>        </catnip-block>    </catnip-block-list> </div>        </catnip-block>
:::

`this.pressed` — это наша пользовательская переменная, которая запоминает, что кнопка была нажата. Это поможет нам избежать случайного двойного нажатия, которое может негативно повлиять на логику игры.

Первый аргумент функции `transition.circleOut(1000, 0x446ADB)` — это продолжительность эффекта (1000 миллисекунд = 1 секунда), а второй аргумент — цвет перехода. Он представлен в формате шестнадцатеричного цвета, но с `0x` вместо `#` в начале.

::: tip
В модуле есть много других методов и примеров в вкладках "Информация" и "Справочник".
:::

Переход сам по себе является асинхронной операцией! Мы используем `.then(() => {…})`, чтобы перейти к следующей комнате сразу после окончания перехода.

Это была первая часть перехода. Вторая часть приведет нас к коду комнаты `InGame`. Откройте комнату и добавьте следующую строку:

::: tabs#tutorial
@tab JavaScript
```js
transition.circleIn(500, 0x446ADB);
```
@tab CoffeeScript
```coffee
transition.circleIn 500, 0x446ADB
```
@tab Catnip
<catnip-block class=" command wildcard   selected">  <img src="/assets/icons/monitor.svg" class="feather"><span class="catnip-block-aTextLabel">Transition circle in</span>          <input type="text" class="catnip-block-aConstantInput number " style=" width: 3.5ch;    " value="500" readonly="readonly">          <input type="text" class="catnip-block-aConstantInput number " style=" width: 7.5ch;    " value="4483803" readonly="readonly">   <div class="catnip-block-aFiller"></div>         <span class="catnip-block-anAsyncMarker"> <img src="/assets/icons/clock.svg" class="feather"></span>            <div class="catnip-block-aBreak"></div>        <img src="/assets/icons/redo.svg" class="feather">         <span class="catnip-block-aTextLabel">Then</span>                <div class="catnip-block-Blocks"> <catnip-block-list> <div class="catnip-block-aBlockPlaceholder"> <img src="/assets/icons/thumbs-up.svg" class="feather"><span class="catnip-block-aTextLabel">Do nothing</span>  </div>   </catnip-block-list> </div>        </catnip-block>
:::

Мы также можем продемонстрировать наши слои интерфейса пользователя (паузовое меню и экран счета) путем их сделать прозрачными, но медленно превращая их в непрозрачные. Мы будем использовать «твейн» — это один из катмодов, используемых переходом.

Большинство сущностей в ct.js имеют одинаковые параметры, которые позволяют настроить их внешний вид и ощущения. Мы использовали «this.scale.x» и «this.scale.y», чтобы установить масштаб копии, но мы также можем применить это к комнатам, текстовым меткам, специальным эффектам и т. д. Помимо масштабирования, есть параметры «this.angle», «this.alpha» и «this.tint», которые вращают объект, устанавливают его непрозрачность и цвет соответственно.

Мы изменим свойство «this.alpha» с течением времени. Это число от 0 до 1. Когда установлено в 1 — его начальное значение — копия или комната будут полностью непрозрачными. Когда установлено в 0, он будет невидимым. Любые числа между ними сделают объект частично прозрачным. Модуль «твейн» поможет создать плавный переход.

Таким образом, чтобы сделать слои интерфейса пользователя более заметными, нам нужно добавить этот код в событие начала комнаты для комнат «UI_OhNo» и «UI_Paused»:

::: tabs#tutorial
@tab JavaScript
```js
this.alpha = 0;

tween.add({
    obj: this,
    fields: {
        alpha: 1
    },
    duration: 500,
    isUi: true
});
```
@tab CoffeeScript
```coffee
@alpha = 0

tween.add
    obj: this
    fields:
        alpha: 1
    duration: 500
    isUi: true
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/droplet.svg" class="feather"><span class="catnip-block-aTextLabel">Set opacity to</span>          <input type="text" class="catnip-block-aConstantInput number " value="0" style=" width: 1.5ch;    " readonly="readonly">     </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/interpolation-smooth.svg" class="feather"><span class="catnip-block-aTextLabel">Animate a value</span>         <catnip-block class=" computed number number  ">  <img src="/assets/icons/droplet.svg" class="feather"><span class="catnip-block-aTextLabel">opacity</span>     </catnip-block>  <span class="catnip-block-aTextLabel">to</span>                   <input type="text" class="catnip-block-aConstantInput number " value="1" style=" width: 1.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">for</span>                   <input type="text" class="catnip-block-aConstantInput number " value="500" style=" width: 3.5ch;    " readonly="readonly">  <span class="catnip-block-anAsyncMarker"> <img src="/assets/icons/clock.svg" class="feather"></span>            <div class="catnip-block-aBreak"></div>        <img src="/assets/icons/redo.svg" class="feather">         <span class="catnip-block-aTextLabel">Then</span>                <div class="catnip-block-Blocks"> <catnip-block-list> <div class="catnip-block-aBlockPlaceholder"> <img src="/assets/icons/thumbs-up.svg" class="feather"><span class="catnip-block-aTextLabel">Do nothing</span>  </div>   </catnip-block-list> </div>     <img src="/assets/icons/alert-octagon.svg" class="feather">         <span class="catnip-block-aTextLabel">On error</span>                <div class="catnip-block-Blocks"> <catnip-block-list> <div class="catnip-block-aBlockPlaceholder"> <img src="/assets/icons/thumbs-up.svg" class="feather"><span class="catnip-block-aTextLabel">Do nothing</span>  </div>   </catnip-block-list> </div>           <div class="catnip-block-Options"> <div class="catnip-block-anOptionsToggle"> <img src="/assets/icons/chevron-up.svg" class="feather"><span>Advanced</span> <img src="/assets/icons/chevron-up.svg" class="feather"> </div> <dl> <dt>Animate in UI time</dt> <dd> <catnip-block class=" computed boolean boolean constant ">  <img src="/assets/icons/bool.svg" class="feather"><span class="catnip-block-aTextLabel">true</span>     </catnip-block>  </dd> </dl><dl> <dt>Curve</dt> <dd>  <input type="text" class="catnip-block-aConstantInput wildcard " style="width: 5.5ch" readonly="readonly"> </dd> </dl>   </div>       </catnip-block>
:::

Сначала мы делаем комнату полностью прозрачной, установив ее альфа на 0. Затем мы вызываем `tween.add`, чтобы начать плавное переходное действие. `obj` указывает на объект, который нужно анимировать, а `fields` перечисляет все свойства и значения, которые мы хотим изменить. Ключевое слово `duration` задает продолжительность эффекта в миллисекундах. Наконец, ключевое слово `isUi` указывает, что анимация должна выполняться в шкале времени пользовательского интерфейса, игнорируя наше "паузированное" состояние игры.

Мы также можем постепенно вывести из слоя пользовательского интерфейса. Давайте спрячем меню паузы, когда игрок нажимает кнопку "продолжить". Откройте шаблон `Button_Continue` и измените код события "Pointer Click":


::: tabs#tutorial
@tab JavaScript
```js
if (!this.pressed) {
    this.pressed = true;
    tween.add({
        obj: this.getRoom(),
        fields: {
            alpha: 0
        },
        duration: 1000,
        isUi: true
    })
    .then(() => {
        pixiApp.ticker.speed = 1;
        rooms.remove(this.getRoom());
    });
}
```
@tab CoffeeScript
```coffee
if not @pressed
    @pressed = yes
    tween.add
        obj: @getRoom()
        fields:
            alpha: 0
        duration: 1000
        isUi: yes
    .then =>
        pixiApp.ticker.speed = 1
        rooms.remove @getRoom()
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed boolean boolean  ">  <span class="catnip-block-aTextLabel">not</span>         <catnip-block class=" computed wildcard boolean userdefined ">  <img src="/assets/icons/archive.svg" class="feather"> <span class="catnip-block-aTextLabel">pressed</span>              </catnip-block>      </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Set</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/archive.svg" class="feather"> <span class="catnip-block-aTextLabel">pressed</span>              </catnip-block>  <span class="catnip-block-aTextLabel">value</span>                  <catnip-block class=" computed boolean wildcard constant ">  <img src="/assets/icons/bool.svg" class="feather"><span class="catnip-block-aTextLabel">true</span>     </catnip-block>      </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/interpolation-smooth.svg" class="feather"><span class="catnip-block-aTextLabel">Animate object's</span>         <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/room.svg" class="feather"><span class="catnip-block-aTextLabel">copy's owning room</span>     </catnip-block>  <span class="catnip-block-aTextLabel">property</span>                   <input type="text" class="catnip-block-aConstantInput string " value="alpha" style=" width: 5.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">to</span>                   <input type="text" class="catnip-block-aConstantInput number " value="0" style=" width: 1.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">for</span>                   <input type="text" class="catnip-block-aConstantInput number " value="1000" style=" width: 4.5ch;    " readonly="readonly">  <span class="catnip-block-anAsyncMarker"> <img src="/assets/icons/clock.svg" class="feather"></span>            <div class="catnip-block-aBreak"></div>        <img src="/assets/icons/redo.svg" class="feather">         <span class="catnip-block-aTextLabel">Then</span>                <div class="catnip-block-Blocks"> <catnip-block-list> <div class="catnip-block-aBlockPlaceholder"> <img src="/assets/icons/thumbs-up.svg" class="feather"><span class="catnip-block-aTextLabel">Do nothing</span>  </div>   </catnip-block-list> </div>     <img src="/assets/icons/alert-octagon.svg" class="feather">         <span class="catnip-block-aTextLabel">On error</span>                <div class="catnip-block-Blocks"> <catnip-block-list> <div class="catnip-block-aBlockPlaceholder"> <img src="/assets/icons/thumbs-up.svg" class="feather"><span class="catnip-block-aTextLabel">Do nothing</span>  </div>   </catnip-block-list> </div>           <div class="catnip-block-Options"> <div class="catnip-block-anOptionsToggle"> <img src="/assets/icons/chevron-up.svg" class="feather"><span>Advanced</span> <img src="/assets/icons/chevron-up.svg" class="feather"> </div> <dl> <dt>Animate in UI time</dt> <dd> <catnip-block class=" computed boolean boolean constant ">  <img src="/assets/icons/bool.svg" class="feather"><span class="catnip-block-aTextLabel">true</span>     </catnip-block>  </dd> </dl><dl> <dt>Curve</dt> <dd>  <input type="text" class="catnip-block-aConstantInput wildcard " style="width: 5.5ch" readonly="readonly"> </dd> </dl>   </div>       </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/settings.svg" class="feather"><span class="catnip-block-aTextLabel">Set game speed to</span>          <input type="text" class="catnip-block-aConstantInput number " style=" width: 1.5ch;    " value="1" readonly="readonly">     </catnip-block>   <catnip-block class=" command void   ">  <img src="/assets/icons/room.svg" class="feather"><span class="catnip-block-aTextLabel">Remove a room</span>         <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/room.svg" class="feather"><span class="catnip-block-aTextLabel">copy's owning room</span>     </catnip-block>      </catnip-block>    </catnip-block-list> </div>        </catnip-block>
:::

Мы создаем флаг `this.pressed`, чтобы убедиться, что анимация запускается только один раз. Запуск ее несколько раз не нанесет вреда, но этот подход сохраняет чистоту журнала отладчика, поскольку `tween` будет предупреждать об прерванных анимациях в противном случае.

Затем мы запускаем анимацию для `this.getRoom()`, которая вернет комнату `UI_Paused`, владеющую этой кнопкой, и возвращаем ее альфа-канал к 0. После этого видно, что `tween.add` создает асинхронное событие, и мы удаляем комнату и возобновляем игру внутри условия `.then(() => {…});`.

## Плавное воспроизведение игры после ее приостановки

Хотя меню «пауза» медленно исчезает, игроку трудно успеть и предотвратить падение кошки. Чтобы этого избежать, мы можем использовать `tween`, чтобы… анимация времени! `pixiApp.ticker.speed` может быть не только 0 и 1, но и любое другое значение, даже более 1. Большие значения сделают игру быстройше, а маленькие — медленнее. Таким образом, мы можем анимировать значение `pixiApp.ticker.speed`, чтобы плавно перейти от паузы к полностью работающей игре.

Откройте шаблон `Button_Continue` снова и измените скрипт, чтобы после завершения первого твикна запустить еще один:

::: tabs#tutorial
@tab JavaScript
```js {12,13,14,15,16,17,18,19}
if (!this.pressed) {
    this.pressed = true;
    tween.add({
        obj: this.getRoom(),
        fields: {
            alpha: 0
        },
        duration: 1000,
        isUi: true
    })
    .then(() => {
        tween.add({
            obj: pixiApp.ticker,
            fields: {
                speed: 1
            },
            duration: 1000,
            isUi: true
        });
        rooms.remove(this.getRoom());
    });
}
```
@tab CoffeeScript
```coffee
if not @pressed
    @pressed = yes
    tween.add
        obj: @getRoom()
        fields:
            alpha: 0
        duration: 1000
        isUi: yes
    .then =>
        tween.add
            obj: pixiApp.ticker
            fields:
                speed: 1
            duration: 1000
            isUi: true
        rooms.remove @getRoom()
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed boolean boolean  ">  <span class="catnip-block-aTextLabel">not</span>         <catnip-block class=" computed wildcard boolean userdefined ">  <img src="/assets/icons/archive.svg" class="feather"> <span class="catnip-block-aTextLabel">pressed</span>              </catnip-block>      </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Set</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/archive.svg" class="feather"> <span class="catnip-block-aTextLabel">pressed</span>              </catnip-block>  <span class="catnip-block-aTextLabel">value</span>                  <catnip-block class=" computed boolean wildcard constant ">  <img src="/assets/icons/bool.svg" class="feather"><span class="catnip-block-aTextLabel">true</span>     </catnip-block>      </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/interpolation-smooth.svg" class="feather"><span class="catnip-block-aTextLabel">Animate object's</span>         <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/room.svg" class="feather"><span class="catnip-block-aTextLabel">copy's owning room</span>     </catnip-block>  <span class="catnip-block-aTextLabel">property</span>                   <input type="text" class="catnip-block-aConstantInput string " value="alpha" style=" width: 5.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">to</span>                   <input type="text" class="catnip-block-aConstantInput number " value="0" style=" width: 1.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">for</span>                   <input type="text" class="catnip-block-aConstantInput number " value="1000" style=" width: 4.5ch;    " readonly="readonly">  <span class="catnip-block-anAsyncMarker"> <img src="/assets/icons/clock.svg" class="feather"></span>            <div class="catnip-block-aBreak"></div>        <img src="/assets/icons/redo.svg" class="feather">         <span class="catnip-block-aTextLabel">Then</span>                <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/interpolation-smooth.svg" class="feather"><span class="catnip-block-aTextLabel">Animate a value</span>         <catnip-block class=" computed number number  ">  <img src="/assets/icons/settings.svg" class="feather"><span class="catnip-block-aTextLabel">game speed</span>     </catnip-block>  <span class="catnip-block-aTextLabel">to</span>                   <input type="text" class="catnip-block-aConstantInput number " value="1" style=" width: 1.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">for</span>                   <input type="text" class="catnip-block-aConstantInput number " value="1000" style=" width: 4.5ch;    " readonly="readonly">  <span class="catnip-block-anAsyncMarker"> <img src="/assets/icons/clock.svg" class="feather"></span>            <div class="catnip-block-aBreak"></div>        <img src="/assets/icons/redo.svg" class="feather">         <span class="catnip-block-aTextLabel">Then</span>                <div class="catnip-block-Blocks"> <catnip-block-list> <div class="catnip-block-aBlockPlaceholder"> <img src="/assets/icons/thumbs-up.svg" class="feather"><span class="catnip-block-aTextLabel">Do nothing</span>  </div>   </catnip-block-list> </div>     <img src="/assets/icons/alert-octagon.svg" class="feather">         <span class="catnip-block-aTextLabel">On error</span>                <div class="catnip-block-Blocks"> <catnip-block-list> <div class="catnip-block-aBlockPlaceholder"> <img src="/assets/icons/thumbs-up.svg" class="feather"><span class="catnip-block-aTextLabel">Do nothing</span>  </div>   </catnip-block-list> </div>           <div class="catnip-block-Options"> <div class="catnip-block-anOptionsToggle"> <img src="/assets/icons/chevron-up.svg" class="feather"><span>Advanced</span> <img src="/assets/icons/chevron-up.svg" class="feather"> </div> <dl> <dt>Animate in UI time</dt> <dd> <catnip-block class=" computed boolean boolean constant ">  <img src="/assets/icons/bool.svg" class="feather"><span class="catnip-block-aTextLabel">true</span>     </catnip-block>  </dd> </dl><dl> <dt>Curve</dt> <dd>  <input type="text" class="catnip-block-aConstantInput wildcard " style="width: 5.5ch" readonly="readonly"> </dd> </dl>   </div>       </catnip-block>   <catnip-block class=" command void   ">  <img src="/assets/icons/room.svg" class="feather"><span class="catnip-block-aTextLabel">Remove a room</span>         <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/room.svg" class="feather"><span class="catnip-block-aTextLabel">copy's owning room</span>     </catnip-block>      </catnip-block>    </catnip-block-list> </div>     <img src="/assets/icons/alert-octagon.svg" class="feather">         <span class="catnip-block-aTextLabel">On error</span>                <div class="catnip-block-Blocks"> <catnip-block-list> <div class="catnip-block-aBlockPlaceholder"> <img src="/assets/icons/thumbs-up.svg" class="feather"><span class="catnip-block-aTextLabel">Do nothing</span>  </div>   </catnip-block-list> </div>           <div class="catnip-block-Options"> <div class="catnip-block-anOptionsToggle"> <img src="/assets/icons/chevron-up.svg" class="feather"><span>Advanced</span> <img src="/assets/icons/chevron-up.svg" class="feather"> </div> <dl> <dt>Animate in UI time</dt> <dd> <catnip-block class=" computed boolean boolean constant ">  <img src="/assets/icons/bool.svg" class="feather"><span class="catnip-block-aTextLabel">true</span>     </catnip-block>  </dd> </dl><dl> <dt>Curve</dt> <dd>  <input type="text" class="catnip-block-aConstantInput wildcard " style="width: 5.5ch" readonly="readonly"> </dd> </dl>   </div>       </catnip-block>    </catnip-block-list> </div>        </catnip-block>
:::

Теперь игроки могут наверстать упущенное в игре и спасти свою кошку от падения.

## Дым от кошачьего реактивного двигателя и звездные частицы

Ct.js позволяет визуально создавать эффекты частиц и воспроизводить их в вашей игре. И это круто! Давайте создадим два эффекта: один будет дымом реактивного двигателя для кошки, а другой — вспышку более мелких звезд, когда вы собираете одну из них.

### Создание вспышки

Откройте вкладку "Ассеты" в верхней части и создайте новый тандем эмиттера через "Новый ассет". Назовите его `StarBurst`.

Выберите его текстуру в левом верхнем углу и начните подгружать значения! Есть много категорий складывания, которые манипулируют тем, как частицы двигаются, меняются со временем и появляются.

Попробуйте сделать так, чтобы это выглядело следующим образом:

![Эффект с вспышкой звезд](../../images/tutorials/tutJettyCat_Stars.gif)

::: tip
Вы можете установить предварительный просмотр текстуры в правом нижнем углу, чтобы увидеть, как выглядит ваш эффект по сравнению со звездным бонусом.
:::

Ниже приведены некоторые рекомендации по созданию этого эффекта:

* Чтобы сделать вспышку и не бесконечную струю, откройте раздел "Создание" и установите продолжительность эмиттера. Это быстрый эффект, поэтому нам понадобятся небольшие значения, такие как 0,1 секунды.
* В разделе "Быстрость" есть кнопка "С гравитацией", которая сделает звезды падающими после их появления. Нам нужно вертикальное, Y-ось, и довольно большие значения: я использовал ~1400 для своего эффекта.
* Чтобы сделать эффект более неупорядоченным и менее искусственным, убедитесь, что частицы имеют разную продолжительность в категории "Создание", так что они становятся более случайными. Подгружая минимальную скорость и размер также помогает.
* относительно большой круговой область, охватывающий большую часть предварительного просмотра текстуры, сделает эффект более похожим на то, что большая звезда разбивается на более мелкие части. Вы можете установить форму и ее размер под категорией "Форма и положение". Проверьте флажок "Показать визуализатор формы", чтобы увидеть форму.

Когда вы готовы, нажмите кнопку "Применить" в нижней левой колонке.

Чтобы создать вспышку звезд при сборе большой звезды, откройте шаблон `Star`, добавьте событие "Уничтожение" и напишите следующую строку:

::: tabs#tutorial
@tab JavaScript
```js
emitters.fire('StarBurst', this.x, this.y);
```
@tab CoffeeScript
```coffee
emitters.fire 'StarBurst', @x, @y
```
@tab Catnip
<catnip-block class=" command wildcard   selected">  <img src="/assets/icons/sparkles.svg" class="feather"><span class="catnip-block-aTextLabel">Fire an emitter at location</span>          <span class="catnip-block-aConstantInput menu string ">   <img src="/assets/icons/sparkles.svg" class="feather"><span>StarBurst</span></span>         <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">x</span>     </catnip-block>          <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">y</span>     </catnip-block>           <input type="text" class="catnip-block-aConstantInput wildcard " style=" width: 8.5ch;    " readonly="readonly">   <div class="catnip-block-aFiller"></div>        <span class="catnip-block-aTextLabel">store in</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " style=" width: 6.5ch;    " readonly="readonly">     </catnip-block>
:::

::: tip
Здесь мы читаем позицию звезды (this.x, this.y) и говорим о создании эффекта "Звездный взрыв".
:::

### Создание реактивного следа

Сначала нам понадобится текстура, похожая на дым. Перейдите к добавлению нового актива и нажмите кнопку "Галерея встроенных активов". В этот игровой движок включены текстурные пакеты, которые можно импортировать непосредственно в вашу игру! Откройте Jumperpack и импортируйте текстуру Smoke. Теперь закройте галерею, и вы увидите, что текстура дыма стала частью вашего проекта!

![Импорт текстуры галереи в ct.js](../../images/tutorials/tutJettyCat_gallery.png)

Создайте новый эмиттер тандем. Назовем его "Jet".

Начнем с того, что перейдите к выбору текстуры и загрузите текстуру Smoke. В правом нижнем углу найдите кнопку "Установить предварительную текстуру" и выберите нашу кошку. После этого вы можете поиграть с редактором, чтобы получить желаемый эффект. Я создал курок белого дыма разных размеров:

![Эффект частицы курока в ct.js](../../images/tutorials/tutJettyCat_Jet.gif)

Вот несколько подсказок:

* Измените цвет фона в нижнем правом углу окна, чтобы лучше видеть белый дым;
* Начните с изменения полей "Начальный направление" в разделе " вращение", чтобы частицы течь вниз. Хороший диапазон - от 90 до 110 градусов.
* По умолчанию размер текстуры будет слишком большим; скорректируйте его в графике под разделом "Масштабирование", так что он будет где-то около `0,3`.
* Измените значение Масштабирование » Минимальный размер, чтобы создавать частицы разных размеров.
* Точечно положите эмиттер, чтобы курок выходил прямо из джета, скорректировав положение эмиттера в разделе "Форма и позиционирование".
* Измените значение Спавнинг » Интервал между вспышками, чтобы изменить плотность курока. Более мелкие значения создают больше частиц.

Чтобы добавить эффект к кошке, откройте ее шаблон и вставьте этот код в конец кода Создание:

::: tabs#tutorial
@tab JavaScript
```js
this.jet = emitters.follow(this, 'Jet');
```
@tab CoffeeScript
```coffee
@jet = emitters.follow this, 'Jet'
```
@tab Catnip
<catnip-block class=" command wildcard   selected">  <img src="/assets/icons/sparkles.svg" class="feather"><span class="catnip-block-aTextLabel">Create an emitter and follow</span>         <catnip-block class=" computed wildcard wildcard constant ">  <img src="/assets/icons/crosshair.svg" class="feather"><span class="catnip-block-aTextLabel">this</span>     </catnip-block>           <span class="catnip-block-aConstantInput menu string ">   <img src="/assets/icons/sparkles.svg" class="feather"><span>Jet</span></span>          <input type="text" class="catnip-block-aConstantInput wildcard " style=" width: 8.5ch;    " readonly="readonly">   <div class="catnip-block-aFiller"></div>        <span class="catnip-block-aTextLabel">store in</span>                  <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/archive.svg" class="feather"> <span class="catnip-block-aTextLabel">jet</span>              </catnip-block>      </catnip-block>
:::

`emitters.follow` создает эффект частиц и делает его следовать за копией. Первый аргумент - копия, за которой мы хотим следовать (`this` - наша кошка), а второй - имя эффекта (`'Jet'`).

Мы также сохраняем ссылку на этот эмиттер в параметр `this.jet`. Это позволит нам манипулировать эмиттером позже.

::: tip
Чтоб узнать больше о создании эффектов и их параметрах, [прочитайте документацию по эмиттерам](./../emitters.md).
:::

У кошки должен быть курок дыма, исходящий из ее реактивера. Вы можете отрегулировать размер частиц курока и его скорость.

Давайте добавим немного динамики в этот курок: мы будем создавать новые частицы только тогда, когда кошка летит вверх. У нас есть ссылка `this.jet`, и мы можем использовать ее, чтобы приостановить эмиттер и возобновить его при нажатии или отпускании экрана.

Создайте новое событие Action release, выберите действие Poof и поместите следующий код в него:

::: tabs#tutorial
@tab JavaScript
```js
this.jet.pause();
```
@tab CoffeeScript
```coffee
@jet.pause()
```
@tab Catnip
<catnip-block class=" command void   selected">  <img src="/assets/icons/sparkles.svg" class="feather"><span class="catnip-block-aTextLabel">Pause the emitter</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/archive.svg" class="feather"> <span class="catnip-block-aTextLabel">jet</span>              </catnip-block>      </catnip-block>
:::

Это приостановит эффект. Чтобы возобновить его, перейдите к событию On Poof down и добавьте эту строку:

::: tabs#tutorial
@tab JavaScript
```js
this.jet.resume();
```
@tab CoffeeScript
```coffee
@jet.resume()
```
@tab Catnip
<catnip-block class=" command void   selected">  <img src="/assets/icons/sparkles.svg" class="feather"><span class="catnip-block-aTextLabel">Resume the emitter</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/archive.svg" class="feather"> <span class="catnip-block-aTextLabel">jet</span>              </catnip-block>      </catnip-block>
:::

Пора всё протестировать!

## Добавление лёгких анимаций для кошки и звезд

Частицы помогают оживить игру, но она все равно может казаться жесткой и неподвижной. Давайте добавим небольшие анимации для кошки и звезд. Мы будем вращать кошку в зависимости от ее вертикальной скорости, а звезду — по времени.

### Вращение кошки

У каждой копии есть параметр `this.angle`, который устанавливает угол наклона текстуры в градусах. Каждый копия также имеет параметры `this.speed` и `this.direction`, которые мы использовали, и они оба определяют дополнительные параметры `this.vspeed` и `this.hspeed` — вертикальную и горизонтальную скорость, полученные из скорости и направления. Эти два значения могут быть отрицательными, когда копия движется в направлении, противоположном оси. Например, ось X указывает вправо, а ее значения растут с левого на правое. Двигаясь вправо, мы получаем положительную `hspeed`, а двигаясь влево — отрицательную `hspeed`.

Мы можем связать `this.vspeed` и `this.angle` копия так, что он будет вращаться при падении или полете вверх. Это можно сделать просто, присваивая одно значение другому в коде события конца кадра.

Этот код сработает:

::: tabs#tutorial
@tab JavaScript
```js
this.angle = -this.vspeed;
```
@tab CoffeeScript
```coffee
@angle = -@vspeed
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/droplet.svg" class="feather"><span class="catnip-block-aTextLabel">Set texture rotation to</span>         <catnip-block class=" computed number number  ">            <input type="text" class="catnip-block-aConstantInput number " style=" width: 2.5ch;    " value="-1" readonly="readonly"> <span class="catnip-block-aTextLabel">×</span>                  <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">vertical speed</span>     </catnip-block>      </catnip-block>      </catnip-block>
:::

Но это приведет к слишком сильному вращению. Добавление деления сделает его более плавным:

::: tabs#tutorial
@tab JavaScript
```js
this.angle = -this.vspeed / 200;
```
@tab CoffeeScript
```coffee
@angle = -@vspeed / 200
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/droplet.svg" class="feather"><span class="catnip-block-aTextLabel">Set texture rotation to</span>         <catnip-block class=" computed number number  ">            <input type="text" class="catnip-block-aConstantInput number " value="-1" style=" width: 2.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">×</span>                  <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">vertical speed</span>     </catnip-block>  <span class="catnip-block-aTextLabel">:</span>                   <input type="text" class="catnip-block-aConstantInput number " value="200" style=" width: 3.5ch;    " readonly="readonly">     </catnip-block>      </catnip-block>      </catnip-block>
:::

### Вращение звезд

Со звёздами мы не можем просто привязать `this.angle` к значению ct.js. Мы можем определить свое собственное и применить немного математики, чтобы превратить числа в приятные колебания. Это все будет напоминать вам о таймерах спавна труб.

Откройте шаблон `Star` и добавьте следующую строку в событие Создание:

::: tabs#tutorial
@tab JavaScript
```js
this.wiggleTime = 0;
```
@tab CoffeeScript
```coffee
@wiggleTime = 0
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Set</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/archive.svg" class="feather"> <span class="catnip-block-aTextLabel">wiggleTime</span>              </catnip-block>  <span class="catnip-block-aTextLabel">value</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " style=" width: 1.5ch;    " value="0" readonly="readonly">     </catnip-block>
:::

И для события Конец Кадра:

::: tabs#tutorial
@tab JavaScript
```js
this.wiggleTime += u.time * 12;
this.angle = Math.sin(this.wiggleTime) * 5;
```
@tab CoffeeScript
```coffee
@wiggleTime += u.time * 12
@angle = (Math.sin @wiggleTime) * 5
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Set</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/archive.svg" class="feather"> <span class="catnip-block-aTextLabel">wiggleTime</span>              </catnip-block>  <span class="catnip-block-aTextLabel">value</span>                  <catnip-block class=" computed number wildcard  ">           <catnip-block class=" computed wildcard number userdefined ">  <img src="/assets/icons/archive.svg" class="feather"> <span class="catnip-block-aTextLabel">wiggleTime</span>              </catnip-block>  <span class="catnip-block-aTextLabel">+</span>                  <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/tool.svg" class="feather"><span class="catnip-block-aTextLabel">time</span>     </catnip-block>  <span class="catnip-block-aTextLabel">×</span>                   <input type="text" class="catnip-block-aConstantInput number " style=" width: 2.5ch;    " value="12" readonly="readonly">     </catnip-block>      </catnip-block>      </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/droplet.svg" class="feather"><span class="catnip-block-aTextLabel">Set texture rotation to</span>         <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <span class="catnip-block-aTextLabel">sin</span>         <catnip-block class=" computed wildcard number userdefined ">  <img src="/assets/icons/archive.svg" class="feather"> <span class="catnip-block-aTextLabel">wiggleTime</span>              </catnip-block>      </catnip-block>  <span class="catnip-block-aTextLabel">×</span>                   <input type="text" class="catnip-block-aConstantInput number " style=" width: 1.5ch;    " value="5" readonly="readonly">     </catnip-block>      </catnip-block>
:::

Здесь мы меняем `this.wiggleTime` на каждом кадре в зависимости от прошедшего времени, умножая его на 12, чтобы ускорить анимацию. Затем мы используем `Math.sin`, чтобы получить синус `wiggleTime` — изменение последнего на каждом кадре приведет к плавному колебанию между -1 и 1. Множа его на 5, мы усиливаем эффект в пять раз.

![Покачивающаяся, анимированная звезда](../../images/tutorials/tutJettyCat_StarWiggle.gif)

## Добавление подсказки для нажатия

Давайте используем тот же подход, чтобы создать визуальную подсказку для пользователя, чтобы начать нажимать! Это будет пульсирующая иконка руки.

Создайте новый шаблон под названием `PressHint` с текстурой `PressHint`. Убедитесь, что текстура имеет центрированную ось.

В коде создания шаблона добавьте строку `this.pulsePhase = 0;`. В коде начала фрейма вставьте следующий фрагмент:

::: tabs#tutorial
@tab JavaScript
```js
this.pulsePhase += u.time * 12;

this.scale.x = this.scale.y = 1 + Math.sin(this.pulsePhase) * 0.1;
```
@tab CoffeeScript
```coffee
@pulsePhase += u.time * 12
@scale.x = @scale.y = 1 + (Math.sin @pulsePhase) * 0.1
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Set</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/archive.svg" class="feather"> <span class="catnip-block-aTextLabel">pulsePhase</span>              </catnip-block>  <span class="catnip-block-aTextLabel">value</span>                  <catnip-block class=" computed number wildcard  ">           <catnip-block class=" computed wildcard number userdefined ">  <img src="/assets/icons/archive.svg" class="feather"> <span class="catnip-block-aTextLabel">pulsePhase</span>              </catnip-block>  <span class="catnip-block-aTextLabel">+</span>                  <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/tool.svg" class="feather"><span class="catnip-block-aTextLabel">time</span>     </catnip-block>  <span class="catnip-block-aTextLabel">×</span>                   <input type="text" class="catnip-block-aConstantInput number " style=" width: 2.5ch;    " value="12" readonly="readonly">     </catnip-block>      </catnip-block>      </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Set</span>         <catnip-block class=" computed number wildcard  ">  <img src="/assets/icons/droplet.svg" class="feather"><span class="catnip-block-aTextLabel">scale by x</span>     </catnip-block>  <span class="catnip-block-aTextLabel">value</span>                  <catnip-block class=" computed number wildcard  ">            <input type="text" class="catnip-block-aConstantInput number " style=" width: 1.5ch;    " value="1" readonly="readonly"> <span class="catnip-block-aTextLabel">+</span>                  <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <span class="catnip-block-aTextLabel">sin</span>         <catnip-block class=" computed wildcard number userdefined ">  <img src="/assets/icons/archive.svg" class="feather"> <span class="catnip-block-aTextLabel">pulsePhase</span>              </catnip-block>      </catnip-block>  <span class="catnip-block-aTextLabel">×</span>                   <input type="text" class="catnip-block-aConstantInput number " style=" width: 3.5ch;    " value="0.1" readonly="readonly">     </catnip-block>      </catnip-block>      </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Set</span>         <catnip-block class=" computed number wildcard  ">  <img src="/assets/icons/droplet.svg" class="feather"><span class="catnip-block-aTextLabel">scale by y</span>     </catnip-block>  <span class="catnip-block-aTextLabel">value</span>                  <catnip-block class=" computed number wildcard  ">            <input type="text" class="catnip-block-aConstantInput number " style=" width: 1.5ch;    " value="1" readonly="readonly"> <span class="catnip-block-aTextLabel">+</span>                  <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <span class="catnip-block-aTextLabel">sin</span>         <catnip-block class=" computed wildcard number userdefined ">  <img src="/assets/icons/archive.svg" class="feather"> <span class="catnip-block-aTextLabel">pulsePhase</span>              </catnip-block>      </catnip-block>  <span class="catnip-block-aTextLabel">×</span>                   <input type="text" class="catnip-block-aConstantInput number " style=" width: 3.5ch;    " value="0.1" readonly="readonly">     </catnip-block>      </catnip-block>      </catnip-block>
:::

И в событии действия Poof при нажатии добавьте следующее: `this.kill = true` ("Удалить копию" в Котомяте)

Здесь мы снова меняем свойство, которое используется внутри `Math.sin`. Мы устанавливаем копию's горизонтальный и вертикальный масштаб на синусовую волну плюс добавляем `1`, чтобы копия не сжималась в точку. (Без этого `1 +`, синусовая волна будет колебаться вокруг 0, что означает около 0% размера копии.)

Когда пользователь нажимает на экран, событие Poof при нажатии запускается, и мы удаляем копию, когда пользователь начинает манипулировать своим котом.

Последнее действие — добавить эту копию в `UI_InGame`, где-нибудь в центре видимой области.

## Анимирование фона в главном меню + эффект парцелла

Эффект парцелла используется в игровой разработке с древних времен — как только процессоры консолей стали достаточно мощными, чтобы рисовать фоны. Эффект создается за счет движения нескольких слоев фона с разными скоростями, создавая ощущение глубины. Хотя мы не добьемся výraznого эффекта в этом учебнике, мы научимся настраивать фоны в ct.js и оживить главное меню и общий вид.

Перейдите в комнату «MainMenu» и кликните по инструменту «Фон» в левой панели инструментов. Затем нажмите на иконку шестеренки рядом с фоном «BG_Sky». Нам нужно будет медленно перемещать фон с левого на правый, чтобы наши облака двигались. Установите скорость движения на -30, 0. Эти значения сообщают фону перемещаться против оси X на половину пикселя в секунду.

![Установка скорости движения фона в ct.js](../../images/tutorials/tutJettyCat_32.png)

Затем перейдите в комнату под названием «InGame». Откройте те же настройки фона «BG_Sky». Установите его значения парцелла на 0,5: это сообщит фону перемещаться в два раза медленнее, чем остальные объекты в комнате, создавая эффект глубины.

![Установка скорости движения фона в ct.js](../../images/tutorials/tutJettyCat_33.png)

Теперь у нас будет анимированное небо в главном меню, и небо в основной комнате игры будет скользить значительно медленнее, чем любой другой объект в комнате. Отлично!

## Вот и все!

Игра отполирована и выглядит аппетитно, ура! Пора читать другие руководства или создавать новую игру с нуля!

Счастливого кодинга!

