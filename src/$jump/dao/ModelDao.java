package $jump.dao;

import $jump.domain.Model;

import org.springframework.orm.hibernate3.support.HibernateDaoSupport;

public class ModelDao extends HibernateDaoSupport {
	
	Model model; 
		
	public ModelDao(Model m){
		setModel(m);
	}
	
	public ModelDao() {
	
	}

	public void setModel(Model m){
		this.model = m;
	}
	
	public void save(){
		getHibernateTemplate().saveOrUpdate(model);
	}
	
}
