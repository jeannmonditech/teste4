package com.monditech.utils;

import java.sql.Connection;
import java.sql.Date;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.sql.DataSource;

import java.sql.PreparedStatement;

public class SQL {
	
	private Connection conexao;
	private PreparedStatement chamada;
	private int posicaoAutomatica = 1;
	
	public Connection getConexao() {
		
		return conexao;
		
	}

	public SQL() throws Exception {
		
		Context initContext = new InitialContext();
		DataSource dataSource = (DataSource) initContext.lookup("jdbc/Custom");
		conexao = dataSource.getConnection();
		conexao.setAutoCommit(false);
		
		
				
	}
	
	public void PrepararQuery(String query) throws SQLException {
		
		posicaoAutomatica = 1;
		chamada = conexao.prepareStatement(query, Statement.RETURN_GENERATED_KEYS);
		
	}
		
	public void SetParametro(Date date) throws SQLException {
		
		@SuppressWarnings("deprecation")
		Date dataSQL = new Date(date.getYear(), date.getMonth(), date.getDate()); 
		
		chamada.setDate(posicaoAutomatica, dataSQL);
		posicaoAutomatica++;
		
	}

	public void SetParametro(String valor) throws SQLException {
		
		chamada.setString(posicaoAutomatica, valor);
		posicaoAutomatica++;
		
	}
	
	public void SetParametro(int valor) throws SQLException {
		
		chamada.setInt(posicaoAutomatica, valor);
		posicaoAutomatica++;
		
	}
	
	public void SetParametro(Boolean valor) throws SQLException {
		
		chamada.setBoolean(posicaoAutomatica, valor);
		posicaoAutomatica++;
		
	}
	
	public void SetParametro(Float valor) throws SQLException {
		
		chamada.setFloat(posicaoAutomatica, valor);
		posicaoAutomatica++;
		
	}
	
	public void SetParametro(int posicao, String valor) throws SQLException {
		
		chamada.setString(posicao, valor);
		
	}
	
	public void SetParametro(int posicao, int valor) throws SQLException {
		
		chamada.setInt(posicao, valor);
		
	}
	
	public void SetParametro(int posicao, Boolean valor) throws SQLException {
		
		chamada.setBoolean(posicao, valor);
		
	}
	
	public void SetParametro(int posicao, Float valor) throws SQLException {
		
		chamada.setFloat(posicao, valor);
		
	}

	public int InsertUpdate() throws SQLException {
		
		return chamada.executeUpdate();
		
	}
	
	public ResultSet GetKeys() throws SQLException {
		
		return chamada.getGeneratedKeys();
		
	}
	
	public ResultSet Select() throws SQLException {
		
		return chamada.executeQuery();
		
	}
	public ResultSet Select(String query) throws SQLException {
		
		return conexao.createStatement().executeQuery(query);
		
	}
	public void Commit() throws SQLException {
		
		conexao.commit();
		
	}
	
	public void Rollback() throws SQLException {
		
		conexao.rollback();
		
	}
	
	public void Close() throws SQLException {
		
		conexao.close();		
		
	}

	public static void main(String[] args) {
		System.out.println("getScheduling-teste-4444");
	}
	
}