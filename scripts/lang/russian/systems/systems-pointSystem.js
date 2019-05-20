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

$.lang.register('pointsystem.add.all.success', 'каждому в этом чате подарено по $1');
$.lang.register('pointsystem.add.all.usage', 'Применение: !points all [количество поинтов]');
$.lang.register('pointsystem.take.all.success', 'у каждого в этом чате отнято по $1');
$.lang.register('pointsystem.take.all.usage', 'Применение: !points takeall [количество поинтов]');
$.lang.register('pointsystem.add.error.negative', 'невозможно подарить отрицательное число поинтов $1');
$.lang.register('pointsystem.take.error.negative', 'невозможно принять отрицательное число $1');
$.lang.register('pointsystem.add.success', '$2 подарено $1, и его (её) новый баланс составляет $3');
$.lang.register('pointsystem.add.usage', 'Применение: !points add [имя пользователя] [количество поинтов]');
$.lang.register('pointsystem.user.success', 'у $1 сейчас $2');
$.lang.register('pointsystem.makeitrain.error.invalid', 'сейчас невозможно раздать $1');
$.lang.register('pointsystem.makeitrain.error.needpoints', 'у вас недостаточно средств для раздачи $1');
$.lang.register('pointsystem.makeitrain.error.negative', 'невозможно раздать отрицательное число $1');
$.lang.register('pointsystem.makeitrain.success', 'Благодаря $1 каждый в чате получает до $2 $3');
$.lang.register('pointsystem.makeitrain.usage', 'Применение: !makeitrain [количество поинтов]');
$.lang.register('pointsystem.set.bonus.error.negative', 'You can not set the bonus per group level to negative $1');
$.lang.register('pointsystem.set.bonus.success', 'Set the $1 bonus to $2 per group level');
$.lang.register('pointsystem.set.bonus.usage', 'Применение: !points bonus [количество поинтов]');
$.lang.register('pointsystem.set.gain.error.negative', 'You can not set the amount of $1 gained to a negative number');
$.lang.register('pointsystem.set.gain.offline.success', 'Set the $1 earnings to $2 every $3 minute(s) while the stream is offline');
$.lang.register('pointsystem.set.gain.offline.usage', 'Применение: !points setofflinegain [количество поинтов], if you have !permissionpoints set, it will override this!');
$.lang.register('pointsystem.set.gain.success', 'Set the $1 earnings to $2 every $3 minute(s) while the stream is online');
$.lang.register('pointsystem.set.gain.usage', 'Применение: !points setgain [количество поинтов], if you have !permissionpoints set, it will override this!');
$.lang.register('pointsystem.set.interval.error.negative', 'You can not set the $1 payout interval to negative minutes');
$.lang.register('pointsystem.set.interval.offline.success', 'Set the $1 payout interval to $2 minute(s) when the stream is offline');
$.lang.register('pointsystem.set.interval.offline.usage', 'Применение: !points setofflineinterval [количество поинтов]');
$.lang.register('pointsystem.set.interval.success', 'Set the $1 payout interval to $2 minute(s) when the stream is online');
$.lang.register('pointsystem.set.interval.usage', 'Применение: !points setinterval [количество поинтов]');
$.lang.register('pointsystem.set.name.both.success', 'The name of the points have now been changed from "$1" to "$2". Set the name for a single $2 using !points setname single [name]');
$.lang.register('pointsystem.set.name.multiple.success', 'Name of multiple points successfully changed from "$1" to "$2". To set the name for a single $2 use !points setname single [name]');
$.lang.register('pointsystem.set.name.single.success', 'Name of a single point successfully changed from "$1" to "$2". To set the name for multiple $2 use !points setname multiple [name]');
$.lang.register('pointsystem.set.name.usage', 'Применение: !points setname [single / multiple / delete] [name].  Sets the single or multiple name for chat points or deletes the values');
$.lang.register('pointsystem.set.name.delete', 'пользовательское название поинтов удалено');
$.lang.register('pointsystem.set.name.duplicate', 'That is the current name of the custom point command');
$.lang.register('pointsystem.setbalance.error.negative', 'нельзя установить отрицательный баланс $1');
$.lang.register('pointsystem.setbalance.success', 'Set the $1 balance of $2 to $3');
$.lang.register('pointsystem.setbalance.usage', 'Применение: !points set [name] [количество поинтов]');
$.lang.register('pointsystem.take.error.toomuch', 'You can not take more than what $1 has in $2');
$.lang.register('pointsystem.take.success', 'Took $1 from $2. New balance is $3');
$.lang.register('pointsystem.take.usage', 'Применение: !points take [name] [количество поинтов]');
$.lang.register('pointsystem.gift.usage', 'Применение: !gift [user] [количество поинтов]');
$.lang.register('pointsystem.gift.shortpoints', 'у вас недостаточно средств для отправки такого подарка');
$.lang.register('pointsystem.gift.404', 'данный пользователь ещё не был замечен в этом чате');
$.lang.register('pointsystem.gift.success', '$1 подарил $3 $2');
$.lang.register('pointsystem.usage.invalid', 'Invalid option passed to $1 command');
$.lang.register('pointsystem.err.negative', 'нельзя подарить отрицательно число $1');
$.lang.register('pointsystem.err.penalty', 'Применение: !penalty [имя пользователя] [количество минут]');
$.lang.register('pointsystem.penalty.set', 'пользователь $1 не будет получать поинты в течение $2');
$.lang.register('pointsystem.reset.all', 'поинты всех пользователей сброшены');
$.lang.register('pointsystem.message.usage', 'Применение: !points setmessage [message] - Tags: (userprefix), (user), (points), (pointsname), (pointsstring), (time), and (rank)');
$.lang.register('pointsystem.message.set', 'установлено сообщение о поинтах: $1');
$.lang.register('pointsystem.active.bonus.usage', 'Применение: !points setactivebonus [количество поинтов]');
$.lang.register('pointsystem.active.bonus.set', 'установлен бонус за активность: $1');
$.lang.register('pointsystem.bonus.usage', 'Применение: !points bonus (amount) (for time)');
$.lang.register('pointsystem.bonus.say', 'For the next $1 I will be giving out $2 extra $3 at each payouts!');
