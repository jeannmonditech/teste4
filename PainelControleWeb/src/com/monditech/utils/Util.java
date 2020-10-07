package com.monditech.utils;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;

public class Util {
	
	
	public List<Object> ResultSetToArrayList(ResultSet rs) throws SQLException {
		
		  ResultSetMetaData md = rs.getMetaData();
		  int columns = md.getColumnCount();
		  String data = "";
		  int dia = 0;
		  int mes = 0;
		  int ano = 0;
		  Calendar cal = Calendar.getInstance();
		  
		  ArrayList<Object> list = new ArrayList<Object>();
		  
		  while (rs.next()) {
			  
		     HashMap<Object, Object> row = new HashMap<Object, Object>(columns);
		     
		     for (int i = 1; i <= columns; i++) {

				if (md.getColumnType(i) != java.sql.Types.DATE && md.getColumnType(i) != java.sql.Types.TIMESTAMP) {

					row.put(md.getColumnLabel(i), rs.getObject(i));

				} 
				else {
					
					if (rs.getDate(i) != null) {
						
						cal.setTime(rs.getDate(i));
						dia = cal.get(Calendar.DAY_OF_MONTH);
						mes = cal.get(Calendar.MONTH);
						ano = cal.get(Calendar.YEAR);
						data = ((dia < 10 ? "0" : "") + dia) + "/"
								+ ((mes < 10 ? "0" : "") + mes) + "/"
								+ ((ano < 10 ? "0" : "") + ano);					
						
					}
					else {
						
						data = null;
						
					}
	
					row.put(md.getColumnLabel(i), data);

				}
					
		     }
		     
		     list.add(row);
		      
		  }

		 return list;
		 
	}
}
