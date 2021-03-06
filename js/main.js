$(function() {

    $('.accordion > h6').on('click', function() {
        if ($(this).hasClass('open')) {
            $(this).find('span').html('+');
        } else {
            $(this).find('span').html('-');
        }
        $(this).toggleClass('open').next('div').stop(true, true).slideToggle(true);        
        $('.accordion h6').not(this).removeClass('open').next('div').slideUp();
        $('.accordion h6').not(this).find('span').html('+');
    });
    $('.accordion div h6').on('click', function(){
        if ($(this).hasClass('open')) {
            $(this).find('span').html('+');
        } else {
            $(this).find('span').html('-');
        }
        $(this).toggleClass('open').next('div').stop(true, true).slideToggle(true);
        $('.accordion div h6').not(this).removeClass('open').next('div').slideUp();
        $('.accordion div h6').not(this).find('span').html('+');
    });

    $('.js-drag-layout, .js-drag-field').draggable({
        revert: 'invalid',
        helper: function() {
            return $(this).clone().width($(this).width());
        },
        cursor: 'move'
    });



    $('.js-drop-layout').droppable({
        tolerance: 'pointer',
        accept: '.js-drag-layout',
        drop: function(event, ui) {
            // Append a clone of whatever row type the user chooses to the grid
            $(this).append($(ui.draggable).clone().removeClass('js-drag-layout').append('<div class="delete-row">x</div>'));
            // Once added to the grid make each row sortable
            $('.grid').sortable({
                connectWith: '.grid',
                handle: ':not(.editable)'
            });
            // Once a row is chosen then the below allows a form element to be added into that row
            $('.js-drop-field').droppable({
                tolerance: 'pointer',
                accept: '.js-drag-field',
                greedy: true,
                drop: function(event, ui) {
                    // Clone the form element from the drag area -> remove its drag handler -> remove its temp-overlay
                    //$(this).html($(ui.draggable).clone().removeClass('js-drag-field').find('label, input').remove());
                    var formEl = $(ui.draggable).clone();
                    formEl.removeClass('js-drag-field');
                    formEl.find('.temp-overlay').remove();
                    $(this).html(formEl);
                }
            });
        }
    });



    ////////////////////////////
    ////// Input options //////
    //////////////////////////

    var input_menu = '<div class="input-menu"><div><label for="input-id">Input id</label><input type="text" id="input-id" /></div><div><label for="input-type">Input type</label><select name="Input type" id="input-type"><option value="text">text</option><option value="number">number</option><option value="email">email</option></select></div><div><label for="label-text">Label text</label><input type="text" id="label-text" /></div><div><label for="placeholder-text">Placeholder text</label><input type="text" id="placeholder-text" /></div><div class="required-checkbox"><label for="required">Required</label><input type="checkbox" id="required" /></div><div><label for="error-text">Error text</label><input type="text" id="error-text" disabled /></div><div><input type="submit" id="done" value="Done" /></div></div>',
        textarea_menu = '<div class="textarea-menu"><div><label for="input-id">Textarea id</label><input type="text" id="input-id" /></div><div><label for="label-text">Label text</label><input type="text" id="label-text" /></div><div><label for="placeholder-text">Placeholder text</label><input type="text" id="placeholder-text" /></div><div class="required-checkbox"><label for="required">Required</label><input type="checkbox" id="required" /></div><div><label for="error-text">Error text</label><input type="text" id="error-text" disabled /></div><div><input type="submit" id="done" value="Done" /></div></div>',
        select_menu = '<div class="select-menu"><div><label for="select-id">Select id</label><input type="text" id="input-id" /></div><div><label for="label-text">Label text</label><input type="text" id="label-text" /></div><div><label for="options">Options</label><textarea rows="10" id="select-options"></textarea></div><div class="placeholder-checkbox"><label for="placeholder">Placeholder (this will set the first option as an unselectable placeholder)</label><input type="checkbox" id="placeholder" /></div><div class="required-checkbox"><label for="required">Required</label><input type="checkbox" id="required" /></div><div><label for="error-text">Error text</label><input type="text" id="error-text" disabled /></div><div><input type="submit" id="done" value="Done" /></div></div>',
        radio_menu = '<div class="radio-menu"> <div> <label for="group-name">Group name</label> <input type="text" id="group-name"/> </div><div> <label for="label-text">Label text</label> <input type="text" id="label-text"/> </div><div> <label for="radio-options">Options</label> <textarea rows="10" id="radio-options"></textarea> </div><div class="required-checkbox"> <label for="required">Required</label> <input type="checkbox" id="required"/> </div><div> <label for="error-text">Error text</label> <input type="text" id="error-text" disabled/> </div><div> <input type="submit" id="done" value="Done"/> </div></div>',
        checkbox_menu = '<div class="checkbox-menu"> <div> <label for="group-name">Group name</label> <input type="text" id="group-name"/> </div><div> <label for="label-text">Label text</label> <input type="text" id="label-text"/> </div><div> <label for="checkbox-options">Options</label> <textarea rows="10" id="checkbox-options"></textarea> </div><div class="required-checkbox"> <label for="required">Required</label> <input type="checkbox" id="required"/> </div><div> <label for="error-text">Error text</label> <input type="text" id="error-text" disabled/> </div><div> <input type="submit" id="done" value="Done"/> </div></div>',
        freeTxt_menu = '<div class="freeTxt-menu"> <div> <label for="free-text">Text</label> <input type="text" id="free-text"/> </div><div> <div class="radio-group inline"> <label for="alignment">Alignment</label> <label class="radio" for="align-left"> <input type="radio" name="alignment" id="align-left" value="align-left">Left </label> <label class="radio" for="align-center"> <input type="radio" name="alignment" id="align-center" value="align-center">Centre </label> <label class="radio" for="align-right"> <input type="radio" name="alignment" id="align-right" value="align-right">Right </label> </div></div><div> <input type="submit" id="done" value="Done"/> </div></div>',
        file_menu = '<div class="file-menu"> <div> <label for="label-text">Label text</label> <input type="text" id="label-text"/> </div><div class="required-checkbox"> <label for="required">Required</label> <input type="checkbox" id="required"/> </div><div> <label for="error-text">Error text</label> <input type="text" id="error-text" disabled/> </div><div> <input type="submit" id="done" value="Done"/> </div></div>',
        inputThis,
        overlayWidth;

    ////// Menu //////
    $(window).resize(function(){
        overlayWidth = $('.js-overlay-width').width();
        $('.menu').css('width', overlayWidth);
    }).resize();

    $(document).on('click', '.grid input.text, .grid input.number, .grid input.email, .grid input.file, .grid textarea, .grid select, .grid .radio-group, .grid .checkbox-group, .grid .free-text', function(e) {
        inputThis = $(this);

        if ($('.menu').hasClass('menu-open')) {
            $('.menu').empty();
        }

        if (inputThis.is('input.text, input.number, input.email')) {
            if ($('.input-menu').length < 1) {
                $('.menu').append(input_menu);
            }

            populateMenu($('.input-menu'), input_menu);
        }

        if (inputThis.is('textarea')) {
            if ($('.textarea-menu').length < 1) {
                $('.menu').append(textarea_menu);
            }

            populateMenu($('.textarea-menu'), input_menu);
        }

        if (inputThis.is('select')) {
            if ($('.select-menu').length < 1) {
                $('.menu').append(select_menu);
            }

            populateMenu($('.select-menu'), select_menu);
        }

        if (inputThis.is('.radio-group')) {
            if ($('.radio-menu').length < 1) {
                $('.menu').append(radio_menu);
            }

            populateMenu($('.radio-menu'), radio_menu);
        }

        if (inputThis.is('.checkbox-group')) {
            if ($('.checkbox-menu').length < 1) {
                $('.menu').append(checkbox_menu);
            }

            populateMenu($('.checkbox-menu'), checkbox_menu);
        }

        if (inputThis.is('.free-text')) {
            if ($('.freeTxt-menu').length < 1) {
                $('.menu').append(freeTxt_menu);
            }

            populateMenu($('.freeTxt-menu'), freeTxt_menu);
        }

        if (inputThis.is('input.file')) {
            e.preventDefault();
            if ($('.file-menu').length < 1) {
                $('.menu').append(file_menu);
            }

            populateMenu($('.file-menu'), file_menu);
        }

        e.stopPropagation();
    });

    function populateMenu(menuClass, menuType) {
        $('.menu').addClass('menu-open');

        ////// For any input type //////
        ////// Set input menu options to match clicked input field //////
        $('#label-text').val(inputThis.prev('label').text());
        $('#placeholder-text').val(inputThis.attr('placeholder'));
        $('#error-text').val(inputThis.next('.error').text());

        ////// Check if validation message has been added already to stop duplication occuring //////
        if (inputThis.next('.error').length > 0) {
            menuClass.find('#required').prop('checked', true);
            menuClass.find('#error-text').prop('disabled', false);
        } else {
            menuClass.find('#required').prop('checked', false);
            menuClass.find('#error-text').prop('disabled', true);
        }
        /////////////////////////////////////////////////////////////////////////////////////////////


        ////// Check if select option :first already has disabled //////
        if (inputThis.find('option').eq(0).is(':disabled')) {
            menuClass.find('#placeholder').prop('checked', true);
        }
        ////////////////////////////////////////////////////////////////


        ////// Targegt specific input types //////
        if (inputThis.is('input')) {
            ////// Set input menu options to match clicked input field //////
            $('#input-type').val(inputThis.attr('type'));
        }

        if (inputThis.is('select')) {
            ////// Set options in menu to match clicked select field //////
            var options = [];
            $('.select-menu #select-options').empty();
            inputThis.find('option').each(function(i) {
                options.push(this.innerHTML);
            });
            // Looping again to prevent an extra \n being added
            $.each(options, function(i, value){
                $('.select-menu #select-options').append(options[i]);
                if (i < options.length - 1) {
                    $('.select-menu #select-options').append('\n');
                }
            });
        }

        if (inputThis.is('.radio-group')) {
            $('#label-text').val(inputThis.find('.radio-group-label').text());

            var options = [];
            $('.radio-menu #radio-options').empty();
            inputThis.find('label.radio').each(function(i){
                options.push(this);
            });
            $.each(options, function(i, value){
                $('.radio-menu #radio-options').append($.trim(options[i].innerText));
                if (i < options.length - 1) {
                    $('.radio-menu #radio-options').append('\n');
                }
            });
        }

        if (inputThis.is('.checkbox-group')) {
            $('#label-text').val(inputThis.find('.checkbox-group-label').text());

            var options = [];
            $('.checkbox-menu #checkbox-options').empty();
            inputThis.find('label.checkbox').each(function(i){
                options.push(this);
            });
            $.each(options, function(i, value){
                $('.checkbox-menu #checkbox-options').append($.trim(options[i].innerText));
                if (i < options.length - 1) {
                    $('.checkbox-menu #checkbox-options').append('\n');
                }
            });
        }

        if (inputThis.is('.free-text')) {
            menuClass.find('#free-text').val(inputThis[0].innerHTML);
        }

        if (inputThis.is('input.file')) {
            menuClass.find('#free-text').val(inputThis[0].innerHTML);
        }
        //////////////////////////////////////////
    }


    ////// Set id for input and its label //////
    $(document).on('keyup', '#input-id', function() {
        inputThis.attr('id', $(this).val());
        inputThis.prev('label').attr('for', $(this).val());
    });
    ////// Set selected input fields type //////
    $(document).on('change', '#input-type', function() {
        inputThis.attr({'type' : $(this).val(), 'class' : $(this).val()});
    });
    ////// Set selected input label //////
    $(document).on('keyup', '#label-text', function() {
        inputThis.prev('label').text($(this).val());
    });
    ////// Set selected input placeholder text //////
    $(document).on('keyup', '#placeholder-text', function() {
        inputThis.attr('placeholder', $(this).val());
    });
    ////// Set selected input error text //////
    $(document).on('keyup', '#error-text', function() {
        inputThis.next('.error').text($(this).val());
    });
    ////// Required checkbox determines if input is required and adds validation message //////
    $(document).on('click', '#required', function() {
        if ($(this).is(':checked')) {
            $(this).parent().next().find('#error-text').prop('disabled', false);
            inputThis.parent().append('<div class="error">Validation message</div>');
        } else {
            $(this).parent().next().find('#error-text').prop('disabled', true).val('');
            inputThis.parent().find('.error').remove();
        }
    });
    ////// Set placeholder for dropdown list //////
    $(document).on('click', '#placeholder', function() {
        if ($(this).is(':checked')) {
            inputThis.find('option').eq(0).attr('disabled','disabled').attr('selected','selected');
        } else {
            inputThis.find('option').eq(0).removeAttr('disabled').removeAttr('selected');
        }
    });
    ////// Set group name for radio buttons (id which will append to wrapping div ) //////
    $(document).on('keyup', '#group-name', function() {
        inputThis.attr('id', ($(this).val()));
    });
    ////// Set label for radio buttons group //////
    $(document).on('keyup', '#label-text', function() {
        inputThis.find('.radio-group-label').text($(this).val());
    });
    ////// Set label for checkboxes group //////
    $(document).on('keyup', '#label-text', function() {
        inputThis.find('.checkbox-group-label').text($(this).val());
    });

    ////// Text area for select options //////
    var options = [];
    $(document).on('keyup', '#select-options', function() {
        var items = $(this).val().split('\n');

        inputThis.empty();

        for (var i = 0; i < items.length; i++) {
            inputThis.append($('<option>' + items[i] + '</option>').attr('value', i));
        }
    });

    ////// Text area for radio options //////
    $(document).on('keyup', '#radio-options', function() {
        var items = $(this).val().split('\n');

        inputThis.find('.radio').remove();

        for (var i = 0; i < items.length; i++) {
            inputThis.append($('<label class="radio" for="radio-' + (i+1) + '"><input type="radio" id="radio-' + (i+1) + '" name="radios" value="' + items[i] + '" />' + items[i] + '</label>'));
        }
    });

    ////// Text area for checkboxes //////
    $(document).on('keyup', '#checkbox-options', function() {
        var items = $(this).val().split('\n');

        inputThis.find('.checkbox').remove();

        for (var i = 0; i < items.length; i++) {
            inputThis.append($('<label class="checkbox" for="checkbox-' + (i+1) + '"><input type="checkbox" id="checkbox-' + (i+1) + '" name="checkbox" value="' + items[i] + '" />' + items[i] + '</label>'));
        }
    });

    ////// Input for free text elems //////
    $(document).on('keyup', '#free-text', function(){
        var freeTxt = $(this).val();
        inputThis[0].innerHTML = freeTxt;
    });
    ////// Alignment options for free text //////
    $(document).on('change', 'input[name="alignment"]:radio', function(){
        inputThis[0].classList.remove('align-left', 'align-center', 'align-right');
        inputThis[0].classList.add(this.value);
    });

    ////// Done button //////
    $(document).on('click', '#done', function() {
        setTimeout(function() {
            $(".input-menu, .select-menu").remove();
        }, 300);
        $('.menu').removeClass('menu-open');
    });
    ////// Delete a row //////
    $(document).on("click", ".delete-row", function() {
        $(this).parent('.row').remove();
    });
    ////// Remove input menu on document click //////
    $(document).on('click', function() {
        if ($('.input-menu').length > 0) {
            isHovered = $(".input-menu").is(":hover");
            if (isHovered == false) {
                setTimeout(function() { $(".input-menu").remove(); }, 300);
                $('.menu').removeClass('menu-open');
            }
        }
        if ($('.select-menu').length > 0) {
            isHovered = $(".select-menu").is(":hover");
            if (isHovered == false) {
                setTimeout(function() { $(".select-menu").remove(); }, 300);
                $('.menu').removeClass('menu-open');
            }
        }
        if ($('.textarea-menu').length > 0) {
            isHovered = $(".textarea-menu").is(":hover");
            if (isHovered == false) {
                setTimeout(function() { $(".textarea-menu").remove(); }, 300);
                $('.menu').removeClass('menu-open');
            }
        }
        if ($('.radio-menu').length > 0) {
            isHovered = $(".radio-menu").is(":hover");
            if (isHovered == false) {
                setTimeout(function() { $(".radio-menu").remove(); }, 300);
                $('.menu').removeClass('menu-open');
            }
        }
        if ($('.checkbox-menu').length > 0) {
            isHovered = $(".checkbox-menu").is(":hover");
            if (isHovered == false) {
                setTimeout(function() { $(".checkbox-menu").remove(); }, 300);
                $('.menu').removeClass('menu-open');
            }
        }
        if ($('.freeTxt-menu').length > 0) {
            isHovered = $(".freeTxt-menu").is(":hover");
            if (isHovered == false) {
                setTimeout(function() { $(".freeTxt-menu").remove(); }, 300);
                $('.menu').removeClass('menu-open');
            }
        }
        if ($('.file-menu').length > 0) {
            isHovered = $(".file-menu").is(":hover");
            if (isHovered == false) {
                setTimeout(function() { $(".file-menu").remove(); }, 300);
                $('.menu').removeClass('menu-open');
            }
        }
        if ($('.preview-panel').length > 0) {
            isHovered = $(".preview-panel").is(":hover");
            if (isHovered == false) {
                $('.page-overlay')[0].style.display = 'none';
                $('.preview-panel').remove();
            }
        }
    });


    ////// On save remove all instances of ui-draggable- and ui-droppable- -> Basicaly will need to cleanse all divs of classes they don't need -> Also remove delete div from grid rows //////
    $('.grid').on('DOMSubtreeModified', function(){
        var exported = $('.grid').clone();
        exported.find('*').removeClass('ui-draggable ui-draggable-handle ui-sortable-handle js-drop-field ui-sortable-handle ui-droppable').remove('.delete-row');
        console.log(exported[0].innerHTML);
        $('.rendered-html').text(exported[0].innerHTML);
    });
    $('.export').on('click', function(){
        var exported = $('.grid').clone();
        exported.find('*').removeClass('ui-draggable ui-draggable-handle ui-sortable-handle js-drop-field ui-sortable-handle ui-droppable').remove('.delete-row');
        //exported.push($('.grid').clone().find('*').removeClass('ui-draggable ui-draggable-handle ui-sortable-handle js-drop-field ui-sortable-handle ui-droppable').remove('.delete-row'));

        console.log(exported[0]);
        return false;
    });

    ////// Preview //////
    $('.preview').on('click', function(e){
        var overlay = document.querySelectorAll('.page-overlay')[0],
            previewPan = document.createElement('div'),
            exported = document.querySelectorAll('.grid')[0].cloneNode(true);

        $(exported).find('*').removeClass('ui-draggable ui-draggable-handle ui-sortable-handle js-drop-field ui-sortable-handle ui-droppable').remove('.delete-row');

        overlay.style.display = 'block';
        previewPan.className = 'preview-panel';
        previewPan.innerHTML = '<span class="close">X</span>' + exported.innerHTML;
        overlay.appendChild(previewPan);

        e.stopPropagation();
    });

    $(document).on('click', '.preview-panel .close', function(){
        $('.page-overlay')[0].style.display = 'none';
        $('.preview-panel').remove();
    });
});




// var ctxMenu_label = '<ul class="contextMenu" hidden><li><a href="#" class="ctxmenu-edit">Edit</a></li><li><a href="#" class="ctxmenu-delete">Delete</a></li></ul>',
//     ctxMenu_text = '<ul class="contextMenu" hidden><li><a href="#" class="ctxmenu-add-text">Add text</a></li><li><a href="#" class="ctxmenu-delete">Delete</a></li></ul>',
//     ctxThis;

///////////////////////////
////// Context menu //////
/////////////////////////

// $(document).on("contextmenu", ".grid label", function() {
//     ctxThis = $(this);
//     if ($('.contextMenu').length < 1) {
//         $('body').append(ctxMenu_label);
//     }
//     callMenu();
//     return false;
// });

// $(document).on("contextmenu", ".grid .even-pad", function() {
//     ctxThis = $(this);
//     if ($('.contextMenu').length < 1) {
//         $('body').append(ctxMenu_text);
//     }
//     callMenu();
//     return false;
// });

// var callMenu = function(){
//     $('.contextMenu').show().css({
//         top: event.pageY,
//         left: event.pageX
//     });
// };

////// Edit button on context menu ////
// $(document).on('click', '.ctxmenu-edit', function(e) {
//     ctxThis.attr('contenteditable', 'true');
//     setTimeout(function(){ctxThis.focus();},100); // Probably better way to do this than using setTimeout
//     $(".contextMenu").remove();
//     e.stoppropagation();
// });

////// Delete button on context menu //////
// $(document).on('click', '.ctxmenu-delete', function(e) {
//     ctxThis.remove();
//     $(".contextMenu").remove();
//     e.stoppropagation();
// });

////// Edit text //////
// $(document).on('click', '.editable', function(e){
//     $('.grid').sortable('disable');
//     e.stoppropagation();
// });


////// Add text button on context menu //////
// $(document).on('click', '.ctxmenu-add-text', function() {
//     ctxThis.html('<p contenteditable>Click here to enter your text...</p>')
//     setTimeout(function(){ctxThis.find('p').focus();},100);
//     $(".contextMenu").remove();
//     e.stoppropagation();
// });

// $(document).on('click', function() {
//     // If grid is disabled re-enable it
//     if ($('.grid').hasClass('ui-sortable-disabled')) {
//         $('.grid').sortable('enable');
//     }

//     if ($('.contextMenu').length > 0) {
//         isHovered = $(".contextMenu").is(":hover");
//         if (isHovered == false) {
//             $(".contextMenu").remove();
//         }
//     }

//     ////// Set contenteditable to false once user has clicked off it - throwing error so will need to fix that //////
//     // if ($('.contextMenu').length < 1) {
//     //     ctxThis.attr('contenteditable', 'false');
//     // }

// });
