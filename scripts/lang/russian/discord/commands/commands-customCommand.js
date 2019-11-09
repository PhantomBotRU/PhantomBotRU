/*
 * Copyright (C) 2016-2018 phantom.bot
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

$.lang.register('discord.customcommands.addcom.usage', 'применение: «!addcom [имя команды] [текст отклика]»');
$.lang.register('discord.customcommands.addcom.err', 'указанная команда уже существует');
$.lang.register('discord.customcommands.addcom.success', 'команда «!$1» создана');
$.lang.register('discord.customcommands.editcom.usage', 'применение: «!editcom [имя команды] [текст отклика]»');
$.lang.register('discord.customcommands.editcom.404', 'указанной команды не существует');
$.lang.register('discord.customcommands.editcom.success', 'команда «!$1» отредактирована');
$.lang.register('discord.customcommands.delcom.usage', 'применение: «!delcom [имя команды] [текст отклика]»');
$.lang.register('discord.customcommands.delcom.404', 'указанной команды не существует');
$.lang.register('discord.customcommands.delcom.success', 'команда «!$1» удалена');
$.lang.register('discord.customcommands.permcom.usage', 'применение: «!permcom [имя команды] [уровень доступа 0 или 1 (0 – любой пользователь, 1 – администратор)]»');
$.lang.register('discord.customcommands.permcom.404', 'указанной команды не существует');
$.lang.register('discord.customcommands.permcom.syntax.error', 'применение: «!permcom [имя команды] [уровень доступа 0 или 1 (0 – любой пользователь, 1 – администратор)]»');
$.lang.register('discord.customcommands.permcom.success', 'уровень доступа для команды «!$1» установлен на «$2»');
$.lang.register('discord.customcommands.coolcom.usage', 'применение: «!coolcom [имя команды] [время в секундах]»');
$.lang.register('discord.customcommands.coolcom.404', 'указанной команды не существует');
$.lang.register('discord.customcommands.coolcom.removed', 'кулдаун для команды «!$1» удалён');
$.lang.register('discord.customcommands.coolcom.success', 'кулдаун для команды «!$1» установлен на $2 сек');
$.lang.register('discord.customcommands.channelcom.usage', 'применение: «!channelcom [имя команды] [имя канала (либо имена каналов через запятую с пробелом) / --global / --list]»');
$.lang.register('discord.customcommands.channelcom.global', 'команда «!$1» будет работать на всех каналах');
$.lang.register('discord.customcommands.channelcom.success', 'команда «!$1» будет работать на следующих каналах: #$2');
$.lang.register('discord.customcommands.channelcom.404', 'для указанной команды не установлены каналы, на которых она будет работать');
$.lang.register('discord.customcommands.commands', 'пользовательские команды: «$1»');
$.lang.register('discord.customcommands.bot.commands', 'базовые и пользовательские команды бота: «$1»');
$.lang.register('discord.customcommands.pricecom.usage', 'применение: «!pricecom [имя команды] [количество поинтов]»');
$.lang.register('discord.customcommands.pricecom.success', 'плата за команду «!$1» установлена на $2');
$.lang.register('discord.customcommands.aliascom.usage', 'применение: «!aliascom [имя псевдонима] [имя команды]»');
$.lang.register('discord.customcommands.aliascom.success', 'псевдоним «!$1» привязан к команде «!$2»');
$.lang.register('discord.customcommands.delalias.usage', 'применение: «!delalias [имя псевдонима]»');
$.lang.register('discord.customcommands.delalias.success', 'псевдоним «!$1» удалён');
$.lang.register('discord.customcommands.404', 'указанной команды не существует');
$.lang.register('discord.customcommands.alias.404', 'указанного псевдонима не существует');
$.lang.register('discord.customcommands.customapi.404', 'команда «!$1» требует дополнительной переменной');
$.lang.register('discord.customcommands.customapijson.err', 'с командой «!$1» указана некорректная переменная'); // по сути: в процессе обработки API возникла ошибка
