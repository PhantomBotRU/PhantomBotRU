$.lang.register('discord.promotesystem.cmd.promote.usage', 'применение: !promote [add / delete] [краткое описание]');
$.lang.register('discord.promotesystem.cmd.promote.noselfmanage', 'у вас нет прав добавлять и удалять себя из списка продвигаемых стримеров самостоятельно');
$.lang.register('discord.promotesystem.cmd.promote.nochannels', 'попросите администратора установить канал в Discord для продвижения стримеров');
$.lang.register('discord.promotesystem.cmd.promote.revoked', 'у вас нет прав добавлять себя в список продвигаемых стримеров');

$.lang.register('discord.promotesystem.cmd.promote.add.nobio', 'применение: !promote add [краткое описание]');
$.lang.register('discord.promotesystem.cmd.promote.add.success', '$1 добавлен(а) в список продвигаемых стримеров');
$.lang.register('discord.promotesystem.cmd.promote.del.success', '$1 удален(а) из списка продвигаемых стримеров');

$.lang.register('discord.promotesystem.cmd.promoteadm.usage', 'применение: !promoteadm [add / delete / so / channel / streamchannel / revoke / allow / toggleselfmanage / togglestats / togglebanner / list / setinterval]');
$.lang.register('discord.promotesystem.cmd.promoteadm.nochannels', 'применение: !promoteadm channel [канал в Discord для продвижения стримеров] или !promoteadm streamchannel [канал в Discord для оповещений о стримах]');
$.lang.register('discord.promotesystem.cmd.promoteadm.noacct', 'канал $1 в Twitch не найден');

$.lang.register('discord.promotesystem.cmd.promoteadm.add.nouser', 'применение: !promoteadm add [стример в Twitch] [краткое описание стримера]');
$.lang.register('discord.promotesystem.cmd.promoteadm.add.nobio', 'применение: !promoteadm add [стример в Twitch] [краткое описание стримера]');
$.lang.register('discord.promotesystem.cmd.promoteadm.add.success', '$1 добавлен(а) в список продвигаемых стримеров');
$.lang.register('discord.promotesystem.cmd.promoteadm.del.nouser', 'применение: !promoteadm delete [стример в Twitch]');
$.lang.register('discord.promotesystem.cmd.promoteadm.del.success', '$1 удален(а) из списка продвигаемых стримеров');

$.lang.register('discord.promotesystem.cmd.promoteadm.channel.nochannel', 'применение: !promoteadm channel [канал в Discord для продвижения стримеров] или clear');
$.lang.register('discord.promotesystem.cmd.promoteadm.channel.cleared', 'канал в Discord для продвижения стримеров теперь не установлен');
$.lang.register('discord.promotesystem.cmd.promoteadm.channel.success', 'установлен канал в Discord для продвижения стримеров: #$1'); 

$.lang.register('discord.promotesystem.cmd.promoteadm.streamchannel.nochannel', 'применение: !promoteadm streamchannel [канал в Discord для оповещений о стримах] или clear');
$.lang.register('discord.promotesystem.cmd.promoteadm.streamchannel.cleared', 'канал в Discord для оповещений о стримах теперь не установлен');
$.lang.register('discord.promotesystem.cmd.promoteadm.streamchannel.success', 'установлен канал в Discord для оповещений о стримах: #$1');

$.lang.register('discord.promotesystem.cmd.promoteadm.revoke.nouser', 'применение: !promoteadm revoke [стример в Twitch]');
$.lang.register('discord.promotesystem.cmd.promoteadm.revoke.success', '$1 больше не сможет добавлять себя в список продвигаемых стримеров');

$.lang.register('discord.promotesystem.cmd.promoteadm.allow.nouser',  'применение: !promoteadm allow [стример в Twitch]');
$.lang.register('discord.promotesystem.cmd.promoteadm.allow.success', '$1 теперь может добавлять себя в список продвигаемых стримеров');

$.lang.register('discord.promotesystem.cmd.promoteadm.toggleselfmanage.off', 'пользователи больше не могут добавлять и удалять себя из списка продвигаемых стримеров');
$.lang.register('discord.promotesystem.cmd.promoteadm.toggleselfmanage.on', 'пользователи теперь могут добавлять и удалять себя из списка продвигаемых стримеров');

$.lang.register('discord.promotesystem.cmd.promoteadm.togglestats.off', 'показ статистики стримеров в оповещениях о стримах выключен');
$.lang.register('discord.promotesystem.cmd.promoteadm.togglestats.on', 'показ статистики стримеров в оповещениях о стримах включен');

$.lang.register('discord.promotesystem.cmd.promoteadm.togglebanner.off', 'показ баннеров стримеров в оповещениях о стримах выключен');
$.lang.register('discord.promotesystem.cmd.promoteadm.togglebanner.on', 'показ баннеров стримеров в оповещениях о стримах включен');

$.lang.register('discord.promotesystem.cmd.promoteadm.list.empty', 'список продвигаемых стримеров пуст');
$.lang.register('discord.promotesystem.cmd.promoteadm.list.success', 'продвигаемые стримеры: $1');

$.lang.register('discord.promotesystem.cmd.promoteadm.setinterval.nominutes', 'применение: !promoteadm setinterval [количество минут]');
$.lang.register('discord.promotesystem.cmd.promoteadm.setinterval.toolow', 'интервал между оповещениями, продвигающими стримеров, должен быть не менее 15 мин');
$.lang.register('discord.promotesystem.cmd.promoteadm.setinterval.success', 'интервал между оповещениями, продвигающими стримеров, установлен на $1 мин');

$.lang.register('discord.promotesystem.cmd.so.nouser', 'применение: !promotesystem so [стример в Twitch]');
$.lang.register('discord.promotesystem.cmd.so.noexist', 'указанный пользователь отсутствует в списке продвигаемых стримеров');

$.lang.register('discord.promotesystem.livemsg.title', '$1 сейчас стримит на https://twitch.tv/$2');
$.lang.register('discord.promotesystem.livemsg.nowplaying', 'Текущая игра');
$.lang.register('discord.promotesystem.livemsg.streamtitle', 'Заголовок');
$.lang.register('discord.promotesystem.livemsg.followers', 'Фолловеров');
$.lang.register('discord.promotesystem.livemsg.views', 'Просмотров');
$.lang.register('discord.promotesystem.livemsg.missingtitle', 'Нет заголовка');
$.lang.register('discord.promotesystem.livemsg.missinggame', 'Нет игры');

$.lang.register('discord.promotesystem.promotemsg.description', 'Добро пожаловать на канал $1');
$.lang.register('discord.promotesystem.promotemsg.biography', 'О стримере');
$.lang.register('discord.promotesystem.promotemsg.nobio', 'Нет информации');
