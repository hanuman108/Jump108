package $jump.domain;

import java.io.Serializable;
import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

import $jump.domain.Intent;

public class User extends Model implements Serializable {

	private static final long serialVersionUID = 762260137529997109L;
	
	private Long id;
	private String name;
	private Date dob;
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	private Set<Intent> intentions = new HashSet();
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public Date getDob() {
		return dob;
	}
	
	public void setDob(Date dob) {
		this.dob = dob;
	}
	
	public Set<Intent> getIntentions() {
		return intentions;
	}
	public void setIntentions(Set<Intent> intentions) {
		this.intentions = intentions;
	}
}
