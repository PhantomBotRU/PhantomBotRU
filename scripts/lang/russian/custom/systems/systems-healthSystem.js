/**
 * Main health strings
 */
$.lang.register('healthsystem.health.usage', 'применение: !$1 [hydration / hunger / movement / sleep / wellbeing / toggle]');
$.lang.register('healthsystem.health.offline', '!$1 $2 работает только во время стрима $3');

/**
 * Settings health strings
 */
// usage strings
$.lang.register('healthsystem.settings.usage', 'применение: !$1 [set / check]');
$.lang.register('healthsystem.settings.usage.set', 'применение: !$1 set [hydration / hunger / movement / sleep / wellbeing]');
$.lang.register('healthsystem.settings.usage.set.hydration', 'применение: !$1 set hydration [ml / timer] [количество миллилитров или минут]');
$.lang.register('healthsystem.settings.usage.set.hunger', 'применение: !$1 set hunger timer [количество минут]');
$.lang.register('healthsystem.settings.usage.set.movement', 'применение: !$1 set movement timer [количество минут]');
$.lang.register('healthsystem.settings.usage.set.sleep', 'применение: !$1 set sleep timer [количество минут]');
$.lang.register('healthsystem.settings.usage.set.wellbeing', 'применение: !$1 set wellbeing timer [количество минут]');
// check strings
$.lang.register('healthsystem.settings.check.usage', 'применение: !$1 check [hydration / hunger / movement / sleep / wellbeing]');
$.lang.register('healthsystem.settings.check.hydration', 'текущие настройки питьевого режима: объём – $2 мл, интервал – $3 мин, срабатывание – $4'); // неиспользуемая переменная: $1 – hydration
$.lang.register('healthsystem.settings.check.hunger', 'текущие настройки режима питания: интервал – $2 мин, срабатывание – $3'); // неиспользуемая переменная: $1 – hunger
$.lang.register('healthsystem.settings.check.movement', 'текущие настройки режима движения: интервал – $2 мин, срабатывание – $3'); // неиспользуемая переменная: $1 – movement
$.lang.register('healthsystem.settings.check.sleep', 'текущие настройки режима сна: интервал – $2 мин, срабатывание – $3'); // неиспользуемая переменная: $1 – sleep
$.lang.register('healthsystem.settings.check.wellbeing', 'текущие настройки мотивации: интервал – $2 мин, срабатывание – $3'); // неиспользуемая переменная: $1 – wellbeing

/**
 * Hydration strings
 */
$.lang.register('healthsystem.hydration.reminder', 'Стрим длится уже $1 – за это время желательно употребить хотя бы $2 мл воды для поддержания оптимального водного баланса организма'); // неиспользуемая переменная: $3 – oz (жидкая унция)
$.lang.register('healthsystem.hydration.command', 'стрим $1 длится уже $2 – за это время желательно употребить хотя бы $3 мл воды для поддержания оптимального водного баланса организма'); // неиспользуемая переменная: $4 – oz (жидкая унция)

/**
 * Hunger strings
 */
$.lang.register('healthsystem.hunger.reminder', 'Стрим длится уже $1 – было бы неплохо сделать сейчас перерыв и принять пищу');
$.lang.register('healthsystem.hunger.command', 'стрим $1 длится уже $2 – было бы неплохо сделать через $3 мин перерыв и принять пищу');

/**
 * Movement strings
 */
$.lang.register('healthsystem.movement.reminder', 'Стрим длится уже $1 – было бы неплохо сделать сейчас перерыв и размяться');
$.lang.register('healthsystem.movement.command', 'стрим $1 длится уже $2 – было бы неплохо сделать через $3 мин перерыв и размяться');

/**
 * Sleep strings
 */
$.lang.register('healthsystem.sleep.reminder', 'Стрим длится уже $1 – было бы неплохо сделать сейчас перерыв и поспать');
$.lang.register('healthsystem.sleep.command', 'стрим $1 длится уже $2 – было бы неплохо сделать через $3 мин перерыв и поспать');

/**
 * Wellbeing strings
 */
// reminder messages
$.lang.register('healthsystem.wellbeing.reminder.loaded', 'всего найдено $1 автоматических мотивационных сообщений');
$.lang.register('healthsystem.wellbeing.reminder.1', '«Иди так далеко, как можешь видеть. И ты увидишь ещё дальше.» – Зиг Зиглар');
$.lang.register('healthsystem.wellbeing.reminder.2', '«Построй свои собственные мечты, или кто-то другой наймёт тебя строить свои.» – Фаррах Грей');
$.lang.register('healthsystem.wellbeing.reminder.3', '«Через год ты будешь думать о том, что лучше бы ты начал сегодня.» – Карен Лэмб');
$.lang.register('healthsystem.wellbeing.reminder.4', '«Никогда не отказывайся от мечты только потому, что на её осуществление требуется много времени. Время пройдёт в любом случае.» – Эрл Найтингейл');
$.lang.register('healthsystem.wellbeing.reminder.5', '«Нет такого дня недели "когда-нибудь".» – Денис Бреннан–Нельсон');
$.lang.register('healthsystem.wellbeing.reminder.6', '«Не считай дни. Пусть дни считаются.» – Мохаммед Али');
$.lang.register('healthsystem.wellbeing.reminder.7', '«Успех обычно приходит к тем, кто слишком занят, чтобы его просто ждать.» – Генри Девид Торо');
$.lang.register('healthsystem.wellbeing.reminder.8', '«Возможности на самом деле не появляются просто так. Вы сами их создаёте.» – Крис Гроссер');
$.lang.register('healthsystem.wellbeing.reminder.9', '«Успех – это сумма маленьких усилий, повторяемых день за днём.» – Роберт Кольер');
$.lang.register('healthsystem.wellbeing.reminder.10', '«Великие умы обсуждают идеи. Средние умы обсуждают события. Мелкие умы обсуждают людей.» – Элеонора Рузвельт');
$.lang.register('healthsystem.wellbeing.reminder.11', '«Твоё воображение – это анонс твоих грядущих жизненных достопримечательностей.» – Альберт Эйнштейн');
$.lang.register('healthsystem.wellbeing.reminder.12', '«То, что нам иногда кажется суровым испытанием, может обернуться неожиданной удачей.» – Оскар Уайльд');
$.lang.register('healthsystem.wellbeing.reminder.13', '«Развивай успех из неудач. Препятствия и неудачи – две основные ступени к успеху.» – Дейл Карнеги');
$.lang.register('healthsystem.wellbeing.reminder.14', '«Неудача – это приправа, придающая вкус успеху.» – Трумен Капоте');
$.lang.register('healthsystem.wellbeing.reminder.15', '«Я не потерпел провал. Я просто нашёл 10000 способов, которые не работают.» – Томас Эдисон');
$.lang.register('healthsystem.wellbeing.reminder.16', '«Чего мы больше всего боимся делать, как раз есть то, что нам больше всего нужно сделать.» – Тимоти Феррисс');
$.lang.register('healthsystem.wellbeing.reminder.17', '«Лучше потерпеть неудачу в реальности, чем преуспеть в мечтах.» – Герман Мелвилл');
$.lang.register('healthsystem.wellbeing.reminder.18', '«Упади семь раз, встань восемь.» – японская пословица');
$.lang.register('healthsystem.wellbeing.reminder.19', '«Вопрос не в том, кто позволит мне, а в том, кто меня остановит.» – Айн Рэнд');
$.lang.register('healthsystem.wellbeing.reminder.20', '«Дойдя до конца, люди смеются над страхами, мучившими их вначале.» – Пауло Коэльо');
$.lang.register('healthsystem.wellbeing.reminder.21', '«Будь собой! Прочие роли уже заняты.» – Оскар Уайлд');
$.lang.register('healthsystem.wellbeing.reminder.22', '«Тяжёлый труд – это скопление легких дел, которые вы не сделали, когда должны были сделать.» – Джон Максвелл');
$.lang.register('healthsystem.wellbeing.reminder.23', '«Выбери профессию, которую ты любишь, – и тебе не придётся работать ни дня в твоей жизни.» – Конфуций');
$.lang.register('healthsystem.wellbeing.reminder.24', '«Жить — значит работать. Труд есть жизнь человека.» – Вольтер');
$.lang.register('healthsystem.wellbeing.reminder.25', '«Постарайтесь получить то, что любите, иначе придётся полюбить то, что получили.» – Бернард Шоу');
$.lang.register('healthsystem.wellbeing.reminder.26', '«Работа, которую мы делаем охотно, исцеляет боли.» – Уильям Шекспир');
$.lang.register('healthsystem.wellbeing.reminder.27', '«Кто хочет – ищет возможности. Кто не хочет – ищет причины.» – Сократ');
$.lang.register('healthsystem.wellbeing.reminder.28', '«Если вы будете работать для настоящего, то ваша работа выйдет ничтожной; надо работать имея в виду только будущее.» – Антон Чехов');
$.lang.register('healthsystem.wellbeing.reminder.29', '«Кто делает не больше того, за что ему платят, никогда не получит больше того, что он получает.» – Элберт Хаббард');
$.lang.register('healthsystem.wellbeing.reminder.30', '«Обычно те, кто лучше других умеют работать, лучше других умеют не работать.» – Жорж Элгози');
$.lang.register('healthsystem.wellbeing.reminder.31', '«Пока у тебя есть попытка – ты не проиграл!» – Сергей Бубка');
$.lang.register('healthsystem.wellbeing.reminder.32', '«Кто хочет сдвинуть мир, пусть сдвинет себя!» – Сократ');
$.lang.register('healthsystem.wellbeing.reminder.33', '«Бедный, неудачный, несчастливый и нездоровый это тот, кто часто использует слово "завтра".» – Роберт Кийосаки');
$.lang.register('healthsystem.wellbeing.reminder.34', '«Делай сегодня то, что другие не хотят, завтра будешь жить так, как другие не могут!» – Джаред Лето');


// command messages
$.lang.register('healthsystem.wellbeing.command.loaded', 'всего найдено $1 запрашиваемых мотивационных сообщений');
$.lang.register('healthsystem.wellbeing.command.1', '«Если ты не знаешь, чего хочешь, ты в итоге останешься с тем, чего точно не хочешь.» – Чак Паланик');
$.lang.register('healthsystem.wellbeing.command.2', '«Если люди не смеются над вашими целями, значит ваши цели слишком мелкие.» – Азим Премжи');
$.lang.register('healthsystem.wellbeing.command.3', '«Препятствия – это те страшные вещи, которые вы видите, когда отводите глаза от цели.» – Генри Форд');
$.lang.register('healthsystem.wellbeing.command.4', '«Пуля, просвистевшая на дюйм от цели, так же бесполезна, как та, что не вылетала из дула.» – Фенимор Купер');
$.lang.register('healthsystem.wellbeing.command.5', '«Я не знаю, что является ключом к успеху, но ключ к неудаче — это желание всем угодить.» – Билл Косби');
$.lang.register('healthsystem.wellbeing.command.6', '«Успех — это движение от неудачи к неудаче без потери энтузиазма.» – Уинстон Черчилль');
$.lang.register('healthsystem.wellbeing.command.7', '«Успех – это лестница, на неё не взобраться, держа руки в карманах.» – Пауль Баует');
$.lang.register('healthsystem.wellbeing.command.8', '«Успех – это успеть.» – Марина Цветаева');
$.lang.register('healthsystem.wellbeing.command.9', '«Успех – дело чистого случая. Это вам скажет любой неудачник.» – Эрл Уилсон');
$.lang.register('healthsystem.wellbeing.command.10', '«Секрет жизненного успеха: будь готов к возможности до того, как она возникнет.» – Бенджамин Дизраэли');

/**
 * Health toggle strings
 */
$.lang.register('healthsystem.toggle.usage', 'применение: !$1 toggle [hydration / hunger / movement / sleep / wellbeing]');
$.lang.register('healthsystem.toggle.setting.pass', 'напоминания $1 $2ы');
$.lang.register('healthsystem.toggle.setting.fail', 'переключатель $1 не найден');

/**
 * Health set strings
 */
$.lang.register('healthsystem.settings.set.hydration.ml','количество воды в заданный интервал времени установлено на $4 мл'); // неиспользуемая переменная: $1 – healthsettings, $2 – hydration, $3 – ml или timer
$.lang.register('healthsystem.settings.set.hydration.timer','интервал времени между напоминаниями о питье установлен на $4 мин'); // неиспользуемая переменная: $1 – healthsettings, $2 – hydration, $3 – timer
$.lang.register('healthsystem.settings.set.hunger','интервал времени между напоминаниями о питании установлен на $4 мин'); // неиспользуемая переменная: $1 – healthsettings, $2 – hunger, $3 – timer
$.lang.register('healthsystem.settings.set.movement','интервал времени между напоминаниями о движении установлен на $4 мин'); // неиспользуемая переменная: $1 – healthsettings, $2 – movement, $3 – timer
$.lang.register('healthsystem.settings.set.sleep','интервал времени между напоминаниями о сне установлен на $4 мин'); // неиспользуемая переменная: $1 – healthsettings, $2 – sleep, $3 – timer
$.lang.register('healthsystem.settings.set.wellbeing','интервал времени между мотивационными сообщениями установлен на $4 мин'); // неиспользуемая переменная: $1 – healthsettings, $2 – wellbeing, $3 – timer