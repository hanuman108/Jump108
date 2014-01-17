package $jump.domain;

import org.joda.time.DateTime;

public abstract class Model implements Comparable {

	private Long id;
	private int version;
	private DateTime modDt; 
	private String modBy;
	 
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public int getVersion() {
		return version;
	}

	public void setVersion(int version) {
		this.version = version;
	}

	public DateTime getModDt() {
		return modDt;
	}

	public void setModDt(DateTime modDt) {
		this.modDt = modDt;
	}

	public String getModBy() {
		if(modBy==null) return "";
		return modBy;
	}

	public void setModBy(String modBy) {
		this.modBy = modBy;
	}

	//for ordering
	public int compareTo(Object o) {
		Model o1 = (Model)o;
		return this.getId().compareTo(o1.getId());
	}
}

