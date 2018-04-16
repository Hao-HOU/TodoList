package bit.zhangye.service.impl;

import bit.zhangye.common.Const;
import bit.zhangye.common.ServerResponse;
import bit.zhangye.dao.TodoListMapper;
import bit.zhangye.pojo.TodoList;
import bit.zhangye.service.IManageTodoListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ManageTodoListServiceImpl implements IManageTodoListService {
    @Autowired
    TodoListMapper todoListMapper;

    public ServerResponse addItem(String item) {
        TodoList todoList = new TodoList();
        todoList.setListContent(item);
        todoList.setDone(Const.ItemStatus.NOT_DONE);

        if (todoListMapper.insert(todoList) > 0) {
            return ServerResponse.createBySuccessMessage("新增待办事项成功");
        } else {
            return ServerResponse.createByErrorMessage("新增待办事项失败");
        }
    }

    public ServerResponse changeItem(int id, String newContent) {
        TodoList todoList = new TodoList();
        todoList.setListContent(newContent);
        todoList.setId(id);

        if (todoListMapper.updateByPrimaryKeySelective(todoList) > 0) {
            return ServerResponse.createBySuccessMessage("修改待办事项成功");
        } else {
            return ServerResponse.createByErrorMessage("修改待办事项失败");
        }
    }

    public ServerResponse changeItemStatus(int id, int done) {
        TodoList todoList = new TodoList();
        todoList.setId(id);
        todoList.setDone(done);

        if (todoListMapper.updateByPrimaryKeySelective(todoList) > 0) {
            return ServerResponse.createBySuccessMessage("更改事项状态成功");
        } else {
            return ServerResponse.createByErrorMessage("更改事项状态失败");
        }
    }

    public ServerResponse deleteItem(int id) {
        if (todoListMapper.deleteByPrimaryKey(id) > 0) {
            return ServerResponse.createBySuccessMessage("删除事项成功");
        } else {
            return ServerResponse.createByErrorMessage("删除事项失败");
        }
    }

    public ServerResponse getAllItems() {
        List<TodoList> todos = todoListMapper.selectAllItems();
        if (todos.isEmpty()) {
            return ServerResponse.createByErrorMessage("暂无待办事项");
        } else {
            return ServerResponse.createBySuccess("获取待办事项成功", todos);
        }
    }

    public ServerResponse deleteAllDone() {
        if (todoListMapper.deleteAllDone() > 0) {
            return ServerResponse.createBySuccessMessage("删除已完成事项成功");
        } else {
            return ServerResponse.createByErrorMessage("无已完成事项可删除");
        }
    }
}
