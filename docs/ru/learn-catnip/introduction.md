# Введение в Catnip (Котомяту)

::: note Автоматически переведённая страница
К сожалению, на полный ручной перевод у нас не хватает ресурсов.
Если вы увидели ошибку — отправьте пул-риквест с исправлениями (ссылка для редактирования в конце страницы).
:::

Catnip, или Котомята по-русски — это визуальный язык программирования, созданный специально для ct.js. Он похож на Google Blocks или язык Scratch, но при этом имеет множество улучшений для удобства использования по сравнению с этими языками. Он компилируется непосредственно в JavaScript, поэтому он такой же быстрый и мощный. На этой странице мы рассмотрим его функции и как писать скрипты с помощью него.

::: tip
Если вы еще не сделали этого, ознакомьтесь с [основными концепциями](../ct-concepts.md), чтобы познакомиться с различными типами ресурсов в ct.js.
:::

## Создание проекта Catnip

При создании проекта вы можете выбрать Catnip в качестве основного языка программирования. После этого у вас будет редактор Catnip вместо обычного кода для каждого шаблона, комнаты и поведения.

Вы также можете использовать Catnip в любом ассете типа Скрипт, так как у них есть настройка используемого языка внутри их редактора.

## Написание сценариев для Catnip

Когда вы открываете скриптовый актив (шаблон, поведение или переходите к панели событий комнаты), у вас будет три-четыре колонки:

1. Колонка с **главными настройками ассета**, такими как текстура шаблона и список событий в этом ассете;
2. Главная **зона для скриптов**, где вы помещаете свои блоки;
3. **Библиотека блоков** со всеми блоками, которые вы можете использовать;
4. В шаблонах есть четвертая колонка с **свойствами шаблона**. Если вам нужно больше места, вы можете свернуть ее с помощью маленькой кнопки в правом верхнем углу.

![Четыре колонки при кодировании шаблонов](../../images/learnCatnip/codingPanes.png)

Сначала вам нужно создать событие в нижней части первой колонки. Событие — это то, что запускает ваши скрипты, и вы можете создавать разные события для того, чтобы ваши шаблоны реагировали на разные действия в игре.

Вы можете помещать блоки несколькими способами:

1. Вы можете перетаскивать блоки из библиотеки блоков в зону для скриптов;
2. Вы также можете _переместить курсор мыши между блоками или в верхнюю часть скрипта_ — появится линия с кнопкой «плюс», которая откроет поле поиска. Вы можете поместить первый блок, нажав Enter или переключиться между ними с помощью клавиши Tab. Помещение любого блока с помощью этого поиска автоматически откроет новое окно поиска, позволяя быстро вводить серию блоков с клавиатуры.

![Открытие меню поиска в Catnip](../../images/learnCatnip/searchButton.png)
![Поиск блоков в Catnip](../../images/learnCatnip/searchMenu.png)

Аналогичный поиск расположен в верхней части библиотеки блоков, но вы сможете помещать блоки только с помощью перетаскивания (поскольку иначе как узнать, куда нужно их поместить?). Оба поиска будут выводить блоки, если вы вводите имена блоков на английском языке или на языке интерфейса, используемого в Catnip.

## Типы блоков

В каждой блоке Catnip есть либо **вычисляемый блок**, либо **командный блок**. Командные блоки имеют прямоугольную форму и обычно используются для выполнения определенных действий. Вычисляемые блоки извлекают значения или рассчитывают что-то, что можно использовать в командных блоках или сложных формулах из нескольких вычисляемых блоков. Оба типа блоков могут иметь **аргументы**, которые представляют собой слоты, которые можно заполнить вычисляемыми блоками или вручную ввести значение.

| Командный блок с одним аргументом | Вычисляемый блок |
|-----------------|-----------------|
| <catnip-block class="command void selected">  <img src="/assets/icons/room.svg" class="feather"><span class="catnip-block-aTextLabel">Перейти к</span>          <span class="catnip-block-aConstantInput menu string ">   <img src="/assets/icons/image.svg" class="feather"><span>MainMenu</span></span>     </catnip-block> | <catnip-block class="computed wildcard wildcard ">  <img src="/assets/icons/room.svg" class="feather"><span class="catnip-block-aTextLabel">текущая комната</span>     </catnip-block> |

Вычисляемые блоки отличаются цветом, а цвет указывает на тип возвращаемого значения:

- Желтые блоки используются для логических значений, которые могут быть либо `true`, либо `false`. Эти значения обычно используются в логических операторах и иногда как переключатели определенных параметров.
- Зеленые блоки хранят числовые значения, которые могут быть целыми или дробными числами.
- Розовые блоки хранят строковые значения.
- Синие блоки хранят цветовые значения.
- Фиолетовые блоки называются **универсальными** (или **джокерами**, с их английского названия *wildcard*) и могут хранить значения любого типа. Они также могут быть использованы для ссылки на другие копии, хранения сложных структур и данных, которые вы сами определяете.

| Логический | Числовой | Строковый | Цветовой | Универсальный |
| - | - | - | - | - |
| <catnip-block class="computed boolean wildcard ">  <span class="catnip-block-aTextLabel">не</span>         <catnip-block class="computed boolean boolean constant ">  <img src="/assets/icons/bool.svg" class="feather"><span class="catnip-block-aTextLabel">true</span>     </catnip-block>      </catnip-block> | <catnip-block class="computed number wildcard ">  <img src="/assets/icons/move.svg" class="feather"><span class="catnip-block-aTextLabel">скорость</span>     </catnip-block> | <catnip-block class="computed string wildcard ">  <img src="/assets/icons/string.svg" class="feather">          <input type="text" class="catnip-block-aConstantInput string " style=" width: 5.5ch;    " value="пицца" readonly="readonly">     </catnip-block> | <catnip-block class="computed color wildcard ">  <img src="/assets/icons/droplet.svg" class="feather"><span class="catnip-block-aTextLabel">цвет</span>          <input type="text" class="catnip-block-aConstantInput color " style=" width: 7.5ch; background-color: #4FBEE7; border-color: #4FBEE7; color: black; " value="#4FBEE7" readonly="readonly">     </catnip-block> | <catnip-block class="computed wildcard wildcard ">  <img src="/assets/icons/room.svg" class="feather"><span class="catnip-block-aTextLabel">текущая комната</span>     </catnip-block> |

За исключением универсальных блоков, вы можете поместить вычисляемый блок только в слоты соответствующего типа.

Чтобы облегчить преобразования типов (например, при необходимости форматирования строки с динамическим переменной цены), Catnip имеет несколько специальных вычисляемых блоков:

- <catnip-block class="computed string wildcard ">  <img src="/assets/icons/string.svg" class="feather"><span class="catnip-block-aTextLabel">в строку</span>          <input type="text" class="catnip-block-aConstantInput wildcard invalid" style=" width: 3.5ch;    " readonly="readonly">     </catnip-block>
- <catnip-block class="computed number wildcard ">  <img src="/assets/icons/sort-numerically.svg" class="feather"><span class="catnip-block-aTextLabel">в число</span>          <input type="text" class="catnip-block-aConstantInput wildcard invalid" style=" width: 3.5ch;    " readonly="readonly">     </catnip-block>
- <catnip-block class="computed boolean wildcard ">  <img src="/assets/icons/bool.svg" class="feather"><span class="catnip-block-aTextLabel">в булево</span>          <input type="text" class="catnip-block-aConstantInput wildcard invalid" style=" width: 3.5ch;    " readonly="readonly">     </catnip-block>

### Пример: изменить текст в строку, содержащую число

<catnip-block class="command selected">
  <img src="/assets/icons/font.svg" class="feather">
  <span class="catnip-block-aTextLabel">Задать текст</span>
  <catnip-block class="computed string string ">
    <input type="text" class="catnip-block-aConstantInput string " style="width: 9.5ch;" value="Купить за $" readonly="readonly">
    <span class="catnip-block-aTextLabel">+</span>
    <catnip-block class="computed string string ">
      <img src="/assets/icons/string.svg" class="feather">
      <span class="catnip-block-aTextLabel">в строку</span>
      <catnip-block class="computed number wildcard ">
        <catnip-block class="computed wildcard number userdefined ">
          <img src="/assets/icons/archive.svg" class="feather">
          <span class="catnip-block-aTextLabel">цена</span>
        </catnip-block>
        <span class="catnip-block-aTextLabel">x</span>
        <catnip-block class="computed wildcard number userdefined ">
          <img src="/assets/icons/archive.svg" class="feather">
          <span class="catnip-block-aTextLabel">скидка</span>
        </catnip-block>
      </catnip-block>
    </catnip-block>
  </catnip-block>
</catnip-block>

## Свойства и переменные

У Catnip огромное количество блоков для манипуляции внешним видом, положением и движением ваших копий, но чаще всего вам понадобится создать дополнительные значения, чтобы управлять логикой игры. Эти значения называются **свойствами** и **переменными**, и их можно рассматривать как помеченные имена с данными. И свойства, и переменные — это вычислительные блоки, которые вы можете использовать везде в Catnip.

В зависимости от того, где и в каком событии вы пишете код, вы можете использовать несколько типов переменных и свойств:

- **Обычные свойства** (например, <catnip-block class="computed wildcard number userdefined"> <img src="/assets/icons/archive.svg" class="feather"> <span class="catnip-block-aTextLabel">price</span></catnip-block>). Вы можете создавать их в верхней части библиотеки блоков в категории «Свойства». Эти свойства сохраняются непосредственно в копии (или экземпляре комнаты, если вы определяете их в событии комнаты) и не разделяются. Такие переменные полезны для отслеживания очков здоровья единицы.
- **Обычные переменные** (например, <catnip-block class="computed wildcard wildcard userdefined"> <img src="/assets/icons/clock.svg" class="feather"> <span class="catnip-block-aTextLabel">target</span></catnip-block>). В отличие от свойств, которые существуют, пока существует копия или комната, содержащая их, переменные существуют только в течение события, в котором вы их редактируете. Каждый раз, когда ваше событие начинается снова, значения переменных сбрасываются к ничему. (Чтобы быть более конкретными, они становятся «неопределенными».) Это делает переменные бесполезными в долгосрочной перспективе, но хороши для хранения результатов вычислений или вещей, которые вы не хотите случайно использовать позже, например, ссылку на теперь разрушенную копию.
- **Глобальные переменные** (например, <catnip-block class="computed wildcard wildcard userdefined"> <img src="/assets/icons/circle.svg" class="feather"> <span class="catnip-block-aTextLabel">money</span></catnip-block>). Это переменные, хранящиеся в самой игре во время ее выполнения. Глобальная переменная хранит одно значение, которое можно читать и записывать из любой точки, и это значение останется до тех пор, пока игра не будет закрыта. (Если вы хотите сохранить переменную между запусками, вам понадобятся блоки «Сохранить/Загрузить из хранилища».)
- **Переменные событий** (например, <catnip-block class="computed wildcard wildcard userdefined"> <img src="/assets/icons/bell.svg" class="feather"> <span class="catnip-block-aTextLabel">other</span></catnip-block>) могут предоставляться некоторыми событиями для предоставления дополнительных сведений о том, когда событие было запущено.
- **Свойства поведения** (например, <catnip-block class="computed wildcard wildcard userdefined"> <img src="/assets/icons/behavior.svg" class="feather"> <span class="catnip-block-aTextLabel">power</span></catnip-block>) наследуются от поведения, которое вы связываете в своих шаблонах и комнатах, и работают так же, как обычные свойства.

## Полезные функции Catnip для написания скриптов

### Возвращаемые значения справа
Некоторые блоки команд возвращают значение, подобно вычисляемым значениям. Возвращенные значения могут быть сохранены в переменной или свойстве и использованы позже — но обычно эти слоты являются необязательными. Например, вы можете сохранить экземпляр сыгранной музыки в глобальной переменной и остановить ее позже:

<catnip-block class="command selected">
  <img src="/assets/icons/music.svg" class="feather">
  <span class="catnip-block-aTextLabel">Воспроизвести звук</span>
  <span class="catnip-block-aConstantInput menu string">
    <img src="/assets/icons/image.svg" class="feather">
    <span>InGameTheme</span>
  </span>
  <div class="catnip-block-aFiller"></div>
  <span class="catnip-block-aTextLabel">сохранить в</span>
  <catnip-block class="computed wildcard wildcard userdefined">
    <img src="/assets/icons/circle.svg" class="feather">
    <span class="catnip-block-aTextLabel">музыка</span>
  </catnip-block>
  <div class="catnip-block-Options">
    <div class="catnip-block-anOptionsToggle">
      <img src="/assets/icons/chevron-down.svg" class="feather">
      <span>Дополнительно</span>
      <img src="/assets/icons/chevron-down.svg" class="feather">
    </div>
  </div>
</catnip-block>
<catnip-block class="command note selected">
  <img src="/assets/icons/message-circle.svg" class="feather">
  <span class="catnip-block-aTextLabel">Примечание</span>
  <textarea value="Позднее — при окончании уровня или при открытии меню паузы" style="height: 21px;" readonly="readonly"></textarea>
</catnip-block>
<catnip-block class="command void selected">
  <img src="/assets/icons/music.svg" class="feather">
  <span class="catnip-block-aTextLabel">Остановить звук</span>
  <catnip-block class="computed wildcard wildcard userdefined">
    <img src="/assets/icons/circle.svg" class="feather">
    <span class="catnip-block-aTextLabel">музыка</span>
  </catnip-block>
</catnip-block>

### Мутаторы

Щелкнув правой кнопкой мыши по некоторым блокам, вы откроете расширенный контекстный меню с командами, позволяющими заменить выбранный блок на похожий. Значения, которые присутствуют в обоих блоках, будут сохранены. Например, попробуйте щелкнуть правой кнопкой мыши по математическим блокам, логическим блокам или блокам с значениями x/y или ширина/высота.

::: center
![Исправление ошибки с помощью мутатора путем щелчка правой кнопкой мыши по блоку](../../images/learnCatnip/rightClickMutatorFix.png)
*Исправление ошибки путем замены блока щелчком правой кнопкой мыши*
:::

## Что дальше?

Изучите, как использовать условия и циклы If-Else для выполнения скриптов условно и автоматизации повторяющихся действий [в следующей главе](./conditions-and-loops.md).

