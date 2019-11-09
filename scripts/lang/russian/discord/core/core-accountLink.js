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

$.lang.register('discord.accountlink.usage.nolink', 'перед началом процедуры связывания ваших аккаунтов Discord и Twitch на этом сервере убедитесь, что у вас не заблокирована возможность принимать личные сообщения в Discord. Затем наберите на этом сервере команду **!account link**. В ответ я (бот) отправлю вам личное сообщение с простой инструкцией.');
$.lang.register('discord.accountlink.usage.link', 'ваш аккаунт Discord уже связан с **<https://twitch.tv/$1>** на этом сервере. Вы можете обновить связь, набрав команду **!account link**, либо удалить её, набрав команду **!account remove**.');
$.lang.register('discord.accountlink.link', '**ВНИМАНИЕ: данное действие необходимо произвести в течение 10 минут!**\nДля связывания ваших аккаунтов Discord и Twitch на обозначенном сервере, пропишите в чате **<https://twitch.tv/$1>** команду **!account link $2**.');
$.lang.register('discord.accountlink.link.relink', '**ВНИМАНИЕ: данное действие необходимо произвести в течение 10 минут! Это отменит прежнюю связь между вашими аккаунтами Discord и Twitch на обозначенном сервере.**\nДля повторного связывания пропишите в чате **<https://twitch.tv/$1>** команду **!account link $2**.');
$.lang.register('discord.accountlink.link.success', 'Ваш аккаунт Discord успешно связан с **<https://twitch.tv/$1>** на обозначенном сервере. В случае изменения имени вашего аккаунта Twitch, необходимо вновь пройти процедуру связывания.');
$.lang.register('discord.accountlink.link.fail', 'введённый токен некорректен, либо истёк – начните процедуру связывания аккаунтов Discord и Twitch на обозначенном сервере заново');
$.lang.register('discord.accountlink.link.remove', 'Ваш аккаунт Discord успешно отвязан от всех аккаунтов Twitch на обозначенном сервере.');
$.lang.register('discord.accountlink.linkrequired', 'данная команда станет доступна только после связывания аккаунтов Twitch и Discord на этом сервере посредством команды **!account**.');
