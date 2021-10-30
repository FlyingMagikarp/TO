package com.ffhs.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Player {
    @Id
    private String guid;

    private String tag;

    public String getGuid() {
        return this.guid;
    }

    public String getTag() {
        return this.tag;
    }

    public void setGuid(String guid) {
        this.guid = guid;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }
}
