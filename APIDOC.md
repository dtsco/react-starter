Общие положения
---------------

Авторизация такая же как в VisioBox.

Объекты редактируются методом `PATCH` с соответствующей семантикой (все поля неоязательные).

Сотрудники и клиенты
--------------------

`/v1/users`

Поля GET-запроса:
* `active=0` — фильтр по активным/неактивным
* `has_boxes_expired=1` — только клиенты, у которых просрочена оплата
* `has_boxes_expire_in=7` — только клиенты, у которых через 7 дней будет просрочена оплата
* `role=client` — фильтр по роли
* `search=иванов` — поиск по имени/фамиии

Создание:

```
@schema({
    Required("active", default=True): bool, // Активен ли менеджер, активирован ли пользователь
    Required("role"): lambda role: UserRole(role), // `admin`, `manager`, `client`
    Required("email"): All(str, Email()),
    Required("password"): str,
    Required("first_name"): str,
    Required("last_name"): str,
    Required("phone"): str,
    Required("avatar", default=None): Any(str, None),
})
```

Редактирование

```
@schema({
    "active": bool,
    "email": All(str, Email()),
    "password": str,
    "first_name": str,
    "last_name": str,
    "phone": str,
    "avatar": Any(str, None),
})
```

Readonly- поля

```
{
    "boxes_active": 6, // Боксов в аренде
    "boxes_expired": 1, // Боксов с просроченной оплатой
    "boxes_total": 12, // Аренд за всё время
    "last_login": "2012-12-31T23:57:55", // Последняя активность
}
```

Права пользователей
-------------------

`/v1/users/1/warehouse_permissions`

Методом `GET` получаем все выданные данному пользователю разрешения

```
[
    {
        "warehouse_id": 1,
        "permissions": ["full_access"],
    }
]
```

Методом `PUT` отправляем по этому же URL в этой же форме новые разрешения (старые удаляются)

`/v1/warehouses/1/user_permissions`

Методом `GET` получаем все выданные на данный склад разрешения

```
[
    {
        "user_id": 1,
        "permissions": ["full_access"],
    }
]
```

Методом `PUT` отправляем по этому же URL в этой же форме новые разрешения (старые удаляются)

Склады
------

`/v1/warehouses?search=Ленинградское`

У каждого склада есть ключ со статистикой по боксам `{"boxes": {"available": 5, "total": 10}}`

Схема общая на создание и редактирование

```
@schema({
    Required("name"): str,
    Required("identifier"): str,
    Required("address"): str,
    Required("latitude"): Any(int, float),
    Required("longitude"): Any(int, float),
    Required("manual_url"): str,
    Required("wifi_guest_ssid"): str,
    Required("wifi_guest_password"): str,
    Required("wifi_employee_ssid"): str,
    Required("wifi_employee_password"): str,
})
```

Секции
------

`/v1/sections?warehouse_id=1`

Схема общая на создание и редактирование.

```
@schema({
    Required("name"): str,
    Required("warehouse_id"): int,
})
```

Боксы
-----

`/v1/boxes`

Параметры поиска

* `/v1/boxes?warehouse_id=1&warehouse_id=2` фильтр по складу
* `/v1/boxes?section_id=1&section_id=2` фильтр по секции
* `/v1/boxes?available=0` доступны/недоступны для аренды
* `/v1/boxes?expired=0` нет просрочек/есть просрочки (не арендован = нет просрочки)
* `/v1/boxes?device_id__is_null=0` 0 привязан, 1 не привязан к устройству
* `/v1/boxes?device__telemetry__open=0` закрыт/открыт
* `/v1/boxes?device__telemetry__source=bluetooth&device__telemetry__source=button` кем открыт
* `/v1/boxes?transaction__client_id=1&transaction__client_id=2` — арендованы указанными клиентами
* `/v1/boxes?transaction__expired_for=7` — оплата истекла 7 и более дней назад

Пример объекта

```
{
    "name": "F17",
    "section": {
        "warehouse": {...},
    },
    "available": true, // доступен для аренды
    "expired": false, // нет просрочки оплаты
    "device": {
        "telemetry": {
            "open": true, // открыт
        },
        "open_close_type": "ble", // способ открытия/закрытия
        "open_close_user": {...}, // пользователь, выполнивший открытие/закрытие
    },
    "transaction": {...}, // Последняя транзакция бокса
}
```

Схема общая на создание и редактирование.

```
@schema({
    Required("name"): str,
    Required("section_id"): int,
})
```

Устройства
----------

`/v1/devices?online=1&outdated=1&synchronized=1&serial=xxx&box_id__is_null=1&warehouse_id=1&warehouse_id=2`

Есть пагинация. Структура ответа:

```
{
    "serial": "MAC-адрес",

    "last_online_at": "2020-06-12T18:22:00",
    "online": false,

    "telemetry": {
        "version": "11.1.0", // Версия прошивки
    },
    "outdated": false, // Устарела ли прошивка

    "synchronized": false, // Синхронизирован ли

    // Бокс, секция, склад (или null если не привязан)
    "box": {...},
}
```

Редактирование позволяет привязывать/отвязывать боксы:

```
{
    "box_id": 3, // или null
}
```

Транзакции
----------

`/v1/transactions?box_id=1&client_id=2&start=2020-01-01T00:00:00&end=2021-01-01T00:00:00`

Схема на создание

```
    @schema({
        Required("paid_till"): Date(),
        Required("box_id"): int,
        Required("client_id"): int,
    })
```

Для освобождения склада делаем последней транзакции бокса PATCH с `{"terminated": true}`

Флаг возможно ли удаление транзакции: `deletable`

История операций над боксом
---------------------------

`/box/1/logs`

Типы операций (`type`):
* `open`, `close` — открытие/закрытие (кем угодно)
  В поле `open_close_type` могут быть следующие значения:
  * `backend` — командой через сервер
  * `ble` — через Bluetooth
  * `button` — кнопкой на замке
  * `pending` — командой через сервер запросили открытие, но замок пока не открылся
  * `null` — неизвестно
* `user` — пользователь (клиент или менеджер), выполнивший операцию
* `transaction` — новая транзакция. Смотрим поля `transaction` и `previous_transaction` (если она не `terminated`), смотрим что изменилось (`client`, `paid_till`)
* `transaction_delete` — удаление транзакции
* `transaction_terminate` — освобождение склада
