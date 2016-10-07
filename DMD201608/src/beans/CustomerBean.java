package beans;

public class CustomerBean {
	
	private int seqnum;
	private String name;
	private String gender;
	private String cellphone;
	private String areacode;
	private String telephone;
	private String email;
	private String productname;
	private String date;
	private String time;
	private String campaigncode;
	private String mediasource;
	
	public CustomerBean() {
		this.seqnum = 0;
		this.name = "";
		this.gender = "";
		this.cellphone = "";
		this.areacode = "";
		this.telephone = "";
		this.email = "";
		this.productname = "";
		this.date = "";
		this.time = "";
		this.campaigncode = "";
		this.mediasource = "";
	}
	
	public int getSeqnum() {
		return seqnum;
	}
	public void setSeqnum(int seqnum) {
		this.seqnum = seqnum;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		if( name==null ){
			this.name = "";
		}else{
			this.name = name;
		}
	}
	
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		if( gender==null ){
			this.gender = "";
		}else{
			this.gender = gender;
		}
	}
	
	public String getCellphone() {
		return cellphone;
	}
	public void setCellphone(String cellphone) {
		if( cellphone==null ){
			this.cellphone = "";
		}else{
			this.cellphone = cellphone;	
		}
	}
	
	public String getAreacode() {
		return areacode;
	}
	public void setAreacode(String areacode) {
		if( areacode==null ){
			this.areacode = "";
		}else{
			this.areacode = areacode;	
		}
	}
	
	public String getTelephone() {
		return telephone;
	}
	public void setTelephone(String telephone) {
		if( telephone==null ){
			this.telephone = "";
		}else{
			this.telephone = telephone;	
		}
	}
	
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		if( email==null ){
			this.email = "";
		}else{
			this.email = email;
		}
	}
	
	public String getProductname() {
		return productname;
	}
	public void setProductname(String productname) {
		if( productname==null ){
			this.productname = "";
		}else{
			this.productname = productname;
		}
	}
	
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		if( date==null ){
			this.date = "";
		}else{
			this.date = date;
		}
	}
	
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		if( time==null ){
			this.time = "";
		}else{
			this.time = time;
		}
	}
	
	public String getCampaigncode() {
		return campaigncode;
	}
	public void setCampaigncode(String campaigncode) {
		if( campaigncode==null ){
			this.campaigncode = "";
		}else{
			this.campaigncode = campaigncode;
		}
	}
	
	public String getMediasource() {
		return mediasource;
	}
	public void setMediasource(String mediasource) {
		if( mediasource==null ){
			this.mediasource = "";
		}else{
			this.mediasource = mediasource;
		}
	}
	
}
