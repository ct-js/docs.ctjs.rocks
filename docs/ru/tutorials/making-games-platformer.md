# Создание игр: платформер

::: note Автоматически переведённая страница
К сожалению, на полный ручной перевод у нас не хватает ресурсов.
Если вы увидели ошибку — отправьте пул-риквест с исправлениями (ссылка для редактирования в конце страницы).
:::

В этом туториале мы создадим небольшой платформер с алмазами, контрольными точками, движущимися платформами и ловушками! Мы научимся обнаруживать столкновения, использовать их для создания бокового движения, а также манипулировать спрайтами и перемещать игрока между уровнями.

![Скриншот финальной игры](../../images/tutorials/tutPlatformer_endResult.png)

Вот что мы сделаем:

[[toc]]

## Создание проекта

Откройте файл ct.js и введите в нижнем поле стартового окна название вашего проекта – например, «Платформер». Затем нажмите кнопку «Создать» и выберите папку, в которой ct.js будет хранить проект, например, в папке «Документы».

![](../../images/tutorials/tutCommon_CreateProject.png)

## Импорт текстур

Нам понадобятся некоторые ресурсы из [пакета упрощенного платформера от Кенни](https://www.kenney.nl/assets/simplified-platformer-pack). Эти ресурсы уже включены в ct.js и имеют соответствующие имена; вы можете найти их в встроенной галерее.

Перейдите на вкладку "Assets", нажмите на "New Asset", затем нажмите кнопку "Built-in asset gallery". Найдите пакет "Simplified Platformer" от Кенни и импортируйте необходимые текстуры. Затем закройте галерею; текстуры появятся в списке текстур.

После готовности нажмите на актив "PlatformChar_Walk1".

![Редактирование полосы анимации](../../images/tutorials/tutPlatformer_02.png)

На изображении представлена маленькая горизонтальная полоска. Она состоит из одной строки и двух столбцов. Мы можем сказать ct.js, чтобы разделить изображение таким образом, установив поля "Columns" и "Rows", а затем настроив поле "Width", которое должно быть уже настроено для нас.

Полное изображение имеет ширину 172 пикселя, поэтому один кадр будет составлять 172 : 2 = 86 пикселей в ширину. Кадры робота теперь должны быть выровнены двумя прямоугольниками.

![Редактирование текстуры](../../images/tutorials/tutPlatformer_04.png)

Теперь давайте отредактируем его маску столкновения. Маски столкновения определяют, какие области изображения считаются прочными, а какие нет, и отображаются как желтый прямоугольник поверх спрайта.

Сначала смещаем его ось, чтобы расположить его в нижней средней точке.

::: tip Объяснение
Поскольку у нас есть изображение размером 86x80 пикселей, нам нужно 43 пикселя по горизонтали и 80 по вертикали. Пиксели измеряются с верхнего левого угла, а первая значение точки обычно является ее горизонтальным компонентом, или ее X-компонентом, а второе — Y-компонентом.
:::

У робота есть красивое прямоугольное тело, поэтому мы будем мудре использовать его в качестве прямоугольника. Убедитесь, что вы выбрали прямоугольную форму, нажмите кнопку "Fill" и настройте смещения, чтобы тело робота было покрыто желтым прямоугольником.

![Редактирование текстуры](../../images/tutorials/tutPlatformer_05.png)

Вы можете покрыть как тело, так и руки или выбрать только тело.

Нажмите кнопку "Save" в правом нижнем углу.

Теперь нам нужно настроить маски столкновения для "PlatformChar_Jump" и "PlatformChar_Idle" тоже. Мы можем быстро сделать это, скопировав маску столкновения для "PlatformChar_Walk1" и вставив ее в "PlatformChar_Jump" и "PlatformChar_Idle"! Убедитесь, что вы также смещаете ось на 43x80 для каждого из них.

![Копирование маски текстуры](../../images/tutorials/tutPlatformer_05_2.png)
![Вставка маски текстуры](../../images/tutorials/tutPlatformer_05_3.png)

::: tip Также хорошо установить одинаковые смещения для всех трех спрайтов, чтобы робот не врезался в поверхность при переключении анимаций и внезапно не увеличивался в размере как форма столкновения.
:::

Теперь давайте настроим формы столкновения наших кристаллов и бонусов сердца. Они могут быть определены как круги. Откройте актив "PlatformPack_Item09" (Зеленый кристалл), установите его форму столкновения как "Круг", затем нажмите кнопку "Центр изображения", чтобы ось автоматически настроилась на нужные значения, и настройте радиус формы столкновения.

Сделайте то же для актива "PlatformPack_Item17" (Сердце).

![Редактирование кристаллов](../../images/tutorials/tutPlatformer_06.png)
![Редактирование сердец](../../images/tutorials/tutPlatformer_07.png)

Последний актив, который нам нужно изменить, это "PlatformPack_Tile43" (Шпильки). Мы не должны смещать его ось, потому что он будет неправильно выровнен на карте в этом виде, но мы все еще должны настроить его форму столкновения. Установите верхний смещение отрицательным значением, чтобы верхняя часть изображения не заполнялась желтым цветом.

![Редактирование шиплков](../../images/tutorials/tutPlatformer_08.png)

Сохраните свой актив. Если вы взглянете на другие текстуры, вы увидите, что они все имеют прямоугольную форму, заполняющую весь образ; поэтому мы оставим их без изменений.

## Создание робот-персонажа и платформы

Откройте вкладку "Ассеты" и нажмите кнопку "Новый ассет". В меню выберите "Шаблон". Назовите шаблон "Робот", установите спрайт `PlatformChar_Idle` и сохраните.

![Редактирование шаблона](../../images/tutorials/tutPlatformer_09.png)

::: tip
Шаблоны используются для создания идентичных копий. Мы заполняем уровни (также называемые комнатами) копиями, и именно они взаимодействуют друг с другом на экране, но каждая копия была создана на основе определенного шаблона.
:::

Создайте дополнительные шаблоны аналогичным образом (все текстуры скал):

- `PlatformPack_Tile16`, названный "Rocks"
- `PlatformPack_Tile13`, названный "Rocks_Platform"
- `PlatformPack_Tile31`, названный "Rocks_Top"


### Добавление комнаты

Щелкните «Новый актив» еще раз и выберите «Комната» в меню. Назовите ее «Level_01» и в панели «Свойства комнаты» с иконкой шестеренки установите размер представления 1024x576.

![Редактирование комнаты](../../images/tutorials/tutPlatformer_10.png)

Затем нарисуйте свой уровень! Выберите инструмент «Добавить копии», щелкните по шаблону слева и нарисуйте их мышью в большой области справа. Не забудьте о роботе!

Вы можете расширить свой уровень во все стороны, и копии не должны находиться внутри синей рамки. Эта рамка, которая управляется размером представления, просто устанавливает видимой часть вашего уровня.

Я нарисовал это. Трудно застрять здесь как игрок, но это учит прыжку. Мы также можем добавить кристаллы на платформе из камня позже и какой-нибудь секрет в окне под последним холмом.

![Уровень платформерa Comigo](../../images/tutorials/tutPlatformer_11.png)

Теперь давайте изменим цвет фона. Нажмите инструмент «Свойства комнаты» снова и установите цвет фона на `#D0F4F7`.

![](../../images/tutorials/tutPlatformer_27.png)

Если мы сохраним проект сейчас и нажмем кнопку «Запустить» в верхней части, мы сможем увидеть небольшую часть нашего уровня, нарисованного в окне отладки. Пока ничего нельзя перемещать, но это все еще хорошее начало!

![Окно отладки с размещенными копиями и фоном](../../images/tutorials/tutPlatformer_12.png)

### Добавление модулей для клавиатуры и столкновений

Нам понадобится слушать события клавиатуры и обнаруживать столкновения между Роботом и землей. Для этих суперспособностей нам понадобятся Катмодс! Нажмите на вкладку "Проект", а затем на вкладку "Катмодс" слева. Нажмите на модуль клавиатуры в разделе доступных модулей, чтобы у него появился зеленый флажок и маленькая вращающаяся круглая точка (возможно, он уже включен!). Делайте то же самое с модулем `place`.

![Включение модуля в ct.js](../../images/tutorials/tutPlatformer_13.png)

У каждого модуля есть своя документация на вкладке "Справка". Мы позже выделим некоторые из его частей.

### Добавление действий для событий клавиатуры

Действия позволяют слушать события с клавиатуры, мыши, игрового контроллера и т. д. Более подробно о них можно прочитать [здесь](./../actions.md). С их помощью мы создадим слушатели для клавиш WASD и стрелок.

Перейдите в панель Проекта, а затем нажмите вкладку "Действия и методы ввода" слева.

Затем создайте схему ввода, как показано на следующем изображении. Для этого сначала нажмите кнопку "Создать с нуля", чтобы не использовать шаблон. Затем нажмите кнопку "Добавить действие", дайте ему название и добавьте методы ввода в правой колонке. Вы можете использовать функцию поиска, чтобы быстро добавить необходимые клавиши.

![Схема сопоставления ввода для простой платформерной игры в ct.js](../../images/tutorials/tutPlatformer_25.png)

::: tip
Хотя эта схема может быть упрощена до всего двух действий (см. [примеры на странице действий](./../actions.md#examples)), у нас будут два отдельных действия для движения влево или вправо, чтобы не усложнять учебник.
:::

Here is the translation of the provided text from English to Russian:

### Код коллизии и движения

Сейчас откройте вкладку "Шаблоны" в верхней части экрана и откройте шаблон `Rocks`. В правом столбце заполните поле "Коллиджная группа" значением `Solid`:

![Добавление группы коллизий к шаблону](../../images/tutorials/tutPlatformer_26.png)

Это расшифрует команду `place.add` в `place`, что означает, что этот шаблон принадлежит к специальной группе коллизий под названием "Solid". Имя этой группы может быть любого значения, и количество таких групп не ограничено. На данный момент одной группы достаточно.

Добавьте ту же строку в шаблоны `Rocks_Top` и `Rocks_Platform`.

Теперь откройте шаблон `Robot`. Если вы ранее прошли руководство "Space Shooter", вы можете вспомнить, что движение достигалось либо прямым манипулированием параметрами копии, либо использованием встроенных переменных, таких как `this.speed` или `this.direction`. Правда, эти не работали с платформером, даже вне ct.js! Нам нужно написать что-то более сложное. Готовьтесь! 😃

Идея бокового движения заключается в том, чтобы установить значение, к которому мы хотим двигаться, а затем проверить, есть ли препятствия на каждом шаге.

Давайте установим некоторые переменные на событии "Создание". Нажмите на "Добавить событие" для вызова меню событий и найдите событие "Создание", затем добавьте:

::: tabs#tutorial
@tab JavaScript
```js
this.jumpSpeed = -600;
this.gravity = 1800;

this.hspeed = 0; // Horizontal speed
this.vspeed = 0; // Vertical speed
```
@tab CoffeeScript
```coffee
@jumpSpeed = -600
@gravity = 1800
@hspeed = 0 # Horizontal speed
@vspeed = 0 # Vertical speed
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Set</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/archive.svg" class="feather"> <span class="catnip-block-aTextLabel">jumpSpeed</span>              </catnip-block>  <span class="catnip-block-aTextLabel">value</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " value="-600" style=" width: 4.5ch;    " readonly="readonly">     </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Set gravity to</span>          <input type="text" class="catnip-block-aConstantInput number " style=" width: 4.5ch;    " value="1800" readonly="readonly">     </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Set horizontal speed to</span>          <input type="text" class="catnip-block-aConstantInput number " style=" width: 1.5ch;    " value="0" readonly="readonly">     </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Set vertical speed to</span>          <input type="text" class="catnip-block-aConstantInput number " style=" width: 1.5ch;    " value="0" readonly="readonly">     </catnip-block>
:::

::: tip
`this` - это копия, которая выполняет написанный код. В нашем случае это `Robot`.
:::

Теперь перейдите на вкладку "Начало кадра". Удалите строку `this.move();`, а добавьте следующий код:

::: tabs#tutorial
@tab JavaScript
```js
this.movespeed = 240; // Max horizontal speed

if (actions.MoveLeft.down) {
    // If the A key or left arrow on a keyboard is down, then move to left
    this.hspeed = -this.movespeed;
} else if (actions.MoveRight.down) {
    // If the D key or right arrow on a keyboard is down, then move to right
    this.hspeed = this.movespeed;
} else {
    // Don't move horizontally if no input
    this.hspeed = 0;
}

// If there is ground underneath the Robot…
if (place.occupied(this, this.x, this.y + 1, 'Solid')) {
    // …and the W key or the spacebar is down…
    if (actions.Jump.down) {
        // …then jump!
        this.vspeed = this.jumpSpeed;
    } else {
        // Reset our vspeed. We don't want to be buried underground!
        this.vspeed = 0;
    }
}
```
@tab CoffeeScript
```coffee
@movespeed = 240 # Max horizontal speed

if actions.MoveLeft.down
    # If the A key or left arrow on a keyboard is down, then move to left
    @hspeed = -@movespeed
else if actions.MoveRight.down
    # If the D key or right arrow on a keyboard is down, then move to right
    @hspeed = @movespeed
else
    # Don't move horizontally if no input
    @hspeed = 0

# If there is ground underneath the Robot…
if place.occupied(this, @x, @y + 1, 'Solid')
    # …and the W key or the spacebar is down…
    if actions.Jump.down
        # …then jump!
        @vspeed = @jumpSpeed
    else
        # Reset our vspeed. We don't want to be buried underground!
        @vspeed = 0
```
@tab Catnip
<catnip-block class=" command   note selected">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Max horizontal speed" style="height: 21px;" readonly="readonly"></textarea>         </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Set</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/archive.svg" class="feather"> <span class="catnip-block-aTextLabel">movespeed</span>              </catnip-block>  <span class="catnip-block-aTextLabel">value</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " value="240" style=" width: 3.5ch;    " readonly="readonly">     </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed boolean boolean  ">  <img src="/assets/icons/airplay.svg" class="feather"><span class="catnip-block-aTextLabel">is action down</span>          <span class="catnip-block-aConstantInput menu string ">  <img src="/assets/icons/airplay.svg" class="feather"> <span>MoveLeft</span></span>     </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command   note ">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="If the A key or left arrow on a keyboard is down, then move to left" style="height: 37px;" readonly="readonly"></textarea>         </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Set horizontal speed to</span>         <catnip-block class=" computed number number  ">           <catnip-block class=" computed wildcard number userdefined ">  <img src="/assets/icons/archive.svg" class="feather"> <span class="catnip-block-aTextLabel">movespeed</span>              </catnip-block>  <span class="catnip-block-aTextLabel">×</span>                   <input type="text" class="catnip-block-aConstantInput number " value="-1" style=" width: 2.5ch;    " readonly="readonly">     </catnip-block>      </catnip-block>   <catnip-block class=" command   note ">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Set the walking animation and transform the robot to the left" style="height: 37px;" readonly="readonly"></textarea>         </catnip-block>    </catnip-block-list> </div>     <img src="/assets/icons/alert-circle.svg" class="feather">         <span class="catnip-block-aTextLabel">Else</span>                <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed boolean boolean  ">  <img src="/assets/icons/airplay.svg" class="feather"><span class="catnip-block-aTextLabel">is action down</span>          <span class="catnip-block-aConstantInput menu string ">  <img src="/assets/icons/airplay.svg" class="feather"> <span>MoveRight</span></span>     </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command   note ">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="If the D key or right arrow on a keyboard is down, then move to right" style="height: 37px;" readonly="readonly"></textarea>         </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Set horizontal speed to</span>         <catnip-block class=" computed wildcard number userdefined ">  <img src="/assets/icons/archive.svg" class="feather"> <span class="catnip-block-aTextLabel">movespeed</span>              </catnip-block>      </catnip-block>   <catnip-block class=" command   note ">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Set the walking animation and transform the robot to the right" style="height: 37px;" readonly="readonly"></textarea>         </catnip-block>    </catnip-block-list> </div>     <img src="/assets/icons/alert-circle.svg" class="feather">         <span class="catnip-block-aTextLabel">Else</span>                <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command   note ">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Don't move horizontally if no input" style="height: 21px;" readonly="readonly"></textarea>         </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Set horizontal speed to</span>          <input type="text" class="catnip-block-aConstantInput number " value="0" style=" width: 1.5ch;    " readonly="readonly">     </catnip-block>    </catnip-block-list> </div>        </catnip-block>    </catnip-block-list> </div>        </catnip-block>

<catnip-block class=" command   note selected">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="If there is ground underneath the Robot…" style="height: 21px;" readonly="readonly"></textarea>         </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed wildcard boolean  ">  <img src="/assets/icons/copy.svg" class="feather"><span class="catnip-block-aTextLabel">place occupied</span>         <catnip-block class=" computed wildcard wildcard constant ">  <img src="/assets/icons/crosshair.svg" class="feather"><span class="catnip-block-aTextLabel">this</span>     </catnip-block>          <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">x</span>     </catnip-block>          <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">y</span>     </catnip-block>  <span class="catnip-block-aTextLabel">+</span>                   <input type="text" class="catnip-block-aConstantInput number " value="1" style=" width: 1.5ch;    " readonly="readonly">     </catnip-block>           <input type="text" class="catnip-block-aConstantInput string " value="Solid" style=" width: 5.5ch;    " readonly="readonly">     </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command   note ">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="…and the W key or the spacebar is down…" style="height: 21px;" readonly="readonly"></textarea>         </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed boolean boolean  ">  <img src="/assets/icons/airplay.svg" class="feather"><span class="catnip-block-aTextLabel">is action down</span>          <span class="catnip-block-aConstantInput menu string ">  <img src="/assets/icons/airplay.svg" class="feather"> <span>Jump</span></span>     </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command   note ">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="…then jump!" style="height: 21px;" readonly="readonly"></textarea>         </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Set vertical speed to</span>         <catnip-block class=" computed wildcard number userdefined ">  <img src="/assets/icons/archive.svg" class="feather"> <span class="catnip-block-aTextLabel">jumpSpeed</span>              </catnip-block>      </catnip-block>    </catnip-block-list> </div>     <img src="/assets/icons/alert-circle.svg" class="feather">         <span class="catnip-block-aTextLabel">Else</span>                <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command   note ">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Reset our vspeed. We don't want to be buried underground!" style="height: 37px;" readonly="readonly"></textarea>         </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Set vertical speed to</span>          <input type="text" class="catnip-block-aConstantInput number " value="0" style=" width: 1.5ch;    " readonly="readonly">     </catnip-block>    </catnip-block-list> </div>        </catnip-block>    </catnip-block-list> </div>     <img src="/assets/icons/alert-circle.svg" class="feather">         <span class="catnip-block-aTextLabel">Else</span>                <div class="catnip-block-Blocks"> <catnip-block-list> <div class="catnip-block-aBlockPlaceholder"> <img src="/assets/icons/thumbs-up.svg" class="feather"><span class="catnip-block-aTextLabel">Do nothing</span>  </div>   </catnip-block-list> </div>        </catnip-block>
:::

::: tip
"Frame start" выполняется каждый кадр для каждой копии. Движение и другая игровая логика обычно идут здесь.
:::

::: tip
`actions.YourAction.down` проверяет, удерживается ли какая-либо из указанных вами клавиш в данном действии. Также есть `actions.YourAction.pressed` и `actions.YourAction.released`.

`place.occupied(copy, x, y, group)` проверяет наличие столкновений с данной копией в заданных координатах с конкретной группой. Если группа не нужна, вы можете обойтись без нее. Этот метод возвращает либо `false` (нет столкновения), либо первую копию, которая столкнулась с другой.
:::

Это установит переменные `hspeed` и `vspeed`, но они ничего не сделают сами по себе. Также мы не хотим задеть стену или двигаться, когда мы рядом с «Solid». К счастью, мы можем добавить эту волшебную строку в конец, чтобы персонаж правильно сталкивался с твердыми объектами:

::: tabs#tutorial
@tab JavaScript
```js
this.moveSmart('Solid');
```
@tab CoffeeScript
```coffee
@moveSmart 'Solid'
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Move this copy stopping at</span>          <input type="text" class="catnip-block-aConstantInput string " style=" width: 5.5ch;    " value="Solid" readonly="readonly">   <div class="catnip-block-aFiller"></div>        <span class="catnip-block-aTextLabel">store in</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " style=" width: 6.5ch;    " readonly="readonly">     </catnip-block>
:::

::: tip
`moveSmart` — метод из модуля `place`, который постепенно перемещает копию пиксель за пикселем, останавливаясь рядом с препятствиями. Это отлично подходит для платформеров и когда нужны точные скольжения.
:::

Теперь мы можем перемещать нашего Робота!

::: warning
Ваш персонаж может игнорировать ямы шириной в одну клетку. Проверьте это. Если это происходит, вам нужно немного стройнее сделать коллизионные формы Робота.
:::

### Сделать так, чтобы камера следовала за роботом

Если мы запустим игру сейчас, мы сможем перемещать Робота. Однако есть одна проблема: камера не двигается!

Это не такая уж и большая проблема. Если мы изучим документацию ct.js, мы найдем сущность [`камера`](camera.md) с такими параметрами `камера.следовать`, `камера.границаX` и `камера.границаY`, которые позволяют устанавливать следование за копией.

Откройте шаблон "Робот" и его код создания. Добавьте следующий код в конец:

::: tabs#tutorial
@tab JavaScript
```js
camera.follow = this;
camera.borderX = 450;
camera.borderY = 200;
```
@tab CoffeeScript
```coffee
camera.follow = this
camera.borderX = 450
camera.borderY = 200
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/camera.svg" class="feather"><span class="catnip-block-aTextLabel">Follow this copy</span>     </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/camera.svg" class="feather"><span class="catnip-block-aTextLabel">Set horizontal borders for following to</span>          <input type="text" class="catnip-block-aConstantInput number " style=" width: 3.5ch;    " value="450" readonly="readonly">     </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/camera.svg" class="feather"><span class="catnip-block-aTextLabel">Set vertical borders for following to</span>          <input type="text" class="catnip-block-aConstantInput number " style=" width: 3.5ch;    " value="200" readonly="readonly">     </catnip-block>
:::

Теперь камера будет следовать за роботом.

## Добавление ловушек и чекпоинтов

Мы добавим смертельные ловушки и водные преграды, а также чекпоинты, чтобы игрок перезапускался с этих точек, а не с начала уровня.

Создайте новые шаблоны для следующих активов:
- `PlatformPack_Tile17`, названный `Water`;
- `PlatformPack_Tile05`, названный `Water_Top`;
- `PlatformPack_Tile43`, названный `Spikes`;
- `PlatformPack_Tile21`, названный `Checkpoint`.

Создайте новую комнату и назовите ее `Level_02`. Установите ее размер 1024x576 и сделайте фон снова `#D0F4F7`. Создайте опасный уровень с шипами и прудами.

Поставьте точки чекпоинта до и/или после опасных участков. Не стесняйтесь поставить их много, потому что наказывать игрока за ошибки никогда не бывает хорошей идеей! 😉

![Comigo's second level](../../images/tutorials/tutPlatformer_16.png)

Здесь предполагаемый конец уровня находится в центре верхней платформы. Я также поместил некоторые платформы снаружи снимка для сбора будущих кристаллов.

Теперь давайте поговорим о шаблоне `Block`.

Мы будем проверять столкновение с роботом, и когда это происходит, мы сохраним точку восстановления внутри копии робота. Создайте новое событие «Коллизия с шаблоном» и выберите Робота. Затем добавьте следующий код в событие:

::: tabs#tutorial
@tab JavaScript
```js
other.savedX = this.x + 32;
other.savedY = this.y + 32;
```
@tab CoffeeScript
```coffee
other.savedX = @x + 32
other.savedY = @y + 32
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Write</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/bell.svg" class="feather"> <span class="catnip-block-aTextLabel">other</span>              </catnip-block>  <span class="catnip-block-aTextLabel">property</span>                   <input type="text" class="catnip-block-aConstantInput string " value="savedX" style=" width: 6.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">value</span>                  <catnip-block class=" computed number wildcard  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">x</span>     </catnip-block>  <span class="catnip-block-aTextLabel">+</span>                   <input type="text" class="catnip-block-aConstantInput number " value="32" style=" width: 2.5ch;    " readonly="readonly">     </catnip-block>      </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Write</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/bell.svg" class="feather"> <span class="catnip-block-aTextLabel">other</span>              </catnip-block>  <span class="catnip-block-aTextLabel">property</span>                   <input type="text" class="catnip-block-aConstantInput string " style=" width: 6.5ch;    " value="savedY" readonly="readonly"> <span class="catnip-block-aTextLabel">value</span>                  <catnip-block class=" computed number wildcard  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">y</span>     </catnip-block>  <span class="catnip-block-aTextLabel">+</span>                   <input type="text" class="catnip-block-aConstantInput number " value="32" style=" width: 2.5ch;    " readonly="readonly">     </catnip-block>      </catnip-block>
:::

:: tip
Событие «Коллизия с шаблоном» имеет специальную переменную, которую можно использовать в коде события, называемую `other`. Эта переменная хранит ссылку на столкнувшийся экземпляр, который в данном случае является роботом. Будьте внимательны к этим местным специальным переменным при написании событийного кода!
:::

Здесь мы также смещаем сохраненную точку на 32x32 пикселей, потому что ось контрольной точки находится в ее верхнем левом углу, а ось робота находится в среднем нижнем пункте. Из-за этого робот будет перезапущен чуть левее и выше желаемой центральной точки.

Мы хотим сделать контрольные точки невидимыми во время игры. Откройте раздел «Внешний вид» справа и отключите флажок «Видим».

![Сделать контрольную точку невидимой](../../images/tutorials/tutPlatformer_CheckpointVisible.png)

Теперь перейдем к шаблону `Крюки` и установим их столкновение как «Убивающее» в правой колонке, в разделе «Коллизия группы».

Тот же код примените к шаблонам `Вода` и `Вода_Верхний`.

Теперь откройте снова шаблон `Робот`, и добавьте новое событие «Коллизия с группой». В имени группы используйте «Убивающее». Затем в коде события добавьте следующее:

::: tabs#tutorial
@tab JavaScript
```js
this.x = this.savedX;
this.y = this.savedY;
this.hspeed = 0;
this.vspeed = 0;
```
@tab CoffeeScript
```coffee
@x = @savedX
@y = @savedY
@hspeed = 0
@vspeed = 0
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Set x to</span>         <catnip-block class=" computed wildcard number  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">read</span>          <input type="text" class="catnip-block-aConstantInput string " value="savedX" style=" width: 6.5ch;    " readonly="readonly">     </catnip-block>      </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Set y to</span>         <catnip-block class=" computed wildcard number  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">read</span>          <input type="text" class="catnip-block-aConstantInput string " value="savedY" style=" width: 6.5ch;    " readonly="readonly">     </catnip-block>      </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Set horizontal speed to</span>          <input type="text" class="catnip-block-aConstantInput number " value="0" style=" width: 1.5ch;    " readonly="readonly">     </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Set vertical speed to</span>          <input type="text" class="catnip-block-aConstantInput number " value="0" style=" width: 1.5ch;    " readonly="readonly">     </catnip-block>
:::

Мы также должны написать этот код для события "Создание", чтобы по умолчанию точка возрождения находилась в месте создания, на случай, если что-то пойдет не так:


::: tabs#tutorial
@tab JavaScript
```js
this.savedX = this.x;
this.savedY = this.y;
```
@tab CoffeeScript
```coffee
@savedX = @x
@savedY = @y
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Write</span>          <input type="text" class="catnip-block-aConstantInput string " style=" width: 6.5ch;    " value="savedX" readonly="readonly"> <span class="catnip-block-aTextLabel">value</span>                  <catnip-block class=" computed number wildcard  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">x</span>     </catnip-block>      </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Write</span>          <input type="text" class="catnip-block-aConstantInput string " style=" width: 6.5ch;    " value="savedY" readonly="readonly"> <span class="catnip-block-aTextLabel">value</span>                  <catnip-block class=" computed number wildcard  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">y</span>     </catnip-block>      </catnip-block>
:::

Для тестирования конкретной комнаты откройте вкладку «Ассеты» вверху, затем щелкните правой кнопкой мыши по нужной комнате и выберите «Установить в качестве начальной комнаты».

## Трансформация и анимация робота

На этом этапе будет мудро добавить несколько анимаций к нашему роботу. Как вы помните, у нас есть три разных ассета под названием `PlatformChar_Idle`, `PlatformChar_Jump` и `PlatformChar_Walk1`.

Добавьте эту строку в код "Создание" робота:

::: tabs#tutorial
@tab JavaScript
```js
this.animationSpeed = 0.2;
```
@tab CoffeeScript
```coffee
@animationSpeed = 0.2
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">Set animation speed to</span>          <input type="text" class="catnip-block-aConstantInput number " style=" width: 3.5ch;    " value="0.2" readonly="readonly">     </catnip-block>
:::

`0,2` означает, что мы хотим воспроизводить 0,2×60 (что составляет 12) кадров в секунду. Для большей читаемости мы также можем записать это как `12/60`.

Откройте код "Frame start" робота и измените раздел движения так, чтобы текстура, которая отображается, зависела от ввода пользователя и положения робота в пространстве:


::: tabs#tutorial
@tab JavaScript
```js {6,7,8,9,10,11,15,16,17,18,19,20,24,38,39,40}
this.movespeed = 240; // Max horizontal speed

if (actions.MoveLeft.down) {
    // If the A key or left arrow on a keyboard is down, then move to left
    this.hspeed = -this.movespeed;
    // Set the walking animation and transform the robot to the left
    if (this.tex !== 'PlatformChar_Walk1') {
        this.tex = 'PlatformChar_Walk1';
        this.play();
    }
    this.scale.x = -1;
} else if (actions.MoveRight.down) {
    // If the D key or right arrow on a keyboard is down, then move to right
    this.hspeed = this.movespeed;
    // Set the walking animation and transform the robot to the right
    if (this.tex !== 'PlatformChar_Walk1') {
        this.tex = 'PlatformChar_Walk1';
        this.play();
    }
    this.scale.x = 1;
} else {
    // Don't move horizontally if no input
    this.hspeed = 0;
    this.tex = 'PlatformChar_Idle';
}

// If there is ground underneath the Robot…
if (place.occupied(this, this.x, this.y + 1, 'Solid')) {
    // …and the W key or the spacebar is down…
    if (actions.Jump.down) {
        // …then jump!
        this.vspeed = this.jumpSpeed;
    } else {
        // Reset our vspeed. We don't want to be buried underground!
        this.vspeed = 0;
    }
} else {
    // If there is no ground
    // Set jumping animation!
    this.tex = 'PlatformChar_Jump';
}

this.moveSmart('Solid');
```
@tab CoffeeScript
```coffee {7,8,9,15,16,17,22,34,35,36}
@movespeed = 240 # Max horizontal speed

if actions.MoveLeft.down
    # If the A key or left arrow on a keyboard is down, then move to left
    @hspeed = -@movespeed
    # Set the walking animation and transform the robot to the left
    if @tex isnt 'PlatformChar_Walk1'
        @tex = 'PlatformChar_Walk1'
        @play()
    @scale.x = -1
else if actions.MoveRight.down
    # If the D key or right arrow on a keyboard is down, then move to right
    @hspeed = @movespeed
    # Set the walking animation and transform the robot to the right
    if @tex isnt 'PlatformChar_Walk1'
        @tex = 'PlatformChar_Walk1'
        @play()
    @scale.x = 1
else
    # Don't move horizontally if no input
    @hspeed = 0
    @tex = 'PlatformChar_Idle'

# If there is ground underneath the Robot…
if place.occupied(this, @x, @y + 1, 'Solid')
    # …and the W key or the spacebar is down…
    if actions.Jump.down
        # …then jump!
        @vspeed = @jumpSpeed
    else
        # Reset our vspeed. We don't want to be buried underground!
        @vspeed = 0
else
    # If there is no ground
    # Set jumping animation!
    @tex = 'PlatformChar_Jump'

@moveSmart 'Solid'
```
@tab Catnip
<catnip-block class=" command   note selected">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Max horizontal speed" style="height: 21px;" readonly="readonly"></textarea>         </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Set</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/archive.svg" class="feather"> <span class="catnip-block-aTextLabel">movespeed</span>              </catnip-block>  <span class="catnip-block-aTextLabel">value</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " value="240" style=" width: 3.5ch;    " readonly="readonly">     </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed boolean boolean  ">  <img src="/assets/icons/airplay.svg" class="feather"><span class="catnip-block-aTextLabel">is action down</span>          <span class="catnip-block-aConstantInput menu string ">  <img src="/assets/icons/airplay.svg" class="feather"> <span>MoveLeft</span></span>     </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command   note ">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="If the A key or left arrow on a keyboard is down, then move to left" style="height: 37px;" readonly="readonly"></textarea>         </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Set horizontal speed to</span>         <catnip-block class=" computed number number  ">           <catnip-block class=" computed wildcard number userdefined ">  <img src="/assets/icons/archive.svg" class="feather"> <span class="catnip-block-aTextLabel">movespeed</span>              </catnip-block>  <span class="catnip-block-aTextLabel">×</span>                   <input type="text" class="catnip-block-aConstantInput number " value="-1" style=" width: 2.5ch;    " readonly="readonly">     </catnip-block>      </catnip-block>   <catnip-block class=" command   note ">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Set the walking animation and transform the robot to the left" style="height: 37px;" readonly="readonly"></textarea>         </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed boolean boolean  ">           <catnip-block class=" computed string wildcard  ">  <img src="/assets/icons/droplet.svg" class="feather"><span class="catnip-block-aTextLabel">get texture</span>     </catnip-block>  <span class="catnip-block-aTextLabel">is not</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " value="PlatformChar_Walk1" style=" width: 18.5ch;    " readonly="readonly">     </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/droplet.svg" class="feather"><span class="catnip-block-aTextLabel">Set texture to</span>          <span class="catnip-block-aConstantInput menu string ">   <img src="/assets/icons/image.svg" class="feather"><span>PlatformChar_Walk1</span></span>     </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">Play animation</span>     </catnip-block>    </catnip-block-list> </div>        </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/droplet.svg" class="feather"><span class="catnip-block-aTextLabel">Set scale to</span>          <input type="text" class="catnip-block-aConstantInput number " value="-1" style=" width: 2.5ch;    " readonly="readonly">          <input type="text" class="catnip-block-aConstantInput number " value="1" style=" width: 1.5ch;    " readonly="readonly">     </catnip-block>    </catnip-block-list> </div>     <img src="/assets/icons/alert-circle.svg" class="feather">         <span class="catnip-block-aTextLabel">Else</span>                <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed boolean boolean  ">  <img src="/assets/icons/airplay.svg" class="feather"><span class="catnip-block-aTextLabel">is action down</span>          <span class="catnip-block-aConstantInput menu string ">  <img src="/assets/icons/airplay.svg" class="feather"> <span>MoveRight</span></span>     </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command   note ">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="If the D key or right arrow on a keyboard is down, then move to right" style="height: 37px;" readonly="readonly"></textarea>         </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Set horizontal speed to</span>         <catnip-block class=" computed wildcard number userdefined ">  <img src="/assets/icons/archive.svg" class="feather"> <span class="catnip-block-aTextLabel">movespeed</span>              </catnip-block>      </catnip-block>   <catnip-block class=" command   note ">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Set the walking animation and transform the robot to the right" style="height: 37px;" readonly="readonly"></textarea>         </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed boolean boolean  ">           <catnip-block class=" computed string wildcard  ">  <img src="/assets/icons/droplet.svg" class="feather"><span class="catnip-block-aTextLabel">get texture</span>     </catnip-block>  <span class="catnip-block-aTextLabel">is not</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " value="PlatformChar_Walk1" style=" width: 18.5ch;    " readonly="readonly">     </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/droplet.svg" class="feather"><span class="catnip-block-aTextLabel">Set texture to</span>          <span class="catnip-block-aConstantInput menu string ">   <img src="/assets/icons/image.svg" class="feather"><span>PlatformChar_Walk1</span></span>     </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">Play animation</span>     </catnip-block>    </catnip-block-list> </div>        </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/droplet.svg" class="feather"><span class="catnip-block-aTextLabel">Set scale to</span>          <input type="text" class="catnip-block-aConstantInput number " value="1" style=" width: 1.5ch;    " readonly="readonly">          <input type="text" class="catnip-block-aConstantInput number " value="1" style=" width: 1.5ch;    " readonly="readonly">     </catnip-block>    </catnip-block-list> </div>     <img src="/assets/icons/alert-circle.svg" class="feather">         <span class="catnip-block-aTextLabel">Else</span>                <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command   note ">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Don't move horizontally if no input" style="height: 21px;" readonly="readonly"></textarea>         </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Set horizontal speed to</span>          <input type="text" class="catnip-block-aConstantInput number " value="0" style=" width: 1.5ch;    " readonly="readonly">     </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/droplet.svg" class="feather"><span class="catnip-block-aTextLabel">Set texture to</span>          <span class="catnip-block-aConstantInput menu string ">   <img src="/assets/icons/image.svg" class="feather"><span>PlatformChar_Idle</span></span>     </catnip-block>    </catnip-block-list> </div>        </catnip-block>    </catnip-block-list> </div>        </catnip-block>

<catnip-block class=" command   note selected">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="If there is ground underneath the Robot…" style="height: 21px;" readonly="readonly"></textarea>         </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed wildcard boolean  ">  <img src="/assets/icons/copy.svg" class="feather"><span class="catnip-block-aTextLabel">place occupied</span>         <catnip-block class=" computed wildcard wildcard constant ">  <img src="/assets/icons/crosshair.svg" class="feather"><span class="catnip-block-aTextLabel">this</span>     </catnip-block>          <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">x</span>     </catnip-block>          <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">y</span>     </catnip-block>  <span class="catnip-block-aTextLabel">+</span>                   <input type="text" class="catnip-block-aConstantInput number " value="1" style=" width: 1.5ch;    " readonly="readonly">     </catnip-block>           <input type="text" class="catnip-block-aConstantInput string " value="Solid" style=" width: 5.5ch;    " readonly="readonly">     </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command   note ">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="…and the W key or the spacebar is down…" style="height: 21px;" readonly="readonly"></textarea>         </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed boolean boolean  ">  <img src="/assets/icons/airplay.svg" class="feather"><span class="catnip-block-aTextLabel">is action down</span>          <span class="catnip-block-aConstantInput menu string ">  <img src="/assets/icons/airplay.svg" class="feather"> <span>Jump</span></span>     </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command   note ">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="…then jump!" style="height: 21px;" readonly="readonly"></textarea>         </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Set vertical speed to</span>         <catnip-block class=" computed wildcard number userdefined ">  <img src="/assets/icons/archive.svg" class="feather"> <span class="catnip-block-aTextLabel">jumpSpeed</span>              </catnip-block>      </catnip-block>    </catnip-block-list> </div>     <img src="/assets/icons/alert-circle.svg" class="feather">         <span class="catnip-block-aTextLabel">Else</span>                <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command   note ">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Reset our vspeed. We don't want to be buried underground!" style="height: 37px;" readonly="readonly"></textarea>         </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Set vertical speed to</span>          <input type="text" class="catnip-block-aConstantInput number " value="0" style=" width: 1.5ch;    " readonly="readonly">     </catnip-block>    </catnip-block-list> </div>        </catnip-block>    </catnip-block-list> </div>     <img src="/assets/icons/alert-circle.svg" class="feather">         <span class="catnip-block-aTextLabel">Else</span>                <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command   note ">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="If there is no ground, set jumping animation!" style="height: 21px;" readonly="readonly"></textarea>         </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/droplet.svg" class="feather"><span class="catnip-block-aTextLabel">Set texture to</span>          <span class="catnip-block-aConstantInput menu string ">   <img src="/assets/icons/image.svg" class="feather"><span>PlatformChar_Jump</span></span>     </catnip-block>    </catnip-block-list> </div>        </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Move this copy stopping at</span>          <input type="text" class="catnip-block-aConstantInput string " value="Solid" style=" width: 5.5ch;    " readonly="readonly">   <div class="catnip-block-aFiller"></div>        <span class="catnip-block-aTextLabel">store in</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " style=" width: 6.5ch;    " readonly="readonly">     </catnip-block>
:::

По мере того как наша вертикальная движение не зависит от горизонтального, анимация переопределяется в прыжковом состоянии, если под роботом нет земли.

Робот теперь будет перевернуться в текущем направлении и изменить текстуру в зависимости от движения. Посмотри на этого мальчика!

![Анимационный робот](../../images/tutorials/tutPlatformer_Animating.gif)

## Добавление переходов между уровнями

Задумка такая:

- Каждая комната будет хранить имя следующей комнаты в качестве переменной.
- Будут выходы на уровень, которые будут сталкиваться с Роботом.
- Когда они сталкиваются, выход читает переменную комнаты и переходит к следующей комнате.

Создайте новый шаблон и назовите его "Exit". Установите его текстуру. Затем создайте событие "Коллизия" для Робота и напишите следующий код:

::: tabs#tutori
::: tabs#tutorial
@tab JavaScript
```js
// Is the next room defined?
if (rooms.current.nextRoom) {
    // Switch to the next room
    rooms.switch(rooms.current.nextRoom);
}
```
@tab CoffeeScript
```coffee
# Is the next room defined?
if rooms.current.nextRoom
    # Switch to the next room
    rooms.switch rooms.current.nextRoom
```
@tab Catnip
<catnip-block class=" command   note selected">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Is the next room defined?" style="height: 21px;" readonly="readonly"></textarea>         </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed boolean boolean  ">  <img src="/assets/icons/bool.svg" class="feather"><span class="catnip-block-aTextLabel">to boolean</span>         <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">read</span>          <input type="text" class="catnip-block-aConstantInput string " value="nextRoom" style=" width: 8.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">from</span>                  <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/room.svg" class="feather"><span class="catnip-block-aTextLabel">current room</span>     </catnip-block>      </catnip-block>      </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command   note ">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Switch to the next room" style="height: 21px;" readonly="readonly"></textarea>         </catnip-block>   <catnip-block class=" command void   ">  <img src="/assets/icons/room.svg" class="feather"><span class="catnip-block-aTextLabel">Switch to</span>         <catnip-block class=" computed wildcard string  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">read</span>          <input type="text" class="catnip-block-aConstantInput string " value="nextRoom" style=" width: 8.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">from</span>                  <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/room.svg" class="feather"><span class="catnip-block-aTextLabel">current room</span>     </catnip-block>      </catnip-block>      </catnip-block>    </catnip-block-list> </div>        </catnip-block>
:::

::: tip
Здесь `rooms.current` указывает на текущую комнату. Функция `rooms.switch` выходит из текущей комнаты и переходит к другой комнате с указанным именем.
:::

Теперь перейдите на вкладку "Ассеты", откройте уровень `Level_01`, нажмите кнопку "Events" и введите следующий код в поле "Room start":

::: tabs#tutorial
@tab JavaScript
```js
this.nextRoom = 'Level_02';
```
@tab CoffeeScript
```coffee
@nextRoom = 'Level_02'
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Set</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/archive.svg" class="feather"> <span class="catnip-block-aTextLabel">nextRoom</span>              </catnip-block>  <span class="catnip-block-aTextLabel">value</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " style=" width: 8.5ch;    " value="Level_02" readonly="readonly">     </catnip-block>
:::

Поместите выход в комнату.

Сохраните комнату и пометьте `Level_01` как стартовую комнату, щелкнув правой кнопкой мыши на нее и протестируйте переход.

::: tip Самостоятельно!
Создайте дополнительные выходы, ведущие к секретным подуровням и обратно. Получите больше [ассетов отсюда](https://www.kenney.nl/assets/simplified-platformer-pack), если вам это нужно.
:::

## Коллекционные предметы: подсчет и отображение

### Добавление кристаллов

Создайте новый шаблон под названием `GreenCrystal` и установите его спрайт. Создайте событие «Коллизия Робота» для текущего комнаты и напишите следующий код:

::: tabs#tutorial
@tab JavaScript
```js
rooms.current.crystals ++;
this.kill = true;
```
@tab CoffeeScript
```coffee
rooms.current.crystals++
@kill = true
```
@tab Catnip
<catnip-block class=" command void   selected">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">With copy</span>         <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/room.svg" class="feather"><span class="catnip-block-aTextLabel">current room</span>     </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Write</span>          <input type="text" class="catnip-block-aConstantInput string " value="crystals" style=" width: 8.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">value</span>                  <catnip-block class=" computed number wildcard  ">           <catnip-block class=" computed wildcard number  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">read</span>          <input type="text" class="catnip-block-aConstantInput string " value="crystals" style=" width: 8.5ch;    " readonly="readonly">     </catnip-block>  <span class="catnip-block-aTextLabel">+</span>                   <input type="text" class="catnip-block-aConstantInput number " value="1" style=" width: 1.5ch;    " readonly="readonly">     </catnip-block>      </catnip-block>    </catnip-block-list> </div>        </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">Destroy this copy</span>     </catnip-block>
:::

::: tip
`this.kill = true;` (Destroy this copy) указывает, что текущая копия должна быть удалена из текущей комнаты. Это произойдет после всех событий «Начало кадра», но до события «Конец кадра».
:::

Как вы, возможно, уже догадались, количество собранных кристаллов будет храниться в комнате.

Но если мы продолжим добавлять больше функций в коды, специфичные для комнат, мы скоро попадем в ловушку багов из-за забывчивости при копировании и вставке фрагментов кода. Кстати, это будет скучная работа для третьей комнаты. (И у нас обязательно будет третья комната!)

Так что нам нужно создавать повторяющиеся функции сейчас. Это может показаться странным, но на самом деле это не так сложно.

Создайте новый ассет и на этот раз выберите «Поведения». Затем выберите поведение для комнат и назовите его `inGameRoomStart`. Это позволит нам писать код, который затем можно применять к многим комнатам без необходимости повторять код!

Поведения для комнат имеют такие же события, как и комнаты. Создайте событие «Начало комнаты» и напишите следующий код:


::: tabs#tutorial
@tab JavaScript
```js
rooms.current.crystals = 0;
rooms.current.crystalsTotal = templates.list['GreenCrystal'].length;
```
@tab CoffeeScript
```coffee
rooms.current.crystals = 0
rooms.current.crystalsTotal = templates.list['GreenCrystal'].length
```
@tab Catnip
<catnip-block class=" command void   selected">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">With copy</span>         <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/room.svg" class="feather"><span class="catnip-block-aTextLabel">current room</span>     </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Write</span>          <input type="text" class="catnip-block-aConstantInput string " style=" width: 8.5ch;    " value="crystals" readonly="readonly"> <span class="catnip-block-aTextLabel">value</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " style=" width: 1.5ch;    " value="0" readonly="readonly">     </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Write</span>          <input type="text" class="catnip-block-aConstantInput string " style=" width: 13.5ch;    " value="crystalsTotal" readonly="readonly"> <span class="catnip-block-aTextLabel">value</span>                  <catnip-block class=" computed number wildcard  ">  <img src="/assets/icons/grid.svg" class="feather"><span class="catnip-block-aTextLabel">length of</span>         <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">templates list</span>          <span class="catnip-block-aConstantInput menu wildcard ">   <img src="/assets/icons/image.svg" class="feather"><span>GreenCrystal</span></span>     </catnip-block>      </catnip-block>      </catnip-block>    </catnip-block-list> </div>        </catnip-block>
:::

::: tip
`templates.list['TemplateName']` возвращает массив всех копий данного шаблона в комнате. `length` возвращает длину массива.
:::

![Создание повторно используемого скрипта](../../images/tutorials/tutPlatformer_21.png)

Теперь перейдите в каждую комнату, нажмите кнопку "Свойства комнаты" в боковой панели и затем нажмите на "Добавить поведение" и выберите только что созданное нами поведение.

Теперь это поведение подключено к комнате, и когда срабатывает событие "Старт комнаты", оно само устанавливает параметры `crystals` и `crystalsTotal`, не требуя писать такой код непосредственно в комнате.

Так мы собираем и считаем кристаллы, но нам также нужно создать простой интерфейс для отображения их количества и сделать это с *стилем*. ✨

К счастью, есть инструмент для создания стильных текстовых стилей внутри ct.js. Откройте вкладку "Ассеты" в верхней части экрана и создайте новый стиль. Назовите его `CrystalCounter`.

Затем активируйте раздел "Шрифт", установите размер шрифта 24 и вес 600. Выровнять по левому краю и установить высоту строки 32.

![Настройка шрифта стиля](../../images/tutorials/tutPlatformer_17.png)

Затем откройте вкладку "Заполнение", активируйте ее и установите цвет заполнения зеленым. Я выбрал `#00A847`. Другие хорошие варианты включают основные цвета кристалла, такие как `#2ECC71` и `#28B463`.

![Настройка цвета заполнения стиля](../../images/tutorials/tutPlatformer_18.png)

Мы также можем добавить толстую белую линию к нашему тексту. Откройте вкладку "Линия", затем установите цвет линии в белый и ширину 5. Если вы не видите результат справа, попробуйте переключиться на темную тему интерфейса на некоторое время, нажав на меню гамбургера в верхней части.

![Настройка стиля линии](../../images/tutorials/tutPlatformer_23.png)

Теперь нам нужно создать два новых шаблона, `CrystalsWidget` и `CrystalsWidgetText`. Первый будет отображать иконку кристалла, а второй - счетчик. Установите спрайт `CrystalsWidget` на зеленый кристалл, а в `CrystalsWidgetText` установите его на Текст вместо спрайта. Теперь установите стиль `CrystalCounter` с призрачной кошкой в качестве иконки.

Чтобы завершить работу, добавьте это в конец кода рамки CrystalsWidgetText:


::: tabs#tutorial
@tab JavaScript
```js
this.text = `${rooms.current.crystals} / ${rooms.current.crystalsTotal}`;
```
@tab CoffeeScript
```coffee
# Note the double quotes!
@text = "#{rooms.current.crystals} / #{rooms.current.crystalsTotal}"
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/font.svg" class="feather"><span class="catnip-block-aTextLabel">Set text</span>         <catnip-block class=" computed string string  ">           <catnip-block class=" computed wildcard string  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">read</span>          <input type="text" class="catnip-block-aConstantInput string " style=" width: 8.5ch;    " value="crystals" readonly="readonly"> <span class="catnip-block-aTextLabel">of the current room</span>              </catnip-block>  <span class="catnip-block-aTextLabel">+</span>                   <input type="text" class="catnip-block-aConstantInput string " style=" width: 3.5ch;    " value=" / " readonly="readonly"> <span class="catnip-block-aTextLabel">+</span>                  <catnip-block class=" computed wildcard string  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">read</span>          <input type="text" class="catnip-block-aConstantInput string " style=" width: 13.5ch;    " value="crystalsTotal" readonly="readonly"> <span class="catnip-block-aTextLabel">of the current room</span>              </catnip-block>      </catnip-block>      </catnip-block>
:::

Нам понадобится создать специальную комнату для наших элементов интерфейса. Создайте новую комнату и назовите ее `LayerUI`. Установите ее размер одинаковым с другими комнатами, 1024x576. Затем добавьте только что созданный `CrystalsWidget` и `CrystalsWidgetText` в верхний левый угол комнаты:

![Добавление виджета кристаллов в слой интерфейса](../../images/tutorials/tutPlatformer_28.png)

Вы можете выровнять текст по центру, перейдя в инструменты интерфейса и установив выравнивание там после выбора текста. Вы также можете установить текст по умолчанию, чтобы увидеть, как он будет выглядеть, если число станет очень высоким, чтобы убедиться, что выравнивание установлено правильно!

![Добавление виджета кристаллов в слой интерфейса](../../images/tutorials/tutPlatformer_28_2.png)

Добавление элементов интерфейса в отдельную комнату позволяет проектировать интерфейс визуально, а затем импортировать его в другие комнаты с помощью кода. Ct.js также имеет специальную флажок, который фиксирует слои интерфейса, поэтому вы можете свободно перемещать, масштабировать и даже поворачивать камеру, а элементы интерфейса останутся правильно расположенными. Перейдите в настройки комнаты и установите флажок "Это слой интерфейса?", чтобы `LayerUI` был зафиксирован на экране игры.

![Включение слоя как слоя интерфейса](../../images/tutorials/tutPlatformer_LayerUICheckbox.png)

Теперь, чтобы импортировать слой интерфейса в другую комнату, перейдите в наше поведение `inGameRoomStart` в представлении активов и добавьте этот код:


::: tabs#tutorial
@tab JavaScript
```js
rooms.append('LayerUI');
```
@tab CoffeeScript
```coffee
rooms.append 'LayerUI'
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/room.svg" class="feather"><span class="catnip-block-aTextLabel">Append a room</span>          <span class="catnip-block-aConstantInput menu string ">   <img src="/assets/icons/image.svg" class="feather"><span>LayerUI</span></span>   <div class="catnip-block-aFiller"></div>        <span class="catnip-block-aTextLabel">store in</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " style=" width: 6.5ch;    " readonly="readonly">        <div class="catnip-block-Options"> <div class="catnip-block-anOptionsToggle"> <img src="/assets/icons/chevron-down.svg" class="feather"><span>Advanced</span> <img src="/assets/icons/chevron-down.svg" class="feather"> </div>    </div>       </catnip-block>
:::

Вот как это должно выглядеть на русском языке:

![Полный код добавления слоя интерфейса в ct.js](../../images/tutorials/tutPlatformer_29.png)

::: tip
Метод `rooms.append` (а также `rooms.prepend`) также можно использовать для повторного использования других вещей, помимо слоев интерфейса. Например, мы можем поместить все фоновые изображения в отдельный слой, а затем вызвать `rooms.prepend("YourBackgroundRoom");`, чтобы импортировать их. Это особенно полезно при создании сложных слоенных фонов с эффектом параллаксного сдвига.
:::

Если вы сейчас запустите свою игру, вы должны увидеть счетчик кристаллов в левом верхнем углу:

![Счетчик кристаллов](../../images/tutorials/tutPlatformer_19.png)

### Добавление жизней и бонусов сердца

Это в основном похоже на сбор кристаллов, но есть некоторые изменения:

* Начально у нас 3 жизни.
* Мы не можем иметь более 3 жизней одновременно.
* Если мы потеряли последнюю жизнь, уровень перезагружается.

::: tip Сделай это сам!
 Попробуй сделать все самостоятельно! Если ты запутался, просто ищи инструкции ниже. Не скроль вниз! 😃
:::

Создайте новый шаблон под названием `Heart` и назначьте соответствующую спрайт. Добавьте следующий код в событие Collides Robot шаблона:

::: tabs#tutorial
@tab JavaScript
```js
if (rooms.current.lives < 3) {
    rooms.current.lives++;
    this.kill = true;
}
```
@tab CoffeeScript
```coffee
if rooms.current.lives < 3
    rooms.current.lives++
    @kill = true
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed boolean boolean  ">           <catnip-block class=" computed wildcard number  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">read</span>          <input type="text" class="catnip-block-aConstantInput string " value="lives" style=" width: 5.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">of the current room</span>              </catnip-block>  <span class="catnip-block-aTextLabel">&lt;</span>                   <input type="text" class="catnip-block-aConstantInput number " value="3" style=" width: 1.5ch;    " readonly="readonly">     </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Write</span>          <input type="text" class="catnip-block-aConstantInput string " value="lives" style=" width: 5.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">value</span>                  <catnip-block class=" computed number wildcard  ">           <catnip-block class=" computed wildcard number  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">read</span>          <input type="text" class="catnip-block-aConstantInput string " value="lives" style=" width: 5.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">of the current room</span>              </catnip-block>  <span class="catnip-block-aTextLabel">+</span>                   <input type="text" class="catnip-block-aConstantInput number " value="1" style=" width: 1.5ch;    " readonly="readonly">     </catnip-block>  <span class="catnip-block-aTextLabel">to the current room</span>              </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">Destroy this copy</span>     </catnip-block>    </catnip-block-list> </div>        </catnip-block>
:::

Не забудьте разместить фактические сердца на своих уровнях!

Мы также должны создать стиль для счетчика жизней. Процесс тот же, и подходящий цвет - `#E85017`. Мы даже можем дублировать существующий стиль! Назовите этот стиль `HeartCounter`.

Мы нуждаемся еще в двух шаблонах для здоровья. Создайте новый шаблон под названием `HeartsWidget`, и установите спрайт сердца. Затем создайте `HeartsWidgetText` и установите его как текст, а не спрайт. Теперь примените стиль `HeartCounter`.

Добавьте следующий код в конец события `Frame` шаблона `HeartsWidgetText`:

::: tabs#tutorial
@tab JavaScript
```js
this.text = rooms.current.lives;
```
@tab CoffeeScript
```coffee
@text = rooms.current.lives
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/font.svg" class="feather"><span class="catnip-block-aTextLabel">Set text</span>         <catnip-block class=" computed wildcard string  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">read</span>          <input type="text" class="catnip-block-aConstantInput string " style=" width: 5.5ch;    " value="lives" readonly="readonly"> <span class="catnip-block-aTextLabel">of the current room</span>              </catnip-block>      </catnip-block>
:::

Затем добавьте оба этих новых шаблона в слой `LayerUI`. Не забудьте настроить выравнивание текста сердца!

Измените код перезагрузки `Robot`, чтобы он терял одну жизнь при каждом перерыве (в событии с коллизией с группой «Deadly»):

::: tabs#tutorial
@tab JavaScript
```js
this.x = this.savedX;
this.y = this.savedY;
this.hspeed = 0;
this.vspeed = 0;
// remove one life
rooms.current.lives --;
if (rooms.current.lives <= 0) {
    // Restart a room: switch to the room of its own name
    rooms.switch(rooms.current.name);
}
```
@tab CoffeeScript
```coffee
@x = @savedX
@y = @savedY
@hspeed = 0
@vspeed = 0

# remove one life
rooms.current.lives--

if rooms.current.lives <= 0
    # Restart a room: switch to the room of its own name
    rooms.switch rooms.current.name
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Set x to</span>         <catnip-block class=" computed wildcard number  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">read</span>          <input type="text" class="catnip-block-aConstantInput string " value="savedX" style=" width: 6.5ch;    " readonly="readonly">     </catnip-block>      </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Set y to</span>         <catnip-block class=" computed wildcard number  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">read</span>          <input type="text" class="catnip-block-aConstantInput string " value="savedY" style=" width: 6.5ch;    " readonly="readonly">     </catnip-block>      </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Set horizontal speed to</span>          <input type="text" class="catnip-block-aConstantInput number " value="0" style=" width: 1.5ch;    " readonly="readonly">     </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Set vertical speed to</span>          <input type="text" class="catnip-block-aConstantInput number " value="0" style=" width: 1.5ch;    " readonly="readonly">     </catnip-block>

<catnip-block class=" command   note selected">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="remove one life" style="height: 21px;" readonly="readonly"></textarea>         </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Write</span>          <input type="text" class="catnip-block-aConstantInput string " value="lives" style=" width: 5.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">value</span>                  <catnip-block class=" computed number wildcard  ">           <catnip-block class=" computed wildcard number  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">read</span>          <input type="text" class="catnip-block-aConstantInput string " value="lives" style=" width: 5.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">of the current room</span>              </catnip-block>  <span class="catnip-block-aTextLabel">-</span>                   <input type="text" class="catnip-block-aConstantInput number " value="1" style=" width: 1.5ch;    " readonly="readonly">     </catnip-block>  <span class="catnip-block-aTextLabel">to the current room</span>              </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed boolean boolean  ">           <catnip-block class=" computed wildcard number  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">read</span>          <input type="text" class="catnip-block-aConstantInput string " value="lives" style=" width: 5.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">of the current room</span>              </catnip-block>  <span class="catnip-block-aTextLabel">≤</span>                   <input type="text" class="catnip-block-aConstantInput number " value="0" style=" width: 1.5ch;    " readonly="readonly">     </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command   note ">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Restart a room: switch to the room of its own name" style="height: 37px;" readonly="readonly"></textarea>         </catnip-block>   <catnip-block class=" command void   ">  <img src="/assets/icons/room.svg" class="feather"><span class="catnip-block-aTextLabel">Switch to</span>         <catnip-block class=" computed wildcard string  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">read</span>          <input type="text" class="catnip-block-aConstantInput string " value="name" style=" width: 4.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">of the current room</span>              </catnip-block>      </catnip-block>    </catnip-block-list> </div>        </catnip-block>
:::

И не забудьте отредактировать поведение `inGameRoomStart`, чтобы инициализировать количество жизней в комнате:

::: tabs#tutorial
@tab JavaScript
```js {2}
rooms.current.crystals = 0;
rooms.current.lives = 3;
rooms.current.crystalsTotal = templates.list['GreenCrystal'].length;
rooms.append('LayerUI');
```
@tab CoffeeScript
```coffee {2}
rooms.current.crystals = 0
rooms.current.lives = 3
rooms.current.crystalsTotal = templates.list['GreenCrystal'].length
rooms.append 'LayerUI'
```
@tab Catnip
<catnip-block class=" command void   selected">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">With copy</span>         <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/room.svg" class="feather"><span class="catnip-block-aTextLabel">current room</span>     </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Write</span>          <input type="text" class="catnip-block-aConstantInput string " value="crystals" style=" width: 8.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">value</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " value="0" style=" width: 1.5ch;    " readonly="readonly">     </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Write</span>          <input type="text" class="catnip-block-aConstantInput string " value="lives" style=" width: 5.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">value</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " value="3" style=" width: 1.5ch;    " readonly="readonly">     </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Write</span>          <input type="text" class="catnip-block-aConstantInput string " style=" width: 13.5ch;    " value="crystalsTotal" readonly="readonly"> <span class="catnip-block-aTextLabel">value</span>                  <catnip-block class=" computed number wildcard  ">  <img src="/assets/icons/grid.svg" class="feather"><span class="catnip-block-aTextLabel">length of</span>         <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">templates list</span>          <span class="catnip-block-aConstantInput menu wildcard ">   <img src="/assets/icons/image.svg" class="feather"><span>GreenCrystal</span></span>     </catnip-block>      </catnip-block>      </catnip-block>    </catnip-block-list> </div>        </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/room.svg" class="feather"><span class="catnip-block-aTextLabel">Append a room</span>          <span class="catnip-block-aConstantInput menu string ">   <img src="/assets/icons/image.svg" class="feather"><span>LayerUI</span></span>   <div class="catnip-block-aFiller"></div>        <span class="catnip-block-aTextLabel">store in</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " style=" width: 6.5ch;    " readonly="readonly">        <div class="catnip-block-Options"> <div class="catnip-block-anOptionsToggle"> <img src="/assets/icons/chevron-down.svg" class="feather"><span>Advanced</span> <img src="/assets/icons/chevron-down.svg" class="feather"> </div>    </div>       </catnip-block>
:::

Это все! Пора протестировать.

## Добавление движущихся платформ

Создайте новый шаблон под названием `Platform` и выберите соответствующую спрайт-шаблон. Создайте новую уровень под названием `Level_03`, который включает в себя широкие лужайки или длинные ловушки с платформами, которые движутся вам навстречу.

![Механизм третьего уровня](../../images/tutorials/tutPlatformer_22.png)

Движущиеся платформы будут действовать следующим образом:

* Они движутся горизонтально, начиная движение, скажем, вправо.
* Если платформа обнаруживает, что она будет касаться объекта `Solid` в следующем кадре, её направление меняется.
* Платформы движутся роботом, если он оказывается прямо над платформой.

Давайте откроем шаблон платформы и инициализируем его скорость:

::: tabs#tutorial
@tab JavaScript
```js
this.speed = 120;
```
@tab CoffeeScript
```coffee
@speed = 120
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Set speed to</span>          <input type="text" class="catnip-block-aConstantInput number " style=" width: 3.5ch;    " value="120" readonly="readonly">     </catnip-block>
:::


Также, установите группу столкновений платформы как `Solid` в правом столбце редактора шаблонов.

Затем, добавьте следующий код в раздел "Frame start":

::: tabs#tutorial
@tab JavaScript
```js
var robot = place.meet(this, this.x, this.y - 1, 'Robot');
if (robot) {
    robot.x += this.hspeed * u.time;
}
```
@tab CoffeeScript
```coffee
robot = place.meet this, @x, @y - 1, 'Robot'
if robot
    robot.x += @speed * u.time
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Set</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">robot</span>              </catnip-block>  <span class="catnip-block-aTextLabel">value</span>                  <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/copy.svg" class="feather"><span class="catnip-block-aTextLabel">occupied by a template</span>         <catnip-block class=" computed wildcard wildcard constant ">  <img src="/assets/icons/crosshair.svg" class="feather"><span class="catnip-block-aTextLabel">this</span>     </catnip-block>          <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">x</span>     </catnip-block>          <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">y</span>     </catnip-block>  <span class="catnip-block-aTextLabel">-</span>                   <input type="text" class="catnip-block-aConstantInput number " value="1" style=" width: 1.5ch;    " readonly="readonly">     </catnip-block>           <span class="catnip-block-aConstantInput menu string ">   <img src="/assets/icons/image.svg" class="feather"><span>Robot</span></span>     </catnip-block>      </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed wildcard boolean userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">robot</span>              </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Write</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">robot</span>              </catnip-block>  <span class="catnip-block-aTextLabel">property</span>                   <input type="text" class="catnip-block-aConstantInput string " value="x" style=" width: 1.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">value</span>                  <catnip-block class=" computed number wildcard  ">           <catnip-block class=" computed wildcard number  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">read</span>          <input type="text" class="catnip-block-aConstantInput string " value="x" style=" width: 1.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">from</span>                  <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">robot</span>              </catnip-block>      </catnip-block>  <span class="catnip-block-aTextLabel">+</span>                  <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">horizontal speed</span>     </catnip-block>  <span class="catnip-block-aTextLabel">×</span>                  <catnip-block class=" computed number number  ">  <img src="/assets/icons/tool.svg" class="feather"><span class="catnip-block-aTextLabel">time</span>     </catnip-block>      </catnip-block>      </catnip-block>      </catnip-block>    </catnip-block-list> </div>        </catnip-block>
:::

И логика движения:

::: tabs#tutorial
@tab JavaScript
```js
if (place.occupied(this, this.x + this.hspeed * u.time, this.y, 'Solid')) {
    // Flip direction
    this.direction += 180;
}
this.move();
```
@tab CoffeeScript
```coffee
if place.occupied this, @x + @speed, @y, 'Solid'
    # Flip direction
    @direction += 180

@move()
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed wildcard boolean  ">  <img src="/assets/icons/copy.svg" class="feather"><span class="catnip-block-aTextLabel">place occupied</span>         <catnip-block class=" computed wildcard wildcard constant ">  <img src="/assets/icons/crosshair.svg" class="feather"><span class="catnip-block-aTextLabel">this</span>     </catnip-block>          <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">x</span>     </catnip-block>  <span class="catnip-block-aTextLabel">+</span>                  <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">horizontal speed</span>     </catnip-block>  <span class="catnip-block-aTextLabel">×</span>                  <catnip-block class=" computed number number  ">  <img src="/assets/icons/tool.svg" class="feather"><span class="catnip-block-aTextLabel">time</span>     </catnip-block>      </catnip-block>      </catnip-block>          <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">y</span>     </catnip-block>           <input type="text" class="catnip-block-aConstantInput string " value="Solid" style=" width: 5.5ch;    " readonly="readonly">     </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command   note ">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Flip direction" style="height: 21px;" readonly="readonly"></textarea>         </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Set direction to</span>         <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">direction</span>     </catnip-block>  <span class="catnip-block-aTextLabel">+</span>                   <input type="text" class="catnip-block-aConstantInput number " value="180" style=" width: 3.5ch;    " readonly="readonly">     </catnip-block>      </catnip-block>    </catnip-block-list> </div>        </catnip-block>
:::

Вот это просто! Может быть, даже слишком просто. А проблема в том, что если Робот касается левой или правой стороны платформы, он застревает навсегда! Нам нужно сделать платформы твердыми только в том случае, если они не пересекаются друг с другом.

![Проблема с платформами](../../images/tutorials/tutPlatformer_PlatformIssues.gif)

Вот более хороший код:

::: tabs#tutorial
@tab JavaScript
```js
var robot = place.meet(this, this.x, this.y, 'Robot');
if (robot) {
    this.cgroup = undefined;
} else {
    this.cgroup = 'Solid';
    robot = place.meet(this, this.x, this.y - 1, 'Robot');
    if (robot) {
        robot.x += this.hspeed * u.time;
    }
}

if (place.occupied(this, this.x + this.hspeed * u.time, this.y, 'Solid')) {
    // Flip direction
    this.direction += 180;
}
this.move();
```
@tab CoffeeScript
```coffee
robot = place.meet this, @x, @y, 'Robot'
if robot
    @cgroup = undefined
else
    @cgroup = 'Solid'
    robot = place.meet this, @x, @y - 1, 'Robot'
    if robot
        robot.x += @hspeed * u.time

if place.occupied this, @x + @hspeed * u.time, @y, 'Solid'
    # Flip direction
    @direction += 180

@move()
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Set</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">robot</span>              </catnip-block>  <span class="catnip-block-aTextLabel">value</span>                  <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/copy.svg" class="feather"><span class="catnip-block-aTextLabel">occupied by a template</span>         <catnip-block class=" computed wildcard wildcard constant ">  <img src="/assets/icons/crosshair.svg" class="feather"><span class="catnip-block-aTextLabel">this</span>     </catnip-block>          <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">x</span>     </catnip-block>          <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">y</span>     </catnip-block>           <span class="catnip-block-aConstantInput menu string ">   <img src="/assets/icons/image.svg" class="feather"><span>Robot</span></span>     </catnip-block>      </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed wildcard boolean userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">robot</span>              </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Write</span>          <input type="text" class="catnip-block-aConstantInput string " value="cgroup" style=" width: 6.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">value</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " value="undefined" style=" width: 9.5ch;    " readonly="readonly">     </catnip-block>    </catnip-block-list> </div>     <img src="/assets/icons/alert-circle.svg" class="feather">         <span class="catnip-block-aTextLabel">Else</span>                <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Write</span>          <input type="text" class="catnip-block-aConstantInput string " value="cgroup" style=" width: 6.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">value</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " value="Solid" style=" width: 5.5ch;    " readonly="readonly">     </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Set</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">robot</span>              </catnip-block>  <span class="catnip-block-aTextLabel">value</span>                  <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/copy.svg" class="feather"><span class="catnip-block-aTextLabel">occupied by a template</span>         <catnip-block class=" computed wildcard wildcard constant ">  <img src="/assets/icons/crosshair.svg" class="feather"><span class="catnip-block-aTextLabel">this</span>     </catnip-block>          <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">x</span>     </catnip-block>          <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">y</span>     </catnip-block>  <span class="catnip-block-aTextLabel">-</span>                   <input type="text" class="catnip-block-aConstantInput number " value="1" style=" width: 1.5ch;    " readonly="readonly">     </catnip-block>           <span class="catnip-block-aConstantInput menu string ">   <img src="/assets/icons/image.svg" class="feather"><span>Robot</span></span>     </catnip-block>      </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed wildcard boolean userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">robot</span>              </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Write</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">robot</span>              </catnip-block>  <span class="catnip-block-aTextLabel">property</span>                   <input type="text" class="catnip-block-aConstantInput string " value="x" style=" width: 1.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">value</span>                  <catnip-block class=" computed number wildcard  ">           <catnip-block class=" computed wildcard number  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">read</span>          <input type="text" class="catnip-block-aConstantInput string " value="x" style=" width: 1.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">from</span>                  <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">robot</span>              </catnip-block>      </catnip-block>  <span class="catnip-block-aTextLabel">+</span>                  <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">horizontal speed</span>     </catnip-block>  <span class="catnip-block-aTextLabel">×</span>                  <catnip-block class=" computed number number  ">  <img src="/assets/icons/tool.svg" class="feather"><span class="catnip-block-aTextLabel">time</span>     </catnip-block>      </catnip-block>      </catnip-block>      </catnip-block>    </catnip-block-list> </div>        </catnip-block>    </catnip-block-list> </div>        </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed wildcard boolean  ">  <img src="/assets/icons/copy.svg" class="feather"><span class="catnip-block-aTextLabel">place occupied</span>         <catnip-block class=" computed wildcard wildcard constant ">  <img src="/assets/icons/crosshair.svg" class="feather"><span class="catnip-block-aTextLabel">this</span>     </catnip-block>          <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">x</span>     </catnip-block>  <span class="catnip-block-aTextLabel">+</span>                  <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">horizontal speed</span>     </catnip-block>  <span class="catnip-block-aTextLabel">×</span>                  <catnip-block class=" computed number number  ">  <img src="/assets/icons/tool.svg" class="feather"><span class="catnip-block-aTextLabel">time</span>     </catnip-block>      </catnip-block>      </catnip-block>          <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">y</span>     </catnip-block>           <input type="text" class="catnip-block-aConstantInput string " value="Solid" style=" width: 5.5ch;    " readonly="readonly">     </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command   note ">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Flip direction" style="height: 21px;" readonly="readonly"></textarea>         </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Set direction to</span>         <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">direction</span>     </catnip-block>  <span class="catnip-block-aTextLabel">+</span>                   <input type="text" class="catnip-block-aConstantInput number " value="180" style=" width: 3.5ch;    " readonly="readonly">     </catnip-block>      </catnip-block>    </catnip-block-list> </div>        </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Move this copy</span>     </catnip-block>
:::

Что происходит здесь? Во-первых, мы проверяем, не пересекается ли робот с платформой. Если да, мы сообщаем, что платформа должна стать нестабильной с помощью `cgroup = undefined`, чтобы робот мог пройти через платформу вместо того, чтобы застрять в ней. 'cgroup' - это поле группы столкновений, которое мы редактировали в левой колонке редактора шаблона! Если между платформой и роботом нет столкновения, платформа становится стабильной (`cgroup = 'Solid'`), и мы снова ищем робота, но теперь на один пиксель выше платформы. У нас идеальное столкновение по пикселям, поэтому одного пикселя достаточно.

::: tip Сделай сам!
Добавь движущиеся вертикально платформы! И убедись, что они не раздавляют Робота. 😉
:::

## Это всё!

Уф, это был довольно длинный учебник. Несмотря на это, есть ещё много возможностей для улучшения.

Вот как можно улучшить эту игру:

- Добавьте врагов и смертоносные движущиеся цепочки! Вы можете получить спрайты их и гораздо больше [здесь](https://www.kenney.nl/assets/platformer-art-deluxe).
- Создайте историю и расскажите её через NPC, заметки на деревянных досках или просто через субтитры!
- Улучшите процесс возрождения. Убедитесь, что Робот не попадает в ловушки после возрождения. Это можно сделать, заблокировав ввод игрока на полсекунды или просто сделав области контрольных точек более безопасными.
- Добавьте звуковые эффекты! Ничто не делает игру более живой, чем качественные SFX.
- Убедитесь, что Робот возрождается, если он иногда выпадает из уровня.
- Просто добавьте больше уровней. 😉 Украсьте их растениями, создайте миры разных цветов.

::: tip Заметки на полях
Посмотрите, как новые функции в вашем коде постепенно появляются в ваших уровнях! Это хороший способ представить игрокам новые вещи. Предоставьте им одно новое понятие за раз, но сохраните предыдущие с увеличивающейся сложностью. *Это совет по проектированию уровней от Comigo* 😎
:::

**Счастливого кодинга!**
Comigo

