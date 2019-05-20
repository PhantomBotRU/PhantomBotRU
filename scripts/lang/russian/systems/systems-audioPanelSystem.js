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

$.lang.register('audiohook.usage', 'Применение: !audiohook [play / list / customcommand / togglemessages]');
$.lang.register('audiohook.play.usage', 'Применение: !audiohook play [имя звука]');
$.lang.register('audiohook.play.404', 'Звук $1 не найден');
$.lang.register('audiohook.play.success', 'Звук $1 отправлен');
$.lang.register('audiohook.list', 'Звуки: $1');
$.lang.register('audiohook.list.total', 'Всего страниц: $1');
$.lang.register('audiohook.toggle', 'Звуки $1');
$.lang.register('audiohook.customcommand.usage', 'Применение: !audiohook customcommand [add / remove] [command] [имя звука]');
$.lang.register('audiohook.customcommand.add.usage', 'Применение: !audiohook customcommand add [command] [имя звука]');
$.lang.register('audiohook.customcommand.add.error.exists', 'Указанная команда или псевдоним уже существует');
$.lang.register('audiohook.customcommand.add.list', 'Команда «!$1» будет выводить список всех звуковых команд');
$.lang.register('audiohook.customcommand.add.error.fx.null', 'Указанный звук не найден (список всех звуков: !audioHook list)');
$.lang.register('audiohook.customcommand.add.success', 'Команда «!$1» будет вызывать звук $2');
$.lang.register('audiohook.customcommand.remove.usage', 'Применение: !audiohook customcommand remove [имя команды]');
$.lang.register('audiohook.customcommand.remove.error.404', 'Указанной команды не существует');
$.lang.register('audiohook.customcommand.remove.success', 'Команда «!$1» удалена');
