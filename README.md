***
# КупиПодариДай

Api для сервиса вишлистов, где каждый зарегистрированный пользователь может рассказать о том, какой подарок он бы хотел получить, а также скинуться на подарок для другого пользователя, указав сумму, которую готов на это потратить.
***
# Технологии
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)

# Установка
1. ### Клонировать репозиторий

    ```sh
    git clone https://github.com/ruslanyar/kupipodariday-backend.git
    ```

2. ### Установить зависимости

    ```sh
    npm install
    ```

# Начало работы
1. ### Переменные окружения

   В корне проекта создать файл `.env`

    ```js
    PORT = [порт сервера]
    DATABASE_HOST = [хост базы данных]
    DATABASE_PORT = [порт базы данных]
    DATABASE_NAME = [имя базы данных]
    DATABASE_TYPE = [тип базы данных]
    DATABASE_USERNAME = [имя пользователя базы данных]
    DATABASE_PASSWORD = [пароль пользователя базы данных]
    SALT = [значение `saltOrRounds` для bcrypt]
    JWT_SECRET = [значение секрета jwt]
    ```

    Если не задать значения, то они будут выставлены по умолчанию

2. ### Инициализации базы данных

    ```sh
    npm run migrate:up
    ```

# Ссылки
* [Описание](https://app.swaggerhub.com/apis/zlocate/KupiPodariDay/1.0.0) API сервиса
* [Ссылка](https://github.com/yandex-praktikum/kupipodariday-frontend) на репозиторий 'Фронтенд для проекта КупиПодариДай'
