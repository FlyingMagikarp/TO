package com.ffhs.model;


/**
 * Data class for PlayerRankings
 */
public class PlayerRanking implements Comparable<PlayerRanking>{
    private int score;
    private Player player;

    /**
     * @param score int ranking score
     * @param player Player model object
     */
    public PlayerRanking(int score, Player player) {
        this.score = score;
        this.player = player;
    }

    /**
     * @return int returns the score
     */
    public int getScore() {
        return score;
    }

    /**
     * Sets the score
     * @param score int
     */
    public void setScore(int score) {
        this.score = score;
    }

    /**
     * @return Player returns the player
     */
    public Player getPlayer() {
        return player;
    }

    /**
     * Sets the player
     * @param player Player model object
     */
    public void setPlayer(Player player) {
        this.player = player;
    }

    /**
     * used to sort rankings
     * @param pr PlayerRanking
     * @return int difference
     */
    public int compareTo(PlayerRanking pr){
        return this.score - pr.getScore();
    }
}
