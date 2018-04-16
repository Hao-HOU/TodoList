package bit.zhangye.dao;

import bit.zhangye.pojo.TodoList;

import java.util.List;

public interface TodoListMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(TodoList record);

    int insertSelective(TodoList record);

    TodoList selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(TodoList record);

    int updateByPrimaryKey(TodoList record);

    List<TodoList> selectAllItems();

    int deleteAllDone();
}