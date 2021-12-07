package com.ffhs.model;

import java.util.Objects;


/**
 * Data class for Player
 */
public class PlayerDto {

    private String guid;

    private String tag;

    private boolean archived;

    /**
     * @return String returns the guid
     */
    public String getGuid() {
        return this.guid;
    }

    /**
     * @return String returns the tag
     */
    public String getTag() {
        return this.tag;
    }

    /**
     * Sets the guid
     * @param guid String
     */
    public void setGuid(String guid) {
        this.guid = guid;
    }

    /**
     * Sets the tag
     * @param tag String
     */
    public void setTag(String tag) {
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

    /**
     * overrides equals method for sorting
     * @param o PlayerDto object
     * @return boolean
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PlayerDto playerDto = (PlayerDto) o;
        return guid.equals(playerDto.guid);
    }

    /**
     * Override for hashCode
     * @return int hashCode
     */
    @Override
    public int hashCode() {
        return Objects.hash(guid);
    }
}
