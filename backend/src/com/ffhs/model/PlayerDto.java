package com.ffhs.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;


public class PlayerDto {

    private String guid;

    private String tag;

    private boolean archived;

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

    public void setArchived(boolean archived){
        this.archived = archived;
    }

    public boolean getArchived(){
        return archived;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PlayerDto playerDto = (PlayerDto) o;
        return guid.equals(playerDto.guid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(guid);
    }
}