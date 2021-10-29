package com.ffhs.controller;

import java.sql.*;

public class PlayerService {


    public ResultSet writeNewPlayerToDB(String tag){
        String guid = java.util.UUID.randomUUID().toString();
        try {
            Class.forName("com.mysql.jdbc.Driver");
            Connection con = DriverManager.getConnection(
                    "jdbc:mysql://localhost:3306/db_to", "root", "gibbiX12345");

            String query = "INSERT INTO t_player (player_guid, player_tag) VALUES (%s, %s);";

            Statement stmt = con.createStatement();
            ResultSet rs =  stmt.executeQuery(String.format(query, guid, tag));
            con.close();

            return rs;
        } catch (SQLException | ClassNotFoundException e) {
            e.printStackTrace();
        }
        return null;
    }

}
