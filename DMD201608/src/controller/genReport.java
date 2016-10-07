package controller;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.sql.DataSource;

import beans.CustomerBean;
import utils.ReportUtils;

public class genReport extends HttpServlet {

	private static final long serialVersionUID = 1L;

	private static final String JNDI 		= "java:comp/env/jdbc/firstaviva";
	
	
	/**
    * @see HttpServlet#HttpServlet()
    */
	public genReport() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	@SuppressWarnings("deprecation")
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		try {
			// 帶入yyyy-MM-dd HH:mm:ss為撈取報表的開始時間
			String starttime = request.getParameter("date");
			System.out.println("[genReport] date: "+starttime);
			
			// 被撈的當下為撈取報表的結束時間
			Date endtime = new Date();
			// 報表檔名:yyyy-MM-dd
			String reportDate = ReportUtils.getDateFormat(endtime, "yyyy-MM-dd");
			
			List<CustomerBean> cmList = new ArrayList<CustomerBean>();
			Context ctx = null;
			Connection con = null;
			Statement stmt = null;
			ResultSet rs = null;

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
						con.prepareStatement("SELECT * FROM CUSTOMER WHERE DATE >= ? AND DATE < ?");
				

				java.sql.Date startSqlDate = new java.sql.Date( ReportUtils.getFullDate(starttime, "yyyy-MM-dd HH:mm:ss").getTime() );
				pstmt.setDate( 1, startSqlDate);
				java.sql.Date endSqlDate = new java.sql.Date(endtime.getTime());
				pstmt.setDate( 2, endSqlDate); 

//				System.out.println("SQL: SELECT * FROM CUSTOMER WHERE DATE >= '"+ starttime +"' AND DATE < '"+ReportUtils.getDateFormat(endtime, "yyyy-MM-dd HH:mm:ss")+"';");
				rs = pstmt.executeQuery();
				
				// 將從DB撈出的資料整理，待後續產CSV檔使用
				while( rs.next() ) {
					try {
						// 將DB java.sql.timestamp格式轉成java.util.Date格式
						Date date = new Date();
						date.setTime(rs.getTimestamp("date").getTime());
						// 將時間拆解成 年月日＆時分秒
						String dateStr = ReportUtils.getDateFormat(date, "yyyy-MM-dd");
						String timeStr = ReportUtils.getDateFormat(date, "HH:mm:ss");

						CustomerBean bean = new CustomerBean();
						bean.setSeqnum(rs.getInt("recordid"));
						bean.setName(rs.getString("name"));
						bean.setGender(rs.getString("gender"));
						bean.setCellphone(rs.getString("cellphone"));
						bean.setAreacode(rs.getString("areacode"));
						bean.setTelephone(rs.getString("telephone"));
						bean.setEmail(rs.getString("email"));
						bean.setProductname(rs.getString("productname"));
						bean.setDate(dateStr);
						bean.setTime(timeStr);
						bean.setMediasource(rs.getString("mediasource"));
						
						cmList.add(bean);
						
					} catch(Exception e) {
						e.printStackTrace();
					}
	            }

				// 產生CSV格式報表
				String csv_folder = request.getRealPath("/WEB-INF/csv_folder");
				ReportUtils.genCsvReport(reportDate, cmList, csv_folder);
				// 產生TXT格式報表
				String txt_folder = request.getRealPath("/WEB-INF/txt_folder");
				ReportUtils.genTXTReport(reportDate, cmList, txt_folder);
				
			} catch (NamingException e) {
				// TODO Auto-generated catch block
				System.out.println("[genReport] NamingException >> Error: "+e.toString());
				e.printStackTrace();
				
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				System.out.println("[genReport] SQLException >> Error: "+e.toString());
				e.printStackTrace();
				
			} catch (Exception e) {
				System.out.println("[genReport] Exception >> Error: "+e.toString());
				e.printStackTrace();
				
			} finally {
				try {
					if( rs!=null )
						rs.close();
					if( stmt!=null )
						stmt.close();
					if( con!=null )
						con.close();
					if( ctx!=null )
						ctx.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				} catch (NamingException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			
		} catch(Exception e) {
			
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
	}

}