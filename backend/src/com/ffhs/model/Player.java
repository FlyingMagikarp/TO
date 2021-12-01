package com.ffhs.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
public class Player {
    @Id
    private java.lang.String guid;

    private java.lang.String tag;

    private boolean archived;

    @ManyToMany(mappedBy = "players")
    @JsonBackReference
    public Set<Tournament> tournaments = new HashSet<>();

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

    public void setArchived(boolean archived){
        this.archived = archived;
    }

    public boolean getArchived(){
        return archived;
    }
}
