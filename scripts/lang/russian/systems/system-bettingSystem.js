$.lang.register('bettingsystem.open.usage', 'применение: !bet open ["вопрос пари (с кавычками)"] ["исход 1, исход 2, … (с кавычками)"] [минимальная сумма ставки] [максимальная сумма ставки] [продолжительность в минутах]');
$.lang.register('bettingsystem.open.error', 'необходимо назначить победивший исход, прежде чем создать новое пари (!bet close [победивший исход])');
$.lang.register('bettingsystem.open.error.opened', 'перед созданием нового пари необходимо закрыть предыдущее');
$.lang.register('bettingsystem.open.success', 'Открыт приём ставок по вопросу «$1» с вариантами исхода: $2 (чтобы сделать ставку, наберите !bet [сумма ставки] [вариант исхода])');
$.lang.register('bettingsystem.close.error.usage', 'Приём ставок закрыт, ожидаем подтверждения победившего исхода');
$.lang.register('bettingsystem.close.usage', 'применение: !bet close [победивший исход]');
$.lang.register('bettingsystem.close.success', 'Приём ставок закрыт, победил исход «$1»');
$.lang.register('bettingsystem.close.semi.success', 'Приём ставок закрыт, ожидаем подтверждения победившего исхода');
$.lang.register('bettingsystem.close.success.winners', '$1 чел. со ставкой на исход «$3» выиграл(и) суммарно $2');
$.lang.register('bettingsystem.save.format', 'пари по вопросу «$1»: варианты исхода – $2; всего поинтов – $3, всего ставок – $4, сумма выигрыша: $5');
$.lang.register('bettingsystem.results', 'информация о текущем пари по вопросу «$1»: варианты исхода – $2; всего поинтов – $3, всего ставок – $4');
$.lang.register('bettingsystem.global.usage', 'применение: !bet [open / close / save / saveformat  / results / togglemessages / gain]'); // убрал lookup
$.lang.register('bettingsystem.bet.usage', 'применение: !bet [сумма ставки] [вариант исхода]');
$.lang.register('bettingsystem.bet.error.neg', 'нельзя сделать ставку с отрицательной суммой $1');
$.lang.register('bettingsystem.bet.error.min', 'минимальная допустимая сумма ставки равна $1');
$.lang.register('bettingsystem.bet.error.max', 'максимальная допустимая сумма ставки равна $1');
$.lang.register('bettingsystem.bet.error.points', 'у вас недостаточно $1, чтобы сделать ставку');
$.lang.register('bettingsystem.bet.betplaced', 'вы уже сделали ставку $1 на вариант «$2»');
$.lang.register('bettingsystem.bet.null', 'указанный исход некорректен');
$.lang.register('bettingsystem.toggle.save', 'результаты пари $1 сохраняться после их завершения');
$.lang.register('bettingsystem.warning.messages', 'предупреждающие сообщения $1 появляться в чате');
$.lang.register('bettingsystem.saveformat.usage', 'применение: !bet saveformat [формат даты]');
$.lang.register('bettingsystem.saveformat.set', 'формат даты сохранения ставок установлен на $1');
$.lang.register('bettingsystem.gain.usage', 'применение: !bet gain [количество процентов]');
$.lang.register('bettingsystem.gain.set', 'процент выигрыша от суммы ставок установлен на $1%');
$.lang.register('bettingsystem.lookup.usage', 'применение: !bet lookup [$1] (добавьте [_номер] после даты, если в указанный день было несколько пари');
$.lang.register('bettingsystem.lookup.show', 'ставка от $1: $2');
$.lang.register('bettingsystem.lookup.null', 'в указанный день пари не было');
$.lang.register('bettingsystem.now', 'будут');
$.lang.register('bettingsystem.not', 'не будут');
