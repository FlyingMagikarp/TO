package com.ffhs.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * Entity class for Player
 */
@Entity
public class Player {
    @Id
    private java.lang.String guid;

    private java.lang.String tag;

    private boolean archived;

    /**
     * Set&lt;Tournament&gt; Relation link to tournament
     */
    @ManyToMany(mappedBy = "players")
    @JsonBackReference
    public Set<Tournament> tournaments = new HashSet<>();

    /**
     * @return String returns the guid
     */
    public java.lang.String getGuid() {
        return this.guid;
    }

    /**
     * @return String returns the tag
     */
    public java.lang.String getTag() {
        return this.tag;
    }

    /**
     * Sets the guid
     * @param guid String
     */
    public void setGuid(java.lang.String guid) {
        this.guid = guid;
    }

    /**
     * Sets the tag
     * @param tag String
     */
    public void setTag(java.lang.String tag) {
        this.tag = tag;
    }

    /**
     * Sets the archived flag
     * @param archived boolean
     */
    public void setArchived(boolean archived){
        this.archived = archived;
    }

    /**
     * @return boolean returns the archived flag
     */
    public boolean getArchived(){
        return archived;
    }
}
