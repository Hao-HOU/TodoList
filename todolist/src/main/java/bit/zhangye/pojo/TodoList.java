package bit.zhangye.pojo;

import java.util.Date;

public class TodoList {
    private Integer id;

    private String listContent;

    private Integer done;

    private Date createTime;

    private Date updateTime;

    public TodoList(Integer id, String listContent, Integer done, Date createTime, Date updateTime) {
        this.id = id;
        this.listContent = listContent;
        this.done = done;
        this.createTime = createTime;
        this.updateTime = updateTime;
    }

    public TodoList() {
        super();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getListContent() {
        return listContent;
    }

    public void setListContent(String listContent) {
        this.listContent = listContent == null ? null : listContent.trim();
    }

    public Integer getDone() {
        return done;
    }

    public void setDone(Integer done) {
        this.done = done;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }
}