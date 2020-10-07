package com.monditech.api.rest;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import javax.ejb.LocalBean;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.monditech.api.classes.Retorno;
import com.monditech.utils.SQL;
import com.monditech.utils.Util;

@LocalBean
@Path("/Zoom")
public class Zoom extends Retorno {
	
	@Produces(MediaType.APPLICATION_JSON)
	@GET
	@Path("/GetTesteZoom")
	public Response GetTeste() {

		return Retorno.Sucesso("ZOOM OK!");

	}
	
	
	@Produces(MediaType.APPLICATION_JSON)
	@GET
	@Path("/ZoomPessoa")
	public List<Object> ZoomUsuarios(@QueryParam("search") String search,
			@QueryParam("pagina") int pagina,
			@QueryParam("qtdPagina") int qtdPagina) throws Exception {

		SQL sql = null;
		String query = "";
		try {

			query = "SELECT Matricula, Nome FROM pessoa "
					+ (search != null && !search.isEmpty() ? 
					" WHERE UPPER(Nome) LIKE '%" + search
					+ "%' OR Matricula LIKE '%" + search
					+ "%' \r\n " : "")
					+ " ORDER BY Nome ";
					/*+ " LIMIT "
					+ (pagina == 1 ? qtdPagina
							: (((pagina * qtdPagina) - qtdPagina)) + ","
									+ qtdPagina);*/
			System.out.println("QUERY PAINEL DE CONTROLE " + query);
			sql = new SQL();
			List<Object> lista;
			ResultSet resultSet = sql.Select(query);
			try {
				
				Util util = new Util();
				return util.ResultSetToArrayList(resultSet);
				
			} catch (Exception e) {
				System.out.println("Erro catch " + e);
			} finally {
				
				resultSet.close();
			}

		} catch (Exception ex) {

			System.out.println("ERRRO Zoom usuarios " + ex.getMessage() + " - " + query);
			ex.printStackTrace();
			return null;

		} finally {
			if (sql != null) {
				try {
					sql.Close();
				} catch (Exception ex) {
					;
				}
				sql = null;
			}
		}
		return null;
	}
	
}
