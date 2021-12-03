package com.ffhs.model;

public class PlayerRanking implements Comparable<PlayerRanking>{
    private int score;
    private Player player;

    public PlayerRanking(int score, Player player) {
        this.score = score;
        this.player = player;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }

    public int compareTo(PlayerRanking pr){
        return this.score - pr.getScore();
    }
}
