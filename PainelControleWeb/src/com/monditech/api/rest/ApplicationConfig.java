package com.monditech.api.rest;

import java.util.Set;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;

@ApplicationPath("api/rest")
public class ApplicationConfig extends Application {

	@Override
	public Set<Class<?>> getClasses() {

		return null;
		
	}
		
}