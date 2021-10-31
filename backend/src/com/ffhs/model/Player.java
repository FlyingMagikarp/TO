package com.ffhs.model;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Player {
    @Id
    private java.lang.String guid;

    private java.lang.String tag;

    public java.lang.String getGuid() {
        return this.guid;
    }

    public java.lang.String getTag() {
        return this.tag;
    }

    public void setGuid(java.lang.String guid) {
        this.guid = guid;
    }

    public void setTag(java.lang.String tag) {
        this.tag = tag;
    }
}
