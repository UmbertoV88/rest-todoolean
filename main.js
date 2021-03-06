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
        var delete_todo_id = $(this).parent().attr("data-todo_id");

        // faccio una chiamata ajax con DELETE per cancellare la nota
        $.ajax({
            url:"http://157.230.17.132:3022/todos/" + delete_todo_id,
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
        // recupero l'id della nota che voglio modificare
        var edit_todo_id = $(this).parent().attr("data-todo_id");
        console.log(edit_todo_id);
        // nascondo il testo e mostro l'input con il testo gia valorizzato
        $(this).parent().find(".todo-text").addClass("hidden");
        $(this).parent().find(".edit-todo-input").addClass("active");

        $(this).parent().find(".modifica").addClass("hidden");
        $(this).parent().find(".save-todo").addClass("active");
    });

    $("#todo-list").on("click",".save-todo", function(){
        var edit_todo_text = $(this).parent().find(".edit-todo-input").val();

        var edit_todo_id = $(this).parent().attr("data-todo_id");
        $.ajax({
            url:"http://157.230.17.132:3022/todos/" + edit_todo_id,
            method: "PUT",
            data: {
                text: edit_todo_text,
            },
            success: function(data){
                stampa_todos()
            },
            error:function(){
                alert("ERRORE")
            }
        });
    });

    function stampa_todos(){

        // faccio la chiamata ajax per prendere i dati della Lista
        $.ajax({
            url:"http://157.230.17.132:3022/todos/",
            method: "GET",
            success: function(data){
                // svuoto la lista prima di riempirla nuovamente, altrimenti me la stampa piu volte
                $("#todo-list").empty();
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
