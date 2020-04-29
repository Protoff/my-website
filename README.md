# gulp-starter

## Особенности сборки:
  * сборка страниц модулями
  * использование шаблонизатора pug https://pugjs.org/api/getting-started.html
  * использование препроцессора SASS https://sass-lang.com/ https://sass-scss.ru/
  * группировка медиа-запросов
  * сжатие изображений
  * конвертация изображений webp

## Начало работы

1.  Для старта проекта клонировать репозиторий:
    git clone https://github.com/Protoff/gulp-starter.git

2.  Перейти в директорию:
    cd gulp-starter

2.  Установить необходимые пакеты:
    npm install

3.  Старт режима разработки:
    npm run dev

4.  Сжатие изображений и конвертация в webp:
    npm run images

5.  Сборка на продакшн:
    npm run build

## Создание модуля:
  1. создать папку модуля в папке src/sections/новый_модуль
  2. создать новый_модуль.pug и подключить в src/index.pug
  3. создать новый_модуль.sass и подключить в src/style.sass
  4. создать новый_модуль.js и подключить в src/scripts.js
