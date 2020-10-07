package com.monditech.api.classes;

import javax.ws.rs.core.Response;

public class Retorno {

	public static Response Erro (Exception ex) {
		
		return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(ex.getMessage()).build();
		
	}
	
	public static Response Sucesso (Object object) {
		
		return Response.status(Response.Status.OK).entity(object).build();
		
	}
	
}
