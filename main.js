$(document).ready(function() {
    //HANDLEBARS
    var html_template = $("#template").html();
    var template_function = Handlebars.compile(html_template);

    stampa_todos();
    // intercetto il click sul bottone per aggiungere una nuova nota dall'input text
    // SOLUZIONE A (SENZA CHIAMATA AJAX)

    /*$("#todo-button").click(function(){
        var newNote = $("#todo-input").val();
        $("#todo-list").append("<li>" + newNote + "</li>");
        $("#todo-input").val(" ");
    })*/

    // SOLUZIONE B (ESEGUO UNA CHIAMATA AJAX CON POST)
    $("#todo-button").click(function(){
        // leggo cosa ha inserito l'utente nell'input
        var newNote = $("#todo-input").val();
        // inserisco un controllo per impedire che l'input possa essere vuoto
        if (newNote.trim()) {
            // svuoto dal testo l'input
            $("#todo-input").val(" ");
            // richiamo la funzione
            creo_todo(newNote);
        }else{
            alert("Il campo d'inserimento risulta vuoto!");
            $("#todo-input").val(" ");
        }

    });
    // cancellare un nota:intercetto il click sull'icona del cestino

    $("#todo-list").on("click",".cestino", function(){
        // recupero l'id della nota che voglio cancellare
        var todo_id = $(this).parent().attr("data-todo_id");
        console.log(todo_id);
        // faccio una chiamata ajax con DELETE per cancellare la nota
        $.ajax({
            url:"http://157.230.17.132:3022/todos/" + todo_id,
            method: "DELETE",
            success: function(data){
                stampa_todos();
            },
            error:function(){
                alert("ERRORE")
            }
        });
    });

    // modificare  un nota:intercetto il click sull'icona della matita

    $("#todo-list").on("click",".modifica", function(){
        // recupero l'id della nota che voglio cancellare
        var todo_id = $(this).parent().attr("data-todo_id");
        console.log(todo_id);
        // faccio una chiamata ajax con PUT per modificare  la nota
        $.ajax({
            url:"http://157.230.17.132:3022/todos/" + todo_id,
            method: "PUT",
            success: function(data){
                stampa_todos();
            },
            error:function(){
                alert("ERRORE")
            }
        });
    });

    function stampa_todos(){
        // svuoto la lista prima di riempirla nuovamente, altrimenti me la stampa piu volte
        $("#todo-list").empty();
        // faccio la chiamata ajax per prendere i dati della Lista
        $.ajax({
            url:"http://157.230.17.132:3022/todos/",
            method: "GET",
            success: function(data){
                console.log(data);
                for (var i = 0; i < data.length; i++) {
                    console.log(data[i]);
                    var testo_todo = data[i].text;
                    var id_todo = data[i].id;

                    var template_data = {
                        todo_id:id_todo,
                        todo_text:testo_todo
                    };
                    var html_todo = template_function(template_data);
                     $("#todo-list").append(html_todo);
                }
            },
            error:function(){
                alert("ERRORE")
            }
        });
    };

    function creo_todo(newNote){
        // eseguo una chiamata Ajax con method POST per memorizzare la nota inserita dall'utente
        $.ajax({
            url:"http://157.230.17.132:3022/todos/",
            method: "POST",
            data: {
                text: newNote
            },
            success: function(data){
                stampa_todos()
            },
            error:function(){
                alert("ERRORE")
            }
        });
    };
});
