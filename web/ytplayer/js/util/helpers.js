// Script that has helper functions.
$(function() {
    var helpers = {};

    /*
     * @function Generates a basic modal, you have to append your own body with jQuery.
     *
     * @param  {String}   id
     * @param  {String}   title
     * @param  {String}   btn
     * @param  {Object}   body
     * @param  {Function} onClose
     * @return {Object}
     */
    helpers.getModal = (id, title, btn, body, onClose) => {
        return $('<div/>', {
            'class': 'modal fade',
            'id': id
        }).append($('<div/>', {
            'class': 'modal-dialog'
        }).append($('<div/>', {
            'class': 'modal-content'
        }).append($('<div/>', {
            'class': 'modal-header',
        }).append($('<h5/>', {
            'class': 'modal-title',
            'text': title
        })).append($('<button/>', {
            'type': 'button',
            'class': 'close',
            'data-dismiss': 'modal',
            'html': '&times;'
        }))).append($('<div/>', {
            'class': 'modal-body',
            'html': body
        })).append($('<div/>', {
            'class': 'modal-footer',
        }).append($('<button/>', {
            'class': 'btn btn-primary',
            'type': 'button',
            'text': btn,
            'data-dismiss': 'modal',
            'click': onClose
        }))))).on('hidden.bs.modal', () => {
            $('#' + id).remove();
        });
    };

    /*
     * @function Generates a simple add song modal.
     *
     * @param  {String}   title
     * @param  {String}   label
     * @param  {String}   btn
     * @param  {String}   placeholder
     * @param  {Function} onClose
     * @return {Object}
     */
    helpers.getSongModal = (title, label, btn, placeholder, onClose) => {
        return helpers.getModal('song-modal', title, btn, $('<div/>', {
            'class': 'form-group'
        }).append($('<label/>', {
            'text': label
        })).append($('<input/>', {
            'class': 'form-control',
            'type': 'text',
            'placeholder': placeholder,
            'id': 'song-url',
            'focus': () => {
                $('#song-url').attr('placeholder', '');
            },
            'blur': () => {
                $('#song-url').attr('placeholder', placeholder);
            }
        })), onClose);
    };

    /*
     * @function Generates a load playlist modal
     *
     * @param  {String}   title
     * @param  {String}   label
     * @param  {String}   btn
     * @param  {String}   placeholder
     * @param  {Array}    playlists
     * @param  {Function} onClose
     * @return {Object}
     */
    helpers.getPlaylistModal = (title, label, btn, placeholder, playlists, onClose) => {
        return helpers.getModal('playlist-load-modal', title, btn, $('<div/>', {
            'class': 'form-group'
        }).append($('<label/>', {
            'text': label
        })).append($('<select/>', {
            'class': 'form-control',
            'id': 'playlist-load',
            'text': 'Выберите плейлист',
            'style': 'width: 100%; cursor: pointer;',
            'data-toggle': 'dropdown'
        }).append($('<option/>', {
            'html': 'Выберите плейлист',
            'selected': 'true',
            'disabled': 'true',
            'hidden': 'true'
        })).append(playlists.map(function(playlist) {
            return $('<option/>', {
                'html': playlist
            });
        })).append($('<option/>', {
            'html': 'Выберите плейлист',
            'disabled': 'true',
            'hidden': 'true'
        }))), onClose);
    };

    /*
     * @function Generates a load playlist modal
     *
     * @param  {String}   title
     * @param  {String}   body
     * @param  {Function} onClose
     * @return {Object}
     */
    helpers.getErrorModal = (title, body, onClose) => {
        return helpers.getModal('err-modal', title, 'Понятно', $('<div/>', {
            'class': 'form-group'
        }).append($('<p/>', {
            'text': body
        })), onClose);
    };

    /*
     * @function Generates the settings modal
     *
     * @param  {Function} onClose
     */
    helpers.getSettingsModal = (onClose) => {
        player.dbQuery('yt_settings', 'ytSettings', (e) => {
            helpers.getModal('settings-modal', 'Настройки плейера', 'Сохранить', $('<form/>').append($('<div/>', {
                'class': 'form-group'
            }).append($('<label/>', {
                'text': 'Размер видео'
            })).append($('<div/>', {
                'class': 'dropdown'
            }).append($('<button/>', {
                'class': 'btn btn-secondary dropdown-toggle',
                'type': 'button',
                'data-toggle': 'dropdown',
                'text': helpers.getPlayerSize(),
                'id': 'player-size-btn'
            })).append($('<div/>', {
                'class': 'dropdown-menu',
                'aria-labelledby': 'player-size-btn'
            }).append($('<a/>', {
                'class': 'dropdown-item',
                'href': '#',
                'text': 'Большой',
                'click': () => {
                    $('#player-size-btn').text('Большой');
                }
            })).append($('<a/>', {
                'class': 'dropdown-item',
                'href': '#',
                'text': 'Половинный',
                'click': () => {
                    $('#player-size-btn').text('Половинный');
                }
            })).append($('<a/>', {
                'class': 'dropdown-item',
                'href': '#',
                'text': 'Малый',
                'click': () => {
                    $('#player-size-btn').text('Малый');
                }
            })).append($('<a/>', {
                'class': 'dropdown-item',
                'href': '#',
                'text': 'Узкий',
                'click': () => {
                    $('#player-size-btn').text('Узкий');
                }
            })).append($('<a/>', {
                'class': 'dropdown-item',
                'href': '#',
                'text': 'Скрытый',
                'click': () => {
                    $('#player-size-btn').text('Скрытый');
                }
            }))))).append($('<div/>', {
                'class': 'form-group'
            }).append($('<label/>', {
                'text': 'Имя диджея'
            })).append($('<input/>', {
                'type': 'text',
                'data-toggle': 'tooltip',
                'title': 'Имя диджея по умолчанию',
                'class': 'form-control',
                'id': 'dj-name',
                'value': e.playlistDJname
            }))).append($('<div/>', {
                'class': 'form-group',
            }).append($('<label/>', {
                'text': 'Максимум треков'
            })).append($('<input/>', {
                'type': 'number',
                'data-toggle': 'tooltip',
                'title': 'Максимальное количество треков от одного пользователя',
                'class': 'form-control',
                'id': 'max-song-user',
                'value': e.songRequestsMaxParallel
            }))).append($('<div/>', {
                'class': 'form-group'
            }).append($('<label/>', {
                'text': 'Максимальная длительность'
            })).append($('<input/>', {
                'type': 'number',
                'data-toggle': 'tooltip',
                'id': 'max-song-length',
                'title': 'Максимальная длительность трека в секундах',
                'class': 'form-control',
                'value': e.songRequestsMaxSecondsforVideo
            }))).append($('<div/>', {
                'class': 'form-group'
            }).append($('<label/>', {
                'text': 'Количество голосов'
            })).append($('<input/>', {
                'type': 'number',
                'data-toggle': 'tooltip',
                'id': 'vote-count',
                'title': 'Необходимое количество голосов для пропуска трека',
                'class': 'form-control',
                'value': e.voteCount
            }))),onClose).modal('toggle');
        });
    };

    /*
     * @function Gets the player size.
     *
     * @return {String}
     */
    helpers.getPlayerSize = () => {
        let size = localStorage.getItem('phantombot_ytplayer_size');

        return (size === null ? 'Большой' : size[0].toUpperCase() + size.substr(1));
    };

    /*
     * @function Sets the new player size.
     */
    helpers.setPlayerSize = () => {
        switch (localStorage.getItem('phantombot_ytplayer_size')) {
            case 'половинный':
                $('#left-section').attr('class', 'col-md-6').removeClass('off');
                $('#right-section').attr('class', 'col-md-6');
                break;
            case 'малый':
                $('#left-section').attr('class', 'col-md-5').removeClass('off');
                $('#right-section').attr('class', 'col-md-7');
                break;
            case 'узкий':
                $('#left-section').attr('class', 'col-md-4').removeClass('off');
                $('#right-section').attr('class', 'col-md-8');
                break;
            case 'скрытый':
                $('#left-section').addClass('off');
                $('#right-section').attr('class', 'col-md-12');
                break;
            default:
                $('#left-section').attr('class', 'col-md-7').removeClass('off');
                $('#right-section').attr('class', 'col-md-5');
        }
    };

    // Export object.
    window.helpers = helpers;
});
