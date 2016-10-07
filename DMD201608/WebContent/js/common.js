var pageName = getCurentPageName();
var hostName = getHostName();
isVersionCellphone();
var isMobile = (navigator.userAgent.match(/Android|iPhone|iPad/i) === null) ? false : true;
var headerHeight=122, footerHeight=72, contentMinHeight=588, popWinTextHeight=0;
var TestScore={'q1':[20,40,60,50],'q2':[10,20,40,40]};
var i=0, j=0;
var FormData={'name':'','gender':'','cellphone':'','areacode':'','telephone':'','email':'','tnc':0, 'productname':'','campaigncode':'','source':''};
var TestAns={'q1':0,'q2':0,'score':0};  //鍍金人生檢測結果 (q1 => 1=美式餐廳/2=ktv/3=豪宅/4=朋友家) (q2=)
var TryCal={'year':0,'sex':'','age':0,'quota':0,'result_pay_month':0,'result_pay_year':0};
var Today=new Date();

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

window.fbAsyncInit = function() {
    FB.init({
        appId      : '196683754079697',
        status     : true,
        cookie     : true,
        xfbml      : true,
        version    : 'v2.7' // use version 2.2
    });
};

// Load the SDK asynchronously
(function(d, s, id) {
var js, fjs = d.getElementsByTagName(s)[0];
if (d.getElementById(id)) {return;}
js = d.createElement(s); js.id = id;
js.src = "//connect.facebook.net/zh_TW/sdk.js";
fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function FBShareOp(img_url){
    var product_name   =    '金教授的鍍金人生大檢測';
    var description    =    '人生勝利組已經落伍，現在是「人生鍍金組」，五分鐘快速測驗你的鍍金指數，你敢挑戰這個超殘酷測驗嗎？';
    var share_image    =    img_url;
    var share_url      =    'https://'+hostName+'/DMD201608/';
    var share_capt     =    'first-aviva.com.tw';

    FB.ui({
        method: 'feed',
        name: product_name,
        link: share_url,
        picture: share_image,
        caption: share_capt,
        description: description
    });
}


$(function() {
   if (isMobile) {
       //window.location.href="mobile/";
   }
   if (GetIEVersion() > 0 && GetIEVersion()<10) { //Detect IE & IE Version
      alert('為了提供更好的瀏覽品質、使您攡有更好的用戶體驗，\r\n建議以IE 10以上版本，或其他瀏覽器(如：Chrome、FireFox)觀看！')
   }

   $('body').addClass(pageName);

    // Menu
   $('#Header #Menu li').on('click',function() {
	    var source = getParameterByName('source');
	    if(source !== "")
	    	window.location.href = '/DMD201608/' + $(this).data('link')+'.html?source='+source;
	    else
	    	window.location.href = '/DMD201608/' + $(this).data('link')+'.html';
   });

    // Pop Win
    popWinTextHeight=Math.ceil($('#Mask #Win_TnC').height()*0.85-$('#Mask #Win_TnC .title').height()-toNumber($('#Mask #Win_TnC .title').css('padding-top'))-toNumber($('#Mask #Win_TnC .title').css('padding-bottom')));
    $('#Mask .popWin .text').css('height',popWinTextHeight+'px');

    $('#Mask .popWin .bu_close').on('click',function() {
      popWinHandler('','hidden');
    });
   //================== for All Page
   /*
   if ((toNumber($(window).height())-headerHeight-footerHeight)<contentMinHeight) {  //Avoid browser height is too small
     $('#DivContent').css('min-height',(contentMinHeight+headerHeight+footerHeight)+'px');
   }
   */

   $('#Header #Menu .bu').each(function(){
      var link = $(this).data('link');
      var products = link.split("/");
      if($(this).hasClass('select')){
          $(this).removeClass('select');
      }

      if(products[0] == 'DM1601'){
          if(pageName == 'index_1'){
              $(this).addClass('select');
          }
      }
      else if(products[0] == 'DM1602'){
          if(pageName == 'index_2'){
              $(this).addClass('select');
          }
      }
      else if(products[0] == 'DM1603'){
          if(pageName == 'index_3')
              $(this).addClass('select');
      }
      else if(products[0] == 'DM1604'){
          if(pageName == 'index_5')
              $(this).addClass('select');
      }
      else {
          if(pageName == 'index')
              $(this).addClass('select');
      }
   });


   $('#Header .bu').on('click',function() {
      switch ($(this).attr('id')) {
         case 'Logo':
            window.open('http://www.first-aviva.com.tw/','_blank');
            break;
         case 'BU_FB':
            window.open('https://www.facebook.com/FirstAviva','_blank');
            break;
         case 'BU_Group':
            window.open('http://www.firstholding.com.tw/','_blank');
            break;
         case 'BU_Home':
        	var source = getParameterByName('source');
        	if(source === "")
         		window.location.href='/DMD201608/index.html';
         	else
         		window.location.href='/DMD201608/index.html?source='+source;
            break;
      }
   });

   // Form
   $('#Form #BU_TnC').on('click',function() {
      if ($(this).hasClass('select')) {
         FormData.tnc=0;
          $(this).removeClass('select');
      } else {
         FormData.tnc=1;
          $(this).addClass('select');
      }
   });
   $('#Form #BU_TnC_Pop').on('click',function() {
      popWinHandler('Win_TnC','show');
   });
   $('#Form #BU_Submit').on('click',function() {
      if ($.trim($('#Form #FName').val())==='' &&
          typeof $('#Form input[name=FSex]:checked').val()==='undefined' && ($.trim($('#Form #FMobile').val()))==='') {
             alert('姓名/性別/手機欄位為必填!!\r\n請檢查看看是否有欄位沒有資料.');
      } else {
         var isValid=1;

         /* 20160817 --- ADD Start */
         if (isValid===1) {
            if (ValidateTC($.trim($('#Form #FName').val()))===false) {
               isValid=0;
               alert('姓名只能輸入中文, 請檢查輸入的姓名資料!');
            }
         }
         /* 20160817 --- ADD End */

         if (isValid===1) {
            if (($.trim($('#Form #FMobile').val()).length<10)) {
               isValid=0;
               alert('手機資料輸入錯誤, 請檢查輸入的資料!');
            }
         }
         if (isValid===1) {
            if (ValidateMobile($.trim($('#Form #FMobile').val()))===false) {
               isValid=0;
               alert('手機資料格式錯誤, 請檢查輸入的手機資料!');
            }
         }

         if (isValid===1 && ($.trim($('#Form #FTel_1').val()).length>0) || ($.trim($('#Form #FTel_2').val()).length>0)) {
            if (($.trim($('#Form #FTel_1').val()).length<=1) || ($.trim($('#Form #FTel_2').val()).length<=5)) {
               isValid=0;
               alert('市話資料輸入錯誤, 請檢查輸入的資料!');
            }
         }
         if (isValid===1 && ($.trim($('#Form #FTel_1').val()).length>0) || ($.trim($('#Form #FTel_2').val()).length>0)) {
            if (ValidateTel($.trim($('#Form #FTel_1').val())+'-'+$.trim($('#Form #FTel_2').val()))===false) {
               isValid=0;
               alert('市話資料格式錯誤, 請檢查輸入的市話資料!');
            }
         }

         if (isValid===1 && $.trim($('#Form #FEmail').val()).length>0) {
            if (ValidateEmail($.trim($('#Form #FEmail').val()))===false) {
               isValid=0;
               alert('Email資料格式錯誤, 請檢查輸入的Emaili資料!');
            }
         }

         if (isValid===1) {
            if (FormData.tnc===0) {
               isValid=0;
               alert('請同意 第一金人壽 蒐集、處理及利用個人資料訊息告知事項，並願意讓服務人員致電說明產品資訊。');
            }
         }

         if (isValid===1) {
            FormData.name=$.trim($('#Form #FName').val());
            FormData.gender=$('#Form input[name=FSex]:checked').val();
            FormData.cellphone=$.trim($('#Form #FMobile').val());
            FormData.areacode=$.trim($('#Form #FTel_1').val());
            FormData.telephone=$.trim($('#Form #FTel_2').val());
            FormData.email=$.trim($('#Form #FEmail').val());
            FormData.source=getParameterByName('source');
            if(pageName == "index_1"){
               FormData.productname = '安心一生';
               FormData.campaigncode = 'DM1601';
            }
            else if(pageName == "index_2"){
               FormData.productname = '安心久久';
               FormData.campaigncode = 'DM1602';
            }
            else if(pageName=='index_3'){
               FormData.productname = '佳倍防癌';
               FormData.campaigncode = 'DM1603';
            }
            else if(pageName=='index_5'){
               FormData.productname = '全心防癌';
               FormData.campaigncode = 'DM1604';
            }
            else if(pageName=='index_4'){
               FormData.productname = '';
               FormData.campaigncode = '';
            }

            console.log(FormData);  //----------------> 資料記錄

            //Ajax
            $.ajax({
                url: "https://"+hostName+"/DMD201608/addProfile", // setting api domain
                data: {
                  userdata: FormData,
                },
                method: "POST",
                success: function(json_string){
                    var source = getParameterByName('source');
                    var res = json_string;
                    if(res.code == 'success'){
                    	console.log(res)
                        // alert('資料已經送出，我們將盡快派專人與您聯繫。');
                        window.location.href=(source==='') ? "/DMD201608/Thankyou.html" : "/DMD201608/Thankyou.html?source="+source;
                    }
                    else if(res.code == 'param_error'){
                        console.log(res);
                        alert('所收到的資料有誤，請檢查資料後再試一次。');
                    }
                    else{
                        console.log(res);
                        alert('系統發生錯誤囉，請稍候再試。');
                    }
                },
                error: function(req, error){
                    console.log(req);
                    console.log(error);
                    alert('系統發生錯誤，請稍候再試。');
                }
            });

         }
      }
   });

   //================== Specific each Page
    switch (pageName) {
      case "index_4":
         $('#Thank #BU_BackHome').on('click',function() {
           var source = getParameterByName('source');
           if(source === "")
                window.location.href='/DMD201608/index.html';
           else {
                window.location.href='/DMD201608/index.html?source='+source;
           }
         });
         break;
      case "index":
         $('#Home #BU_StartTest').on('click',function() {
            $('#Test input[name=TestAns]').prop('checked',false); //reset ans
            $('#Home').fadeOut('fast',function() {
               $('#Test').fadeIn('fast');
            });
         });

         $('#Test #BU_Answer').on('click',function() {
            if ($('#Test').is(":visible")) {
               if ($('#Test').hasClass('q1')) {
                  if (typeof $('#Test input[name=TestAns]:checked').val() != "undefined") {
                     TestAns.q1=$('#Test input[name=TestAns]:checked').val();
                     $('#Test').fadeOut('fast',function() {
                        $('#Test input[name=TestAns]').prop('checked',false); //reset ans
                        $('#Test').removeClass('q1').addClass('q2').fadeIn('fast');
                     });
                  } else {
                     alert('請選擇慶功會在哪裡舉辦?');
                  }
               }
               if ($('#Test').hasClass('q2')) {
                  if (typeof $('#Test input[name=TestAns]:checked').val() != "undefined") {
                     TestAns.q2=$('#Test input[name=TestAns]:checked').val();

                     //計算結果
                     TestAns.score=TestScore.q1[TestAns.q1-1]+TestScore.q2[TestAns.q2-1];

                     switch (toNumber(TestAns.score)) {
                        case 30:
                        case 50:
                        case 70:
                        case 90:
                           FormData.productname = '安心一生';
                           break;
                        case 40:
                        case 60:
                        case 80:
                        case 100:
                           FormData.productname = '安心久久';
                           break;
                        default:
                           FormData.productname = null;
                           break;
                     }
                     //顯示結果頁
                     $('#Test').fadeOut('fast',function() {
                        $('#FixdItem').hide();
                        $('#Result').addClass('r'+TestAns.score).fadeIn('fast');
                     });
                  } else {
                     alert('請選擇參加重要考試, 那種狀況你最害怕?');
                  }
               }
            }
         });

         $('#Result #BU_More, #Result #BU_FBShare').on('click',function() {
             var source = getParameterByName('source');
            switch ($(this).attr('id')) {
               case 'BU_More':
                  switch (toNumber(TestAns.score)) {
                     case 30:
                     case 50:
                     case 70:
                     case 90:
                        FormData.productname = '安心久久';
                        FormData.campaigncode = 'DM1601';
                        window.location.href=(source === '') ? "/DMD201608/DM1601/index.html" : ("/DMD201608/DM1601/index.html?source="+source);
                        break;
                     case 40:
                     case 60:
                     case 80:
                     case 100:
                        FormData.productname = '安心久久';
                        FormData.campaigncode = 'DM1602';
                        window.location.href=(source === '') ? "/DMD201608/DM1602/index.html" : ("/DMD201608/DM1602/index.html?source="+source);
                        break;
                     default:
                        FormData.productname = '';
                        FormData.campaigncode = '';
                        break;
                  }
                  break;
               case 'BU_FBShare':
                  //********************* ==> FB Share 什麼呢?
                  //setting img url to share
                  var url = 'http://'+hostName+'/DMD201608/img/des_1200x628_'+TestAns.score+'.png';
                  console.log(url);
                  FBShareOp(url);
                  break;
            }
         });
         break;
      default :
         //Sub Menu
         $('#FixdItem .menu li').on('click',function() {
            $('#FixdItem .menu li').removeClass('select');
            $(this).addClass('select');
            $('#DivContent > .page').hide();
            $('#DivContent #'+$(this).data('go')).fadeIn('fast');
            if ($(this).data('go')==='Intro') {
               $('#DivContent #'+$(this).data('go')+' .intro').jScrollPane();
            }
            if ($(this).data('go')==='Example') {
               $('#Example #Content #E1 .data .text').jScrollPane();
            }
            if ($(this).data('go')==='Try') {
               if (pageName==="index_1" || pageName==="index_2") {
                  $('#Try .cal .step1 input[name=TYear]').prop('checked',false); //reset ans
               }
               $('#Try .cal .step1 input[name=TSex]').prop('checked',false); //reset ans
               $('#Try .cal #TAge').val('');
               $('#Try .cal #TQuota').val('');
               $('#Try .cal .step1').show();
               $('#Try .cal .step2').hide();
            }
         });

         $('#Feature #BU_Feature_Note').on('click',function() {
            popWinHandler('Win_Feature','show');
         });
         $('#Intro #BU_Intro_Note').on('click',function() {
            popWinHandler('Win_Intro','show');
         });

         $('#Example #Content > div .item').on('click',function() {
            $('#Example #Content > div').removeClass('open');
            $(this).parent().addClass('open');
            checkScrollBar($(this).parent().attr('id'));
         });
         $('#Example #Content > div .data .bu_close').on('click',function() {
            $('#Example #Content > div').addClass('open');
            $(this).parent().parent().removeClass('open');
            if ($(this).parent().parent().attr('id')==='E1') {
               checkScrollBar('E2');
            } else {
               checkScrollBar('E1');
            }
         });

         //針對 佳倍防癌 特別設定
         if (pageName==="index_1") {
            $('#Try input[name="TYear"]:radio').on('click',function() {
               $('#Try #TAge').empty().append('<option value="">請選擇</option>');
               if (toNumber($(this).val())===15) {
                  for (i=20;i<=60;i++) {
                     $('#Try #TAge').append('<option value="'+i+'">'+i+'</option>');
                  }
               } else {
                  for (i=20;i<=55;i++) {
                     $('#Try #TAge').append('<option value="'+i+'">'+i+'</option>');
                  }
               }
            });
         } else if (pageName==="index_2") {
            for (i=20;i<=49;i++) {
               $('#Try #TAge').append('<option value="'+i+'">'+i+'</option>');
            }
         } else if (pageName==="index_3") {
            for (i=45;i<=70;i++) {
               $('#Try #TAge').append('<option value="'+i+'">'+i+'</option>');
            }
            $('#Try #TAge').on('change',function() {
               $('#Try #TQuota').empty().append('<option value="">請選擇</option>');
               if (toNumber($(this).val())<=65) {
                  for (i=30;i<=100;i=i+10) {
                     $('#Try #TQuota').append('<option value="'+i+' 萬元">'+i+'  萬元</option>');
                  }
               } else {
                  for (i=30;i<=50;i=i+10) {
                     $('#Try #TQuota').append('<option value="'+i+' 萬元">'+i+'  萬元</option>');
                  }
               }
            });
         } else if (pageName==="index_5") {
            for (i=20;i<=50;i++) {
               $('#Try #TAge').append('<option value="'+i+'">'+i+'</option>');
            }
         }
         $('#Try #BU_Cal').on('click',function() {
            if (typeof $('#Try input[name=TYear]:checked').val()==='undefined' ||
                typeof $('#Try input[name=TSex]:checked').val()==='undefined' ||
                $('#Try #TAge').val()==='' ||
                $('#Try #TQuota').val()==='') {
                   alert('所有欄位皆為必選!!\r\n請檢查看看是否有欄位沒有選擇資料.');
            } else {
               TryCal.year=$('#Try input[name=TYear]:checked').val();
               TryCal.sex=$('#Try input[name=TSex]:checked').val();
               TryCal.age=$('#Try #TAge').val();
               TryCal.quota=$('#Try #TQuota').val();

               var total = calResult();   //計算各個保單的結果

               $('#Try .step1').fadeOut('fast',function() {
                  $('#Try .step2 #DAge').empty().append(TryCal.age+' 歲');
                  if (TryCal.sex==='M') {
                     $('#Try .step2 #DSex').empty().append('男');
                  } else {
                     $('#Try .step2 #DSex').empty().append('女');
                  }
                  $('#Try .step2 #DPeriod').empty().append(TryCal.year+'年期');
                  $('#Try .step2 #DQuota').empty().append(TryCal.quota);
                  $('#Try .step2 #DPay_Year').html(total.year +' 元');
                  $('#Try .step2 #DPay_Month').html(total.month +' 元');

                  $('#Try .step2').fadeIn('fast');
               });
            }
         });
         break;
    }
});




//================== Common function
function calResult() {
   switch (pageName) {
      case 'index_1':   //安心一生
          var fif_man_data = {
              '20': 2640,
              '21': 2712,
              '22': 2784,
              '23': 2856,
              '24': 2928,
              '25': 3000,
              '26': 3072,
              '27': 3144,
              '28': 3216,
              '29': 3288,
              '30': 3360,
              '31': 3480,
              '32': 3600,
              '33': 3720,
              '34': 3840,
              '35': 3960,
              '36': 4080,
              '37': 4200,
              '38': 4320,
              '39': 4440,
              '40': 4560,
              '41': 4800,
              '42': 5040,
              '43': 5280,
              '44': 5520,
              '45': 5760,
              '46': 6000,
              '47': 6240,
              '48': 6480,
              '49': 6720,
              '50': 6960,
              '51': 7944,
              '52': 8928,
              '53': 9912,
              '54': 10896,
              '55': 11880,
              '56': 12864,
              '57': 13848,
              '58': 14832,
              '59': 15816,
              '60': 16800,
          };
          var fif_woman_data = {
              '20': 2400,
              '21': 2448,
              '22': 2508,
              '23': 2556,
              '24': 2616,
              '25': 2664,
              '26': 2724,
              '27': 2772,
              '28': 2832,
              '29': 2880,
              '30': 2940,
              '31': 3012,
              '32': 3084,
              '33': 3156,
              '34': 3228,
              '35': 3300,
              '36': 3372,
              '37': 3444,
              '38': 3516,
              '39': 3588,
              '40': 3660,
              '41': 3804,
              '42': 3948,
              '43': 4092,
              '44': 4236,
              '45': 4380,
              '46': 4524,
              '47': 4668,
              '48': 4812,
              '49': 4956,
              '50': 5100,
              '51': 5484,
              '52': 5880,
              '53': 6264,
              '54': 6660,
              '55': 7044,
              '56': 7440,
              '57': 7824,
              '58': 8220,
              '59': 8604,
              '60': 9000,
          };
          var twen_man_data = {
              '20': 2100,
              '21': 2160,
              '22': 2232,
              '23': 2292,
              '24': 2364,
              '25': 2424,
              '26': 2496,
              '27': 2556,
              '28': 2628,
              '29': 2688,
              '30': 2760,
              '31': 2868,
              '32': 2988,
              '33': 3096,
              '34': 3216,
              '35': 3324,
              '36': 3444,
              '37': 3552,
              '38': 3672,
              '39': 3780,
              '40': 3900,
              '41': 4152,
              '42': 4404,
              '43': 4656,
              '44': 4908,
              '45': 5160,
              '46': 5412,
              '47': 5664,
              '48': 5916,
              '49': 6168,
              '50': 6420,
              '51': 7080,
              '52': 7740,
              '53': 8400,
              '54': 9060,
              '55': 9720,
          };
          var twen_woman_data = {
              '20': 1920,
              '21': 1956,
              '22': 2004,
              '23': 2040,
              '24': 2088,
              '25': 2124,
              '26': 2172,
              '27': 2208,
              '28': 2256,
              '29': 2292,
              '30': 2340,
              '31': 2400,
              '32': 2460,
              '33': 2520,
              '34': 2580,
              '35': 2640,
              '36': 2700,
              '37': 2760,
              '38': 2820,
              '39': 2880,
              '40': 2940,
              '41': 3072,
              '42': 3204,
              '43': 3336,
              '44': 3468,
              '45': 3600,
              '46': 3732,
              '47': 3864,
              '48': 3996,
              '49': 4128,
              '50': 4260,
              '51': 4560,
              '52': 4860,
              '53': 5160,
              '54': 5460,
              '55': 5760,
          };

          var total = 0;
          var TQuota = parseInt(TryCal.quota) / 100;
          if(TryCal.sex == 'M' && TryCal.year == '15'){
              total = fif_man_data[TryCal.age] * TQuota;
          }
          else if(TryCal.sex == 'F' && TryCal.year == '15'){
              total = fif_woman_data[TryCal.age] * TQuota;
          }
          else if(TryCal.sex == 'M' && TryCal.year == '20'){
              total = twen_man_data[TryCal.age] * TQuota;
          }
          else {
              total = twen_woman_data[TryCal.age] * TQuota;
          }

          var resultArr = transferString(total);
          console.log(resultArr);
          return resultArr;
          break;
      case 'index_2':   //安心久久
          var number = parseInt(TryCal.quota);
          var twenty_num = 420;
          var fifteen_num = 516;
          var total = 0;
          if(TryCal.year == '15'){
              total = fifteen_num * number;
          }
          else {
              total = twenty_num * number;
          }

          return transferString(total);
          break;
      case 'index_3':   //佳倍防癌
          var man_data = {
              '45': 300,
              '46': 300,
              '47': 312,
              '48': 324,
              '49': 336,
              '50': 348,
              '51': 372,
              '52': 396,
              '53': 420,
              '54': 444,
              '55': 480,
              '56': 516,
              '57': 528,
              '58': 552,
              '59': 588,
              '60': 624,
              '61': 648,
              '62': 684,
              '63': 732,
              '64': 768,
              '65': 828,
              '66': 864,
              '67': 912,
              '68': 984,
              '69': 1056,
              '70': 1140,
          };
          var woman_data = {
              '45': 288,
              '46': 288,
              '47': 300,
              '48': 312,
              '49': 312,
              '50': 320,
              '51': 320,
              '52': 336,
              '53': 348,
              '54': 360,
              '55': 384,
              '56': 396,
              '57': 408,
              '58': 420,
              '59': 432,
              '60': 444,
              '61': 468,
              '62': 480,
              '63': 492,
              '64': 528,
              '65': 552,
              '66': 564,
              '67': 588,
              '68': 624,
              '69': 648,
              '70': 696,
          }

          var number = parseInt(TryCal.quota);
          //console.log(number);
          var year_total = 0;
          if(TryCal.sex == "M"){
              //console.log(parseInt(man_data[TryCal.age]));
              year_total = parseInt(man_data[TryCal.age]) * number;
          }
          else {
              //console(parseInt(man_data[TryCal.age]));
              year_total = parseInt(woman_data[TryCal.age]) * number;
          }
          //console.log(year_total);

          return transferString(year_total);
          break;
      case 'index_5': // 全心防癌
          var man_data = {
              '15': 228,
              '16': 228,
              '17': 240,
              '18': 252,
              '19': 264,
              '20': 264,
              '21': 276,
              '22': 288,
              '23': 300,
              '24': 312,
              '25': 324,
              '26': 324,
              '27': 336,
              '28': 336,
              '29': 348,
              '30': 348,
              '31': 372,
              '32': 384,
              '33': 396,
              '34': 408,
              '35': 420,
              '36': 432,
              '37': 456,
              '38': 468,
              '39': 480,
              '40': 492,
              '41': 552,
              '42': 612,
              '43': 672,
              '44': 720,
              '45': 744,
              '46': 852,
              '47': 912,
              '48': 972,
              '49': 996,
              '50': 1056,
          };
          var woman_data = {
              '15': 240,
              '16': 240,
              '17': 252,
              '18': 264,
              '19': 276,
              '20': 276,
              '21': 288,
              '22': 288,
              '23': 300,
              '24': 312,
              '25': 324,
              '26': 336,
              '27': 348,
              '28': 348,
              '29': 360,
              '30': 360,
              '31': 372,
              '32': 384,
              '33': 396,
              '34': 408,
              '35': 420,
              '36': 432,
              '37': 444,
              '38': 456,
              '39': 468,
              '40': 468,
              '41': 516,
              '42': 564,
              '43': 612,
              '44': 660,
              '45': 708,
              '46': 756,
              '47': 804,
              '48': 852,
              '49': 900,
              '50': 960,
          }

          var number = parseInt(TryCal.quota);
          //console.log(number);
          var year_total = 0;
          if(TryCal.sex == "M"){
              //console.log(parseInt(man_data[TryCal.age]));
              year_total = parseInt(man_data[TryCal.age]) * number;
          }
          else {
              //console(parseInt(man_data[TryCal.age]));
              year_total = parseInt(woman_data[TryCal.age]) * number;
          }

          return transferString(year_total);
          break;
   }
}

function checkScrollBar(who) {
   if ((pageName==='index_1' && who==='E2') || (pageName==='index_2')|| (pageName==='index_3') || (pageName==='index_5')) {
      $('#Example #Content #'+who+' .data .text').jScrollPane();
   }
}
function popWinHandler(who, status) {
   if (status==='show') {
      $('#Mask .popWin').hide();
      $('#Mask').fadeIn('fast');
      $('#Mask #'+who).show();
      $('#Mask #'+who+' .text').jScrollPane();
   }
   if (status==='hidden') {
      $('#Mask .popWin').hide();
      $('#Mask').fadeOut('fast');
   }
}
function isVersionCellphone(){
    if( navigator.userAgent.match(/HTC/i) || navigator.userAgent.match(/webOS/i) ||
        navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i)||
        navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)
    ){
    	var source = getParameterByName('source');
        var pathname = window.location.pathname;
        var path = pathname.substring(pathname.indexOf("/") + 1);
        var dirs = path.split('/');
        if(dirs[1] != 'm'){
        	var newpath = '/'+dirs[0]+'/m';
        	for(var i=1;i<dirs.length;i++)
        		newpath += '/'+dirs[i];
        	//console.log("/"+typeof(source)+"/");
        	if(source !== "")
        		newpath += '?source=' + source;

        	//console.log(newpath);
        	window.location.href = newpath;
        }
    }
}
function transferString(total){
    var year = '';
    var month = '';

    var month_total = Math.round(total / 12);

    var t_year = parseInt(total / 1000);
    var r_year = total % 1000;
    var t_month = parseInt(month_total / 1000);
    var r_month = month_total % 1000;

    if(t_year == 0)
        year = r_year.toString();
    else{
        if(parseInt(r_year / 10) == 0)
            year = t_year.toString() + ',00' + r_year.toString();
        else if(parseInt(r_year / 100) == 0)
            year = t_year.toString() + ',0' + r_year.toString();
        else {
            year = t_year.toString() + ',' + r_year.toString();
        }
    }

    if(t_month == 0)
        month = r_month.toString();
    else{
        if(parseInt(r_month / 10) == 0)
            month = t_month.toString() + ',00' + r_month.toString();
        else if(parseInt(r_month / 100) == 0)
            month = t_month.toString() + ',0' + r_month.toString();
        else {
            month = t_month.toString() + ',' + r_month.toString();
        }
    }
    return {year: year, month: month};
}
function getHostName(){
    return window.location.hostname;
}
function getCurentPageName() {

    var pagePathName = window.location.pathname;
    console.log(pagePathName);
    // judge if address has parameter 'source'

    var arrPage = pagePathName.substring(pagePathName.indexOf("/") + 1).split("/");
    var returnPage = '';
    console.log(arrPage);
    if(arrPage[1] === 'index.html' || arrPage[1] === '')
        returnPage = 'index';
    else if(arrPage[1] === 'Thankyou.html')
        returnPage = 'index_4';
    else if(arrPage[1] == 'DM1601'){
        returnPage = 'index_1';
    }
    else if(arrPage[1] == 'DM1602'){
        returnPage = 'index_2';
    }
    else if(arrPage[1] == 'DM1603'){
        returnPage = 'index_3';
    }
    else if(arrPage[1] == 'DM1604'){
        returnPage = 'index_5'
    }
    return returnPage;
}
function toNumber(strNumber) {
    return parseInt(strNumber, 10);
}
function ValidateMobile(mobile) {
    var format = /^09[0-9]{8}$/;
    var ok = false;
    if (format.test(mobile)) {
        ok = true;
    }
    return ok;
}
function ValidateTel(tel) {
    var format = /^[0-9]{2,3}[-][0-9]{6,8}$/;
    var ok = false;
    if (format.test(tel)) {
        ok = true;
    }
    return ok;
}
function ValidateEmail(email)
{
   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email))  {
      return true;
   }  else {
      return false;
   }
}
/* 20160817 --- ADD Start */
function ValidateTC(str) {
   var status=true;
   for(var i = 0; i < str.length; i++) {
      if(str.charCodeAt(i) < 0x4E00 || str.charCodeAt(i) > 0x9FA5) {
         status=false;
      }
  }
  return status;
}
function GetIEVersion() {
  var sAgent = window.navigator.userAgent;
  var Idx = sAgent.indexOf("MSIE");

  if (Idx > 0) {  // If IE, return version number.
     return parseInt(sAgent.substring(Idx+ 5, sAgent.indexOf(".", Idx)));
  } else if (!!navigator.userAgent.match(/Trident\/7\./)) { // If IE 11 then look for Updated user agent string.
     return 11;
  } else {
     return 0; //It is not IE
  }
}
