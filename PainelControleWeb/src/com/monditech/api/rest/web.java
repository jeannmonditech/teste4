package com.monditech.api.rest;
import javax.ejb.LocalBean;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import com.monditech.api.classes.Retorno;
@LocalBean
@Path("/")
public class web {
	@GET
	@Path("/GetTeste")
	public Response GetTeste() throws Exception {

		return Retorno.Sucesso("OK");
		
	}
}
