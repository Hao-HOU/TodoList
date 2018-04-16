NEJ.define([
    'util/ajax/xdr',
    'util/chain/chainable',
    'util/counter/counter',
],function(_j,$){
    var taskList = {};

    // 加载即执行
    readTask();
    // 回车添加数据
    $('#taskContent')._$on({
        "keydown": function(e){
            if(e.keyCode == 13){
                addtask();
            }
        }
    });

    // 监听 checkbox 事件委托
    $("#list")._$on({
        "change": function (e) {
            console.log(e);
            if(e.target.name === 'toggle-single'){
                update(e.target.dataset.index);
            }
        }
    });

    // 监听 Active按钮
    $('#active-btn')._$on({
        "click": function(){
            onlyActive();
        }
    });

    // 监听 Completed按钮
    $('#completed-btn')._$on({
        "click": function(){
            onlyCompleted();
        }
    });

    // 监听 All按钮
    $('#all-btn')._$on({
        "click": function(){
            all();
        }
    });

    // 监听 删除 事件委托
    $('#list')._$on({
        "click": function(e){
            if(e.target.className === 'delete'){
                deleteTask(e.target.dataset.index);
            }
        }
    });

    // 监听 全部删除
    $('#clear-btn')._$on({
        "click": function(){
            deleteTask(-1);
        }
    });

    // 监听 编辑 事件委托
    $('#list')._$on({
       "dblclick": function(e){
           if(e.target.className === 'task-detail' || e.target.className === 'task-detail task-completed'){
               showEditInput(e.path[1].dataset.index);
           }
       },
       "focusout": function(e){
           if(e.target.className === 'edit-input'){
               editTask(e.target.dataset.index);
           }
       }
    });

    // 读取数据
    // function readTask() {
    //     var taskSQL = [];
    //     if (localStorage.tasks) {
    //         taskSQL = JSON.parse(localStorage.tasks);
    //     }
    //     taskList = taskSQL;
    //     return taskSQL;
    // }
    function readTask() {
        var taskSQL = [];
        _j._$request(
            '/get_all_items.do',{
                type: 'json',
                method:'post',
                headers:{'Content-Type':'application/json'},
                onload:function(_result){
                    console.log(_result);
                    taskSQL = _result.data;
                    taskList = _result.data;
                    var listContent = '';
                    for(var i = 0;i < taskSQL.length;i++){
                        listContent += '<li class="task"  data-index="' + taskSQL[i].id + '" >';
                        listContent += '<label class="demo--label"><input class="demo--radio" type="checkbox" name="toggle-single" data-index="' + taskSQL[i].id + '"';
                        listContent += (taskSQL[i].done?'checked="checked"':'') + '><span class="demo--checkbox demo--radioInput"></span></label>';
                        listContent += (taskSQL[i].done?'<div class="task-detail task-completed">':'<div class="task-detail">') + taskSQL[i].listContent + '<div class="delete" data-index="' + taskSQL[i].id + '">×</div></div>';
                        listContent += '</li>';
                    }
                    $('#list')._$insert('<ul>'+listContent+'</ul>','bottom');
                    counter(taskSQL);
                },
                onerror:function(_error){
                    // TODO
                }
            }
        );
    }

    // 加载数据
    // function loadTask(){
    //     // if(localStorage.tasks){
    //         var taskSQL = readTask();
    //         var listContent = '';
    //         for(var i = 0;i < taskSQL.length;i++){
    //             listContent += '<li class="task"  data-index="' + taskSQL[i].id + '" >';
    //             listContent += '<label class="demo--label"><input class="demo--radio" type="checkbox" name="toggle-single" data-index="' + taskSQL[i].id + '"';
    //             listContent += (taskSQL[i].done?'checked="checked"':'') + '><span class="demo--checkbox demo--radioInput"></span></label>';
    //             listContent += (taskSQL[i].done?'<div class="task-detail task-completed">':'<div class="task-detail">') + taskSQL[i].title + '<div class="delete" data-index="' + taskSQL[i].id + '">×</div></div>';
    //             listContent += '</li>';
    //         }
    //         $('#list')._$insert('<ul>'+listContent+'</ul>','bottom');
    //         counter(taskSQL);
    //     // }
    // }

    // 新增数据
    function addtask(){
        var title = $('#taskContent')._$val();
        var taskSQL = taskList;
        _j._$request(
            '/add_item.do',{
                type: 'json',
                method:'post',
                data: JSON.stringify({ listContent: title}),
                headers:{'Content-Type':'application/json'},
                onload:function(_result){
                    $('#taskContent')._$val('');
                    $('#list ul')._$remove();
                    readTask();
                },
                onerror:function(_error){
                    // TODO
                }
            }
        );
    }

    // 状态变化
    function update(index) {
        var taskSQL = taskList;
        for(var i = 0;i < taskSQL.length;i++){
            if(taskSQL[i].id.toString() === index){
                taskSQL[i].done = !taskSQL[i].done;
                _j._$request(
                    '/change_item_status.do',{
                        type: 'json',
                        mode: 0,
                        data: JSON.stringify({ id: Number(index), done: !taskSQL[i].done?0:1}),
                        headers:{'Content-Type':'application/json'},
                        method:'post',
                        onload:function(_result){
                            // TODO
                        },
                        onerror:function(_error){
                            // TODO
                        }
                    }
                );
                if(taskSQL[i].done){
                    $('li[data-index="' + taskSQL[i].id + '"] .task-detail')._$addClassName('task-completed');
                }else{
                    $('li[data-index="' + taskSQL[i].id + '"] .task-detail')._$replaceClassName('task-completed');
                }
                break;
            }
        }
        // saveTask(taskSQL);
        counter(taskSQL);
    }

    // 删除
    function deleteTask(index){
        var taskSQL = taskList;
        var len = taskSQL.length;
        if(index != -1){
            // for(var i = 0;i < taskSQL.length;i++) {
            //     if (taskSQL[i].id.toString() === index) {
            //         taskSQL.splice(i,1);
            //         break;
            //     }
            // }
            _j._$request(
                '/delete_item.do',{
                    type: 'json',
                    method:'post',
                    data: JSON.stringify({ id: Number(index) }),
                    headers:{'Content-Type':'application/json'},
                    onload:function(_result){
                        $('#list ul')._$remove();
                        readTask();
                    },
                    onerror:function(_error){
                        // TODO
                    }
                }
            );
        }else{
            _j._$request(
                '/delete_all_done.do',{
                    type: 'json',
                    method:'post',
                    onload:function(_result){
                        $('#list ul')._$remove();
                        readTask();
                    },
                    onerror:function(_error){
                        // TODO
                    }
                }
            );
        }
        // saveTask(taskSQL);
        counter(taskSQL);
    }

    // 编辑
    function showEditInput(index){
        var taskSQL = taskList;
        var editInput = '<input type="text" class="edit-input" name="edit-input"';
        for(var i = 0;i < taskSQL.length;i++) {
            if (taskSQL[i].id.toString() === index) {
                $('li[data-index="' + taskSQL[i].id + '"]')._$html(editInput + 'data-index="' + index + '" >' );
                // $('li[data-index="' + taskSQL[i].id + '"] .edit-input').focus();
                document.querySelector('li[data-index="' + taskSQL[i].id + '"] .edit-input').focus();
                break;
            }
        }
    }

    function editTask(index) {
        var taskSQL = taskList;
        var newTitle = '';

        for(var i = 0;i < taskSQL.length;i++) {
            if (taskSQL[i].id.toString() === index) {
                newTitle = document.querySelector('li[data-index="' + taskSQL[i].id + '"] .edit-input').value;
                // newTitle = $('li[data-index="' + taskSQL[i].id + '"] .edit-input]')._$val();
                if(newTitle){
                    taskSQL[i].title = newTitle;
                    // saveTask(taskSQL);
                    _j._$request(
                        'http://10.1.0.121:8080/change_item_content.do',{
                            type: 'json',
                            mode: 0,
                            data: JSON.stringify({ id: Number(index), newContent: newTitle}),
                            headers:{'Content-Type':'application/json'},
                            method: 'post',
                            onload:function(_result){
                                $('#list ul')._$remove();
                                readTask();
                            },
                            onerror:function(_error){
                                // TODO
                            }
                        }
                    );
                }else{
                    deleteTask(index);
                }
            }
        }
    }

    // 待办计数器
    function counter(taskSQL){
        var counter = 0;
        for(var i = 0;i < taskSQL.length;i++){
            if(!taskSQL[i].done){
                counter++;
            }
        }
        $('#counter')._$text(counter);
    }

    // ALL
    function all(){
        var taskSQL = taskList;
        for(var i = 0;i < taskSQL.length;i++){
            $('li[data-index="' + taskSQL[i].id + '"]')._$replaceClassName('hide','show');
        }
        $('#all-btn')._$addClassName('active');
        $('#active-btn')._$replaceClassName('active','');
        $('#completed-btn')._$replaceClassName('active','');
    }

    // 只看Active
    function onlyActive() {
        var taskSQL = taskList;
        for(var i = 0;i < taskSQL.length;i++){
            if(!taskSQL[i].done){
                $('li[data-index="' + taskSQL[i].id + '"]')._$replaceClassName('hide','show');
            }else{
                $('li[data-index="' + taskSQL[i].id + '"]')._$replaceClassName('show','hide');
            }
        }
        $('#active-btn')._$addClassName('active');
        $('#all-btn')._$replaceClassName('active','');
        $('#completed-btn')._$replaceClassName('active','');
    }

    // 只看Active
    function onlyCompleted() {
        var taskSQL = taskList;
        for(var i = 0;i < taskSQL.length;i++){
            if(taskSQL[i].done){
                $('li[data-index="' + taskSQL[i].id + '"]')._$replaceClassName('hide','show');
            }else{
                $('li[data-index="' + taskSQL[i].id + '"]')._$replaceClassName('show','hide');
            }
        }
        $('#completed-btn')._$addClassName('active');
        $('#active-btn')._$replaceClassName('active','');
        $('#all-btn')._$replaceClassName('active','');
    }

});