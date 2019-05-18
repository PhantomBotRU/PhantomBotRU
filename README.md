# <img src="https://github.com/PhantomBotRU/PhantomBotRU/blob/nightly/web/panel/img/logo.png" width="100px" align="left" alt="PhantomBotRU"/> PhantomBotRU
#### русская версия [PhantomBot](https://phantom.bot "Перейти на сайт phantom.bot")

---

### Версия

| Текущая версия |
| :------------: |
|     3.0.1a     |

> Данная версия совместима с версией 3.0.1 оригинального [PhantomBot](https://phantom.bot "Перейти на сайт phantom.bot").

---

### Загрузка

|      Версия       | Ссылка на скачивание |
| ----------------- | -------------------- |
| Стабильная        | [PhantomBotRU-v3.0.1a.zip](https://github.com/PhantomBotRU/PhantomBotRU/tree/v3.0.1a.zip "Скачать стабильную версию PhantomBotRU") |
| Экспериментальная | [PhantomBotRU-nightly.zip](https://github.com/PhantomBotRU/PhantomBotRU/archive/nightly.zip "Скачать экспериментальную версию PhantomBotRU") |

> Экспериментальная версия, как правило, содержит новые тестовые функции и исправления, и поэтому полная совместимость с оригинальным [PhantomBot](https://phantom.bot "Перейти на сайт phantom.bot") не гарантируется.

---

### Установка

|  Шаг  | Действие |
| :---: | -------- |
|   1   | Перед установкой PhantomBotRU убедитесь, что Вы уже скачали и распаковали оригинальный [PhantomBot](https://phantom.bot "Перейти на сайт phantom.bot")
|   2   | Если ранее Вы уже успели запустить и настроить оригинальный PhantomBot, то убедитесь, что он остановлен (команда `exit` в консоли бота), и, на всякий случай, создайте его резервную копию |
|   3   | Распакуйте скачанный архив *PhantomBotRU-v3.0.1a.zip* |
|   4   | В распакованном архиве *PhantomBotRU-v3.0.1a* перейдите в директорию *…\scripts\lang* и скопируйте папку *russian* в папку Вашего бота в аналогичную директорию *…\scripts\lang* (таким образом папка *russian* должна оказаться рядом с уже существующей папкой *english*) |
|   5   | В распакованном архиве *PhantomBotRU-v3.0.1a* скопируйте папку *web* в папку Вашего бота, заменив аналогичную папку *web* |
|   6   | Если ранее Вы уже запускали PhantomBot, и Вам нечего в нём терять (команды, поинты и пр.), то для установки русскоязычных пользовательских команд и оповещений (о фолловинге, подписке, донате и пр.) «обнулите» бота, удалив файл *phantombot.db* из директории *…\config* |
|   7   | Запустите PhantomBot, дождитесь его полной загрузки и наберите в консоли команду `lang russian`, после чего бот ответит сообщением `язык изменён на russian` |
|   ✓   | PhantomBot готов к работе на русском языке |

---

### Описание

| Отличия от оригинального [PhantomBot](https://phantom.bot "Перейти на сайт phantom.bot") |
| ----------------------------------- |
| Полностью русскоязычный веб-интерфейс |
| Русскоязычные отклика бота (на текущий момент около 90%, планируется довести до 100%) |
| Предустановленные пользовательские команды и оповещения на русском языке |
| Правильная обработка кириллицы (в частности, фильтры капса, символов и подлога корректно обрабатывают сообщения на русском, а также, за некоторыми исключениями, украинском, белорусском, болгарском, сербском, татарском и прочих языках) |
| Счётчик смертей (команда `!deathctr` и её подкоманды) заменён счётчиком побед (команда `!wins` и её подкоманды) |
| В разделе *Помощь* добавлены вкладки *Теги* и *Часовые зоны* |
| Абсолютно все поля в веб-интерфейсе бота имеют всплывающие подсказки (также добавлено множество постоянно видимых подсказок и предупреждений) |
| Отклики бота не содержат ни единой точки (за исключением многоточий) |
| Косметические улучшения веб-интерфейса и модулей бота |

> «Служебные» сообщения бота в консоли, не публикуемые в чате Twitch, остаются на английском языке, чтобы при вероятном возникновении неполадок можно было эффективно получать поддержку на [форуме](https://community.phantom.bot "Перейти на форум community.phantom.bot") оригинального PhantomBot.

---

### Благодарность

| Ваша поддержка |
| -------------- |
| [QIWI Копилка](https://qiwi.me/5e78d024-a014-4334-80d8-a0911dceb328 "Сделать пожертвование в QIWI Копилку") |
| [Яндекс Деньги](https://money.yandex.ru/to/410014576985955 "Сделать пожертвование через Яндекс Деньги") |
| Patreon (скоро) |

> **Имена людей, внёсших свою лепту в поддержку PhantomBotRU на сумму от 300₽ (либо от $5, либо от €5), будут вписаны прямо в веб-интерфейс бота** во вкладку *Помощь* –> *Информация* со следующим обновлением бота. Ваша поддержка — стимул не забрасывать PhantomBotRU и своевременно его обновлять. Без регулярных обновлений русская версия становится всё менее совместима с оригинальным PhantomBot с каждой его новой версией.

### Лицензия

> PhantomBotRU лицензирован согласно условиям [GNU General Public License v3.0](https://github.com/PhantomBotRU/PhantomBotRU/blob/nightly/LICENSE "Посмотреть лицению GNU GPL v3.0").
