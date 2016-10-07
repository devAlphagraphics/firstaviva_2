package utils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.io.Writer;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.text.ParsePosition;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.apache.commons.io.FileUtils;

import beans.CustomerBean;

public class ReportUtils {

	private static final String FORMAT_CSV 			 = ".csv";
	private static final String FORMAT_TXT 			 = ".txt";
    private static final char DEFAULT_SEPARATOR 	 = ',';

    public static void writeLine(Writer w, List<String> values) throws IOException {
        writeLine(w, values, DEFAULT_SEPARATOR, ' ');
    }

    public static void writeLine(Writer w, List<String> values, char separators) throws IOException {
        writeLine(w, values, separators, ' ');
    }

    // https://tools.ietf.org/html/rfc4180
    private static String followCVSformat(String value) {

        String result = value;
        if (result.contains("\"")) {
            result = result.replace("\"", "\"\"");
        }
        return result;
    }

    public static void writeLine(Writer w, List<String> values, char separators, char customQuote) throws IOException {

        boolean first = true;

        // default customQuote is empty

        if (separators == ' ') {
            separators = DEFAULT_SEPARATOR;
        }

        StringBuilder sb = new StringBuilder();
        for (String value : values) {
            if (!first) {
                sb.append(separators);
            }
            if (customQuote == ' ') {
                sb.append(followCVSformat(value));
            } else {
                sb.append(customQuote).append(followCVSformat(value)).append(customQuote);
            }

            first = false;
        }
        sb.append("\n");
        w.append(sb.toString());
    }
    
    /**
     * 產生CSV格式報表
     * @param date：報表檔案日期
     * @param cmList：客戶資料列表
     */
    public static void genCsvReport(String date, List<CustomerBean> cmList, String folder) {

    	// CSV報表存放路徑
    	String csvFile = folder+"/" + date+FORMAT_CSV;
    	
    	FileOutputStream fileStream = null;
    	OutputStreamWriter writer = null;
		try {
			fileStream = new FileOutputStream(new File(csvFile));
			writer = new OutputStreamWriter(fileStream, StandardCharsets.UTF_8);
			writer.write('\uFEFF'); // BOM for UTF-*

			// 欄位名稱
			ReportUtils.writeLine(writer, Arrays.asList("欄位名稱", "名單序號", "姓名", "性別", "手機", "有興趣產品", "留單日期", "留單時間", "媒體來源代號", "email"));
			// 報表資料寫入
			for( CustomerBean bean: cmList ) {
				try {
					ReportUtils.writeLine(writer, Arrays.asList(" ", String.valueOf(bean.getSeqnum()), bean.getName(), bean.getGender(), bean.getCellphone(), 
										 						bean.getProductname(), bean.getDate(), bean.getTime(), bean.getMediasource(), bean.getEmail())
										 );
					
				} catch(Exception e) {
					e.printStackTrace();
				}
			}
	        writer.flush();
	        writer.close();
	        fileStream.close();
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			
		} finally {
	        try {
	        	if( writer!=null ) 
	        		writer.close();
	        	if( fileStream!=null )
	        		fileStream.close();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
    }
    
    /**
     * 產生Txt格式報表
     * @param date
     * @param cmList
     */
    public static void genTXTReport(String date, List<CustomerBean> cmList, String folder) {
    	// TXT報表存放路徑
    	String txtFile = folder+"/" + date+FORMAT_TXT;
    	
		try {
			List<String> lines = new ArrayList<String>();
			// 欄位名稱
			lines.add("姓名,性別,手機,住家電話區碼,住家電話,有興趣商品,名單序號,電子信箱");
			// 報表資料寫入
			for( CustomerBean bean: cmList ) {
				String data = bean.getName() +","+ bean.getGender() +","+ bean.getCellphone() +","+ bean.getAreacode() +","+ bean.getTelephone() 
							+","+ bean.getProductname() +","+ bean.getSeqnum() +","+ bean.getEmail();
				// 去除空白
				data = data.replace(" ", "");

				lines.add(data);
			}
			FileUtils.writeLines(new File(txtFile), "big5", lines, "\r\n");
			
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    }

    /**
     * 轉換Date日期格式成想要的String樣式
     * @param date
     * @param dateFormat
     * @return
     */
    public static String getDateFormat(Date date, String dateFormat) {
    	try {
    		SimpleDateFormat formatter = new SimpleDateFormat(dateFormat);
    		String str = "";
    		if (date != null) {
    			str = formatter.format(date);
    		}
    		return str;
        } catch (Exception e) {
        	e.printStackTrace();
        	return "DATA_ERROR";
		}
    }

	/**
	 * 轉換String格式成想要的Date格式
	 * @param dateStr
	 * @param format
	 * @return
	 */
	public static Date getFullDate(String dateStr, String format) {
        SimpleDateFormat formatter = new SimpleDateFormat(format);
        try {
        	return formatter.parse(dateStr, new ParsePosition(0));
        } catch (Exception e) {
			System.out.println("[genReport] Date Exception >> date: "+ dateStr +", Error: "+ e.toString());
        	e.printStackTrace();
        	return null;
		}
	}
}
