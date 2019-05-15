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

$.lang.register('ranks.edit.usage', 'применение: !rankedit [add [количество часов] [название ранга] / del [количество часов] / custom [имя пользователя] [название ранга] / customdel [имя пользователя] / settime [количество часов] / setcost [количество поинтов]]');
$.lang.register('ranks.settime.usage', 'применение: !rankedit settime [количество часов]');
$.lang.register('ranks.settime.success', 'минимальный необходимый стаж для присвоения персонального ранга установлен на $1 час');
$.lang.register('ranks.setcost.usage', 'применение: !rankedit setcost [количество $1]');
$.lang.register('ranks.setcost.success', 'плата за персональный ранг установлена на $1 $2');
$.lang.register('ranks.custom.usage', 'применение: !rankedit custom [имя пользователя] [название ранга]');
$.lang.register('ranks.custom.404', 'Cannot find user to give a custom rank: $1');
$.lang.register('ranks.custom.success', '$1 has received a custom rank of: $2');
$.lang.register('ranks.customdel.usage', 'применение: !rankedit customdel [имя пользователя]');
$.lang.register('ranks.customdel.404', '$1 не имеет персонального ранга');
$.lang.register('ranks.customdel.success', 'с $1 снят персональный ранг');
$.lang.register('ranks.add.usage', 'применение: !rankedit add [количество часов] [название ранга]');
$.lang.register('ranks.add.success-new', 'Added new rank for hour $1 with name: $2');
$.lang.register('ranks.add.success-update', 'Updated rank for hour $1 with name: $2');
$.lang.register('ranks.del.usage', 'применение: !rankedit del [количество часов]');
$.lang.register('ranks.del.404', 'Cannot find rank with hours value of $1');
$.lang.register('ranks.del.success', 'Deleted rank with hours value of $1');
$.lang.register('ranks.rank.404', 'There are no ranks defined!');
$.lang.register('ranks.rank.success', '$1 has reached the rank of $2 and is $3 hours away from rank $4!');
$.lang.register('ranks.rank.norank.success', '$1 does not yet have a rank but is $2 hours away from rank $3!');
$.lang.register('ranks.rank.maxsuccess', '$1 has reached the maximum rank of $2!');
$.lang.register('ranks.rank.customsuccess', '$1 has been designated the rank of $2!');
$.lang.register('ranks.set.usage', 'применение: !rank set [rankname] Requires $1 hours in chat and $2 $3.');
$.lang.register('ranks.set.usage.nopoints', 'применение: !rank set [rankname] Requires $1 hours in chat.');
$.lang.register('ranks.set.failure', 'Either not enough hours ($1) or $2 ($3) to set rank!');
$.lang.register('ranks.set.failure.nopoints', 'Not enough hours ($1) to set rank!');
$.lang.register('ranks.set.success', 'установлен ранг «$1»');
$.lang.register('ranks.delself.404', 'вы не имеете персонального ранга');
$.lang.register('ranks.delself.success', 'с вас снят персональный ранг');
