# Создание игр: платформер

В этом туториале мы создадим небольшой платформер с алмазами, контрольными точками, движущимися платформами и ловушками! Мы научимся обрабатывать столкновения, использовать их для создания движения персонажа с видом сбоку, а также манипулировать спрайтами и перемещать игрока между уровнями.

![Скриншот финальной игры](../../images/tutorials/tutPlatformer_endResult.png)

Вот что мы сделаем:

[[toc]]

## Создание проекта

На главном экране перейдите во вкладку "Создать новый". В поле "Имя" введите название вашего проекта – например, «Платформер». Затем выберите папку, в которой ct.js будет хранить проект, например, в папке «Документы», и нажмите кнопку «Создать».

![](../../images/tutorials/tutCommon_CreateProject.png)

## Импорт текстур

Нам понадобятся некоторые ассеты из [пакета упрощенного платформера от Кенни](https://www.kenney.nl/assets/simplified-platformer-pack). Эти ассеты уже включены в ct.js и красиво названы; вы можете найти их во встроенной галерее.

Перейдите во вкладку "Ассеты", нажмите на кнопку "Новый ассет", затем нажмите на "Встроенная галерея ассетов". Найдите пак "Kenney's Simplified Platformer" от Кенни и импортируйте необходимые текстуры, показанные на картинке. Затем закройте галерею; текстуры появятся в списке всех ассетов.

Как будете готовы, нажмите на ассет "PlatformChar_Walk1".

![Редактирование кадров анимации](../../images/tutorials/tutPlatformer_02.png)

Эта текстура персонажа — изображение, состоящее из двух кадров анимации. Её можно условно представить в виде таблицы размером в одну строку и два столбца. Ct.js разделяет анимацию на кадры именно так, и нам здесь нужно в поле "Колонок:" поставить значение 2, а в поле "Строк:" — 1. Поля "Ширина" и "Высота" покажут размер одной ячейки. Они определяются автоматически при задании количества строк и колонок, но их можно изменять по необходимости.

![Редактирование текстуры](../../images/tutorials/tutPlatformer_04.png)

Теперь давайте отредактируем маску столкновения (коллизию). Маска столкновения — это область на текстуре, часто повторяющая форму изображённого на ней объекта, и она показывает, что считается при коллизиях и нажатиям указателем частью нашей копии, а что — нет. В редакторе маска столкновения отображается как синий прямоугольник поверх спрайта.

Сначала нужно переместить ось вращения в нижнюю центральную точку. Это можно сделать двумя способами:

1) просто перетащить её с помощью мышки (она отмечена на текстуре квадратиком); 
2) вручную ввести координаты в поле "Ось вращения". 

::: tip Объяснение
Система координат в игровых движках отличается от системы координат, которая используется в геометрии. Например, в Ct.js ось Y перевёрнута и "растёт" при движении сверху вниз. Пиксели отсчитываются с верхнего левого угла. 
Чтобы найти координаты точки внизу посередине, мы отступим от левого верхнего угла половину ширины кадра вправо и его целую высоту вниз. Поскольку у нас спрайт размером 86x80 пикселей, нам нужно взять 43 пикселя по горизонтали и 80 по вертикали. Первое значение точки обычно является её горизонтальным компонентом, или её X-компонентом, а второе — Y-компонентом.
:::

У робота есть красивое прямоугольное тело, и вполне логично сделать так, чтобы маска коллизии повторяла его форму туловища. Для этого нажмите кнопку "Заполнить" и отрегулируй соответсвующие отступы как показано на картинке. 

![Редактирование текстуры](../../images/tutorials/tutPlatformer_05.png)

Вы можете покрыть как тело с руками, так и выбрать только тело.

Нажмите кнопку "Применить" в правом нижнем углу.

Теперь нам нужно настроить маски столкновения для "PlatformChar_Jump" и "PlatformChar_Idle". Мы можем быстро сделать это, скопировав маску столкновения у "PlatformChar_Walk1" и вставив её в "PlatformChar_Jump" и "PlatformChar_Idle"! Убедитесь, что вы также смещаете ось на 43x80 для каждого из них.

![Копирование маски текстуры](../../images/tutorials/tutPlatformer_05_2.png)
![Вставка маски текстуры](../../images/tutorials/tutPlatformer_05_3.png)

::: tip
Желательно, чтобы у всех спрайтов одного персонажа были одинаковые маски столкновений и расположение оси вращения. Например, у нашего робота все три спрайта должны иметь одинаковые коллизии с одинаковыми смещениями, чтобы он не застревал в текстурах из-за внезапного увеличения маски столкновений при переключении анимаций.
:::

Теперь давайте настроим маски столкновения наших кристаллов и бонусов-сердец. Для простоты можем сделать их в форме кругов. Откройте текстуру "PlatformPack_Item09" (Зелёный кристалл), установите его маску столкновения как "Круг", затем нажмите кнопку "По центру", чтобы ось автоматически настроилась на нужные значения, и настройте радиус формы столкновения.

Сделайте то же для текстуры "PlatformPack_Item17" (Сердце).

![Редактирование кристаллов](../../images/tutorials/tutPlatformer_06.png)
![Редактирование сердец](../../images/tutorials/tutPlatformer_07.png)

Последняя текстура, которую нам нужно изменить, это "PlatformPack_Tile43" (Шипы). Нам не нужно смещать её ось, потому что тогда она будет неправильно выравниваться на уровне, но мы всё ещё должны настроить её коллизию. Установите верхний отступ маски столкновений на отрицательное значение, чтобы персонаж в будущем сталкивался только с нижней частью тектуры, там, где нарисованы шипы.

![Редактирование шипов](../../images/tutorials/tutPlatformer_08.png)

Сохраните текстуру шипов. Если вы проверите другие текстуры, вы увидите, что они все имеют прямоугольную форму, заполняющую всю текстуру целиком, кроме платформ. Попробуйте изменить их коллизии самостоятельно.

## Создание робота-персонажа и платформ

Откройте вкладку "Ассеты" и нажмите кнопку "Новый ассет". В меню выберите "Шаблон". Назовите шаблон "Робот", установите спрайт `PlatformChar_Idle` и сохраните.

![Редактирование шаблона](../../images/tutorials/tutPlatformer_09.png)

::: tip
Шаблоны используются как основа для создания идентичных копий. Мы заполняем уровни (также называемые комнатами) копиями, и именно они взаимодействуют друг с другом на экране, но каждая копия всегда создаётся на основе определённого шаблона.
:::

Создайте дополнительные шаблоны аналогичным образом (все текстуры скал):

- `PlatformPack_Tile16`, названный "Камни"
- `PlatformPack_Tile13`, названный "Земля"
- `PlatformPack_Tile31`, названный "Земляная_платформа"


### Добавление комнаты

Нажмите "Новый ассет" ещё раз и выберите в меню «Комната». Назовите её «Уровень_01» и в панели «Свойства комнаты» с иконкой шестерёнки слева установите размер камеры 1024x576.

![Редактирование комнаты](../../images/tutorials/tutPlatformer_10.png)

Затем нарисуйте свой уровень! Выберите инструмент «Добавить копии», щёлкните по шаблону слева и нарисуйте их мышью в большой области справа. Не забудьте о роботе!

Вы можете расширять свой уровень во все стороны, и копии необязательно надо размещать только внутри синей рамки. Она просто показывает размер видимой части уровня на старте для понимания масштабов отображения игры.

Вот такой уровень получился у меня. Ваш уровень может отличаться, просто проявите фантазию! Трудно назвать это качественным левел-дизайном, но наша первая задача — просто научить игрока прыжку. Позже мы можем добавить кристалл на платформу из камня и какой-нибудь секрет в пещере под последним холмом.

![Уровень платформерa Comigo](../../images/tutorials/tutPlatformer_11.png)

Теперь давайте изменим цвет фона. Нажмите инструмент «Свойства комнаты» снова и установите цвет фона на `#D0F4F7`.

![](../../images/tutorials/tutPlatformer_27.png)

Если мы сохраним проект сейчас и нажмём кнопку «Пуск» в верхней части экрана, мы увидим небольшую часть нашего уровня, нарисованного в окне отладки. Пока ничего не двигается, но это уже хорошее начало!

![Окно отладки с размещенными копиями и фоном](../../images/tutorials/tutPlatformer_12.png)

### Добавление модулей для клавиатуры и столкновений

Нам понадобится слушать события клавиатуры и обнаруживать столкновения между Роботом и землёй. Для этих суперспособностей нам понадобятся Котомоды! Нажмите на вкладку "Проект", а затем на вкладку "Котомоды" слева. Нажмите на модуль `клавиатура` в разделе доступных модулей, чтобы у него появился зелёный флажок и маленькая вращающаяся круглая точечка (возможно, он уже включен!). Сделайте то же самое с модулем `place`.

![Включение модуля в ct.js](../../images/tutorials/tutPlatformer_13.png)

У каждого модуля есть своя документация во вкладке справа "Доки и заметки". Мы позже рассмотрим её подробнее.

### Добавление действий для событий клавиатуры

Действия позволяют слушать (обрабатывать) события с клавиатуры, мыши, игрового контроллера и т.д. Более подробно о них можно прочитать [здесь](./../actions.md). С их помощью мы создадим слушатели для клавиш WASD и стрелок.

::: tip
Несмотря на названия "слушатель" и "слушать", эти слова никак не связаны с восприятием звука человеком в контексте программирования. Для начала разберёмся, что такое "событие". Событие — это сигнал от игры о том, что что-то произошло. Например, нажатие кнопки, выход из игры, или смерть игрока. Слушатель или обработчик — это объект, который принимает уведомление о событии, то есть слушает событие. Например, кристалл может "слушать" событие столкновения с персонажем и, например, исчезать при получении уведомления о начале этого события. 
:::

Перейдите во вкладку Проект, а затем нажмите вкладку "Действия и методы ввода" слева.

Затем создайте схему ввода, как показано на следующем изображении. Для этого сначала нажмите кнопку "Создать с нуля", чтобы не использовать шаблон. Затем нажмите кнопку "Добавить действие", дайте ему название и добавьте методы ввода в правой колонке. Вы можете использовать функцию поиска, чтобы быстро добавлять необходимые клавиши.

![Схема сопоставления ввода для простой платформерной игры в ct.js](../../images/tutorials/tutPlatformer_25.png)

::: tip
Хоть эта схема может быть упрощена до всего двух действий (см. [примеры на странице действий](./../actions.md#examples)), у нас будет два отдельных действия для движения влево и вправо, чтобы не усложнять туториал.
:::

### Код коллизии и движения

Теперь перейдите во вкладку "Ассеты" в верхней части экрана и откройте шаблон `Камни`. В правом столбце заполните поле "Группа столкновений" значением `Solid` (пер. твёрдый, непроницаемый):

![Добавление группы коллизий к шаблону](../../images/tutorials/tutPlatformer_26.png)

Так мы сказали движку, что копии этого шаблона принадлежат группе столкновений `Solid`. Группы можно называть как угодно, и в проекте в их может быть любое количество. Пока что нам достаточно одной.

Добавьте ту же строку в шаблоны `Земля` и `Земляная_платформа`.

Теперь откройте шаблон `Робот`. Если вы ранее прошли руководство "Создание игр: космический шутер", вы можете помнить, что мы двигали наш корабль изменяя напрямую параметры копии, либо использовали встроенне переменные, такие как `this.speed` или `this.direction`. Правда, эти способы не будут работать с платформером, даже вне ct.js! Нам нужно написать что-то более сложное. Готовьтесь! 😃

Вся сложность движения в платформерах заключается в том, что нам надо сделать непроходимыми стены и пол во время движения персонажа. Для этого нужно установить позицию, к которой мы хотим двигаться, а затем проверить, есть ли препятствия на пути к ней.

Пришло время создать наш первый код. Для этого откройте шаблон "Робот" и слева внизу нажмите кнопку "Добавить событие". Найдите событие "Создание", затем добавьте следующий код:

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
`this` - это копия, которая выполняет написанный код. В нашем случае это `Робот`.
:::

Теперь перейдите в событие "Начало кадра". Удалите строку `this.move();`, и добавьте следующий код:

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
"Начало кадра" выполняется каждый кадр для каждой копии. Движение и другая игровая логика обычно находятся здесь.
:::

::: tip
`actions.YourAction.down` проверяет, зажата ли в данный момент времени одна из указанных вами клавиш в данном действии. Также есть `actions.YourAction.pressed` (помогает отслеживать начало нажатия) и `actions.YourAction.released` (отслеживает конец нажатия кнопки).

`place.occupied(copy, x, y, group)` проверяет наличие столкновений с данной копией `copy` в заданных координатах `x`, `y` с другими копиями с группой `group`. Если группа не нужна, вы можете её не указывать. Этот метод возвращает либо `false` (нет столкновения), либо первую копию, которая столкнулась с `copy`.
:::

Мы установили переменные `hspeed` (горизонтальная скорость) и `vspeed` (вертикальная скорость), но они ничего не делают сами по себе. Также мы не хотим застревать в текстурах или проходить сквозь стены, относящиеся к группе столкновений «Solid». К счастью, мы можем добавить эту волшебную строку в конец, чтобы персонаж правильно сталкивался с твёрдыми объектами:

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
`moveSmart` — метод из модуля `place`, который постепенно перемещает копию пиксель за пикселем, останавливая её рядом с препятствиями. Это отлично подходит для платформеров и когда нужно точное движение вдоль ровных поверхностей.
:::

Теперь мы можем перемещать нашего Робота!

::: warning
Ваш персонаж может игнорировать ямы шириной в одну клетку. Проверьте это. Если это происходит, вам нужно сделать коллизию Робота более худенькой (уменьшить ширину).
:::

### Настройка камеры для следования за роботом

Если мы запустим игру сейчас, мы сможем перемещать Робота. Однако есть одна проблема: камера не двигается!

Но её легко исправить. Если мы изучим документацию ct.js, мы найдем сущность [`camera`](../camera.md) с такими параметрами, как `camera.follow`, `camera.borderX` и `camera.borderY`, которые позволяют настроить следование за копией.

Откройте шаблон "Робот" и его событие создания. Добавьте следующий код в конец:

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

Запустите игру и проверьте изменения. Теперь камера должна следовать за роботом.

## Добавление ловушек и чекпоинтов

Мы добавим смертельные ловушки и водные преграды, а также чекпоинты, чтобы игрок после проигрыша мог продолжить игру с этих точек, а не с начала уровня.

Создайте новые шаблоны со следующими текстурами:

- `PlatformPack_Tile17`, названный `Вода`;
- `PlatformPack_Tile05`, названный `Вода_верх`;
- `PlatformPack_Tile43`, названный `Шипы`;
- `PlatformPack_Tile21`, названный `Чекпоинт`.

Создайте новую комнату и назовите её `Уровень_2`. Установите её размер в 1024x576 и снова сделайте фон цвета `#D0F4F7`. Создайте опасный уровень с шипами и прудами.

Поставьте точки чекпоинта до и/или после опасных участков. Не стесняйтесь ставить много, потому что жёстко наказывать игрока за любые ошибки — не самая хорошая идея! 😉

![Второй уровень КоМиГо](../../images/tutorials/tutPlatformer_16.png)

Здесь предполагаемый конец уровня находится в центре верхней платформы. Я также поместил некоторые платформы вне рамки камеры, чтобы в будущем разместить на них кристаллы.

Теперь давайте поговорим о шаблоне `Чекпоинт`.

Мы будем проверять столкновение с роботом, и когда они будут происходить, мы будем сохранять точку восстановления внутри копии робота. Создайте новое событие «Столкновение с шаблоном» и выберите Робота. Затем добавьте следующий код в событие:

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
Событие «Коллизия с шаблоном» имеет специальную переменную `other`, которую можно использовать тольк в коде этого события. Эта переменная хранит ссылку на копию, которая столкнулась с нашим чекпоинтом — в нашем случаем, с роботом. Поглядывайте на предмет наличия подобных переменных при использовании разных событий!
:::

Здесь мы также смещаем сохранённую точку на 32x32 пикселей, потому что ось контрольной точки находится в её верхнем левом углу, а ось робота находится в средней нижней точке. Без смещения робот будет помещён чуть левее и выше желаемой центральной точки.

Также надо бы сделать контрольные точки невидимыми во время игры. Откройте раздел «Внешний вид» справа и отключите флажок «Отображать».

![Сделать контрольную точку невидимой](../../images/tutorials/tutPlatformer_CheckpointVisible.png)

Теперь перейдите к шаблону `Шипы` и установите их группу столкновений как «Deadly» (пер. «Смертельные») в правой колонке.

То же имя группы примените к шаблонам `Вода` и `Вода_Верх`.

Теперь откройте снова шаблон `Робот`, и добавьте новое событие «Коллизия с группой». В имени группы используйте «Deadly». Затем в коде события добавьте следующее:

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

Мы также должны написать этот код для события "Создание", чтобы по умолчанию точка возрождения находилась в месте создания, на случай, если наши способные игроки эпично облажаются:

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

Для тестирования конкретной комнаты откройте вкладку «Ассеты» вверху, затем щёлкните правой кнопкой мыши по нужной комнате и выберите «Сделать стартовой комнатой».

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

`0.2` означает, что мы хотим воспроизводить 0.2×60 (что составляет 12) кадров в секунду. Для большей читаемости мы также можем записать это как `12/60`.

Откройте код "Начало кадра" робота и измените раздел движения так, чтобы текстура, которая отображается, зависела от ввода пользователя и положения робота в пространстве:


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

Так как наше вертикальное движение не зависит от горизонтального, то анимация заменяется на прыжок, если под роботом нет земли.

Робот теперь будет поворачиваться в сторону текущего направления и изменять текстуру (анимацию) в зависимости от движения. Вы только посмотрите на этого малыша!

![Анимационный робот](../../images/tutorials/tutPlatformer_Animating.gif)

## Добавление переходов между уровнями

Задумка такая:

- Каждая комната будет хранить имя следующей комнаты в качестве свойства.
- На каждом уровне будет выход.
- Когда робот сталкивается с выходом, то выход читает свойство комнаты, и игрок переходит на следующий уровень.

Создайте новый шаблон с названием "Выход". Установите ему текстуру "PlatformPack_Tile48". Затем у Робота создайте событие "Столкновение с шаблоном", выберите "Выход" и напишите следующий код:

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

Теперь перейдите на вкладку "Ассеты", откройте уровень `Уровень_1`, нажмите кнопку "События" и введите следующий код в событии "Старт комнаты":

::: tabs#tutorial
@tab JavaScript
```js
this.nextRoom = 'Уровень_2';
```
@tab CoffeeScript
```coffee
@nextRoom = 'Level_02'
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Set</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/archive.svg" class="feather"> <span class="catnip-block-aTextLabel">nextRoom</span>              </catnip-block>  <span class="catnip-block-aTextLabel">value</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " style=" width: 8.5ch;    " value="Level_02" readonly="readonly">     </catnip-block>
:::

Поместите выход в комнату.

Сохраните комнату и пометьте `Уровень_1` как стартовую комнату и протестируйте переход.

::: tip Самостоятельно!
Создайте дополнительные выходы, ведущие к секретным подуровням и обратно. Помните, что во встроенной галерее в этом паке есть ещё куча интересных текстур.
:::

## Подбираемые предметы: подсчёт и отображение

### Добавление кристаллов

Создайте новый шаблон под названием `Зелёный_кристалл` и установите его спрайт. Создайте событие «Столкновение с шаблоном Робот» и напишите следующий код:

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
`this.kill = true;` указывает, что текущая копия должна быть удалена из текущей комнаты. Это произойдёт после всех событий «Начало кадра», но до события «Конец кадра».
:::

Как вы, возможно, уже догадались, количество собранных кристаллов будет храниться в комнате.

Но если мы продолжим добавлять больше функций в события комнат, мы скоро попадем в ловушку багов из-за того, что для каждой будущей комнаты прийдётся вручную копировать и вставлять большие фрагменты кода, а если мы захотим изменить логику, то также прийдётся и изменять его в каждой комнате. Это будет невероятно скучная работа для третьей и всех последующих комнат. (И у нас обязательно будет третья комната!)

Чтобы избежать такой проблемы, можнл создать функции из всех повторяющихся логических операций — это вроде своих собственных команд. Таким образом мы сократим размер повторяющегося кода. Но полностью проблему это не решит — если таких функций станет много, то нам опять прийдётся их расставлять по всем комнатам вручную.

Чтобы навсегда решить проблему повторяющегося кода в котэ есть специальный тип ассетов, называемый "Поведениями". Нажмите кнопку "новый ассет", в выпадающем меню выберите "Поведение" -> "Поведение для комнат", и назовите его `ИнициализацияКомнаты`.

Поведения для комнат имеют такие же события, как и сами комнаты. Создайте событие «Старт комнаты» и напишите следующий код:

::: tabs#tutorial
@tab JavaScript
```js
rooms.current.crystals = 0;
rooms.current.crystalsTotal = templates.list['Зелёный_кристалл'].length;
```
@tab CoffeeScript
```coffee
rooms.current.crystals = 0
rooms.current.crystalsTotal = templates.list['Зелёный_кристалл'].length
```
@tab Catnip
<catnip-block class=" command void   selected">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">With copy</span>         <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/room.svg" class="feather"><span class="catnip-block-aTextLabel">current room</span>     </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Write</span>          <input type="text" class="catnip-block-aConstantInput string " style=" width: 8.5ch;    " value="crystals" readonly="readonly"> <span class="catnip-block-aTextLabel">value</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " style=" width: 1.5ch;    " value="0" readonly="readonly">     </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Write</span>          <input type="text" class="catnip-block-aConstantInput string " style=" width: 13.5ch;    " value="crystalsTotal" readonly="readonly"> <span class="catnip-block-aTextLabel">value</span>                  <catnip-block class=" computed number wildcard  ">  <img src="/assets/icons/grid.svg" class="feather"><span class="catnip-block-aTextLabel">length of</span>         <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">templates list</span>          <span class="catnip-block-aConstantInput menu wildcard ">   <img src="/assets/icons/image.svg" class="feather"><span>Зелёный_кристалл</span></span>     </catnip-block>      </catnip-block>      </catnip-block>    </catnip-block-list> </div>        </catnip-block>
:::

::: tip
`templates.list['TemplateName']` возвращает массив всех копий данного шаблона в комнате. `length` возвращает длину массива.
:::

![Создание повторно используемого скрипта](../../images/tutorials/tutPlatformer_21.png)

Теперь перейдите в каждую комнату, нажмите кнопку "Свойства комнаты" в боковой панели, и затем нажмите на "Добавить поведение" и выберите только что созданное нами поведение.

Теперь это поведение подключено к комнате, и когда срабатывает событие "Старт комнаты", оно само устанавливает параметры `crystals` и `crystalsTotal`, не требуя писать такой код непосредственно в событиях комнаты.

Так мы собираем и считаем кристаллы, но нам ещё нужно создать простой интерфейс для отображения их количества, и сделать это со *стилем*. 💃

К счастью, внутри ct.js есть инструмент для создания текстовых стилей. Откройте вкладку "Ассеты" и создайте новый стиль. Назовите его `Счётчик_кристаллов`.

В левой панели найдите раздел "Шрифт", установите размер шрифта 24, а толщину — в 600. Установите выравнивание по левому краю и высоту строки в 32 пикселя.

![Настройка шрифта стиля](../../images/tutorials/tutPlatformer_17.png)

Затем откройте вкладку "Заливка", активируйте ее и установите цвет заполнения зеленым. Я выбрал `#00A847`. Другие хорошие варианты включают основные цвета кристалла, такие как `#2ECC71` и `#28B463`.

![Настройка цвета заполнения стиля](../../images/tutorials/tutPlatformer_18.png)

Мы также можем добавить толстую белую линию к нашему тексту, чтобы его было лучше видно на любом фоне. Откройте вкладку "Обводка", затем установите цвет линии в белый и ширину 5. Если вы не видите результат справа, попробуйте изменить цвет фона кнопкой с каплей внизу.

![Настройка стиля линии](../../images/tutorials/tutPlatformer_23.png)

Теперь нам нужно создать два новых шаблона, `Виджет_кристалл` и `Виджет_кристалл_текст`. Первый будет отображать иконку кристалла, а второй - счётчик. Установите шаблону `Виджет_кристалл` текстуру зелёного кристалла, а в `Виджет_кристалл_текст` установите его тип на Текст вместо Анимированного Спрайта в выпадающем меню под иконкой призрачного кота. Теперь установите стиль `Счётчик_кристаллов` слева сверху.

Наконец, добавьте это в код события "Начало кадра" `Виджет_кристалл_текст`:

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

Нам понадобится создать специальную комнату для наших элементов интерфейса. Создайте новую комнату и назовите ее `Слой_интерфейса`. Установите её размер такой же, как и у других комнат, 1024x576. Затем добавьте только что созданный `Виджет_кристалл` и `Виджет_кристалл_текст` в верхний левый угол комнаты:

![Добавление виджета кристаллов в слой интерфейса](../../images/tutorials/tutPlatformer_28.png)

Вы можете выровнять текст по центру, перейдя в инструменты интерфейса, кликнув на текст и установив выравнивание в панели слева. Вы также можете установить текст по умолчанию, чтобы увидеть, как он будет выглядеть, если число станет очень большим, чтобы убедиться, что выравнивание установлено правильно!

![Добавление виджета кристаллов в слой интерфейса](../../images/tutorials/tutPlatformer_28_2.png)

Добавление элементов интерфейса в отдельную комнату позволяет проектировать интерфейс визуально, а затем импортировать его в другие комнаты с помощью кода. Ct.js также имеет специальный флажок, который маркирует слои интерфейса. Вы сможете свободно перемещать, масштабировать и даже поворачивать камеру, а элементы интерфейса останутся правильно расположенными. Перейдите в настройки комнаты и установите флажок "Слой для графического интерфейса", чтобы `Слой_интефейса` был зафиксирован на экране игры.

![Включение слоя как слоя интерфейса](../../images/tutorials/tutPlatformer_LayerUICheckbox.png)

Теперь, чтобы импортировать слой интерфейса в другую комнату, перейдите в наше поведение `инициализация_комнаты` во вкладке активов и добавьте этот код:

::: tabs#tutorial
@tab JavaScript
```js
rooms.append('Слой_интерфейса');
```
@tab CoffeeScript
```coffee
rooms.append 'Слой_интерфейса'
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/room.svg" class="feather"><span class="catnip-block-aTextLabel">Append a room</span>          <span class="catnip-block-aConstantInput menu string ">   <img src="/assets/icons/image.svg" class="feather"><span>Слой_интерфейса</span></span>   <div class="catnip-block-aFiller"></div>        <span class="catnip-block-aTextLabel">store in</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " style=" width: 6.5ch;    " readonly="readonly">        <div class="catnip-block-Options"> <div class="catnip-block-anOptionsToggle"> <img src="/assets/icons/chevron-down.svg" class="feather"><span>Advanced</span> <img src="/assets/icons/chevron-down.svg" class="feather"> </div>    </div>       </catnip-block>
:::

Вот как должен выглядеть код:

![Полный код добавления слоя интерфейса в ct.js](../../images/tutorials/tutPlatformer_29.png)

::: tip
Метод `rooms.append` (а также `rooms.prepend`) также можно использовать для повторного использования других вещей, помимо слоев интерфейса. Например, мы можем поместить все фоновые изображения в отдельный слой, а затем вызвать `rooms.prepend("YourBackgroundRoom");`, чтобы импортировать их. Это особенно полезно при создании сложных слоенных фонов с эффектом параллаксного сдвига.
:::

Если вы сейчас запустите свою игру, вы должны увидеть счетчик кристаллов в левом верхнем углу, если вы не забыли добавить кристаллы на уровни:

![Счетчик кристаллов](../../images/tutorials/tutPlatformer_19.png)

### Добавление жизней и бонусов-сердец

Подбирание сердец в основном похоже на сбор кристаллов, но есть некоторые изменения:

* Изначально у нас 3 жизни.
* Мы не можем иметь более 3 жизней одновременно.
* Если мы потеряли последнюю жизнь, уровень перезапускается.

::: tip Сделай сам!
 Попробуй сделать всё самостоятельно! Если ты запутался, проверься с инструкцией ниже. Всё, не скролль вниз! 😃
:::

Создайте новый шаблон под названием `Сердце` и назначьте соответствующий спрайт. Добавьте следующий код в событие "Столкновение с шаблоном Робот":

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

Не забудьте разместить копии сердца на своих уровнях!

Мы также должны создать стиль для счётчика жизней. Процесс тот же, и подходящий цвет - `#E85017`. Мы даже можем дублировать существующий стиль! Назовите этот стиль `Счетчик_сердец`.

Нам нужны ещё два шаблона для здоровья. Создайте новый шаблон под названием `Виджет_сердце`, и поставьте текстуру сердца. Затем создайте `Виджет_сердце_текст` и установите его как Текст, а не Анимированный Спрайт. Теперь примените стиль `Счетчик_сердец`.

Добавьте следующий код в конец события `Начало кадра` шаблона `Виджет_сердце_текст`:

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

Затем добавьте оба этих новых шаблона в слой `Слой_интерфейса`. Не забудьте настроить выравнивание текста сердца!

Измените код респавна шаблона `Робот`, чтобы он терял одну жизнь при каждом респавне (в событии со столкновением с группой «Deadly»):

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

И не забудьте отредактировать поведение `инициализация_комнаты`, чтобы инициализировать количество жизней в комнате:

::: tabs#tutorial
@tab JavaScript
```js {2}
rooms.current.crystals = 0;
rooms.current.lives = 3;
rooms.current.crystalsTotal = templates.list['Зелёный_кристалл'].length;
rooms.append('Слой_интерфейса');
```
@tab CoffeeScript
```coffee {2}
rooms.current.crystals = 0
rooms.current.lives = 3
rooms.current.crystalsTotal = templates.list['Зелёный_кристалл'].length
rooms.append 'Слой_интерфейса'
```
@tab Catnip
<catnip-block class=" command void   selected">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">With copy</span>         <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/room.svg" class="feather"><span class="catnip-block-aTextLabel">current room</span>     </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Write</span>          <input type="text" class="catnip-block-aConstantInput string " value="crystals" style=" width: 8.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">value</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " value="0" style=" width: 1.5ch;    " readonly="readonly">     </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Write</span>          <input type="text" class="catnip-block-aConstantInput string " value="lives" style=" width: 5.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">value</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " value="3" style=" width: 1.5ch;    " readonly="readonly">     </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Write</span>          <input type="text" class="catnip-block-aConstantInput string " style=" width: 13.5ch;    " value="crystalsTotal" readonly="readonly"> <span class="catnip-block-aTextLabel">value</span>                  <catnip-block class=" computed number wildcard  ">  <img src="/assets/icons/grid.svg" class="feather"><span class="catnip-block-aTextLabel">length of</span>         <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">templates list</span>          <span class="catnip-block-aConstantInput menu wildcard ">   <img src="/assets/icons/image.svg" class="feather"><span>Зелёный_кристалл</span></span>     </catnip-block>      </catnip-block>      </catnip-block>    </catnip-block-list> </div>        </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/room.svg" class="feather"><span class="catnip-block-aTextLabel">Append a room</span>          <span class="catnip-block-aConstantInput menu string ">   <img src="/assets/icons/image.svg" class="feather"><span>Слой_интерфейса</span></span>   <div class="catnip-block-aFiller"></div>        <span class="catnip-block-aTextLabel">store in</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " style=" width: 6.5ch;    " readonly="readonly">        <div class="catnip-block-Options"> <div class="catnip-block-anOptionsToggle"> <img src="/assets/icons/chevron-down.svg" class="feather"><span>Advanced</span> <img src="/assets/icons/chevron-down.svg" class="feather"> </div>    </div>       </catnip-block>
:::

Всё! Пора тестировать.

## Добавление движущихся платформ

Создайте новый шаблон под названием `Платформа` и выберите соответствующую текстуру. Создайте новый уровень под названием `Уровень_3`, который состоит из длинных ловушек с шипами и движущихся платформ.

![Пример третьего уровня](../../images/tutorials/tutPlatformer_22.png)

Движущиеся платформы будут действовать следующим образом:

* Они движутся горизонтально, начиная движение, скажем, слева направо.
* Если платформа обнаруживает, что она касается объекта группы `Solid`, то её направление движения меняется на противополжное.
* Робот движется вместе с платформой, если он оказывается прямо на ней.

Давайте создадим и откроем шаблон деревянной платформы и инициализируем его скорость:

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

Затем, добавьте следующий код в раздел "Начало кадра":

::: tabs#tutorial
@tab JavaScript
```js
var robot = place.meet(this, this.x, this.y - 1, 'Робот');
if (robot) {
    robot.x += this.hspeed * u.time;
}
```
@tab CoffeeScript
```coffee
robot = place.meet this, @x, @y - 1, 'Робот'
if robot
    robot.x += @speed * u.time
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Set</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">Робот</span>              </catnip-block>  <span class="catnip-block-aTextLabel">value</span>                  <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/copy.svg" class="feather"><span class="catnip-block-aTextLabel">occupied by a template</span>         <catnip-block class=" computed wildcard wildcard constant ">  <img src="/assets/icons/crosshair.svg" class="feather"><span class="catnip-block-aTextLabel">this</span>     </catnip-block>          <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">x</span>     </catnip-block>          <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">y</span>     </catnip-block>  <span class="catnip-block-aTextLabel">-</span>                   <input type="text" class="catnip-block-aConstantInput number " value="1" style=" width: 1.5ch;    " readonly="readonly">     </catnip-block>           <span class="catnip-block-aConstantInput menu string ">   <img src="/assets/icons/image.svg" class="feather"><span>Робот</span></span>     </catnip-block>      </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed wildcard boolean userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">Робот</span>              </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Write</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">Робот</span>              </catnip-block>  <span class="catnip-block-aTextLabel">property</span>                   <input type="text" class="catnip-block-aConstantInput string " value="x" style=" width: 1.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">value</span>                  <catnip-block class=" computed number wildcard  ">           <catnip-block class=" computed wildcard number  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">read</span>          <input type="text" class="catnip-block-aConstantInput string " value="x" style=" width: 1.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">from</span>                  <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">Робот</span>              </catnip-block>      </catnip-block>  <span class="catnip-block-aTextLabel">+</span>                  <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">horizontal speed</span>     </catnip-block>  <span class="catnip-block-aTextLabel">×</span>                  <catnip-block class=" computed number number  ">  <img src="/assets/icons/tool.svg" class="feather"><span class="catnip-block-aTextLabel">time</span>     </catnip-block>      </catnip-block>      </catnip-block>      </catnip-block>    </catnip-block-list> </div>        </catnip-block>
:::

И логику движения в то же событие "Начало кадра":

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

Выглядит просто! Может быть, даже слишком просто. А проблема в том, что если Робот коснётся левой или правой стороны платформы, он застрянет навсегда! Нам нужно сделать платформы твёрдыми только в том случае, если Робот и платформа уже не пересекаются друг с другом.

![Проблема с платформами](../../images/tutorials/tutPlatformer_PlatformIssues.gif)

Вот улучшенный код:

::: tabs#tutorial
@tab JavaScript
```js
var robot = place.meet(this, this.x, this.y, 'Робот');
if (robot) {
    this.cgroup = undefined;
} else {
    this.cgroup = 'Solid';
    robot = place.meet(this, this.x, this.y - 1, 'Робот');
    if (robot) {
        robot.x += this.hspeed * u.time;
    }
}

if (place.occupied(this, this.x + this.hspeed * u.time, this.y, 'Робот')) {
    // Flip direction
    this.direction += 180;
}
this.move();
```
@tab CoffeeScript
```coffee
robot = place.meet this, @x, @y, 'Робот'
if robot
    @cgroup = undefined
else
    @cgroup = 'Solid'
    robot = place.meet this, @x, @y - 1, 'Робот'
    if robot
        robot.x += @hspeed * u.time

if place.occupied this, @x + @hspeed * u.time, @y, 'Solid'
    # Flip direction
    @direction += 180

@move()
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Set</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">robot</span>              </catnip-block>  <span class="catnip-block-aTextLabel">value</span>                  <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/copy.svg" class="feather"><span class="catnip-block-aTextLabel">occupied by a template</span>         <catnip-block class=" computed wildcard wildcard constant ">  <img src="/assets/icons/crosshair.svg" class="feather"><span class="catnip-block-aTextLabel">this</span>     </catnip-block>          <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">x</span>     </catnip-block>          <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">y</span>     </catnip-block>           <span class="catnip-block-aConstantInput menu string ">   <img src="/assets/icons/image.svg" class="feather"><span>Робот</span></span>     </catnip-block>      </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed wildcard boolean userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">robot</span>              </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Write</span>          <input type="text" class="catnip-block-aConstantInput string " value="cgroup" style=" width: 6.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">value</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " value="undefined" style=" width: 9.5ch;    " readonly="readonly">     </catnip-block>    </catnip-block-list> </div>     <img src="/assets/icons/alert-circle.svg" class="feather">         <span class="catnip-block-aTextLabel">Else</span>                <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Write</span>          <input type="text" class="catnip-block-aConstantInput string " value="cgroup" style=" width: 6.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">value</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " value="Solid" style=" width: 5.5ch;    " readonly="readonly">     </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Set</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">robot</span>              </catnip-block>  <span class="catnip-block-aTextLabel">value</span>                  <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/copy.svg" class="feather"><span class="catnip-block-aTextLabel">occupied by a template</span>         <catnip-block class=" computed wildcard wildcard constant ">  <img src="/assets/icons/crosshair.svg" class="feather"><span class="catnip-block-aTextLabel">this</span>     </catnip-block>          <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">x</span>     </catnip-block>          <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">y</span>     </catnip-block>  <span class="catnip-block-aTextLabel">-</span>                   <input type="text" class="catnip-block-aConstantInput number " value="1" style=" width: 1.5ch;    " readonly="readonly">     </catnip-block>           <span class="catnip-block-aConstantInput menu string ">   <img src="/assets/icons/image.svg" class="feather"><span>Робот</span></span>     </catnip-block>      </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed wildcard boolean userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">robot</span>              </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Write</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">robot</span>              </catnip-block>  <span class="catnip-block-aTextLabel">property</span>                   <input type="text" class="catnip-block-aConstantInput string " value="x" style=" width: 1.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">value</span>                  <catnip-block class=" computed number wildcard  ">           <catnip-block class=" computed wildcard number  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">read</span>          <input type="text" class="catnip-block-aConstantInput string " value="x" style=" width: 1.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">from</span>                  <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">robot</span>              </catnip-block>      </catnip-block>  <span class="catnip-block-aTextLabel">+</span>                  <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">horizontal speed</span>     </catnip-block>  <span class="catnip-block-aTextLabel">×</span>                  <catnip-block class=" computed number number  ">  <img src="/assets/icons/tool.svg" class="feather"><span class="catnip-block-aTextLabel">time</span>     </catnip-block>      </catnip-block>      </catnip-block>      </catnip-block>    </catnip-block-list> </div>        </catnip-block>    </catnip-block-list> </div>        </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed wildcard boolean  ">  <img src="/assets/icons/copy.svg" class="feather"><span class="catnip-block-aTextLabel">place occupied</span>         <catnip-block class=" computed wildcard wildcard constant ">  <img src="/assets/icons/crosshair.svg" class="feather"><span class="catnip-block-aTextLabel">this</span>     </catnip-block>          <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">x</span>     </catnip-block>  <span class="catnip-block-aTextLabel">+</span>                  <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">horizontal speed</span>     </catnip-block>  <span class="catnip-block-aTextLabel">×</span>                  <catnip-block class=" computed number number  ">  <img src="/assets/icons/tool.svg" class="feather"><span class="catnip-block-aTextLabel">time</span>     </catnip-block>      </catnip-block>      </catnip-block>          <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">y</span>     </catnip-block>           <input type="text" class="catnip-block-aConstantInput string " value="Solid" style=" width: 5.5ch;    " readonly="readonly">     </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command   note ">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Flip direction" style="height: 21px;" readonly="readonly"></textarea>         </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Set direction to</span>         <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">direction</span>     </catnip-block>  <span class="catnip-block-aTextLabel">+</span>                   <input type="text" class="catnip-block-aConstantInput number " value="180" style=" width: 3.5ch;    " readonly="readonly">     </catnip-block>      </catnip-block>    </catnip-block-list> </div>        </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Move this copy</span>     </catnip-block>
:::

Что тут происходит? Во-первых, мы проверяем, не пересекается ли робот с платформой. Если пересекается, мы говорим, что платформа теперь не твёрдая с помощью строчки `cgroup = undefined`, чтобы робот мог пройти через платформу вместо того, чтобы застрять в ней. 'cgroup' - это поле группы столкновений, которое мы редактировали в левой колонке редактора шаблона! Если между платформой и роботом нет столкновения, платформа становится обратно твёрдой (`cgroup = 'Solid'`), и мы снова ищем робота, но теперь на один пиксель выше платформы. У робота идеальное попиксельное движение, поэтому одного пикселя достаточно, чтобы понять, стоит ли он на текущей платформе.

::: tip Сделай сам!
Добавь движущиеся вертикально платформы! И убедись, что они не раздавят Робота. 😉
:::

## Вот и всё!

Уф, это был довольно длинный туториал. Несмотря на это, есть ещё много возможностей для улучшения.

Вот как можно улучшить эту игру:

- Добавьте врагов и смертоносные крутящиеся пилы! Вы можете найти такие спрайты [здесь](https://www.kenney.nl/assets/platformer-art-deluxe).
- Создайте историю и расскажите её через других неиграбельных персонажей, заметки на деревянных табличках или просто через субтитры!
- Улучшите процесс возрождения. Убедитесь, что Робот не попадает в ловушки после возрождения. Это можно сделать, заблокировав ввод игрока на полсекунды или просто сделав области контрольных точек более безопасными.
- Добавьте звуковые эффекты! Ничто не делает игру более живой, чем качественные звуковые эффекты.
- Убедитесь, что Робот возрождается, если он выпадает из уровня.
- Просто добавьте больше уровней. 😉 Украсьте их растениями, создайте разноцветные миры.

::: tip Заметки на полях
Посмотрите, как новые функции в вашем коде постепенно появляются в ваших уровнях! Это хороший способ представить игрокам новые механики. Добавляйте по одному нововведению за раз, но сохраняйте предыдущие механики с увеличивающейся сложностью. *Это совет по проектированию уровней от Comigo* 😎
:::

**Счастливого кодинга!**
КоМиГо

