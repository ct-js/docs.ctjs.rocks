# Работа с камерой

::: note Автоматически переведённая страница
К сожалению, на полный ручной перевод у нас не хватает ресурсов.
Если вы увидели ошибку — отправьте пул-риквест с исправлениями (ссылка для редактирования в конце страницы).
:::

В Ct.js есть объект Camera (камера в коде и консоли), который управляет видом. Он поддерживает масштабирование и вращение, а также может следовать за копией и создавать эффект вибрации экрана.

## Перемещение камеры

Чтобы перемещать камеру, можно использовать следующие функции:

* `camera.teleportTo` и `camera.moveTo`
* встроенные переменные для отслеживания объектов на экране
* изменение параметров камеры вручную.

### Переходы и телепортация

`camera.moveTo(x, y)` и `camera.teleportTo(x, y)` позволяют переместить камеру в новое положение. Однако между ними есть некоторые различия:

* `camera.moveTo(x, y)` подходит для сцен с переходами и плавных перемещений между объектами, так как он работает вместе с `camera.drift`;
* `camera.teleportTo(x, y)` не вызывает переходы и не сбрасывает эффекты тряски экрана. Его можно использовать для мгновенных точных перемещений, например, при перемещении камеры на большое расстояние.

### Следование за копией за копией

Строка `camera.follow = this` внутри кода On Create вашего главного персонажа установит автоматическое перемещение камеры ✨ Вы также можете установить шаблон для автоматического следования в настройках комнаты.

`camera.borderX` и `camera.borderY` определяют область, в пределах которой камера смещается при входе последующей копии в эти границы. Эти значения указываются в координатах интерфейса.

::: code-tabs#tutorial
@tab JavaScript
```js Пример: следование за копией с границами
// Добавьте этот код, например, в код OnCreate вашего героя
camera.follow = this;

// Следуйте за героем, чтобы он не был ближе 300 пикселей к любому краю экрана
camera.borderX = 300;
camera.borderY = 300;
```
@tab CoffeeScript
```coffee Пример: следование за копией с границами
# Добавьте этот код, например, в код OnCreate вашего героя
camera.follow = this

# Следуйте за героем, чтобы он не был ближе 300 пикселей к любому краю экрана
camera.borderX = 300
camera.borderY = 300
```
:::

Вы также можете отключить логику следования по одной оси. Установка `camera.followX` в `false` отключит горизонтальное перемещение, а установка `camera.followY` отключит вертикальное перемещение. Это все равно позволяет перемещать камеру с помощью методов `teleportTo` и `moveTo`.

### Управление расположением вида

Если вам когда-либо понадобится больше гибкости в методах позиционирования, воспользуйтесь этими параметрами:

* `camera.x`,
* `camera.y`,
* `camera.targetX`,
* `camera.targetY`.

`x` и `y` представляют текущее положение камеры без дрожания экрана и эффектов `shiftX` и `shiftY`.
`targetX` и `targetY` будут отличаться, если `camera.drift` больше 0, и вы должны сначала отредактировать эти значения.

## Зум и вращение

Чтобы масштабировать вид, используйте `camera.scale.x` и `camera.scale.y`, подобно масштабированию копий. Это не уровень зума, а коэффициент масштабирования захватывающего прямоугольника: при использовании значений, больших 1, вы увидите большую часть комнаты.

Чтобы повернуть вид, используйте `camera.rotation` (в градусах). Опять же, вы поворачиваете захватывающий прямоугольник, поэтому объекты на экране будут вращаться по часовой стрелке.

::: warning Небольшой нюанс
Не следует менять значения камеры в событии "Конец кадра", поскольку камера обновляется после события "Начало кадра" и до события "Конец кадра". Если вы это сделаете, вы заметите некоторые несоответствия при преобразовании координат пользовательского интерфейса в игровые. Это потому, что `u.uiToGameCoord` и другие будут использовать новые значения, хотя комната еще не перемещена.
:::

## Модификаторы и плавный переход

* `camera.drift` — это значение в диапазоне от [0; 1], которое определяет, насколько быстро камера реагирует на движение. По умолчанию он равен 0 (нет смещения). Попробуйте установить `camera.drift` равным 0,9, чтобы создать плавный переход.
* `camera.shiftX` и `camera.shiftY` позволяют размещать камеру выше/ниже/и т.д. целевого объекта. Это особенно полезно при следовании за копией: может потребоваться показать больше предметов слева, когда персонаж игры смотрит туда, или вниз, когда он наклоняется, и т.д.

`camera.shiftX` и `camera.shiftY` интерполируются в отдельном проходе, отличном от других движений камеры, но все еще используют `camera.drift`.

::: tip
Для плавного масштабирования и вращения изменяйте значения `camera.angle`, `camera.scale.x` и `camera.scale.y` непрерывно с помощью `u.time`, или используйте модуль `tween`.

Например, чтобы увеличивать масштаб камеры, вы можете использовать этот код:

::: code-tabs#набор_инструкций
@tab JavaScript
```js
tween.add({
    obj: camera.scale,
    duration: 500,
    fields: {
        x: 0.5,
        y: 0.5
    }
});
```
@tab CoffeeScript
```coffee
tween.add
    obj: camera.scale
    duration: 500
    fields:
        x: 0.5
        y: 0.5
```
:::

::: tip
Или вы можете манипулировать углом камеры с помощью ввода пользователя (в событии "On Step"):

::: code-tabs#набор_инструкций
@tab JavaScript
```js
camera.angle += actions.CameraRotate.value * u.time * 300;
```
@tab CoffeeScript
```coffee
camera.angle += actions.CameraRotate.value * u.time * 300
```
:::

## Эффекты дрожания экрана

Да, есть встроенная функция для этого 😅 Ее дизайн выглядит следующим образом:

* экран дрожит на основе двух гармоничных функций, смешанных вместе, с несинхронизированными фазами;
* интенсивность дрожания экрана устанавливается с помощью `camera.shake` и представляет собой максимальную возможную амплитуду эффекта. Значение 10 равно 10% размера видового окна;
* эффект постепенно затухает со временем — это можно отрегулировать с помощью параметра `camera.shakeDecay`, или отключить, установив его в 0.

::: warning ПРЕДУПРЕЖДЕНИЕ:
Помните, что существует множество людей (например, я, создатель ct.js), которые быстро испытывают головокружение из-за дрожания экрана и колебаний. Также есть люди с эпилепсией.
* Предоставьте управление дрожанием/колебаниями экрана и не переусердствуйте с эффектом.
* Добавьте предупреждения о дрожании/колебаниях экрана в начале вашей игры и внутри описания игры.
:::

Существует множество параметров [описанных здесь](../camera.md), для настройки, но стандартные значения тоже подходят. Вот примеры:

::: code-tabs#tutorial
@tab JavaScript
```js
// Добавьте импульс, который будет накапливаться при повторных вызовах
camera.shake += 1;
```
@tab CoffeeScript
```coffee
// Добавьте импульс, который будет накапливаться при повторных вызовах
camera.shake += 1
```
:::

::: code-tabs#tutorial
@tab JavaScript
```js
// Создайте постоянное медленное дрожание камеры
camera.shakeFrequency = 1;
camera.shakeDecay = 0;
camera.shake = 2;
```
@tab CoffeeScript
```coffee
// Создайте постоянное медленное дрожание камеры
camera.shakeFrequency = 1
camera.shakeDecay = 0
camera.shake = 2
```
:::

## Создание адаптивного интерфейса

Современные устройства имеют различные разрешения, и ваш приложение должно адаптироваться к ним, сохраняя при этом наилучшее качество.

Первый шаг — выбрать вкладку "Настройки" и выбрать режим масштабирования, который лучше всего подходит для вашего проекта игры:

* Быстрое масштабирование с обрезкой экрана подходит для чисто **пиксельных игр**, или когда важно добиться высокой производительности;
* Расширение хорошо работает, когда чем больше игрок видит на экране, тем лучше (например, для RTS или игр типа Factorio);
* Масштабирование с обрезкой экрана подходит для любого типа проектов и также может дать приятные трансформации вашим пиксельным играм. Это сохранит ваш заданный соотношение сторон.
* Масштабирование без обрезки обеспечивает как наилучшее качество, так и использование всего экрана. Он часто предпочтительнее, чем масштабирование с обрезкой экрана.

Если вы создаете пиксельную игру, убедитесь, что отключили плавное изображение в вкладке "Проект" -> "Параметры рендеринга" слева.

В целом, вам следует следовать этим правилам:

* проектировать интерфейс в отдельной комнате, а затем импортировать его с помощью `rooms.append('NameOfTheRoom', {isUi: true})`;
* использовать инструменты для автоматического выравнивания копий в редакторе комнат;
* использовать `camera.width` и `camera.height` для позиционирования других элементов интерфейса;
* при использовании "Масштабирование с/без обрезкой экрана" начинайте проектировать свои комнаты, графические ресурсы и интерфейс на относительно большом размере представления в настройках комнат, например, 1920x1080 пикселей, чтобы он хорошо масштабировался на других разрешениях.

Не забудьте протестировать свой интерфейс на разных размерах экранов и устройствах!

