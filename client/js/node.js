$(function () {
    function getAll() {
        $.ajax({
            url: 'http://localhost:3000/api/characters',
            type: 'GET',
            dataType: 'json',
            cache: false,
            success: function (data, textStatus, xhr) {
                console.log(textStatus);
                console.log(data);
                $('#list').html('');
                data.forEach(function (place) {
                    $('#list').append('<tr><td>' + place.id
                        + '</td><td><a href="#" data-id="' + place.id + '">' + place.name
                        + '</a></td><td>' + place.surname + '</td><td>'+ place.character+'</td><td>'+place.year+'</td><td><button class="btn btn-danger delete" data-id="' + place.id + '">Smazat</button></td></tr>');
                });
                $('#list a').on('click', function () {
                    getById($(this).data('id'));
                });
                $('.delete').on('click', function () {
                    deleteById($(this).data('id'));
                });
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    }

    function getById(id) {
        $.ajax({
            url: 'http://localhost:3000/api/characters/' + id,
            type: 'GET',
            dataType: 'json',
            cache: false,
            success: function (data, textStatus, xhr) {
                console.log(textStatus);
                console.log(data);
                $('#id').val(data.id);
                $('#name').val(data.name);
                $('#surname').val(data.surname);
                $('#character').val(data.character);
                $('#year').val(data.year);
                $('#content').val(data.content);
                $('#modelId').modal('show');
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    }

    function deleteById(id) {
        $.ajax({
            url: 'http://localhost:3000/api/characters/' + id,
            type: 'DELETE',
            dataType: 'json',
            cache: false,
            success: function (data, textStatus, xhr) {
                console.log(textStatus);
                console.log(data);
                getAll();
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    }

    function create(data) {
        $.ajax({
            url: 'http://localhost:3000/api/characters',
            type: 'POST',
            data: data,
            dataType: 'json',
            contentType: 'application/json',
            success: function (data, textStatus, xhr) {
                console.log(textStatus);
                console.log(data);
                getAll();
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    }

    function update(id, data) {
        $.ajax({
            url: 'http://localhost:3000/api/characters/' + id,
            type: 'PUT',
            data: data,
            dataType: 'json',
            contentType: 'application/json',
            success: function (data, textStatus, xhr) {
                console.log(textStatus);
                console.log(data);
                getAll();
            },
            error: function (xhr, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        })
    }

    $('button#submit').on('click', function () {
        var json = {};
        json.name = $('#name').val();
        json.surname = $('#surname').val();
        json.character = $('#character').val();
        json.year = $('#year').val();
        json.content = $('#content').val();
        var data = JSON.stringify(json);
        if ($('#id').val()) {
            update($('#id').val(), data);
        } else {
            create(data);
        }
    });

    $('button#create').on('click', function () {
        $('#id').val('');
        $('#name').val('');
        $('#surname').val('');
        $('#character').val('');
        $('#year').val('');
        $('#content').val('');
    });

    getAll();
});