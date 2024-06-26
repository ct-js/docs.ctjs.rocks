# Сборка игры

::: note Автоматически переведённая страница
К сожалению, на полный ручной перевод у нас не хватает ресурсов.
Если вы увидели ошибку — отправьте пул-риквест с исправлениями (ссылка для редактирования в конце страницы).
:::

Вы закончили разработку своей игры и готовы поделиться своим шедевром с миром. В этом разделе будет показано, что нужно для сборки и развертывания вашей игры.

Вот что мы сделаем:

[[toc]]

## Авторинг

Откройте вкладку "Проект" и выберите вкладку "Авторинг", здесь мы можем добавить детали авторинга для вашего проекта.

![](../images/buildingAndDeployment/building-your-game-authoring.png)

1. **Название:** Это будет название исполняемого файла или файла .zip при экспорте игры.
2. **Разработчик:** Добавьте здесь имя разработчика.
3. **Домашний сайт:** URL вашего сайта помещается здесь.
4. **Версия:** Добавьте номер версии здесь, чтобы отслеживать обновления и исправления вашей игры.
5. **Идентификатор приложения:** Различает вашу приложение среди других на мобильных платформах и в других случаях, влияя, среди прочего, на место хранения данных сохранений. Идентификатор приложения — это строка, которая выглядит как обратный доменное имя, в формате `регион.автор.проект`, без каких-либо цифр или дефисов.

## Брендинг

Откройте вкладку "Проект", затем выберите вкладку "Брендинг" сбоку, здесь представлены различные параметры брендинга для экспортируемого проекта.

![](../images/buildingAndDeployment/building-your-game-branding.png)

1. **Иконка игры**: добавьте иконку для своей игры — вы можете выбрать ее из любых текстур, которые вы импортировали. Обратите внимание, что в иконке не должно быть нескольких кадров, а также, чтобы получить наилучший результат, рекомендуется использовать квадратную текстуру размером по крайней мере 256x256 пикселей.
2. **Экран загрузки**: экран загрузки отображается только на мобильных устройствах во время загрузки приложения.
3. Если ваш проект — это пиксельная игра, но вы хотите, чтобы иконки и экран загрузки оставались гладкими, вы можете обеспечить гладкие иконки и экран загрузки с помощью этих параметров.
4. **Акцент**: это изменяет цвет акцента на экране загрузки. Вы можете изменить, влияет ли цвет акцента на фон или заливку, путем инверсии его.

## Экспорт настроек

В вкладке "Проект" выберите вкладку "Экспорт настроек".

![](../images/buildingAndDeployment/building-your-game-export-settings.png)

Здесь вы можете найти более сложные параметры, которые будут действовать при экспорте вашей игры. Для большинства проектов по умолчанию можно использовать стандартные значения.

## Экспорт вашего игрового проекта

В вкладке "Главное меню" вы увидите два варианта экспорта в разделе "Развертывание".

![](../images/buildingAndDeployment/building-your-game-deployment.png)

### Экспорт для веба

Экспорт игры для веба так же просто, как нажать кнопку. После завершения экспорта игры вам будет представлен архив с расширением .zip, содержащий файлы вашей игры.

![](../images/buildingAndDeployment/building-your-game-builds-web.png)

Вы можете загрузить этот архив на itch.io, GameJolt или на свой собственный сервер в качестве HTML-игры.

:::tip
Хотите загрузить свою игру на itch.io? [У нас есть руководство по этому вопросу.](./deployment-itch-io.md)
:::

### Экспорт для настольных компьютеров

При экспорте на настольные компьютеры обращайте внимание на предупреждения, которые может показать редактор для вашего проекта. В настоящее время ct.js требует установки Node.js для изменения иконок приложений Windows, но ct.js укажет, откуда можно скачать его. Если у вас не установлен Node.js, сборки для настольных компьютеров будут работать, но ваши исполняемые файлы Windows не будут иметь значок, что выглядит некрасиво.

![](../images/buildingAndDeployment/building-your-game-export-desktop.png)

После завершения экспорта игры вы увидите создавшиеся папки с исполняемыми файлами.

![](../images/buildingAndDeployment/building-your-game-builds-desktop.png)

Откройте просто папку и запустите исполняемый файл. Вы можете собрать папки для каждой платформы и распространить их на вашем любимом сервисе распространения игр, например, itch.io или Steam.

#### Исправление белого экрана на Windows

Если у вас или у ваших игроков возникают проблемы с запуском игры, а именно с проблемой, когда при открытии игры появляется только белый экран —, запустите файл `Run as admin to fix white screen.ps1` в той же директории, где находится исполняемый файл Windows, с правами администратора. Вы также можете попросить игроков скачать WebView2 для Windows, чтобы устранить эту проблему, так как старые установки Windows не имеют его, и эта платформа является наиболее подходящей для работы экспортированных игр ct.js.

