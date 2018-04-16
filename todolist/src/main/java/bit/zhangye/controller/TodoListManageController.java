package bit.zhangye.controller;

import bit.zhangye.common.ResponseCode;
import bit.zhangye.common.ServerResponse;
import bit.zhangye.service.IManageTodoListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Map;

@Controller
public class TodoListManageController {
    @Autowired
    IManageTodoListService iManageTodoListService;

    @RequestMapping("add_item.do")
    @ResponseBody
    public ServerResponse addItem(@RequestBody Map<String, Object> map) {
        if (map.get("listContent") == null) {
            return ServerResponse.createByErrorCodeMessage(ResponseCode.ILLEGAL_ARGUMENT.getCode(),
                    "参数错误");
        }

        String listContent = map.get("listContent").toString();
        return iManageTodoListService.addItem(listContent);
    }

    @RequestMapping("change_item_content.do")
    @ResponseBody
    public ServerResponse changeItemContent(@RequestBody Map<String, Object> map) {
        if (map.get("newContent") == null || map.get("id") == null) {
            return ServerResponse.createByErrorCodeMessage(ResponseCode.ILLEGAL_ARGUMENT.getCode(),
                    "参数错误");
        }

        int id = (int) map.get("id");
        String newContent = map.get("newContent").toString();

        return iManageTodoListService.changeItem(id, newContent);
    }

    @RequestMapping("change_item_status.do")
    @ResponseBody
    public ServerResponse changeItemStatus(@RequestBody Map<String, Object> map) {
        if (map.get("id") == null || map.get("done") == null) {
            return ServerResponse.createByErrorCodeMessage(ResponseCode.ILLEGAL_ARGUMENT.getCode(),
                    "参数错误");
        }

        int id = (int) map.get("id");
        int done = (int) map.get("done");

        return iManageTodoListService.changeItemStatus(id, done);
    }

    @RequestMapping("delete_item.do")
    @ResponseBody
    public ServerResponse deleteItem(@RequestBody Map<String, Object> map) {
        if (map.get("id") == null) {
            return ServerResponse.createByErrorCodeMessage(ResponseCode.ILLEGAL_ARGUMENT.getCode(),
                    "参数错误");
        }

        int id = (int) map.get("id");

        return iManageTodoListService.deleteItem(id);
    }

    @RequestMapping("get_all_items.do")
    @ResponseBody
    public ServerResponse getAllItems() {
        return iManageTodoListService.getAllItems();
    }

    @RequestMapping("delete_all_done.do")
    @ResponseBody
    public ServerResponse deleteAllDone() {
        return iManageTodoListService.deleteAllDone();
    }
}
