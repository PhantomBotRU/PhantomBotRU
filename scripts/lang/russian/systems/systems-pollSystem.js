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

$.lang.register('pollsystem.vote.nopoll', 'голосование сейчас не проводится');
$.lang.register('pollsystem.vote.already', 'вы уже проголосовали');
$.lang.register('pollsystem.vote.invalid', '«$1» не является корректным вариантом ответа');
$.lang.register('pollsystem.vote.success', 'по вопросу «$2» вы проголосовали за вариант «$1»');
$.lang.register('pollsystem.poll.started', '$1 запустил голосование продолжительностью $2 мин и минимальным количеством голосов $3 по вопросу «$4» с вариантами ответа: $5 (для участия наберите !vote [номер варианта ответа])');
$.lang.register('pollsystem.poll.started.nottime', '$1 запустил голосование по вопросу «$3» с вариантами ответа: $4 (для участия наберите !vote [номер варианта ответа])'); // $2 – варианты ответа
$.lang.register('pollsystem.poll.running', 'проводится голосование по вопросу «$1» с вариантами ответа: $2 (для участия наберите !vote [номер варианта ответа])');
$.lang.register('pollsystem.poll.usage', 'Применение: !poll [open / results / close]');
$.lang.register('pollsystem.results.lastpoll', 'в последнем голосовании «$1» победил вариант ответа «$3» с количеством голосов $5'); // Дополнительные теги: $2 – всего голосов, $4 – варианты ответа
$.lang.register('pollsystem.results.running', 'голосование ещё не завершено');
$.lang.register('pollsystem.results.404', 'последнее голосование не найдено');
$.lang.register('pollsystem.open.usage', 'Применение: !poll open "Вопрос" "Ответ 1, Ответ 2, …" [количество секунд (необязательно)] [минимум голосов (необязательно)]');
$.lang.register('pollsystem.open.moreoptions', 'для голосования необходимо несколько вариантов ответа');
$.lang.register('pollsystem.runpoll.novotes', 'Голосование по вопросу «$1» завершено с недостаточным количеством голосов');
$.lang.register('pollsystem.runpoll.winner', 'Голосование по вопросу «$1» завершено победой варианта «$2»');
$.lang.register('pollsystem.runpoll.tie', 'Голосование по вопросу «$1» завершено ничьей');
$.lang.register('pollsystem.runpoll.started', 'голосование уже проводится');
$.lang.register('pollsystem.close.nopoll', 'голосование сейчас не проводится');
