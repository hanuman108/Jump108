package $jump.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.authorize.sim.Fingerprint;

import org.springframework.web.servlet.mvc.multiaction.MultiActionController;

import $jump.dao.DashboardDao;
import $jump.domain.Intent;
import $jump.domain.User;
import $jump.util.Util;

public class DashboardController extends MultiActionController{

	private DashboardDao dashboardDao;
	
	public void setDashboardDao(DashboardDao dashboardDao) {
		this.dashboardDao = dashboardDao;
	}

	public void loadUser(HttpServletRequest request, HttpServletResponse response) throws Exception{
		Long id = Util.getParameterLong(request, "id");
		User user = dashboardDao.getUserById(id);
		Set<Object> localData = dashboardDao.getSuggestedUsers(id);
		Map<String, Object> data = new HashMap<String,Object>();

		data.put("user", user);
		data.put("suggestions", localData);
		
		Util.sendToFrontEnd(data, response);
	}

	public void loadSuggestedUsers(HttpServletRequest request, HttpServletResponse response) throws Exception{
		Long id = Util.getParameterLong(request, "id");
		Set<Object> data = dashboardDao.getSuggestedUsers(id);
		Util.sendToFrontEnd(data, response);
	}
	
	public void saveIntent(HttpServletRequest request, HttpServletResponse response) throws Exception{
		Map<String,Object> data = new HashMap<String,Object>();
		Long id = Util.getParameterLong(request, "userId");
		
		User user = dashboardDao.findById(id);
		String description = request.getParameter("description");
		String category = request.getParameter("category");
		String type = request.getParameter("type");
		
		user.setIntentions(null);
		Intent intent = new Intent();	
		intent.setId(new Long(0));
		intent.setDescription(description);
		intent.setCategory(category);
		intent.setType(type);		
		intent.setUser(user);
		intent.setStatus("Open");
		intent.setCrDate(new Date());
		
		dashboardDao.setModel(intent);
		dashboardDao.save();
		
		data.put("data", intent);
		
		// Send success response
		Util.sendToFrontEnd(data, response);
	}
	
	public void deleteIntent(HttpServletRequest request, HttpServletResponse response) throws Exception{
		Map<String,Object> data = new HashMap<String,Object>();
		
		Long id = Util.getParameterLong(request, "id");
		Intent intent = dashboardDao.getIntentById(id);
		
		dashboardDao.deleteIntent(intent);
		
		data.put("status", "Success");
		Util.sendToFrontEnd(data, response);
	}
	
	public void updateStatus(HttpServletRequest request, HttpServletResponse response) throws Exception{
		Map<String,Object> data = new HashMap<String,Object>();
		
		Long id = Util.getParameterLong(request, "id");
		Intent intent = dashboardDao.getIntentById(id);
		
		intent.setStatus("Complete");
		dashboardDao.saveIntent(intent);
		
		data.put("status", "Success");
		data.put("data", intent);
		Util.sendToFrontEnd(data, response);
	}
	
	// Payments test for Auth.net -- WedBuddy
	public void testPayments(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		String apiLoginId = "2UD2m3zkZ";
	    String transactionKey = "296pd6aHCra557KF";
	    String relayResponseUrl = "http://localhost:8888";

	    String amount = "1.99";
	    Fingerprint fingerprint = Fingerprint.createFingerprint(
	        apiLoginId,
	        transactionKey,
	        1234567890,  // random sequence used for creating the finger print
	        amount);

	    long x_fp_sequence = fingerprint.getSequence();
	    long x_fp_timestamp = fingerprint.getTimeStamp();
	    String x_fp_hash = fingerprint.getFingerprintHash();
    
		HashMap<String, Object> data = new HashMap<String, Object>();
		
		data.put("x_fp_sequence", x_fp_sequence);
		data.put("x_fp_hash", x_fp_hash);
		data.put("x_fp_timestamp", x_fp_timestamp);
		data.put("relayResponseUrl", relayResponseUrl);
		data.put("apiLoginId", apiLoginId);
			
		Util.sendToFrontEnd(data, response);
		
	}
	
}
