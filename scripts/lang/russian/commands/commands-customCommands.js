$.lang.register('customcommands.add.error', 'указанная команда или псевдоним уже существует');
$.lang.register('customcommands.add.success', 'команда «!$1» создана');
$.lang.register('customcommands.add.usage', 'применение: «!addcom [имя команды] [текст отклика]»');
$.lang.register('customcommands.add.commandtag.notfirst', 'тег «(command)» должен быть в начале отклика');
$.lang.register('customcommands.add.commandtag.invalid', 'команды «!$1», заданной в теге «(command)», не существует');
$.lang.register('customcommands.alias.delete.error.alias.404', 'псевдонима «!$1» не существует');
$.lang.register('customcommands.alias.delete.success', 'псевдоним «!$1» удалён');
$.lang.register('customcommands.alias.delete.usage', 'применение: «!delalias [имя псевдонима]»');
$.lang.register('customcommands.alias.error', 'указанный псевдоним уже существует для команды «!$1»'); // не удаётся вызвать
$.lang.register('customcommands.alias.error.target404', 'указанной команды не существует, либо она выключена');
$.lang.register('customcommands.alias.error.exists', 'указанный псевдоним или команда уже существует');
$.lang.register('customcommands.add.disabled', 'указанная команда уже существует, но выключена');
$.lang.register('customcommands.alias.success', 'псевдоним «!$2» привязан к команде «!$1»');
$.lang.register('customcommands.alias.usage', 'применение: «!aliascom [имя псевдонима] [имя команды] [опционально: имя подкоманды]»');
$.lang.register('customcommands.delete.success', 'команда «!$1» удалена');
$.lang.register('customcommands.delete.usage', 'применение: «!delcom [имя команды]»');
$.lang.register('customcommands.edit.404', 'невозможно отредактировать базовую команду');
$.lang.register('customcommands.set.perm.error.target404', 'команды «!$1» не существует');
$.lang.register('customcommands.set.perm.success', 'минимальный уровень доступа для команды «!$1» установлен на «$2»'); // вместо номера роли можно вбивать любой рандом, и он воспринимается как 7 (зритель)
$.lang.register('customcommands.set.perm.unset.success', 'все рекурсивные уровни доступа для команды «!$1» и её псевдонимов сброшены');
$.lang.register('customcommands.set.perm.usage', 'применение: «!permcom [имя команды] [уровень доступа от 0 до 7 (0 – владелец, 1 – администратор, 2 – модератор, 3 – подписчик, 4 – донатор, 5 – хостер, 6 – регуляр, 7 – зритель)]»');
$.lang.register('customcommands.set.perm.404', 'команды «!$1» не существует, либо она выключена');
$.lang.register('customcommands.set.price.error.404', 'указанной команды не существует, либо она выключена');
$.lang.register('customcommands.set.price.error.invalid', 'платой не может быть отрицательное число');
$.lang.register('customcommands.set.price.success', 'плата за вызов команды «!$1» установлена на $2 $3'); // принимает также десятичные дроби типа 0.1 или 5,1
$.lang.register('customcommands.set.price.usage', 'применение: «!pricecom [имя команды] [опционально: имя подкоманды] [количество поинтов]»'); // устанавливает плату для любой абракадабры вместо подкоманды
$.lang.register('customcommands.set.pay.error.404', 'указанной команды не существует, либо её уровень доступа установлен на «Модератор»'); // !!!!!!!!!!
$.lang.register('customcommands.set.pay.error.invalid', 'вознаграждением не может быть отрицательное число'); // !!!!!!!!!!
$.lang.register('customcommands.set.pay.success', 'вознаграждение за вызов команды «!$1» установлено на $2 $3');
$.lang.register('customcommands.set.pay.usage', 'применение: «!paycom [имя команды] [количество поинтов]»'); // в отличие от !pricecom, нельзя установить вознаграждение для подкоманды
$.lang.register('customcommands.404.no.commands', 'пользовательских команд нет');
$.lang.register('customcommands.cmds', 'доступные вам пользовательские команды и псевдонимы: «$1»');
$.lang.register('customcommands.edit.usage', 'применение: «!editcom [имя команды] [отклик команды]»');
$.lang.register('customcommands.edit.success', 'команда «!$1» отредактирована');
// $.lang.register('customcommands.touser.offline', '$1 в офлайне'); // нигде в скриптах не используется
$.lang.register('customcommands.customapi.404', 'команда «!$1» требует дополнительной переменной');
$.lang.register('customcommands.customapijson.err', 'с командой «!$1» указана некорректная переменная'); // по сути: в процессе обработки API возникла ошибка
$.lang.register('customcommands.disable.usage', 'применение: «!disablecom [имя команды]»');
$.lang.register('customcommands.disable.404', 'указанной команды не существует, либо она уже выключена');
$.lang.register('customcommands.disable.err', 'указанная команда уже выключена');
$.lang.register('customcommands.disable.success', 'команда «!$1» выключена');
$.lang.register('customcommands.enable.usage', 'применение: «!enablecom [имя команды]»');
$.lang.register('customcommands.enable.404', 'указанной команды не существует');
$.lang.register('customcommands.enable.err', 'указанная команда уже включена');
$.lang.register('customcommands.enable.success', 'команда «!$1» включена');
$.lang.register('customcommands.reset.usage', 'применение: «!resetcom [имя команды]»');
$.lang.register('customcommands.reset.success', 'счётчик для команды «!$1» сброшен');
$.lang.register('customcommands.reset.change.fail', '«$1» – некорректный параметр');
$.lang.register('customcommands.reset.change.success', 'счётчик для команды «!$1» установлен на $2');
$.lang.register('customcommands.botcommands', 'базовые и пользовательские команды бота: «$1»');
$.lang.register('customcommands.botcommands.error', 'необходимо указать номер порции команд');
$.lang.register('customcommands.botcommands.total', 'для просмотра других порций команд наберите «!botcommands [номер части от 2 до $1]»');
