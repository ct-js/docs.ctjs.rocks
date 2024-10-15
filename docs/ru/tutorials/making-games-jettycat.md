# Создание игр: Jetty Cat

::: note Автоматически переведённая страница
К сожалению, на полный ручной перевод у нас не хватает ресурсов.
Если вы увидели ошибку — отправьте пул-риквест с исправлениями (ссылка для редактирования в конце страницы).
:::

Как и в Flappy Bird, в Jetty Cat игрок будет управлять котом, нажимая или нажимая на него, чтобы избежать бесконечных препятствий с помощью реактивного ранца. Сначала мы реализуем основную игровую логику, а потом — интерфейс пользователя. После этого мы отполируем игру, добавив красивые переходы, системы частиц и легкие эффекты.

![Результат учебника](../../images/tutorials/tutJettyCat_Result.gif)

Вот, что нам нужно сделать:

[[toc]]

:::warning
Как вы можете видеть, это не пример "Здравствуй, мир!", а скорее руководство по созданию полной игры с нуля. Уделите себе достаточно времени, чтобы закончить его!
:::

## Создание проекта и импорт ресурсов

Откройте файл ct.js и создайте новый проект, введя название и нажав кнопку "Создать". Укажите, где вы хотите сохранить проект. Хорошим выбором будет папка "Документы".

![](../../images/tutorials/tutCommon_CreateProject.png)

Щелкните вкладку "Ресурсы" в верхней части окна ct.js. Затем откройте свой файл-менеджер и перейдите в папку `examples/JettyCat_assets` внутри папки ct.js. Если вы использовали приложение itch.io для установки ct.js, вы можете щелкнуть правой кнопкой мыши на иконке установленной программы в вашей библиотеке и открыть файл-менеджер, чтобы перейти к месту хранения программы. Внутри есть ресурсы, которые мы будем использовать. Перетащите ресурсы из файлового просмотра в ct.js, и он быстро импортирует их в проект.

Нам нужно подготовить эти текстуры: правильно пометьте фоновые изображения как такие и установите формы коллизии, чтобы копии внутри игры точно взаимодействовали друг с другом. Сначала откройте фон для нашего проекта. Нажмите на карту `BG_Ground`:

![Открытие текстурного ресурса в ct.js](../../images/tutorials/tutJettyCat_02.png)

Здесь нам нужно нажать на флажок "Это тайл-фоновое изображение". Это говорит ct.js упаковывать эту текстуру по-другому и позволяет ей повторяться в наших уровнях.

![Изменение типа текстуры на фоновую в ct.js](../../images/tutorials/tutJettyCat_03.png)

Нажмите "Сохранить" в нижнем левом углу. Теперь сделайте то же самое с текстурой `BG_Sky`.

Фон готов! Теперь настройте формы коллизии для наших спрайтов. Нам не нужно настраивать их повсюду, но нам нужно установить их для объектов, которые сталкиваются друг с другом, и для тех, на которые мы нажимаем при игре. Заголовки, такие как `Jetty_Cat`, `OhNo` и `Pause`, не будут интерактивными и будут служить только декорациями; `PressHint` будет иметь информативную роль и также не будет напрямую получать нажатия. Но кот и трубы будут сталкиваться друг с другом, а звезды должны знать, когда кот пересекает их.

Откройте ресурс `PotatoCat`! Первым делом нам нужно переместить ось текстуры. По умолчанию она показывает квадратную ось, расположенную в левом верхнем углу. Ось - это точка, вокруг которой копия масштабируется и вращается. Поместите ось в центр тела кота. Затем мы определим его форму коллизии. Кот не похож на круг или прямоугольник, поэтому установите форму коллизии в виде многоугольника в левой колонке. Появится пятигранник: вы можете перетаскивать его углы и добавлять новые точки, щелкая по желтым линиям, чтобы лучше обвести силуэт кота. 15 точек достаточно, чтобы нарисовать его.

![Определение оси и формы коллизии текстуры в ct.js](../../images/tutorials/tutJettyCat_04.png)

::: tip
Хорошей идеей будет не обрамлять хвост и уши кота. Когда хвост сталкивается с трубой и игрок теряет жизнь, это может показаться несправедливым. В любом случае, хвост слишком гибкий, чтобы вызывать летальные столкновения 😺
:::

После определения формы мы захотим создать одинаковую маску коллизии для текстуры `PotatoCat_Stunned`. Но вместо того, чтобы создавать маску точки за точку, давайте просто скопируем эту маску! Нажмите кнопку "Копировать маску коллизии" и затем нажмите кнопку "Вставить маску коллизии" в текстуре `PotatoCat_Stunned`. Не забудьте настроить точку оси!

![Копирование формы коллизии текстуры в ct.js](../../images/tutorials/tutJettyCat_04_2.png)

![Вставка формы коллизии текстуры в ct.js](../../images/tutorials/tutJettyCat_04_3.png)

После определения формы нажмите кнопку "Сохранить", чтобы вернуться к списку ресурсов. Нам также нужно настроить текстуру `Star`.

Для труб мы будем использовать что-то *немного* другое. Откройте первое изображение, `Tube_01`, и поместите его ось почти внизу спрайта. Помните, что ось влияет не только на вращение, но и на масштабирование? Мы будем повторно использовать одну и ту же текстуру для труб, которые висят сверху экрана и растут снизу. Чтобы сделать это, мы будем отрицательно масштабировать их вокруг нижней оси, чтобы перевернуть конец вниз. Мы даже можем повернуть их позже, и они будут волаться вместе с их основой, оставшейся на месте.

![Определение оси и формы коллизии для текстуры трубы в ct.js](../../images/tutorials/tutJettyCat_05.png)

Нам нужно сделать это для всех четырех текстур труб. Затем мы можем начать создавать уровень и кодировать движение!

## Создание нашей главной комнаты и перемещение кота

Давайте создадим комнату, где будет происходить вся веселая халатность! Комнаты часто называют уровнями. Вот место, где мы объединяем все наши ресурсы и позволяем им взаимодействовать друг с другом. Откройте вкладку "Ассеты" в верхней части окна ct.js и нажмите кнопку "Новый ассет", а затем выберите "Комната". Назовите комнату "InGame" — мы будем использовать это конкретное имя позже в коде.

![Создание новой комнаты в ct.js](../../images/tutorials/tutJettyCat_06.png)

Откроется редактор комнаты для именно этой комнаты. Однако вы можете назвать их как угодно; нам просто нужно найти такое название, которое мы сможем запомнить при написании кода меню :)

Затем, в панели свойств с шестеренкой, нам нужно установить размер нашей комнаты. Устанавливайте его на 1080x1920 пикселей.

![Установка имени и размера просмотра комнаты в ct.js](../../images/tutorials/tutJettyCat_07.png)

Теперь давайте добавим наши фоны. Нажмите кнопку "Фоны" слева, а затем добавьте два фона: один для неба и один для земли. Небо выглядит хорошо как есть, но земля нуждается в доработке. Нажмите шестеренку рядом с текстурой фона в левой колонке и найдите выпадающее меню "Повторять". Установите его на "повторить-x": это сделает фон горизонтально только, так как ось X — горизонтальная (а Y — вертикальная). Затем нам нужно сдвинуть землю вправо вниз по рамке комнаты, изменив поле "Сдвиг по Y".

![Открытие текстурного ассета в ct.js](../../images/tutorials/tutJettyCat_08.png)

::: tip Подсказка:
Вы можете перемещать комнату, нажимая колесиком мыши и увеличивая масштаб с помощью колесика мыши.
:::

Мы также установим глубину для обоих фонов, чтобы они правильно выровнялись. Глубина — это 3e измерение, которое говорит ct.js, как упорядочивать наши объекты, чтобы небо не совпадалось со всем остальным. Положительные значения приводят объекты ближе к камере, а поэтому объекты с положительной глубиной будут перекрывать те, у которых отрицательная глубина.

Установите значение глубины неба на -20, а земли — на -10. Вот как ct.js будет понимать эти настройки:

![Объяснение глубины в ct.js](../../images/tutorials/tutJettyCat_DepthIllustration.png)

![Настройка глубины фона в ct.js](../../images/tutorials/tutJettyCat_09.png)

### Шаблон кошки

Текстуры очень важны для большинства игр, но они ничего не делают сами по себе. Мы уже использовали *фоновые текстуры*, которые служат для декоративных целей. *Шаблоны* могут включать игровую логику и используются для создания *копий*. Копии — это то, что мы добавляем в наши комнаты, а эти копии взаимодействуют друг с другом на экране.

Давайте создадим шаблон для нашей кошки! Откройте вкладку "Ассеты" в верхней части окна ct.js и нажмите кнопку "Новыйассет". Назовите его `PotatoCat` и установите текстуру, нажав на "Выбрать квадрат" и выбрав текстуру кошки.

![Установка текстуры и имени шаблона в ct.js](../../images/tutorials/tutJettyCat_10.png)

Теперь мы можем добавить кошку в нашу комнату! Перейдите к ней, переключившись обратно на вкладку "Ассеты" и открыв нашу единственную комнату. Когда вы нажмете на "Добавить копии", наша кошка появится в новом окне. Нажмите на кошку, а затем еще раз щелкните по месту, где вы хотите, чтобы появилась копия. Пока нам нужна только одна кошка.

![Место для размещения копии в уровне в ct.js](../../images/tutorials/tutJettyCat_11.png)

Если вы нажмете на "Пуск", будет запущен отладчик, и мы увидим статичный экран с нашими фоновыми текстурами и кошкой. Кошка не двигается пока, и это то, что мы хотим изменить!

![Тестирование игры в ct.js](../../images/tutorials/tutJettyCat_12.png)

Откройте вкладку "Ассеты" снова, и откройте шаблон кошки. Вы должны увидеть событие "Frame start" с кодом справа. Ct.js выполняет блоки кода в зависимости от события, которое происходит. Нажмите кнопку "Добавить событие", чтобы увидеть некоторые варианты. Вот некоторые важные события:

- "Создание" для кода, который выполняется один раз при создании копии;
- "Frame start", который выполняется на каждом кадре;
- "Frame end" выполняется в конце каждого кадра после других вычислений и обновлений движения;
- "Уничтожение" выполняется один раз при удалении копии.

![Вид события в ct.js](../../images/tutorials/tutJettyCat_12_2.png)

Здесь мы сделаем следующее:

- Зададим скорость и направление движения кошки в событии "Создание";
- Добавим событие "Действие", которое будет ускорять кошку, чтобы она могла летать вверх.

Нажмите кнопку "Добавить событие", затем найдите событие "Создание" и выберите его. Затем нажмите на блок кода слева, чтобы отобразить его справа, и добавьте следующий код:

::: tabs#tutorial
@tab JavaScript
```js
this.speed = 500;
this.direction = 0;
this.gravityAcceleration = 7000;
```
@tab CoffeeScript
```coffee
@speed = 500
@direction = 0
@gravityAcceleration = 7000;
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Set speed to</span>          <input type="text" class="catnip-block-aConstantInput number " style=" width: 3.5ch;    " value="500" readonly="readonly">     </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Set direction to</span>          <input type="text" class="catnip-block-aConstantInput number " style=" width: 1.5ch;    " value="0" readonly="readonly">     </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Set</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/archive.svg" class="feather"> <span class="catnip-block-aTextLabel">gravityAcceleration</span>              </catnip-block>  <span class="catnip-block-aTextLabel">value</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " style=" width: 4.5ch;    " value="7000" readonly="readonly">     </catnip-block>
:::

![Список событий в ct.js](../../images/tutorials/tutJettyCat_12_3.png)


`this.speed = 500;` означает, что мы будем перемещать кошку на 500 пикселей каждую секунду — примерно половину нашей комнаты.

`this.direction = 0;` означает, что мы перемещаем кошку в заданном направлении при 0 градусах. 0 градусов означает, что она будет двигаться вправо, 270 — вверх, 180 — налево, а 90 — вниз.

`this.gravityAcceleration = 7000;` будет использовано позже. Это сохранит, как быстро будет ускоряться наша кошка вниз (это не так быстро, как вы думаете).

Теперь давайте переместим нашу кошку каждый раз, когда игрок нажимает на экран. Нам нужно будет поддерживать как события мыши, так и касания мобильного устройства, поэтому мы будем использовать модуль Pointer. Он уже должен быть включен, но если нет, откройте вкладку "Проект" в верхней части окна ct.js, а затем "Catmods" слева. Найдите модуль `Pointer` в разделе доступных модулей. Нажмите на него, чтобы включить его — у него будет зеленый флажок с маленькой сплошной стрелкой:

![Включение модуля касания в ct.js](../../images/tutorials/tutJettyCat_13.png)

Теперь, в ct.js, методы ввода группируются в *Действия*. В этом проекте мы будем использовать только один метод ввода — нажатие на экран. На вкладке "Проект" в верхней части экрана нажмите вкладку "Действия и методы ввода" слева.

Есть готовые параметры, которые настраивают действия для нас, но пока давайте создадим свои, нажав кнопку "Создать от нуля". Добавьте наше первое действие, назовите его `Poof`. Да. Затем, в правом верхнем углу, нажмите "Добавить метод ввода", и найдите метод "Любое нажатие" под заголовком Pointer. Вы можете использовать поиск, чтобы быстро отфильтровать результаты.

![Настройка действия для событий касания в ct.js](../../images/tutorials/tutJettyCat_16.png)

Действие готово, мы можем сохранить его и вернуться к нашей кошке.

::: tip Действия? Зачем?
Для опытных разработчиков действия могут показаться лишним шагом здесь, но они проявляют себя, когда нужно поддерживать несколько разных методов ввода. Например, предположим, вы создаете игру, которая поддерживает как клавиатуру, так и геймпад, и клавиатура поддерживает движение по клавишам WASD и стрелкам. Одно действие будет поддерживать все три метода, и ваш код останется тонким, даже если вы добавляете новые методы ввода позже. Кроме того, они могут использоваться со одинаковым кодом!

Вы можете [чтать больше о действиях здесь](./../actions.md).
:::

Создайте новое действие для события нажатия вниз для кошки. Это параметризованное событие, поэтому вы можете указать, какое действие вы хотите! Выберите действие Poof из списка, а затем добавьте следующее к событию:


::: tabs#tutorial
@tab JavaScript
```js
this.gravity = this.gravityAcceleration;
this.addSpeed(u.time * 2 * this.gravityAcceleration, 270);
```
@tab CoffeeScript
```coffee
@gravity = @gravityAcceleration
@addSpeed u.time * 2 * @gravityAcceleration, 270
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Set gravity to</span>         <catnip-block class=" computed wildcard number userdefined ">  <img src="/assets/icons/archive.svg" class="feather"> <span class="catnip-block-aTextLabel">gravityAcceleration</span>              </catnip-block>      </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Set vertical speed to</span>         <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">vertical speed</span>     </catnip-block>  <span class="catnip-block-aTextLabel">-</span>                  <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/tool.svg" class="feather"><span class="catnip-block-aTextLabel">time</span>     </catnip-block>  <span class="catnip-block-aTextLabel">×</span>                  <catnip-block class=" computed number number  ">            <input type="text" class="catnip-block-aConstantInput number " value="2" style=" width: 1.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">×</span>                  <catnip-block class=" computed wildcard number userdefined ">  <img src="/assets/icons/archive.svg" class="feather"> <span class="catnip-block-aTextLabel">gravityAcceleration</span>              </catnip-block>      </catnip-block>      </catnip-block>      </catnip-block>      </catnip-block>
:::

Этот код будет запускаться только при нажатии игроком на экран. Если он сработает, мы определим силу гравитации, которая будет тянуть кота вниз, и добавим скорость, которая будет тянуть кота вверх. Нам нужно умножить добавленную скорость на `u.time`, чтобы обеспечить плавное движение в любой момент. Да, мы используем значение `this.gravityAcceleration` как для установки гравитации, так и для добавления скорости. Изменение скорости - это ускорение!

::: tip u.time
`u.time` будет равен 1/60 в большинстве случаев, но этот множитель не следует игнорировать. Если частота кадров игрока падает или игра задерживается по какой-либо причине, `u.time` станет более большим значением для компенсации этих падений и задержек кадров. Например, если частота кадров падает с 60 до 30 в секунду, то `u.time` временно будет равен 2/60.

Кроме того, `u.time` поддерживает растяжение времени игры и позволяет создавать эффекты замедления и паузы в игре. (И мы реализуем эти функции!)
:::

::: tip
Также существуют параметризованные события "Action Poof press" и "Action Poof release", которые срабатывают при нажатии и отпускании игроком экрана.
:::

Гравитация, определенная в событии "On Poof down", кажется странной, верно? Это действительно константа, которая лучше подходит для события "Creation", чтобы она устанавливалась один раз с начала и не менялась. Но размещение ее внутри условия с проверкой входных данных добавляет небольшой трюк: кот начнет падать только после взаимодействия игрока с игрой! Таким образом, они не потеряют сразу же, так как кот быстро упадет на землю в противном случае.

Если мы запустим проект сейчас, мы увидим, что кот движется слева направо, а затем реагирует на щелчки и начинает летать и падать. Он быстро вылетает из области просмотра, правда? Давайте изменим это!

### Перемещение камеры

В Ct.js есть сущность `камера`, которая отвечает за отображение содержимого на вашем экране. У нее много функций, а одна из них — следование копии.

Откройте «Событие создания» нашей кошки и добавьте следующий код:

::: tabs#tutorial
@tab JavaScript
```js
camera.follow = this;
camera.followY = false;
camera.shiftX = 250;
```
@tab CoffeeScript
```coffee
camera.follow = this
camera.followY = false
camera.shiftX = 250
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/camera.svg" class="feather"><span class="catnip-block-aTextLabel">Follow this copy</span>     </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/camera.svg" class="feather"><span class="catnip-block-aTextLabel">Enable following by y</span>         <catnip-block class=" computed boolean boolean constant ">  <img src="/assets/icons/bool.svg" class="feather"><span class="catnip-block-aTextLabel">false</span>     </catnip-block>      </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/camera.svg" class="feather"><span class="catnip-block-aTextLabel">Set camera's horizontal shift</span>          <input type="text" class="catnip-block-aConstantInput number " style=" width: 3.5ch;    " value="250" readonly="readonly">     </catnip-block>
:::

`camera.follow` указывает на копию, за которой должна следовать камера, и мы указываем ей следовать за кошкой, устанавливая `this`. `this` ссылается на копию, в которой выполняется код. У событий и `this` также есть комнаты.

`camera.followY = false;` означает, что мы не хотим перемещать камеру по оси Y (по вертикали). Мы будем просто скользить ее вправо.

`camera.shiftX = 250;` указывает, что мы хотим, чтобы камера находилась в 250 пикселях справа от кошки. По умолчанию она фокусируется так, чтобы кошка оставалась в центре просмотра.

Если мы запустим игру сейчас, камера будет идеально следовать за нашей кошкой. Ура!

## Написание кода для столкновений

Настало время реализовать реальную игровую механику. Мы добавим шаблон для труб, разместим некоторые из них на уровне, а затем напишем код для столкновений как для труб, так и для земли. После этого мы случайным образом изменим текстуры труб, тем самым меняя их высоту.

### Добавление труб

Создайте новый шаблон и назовите его `Tube`. Выберите его текстуру как одну из длинных труб в нашей коллекции. Затем установите его группу коллизий в "Obstacle".

![Создание шаблона трубы с группой коллизий](../../images/tutorials/tutJettyCat_18.png)

Затем откройте нашу комнату и добавьте трубы на пол, чтобы проверить коллизии. Откройте комнату `InGame`, выберите инструмент "Add copies", выберите шаблон трубы в панели шаблонов и затем добавьте их, щелкнув в просмотре уровня. Нам не понадобится много для тестирования.

![Создание ряда препятствий на уровне](../../images/tutorials/tutJettyCat_19.png)

Сначала создайте новый шаблон "PotatoCat_Stunned", используя текстуру "PotatoCat_Stunned". Затем в его событии "Creation" добавьте следующее:

::: tabs#tutorial

@tab JavaScript
```js
this.gravity = 7000;

// Прыжок вправо
this.speed = 1500;
this.direction = -45;
```

@tab CoffeeScript
```coffee
@gravity = 7000;

# Прыжок вправо
@speed = 1500
@direction = -45
```

@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Set gravity to</span>          <input type="text" class="catnip-block-aConstantInput number " style=" width: 4.5ch;    " value="2700" readonly="readonly">     </catnip-block>

<catnip-block class=" command   note selected">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea style="height: 21px;" value="Jump to the right" readonly="readonly"></textarea>         </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Set speed to</span>          <input type="text" class="catnip-block-aConstantInput number " style=" width: 4.5ch;    " value="1500" readonly="readonly">     </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Set direction to</span>          <input type="text" class="catnip-block-aConstantInput number " style=" width: 4.5ch;    " value="-45" readonly="readonly">     </catnip-block>
:::

Это шаблон застывшего кота, в который мы перейдем при столкновении с препятствием. После создания он будет отжиматься вправо и выстраиваться за пределы экрана со скоростью и гравитацией.

Теперь откройте шаблон "PotatoCat" и создайте новое событие "Collision with a group" с группой по имени "Obstacle". Этот код будет запущен после того, как кот столкнется с трубой. Далее мы добавим следующий код, чтобы уничтожить копию и запустить событие "Destruction":

::: tabs#tutorial

@tab JavaScript
```js
this.kill = true;
```

@tab CoffeeScript
```coffee
@kill = true;
```

@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">Destroy this copy</span>     </catnip-block>
:::

Наконец, создайте событие "Destruction" в шаблоне PotatoCat, чтобы создать копию PotatoCat_Stunned перед удалением копии. Добавьте следующее:

::: tabs#tutorial

@tab JavaScript
```js
// Остановите движение камеры
camera.follow = false;

// Создайте копию для анимации смерти
var dummy = templates.copy('PotatoCat_Stunned', this.x, this.y);

// Копируем размер в новую копию
dummy.scale.x = this.scale.x;
dummy.scale.y = this.scale.y;
```

@tab CoffeeScript
```coffee
# Остановите движение камеры
camera.follow = false

# Создайте копию для анимации смерти
dummy = templates.copy 'PotatoCat_Stunned', this.x, this.y

# Копируем размер в новую копию
dummy.scale.x = @scale.x
dummy.scale.y = @scale.y
```

@tab Catnip
<catnip-block class=" command   note selected">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Stop camera movement" style="height: 21px;" readonly="readonly"></textarea>         </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/camera.svg" class="feather"><span class="catnip-block-aTextLabel">Enable following by x</span>         <catnip-block class=" computed boolean boolean constant ">  <img src="/assets/icons/bool.svg" class="feather"><span class="catnip-block-aTextLabel">false</span>     </catnip-block>      </catnip-block>

<catnip-block class=" command   note selected">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Create an animated dummy" style="height: 21px;" readonly="readonly"></textarea>         </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">Copy a template</span>          <span class="catnip-block-aConstantInput menu string ">   <img src="/assets/icons/image.svg" class="feather"><span>PotatoCat_Stunned</span></span>         <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">x</span>     </catnip-block>          <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">y</span>     </catnip-block>    <div class="catnip-block-aFiller"></div>        <span class="catnip-block-aTextLabel">store in</span>                  <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">dummy</span>              </catnip-block>         <div class="catnip-block-Options"> <div class="catnip-block-anOptionsToggle"> <img src="/assets/icons/chevron-down.svg" class="feather"><span>Advanced</span> <img src="/assets/icons/chevron-down.svg" class="feather"> </div>    </div>       </catnip-block>

<catnip-block class=" command   note selected">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Copy scale settings to the new copy" style="height: 21px;" readonly="readonly"></textarea>         </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Set</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">thisScaleX</span>              </catnip-block>  <span class="catnip-block-aTextLabel">value</span>                  <catnip-block class=" computed number wildcard  ">  <img src="/assets/icons/droplet.svg" class="feather"><span class="catnip-block-aTextLabel">scale by x</span>     </catnip-block>      </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Set</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">thisScaleY</span>              </catnip-block>  <span class="catnip-block-aTextLabel">value</span>                  <catnip-block class=" computed number wildcard  ">  <img src="/assets/icons/droplet.svg" class="feather"><span class="catnip-block-aTextLabel">scale by y</span>     </catnip-block>      </catnip-block>

<catnip-block class=" command void   selected">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">With copy</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">dummy</span>              </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/droplet.svg" class="feather"><span class="catnip-block-aTextLabel">Set scale to</span>         <catnip-block class=" computed wildcard number userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">thisScaleX</span>              </catnip-block>          <catnip-block class=" computed wildcard number userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">thisScaleY</span>              </catnip-block>      </catnip-block>    </catnip-block-list> </div>        </catnip-block>
:::

`dummy.scale.x = this.scale.x;` и `dummy.scale.y = this.scale.y;` просто гарантируют, что если мы решим позже изменить размер PotatoCat, то шаблон с потрясенным состоянием будет изменен таким же образом.

Время для некоторых тестов! Если кошка резко дрогнет во время столкновения, проверьте, что ее коллизионная форма и ось установлены таким же образом, как и в начальном текстуре.

### Сделать так, чтобы кот упал, если он касается земли или верхнего края экрана

По какой-то причине пол и даже небо так же смертельны, как и трубы в игре Flappy Bird. У нас нет шаблона для земли, и потому `place` не сработает, а небо — это вовсе не сущность игры. Но они плоские, горизонтальные, и мы можем расширить наш логику столкновения, добавив правила, которые проверяют положение кота в пространстве.

Если мы теперь откроем комнату и перенесем курсор мыши над уровнем, мы увидим текущие координаты в нижнем левом углу. Верхняя сторона начальной рамки всегда на 0 пикселей по оси Y, а верхний край земли находится где-то на 1750 пикселях. Позиции копий определяются `this.x` и `this.y`, и мы можем прочитать их и сравнить с некоторыми другими значениями.

![](../../images/tutorials/tutJettyCat_21.png)

Измените логику "Старт фрейм" кота следующим образом, чтобы он был ошеломлен при столкновении с землей и небом:

::: tabs#tutorial
@tab JavaScript
```js
this.move();

if (this.y > 1750 - 200 || // If the cat is below the ground minus its approximate height, or
    this.y < 0) {          // the cat flew off the upper boundary,
    this.kill = true;      // remove the cat.
}
```
@tab CoffeeScript
```coffee
@move

if @y > 1750 - 200 or @y < 0    # If the cat is below the ground minus its approximate height, or the cat flew off the upper boundary,
    @kill = true                # remove the cat.
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">Move this copy</span>     </catnip-block>

<catnip-block class=" command   note selected">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="If the cat is below the ground minus its approximate height, the cat flew off the upper boundary, remove the cat." style="height: 53px;" readonly="readonly"></textarea>         </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed boolean boolean  ">           <catnip-block class=" computed boolean boolean  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">y</span>     </catnip-block>  <span class="catnip-block-aTextLabel">&gt;</span>                  <catnip-block class=" computed number number  ">            <input type="text" class="catnip-block-aConstantInput number " value="1750" style=" width: 4.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">-</span>                   <input type="text" class="catnip-block-aConstantInput number " value="200" style=" width: 3.5ch;    " readonly="readonly">     </catnip-block>      </catnip-block>  <span class="catnip-block-aTextLabel">or</span>                  <catnip-block class=" computed boolean boolean  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">y</span>     </catnip-block>  <span class="catnip-block-aTextLabel">&lt;</span>                   <input type="text" class="catnip-block-aConstantInput number " value="0" style=" width: 1.5ch;    " readonly="readonly">     </catnip-block>      </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">Destroy this copy</span>     </catnip-block>    </catnip-block-list> </div>        </catnip-block>
:::

### Случайная высота трубы за счет изменения ее текстуры

Мы можем изменить текстуру в коде для наших труб, чтобы случайным образом менять их высоту, поскольку у нас есть четыре разных текстуры для них.

В CT.js есть встроенный модуль под названием `random`, который помогает генерировать случайные значения. Найдите его в разделе "Catmods" из вкладки "Проект" в верхнем меню и включите его. Затем добавьте событие создания в шаблон трубы, откройте код события создания и добавьте следующий фрагмент кода:

::: tabs#tutorial
@tab JavaScript
```js
this.tex = random.dice(
    'Tube_01',
    'Tube_02',
    'Tube_03',
    'Tube_04'
);
```
@tab CoffeeScript
```coffee
@tex = random.dice 'Tube_01', 'Tube_02', 'Tube_03', 'Tube_04'
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Set</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">textureArray</span>              </catnip-block>  <span class="catnip-block-aTextLabel">value</span>                  <catnip-block class=" computed wildcard wildcard constant ">  <img src="/assets/icons/grid.svg" class="feather"><span class="catnip-block-aTextLabel">new array</span>     </catnip-block>      </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/grid.svg" class="feather"><span class="catnip-block-aTextLabel">Add an element at end</span>          <input type="text" class="catnip-block-aConstantInput wildcard " style=" width: 7.5ch;    " value="Tube_01" readonly="readonly"> <span class="catnip-block-aTextLabel">to</span>                  <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">textureArray</span>              </catnip-block>      </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/grid.svg" class="feather"><span class="catnip-block-aTextLabel">Add an element at end</span>          <input type="text" class="catnip-block-aConstantInput wildcard " style=" width: 7.5ch;    " value="Tube_02" readonly="readonly"> <span class="catnip-block-aTextLabel">to</span>                  <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">textureArray</span>              </catnip-block>      </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/grid.svg" class="feather"><span class="catnip-block-aTextLabel">Add an element at end</span>          <input type="text" class="catnip-block-aConstantInput wildcard " style=" width: 7.5ch;    " value="Tube_03" readonly="readonly"> <span class="catnip-block-aTextLabel">to</span>                  <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">textureArray</span>              </catnip-block>      </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/grid.svg" class="feather"><span class="catnip-block-aTextLabel">Add an element at end</span>          <input type="text" class="catnip-block-aConstantInput wildcard " style=" width: 7.5ch;    " value="Tube_04" readonly="readonly"> <span class="catnip-block-aTextLabel">to</span>                  <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">textureArray</span>              </catnip-block>      </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/droplet.svg" class="feather"><span class="catnip-block-aTextLabel">Set texture to</span>         <catnip-block class=" computed wildcard string  ">  <img src="/assets/icons/sort-numerically.svg" class="feather"><span class="catnip-block-aTextLabel">random from array</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">textureArray</span>              </catnip-block>      </catnip-block>      </catnip-block>
:::

Функция `random.dice` принимает любое количество аргументов и возвращает один из них случайным образом каждый раз, когда она вызывается.

Порада для тестирования! Если ваши трубы выстраиваются неправильно, проверьте, что у вас установлены формы коллизии для всех четырех текстур и что их оси направлены вниз по трубе.

Here is the translation of the provided markdown document from English to Russian:

## Генерация труб со временем

Как шаблоны, так и комнаты могут иметь свою логику; они скрыты под кнопкой "События" в верхней панели редактора комнаты. Существует четыре основных события, а также дополнительные:

- "Старт" комнаты, который выполняется один раз при переключении на эту комнату или запуске игры в этой комнате;
- "Фрейм старт", который выполняется каждый фрейм после любого другого события "Фрейм старта" копий;
- "Конец фрейма", который выполняется в конце каждого фрейма;
- "Конец комнаты", который выполняется при переключении на другую комнату или удалении встроенной комнаты со сцены.

Мы сделаем следующее, чтобы создавать новые трубы с течением времени:

1. Мы установим переменную в событии «Начало комнаты», которая будет служить нам таймером — она будет считать оставшиеся секунды до создания новых труб;
2. Мы создадим событие таймера, которое будет ждать, пока переменная таймера не достигнет нуля.
3. Когда событие таймера срабатывает, мы перезагрузим его и создадим новые трубы относительно положения камеры.
   * Мы также создадим трубы в верхней части видового поля и используем масштабирование, чтобы перевернуть эти трубы вниз, так что они будут указывать вниз.

Откройте нашу единственную комнату `InGame`. Удалите существующие трубы, удерживая клавишу "Ctrl" и перетаскивая мышь, пока активна копирующая инструмент, или выбрав их с помощью инструмента выбора и нажав клавишу "Delete" на клавиатуре. Затем нажмите кнопку "События" в верхней панели.

![](../../images/tutorials/tutJettyCat_22.png)

Добавьте следующую строку в код события «Старт»:

::: tabs#tutorial
@tab JavaScript
```js
this.timer1 = 5;
```
@tab CoffeeScript
```coffee
@timer1 = 5
```
@tab Catnip
<catnip-block class="command    selected">
  <img src="/assets/icons/clock.svg" class="feather"><span class="catnip-block-aTextLabel">Установить 1-й таймер на</span>
  <input type="text" style=" width: 1.5ch;    " class="catnip-block-aConstantInput number" value="5" readonly="readonly">
  <span class="catnip-block-aTextLabel">секунды</span>
</catnip-block>
:::

Здесь «timer1» — это специальное имя переменной, которое будет автоматически уменьшаться до нуля автоматически без дополнительной программирования. Это соответствует событию "Timer 1" события.

Добавьте событие "TubeSpawn" с именем "Timer 1" и оставьте поле "Описание события" пустым:

::: tabs#tutorial
@tab JavaScript
```js
// Повторно установите таймер снова
this.timer1 = 2;

// Создайте два труба
// В нижней части камеры справа +250
var tube1 = templates.copy('Tube', camera.right + 250, camera.bottom - 130); // Внизу камеры
var tube2 = templates.copy('Tube', camera.right + 250, camera.top - 70); // Вверху экрана

// Измените текстуру второго труба в зависимости от текстуры первого труба
if (tube1.tex === 'Tube_01') { // Короткий труб будет результатом длинного труб
  tube2.tex = 'Tube_04';
} else if (tube1.tex === 'Tube_02') {
  tube2.tex = 'Tube_03';
} else if (tube1.tex === 'Tube_03') {
  tube2.tex = 'Tube_02';
} else if (tube1.tex === 'Tube_04') { // Длинный труб будет результатом короткого труб
  tube2.tex = 'Tube_01';
}
// Теперь, переверните верхний (второй) труб
tube2.scale.y = -1;
```
@tab CoffeeScript
```coffee
# Повторно установите таймер снова
@timer1 = 2;

# Создайте два труба
# В нижней части камеры справа +250
# Tube_01
tube1 = templates.copy 'Tube', camera.right + 250, camera.bottom - 130
# Вверху экрана справа +250
tube2 = templates.copy 'Tube', camera.right + 250, camera.top - 70

# Измените текстуру второго труба в зависимости от текстуры первого труба
if tube1.tex == 'Tube_01' { # Короткий труб будет результатом длинного труб
  tube2.tex = 'Tube_04';
} else if tube1.tex == 'Tube_02' {
  tube2.tex = 'Tube_03';
} else if tube1.tex == 'Tube_03' {
  tube2.tex = 'Tube_02';
} else if tube1.tex == 'Tube_04' { # Длинный труб будет результатом короткого труб
  tube2.tex = 'Tube_01';
}
# Теперь, переверните верхний (второй) труб
tube2.scale.y = -1
```
@tab Catnip
<catnip-block class=" command   note selected">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Wind it again" style="height: 21px;" readonly="readonly"></textarea>         </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/clock.svg" class="feather"><span class="catnip-block-aTextLabel">Set 1st timer to</span>          <input type="text" class="catnip-block-aConstantInput number " value="2" style=" width: 1.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">second(s)</span>              </catnip-block>

<catnip-block class=" command   note selected">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Create two tubes, one at the bottom of the camera and one at the top" style="height: 37px;" readonly="readonly"></textarea>         </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">Copy a template</span>          <span class="catnip-block-aConstantInput menu string ">   <img src="/assets/icons/image.svg" class="feather"><span>Tube</span></span>         <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/camera.svg" class="feather"><span class="catnip-block-aTextLabel">right side</span>     </catnip-block>  <span class="catnip-block-aTextLabel">+</span>                   <input type="text" class="catnip-block-aConstantInput number " value="250" style=" width: 3.5ch;    " readonly="readonly">     </catnip-block>          <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/camera.svg" class="feather"><span class="catnip-block-aTextLabel">bottom side</span>     </catnip-block>  <span class="catnip-block-aTextLabel">-</span>                   <input type="text" class="catnip-block-aConstantInput number " value="130" style=" width: 3.5ch;    " readonly="readonly">     </catnip-block>    <div class="catnip-block-aFiller"></div>        <span class="catnip-block-aTextLabel">store in</span>                  <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">tube1</span>              </catnip-block>         <div class="catnip-block-Options"> <div class="catnip-block-anOptionsToggle"> <img src="/assets/icons/chevron-down.svg" class="feather"><span>Advanced</span> <img src="/assets/icons/chevron-down.svg" class="feather"> </div>    </div>       </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">Copy a template</span>          <span class="catnip-block-aConstantInput menu string ">   <img src="/assets/icons/image.svg" class="feather"><span>Tube</span></span>         <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/camera.svg" class="feather"><span class="catnip-block-aTextLabel">right side</span>     </catnip-block>  <span class="catnip-block-aTextLabel">+</span>                   <input type="text" class="catnip-block-aConstantInput number " value="250" style=" width: 3.5ch;    " readonly="readonly">     </catnip-block>          <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/camera.svg" class="feather"><span class="catnip-block-aTextLabel">top side</span>     </catnip-block>  <span class="catnip-block-aTextLabel">-</span>                   <input type="text" class="catnip-block-aConstantInput number " value="70" style=" width: 2.5ch;    " readonly="readonly">     </catnip-block>    <div class="catnip-block-aFiller"></div>        <span class="catnip-block-aTextLabel">store in</span>                  <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">tube2</span>              </catnip-block>         <div class="catnip-block-Options"> <div class="catnip-block-anOptionsToggle"> <img src="/assets/icons/chevron-down.svg" class="feather"><span>Advanced</span> <img src="/assets/icons/chevron-down.svg" class="feather"> </div>    </div>       </catnip-block>

<catnip-block class=" command   note selected">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Change second tube's texture depending on which texture is used in the first tube" style="height: 37px;" readonly="readonly"></textarea>         </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed boolean boolean  ">           <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">read</span>          <input type="text" class="catnip-block-aConstantInput string " value="tex" style=" width: 3.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">from</span>                  <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">tube1</span>              </catnip-block>      </catnip-block>  <span class="catnip-block-aTextLabel">is</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " value="Tube_01" style=" width: 7.5ch;    " readonly="readonly">     </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command   note ">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Shortest tube will result in the longest tube" style="height: 21px;" readonly="readonly"></textarea>         </catnip-block>   <catnip-block class=" command void   ">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">With copy</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">tube2</span>              </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/droplet.svg" class="feather"><span class="catnip-block-aTextLabel">Set texture to</span>          <span class="catnip-block-aConstantInput menu string ">   <img src="/assets/icons/image.svg" class="feather"><span>Tube_04</span></span>     </catnip-block>    </catnip-block-list> </div>        </catnip-block>    </catnip-block-list> </div>        </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed boolean boolean  ">           <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">read</span>          <input type="text" class="catnip-block-aConstantInput string " value="tex" style=" width: 3.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">from</span>                  <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">tube1</span>              </catnip-block>      </catnip-block>  <span class="catnip-block-aTextLabel">is</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " value="Tube_02" style=" width: 7.5ch;    " readonly="readonly">     </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command void   ">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">With copy</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">tube2</span>              </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/droplet.svg" class="feather"><span class="catnip-block-aTextLabel">Set texture to</span>          <span class="catnip-block-aConstantInput menu string ">   <img src="/assets/icons/image.svg" class="feather"><span>Tube_03</span></span>     </catnip-block>    </catnip-block-list> </div>        </catnip-block>    </catnip-block-list> </div>        </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed boolean boolean  ">           <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">read</span>          <input type="text" class="catnip-block-aConstantInput string " value="tex" style=" width: 3.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">from</span>                  <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">tube1</span>              </catnip-block>      </catnip-block>  <span class="catnip-block-aTextLabel">is</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " value="Tube_03" style=" width: 7.5ch;    " readonly="readonly">     </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command void   ">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">With copy</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">tube2</span>              </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/droplet.svg" class="feather"><span class="catnip-block-aTextLabel">Set texture to</span>          <span class="catnip-block-aConstantInput menu string ">   <img src="/assets/icons/image.svg" class="feather"><span>Tube_02</span></span>     </catnip-block>    </catnip-block-list> </div>        </catnip-block>    </catnip-block-list> </div>        </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed boolean boolean  ">           <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">read</span>          <input type="text" class="catnip-block-aConstantInput string " value="tex" style=" width: 3.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">from</span>                  <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">tube1</span>              </catnip-block>      </catnip-block>  <span class="catnip-block-aTextLabel">is</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " value="Tube_04" style=" width: 7.5ch;    " readonly="readonly">     </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command   note ">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Longest will result in the shortest one" style="height: 21px;" readonly="readonly"></textarea>         </catnip-block>   <catnip-block class=" command void   ">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">With copy</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">tube2</span>              </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/droplet.svg" class="feather"><span class="catnip-block-aTextLabel">Set texture to</span>          <span class="catnip-block-aConstantInput menu string ">   <img src="/assets/icons/image.svg" class="feather"><span>Tube_01</span></span>     </catnip-block>    </catnip-block-list> </div>        </catnip-block>    </catnip-block-list> </div>        </catnip-block>

<catnip-block class=" command   note selected">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Thus we will always get gaps of the same size, but with random tubes." style="height: 37px;" readonly="readonly"></textarea>         </catnip-block>

<catnip-block class=" command   note selected">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Now, flip the upper (second) tube" style="height: 21px;" readonly="readonly"></textarea>         </catnip-block>

<catnip-block class=" command void   selected">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">With copy</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">tube2</span>              </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/droplet.svg" class="feather"><span class="catnip-block-aTextLabel">Set scale to</span>          <input type="text" class="catnip-block-aConstantInput number " value="1" style=" width: 1.5ch;    " readonly="readonly">          <input type="text" class="catnip-block-aConstantInput number " value="-1" style=" width: 2.5ch;    " readonly="readonly">     </catnip-block>    </catnip-block-list> </div>        </catnip-block>
:::

Здесь много кода!

`timer1` будет равен нулю, когда это событие срабатывает. Когда это произойдет, мы устанавливаем его значение снова в положительное число, чтобы он сработал позже. Здесь мы добавляем 2 секунды. ct.js будет автоматически считать его вниз снова, потому что это специальная переменная.

Мы создаем две копии с `templates.copy(templateName, xPosition, yPosition)` и храним ссылки на них в переменных `tube1` и `tube2`. В начале их высота будет полностью нормальной, потому что их код создания с `random.dice` будет запущен мгновенно после создания. Это приведет к блокировке пути в хорошей части случаев, когда обе трубы оказались длинными. Чтобы исправить это, мы читаем имя текстуры первой трубы `tube1.tex` и устанавливаем текстуру второй трубы `tube2` в зависимости от извлеченного значения.

`camera.right`, `camera.left`, `camera.top`, `camera.bottom` представляют координаты границ просмотра в игровых координатах. Здесь мы используем их, чтобы создать трубы за пределами экрана, немного вправо, где заканчивается viewport, и выше нижнего и верхнего края viewport.

Наконец, мы переворачиваем вторую трубу, выполнив `tube2.scale.y = -1`. Это точно та же операция, которую мы бы сделали при горизонтальном переворачивании изображения в редакторе графики. Для справки, существует также `tube2.scale.x`, который устанавливает его горизонтальный масштаб.

Если мы запустим проект сейчас, мы увидим хорошо сгенерированные трубы, которые оставляют небольшой промежуток между ними, чтобы пролезть через него. Но подождите, кошка слишком большая, чтобы пролезть через нее! О нет, может быть, я должен был назвать этот учебник "Жирная кошка"…

Не волнуйтесь, есть решение ✨ Мы будем использовать тот же масштаб, чтобы сделать кошку немного меньше. Значения масштаба могут быть не только `1` и `-1`, но и все что между ними, чтобы уменьшить объект или увеличить его больше, чем 1, чтобы увеличить объекты.

Есть два метода масштабирования кошки:

* мы можем добавить строку `this.scale.x = this.scale.y = 0.65;` к событию "Создание" кошки;
* или мы можем сделать то же самое, изменив ее в редакторе комнаты с помощью инструмента "Выбор".

![Изменение масштаба кота в редакторе комнаты](../../images/tutorials/tutJettyCat_24.png)


### Удаление ненужных копий

Когда мы создаем копии через время, их количество будет постоянно увеличиваться. Если мы ничего не сделаем с этим, игра будет медленно съедать так много памяти компьютера, что в конечном итоге она зависнет. Чтобы этого не произошло, мы будем удалять копии, которые оказались слева от камеры.

Добавьте следующий код в событие "start" фрейма трубы:

::: tabs#tutorial
@tab JavaScript
```js
if (this.x < camera.left - 150) {
    this.kill = true;
}
```
@tab CoffeeScript
```coffee
if @x < camera.left - 150
    @kill = true
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed boolean boolean  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">x</span>     </catnip-block>  <span class="catnip-block-aTextLabel">&lt;</span>                  <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/camera.svg" class="feather"><span class="catnip-block-aTextLabel">left side</span>     </catnip-block>  <span class="catnip-block-aTextLabel">-</span>                   <input type="text" class="catnip-block-aConstantInput number " value="150" style=" width: 3.5ch;    " readonly="readonly">     </catnip-block>      </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">Destroy this copy</span>     </catnip-block>    </catnip-block-list> </div>        </catnip-block>
:::

## Добавление звёзд

Давайте добавим шаблон для бонусных звёзд, которые будут увеличивать счёт при сборе. Мы сделаем следующее:

1. Настройте переменную счёта в коде комнаты "Создание".
2. Создайте новый шаблон для бонусных звёзд.
3. Добавьте немного логики в событие столкновения звезд с шаблоном, чтобы уничтожать звезду при столкновении с котом.
4. Создайте новую комнату и шаблон для нее, чтобы отобразить счёт.
5. Поместите эту новую комнату в основную.

Теперь откройте события комнаты `InGame` и добавьте строку `this.score = 0;` в событие старта комнаты. Это создаст переменную, которую мы сможем редактировать и читать в любом другом экземпляре.

Создайте новый шаблон и назовите его "Star". Задайте текстуру для него.

Создайте событие Столкновения с шаблоном и выберите "PotatoCat" в качестве шаблона. Затем добавьте следующий скрипт:

::: tabs#tutorial
@tab JavaScript
```js
this.kill = true;
rooms.current.score += 1;
```
@tab CoffeeScript
```coffee
@kill = true
rooms.current.score += 1
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">Destroy this copy</span>     </catnip-block>

<catnip-block class=" command void   selected">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">With copy</span>         <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/room.svg" class="feather"><span class="catnip-block-aTextLabel">current room</span>     </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Write</span>          <input type="text" class="catnip-block-aConstantInput string " style=" width: 5.5ch;    " value="score" readonly="readonly"> <span class="catnip-block-aTextLabel">value</span>                  <catnip-block class=" computed number wildcard  ">           <catnip-block class=" computed wildcard number  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">read</span>          <input type="text" class="catnip-block-aConstantInput string " style=" width: 5.5ch;    " value="score" readonly="readonly">     </catnip-block>  <span class="catnip-block-aTextLabel">+</span>                   <input type="text" class="catnip-block-aConstantInput number " style=" width: 1.5ch;    " value="1" readonly="readonly">     </catnip-block>      </catnip-block>    </catnip-block-list> </div>        </catnip-block>
:::

::: tip
Вместо использования события столкновения можно вызвать `place.meet` в условном операторе до выполнения этого кода в событии старта кадра. `place.meet` похож на `place.occupied`, но он проверяет не против групп коллизий, а против конкретного шаблона.
:::

Это событие проверяет, сталкивается ли звезда с котом. Если да, то `this.kill = true` указывает, что звезду нужно удалить. `rooms.current.score += 1;` увеличивает нашу переменную балла, которая была создана ранее в коде комнаты "Создание".

::: tip
`rooms.current` всегда указывает на текущую комнату. Если есть вложенные комнаты, то `rooms.current` будет указывать на основную комнату.
:::

Нам также нужно добавить этот код в событие старта кадра, чтобы предотвратить утечку памяти и удалить звезды, которые не были собраны:

::: tabs#tutorial
@tab JavaScript
```js
if (this.x < camera.left - 150) {
  this.kill = true;
}
```
@tab CoffeeScript
```coffee
if @x < camera.left - 150
    @kill = true
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed boolean boolean  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">x</span>     </catnip-block>  <span class="catnip-block-aTextLabel">&lt;</span>                  <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/camera.svg" class="feather"><span class="catnip-block-aTextLabel">left side</span>     </catnip-block>  <span class="catnip-block-aTextLabel">-</span>                   <input type="text" class="catnip-block-aConstantInput number " value="150" style=" width: 3.5ch;    " readonly="readonly">     </catnip-block>      </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">Destroy this copy</span>     </catnip-block>    </catnip-block-list> </div>        </catnip-block>
:::

### Создание звёзд

В коде события таймера 1 комнаты добавьте пару строк (отмеченных выделением), которые будут добавлять звезду с 30% шансом где-то между следующими двумя трубами. Это будет использовать методы из модуля `random`:


::: tabs#tutorial
@tab JavaScript
```js {23,24,25,26}
// Wind it again
this.timer1 = 2

// Create two tubes
var tube1 = templates.copy('Tube', camera.right + 250, camera.bottom - 130); // At the bottom of the camera
var tube2 = templates.copy('Tube', camera.right + 250, camera.top - 70); // At the top

// Change second tube's texture depending on which texture is used in the first tube
if (tube1.tex === 'Tube_01') { // Shortest tube will result in the longest tube
    tube2.tex = 'Tube_04';
} else if (tube1.tex === 'Tube_02') {
    tube2.tex = 'Tube_03';
} else if (tube1.tex === 'Tube_03') {
    tube2.tex = 'Tube_02';
} else if (tube1.tex === 'Tube_04') { // Longest will result in the shortest one
    tube2.tex = 'Tube_01';
}
// Thus we will always get gaps of the same size, but with random tubes.

// Now, flip the upper (second) tube
tube2.scale.y = -1;

// Create a star bonus with 30% chance somewhere in between top and bottom edge, with 300px padding.
if (random.chance(30)) {
    templates.copy('Star', camera.right + 250 + 500, random.range(camera.top + 300, camera.bottom - 300));
}
```
@tab CoffeeScript
```coffee{26,27,28}
# Wind it again
@timer1 = 2

# Create two tubes
# At the bottom of the camera
tube1 = templates.copy 'Tube', camera.right + 250, camera.bottom - 130
# At the top
tube2 = templates.copy 'Tube', camera.right + 250, camera.top - 70

# Change second tube's texture depending on which texture is used in the first tube
if tube1.tex == 'Tube_01'
    # Shortest tube will result in the longest tube
    tube2.tex = 'Tube_04'
else if tube1.tex == 'Tube_02'
    tube2.tex = 'Tube_03'
else if tube1.tex == 'Tube_03'
    tube2.tex = 'Tube_02'
else if tube1.tex == 'Tube_04'
    # Longest will result in the shortest one
    tube2.tex = 'Tube_01'
# Thus we will always get gaps of the same size, but with random tubes.

# Now, flip the upper (second) tube
tube2.scale.y = -1

# Create a star bonus with 30% chance somewhere in between top and bottom edge, with 300px padding.
if random.chance(30)
    templates.copy 'Star', camera.right + 250 + 500, random.range(camera.top + 300, camera.bottom - 300)
```
@tab Catnip
<catnip-block class=" command   note selected">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Wind it again" style="height: 21px;" readonly="readonly"></textarea>         </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/clock.svg" class="feather"><span class="catnip-block-aTextLabel">Set 1st timer to</span>          <input type="text" class="catnip-block-aConstantInput number " value="2" style=" width: 1.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">second(s)</span>              </catnip-block>

<catnip-block class=" command   note selected">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Create two tubes, one at the bottom of the camera and one at the top" style="height: 37px;" readonly="readonly"></textarea>         </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">Copy a template</span>          <span class="catnip-block-aConstantInput menu string ">   <img src="/assets/icons/image.svg" class="feather"><span>Tube</span></span>         <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/camera.svg" class="feather"><span class="catnip-block-aTextLabel">right side</span>     </catnip-block>  <span class="catnip-block-aTextLabel">+</span>                   <input type="text" class="catnip-block-aConstantInput number " value="250" style=" width: 3.5ch;    " readonly="readonly">     </catnip-block>          <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/camera.svg" class="feather"><span class="catnip-block-aTextLabel">bottom side</span>     </catnip-block>  <span class="catnip-block-aTextLabel">-</span>                   <input type="text" class="catnip-block-aConstantInput number " value="130" style=" width: 3.5ch;    " readonly="readonly">     </catnip-block>    <div class="catnip-block-aFiller"></div>        <span class="catnip-block-aTextLabel">store in</span>                  <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">tube1</span>              </catnip-block>         <div class="catnip-block-Options"> <div class="catnip-block-anOptionsToggle"> <img src="/assets/icons/chevron-down.svg" class="feather"><span>Advanced</span> <img src="/assets/icons/chevron-down.svg" class="feather"> </div>    </div>       </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">Copy a template</span>          <span class="catnip-block-aConstantInput menu string ">   <img src="/assets/icons/image.svg" class="feather"><span>Tube</span></span>         <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/camera.svg" class="feather"><span class="catnip-block-aTextLabel">right side</span>     </catnip-block>  <span class="catnip-block-aTextLabel">+</span>                   <input type="text" class="catnip-block-aConstantInput number " value="250" style=" width: 3.5ch;    " readonly="readonly">     </catnip-block>          <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/camera.svg" class="feather"><span class="catnip-block-aTextLabel">top side</span>     </catnip-block>  <span class="catnip-block-aTextLabel">-</span>                   <input type="text" class="catnip-block-aConstantInput number " value="70" style=" width: 2.5ch;    " readonly="readonly">     </catnip-block>    <div class="catnip-block-aFiller"></div>        <span class="catnip-block-aTextLabel">store in</span>                  <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">tube2</span>              </catnip-block>         <div class="catnip-block-Options"> <div class="catnip-block-anOptionsToggle"> <img src="/assets/icons/chevron-down.svg" class="feather"><span>Advanced</span> <img src="/assets/icons/chevron-down.svg" class="feather"> </div>    </div>       </catnip-block>

<catnip-block class=" command   note selected">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Change second tube's texture depending on which texture is used in the first tube" style="height: 37px;" readonly="readonly"></textarea>         </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed boolean boolean  ">           <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">read</span>          <input type="text" class="catnip-block-aConstantInput string " value="tex" style=" width: 3.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">from</span>                  <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">tube1</span>              </catnip-block>      </catnip-block>  <span class="catnip-block-aTextLabel">is</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " value="Tube_01" style=" width: 7.5ch;    " readonly="readonly">     </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command   note ">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Shortest tube will result in the longest tube" style="height: 21px;" readonly="readonly"></textarea>         </catnip-block>   <catnip-block class=" command void   ">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">With copy</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">tube2</span>              </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/droplet.svg" class="feather"><span class="catnip-block-aTextLabel">Set texture to</span>          <span class="catnip-block-aConstantInput menu string ">   <img src="/assets/icons/image.svg" class="feather"><span>Tube_04</span></span>     </catnip-block>    </catnip-block-list> </div>        </catnip-block>    </catnip-block-list> </div>        </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed boolean boolean  ">           <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">read</span>          <input type="text" class="catnip-block-aConstantInput string " value="tex" style=" width: 3.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">from</span>                  <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">tube1</span>              </catnip-block>      </catnip-block>  <span class="catnip-block-aTextLabel">is</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " value="Tube_02" style=" width: 7.5ch;    " readonly="readonly">     </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command void   ">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">With copy</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">tube2</span>              </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/droplet.svg" class="feather"><span class="catnip-block-aTextLabel">Set texture to</span>          <span class="catnip-block-aConstantInput menu string ">   <img src="/assets/icons/image.svg" class="feather"><span>Tube_03</span></span>     </catnip-block>    </catnip-block-list> </div>        </catnip-block>    </catnip-block-list> </div>        </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed boolean boolean  ">           <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">read</span>          <input type="text" class="catnip-block-aConstantInput string " value="tex" style=" width: 3.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">from</span>                  <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">tube1</span>              </catnip-block>      </catnip-block>  <span class="catnip-block-aTextLabel">is</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " value="Tube_03" style=" width: 7.5ch;    " readonly="readonly">     </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command void   ">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">With copy</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">tube2</span>              </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/droplet.svg" class="feather"><span class="catnip-block-aTextLabel">Set texture to</span>          <span class="catnip-block-aConstantInput menu string ">   <img src="/assets/icons/image.svg" class="feather"><span>Tube_02</span></span>     </catnip-block>    </catnip-block-list> </div>        </catnip-block>    </catnip-block-list> </div>        </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed boolean boolean  ">           <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">read</span>          <input type="text" class="catnip-block-aConstantInput string " value="tex" style=" width: 3.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">from</span>                  <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">tube1</span>              </catnip-block>      </catnip-block>  <span class="catnip-block-aTextLabel">is</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " value="Tube_04" style=" width: 7.5ch;    " readonly="readonly">     </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command   note ">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Longest will result in the shortest one" style="height: 21px;" readonly="readonly"></textarea>         </catnip-block>   <catnip-block class=" command void   ">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">With copy</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">tube2</span>              </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/droplet.svg" class="feather"><span class="catnip-block-aTextLabel">Set texture to</span>          <span class="catnip-block-aConstantInput menu string ">   <img src="/assets/icons/image.svg" class="feather"><span>Tube_01</span></span>     </catnip-block>    </catnip-block-list> </div>        </catnip-block>    </catnip-block-list> </div>        </catnip-block>

<catnip-block class=" command   note selected">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Thus we will always get gaps of the same size, but with random tubes." style="height: 37px;" readonly="readonly"></textarea>         </catnip-block>

<catnip-block class=" command   note selected">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Now, flip the upper (second) tube" style="height: 21px;" readonly="readonly"></textarea>         </catnip-block>

<catnip-block class=" command void   selected">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">With copy</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">tube2</span>              </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/droplet.svg" class="feather"><span class="catnip-block-aTextLabel">Set scale to</span>          <input type="text" class="catnip-block-aConstantInput number " value="1" style=" width: 1.5ch;    " readonly="readonly">          <input type="text" class="catnip-block-aConstantInput number " value="-1" style=" width: 2.5ch;    " readonly="readonly">     </catnip-block>    </catnip-block-list> </div>        </catnip-block>

<catnip-block class=" command   note selected">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Create a star bonus with 30% chance somewhere in between top and bottom edge, with 300px padding." style="height: 37px;" readonly="readonly"></textarea>         </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed boolean boolean  ">  <img src="/assets/icons/sort-numerically.svg" class="feather"><span class="catnip-block-aTextLabel">random chance</span>          <input type="text" class="catnip-block-aConstantInput number " value="30" style=" width: 2.5ch;    " readonly="readonly">          <input type="text" class="catnip-block-aConstantInput number " value="100" style=" width: 3.5ch;    " readonly="readonly">     </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/template.svg" class="feather"><span class="catnip-block-aTextLabel">Copy a template</span>          <span class="catnip-block-aConstantInput menu string ">   <img src="/assets/icons/image.svg" class="feather"><span>Star</span></span>         <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/camera.svg" class="feather"><span class="catnip-block-aTextLabel">right side</span>     </catnip-block>  <span class="catnip-block-aTextLabel">+</span>                  <catnip-block class=" computed number number  ">            <input type="text" class="catnip-block-aConstantInput number " value="250" style=" width: 3.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">+</span>                   <input type="text" class="catnip-block-aConstantInput number " value="500" style=" width: 3.5ch;    " readonly="readonly">     </catnip-block>      </catnip-block>          <catnip-block class=" computed number number  ">  <img src="/assets/icons/sort-numerically.svg" class="feather"><span class="catnip-block-aTextLabel">random range</span>         <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/camera.svg" class="feather"><span class="catnip-block-aTextLabel">top side</span>     </catnip-block>  <span class="catnip-block-aTextLabel">+</span>                   <input type="text" class="catnip-block-aConstantInput number " value="300" style=" width: 3.5ch;    " readonly="readonly">     </catnip-block>          <catnip-block class=" computed number number  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/camera.svg" class="feather"><span class="catnip-block-aTextLabel">bottom side</span>     </catnip-block>  <span class="catnip-block-aTextLabel">-</span>                   <input type="text" class="catnip-block-aConstantInput number " value="300" style=" width: 3.5ch;    " readonly="readonly">     </catnip-block>      </catnip-block>    <div class="catnip-block-aFiller"></div>        <span class="catnip-block-aTextLabel">store in</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " style=" width: 6.5ch;    " readonly="readonly">        <div class="catnip-block-Options"> <div class="catnip-block-anOptionsToggle"> <img src="/assets/icons/chevron-down.svg" class="feather"><span>Advanced</span> <img src="/assets/icons/chevron-down.svg" class="feather"> </div>    </div>       </catnip-block>    </catnip-block-list> </div>        </catnip-block>
:::

Функция `random.chance(30)` возвращает `true` 30 раз из 100 и `false` в остальных случаях. Вы можете отрегулировать значение, чтобы звезды появлялись чаще или реже.

Функция `random.range(a, b)` выбирает случайное значение в заданном диапазоне. В нашем случае мы вычисляем две координаты относительно камеры, так что звезды не появляются вблизи земли или верхней кромки экрана.

### Создание элемента интерфейса с счетчиком

В ct.js, начиная с версии 1.3, элементы интерфейса обычно создаются в отдельной комнате, которая затем внедряется в другие комнаты. Эти вложенные комнаты также часто называют "слойми".

Перейдите на вкладку "Ассеты" в верхней части окна ct.js и создайте новый стиль под "Новый ассет". Назовите его "Оранжевый". Здесь мы создадим текстовый стиль, который будем использовать для отображения счета, а также других текстовых строк.

На первой вкладке "Шрифт" установите размер шрифта 80 и вес 900. Установите межстрочный интервал 0, а затем выровняйте его по центру. Это сделает текст более толстым и большим.

![Настройка свойств шрифта в текстовом стиле ct.js](../../images/tutorials/tutJettyCat_24.png)

Перейдите на вкладку "Заполнение" и активируйте его. Давайте создадим вертикальную градиентную заливку. Мы будем использовать бледно-желтый и оранжевый цвета.

![Настройка свойств заполнения в текстовом стиле ct.js](../../images/tutorials/tutJettyCat_25.png)

Затем перейдите на вкладку "Линия", чтобы активировать ее. Установите цвет линии темно-коричневый, а также вес 10.

![Настройка свойств линии в текстовом стиле ct.js](../../images/tutorials/tutJettyCat_26.png)

Теперь мы можем сохранить стиль. После этого нам понадобятся два новых шаблона, которые будут отображать иконку звезды и счетчик.

Создайте новый шаблон и назовите его `StarCounter`. Используем в качестве текстуры нашу `Star` текстуру.

Теперь создайте еще один шаблон под названием `StarCounterLabel`. Он будет отображать значение счета рядом с копией `StarCounter`. Теперь перейдите от анимации к тексту.

![Переключение StarCounterLabel на текст](../../images/tutorials/tutJettyCat_16_2.png)

После перехода в текстовую копию вы можете нажать на призрачного котика и выбрать нужный стиль. Выберите наш "Оранжевый" стиль.

Нам нужно обновлять текстовую метку на каждом кадре. В событии "Конец кадра" введите строку `this.text = rooms.current.score;`. Свойство `this.text` позволяет легко редактировать метку текста копии, теперь, когда мы переключили ее на Текст. Вы также можете установить стандартный текст для этого шаблона в правой панели, чтобы он не отображал `<Empty>`, когда вы помещаете его в комнату.

::: tabs#tutorial
@tab JavaScript
```js
this.text = rooms.current.score;
```
@tab CoffeeScript
```coffee
@text = rooms.current.score
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/font.svg" class="feather"><span class="catnip-block-aTextLabel">Set text</span>         <catnip-block class=" computed wildcard string  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">read</span>          <input type="text" class="catnip-block-aConstantInput string " value="score" style=" width: 5.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">of the current room</span>              </catnip-block>      </catnip-block>
:::


Наконец, давайте создадим комнату для этого счетчика и метки и поместим эту комнату внутри основной комнаты. Создайте новую комнату и назовите ее `UI_InGame`. Затем установите ее размер просмотра 1080x1920, чтобы он соответствовал размеру просмотра основной комнаты, пометьте ее как слой интерфейса и поместите копию счетчика и метку в верхнем левом углу:

![Создание слоя интерфейса в ct.js](../../images/tutorials/tutJettyCat_27.png)

Затем откройте комнату `InGame` и добавьте следующий код в конец ее кода комнаты:

::: tabs#tutorial
@tab JavaScript
```js
this.mainUi = rooms.append("UI_InGame");
```
@tab CoffeeScript
```coffee
@mainUi = rooms.append 'UI_InGame'
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/room.svg" class="feather"><span class="catnip-block-aTextLabel">Append a room</span>          <span class="catnip-block-aConstantInput menu string ">   <img src="/assets/icons/image.svg" class="feather"><span>UI_InGame</span></span>   <div class="catnip-block-aFiller"></div>        <span class="catnip-block-aTextLabel">store in</span>                  <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/archive.svg" class="feather"> <span class="catnip-block-aTextLabel">mainUi</span>              </catnip-block>         <div class="catnip-block-Options"> <div class="catnip-block-anOptionsToggle"> <img src="/assets/icons/chevron-down.svg" class="feather"><span>Advanced</span> <img src="/assets/icons/chevron-down.svg" class="feather"> </div>    </div>       </catnip-block>
:::

Мы будем ссылаться на эту комнату для дальнейшего использования. После этого в уровне должны начать появляться звезды, а счетчик очков должен отображаться в левом верхнем углу видового окна.

## Создание меню

Теперь мы добавим несколько комнат с типичными меню, чтобы наша игра выглядела завершенной:

- главное меню;
- экран паузы;
- и экран очков, который будет отображаться при неудаче.

### Основной меню

Откройте текстуру `Jetty_Cat` и убедитесь, что ее ось находится в центре. Затем создайте новый шаблон с ней. Он будет чисто декоративным, поэтому мы не будем писать здесь код.

Затем откройте текстуру "Button_Play" и убедитесь, что ее ось находится в центре, и ее форма столкновения является **круглой**.

![Форма столкновения кнопки "Play"](../../images/tutorials/tutJettyCat_28.png)

Далее создайте новый шаблон с этой текстурой. Создайте событие нажатия указателя и добавьте следующее:

::: tabs#tutorial
@tab JavaScript
```js
rooms.switch('InGame');
```
@tab CoffeeScript
```coffee
rooms.switch 'InGame';
```
@tab Catnip
<catnip-block class="command void selected">  <img src="/assets/icons/room.svg" class="feather"><span class="catnip-block-aTextLabel">Переключить на</span>          <span class="catnip-block-aConstantInput menu string ">   <img src="/assets/icons/image.svg" class="feather"><span>InGame</span></span>     </catnip-block>
:::

Это проверяет, нажимал ли игрок кнопку, и если да, переключает на наш основной зал.

::: tip
Если вы хотите использовать указатель вместо проверки кликов, поскольку кнопка "Play" находится на слое интерфейса, вам необходимо использовать `pointer.collidesUi(this)` вместо `pointer.collides(copy)`.
:::

Создайте новый зал и назовите его `MainMenu`. Добавьте фона в него и расположите недавно созданные копии так, чтобы это выглядело следующим образом:

![Размещение основного меню](../../images/tutorials/tutJettyCat_29.png)

При удержании клавиши Alt на клавиатуре поместите копии точно так, как вам нужно.

Если ваши копии исчезают или не размещаются должным образом, проверьте, что вы установили глубину ваших фонов на -20 и -10. Они могут перекрывать ваши элементы!

Если мы сейчас запустим игру, она все еще будет начинаться в основном зале. Чтобы изменить это, щелкните правой кнопкой мыши по залу `MainMenu`. В контекстном меню выберите "Установить в качестве стартовой комнаты".

![Установка стартовой комнаты в ct.js](../../images/tutorials/tutJettyCat_30.png)

### Меню паузы

Для меню паузы нам понадобятся несколько новых кнопок и новая комната, которая будет накладываться на нашу основную комнату и интерфейс.

Создайте шаблон для текстуры "Button_Pause". Убедитесь, что текстура "Button_Pause" имеет центр axis и имеет правильную **прямоугольную** форму, которая полностью охватывает текстуру.

Шаблон "Button_Pause" будет иметь следующий код в событии нажатия указателя:

::: tabs#tutorial
@tab JavaScript
```js
// Проверяем, нет ли у нас комнат с названием 'UI_Paused'
if (rooms.list['UI_Paused'].length === 0) {
    // Создаем комнату UI_Paused, помещаем ее поверх текущей (добавляем ее),
    // и указываем, что это слой интерфейса (isUi: true)
    rooms.append('UI_Paused', {
        isUi: true
    });
    // Устанавливаем u.delta в 0, эффективно останавливая игру
    pixiApp.ticker.speed = 0;
}
```
@tab CoffeeScript
```coffee
# Проверяем, нет ли у нас комнат с названием 'UI_Paused'
if rooms.list['UI_Paused'].length == 0 {
    # Создаем комнату UI_Paused, помещаем ее поверх текущей (добавляем ее),
    # и указываем, что это слой интерфейса (isUi: true)
    settings =
        isUi: true
    rooms.append 'UI_Paused', settings
    # Устанавливаем u.delta в 0, эффективно останавливая игру
    pixiApp.ticker.speed = 0
}
```
@tab Catnip
<catnip-block class=" command   note selected">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Check if we don't have any rooms called 'UI_Paused'" style="height: 21px;" readonly="readonly"></textarea>         </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed boolean boolean  ">           <catnip-block class=" computed number wildcard  ">  <img src="/assets/icons/grid.svg" class="feather"><span class="catnip-block-aTextLabel">length of</span>         <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/room.svg" class="feather"><span class="catnip-block-aTextLabel">rooms list</span>          <span class="catnip-block-aConstantInput menu wildcard ">   <img src="/assets/icons/image.svg" class="feather"><span>UI_Paused</span></span>     </catnip-block>      </catnip-block>  <span class="catnip-block-aTextLabel">is</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " value="0" style=" width: 1.5ch;    " readonly="readonly">     </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command   note ">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Create a room UI_Paused, put it above the current one (append it), and specify that it is a UI layer (isUi: true)" style="height: 53px;" readonly="readonly"></textarea>         </catnip-block>   <catnip-block class=" command   note ">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Turns u.delta into 0, effectively stopping the game" style="height: 21px;" readonly="readonly"></textarea>         </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/room.svg" class="feather"><span class="catnip-block-aTextLabel">Append a room</span>          <span class="catnip-block-aConstantInput menu string ">   <img src="/assets/icons/image.svg" class="feather"><span>UI_Paused</span></span>   <div class="catnip-block-aFiller"></div>        <span class="catnip-block-aTextLabel">store in</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " style=" width: 6.5ch;    " readonly="readonly">        <div class="catnip-block-Options"> <div class="catnip-block-anOptionsToggle"> <img src="/assets/icons/chevron-up.svg" class="feather"><span>Advanced</span> <img src="/assets/icons/chevron-up.svg" class="feather"> </div> <dl> <dt>Is this room a UI layer?</dt> <dd> <catnip-block class=" computed boolean boolean constant ">  <img src="/assets/icons/bool.svg" class="feather"><span class="catnip-block-aTextLabel">true</span>     </catnip-block>  </dd> </dl>  <div class="pad"> <button class="inline small"> <img src="/assets/icons/plus.svg" class="feather"><span>Add a custom property</span> </button> </div> </div>       </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/settings.svg" class="feather"><span class="catnip-block-aTextLabel">Set game speed to</span>          <input type="text" class="catnip-block-aConstantInput number " value="0" style=" width: 1.5ch;    " readonly="readonly">     </catnip-block>    </catnip-block-list> </div>        </catnip-block>
:::

Запомните имя "UI_Paused". Нам понадобится создать комнату с этим именем немного позже.

`pixiApp.ticker.speed` — это умножитель, который влияет на расчет `delta`. Когда он установлен в 0, игра фактически останавливается, так как `delta` для всех становится равным нулю. Наш кот и таймеры зависят от `delta`.

Откройте комнату `UI_InGame` и поместите созданный шаблон в верхний правый угол.

После этого создайте два новых шаблона, похожих на те, которые были созданы для `MainMenu`, используя текстуры `Button_Play` и `Pause`. Кнопка должна называться "Button_Continue", хотя.

Кнопка будет иметь следующий код в своем событии нажатия указателя:

::: tabs#tutorial
@tab JavaScript
```js
rooms.remove(this.getRoom());
pixiApp.ticker.speed = 1;
```
@tab CoffeeScript
```coffee
room = @getRoom()
rooms.remove room
pixiApp.ticker.speed = 1
```
@tab Catnip
<catnip-block class=" command void   selected">  <img src="/assets/icons/room.svg" class="feather"><span class="catnip-block-aTextLabel">Remove a room</span>         <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/room.svg" class="feather"><span class="catnip-block-aTextLabel">copy's owning room</span>     </catnip-block>      </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/settings.svg" class="feather"><span class="catnip-block-aTextLabel">Set game speed to</span>          <input type="text" class="catnip-block-aConstantInput number " style=" width: 1.5ch;    " value="1" readonly="readonly">     </catnip-block>
:::

`rooms.remove(room);` удаляет ранее добавленную комнату. Он не может удалить основную комнату, но он создан для удаления вложенных. `this.getRoom()` ищет комнату, которая владеет текущей копией. `pixiApp.ticker.speed = 1;` возвращает `delta` к нормальному поведению, останавливая игру.

Последний шаг — создать эту вложенную комнату, которая будет иметь кнопку «Продолжить» и декоративный заголовок. Создайте комнату под названием `UI_Paused` и поместите в нее копию `Button_Continue` и заголовок «Пауза». Убедитесь, что вы установили размер просмотра для нее равным 1080x1920!


### Экран счета

Последний шаг — создание экрана счета, который будет отображаться после того, как игрок проиграет. Нам понадобится один дополнительный заголовок и шаблон, который будет отображать финальный счет. Для кнопки повторить игру мы повторно используем шаблон `Button_Play`.

Создайте шаблон с текстурой `OhNo`. Он не должен иметь логики.

Другой, `EndGame_ScoreCounter`, будет текстом вместо спрайта, как и наш другой счет. Измените его на Текст и установите стиль «Оранжевый». Он также будет запоминать и отображать высокий счет игрока. Вставьте этот код в событие Создание:

::: tabs#tutorial
@tab JavaScript
```js
if (!('JettyCat_HighScore' in localStorage)) {
    localStorage['JettyCat_HighScore'] = rooms.current.score;
} else if (localStorage['JettyCat_HighScore'] < rooms.current.score) {
    localStorage['JettyCat_HighScore'] = rooms.current.score;
}

var scoreText = 'Your score: ' + rooms.current.score + '\nHighscore: ' + localStorage['JettyCat_HighScore'];

this.text = scoreText;
```
@tab CoffeeScript
```coffee
if !('JettyCat_HighScore' of localStorage)
    localStorage['JettyCat_HighScore'] = rooms.current.score
else if localStorage['JettyCat_HighScore'] < rooms.current.score
    localStorage['JettyCat_HighScore'] = rooms.current.score

scoreText = 'Your score: ' + rooms.current.score + '\nHighscore: ' + localStorage['JettyCat_HighScore']
style = styles.get 'Orange'

@text = scoreText
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Set</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">roomScore</span>              </catnip-block>  <span class="catnip-block-aTextLabel">value</span>                  <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">read</span>          <input type="text" class="catnip-block-aConstantInput string " value="score" style=" width: 5.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">of the current room</span>              </catnip-block>      </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">Set</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">currentHighScore</span>              </catnip-block>  <span class="catnip-block-aTextLabel">value</span>                  <catnip-block class=" computed string wildcard  ">  <img src="/assets/icons/save.svg" class="feather"><span class="catnip-block-aTextLabel">load from storage from key</span>          <input type="text" class="catnip-block-aConstantInput string " value="JettyCat_HighScore" style=" width: 18.5ch;    " readonly="readonly">     </catnip-block>      </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed boolean boolean  ">  <span class="catnip-block-aTextLabel">not</span>         <catnip-block class=" computed boolean boolean  ">  <img src="/assets/icons/save.svg" class="feather"><span class="catnip-block-aTextLabel">is key in storage</span>          <input type="text" class="catnip-block-aConstantInput string " value="JettyCat_HighScore" style=" width: 18.5ch;    " readonly="readonly">     </catnip-block>      </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/save.svg" class="feather"><span class="catnip-block-aTextLabel">Save to storage in key</span>          <input type="text" class="catnip-block-aConstantInput string " value="JettyCat_HighScore" style=" width: 18.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">value</span>                  <catnip-block class=" computed wildcard string userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">roomScore</span>              </catnip-block>      </catnip-block>    </catnip-block-list> </div>     <img src="/assets/icons/alert-circle.svg" class="feather">         <span class="catnip-block-aTextLabel">Else</span>                <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/help-circle.svg" class="feather"><span class="catnip-block-aTextLabel">If</span>         <catnip-block class=" computed boolean boolean  ">           <catnip-block class=" computed number number  ">  <img src="/assets/icons/sort-numerically.svg" class="feather"><span class="catnip-block-aTextLabel">to number</span>         <catnip-block class=" computed wildcard wildcard userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">currentHighScore</span>              </catnip-block>      </catnip-block>  <span class="catnip-block-aTextLabel">&lt;</span>                  <catnip-block class=" computed wildcard number userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">roomScore</span>              </catnip-block>      </catnip-block>        <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command    ">  <img src="/assets/icons/save.svg" class="feather"><span class="catnip-block-aTextLabel">Save to storage in key</span>          <input type="text" class="catnip-block-aConstantInput string " value="JettyCat_HighScore" style=" width: 18.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">value</span>                  <catnip-block class=" computed wildcard string userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">roomScore</span>              </catnip-block>      </catnip-block>    </catnip-block-list> </div>        </catnip-block>    </catnip-block-list> </div>        </catnip-block>

<catnip-block class=" command    selected">  <img src="/assets/icons/font.svg" class="feather"><span class="catnip-block-aTextLabel">Set text</span>         <catnip-block class=" computed string string  ">            <input type="text" class="catnip-block-aConstantInput string " value="Your score: " style=" width: 12.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">+</span>                  <catnip-block class=" computed wildcard string userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">roomScore</span>              </catnip-block>  <span class="catnip-block-aTextLabel">+</span>                  <catnip-block class=" computed string string  ">           <catnip-block class=" computed string string  ">  <img src="/assets/icons/string.svg" class="feather">          <input type="text" class="catnip-block-aConstantInput string " value="\nHighscore: " style=" width: 13.5ch;    " readonly="readonly">     </catnip-block>  <span class="catnip-block-aTextLabel">+</span>                  <catnip-block class=" computed wildcard string userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">currentHighScore</span>              </catnip-block>      </catnip-block>      </catnip-block>      </catnip-block>
:::

`localStorage` — это встроенный объект, который позволяет хранить текстовые данные в браузере. Более подробно о нем можно прочитать здесь: [здесь](./../tips-n-tricks/localstorage.md).

`if (!('JettyCat_HighScore' in localStorage))` проверяет, существует ли свойство `JettyCat_HighScore` в объекте `localStorage`. Это хороший способ проверить, есть ли какие-либо сохраненные данные. Кстати, это работает с копиями, комнатами и другими объектами.

Если там нет записи по данному ключу, мы устанавливаем значение `rooms.current.score` в `localStorage['JettyCat_HighScore']`. Если сохраненное значение меньше текущего, игрок побил свой счёт! Мы обновляем лучший результат.

Этот код:

::: tabs#tutorial
@tab JavaScript
```js
var scoreText = 'Ваш счет: ' + rooms.current.score + '\nЛучший счет: ' + localStorage['JettyCat_HighScore'];
```
@tab CoffeeScript
```coffee
scoreText = 'Ваш счет: ' + rooms.current.score + '\nЛучший счет: ' + localStorage['JettyCat_HighScore']
```
@tab Catnip
<catnip-block class=" command    selected">  <img src="/assets/icons/font.svg" class="feather"><span class="catnip-block-aTextLabel">Set text</span>         <catnip-block class=" computed string string  ">            <input type="text" class="catnip-block-aConstantInput string " value="Your score: " style=" width: 12.5ch;    " readonly="readonly"> <span class="catnip-block-aTextLabel">+</span>                  <catnip-block class=" computed wildcard string userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">roomScore</span>              </catnip-block>  <span class="catnip-block-aTextLabel">+</span>                  <catnip-block class=" computed string string  ">           <catnip-block class=" computed string string  ">  <img src="/assets/icons/string.svg" class="feather">          <input type="text" class="catnip-block-aConstantInput string " value="\nHighscore: " style=" width: 13.5ch;    " readonly="readonly">     </catnip-block>  <span class="catnip-block-aTextLabel">+</span>                  <catnip-block class=" computed wildcard string userdefined ">  <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">currentHighScore</span>              </catnip-block>      </catnip-block>      </catnip-block>      </catnip-block>
:::
сохраняет строку в временную переменную. Всё, определённое с помощью `var` существует только один кадр и в одном событии. Хотя это не служит какой-либо цели, это позволяет писать более чистый код и повторно использовать временные переменные. Комбинация `\n` говорит, что там будет пробел. С помощью оператора `+` мы объединяем наши строки с текущим и сохраненным значением. Наконец, мы устанавливаем текст дисплея к созданному переменной значению.

Создайте комнату `UI_OhNo` с созданным шаблоном.

![Местоположение EndGame_ScoreCounter копии](../../images/tutorials/tutJettyCat_31.png)

Поместите копию `EndGame_ScoreCounter` туда, где находится x. Теперь мы можем выровнять текст по центру с помощью «Выравнивать по центру» в инструментах UI. Здесь мы можем выбрать «Выравнивать по центру» в разделе «Выравнивание по»:

![Центрирование текста копии EndGame_ScoreCounter](../../images/tutorials/tutJettyCat_31_2.png)

Последнее, что нам нужно сделать — создать эту комнату при поражении и удалить слой с кнопкой паузы так, чтобы пауза не была возможна во время игры над экраном поражения. Откройте шаблон `PotatoCat` и перейдите к событию Уничтожения. Добавьте этот код сразу после строки `camera.follow = false;`:

::: tabs#tutorial
@tab JavaScript
```js
// Удалить слой с кнопкой паузы
rooms.remove(rooms.current.mainUi);

// Подождать 1000 миллисекунд (за один секунду)
u.wait(1000)
.then(() => {
    // Создать новую комнату
    this.createRoom('UI_OhNo');
})
```
@tab CoffeeScript
```coffee
# Удалить слой с кнопкой паузы
rooms.remove(rooms.current.mainUi);

# Подождать 1000 миллисекунд (за один секунду)
u.wait(1000)
.then(() => {
    # Создать новую комнату
    rooms.append('UI_OhNo', {
        isUi: true
    });
})
```
@tab Catnip
<catnip-block class=" command   note selected">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Remove the layer with score and a pause button" style="height: 21px;" readonly="readonly"></textarea>         </catnip-block>

<catnip-block class=" command void   selected">  <img src="/assets/icons/room.svg" class="feather"><span class="catnip-block-aTextLabel">Remove a room</span>         <catnip-block class=" computed wildcard wildcard  ">  <img src="/assets/icons/code-alt.svg" class="feather"><span class="catnip-block-aTextLabel">read</span>          <input type="text" class="catnip-block-aConstantInput string " style=" width: 6.5ch;    " value="mainUi" readonly="readonly"> <span class="catnip-block-aTextLabel">of the current room</span>              </catnip-block>      </catnip-block>

<catnip-block class=" command   note selected">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Wait for 1000 milliseconds (for one second)" style="height: 21px;" readonly="readonly"></textarea>         </catnip-block>

<catnip-block class=" command wildcard   selected">  <img src="/assets/icons/tool.svg" class="feather"><span class="catnip-block-aTextLabel">Delay, in milliseconds</span>          <input type="text" class="catnip-block-aConstantInput number " style=" width: 4.5ch;    " value="1000" readonly="readonly">   <div class="catnip-block-aFiller"></div>         <span class="catnip-block-anAsyncMarker"> <img src="/assets/icons/clock.svg" class="feather"></span>            <div class="catnip-block-aBreak"></div>        <img src="/assets/icons/redo.svg" class="feather">         <span class="catnip-block-aTextLabel">Then</span>                <div class="catnip-block-Blocks"> <catnip-block-list>   <catnip-block class=" command   note ">  <img src="/assets/icons/message-circle.svg" class="feather"><span class="catnip-block-aTextLabel">Note</span>      <textarea value="Add a layer with &quot;Lose&quot; UI" style="height: 21px;" readonly="readonly"></textarea>         </catnip-block>   <catnip-block class=" command    ">  <img src="/assets/icons/room.svg" class="feather"><span class="catnip-block-aTextLabel">Append a room</span>          <span class="catnip-block-aConstantInput menu string ">   <img src="/assets/icons/image.svg" class="feather"><span>UI_OhNo</span></span>   <div class="catnip-block-aFiller"></div>        <span class="catnip-block-aTextLabel">store in</span>                   <input type="text" class="catnip-block-aConstantInput wildcard " style=" width: 6.5ch;    " readonly="readonly">        <div class="catnip-block-Options"> <div class="catnip-block-anOptionsToggle"> <img src="/assets/icons/chevron-up.svg" class="feather"><span>Advanced</span> <img src="/assets/icons/chevron-up.svg" class="feather"> </div> <dl> <dt>Is this room a UI layer?</dt> <dd> <catnip-block class=" computed boolean boolean constant ">  <img src="/assets/icons/bool.svg" class="feather"><span class="catnip-block-aTextLabel">true</span>     </catnip-block>  </dd> </dl>  <div class="pad"> <button class="inline small"> <img src="/assets/icons/plus.svg" class="feather"><span>Add a custom property</span> </button> </div> </div>       </catnip-block>    </catnip-block-list> </div>       <div class="catnip-block-aBreak"></div>        <img src="/assets/icons/alert-octagon.svg" class="feather">         <span class="catnip-block-aTextLabel">On error</span>                <div class="catnip-block-Blocks"> <catnip-block-list> <div class="catnip-block-aBlockPlaceholder"> <img src="/assets/icons/thumbs-up.svg" class="feather"><span class="catnip-block-aTextLabel">Do nothing</span>  </div>   </catnip-block-list> </div>        </catnip-block>
:::

И… Вы сделали это! Игра полностью готова к игре!

:::tip
`u.wait(1000)` — это асинхронный метод, который ждёт одну секунду, а затем выполняет заданный код в части `.then(() => {…})`. "Асинхронный" означает, что код выполняется вне события старта Frame и происходит позже в игре.

Вы всегда найдёте структуру `method().then(() => {…})`, работая с асинхронными действиями. В мире JavaScript такие действия также называются "Promise". Однако, если вам не нужно их использовать, вы можете обойтись без части `.then(() => {…})`.
:::

:::tip
`u.wait` — это просто другой способ подождать секунду перед выполнением кода. Вы также можете использовать событие Timer 1 и `this.timer1`, чтобы сделать то же самое!
:::

## Вот и всё!

Для переходов, эффектов частиц и другой изысканной атрибутики посетите [вторая часть этого руководства](./making-games-polishing-jettycat.md), где мы отполируем игру.

Попробуйте изменить следующее, чтобы потренироваться в программировании:

* Измените движение кошки, чтобы оно было более похожим на Flappy Bird: сделайте так, чтобы кошка резво поднималась вверх при нажатии на экран игроком, но ничего не делала, если игрок продолжает нажимать.
* Добавьте вращающиеся трубы, чтобы сделать игру сложнее.
* Добавьте счетчик жизней и разрешите игроку получить 3 удара, прежде чем он потеряет все очки.
* Добавьте звуки! [Посетите документацию по звукам, чтобы узнать, как воспроизводить их в своей игре](./../sounds.md).

