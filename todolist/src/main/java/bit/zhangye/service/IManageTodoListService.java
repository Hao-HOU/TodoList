package bit.zhangye.service;

import bit.zhangye.common.ServerResponse;

public interface IManageTodoListService {
    ServerResponse addItem(String item);
    ServerResponse changeItem(int id, String newContent);
    ServerResponse changeItemStatus(int id, int done);
    ServerResponse deleteItem(int id);
    ServerResponse getAllItems();
    ServerResponse deleteAllDone();
}
