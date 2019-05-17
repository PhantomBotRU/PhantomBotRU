# <img src="https://github.com/PhantomBotRU/PhantomBotRU/blob/nightly/web/panel/img/logo.png" width="100px" align="left" alt="PhantomBotRU"/> PhantomBotRU
### Русская локализация [PhantomBot](https://phantom.bot "phantom.bot")

---

## Текущая версия

На данный момент PhantomBotRU имеет версию 3.0.1a и совместим с версией 3.0.1 оригинального [PhantomBot](https://phantom.bot "phantom.bot").

---

## Загрузка

Ссылка на скачивание: [*PhantomBotRU-v3.0.1a.zip*](https://github.com/PhantomBotRU/PhantomBotRU/tree/v3.0.1a.zip).

---

## Установка

> Перед установкой PhantomBotRU убедитесь, что у вас уже скачан и распакован оригинальный [PhantomBot](https://phantom.bot "phantom.bot").

|  Шаг  | Действие |
| :---: | -------- |
|   1   | Остановить работу оригинального PhantomBot (команда `exit` в консоли бота), если он запущен, и на всякий случай создать его резервную копию. |
|   2   | Распаковать скачанный архив *PhantomBotRU-v3.0.1a.zip*. |
|   3   | Папку *russian* из директории *…\scripts\lang* в распакованном архиве *PhantomBotRU-v3.0.1a* скопировать в аналогичную директорию *…\scripts\lang* в папке Вашего бота (т.е. папка *russian* должна быть положена рядом с уже существующей папкой *english*). |
|   4   | Заменить папку *web* в папке Вашего бота на аналогичную папку *web* из распакованного архива *PhantomBotRU-v3.0.1a*. |
|   5   | Запустить PhantomBot и после его полной загрузки набрать в консоли команду `lang russian` — бот должен сообщить Вам, что `язык изменён на russian`. PhantomBot готов к работе на русском языке. |

> Если вы начали пользоваться PhantomBot совсем недавно, и вам особо нечего терять (команды, поинты и пр.), и вы хотите, чтобы также были предустановлены десятки русскоязычных пользовательских команд и оповещений бота при фолловинге, подписке, донате и пр., то остановите работу бота и "обнулите" его, удалив файл *phantombot.db* из директории *…\config* вашего бота. При следующем запуске бота вместо англоязычных предустановленных команд и оповещений вы получите русскоязычные.

---

## Отличия от оригинального PhantomBot

* Полностью русскоязычный веб-интерфейс.
* Русскоязычные отклика бота (на данный момент около 90%, но планируется довести до 100%).
* Предустановленные пользовательские команды и оповещения на русском языке.
* Правильная обработка кириллицы (в частности, *Фильтр символов* не парализуют в чате общение на русском, а также, за малыми исключениями, украинском, белорусском, болгарском, сербском и прочих языках).
* Счётчик смертей (команда `!deathctr` и её подкоманды) заменён счётчиком побед (команда `!wins` и её подкоманды).
* В разделе *Помощь* добавлены вкладки *Теги* и *Часовые зоны*.
* Абсолютно все поля в веб-интерфейсе бота имеют всплывающие подсказки (также добавлено множество постоянно видимых подсказок и предупреждений).
* Отклики бота не содержат ни единой точки (за исключением многоточий).
* Косметические улучшения веб-интерфейса и модулей бота.

> «Служебные» сообщения бота в консоли, не публикуемые в чате Twitch, остаются на английском языке, чтобы при возникновении вопросов можно было по-прежнему получать поддержку на [форуме](https://community.phantom.bot) разработчиков оригинального PhantomBot.

---

## Ваша поддержка

Ваша поддержка — это благодарность за уже проделанную работу и стимул продолжать работу над русским PhantomBotRU, которому уже посвящено полтора года до того, как он был выложен в открытый доступ.

* [QIWI Копилка](https://qiwi.me/5e78d024-a014-4334-80d8-a0911dceb328)
* [Яндекс Деньги](https://money.yandex.ru/to/410014576985955)
* Patreon (скоро)

> Имена донаторов от 300₽ (или $5, или €5) будут добавляться во вкладку *Помощь* –> *Информация* в интерфейсе бота с каждым последующим обновлением PhantomBotRU и останутся там на постоянной основе.
