/*
 * Copyright (C) 2016-2019 phantombot.tv
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

$.lang.register('ytplayer.client.404', 'заказ треков сейчас выключен');
$.lang.register('ytplayer.playlist.404', 'плейлист $1 не найден');
$.lang.register('ytplayer.announce.nextsong', '\u266B Сейчас звучит $1 по заказу $2');

$.lang.register('ytplayer.console.client.connected', '\u266B Плейер включен');
$.lang.register('ytplayer.console.client.disconnected', '\u266B Плейер выключен');

$.lang.register('ytplayer.songrequests.enabled', '\u266B Заказ треков включен');
$.lang.register('ytplayer.songrequests.disabled', '\u266B Заказ треков выключен');

$.lang.register('ytplayer.command.volume.get', 'текущая громкость плейера: $1');
$.lang.register('ytplayer.command.volume.set', 'громкость плейера установлена на $1');

$.lang.register('ytplayer.command.ytp.resetdefaultlist.active', 'для срабатывания этой команды плейер должен быть выключен');
$.lang.register('ytplayer.command.ytp.resetdefaultlist.success', 'плейлист по умолчанию сброшен');

$.lang.register('ytplayer.command.ytp.togglecconly.enable', 'плейер будет воспроизводить только треки, имеющие свободную лицензию Creative Commons');
$.lang.register('ytplayer.command.ytp.togglecconly.disable', 'плейер будет воспроизводить треки, имеющие любую лицензию или не имеющую никакой лицензии');

$.lang.register('ytplayer.command.ytp.togglestealrefund.enable', 'возмещение платы за треки, позаимствованные стримером, включено');
$.lang.register('ytplayer.command.ytp.togglestealrefund.disable', 'возмещение платы за треки, позаимствованные стримером, выключено');

$.lang.register('ytplayer.command.ytp.togglerandom.toggled', 'произвольное воспроизведение треков из плейлиста $1о');
$.lang.register('ytplayer.command.ytp.toggleannounce.toggled', 'оповещения плейера $1');

$.lang.register('ytplayer.command.ytp.setrequestmax.usage', 'Применение: !ytp setrequestmax [максимальное число заказов]');
$.lang.register('ytplayer.command.ytp.setrequestmax.success', '\u266B Максимальное допустимое число заказов от одного пользователя установлено на $1');

$.lang.register('ytplayer.command.ytp.setmaxvidlength.usage', 'Применение: !ytp setmaxvidlength [число секунд]');
$.lang.register('ytplayer.command.ytp.setmaxvidlength.success', '\u266B Максимальная допустимая продолжительность заказного трека установлена на $1 сек');

$.lang.register('ytplayer.command.ytp.setdjname.usage', 'Применение: !ytp setdjname [имя]');
$.lang.register('ytplayer.command.ytp.setdjname.success', 'имя диджея изменено на $1');

$.lang.register('ytplayer.command.playlist.usage', 'Применение: !playlist [add / delete / loadpl / deletepl / listpl / importpl]');
$.lang.register('ytplayer.command.playlist.add.failed', 'не удалось добавить трек $1 в плейлист');
$.lang.register('ytplayer.command.playlist.add.usage', 'Применение: !ytp playlist add [ссылка на трек в YouTube]');
$.lang.register('ytplayer.command.playlist.add.success', 'трек $1 добавлен в плейлист $2');
$.lang.register('ytplayer.command.playlist.load.success.new', 'пустой плейлист $1 загружен');
$.lang.register('ytplayer.command.playlist.load.success', 'плейлист $1 загружен');
$.lang.register('ytplayer.command.playlist.load.usage', 'Применение: !playlist loadpl [имя плейлиста]');
$.lang.register('ytplayer.command.playlist.delete.isdefault', 'невозможно удалить плейлист по умолчанию');
$.lang.register('ytplayer.command.playlist.delete.success', 'плейлист $1 удалён');
$.lang.register('ytplayer.command.playlist.delete.404', 'плейлиста $1 не существует');
$.lang.register('ytplayer.command.playlist.delete.usage', 'Применение: !playlist deletepl [playlist name]');
$.lang.register('ytplayer.command.playlist.listpl', 'плейлисты: $1');

$.lang.register('ytplayer.command.stealsong.this.success', '$1 позаимствовал(а) текущий трек в плейлист');
$.lang.register('ytplayer.command.stealsong.other.success', '$1 позаимствовал(а) текущий трек в плейлист $2');
$.lang.register('ytplayer.command.stealsong.refund', '$1 получил возмещение в размере $2 $3 за заказанный трек');
$.lang.register('ytplayer.command.stealsong.duplicate', 'указанный трек уже есть в плейлисте');

$.lang.register('ytplayer.command.jumptosong.failed', 'не удалось найти в плейлисте трек под номером $1');
$.lang.register('ytplayer.command.jumptosong.usage', 'Применение: «!$1» [номер позиции трека]');

$.lang.register('ytplayer.command.findsong.failed', 'не удалось найти трек, содержащий $1');
$.lang.register('ytplayer.command.findsong.usage', 'Применение: «!$1» [слово или словосочетание]'); // Searches song requests if any exist, else current playlist, for first match
$.lang.register('ytplayer.command.songrequest.usage', 'Применение: !play [ссылка на трек в YouTube]');
$.lang.register('ytplayer.command.songrequest.success', 'трек $1 добавлен в очередь под №$2'); // дополнительная переменная: $3 – YouTube ID
$.lang.register('ytplayer.command.songrequest.failed', 'не удалось добавить трек ($1)');

$.lang.register('ytplayer.command.previoussong', 'предыдущий трек $1 был заказан $2'); // дополнительная переменная: $3 – ссылка на трек в YouTube
$.lang.register('ytplayer.command.previoussong.404', 'нет данных о предыдущем треке');

$.lang.register('ytplayer.command.currentsong', 'текущий трек $1 был заказан $2'); // дополнительная переменная: $3 – ссылка на трек в YouTube
$.lang.register('ytplayer.command.currentsong.404', 'данный трек не является текущим');

$.lang.register('ytplayer.command.delrequest.success', 'трек $2 ($1) удалён из очереди заказов');
$.lang.register('ytplayer.command.delrequest.404', 'в очереди заказов нет трека с ID $1');
$.lang.register('ytplayer.command.delrequest.usage', 'Применение: !ytp delrequest [YouTube ID]');

$.lang.register('ytplayer.command.ytp.clearcache.warning', 'это очистит кэш треков плейера; если вы уверены в своих действиях, запустите !ytp clearcache now');
$.lang.register('ytplayer.command.ytp.clearcache.success', 'кэш треков плейера очищен');

$.lang.register('ytplayer.command.ytp.usage', 'Применение: !ytp [togglecconly / togglesongrequest / toggleannounce / delrequest / pause / volume / togglerandom / setrequestmax / setmaxvidlength / votecount / resetdefaultlist / clearcache]');

$.lang.register('ytplayer.command.wrongsong.success', 'последний заказанный трек $1 удалён');
$.lang.register('ytplayer.command.wrongsong.404', 'треков не найдено');
$.lang.register('ytplayer.command.wrongsong.user.success', 'последний заказанный трек $2 удалён из $1');
$.lang.register('ytplayer.command.wrongsong.usage', 'Применение: !wrongsong, либо !wrongsong [имя пользователя]');

$.lang.register('ytplayer.command.nextsong.single', 'следующий трек: $1');
$.lang.register('ytplayer.command.nextsong.amount', 'следующих треков $1: $2');
$.lang.register('ytplayer.command.nextsong.range', 'треков в указанном диапазоне: $1');
$.lang.register('ytplayer.command.nextsong.usage', 'Применение: !nextsong [индекс-номер / next [номер] / list [диапазон X-Y]]');
$.lang.register('ytplayer.command.nextsong.404', 'трек не найден');
$.lang.register('ytplayer.command.nextsong.range.404', 'треков в указанном диапазоне не найдено');

$.lang.register('ytplayer.requestsong.error.maxrequests', 'вы заказали достаточно треков');
$.lang.register('ytplayer.requestsong.error.disabled', 'заказ треков выключен');
$.lang.register('ytplayer.requestsong.error.yterror', '$1');
$.lang.register('ytplayer.requestsong.error.exists', 'данный трек уже есть в очереди');
$.lang.register('ytplayer.requestsong.error.maxlength', 'продолжительность трека $1 превышает установленный максимум');

$.lang.register('ytplayer.command.importpl.file.start', 'импорт треков начат, просьба подождать…');
$.lang.register('ytplayer.command.importpl.file.success', 'импорт треков в плейлист $4 завершён • Треков импортировано: $1 из $3 • Не удалось импортировать: $2');
$.lang.register('ytplayer.command.importpl.file.success.plerror', 'импорт треков в плейлист $4 завершён • Треков импортировано: $1 из $3 • Не удалось импортировать: $2 • Пропущено плейлистов: $5');
$.lang.register('ytplayer.command.importpl.file.404', 'файл $1 не найден');
$.lang.register('ytplayer.command.importpl.file.registry404', 'не удалось создать плейлист $1, попробуйте снова');
$.lang.register('ytplayer.command.importpl.file.usage', 'Применение: !playlist importpl file [имя плейлиста] [имя файла]');

$.lang.register('ytplayer.blacklisted', 'вам закрыт доступ к заказу треков');
$.lang.register('ytplayer.blacklist.usage', 'Применение: !ytp blacklistuser [add / remove]');
$.lang.register('ytplayer.blacklist.add.usage', 'Применение: !ytp blacklistuser add [имя пользователя]');
$.lang.register('ytplayer.blacklist.add.success', 'пользователю $1 закрыт доступ к заказу треков');
$.lang.register('ytplayer.blacklist.remove.usage', 'Применение: !ytp blacklistuser remove [имя пользователя]');
$.lang.register('ytplayer.blacklist.remove.success', 'пользователю $1 вновь открыт доступ к заказу треков');
$.lang.register('ytplayer.blacklist.usage.song', 'Применение: !ytp blacklist [add / remove]');
$.lang.register('ytplayer.blacklist.add.usage.song', 'Применение: !ytp blacklist add [слово или словосочетание]');
$.lang.register('ytplayer.blacklist.add.success.song', 'слово или словосочетание «$1» добавлено в чёрный список');
$.lang.register('ytplayer.blacklist.remove.usage.song', 'Применение: !ytp blacklist remove [слово или словосочетание]');
$.lang.register('ytplayer.blacklist.remove.success.song', 'слово или словосочетание «$1» удалено из чёрного списка');
$.lang.register('ytplayer.blacklist.404', 'заказанный трек не соответствует условиям канала');
$.lang.register('ytplayer.command.skip.success', 'поступил запрос на пропуск трека • Ещё голосов необходимо: $1');

$.lang.register('ytplayer.command.skip.disabled', 'голосование на пропуск треков выключено');
$.lang.register('ytplayer.command.skip.failure', 'вы уже сделали запрос на пропуск текущего трека');
$.lang.register('ytplayer.command.skip.skipping', '\u266B Пропуск трека по запросу пользователей');
$.lang.register('ytplayer.command.skip.delay', 'пропуск трека сейчас невозможен');
$.lang.register('ytplayer.command.votecount.set', 'минимальное необходимое число голосов для пропуска трека установлено на $1');
$.lang.register('ytplayer.command.votecount.negative', 'число голосов должно быть выше нуля');
$.lang.register('ytplayer.command.votecount.usage', '!ytp votecount [число] • Текущее число: $1');
