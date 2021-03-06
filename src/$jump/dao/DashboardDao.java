package $jump.dao;

import $jump.domain.Intent;
import $jump.domain.User;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

public class DashboardDao extends ModelDao {

	// Simple select
	public User findById(Long id){
		User user = new User();
		
		@SuppressWarnings("unchecked")
		List<User> list = getHibernateTemplate().find("from User user where user.id="+id);
		if(!list.isEmpty()){
			user = (User)list.get(0);
			return user;
		}
		
		return null;
	}
	
	public User getUserById(Long id){
		User user = new User();
		
		@SuppressWarnings("unchecked")
		List<User> list = getHibernateTemplate().find("from User user left join fetch user.intentions where user.id="+id);
		if(!list.isEmpty()){
			user = (User)list.get(0);
		}
		
		user.setIntentions(new TreeSet<Intent>(user.getIntentions()));
		return user;
	}
	

	@SuppressWarnings("rawtypes")
	public Set<Object> getSuggestedUsers(Long id){
        
		@SuppressWarnings("unchecked")
		Set<Object> allIntent  = new LinkedHashSet();
		
		// 1) If user has no intent for a particular category
		// 2) Where is this user focusing most of its intent?
		// TODO: Add other rules
		
		@SuppressWarnings("unchecked")
		List<Intent> list = getHibernateTemplate().find("from Intent intent");
		
		for (Intent localIntent: list) {
	
			User user = findById(localIntent.getUser().getId());			
			user.setIntentions(null);
			localIntent.setUser(user);
			allIntent.add(localIntent);
			
		}
		
		return allIntent;
	}
	
	
	public Intent getIntentById(Long id){
		Intent intent = new Intent();
		
		@SuppressWarnings("unchecked")
		List<Intent> list = getHibernateTemplate().find("from Intent intent where intent.id="+id);
		if(!list.isEmpty()){
			intent = (Intent)list.get(0);
			return intent;
		}
		
		return null;
	}
	
	public void saveIntent(Intent intent){
		getHibernateTemplate().saveOrUpdate(intent);
	}
	
	public void deleteIntent(Intent intent){
		getHibernateTemplate().delete(intent);
	}
}
