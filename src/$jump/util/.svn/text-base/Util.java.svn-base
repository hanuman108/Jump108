package $jump.util;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import main.java.com.google.gson.Gson;

public class Util {

	public static void sendToFrontEnd(Object data, HttpServletResponse response){
		
		Gson gson = new Gson();
		try {
			String newData = gson.toJson(data);
	        PrintWriter out;
			out = response.getWriter();
			out.println(newData);//for ajax calls
			out.flush();
	        out.close();
		} catch (IOException e) {
			//logger.error(" got an ERROR");
			e.printStackTrace();
		}
	}
	
	public static Long getParameterLong(HttpServletRequest request, String name){
		if(request.getParameter(name)!=null && !request.getParameter(name).equals("")){
			Long vl = new Long(request.getParameter(name));
			return vl;
		}
		return new Long(0);
	}
}

