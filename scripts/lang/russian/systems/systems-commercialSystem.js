/*
 * Copyright (C) 2016-2019 phantom.bot
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

$.lang.register('commercialsystem.usage', 'применение: !commercial [30 / 60 / 90 / 120 / 150 / 180] [опционально: silent] или !commercial autotimer [опционально: количество минут, не менее 8] [опционально: 30, 60, 90, 120, 150 или 180] [опционально: текст сообщения]');
$.lang.register('commercialsystem.run', 'запуск рекламы продолжительностью $1 сек');
$.lang.register('commercialsystem.422', 'реклама может быть запущена только на партнёрских каналах во время стрима, продолжительностью 30, 60, 90, 120, 150 или 180 сек, с интервалом не менее 8 мин');
$.lang.register('commercialsystem.autotimer.status-off', 'автоматическая реклама выключена');
$.lang.register('commercialsystem.autotimer.status-on', 'включена автоматическая реклама продолжительностью $1 сек и с интервалом $2 мин (для выключения наберите !commercial autotimer off, для добавления/редактирования сообщения наберите !commercial autotimer message [текст сообщения], для удаления сообщения наберите !commercial autotimer nomessage)');
$.lang.register('commercialsystem.autotimer.bad-parm', 'продолжительность рекламного блока может быть только 30, 60, 90, 120, 150 или 180 сек, с интервалом не менее 8 мин');
$.lang.register('commercialsystem.autotimer.status-on-msg', '$1'); // в оригинале: The message sent when an auto commercial starts: $1
$.lang.register('commercialsystem.autotimer.status-on-nomsg', ''); // в оригинале: No message is sent when an auto commercial starts
$.lang.register('commercialsystem.autotimer.msg-set', 'установлено сообщение при срабатывании автоматической рекламы: «$1»');
$.lang.register('commercialsystem.autotimer.msg-del', 'сообщение при срабатывании автоматической рекламы удалено');
