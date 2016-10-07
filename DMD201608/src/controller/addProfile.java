package controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.Date;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

public class addProfile extends HttpServlet {

	private static final long serialVersionUID = 1L;
	
	private static final String JNDI 		= "java:comp/env/jdbc/firstaviva";
	
//	private final String MEDIA_SOURCE 		= "ABCDEF123456";
	private final String CAMPAIGN_CODE 		= "DMDDMD";
	private final String SUCCESS 			= "{\"code\":\"success\", \"msg\":\"success\", \"result\":[]}";
	private final String ERROR 				= "{\"code\":\"error\", \"msg\":\"error\", \"result\":[]}";
//	private final String PARAMETER 			= "{\"code\":\"param_error\", \"msg\":\"param_error\", \"result\":[]}";
	
	/**
    * @see HttpServlet#HttpServlet()
    */
	public addProfile() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// response JSON
		response.setContentType("application/json");
		response.setStatus(HttpServletResponse.SC_OK);
		PrintWriter out = response.getWriter();
		out.print(SUCCESS);
		out.flush();
		out.close();
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 * 新增客戶基本資料
	 * @param name:姓名
	 * @param gender：性別
	 * @param cellphone：手機號碼
	 * @param areacode:區碼
	 * @param telephone：市話
	 * @param email
	 * @param productname：產品名稱
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String name = request.getParameter("userdata[name]");
		String gender = request.getParameter("userdata[gender]");
		String cellphone = request.getParameter("userdata[cellphone]");
		String areacode = request.getParameter("userdata[areacode]");
		String telephone = request.getParameter("userdata[telephone]");
		String email = request.getParameter("userdata[email]");
		String mediasource = request.getParameter("userdata[source]");
		String productname = request.getParameter("userdata[productname]");
		if( productname.equals("") )
			productname = null;
		
		
		Context ctx = null;
		Connection con = null;
		Statement stmt = null;

		response.setContentType("application/json");
		response.setStatus(HttpServletResponse.SC_OK);
		PrintWriter out = response.getWriter();
		
		try {
			// init db get JNDI
			ctx = new InitialContext();
			DataSource ds = (DataSource) ctx.lookup(JNDI);
			if( ds != null ) {
				con = ds.getConnection();
		    } else {
		        log("Failed to lookup datasource.");
		    }


			PreparedStatement pstmt = 
					con.prepareStatement("INSERT INTO CUSTOMER (NAME, GENDER, CELLPHONE, AREACODE, TELEPHONE, EMAIL, PRODUCTNAME, CAMPAIGNCODE, DATE, MEDIASOURCE) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ? )");
			pstmt.setString( 1, name);
			pstmt.setString( 2, gender); 
			pstmt.setString( 3, cellphone);
			pstmt.setString( 4, areacode);
			pstmt.setString( 5, telephone);
			pstmt.setString( 6, email);
			pstmt.setString( 7, productname);
			pstmt.setString( 8, CAMPAIGN_CODE);
			java.sql.Date sqlDate = new java.sql.Date( new Date().getTime() );
			pstmt.setTimestamp( 9, new Timestamp(sqlDate.getTime()));
			pstmt.setString( 10, mediasource);
			
			pstmt.executeUpdate();

			// set JSON result
			out.print(SUCCESS);
					
		} catch (NamingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			log("");
			// set JSON result
			out.print(ERROR);
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			// set JSON result
			out.print(ERROR);
			
		} finally {
			try {
				if( stmt!=null )
					stmt.close();
				if( con!=null )
					con.close();
				if( ctx!=null )
					ctx.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				// set JSON result
				out.print(ERROR);
			} catch (NamingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				// set JSON result
				out.print(ERROR);
			}
		}

		// response JSON
		out.flush();
	}

}
