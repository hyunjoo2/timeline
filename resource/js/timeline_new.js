/**
 * myTmses.js : 나의시계열 쿠키 처리 관련 자바스크립트
 * 
 * 쿠키에 넣는 함수
 * function fnAddMyTmsesCookie(pTypeCd, cteSeq, anotherSeq)
 * - pType
 * 'ct' : CTE 본대책
 * 'ec'	: 본대책 에픽
 * 'ef' : 추진내역 에픽
 * 'pe'	: POLC_EXPNAON 정책해설
 * 'pt'	: PRES_TRND 언론동향
 * 'rd'	: RSCH_DATA 연구자료
 * 'ps' : POL_SUVY 여론조사
 * - cteSeq : 본대책 시퀀스
 * - anotherSeq : 각 테이블 고유 시퀀스 (본대책은 사용하지 않는 파라미터)
 * ex) fnAddMyTmsesCookie('ct', 44); fnAddMyTmsesCookie('ct', 61);
 * ex) fnAddMyTmsesCookie('ec', 48, 166779); fnAddMyTmsesCookie('ef', 64, 167443);
 * ex) fnAddMyTmsesCookie('pe', 51, 10); fnAddMyTmsesCookie('pe', 65, 11);
 * ex) fnAddMyTmsesCookie('pt', 42, 1); fnAddMyTmsesCookie('pt', 50, 10);
 * ex) fnAddMyTmsesCookie('rd', 42, 2); fnAddMyTmsesCookie('rd', 51, 9);
 * ex) fnAddMyTmsesCookie('ps', 66, 6); fnAddMyTmsesCookie('ps', 3, 5);
 * 
 * 테스트 시 사용
 * fnAddMyTmsesCookie('ct', 44); fnAddMyTmsesCookie('ct', 61); fnAddMyTmsesCookie('ec', 48, 166779); fnAddMyTmsesCookie('ef', 64, 167443); fnAddMyTmsesCookie('pe', 51, 10); fnAddMyTmsesCookie('pe', 65, 11);
 * fnAddMyTmsesCookie('pt', 42, 1); fnAddMyTmsesCookie('pt', 50, 10); fnAddMyTmsesCookie('rd', 42, 2); fnAddMyTmsesCookie('rd', 51, 9); fnAddMyTmsesCookie('ps', 66, 6); fnAddMyTmsesCookie('ps', 3, 5);
 */

// 쿠키명
var COOKIE_NAME = 'myTmses';

/*
 * 쿠키 예시
 * ex) "kdiTmses={"ct44":3,"ct46":2,"ct43":4,"ct41":5}"
 */

// 전역변수
var timeLineCteList = [];
var timeLineEpicList = [];
var timeLinePolcExpnaonList = [];
var timeLinePresTrndList = [];
var timeLineRschDataList = [];
var timeLinePolSuvyList = [];
var myTimeLineList = [];

function fnGetCookie() {
    var name = COOKIE_NAME + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if(c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

// 쿠키 이름으로 제거 함수
function fnDeleteCookieByName(name) {
	document.cookie = name + '=; Path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

// 내가 본 정책자료(쿠키) 초기화
function fnDeleteAllMyTmsesCookies() {
	var target = arguments[0];
	var dvsn = isEmpty(arguments[1]) ? 'myTmses' : arguments[1];
	COOKIE_NAME = dvsn; // 전역변수 설정 
	var cnt = $('#my_history').find('li').length;
	var selCnt = $('#my_history').find('li.checked').length;
	if(cnt == 0) {
		alert('삭제할 기록이 존재하지 않습니다.');
		$(target).blur();
		return false;
	} else {
		if(selCnt > 0) {
			var msg = '선택 된 내가 본 정책자료 기록을 지우시겠습니까?';
			if(confirm(msg)) {
				// 선택삭제 구현 예정
				var cookieJSON = fnGetMyTmsesCookieJSON();
				$('#my_history').find('li').each(function() {
					var liTarget = $(this);
					var ptype = liTarget.data('ptype');
					var cteseq = liTarget.data('cteseq');
					var anotherseq = liTarget.data('anotherseq');
					var mppgsrc = liTarget.data('mppgsrc');
					if(liTarget.hasClass('checked')) {
						var resultKey = ptype + cteseq;
						if(isNotEmpty(anotherseq)) resultKey += '-' + anotherseq;
						if(isNotEmpty(mppgsrc)) resultKey += '-' + mppgsrc;
						delete cookieJSON[resultKey];
					}
				});
				// 쿠키 유효기간 현재로부터 1주일 뒤로 설정
				var date = new Date();
				date.setTime(date.getTime() + (7 * (24 * 60 * 60 * 1000)));
				var expires = '; expires=' + date.toUTCString();
				document.cookie = COOKIE_NAME + '=' + JSON.stringify(cookieJSON) + expires + '; path=/';
				document.location.href = window.location.pathname;
			} else {
				$(target).blur();
			}
		} else {
			var msg = '내가 본 정책자료 기록을 모두 지우시겠습니까?';
			if(confirm(msg)) {
				fnDeleteCookieByName(COOKIE_NAME);
				document.location.href = window.location.pathname;
			} else {
				$(target).blur();
			}
		}
		COOKIE_NAME = 'myTmses';
	}
}

// 본대책 JSON 생성
function fnMakeCteJSON(cteSeq) {
	var resultJSON = {};
	$.ajax({
    	type: 'GET',
        url: '/myTmses/getCteCookieMap',
        data: { CTE_SEQ : cteSeq },
        cache: false,
        async: false,
        success: function(res) {
            if(isNotEmpty(res)) {
				resultJSON['cteSeq'] = res.CTE_SEQ;
				resultJSON['subjectBig1'] = res.RELT_THEM_BIG_1_NM;
				resultJSON['subjectBig2'] = res.RELT_THEM_BIG_2_NM;
				resultJSON['subjectBig3'] = res.RELT_THEM_BIG_3_NM;
				resultJSON['subjectMid1'] = res.RELT_THEM_MID_1_NM;
				resultJSON['subjectMid2'] = res.RELT_THEM_MID_2_NM;
				resultJSON['subjectMid3'] = res.RELT_THEM_MID_3_NM;
				resultJSON['subjectSml1'] = res.RELT_THEM_SML_1_NM;
				resultJSON['subjectSml2'] = res.RELT_THEM_SML_2_NM;
				resultJSON['subjectSml3'] = res.RELT_THEM_SML_3_NM;
				resultJSON['upper'] = 'UPPER';
				resultJSON['title'] = restoreHtml(res.CTE_NM);
				resultJSON['infoName'] = '';
				resultJSON['infoDate'] = res.PRST_DT;
				resultJSON['pType'] = 'ct';
            }
        },
        error: function() {
            return null;
        }
    });
	if(isEmpty(resultJSON.cteSeq)) {
		return null;
	} else {
		return resultJSON;
	}
}

// 정책자료 JSON 생성
function fnMakeEpicJSON(cteSeq, epicSeq, mppgSrc) {
	var resultJSON = {};
	$.ajax({
		type: 'GET',
		url: '/myTmses/getEpicCookieMap',
		data: {
			CTE_SEQ     : cteSeq
          , ANOTHER_SEQ : epicSeq
          , MPPG_SRC    : mppgSrc
		},
		cache: false,
		async: false,
		success: function(res) {
			if(isNotEmpty(res)) {
				resultJSON['cteSeq'] = res.CTE_SEQ;
				resultJSON['anotherSeq'] = res.EPIC_NUM;
				resultJSON['mppgSrc'] = res.MPPG_SRC;
				if(isNotEmpty(res.RELT_THEM_FULL_1_NM)) {
					var subject1 = res.RELT_THEM_FULL_1_NM.split('-');
					resultJSON['subjectBig1'] = subject1[1];
					resultJSON['subjectMid1'] = subject1[2];
					resultJSON['subjectSml1'] = subject1[3];
				}
				if(isNotEmpty(res.RELT_THEM_FULL_2_NM)) {
					var subject2 = res.RELT_THEM_FULL_2_NM.split('-');
					resultJSON['subjectBig2'] = subject2[1];
					resultJSON['subjectMid2'] = subject2[2];
					resultJSON['subjectSml2'] = subject2[3];
				}
				if(isNotEmpty(res.RELT_THEM_FULL_3_NM)) {
				var subject3 = res.RELT_THEM_FULL_3_NM.split('-');
					resultJSON['subjectBig3'] = subject3[1];
					resultJSON['subjectMid3'] = subject3[2];
					resultJSON['subjectSml3'] = subject3[3];
				}
				
				var upper = res.CTE_NM;
				if(isNotEmpty(res.GVDPT_BIG_NM)) {
					upper += ' / ' + res.GVDPT_BIG_NM;
				}
				upper += ' / ' + res.CTE_PRST_DT;
				resultJSON['upper'] = restoreHtml(upper);
				resultJSON['title'] = restoreHtml(res.EPIC_TITLE);
				resultJSON['infoName'] = '';
				resultJSON['infoDate'] = res.EPIC_PBLC_DT;
				resultJSON['pType'] = 'ep';
			}
		},
		error: function() {
			return null;
		}
	});
	if(isEmpty(resultJSON.cteSeq)) {
		return null;
	} else {
		return resultJSON;
	}
}

// 정책자료 JSON 생성
function fnMakePolcExpnaonJSON(cteSeq, polcExpnaonSeq) {
	var resultJSON = {};
	$.ajax({
		type: 'GET',
		url: '/myTmses/getPolcExpnaonCookieMap',
		data: {
			CTE_SEQ : cteSeq,
			ANOTHER_SEQ : polcExpnaonSeq
		},
		cache: false,
		async: false,
		success: function(res) {
			if(isNotEmpty(res)) {
				resultJSON['cteSeq'] = res.CTE_SEQ;
				resultJSON['anotherSeq'] = res.POLC_EXPNAON_SEQ;
				if(isNotEmpty(res.RELT_THEM_FULL_1_NM)) {
					var subject1 = res.RELT_THEM_FULL_1_NM.split('-');
					resultJSON['subjectBig1'] = subject1[1];
					resultJSON['subjectMid1'] = subject1[2];
					resultJSON['subjectSml1'] = subject1[3];
				}
				if(isNotEmpty(res.RELT_THEM_FULL_2_NM)) {
					var subject2 = res.RELT_THEM_FULL_2_NM.split('-');
					resultJSON['subjectBig2'] = subject2[1];
					resultJSON['subjectMid2'] = subject2[2];
					resultJSON['subjectSml2'] = subject2[3];
				}
				if(isNotEmpty(res.RELT_THEM_FULL_3_NM)) {
					var subject3 = res.RELT_THEM_FULL_3_NM.split('-');
					resultJSON['subjectBig3'] = subject3[1];
					resultJSON['subjectMid3'] = subject3[2];
					resultJSON['subjectSml3'] = subject3[3];
				}
				
				var upper = res.CTE_NM;
				if(isNotEmpty(res.GVDPT_BIG_NM)) {
					upper += ' / ' + res.GVDPT_BIG_NM;
				}
				upper += ' / ' + res.PRST_DT;
				resultJSON['upper'] = restoreHtml(upper);
				resultJSON['title'] = restoreHtml(res.RPT_NM);
				resultJSON['infoName'] = '';
				resultJSON['infoDate'] = res.PBLC_DT;
				resultJSON['pType'] = 'pe';
			}
		},
		error: function() {
			return null;
		}
	});
	if(isEmpty(resultJSON.cteSeq)) {
		return null;
	} else {
		return resultJSON;
	}
}

// 정책자료 JSON 생성
function fnMakePresTrndJSON(cteSeq, presTrndSeq) {
	var resultJSON = {};
	$.ajax({
		type: 'GET',
		url: '/myTmses/getPresTrndCookieMap',
		data: {
			CTE_SEQ : cteSeq,
			ANOTHER_SEQ : presTrndSeq
		},
		cache: false,
		async: false,
		success: function(res) {
			if(isNotEmpty(res)) {
				resultJSON['cteSeq'] = res.CTE_SEQ;
				resultJSON['anotherSeq'] = res.PRES_TRND_SEQ;
				if(isNotEmpty(res.RELT_THEM_FULL_1_NM)) {
					var subject1 = res.RELT_THEM_FULL_1_NM.split('-');
					resultJSON['subjectBig1'] = subject1[1];
					resultJSON['subjectMid1'] = subject1[2];
					resultJSON['subjectSml1'] = subject1[3];
				}
				if(isNotEmpty(res.RELT_THEM_FULL_2_NM)) {
					var subject2 = res.RELT_THEM_FULL_2_NM.split('-');
					resultJSON['subjectBig2'] = subject2[1];
					resultJSON['subjectMid2'] = subject2[2];
					resultJSON['subjectSml2'] = subject2[3];
				}
				if(isNotEmpty(res.RELT_THEM_FULL_3_NM)) {
					var subject3 = res.RELT_THEM_FULL_3_NM.split('-');
					resultJSON['subjectBig3'] = subject3[1];
					resultJSON['subjectMid3'] = subject3[2];
					resultJSON['subjectSml3'] = subject3[3];
				}
				
				var upper = res.CTE_NM;
				if(isNotEmpty(res.GVDPT_BIG_NM)) {
					upper += ' / ' + res.GVDPT_BIG_NM;
				}
				upper += ' / ' + res.PRST_DT;
				resultJSON['upper'] = restoreHtml(upper);
				resultJSON['title'] = restoreHtml(res.RPT_NM);
				resultJSON['infoName'] = '';
				resultJSON['infoDate'] = res.PBLC_DT;
				resultJSON['pType'] = 'pt';
			}
		},
		error: function() {
			return null;
		}
	});
	if(isEmpty(resultJSON.cteSeq)) {
		return null;
	} else {
		return resultJSON;
	}
}

// 정책자료 JSON 생성
function fnMakeRschDataJSON(cteSeq, rschDataSeq) {
	var resultJSON = {};
	$.ajax({
		type: 'GET',
		url: '/myTmses/getRschDataCookieMap',
		data: {
			CTE_SEQ : cteSeq,
			ANOTHER_SEQ : rschDataSeq
		},
		cache: false,
		async: false,
		success: function(res) {
			if(isNotEmpty(res)) {
				resultJSON['cteSeq'] = res.CTE_SEQ;
				resultJSON['anotherSeq'] = res.RSCH_DATA_SEQ;
				if(isNotEmpty(res.RELT_THEM_FULL_1_NM)) {
					var subject1 = res.RELT_THEM_FULL_1_NM.split('-');
					resultJSON['subjectBig1'] = subject1[1];
					resultJSON['subjectMid1'] = subject1[2];
					resultJSON['subjectSml1'] = subject1[3];
				}
				if(isNotEmpty(res.RELT_THEM_FULL_2_NM)) {
					var subject2 = res.RELT_THEM_FULL_2_NM.split('-');
					resultJSON['subjectBig2'] = subject2[1];
					resultJSON['subjectMid2'] = subject2[2];
					resultJSON['subjectSml2'] = subject2[3];
				}
				if(isNotEmpty(res.RELT_THEM_FULL_3_NM)) {
					var subject3 = res.RELT_THEM_FULL_3_NM.split('-');
					resultJSON['subjectBig3'] = subject3[1];
					resultJSON['subjectMid3'] = subject3[2];
					resultJSON['subjectSml3'] = subject3[3];
				}
				
				var upper = res.CTE_NM;
				if(isNotEmpty(res.GVDPT_BIG_NM)) {
					upper += ' / ' + res.GVDPT_BIG_NM;
				}
				upper += ' / ' + res.PRST_DT;
				resultJSON['upper'] = restoreHtml(upper);
				resultJSON['title'] = restoreHtml(res.RPT_NM);
				resultJSON['infoName'] = '';
				resultJSON['infoDate'] = res.PBLC_DT;
				resultJSON['pType'] = 'rd';
			}
		},
		error: function() {
			return null;
		}
	});
	if(isEmpty(resultJSON.cteSeq)) {
		return null;
	} else {
		return resultJSON;
	}
}

// 정책자료 JSON 생성
function fnMakePolSuvyJSON(cteSeq, polSuvySeq) {
	var resultJSON = {};
	$.ajax({
		type: 'GET',
		url: '/myTmses/getPolSuvyCookieMap',
		data: {
			CTE_SEQ : cteSeq,
			ANOTHER_SEQ : polSuvySeq
		},
		cache: false,
		async: false,
		success: function(res) {
			if(isNotEmpty(res)) {
				resultJSON['cteSeq'] = res.CTE_SEQ;
				resultJSON['anotherSeq'] = res.POL_SUVY_SEQ;
				if(isNotEmpty(res.RELT_THEM_FULL_1_NM)) {
					var subject1 = res.RELT_THEM_FULL_1_NM.split('-');
					resultJSON['subjectBig1'] = subject1[1];
					resultJSON['subjectMid1'] = subject1[2];
					resultJSON['subjectSml1'] = subject1[3];
				}
				if(isNotEmpty(res.RELT_THEM_FULL_2_NM)) {
					var subject2 = res.RELT_THEM_FULL_2_NM.split('-');
					resultJSON['subjectBig2'] = subject2[1];
					resultJSON['subjectMid2'] = subject2[2];
					resultJSON['subjectSml2'] = subject2[3];
				}
				if(isNotEmpty(res.RELT_THEM_FULL_3_NM)) {
					var subject3 = res.RELT_THEM_FULL_3_NM.split('-');
					resultJSON['subjectBig3'] = subject3[1];
					resultJSON['subjectMid3'] = subject3[2];
					resultJSON['subjectSml3'] = subject3[3];
				}
				
				var upper = res.CTE_NM;
				if(isNotEmpty(res.GVDPT_BIG_NM)) {
					upper += ' / ' + res.GVDPT_BIG_NM;
				}
				upper += ' / ' + res.PRST_DT;
				resultJSON['upper'] = restoreHtml(upper);
				resultJSON['title'] = restoreHtml(res.RPT_NM);
				resultJSON['infoName'] = '';
				resultJSON['infoDate'] = res.PBLC_DT;
				resultJSON['pType'] = 'ps';
			}
		},
		error: function() {
			return null;
		}
	});
	if(isEmpty(resultJSON.cteSeq)) {
		return null;
	} else {
		return resultJSON;
	}
}

// 본대책 JSON 정보를 쿠키에 저장
// ec: epic+CTE, ef: epic+FRWD
function fnAddMyTmsesCookie(pTypeCd, cteSeq, anotherSeq) {
	var pType = pTypeCd;
	var mppgSrc = '';
	if(pType == 'ec') {
		pType = 'ep';
		mppgSrc = 'CTE';
	} else if(pType == 'ef') {
		pType = 'ep';
		mppgSrc = 'FRWD';
	}
	// 올바른 요청인지 롹인 후 쿠키 추가
	var testJSON = fnGetMyTmsesMap(pType, cteSeq, anotherSeq, mppgSrc);
	if(isNotEmpty(testJSON)) {
		// orderNum을 통해 순서 저장 (중복될 경우 이름이 같기 때문에 덮어씌워짐)
		var cookieName = COOKIE_NAME;
		var cookieVal = fnGetMyTmsesCookieJSON();	// 현재 쿠키 JSON
		var aKey = pType + cteSeq;
		if(pType != 'ct') {
			aKey += '-' + anotherSeq;
		}
		if(pType == 'ep') {
			aKey += '-' + mppgSrc;
		}
		
		var myTmsesCookieLastNum = 0;
		var myTmsesCookieFirstNum = 99999;
		var myTmsesCookieFirstKey = '';
		
		var myTmsesCookieJSON = fnGetMyTmsesCookieJSON();
		for(var key in myTmsesCookieJSON) {
			if(myTmsesCookieLastNum < myTmsesCookieJSON[key]) {
				myTmsesCookieLastNum = myTmsesCookieJSON[key];
			}
			if(myTmsesCookieFirstNum > myTmsesCookieJSON[key]) {
				myTmsesCookieFirstNum = myTmsesCookieJSON[key];
				myTmsesCookieFirstKey = key;
			}
		}
		var aVal = myTmsesCookieLastNum + 1;
		cookieVal[aKey] = aVal;
		
		// 쿠키 유효기간 현재로부터 1주일 뒤로 설정
		var date = new Date();
		date.setTime(date.getTime() + (7 * (24 * 60 * 60 * 1000)));
		var expires = '; expires=' + date.toUTCString();
		
		// 내가 본 정책자료 100개일 경우 맨 앞 하나 제거
		if(Object.keys(cookieVal).length > 100) {
			// JSON 맨앞 1개 제거
			delete cookieVal[myTmsesCookieFirstKey];
		}
		document.cookie = cookieName + '=' + JSON.stringify(cookieVal) + expires + '; path=/';
	}
	$('#myTmsesMenu > a > span').html(fnGetMyTmsesCookieCnt());
	$('.nav_menu').find('span').html(fnGetMyTmsesCookieCnt());
}

// 현재 저장된 쿠키 JSON으로 반환
function fnGetMyTmsesCookieJSON() {
	var cookieJSON = null;
	var cookieArr = document.cookie.split(';');
	for(var i=0; i<cookieArr.length; i++) {
		var cookieNm = cookieArr[i].substr(0, cookieArr[i].indexOf('='));
		cookieNm = cookieNm.replace(/^\s+|\s+$/g, '');
		if(cookieNm.indexOf(COOKIE_NAME) > -1) {
			var cookieVal = cookieArr[i].substr(cookieArr[i].indexOf('=') + 1);
			if(isNotEmpty(cookieVal)) {
				cookieJSON = JSON.parse(cookieVal);
				return cookieJSON;
			}
		}
	}
	return {};
}

// 쿠키에 저장되어 있는 본대책 JSON 중 첫번째 번호
function fnGetMyTmsesCookieLastNum() {
	var myTmsesCookieLastNum = 0;
	var myTmsesCookieJSON = fnGetMyTmsesCookieJSON();
	for(var key in myTmsesCookieJSON) {
		if(myTmsesCookieLastNum < myTmsesCookieJSON[key]) {
			myTmsesCookieLastNum = myTmsesCookieJSON[key];
		}
	}
	return myTmsesCookieLastNum;
}

// 쿠키에 저장되어 있는 본대책 JSON 중 마지막 번호
function fnGetMyTmsesCookieLastNum() {
	var myTmsesCookieLastNum = 0;
	var myTmsesCookieJSON = fnGetMyTmsesCookieJSON();
	for(var key in myTmsesCookieJSON) {
		if(myTmsesCookieLastNum < myTmsesCookieJSON[key]) {
			myTmsesCookieLastNum = myTmsesCookieJSON[key];
		}
	}
	return myTmsesCookieLastNum;
}

// 쿠키에 저장되어 있는 본대책 리스트(정렬)
function fnGetSortedMyTmsesCookieList() {
	var myTmsesCookieList = [];
	var cookieArr = document.cookie.split(';');
	for(var i=0; i<cookieArr.length; i++) {
		var cookieNm = cookieArr[i].substr(0, cookieArr[i].indexOf('='));
		cookieNm = cookieNm.replace(/^\s+|\s+$/g, '');
		
		if(cookieNm.indexOf(COOKIE_NAME) > -1) {
			var cookieVal = cookieArr[i].substr(cookieArr[i].indexOf('=') + 1);
			if(cookieVal != 'undefined') {
				var cookieMap = JSON.parse(cookieVal);
				for(var key in cookieMap) {
					myTmsesCookieList.push(key);
				}
				// 정렬 처리
				var sortedMyTmsesCookieList = myTmsesCookieList.sort(function(a, b) {
					return cookieMap[b] - cookieMap[a];
				});
			}
		}
	}
	return sortedMyTmsesCookieList;
}

// 유형, 시퀀스 넣어서 해당 정책자료 JSON 반환
function fnGetMyTmsesMap(pType, cteSeq, anotherSeq, mppgSrc) {
	var resultJSON = null;
	if(pType == 'ct') {	// CTE 본대책
		resultJSON = fnMakeCteJSON(cteSeq);
	} else if(pType == 'ep') {	// FRWD_HIST 추진내역(정책자료)
		resultJSON = fnMakeEpicJSON(cteSeq, anotherSeq, mppgSrc);
	} else if(pType == 'pe') {	// POLC_EXPNAON 정책해설
		resultJSON = fnMakePolcExpnaonJSON(cteSeq, anotherSeq);
	} else if(pType == 'pt') {	// PRES_TRND 언론동향
		resultJSON = fnMakePresTrndJSON(cteSeq, anotherSeq);
	} else if(pType == 'rd') {	// RSCH_DATA 연구자료
		resultJSON = fnMakeRschDataJSON(cteSeq, anotherSeq);
	} else if(pType == 'ps') { // POL_SUVY 여론조사
		resultJSON = fnMakePolSuvyJSON(cteSeq, anotherSeq);
	}
	return resultJSON;
}

// 본대책 쿠키 리스트 전체 출력
function fnShowMyTmsesCookieList() {
	var sortedMyTmsesCookieList = fnGetSortedMyTmsesCookieList();
	if(sortedMyTmsesCookieList) {
		$('#my_history > div > div.personal_top > h4 > em').html(sortedMyTmsesCookieList.length + '개');
		$('#sub_content > div.tabpanel.history > ul > li.tab01 > a > span').html(sortedMyTmsesCookieList.length + '개');
		$('#my_history ul.archive_board').html('');
		for(var i=0; i<sortedMyTmsesCookieList.length; i++) {
			var aCookie = sortedMyTmsesCookieList[i];
			var pType = aCookie.substring(0, 2);
			var restParams = aCookie.substring(2);
			
			var cteSeq = 0;
			var anotherSeq = 0;
			var mppgSrc = '';
			
			var restLists = restParams.split('-');
			if(restLists.length >= 1) {
				cteSeq = restLists[0];
			}
			if(restLists.length >= 2) {
				anotherSeq = restLists[1];
			}
			if(restLists.length >= 3) {
				mppgSrc = restLists[2];
			}
			var resultJSON = fnGetMyTmsesMap(pType, cteSeq, anotherSeq, mppgSrc);
			if(isNotEmpty(resultJSON)) {
				fnAddMyHistory(resultJSON);
			}
		}
	}
}

// 내가 본 정책자료 클릭 시 나의 시계열 정책 목록 업데이트
function fnUpdateMyTimeline() {
	// 나의 시계열 정책 목록 초기화
	$('#my_timeline ul.archive_board').html('');
	// 내가 본 정책자료 목록에서 체크리스트 조회
	var checkedList = [];
	var liOuterHTML = '';
	$('.check input[type="checkbox"]:checked').each(function() {
		var $li = $(this).closest('li');
		if($li.data('ptype') == 'ct') {
			checkedList.push($li.data('ptype') + $li.data('cteseq'));
		} else if($li.data('ptype') == 'ep') {
			checkedList.push($li.data('ptype') + $li.data('cteseq') + '-' + $li.data('anotherseq') + '-' + $li.data('mppgsrc'));
		} else {
			checkedList.push($li.data('ptype') + $li.data('cteseq') + '-' + $li.data('anotherseq'));
		}
		liOuterHTML += $("<div />").append($li.clone()).html();	// <li>...</li> 엘리먼트 HTML 복제
	}).promise().done(function () { 
		if(isNotEmpty(liOuterHTML)) {
			$('#my_timeline ul.archive_board').append(liOuterHTML);
			$('#my_timeline ul.archive_board > li').show();
		}
	});;
	
	// 나의 시계열 정책 개수 출력
	$('#my_timeline > div > div.personal_top > h4 > em').html(checkedList.length + '개');
	$('#sub_content > div.tabpanel.history > ul > li.tab02 > a > span').html(checkedList.length + '개');
	// 나의 시계열 정리
	$('#my_timeline ul.archive_board > li > div.check').each(function() {
		$(this).closest('li').removeClass('checked');
		var pType = $(this).closest('li').data('ptype');
		var cteSeq = $(this).closest('li').data('cteseq');
		var anotherSeq = $(this).closest('li').data('anotherseq');
		var mppgSrc = $(this).closest('li').data('mppgsrc');
		var nodeHtml = '';
		nodeHtml += '<button type="button" onclick="javascript:fnCancelMyTimeline(\'' + pType + '\', ' + cteSeq + ',' + anotherSeq + ',\'' + mppgSrc + '\');">';
		nodeHtml += '<i class="icon_delete"></i><span class="sr-only">지우기</span>';
		nodeHtml += '</button>';
		$(this).html(nodeHtml);
	});
}

// 우측 나의 시계열 정책 X 클릭 시 제거 및 업데이트
function fnCancelMyTimeline(pType, cteSeq, anotherSeq, mppgSrc) {
	if(pType == 'ct') {
		$('#my_history ul.archive_board > li[data-ptype="' + pType + '"][data-cteseq="' + cteSeq + '"] > div.check > input').prop('checked', false);
		$('#my_history ul.archive_board > li[data-ptype="' + pType + '"][data-cteseq="' + cteSeq + '"]').removeClass('checked');
	} else if(pType == 'ep') {
		$('#my_history ul.archive_board > li[data-ptype="' + pType + '"][data-cteseq="' + cteSeq + '"][data-anotherseq="' + anotherSeq + '"][data-mppgsrc="' + mppgSrc + '"] > div.check > input').prop('checked', false);
		$('#my_history ul.archive_board > li[data-ptype="' + pType + '"][data-cteseq="' + cteSeq + '"][data-anotherseq="' + anotherSeq + '"][data-mppgsrc="' + mppgSrc + '"]').removeClass('checked');
	} else {
		$('#my_history ul.archive_board > li[data-ptype="' + pType + '"][data-cteseq="' + cteSeq + '"][data-anotherseq="' + anotherSeq + '"] > div.check > input').prop('checked', false);
		$('#my_history ul.archive_board > li[data-ptype="' + pType + '"][data-cteseq="' + cteSeq + '"][data-anotherseq="' + anotherSeq + '"]').removeClass('checked');
	}
	fnUpdateMyTimeline();
	
	var totalLiCnt = $('#my_history ul.archive_board > li').not(':hidden').length;
	var checkedLiCnt = $('#my_history ul.archive_board > li[class=checked]').not(':hidden').length;
	if( totalLiCnt > 0 && (totalLiCnt == checkedLiCnt) ) {
		$('#selAllBtn').text('전체 해제');
	} else {
		$('#selAllBtn').text('전체 선택');
	}
}

// 좌측 내가 본 정책자료 1개 출력 
function fnAddMyHistory(resultJSON) {
	var historyIndex = $('#my_history ul.archive_board > li').length + 1;
	var nodeHtml = '';
	if(resultJSON.pType == 'ct') {
		nodeHtml += '<li data-ptype="' + resultJSON.pType + '" data-cteseq="' + resultJSON.cteSeq + '">';
	} else if(resultJSON.pType == 'ep') {
		nodeHtml += '<li data-ptype="' + resultJSON.pType + '" data-cteseq="' + resultJSON.cteSeq + '" data-anotherseq="' + resultJSON.anotherSeq + '" data-mppgsrc="' + resultJSON.mppgSrc + '">';
	} else {
		nodeHtml += '<li data-ptype="' + resultJSON.pType + '" data-cteseq="' + resultJSON.cteSeq + '" data-anotherseq="' + resultJSON.anotherSeq + '">';
	}
	nodeHtml += '<p class="subject">' + resultJSON.subjectBig1 + '<i class="location_arrow"></i>' + resultJSON.subjectMid1 + '<i class="location_arrow"></i>' + resultJSON.subjectSml1 + '</p>';
	if(isNotEmpty(resultJSON.subjectBig2)) {
		nodeHtml += '<p class="subject">' + resultJSON.subjectBig2 + '<i class="location_arrow"></i>' + resultJSON.subjectMid2 + '<i class="location_arrow"></i>' + resultJSON.subjectSml2 + '</p>';
	}
	if(isNotEmpty(resultJSON.subjectBig3)) {
		nodeHtml += '<p class="subject">' + resultJSON.subjectBig3 + '<i class="location_arrow"></i>' + resultJSON.subjectMid3 + '<i class="location_arrow"></i>' + resultJSON.subjectSml3 + '</p>';
	}
	if(resultJSON.pType != 'ct') {
		nodeHtml += '<p class="upper">' + resultJSON.upper + '</p>';
	}
	nodeHtml += '<div class="title">';
	if(resultJSON.pType == 'ct') {
		nodeHtml += '<strong><span>[본대책]</span> ' + resultJSON.title + '</strong>';
	} else if(resultJSON.pType == 'ep') {
		if(resultJSON.mppgSrc == 'CTE') {
			nodeHtml += '<strong><span>[본대책-정책자료]</span> ' + resultJSON.title + '</strong>';
		} else if(resultJSON.mppgSrc == 'FRWD') {
			nodeHtml += '<strong><span>[추진내역-정책자료]</span> ' + resultJSON.title + '</strong>';
		}
	} else if(resultJSON.pType == 'pe') {
		nodeHtml += '<strong><span>[정책해설]</span> ' + resultJSON.title + '</strong>';
	} else if(resultJSON.pType == 'pt') {
		nodeHtml += '<strong><span>[언론동향]</span> ' + resultJSON.title + '</strong>';
	} else if(resultJSON.pType == 'rd') {
		nodeHtml += '<strong><span>[연구자료]</span> ' + resultJSON.title + '</strong>';
	} else if(resultJSON.pType == 'ps') {
		nodeHtml += '<strong><span>[여론조사]</span> ' + resultJSON.title + '</strong>';
	}
	nodeHtml += '<p class="info">';
	if(resultJSON.infoName.trim() != '') {
		nodeHtml += '<span class="name">' + resultJSON.infoName + '</span>';
	}
	nodeHtml += '<span class="date">' + resultJSON.infoDate + '</span>';
	nodeHtml += '</p>';
	nodeHtml += '</div>';
	nodeHtml += '<div class="check">';
	nodeHtml += '<input id="item' + historyIndex + '" type="checkbox">';
	nodeHtml += '<label for="item' + historyIndex + '"><i class="glyphicon glyphicon-ok"></i></label>';
	nodeHtml += '</div>';
	nodeHtml += '</li>';
	$('#my_history ul.archive_board').append(nodeHtml);
}

// 좌측 내가 본 정책자료 1개 출력 
function fnAddMyHistory2(resultJSON) {
	var historyIndex = $('#my_history ul.archive_board > li').length + 1;
	
	var nodeHtml = '';
	
	var dvsn = resultJSON['DVSN'];
	var pType = '';
	var anotherSeq = '';
	var mppgSrc = '';
	var subjectBig1 = ''; 
	var subjectMid1 = ''; 
	var subjectSml1 = ''; 
	var subjectBig2 = ''; 
	var subjectMid2 = ''; 
	var subjectSml2 = ''; 
	var subjectBig3 = ''; 
	var subjectMid3 = ''; 
	var subjectSml3 = '';
	var upper = '';
	var infoName = '';
	var infoDate = '';
	if(dvsn == 'CTE') {
		pType = 'ct';
		pTitle = restoreHtml(resultJSON['CTE_NM']);
		upper = '';
		infoName = '';
		infoDate = resultJSON['PRST_DT'];
		subjectBig1 = resultJSON['RELT_THEM_BIG_1_NM'];
		subjectMid1 = resultJSON['RELT_THEM_MID_1_NM'];
		subjectSml1 = resultJSON['RELT_THEM_SML_1_NM'];
		subjectBig2 = resultJSON['RELT_THEM_BIG_2_NM'];
		subjectMid2 = resultJSON['RELT_THEM_MID_2_NM'];
		subjectSml2 = resultJSON['RELT_THEM_SML_2_NM'];
		subjectBig3 = resultJSON['RELT_THEM_BIG_3_NM'];
		subjectMid3 = resultJSON['RELT_THEM_MID_3_NM'];
		subjectSml3 = resultJSON['RELT_THEM_SML_3_NM'];
	} else {
		if(isNotEmpty(resultJSON['RELT_THEM_FULL_1_NM'])) {
			var subject1 = resultJSON['RELT_THEM_FULL_1_NM'].split('-');
			subjectBig1 = subject1[1];
			subjectMid1 = subject1[2];
			subjectSml1 = subject1[3];
		}
		if(isNotEmpty(resultJSON['RELT_THEM_FULL_2_NM'])) {
			var subject2 = resultJSON['RELT_THEM_FULL_2_NM'].split('-');
			subjectBig2 = subject2[1];
			subjectMid2 = subject2[2];
			subjectSml2 = subject2[3];
		}
		if(isNotEmpty(resultJSON['RELT_THEM_FULL_3_NM'])) {
			var subject3 = resultJSON['RELT_THEM_FULL_3_NM'].split('-');
			subjectBig3 = subject3[1];
			subjectMid3 = subject3[2];
			subjectSml3 = subject3[3];
		}
		if(dvsn == 'CTE_EPIC') {
			pType = 'ep';
			anotherSeq = resultJSON['EPIC_NUM'];
			mppgSrc = 'CTE';
			pTitle = restoreHtml(resultJSON['EPIC_TITLE']);
			upper = restoreHtml(resultJSON['CTE_NM']);
			if(isNotEmpty(resultJSON['GVDPT_BIG_NM'])) {
				upper += ' / ' + resultJSON['GVDPT_BIG_NM'];
			}
			upper += ' / ' + resultJSON['CTE_PRST_DT'];
			infoName = '';
			infoDate = resultJSON['EPIC_PBLC_DT'];
		} else if(dvsn == 'HIST_EPIC') {
			pType = 'ep';
			anotherSeq = resultJSON['EPIC_NUM'];
			mppgSrc = 'FRWD';
			pTitle = restoreHtml(resultJSON['EPIC_TITLE']);
			upper = restoreHtml(resultJSON['CTE_NM']);
			if(isNotEmpty(resultJSON['GVDPT_BIG_NM'])) {
				upper += ' / ' + resultJSON['GVDPT_BIG_NM'];
			}
			upper += ' / ' + resultJSON['CTE_PRST_DT'];
			infoName = '';
			infoDate = resultJSON['EPIC_PBLC_DT'];
		} else if(dvsn == 'POLC') {
			pType = 'pe';
			anotherSeq = resultJSON['POLC_EXPNAON_SEQ'];
			pTitle = restoreHtml(resultJSON['RPT_NM']);
			upper = resultJSON['CTE_NM'];
			if(isNotEmpty(resultJSON['GVDPT_BIG_NM'])) {
				upper += ' / ' + resultJSON['GVDPT_BIG_NM'];
			}
			upper += ' / ' + resultJSON['PRST_DT'];
			infoName = '';
			infoDate = resultJSON['PBLC_DT'];
		} else if(dvsn == 'PRES') {
			pType = 'pt';
			anotherSeq = resultJSON['PRES_TRND_SEQ'];
			pTitle = restoreHtml(resultJSON['RPT_NM']);
			upper = resultJSON['CTE_NM'];
			if(isNotEmpty(resultJSON['GVDPT_BIG_NM'])) {
				upper += ' / ' + resultJSON['GVDPT_BIG_NM'];
			}
			upper += ' / ' + resultJSON['PRST_DT'];
			infoName = '';
			infoDate = resultJSON['PBLC_DT'];
		} else if(dvsn == 'RSCH') {
			pType = 'rd';
			anotherSeq = resultJSON['RSCH_DATA_SEQ'];
			pTitle = restoreHtml(resultJSON['RPT_NM']);
			upper = resultJSON['CTE_NM'];
			if(isNotEmpty(resultJSON['GVDPT_BIG_NM'])) {
				upper += ' / ' + resultJSON['GVDPT_BIG_NM'];
			}
			upper += ' / ' + resultJSON['PRST_DT'];
			infoName = '';
			infoDate = resultJSON['PBLC_DT'];
		} else if(dvsn == 'POL') {
			pType = 'ps';
			anotherSeq = resultJSON['POL_SUVY_SEQ'];
			pTitle = restoreHtml(resultJSON['RPT_NM']);
			upper = resultJSON['CTE_NM'];
			if(isNotEmpty(resultJSON['GVDPT_BIG_NM'])) {
				upper += ' / ' + resultJSON['GVDPT_BIG_NM'];
			}
			upper += ' / ' + resultJSON['PRST_DT'];
			infoName = '';
			infoDate = resultJSON['PBLC_DT'];
		}
	}
	
	var reltThemBig1Cd = resultJSON['RELT_THEM_BIG_1_CD'];
	var reltThemBig2Cd = resultJSON['RELT_THEM_BIG_2_CD'];
	var reltThemBig3Cd = resultJSON['RELT_THEM_BIG_3_CD'];
	
	if(pType == 'ct') {
		nodeHtml += '<li data-ptype="' + pType + '" data-cteseq="' + resultJSON['CTE_SEQ'] + '" data-reltthembig1cd="' + reltThemBig1Cd + '" data-reltthembig2cd="' + reltThemBig2Cd +'" data-reltthembig3cd="' + reltThemBig3Cd + '">';
	} else if(pType == 'ep') {
		nodeHtml += '<li data-ptype="' + pType + '" data-cteseq="' + resultJSON['CTE_SEQ'] + '" data-anotherseq="' + anotherSeq + '" data-mppgsrc="' + mppgSrc + '" data-reltthembig1cd="' + reltThemBig1Cd + '" data-reltthembig2cd="' + reltThemBig2Cd +'" data-reltthembig3cd="' + reltThemBig3Cd + '">';
	} else {
		nodeHtml += '<li data-ptype="' + pType + '" data-cteseq="' + resultJSON['CTE_SEQ'] + '" data-anotherseq="' + anotherSeq + '" data-reltthembig1cd="' + reltThemBig1Cd + '" data-reltthembig2cd="' + reltThemBig2Cd +'" data-reltthembig3cd="' + reltThemBig3Cd + '">';
	}
	nodeHtml += '<p class="subject">' + subjectBig1 + '<i class="location_arrow"></i>' + subjectMid1 + '<i class="location_arrow"></i>' + subjectSml1 + '</p>';
	if(isNotEmpty(subjectBig2)) {
		nodeHtml += '<p class="subject">' + subjectBig2 + '<i class="location_arrow"></i>' + subjectMid2 + '<i class="location_arrow"></i>' + subjectSml2 + '</p>';
	}
	if(isNotEmpty(subjectBig3)) {
		nodeHtml += '<p class="subject">' + subjectBig3 + '<i class="location_arrow"></i>' + subjectMid3 + '<i class="location_arrow"></i>' + subjectSml3 + '</p>';
	}
	if(pType != 'ct') {
		nodeHtml += '<p class="upper">' + upper + '</p>';
	}
	nodeHtml += '<div class="title">';
	if(pType == 'ct') {
		nodeHtml += '<strong><span>[본대책]</span> ' + pTitle + '</strong>';
	} else if(pType == 'ep') {
		if(mppgSrc == 'CTE') {
			nodeHtml += '<strong><span>[본대책-정책자료]</span> ' + pTitle + '</strong>';
		} else if(mppgSrc == 'FRWD') {
			nodeHtml += '<strong><span>[추진내역-정책자료]</span> ' + pTitle + '</strong>';
		}
	} else if(pType == 'pe') {
		nodeHtml += '<strong><span>[정책해설]</span> ' + pTitle + '</strong>';
	} else if(pType == 'pt') {
		nodeHtml += '<strong><span>[언론동향]</span> ' + pTitle + '</strong>';
	} else if(pType == 'rd') {
		nodeHtml += '<strong><span>[연구자료]</span> ' + pTitle + '</strong>';
	} else if(pType == 'ps') {
		nodeHtml += '<strong><span>[여론조사]</span> ' + pTitle + '</strong>';
	}
	nodeHtml += '<p class="info">';
	if(infoName.trim() != '') {
		nodeHtml += '<span class="name">' + infoName + '</span>';
	}
	nodeHtml += '<span class="date">' + infoDate + '</span>';
	nodeHtml += '</p>';
	nodeHtml += '</div>';
	nodeHtml += '<div class="check">';
	nodeHtml += '<input id="item' + historyIndex + '" type="checkbox">';
	nodeHtml += '<label for="item' + historyIndex + '"><i class="glyphicon glyphicon-ok"></i></label>';
	nodeHtml += '</div>';
	nodeHtml += '</li>';
	$('#my_history ul.archive_board').append(nodeHtml);
}



// 나의 시계열 만들기 버튼 함수
// ex)
// document.cookie -> kdiTmses={"pt2022-100":6,"ps2541-1":2,"ps4864-1":3,"pe141-16":4,"pe2767-15":5,"ep8841-167465-CTE":7,"ep8661-164397-CTE":8,"ep8661-164348-CTE":9,"ct8841":10}
// checkedListStr  -> "CTE:8841;EPIC:8661-164348-CTE,8661-164397-CTE,8841-167465-CTE;POLC_EXPNAON:2767-15,141-16;PRES_TRND:2022-100;RSCH_DATA;POL_SUVY:4864-1,2541-1"
function fnMakeMyTimeline() {
	var target = arguments[0];
	var dvsn = arguments[1];
	var checkedListStr = '';	// 선택된 나의시계열 목록 텍스트 
	var cteStr = 'CTE:';
	var epicStr = 'EPIC:';
	var polcExpnaonStr = 'POLC_EXPNAON:';
	var presTrndStr = 'PRES_TRND:';
	var rschDataStr = 'RSCH_DATA:';
	var polSuvyStr = 'POL_SUVY:';
	
	// 내가 본 정책자료를 하나도 선택하지 않았을 경우 알림모달 표시
	if($('.check input[type="checkbox"]:checked').length == 0) {
		if(isNotEmpty(dvsn)) $('#moalCloseBtn').click(); // 모달 닫기
		alert('나의 시계열 정책을 선택해주세요.');
		return false;
	}
	
	var tempMyTmsesNm = $('#TEMP_MY_TMSES_NM');
	if(isNotEmpty(dvsn) && isEmpty(tempMyTmsesNm.val())) {
		alert('나의 시계열 제목을 입력해주세요.');
		tempMyTmsesNm.focus();
		return false;
	}
	
	// 나의시계열 목록 파라미터 텍스트 생성
	$('.check input[type="checkbox"]:checked').each(function() {
		var $li = $(this).closest('li');
		if($li.data('ptype') == 'ct') {
			cteStr += $li.data('cteseq') + ',';
		} else if($li.data('ptype') == 'ep') {
			epicStr += $li.data('cteseq') + '-' + $li.data('anotherseq') + '-' + $li.data('mppgsrc') + ',';
		} else if($li.data('ptype') == 'pe') {
			polcExpnaonStr += $li.data('cteseq') + '-' + $li.data('anotherseq') + ',';
		} else if($li.data('ptype') == 'pt') {
			presTrndStr += $li.data('cteseq') + '-' + $li.data('anotherseq') + ',';
		} else if($li.data('ptype') == 'rd') {
			rschDataStr += $li.data('cteseq') + '-' + $li.data('anotherseq') + ',';
		} else if($li.data('ptype') == 'ps') {
			polSuvyStr += $li.data('cteseq') + '-' + $li.data('anotherseq') + ',';
		}
	});
	
	// 맨 뒤 문자열 자르기
	cteStr = cteStr.substr(0, cteStr.length - 1);
	epicStr = epicStr.substr(0, epicStr.length - 1);
	polcExpnaonStr = polcExpnaonStr.substr(0, polcExpnaonStr.length - 1);
	presTrndStr = presTrndStr.substr(0, presTrndStr.length - 1);
	rschDataStr = rschDataStr.substr(0, rschDataStr.length - 1);
	polSuvyStr = polSuvyStr.substr(0, polSuvyStr.length - 1);
	
	// 선택된 나의시계열 목록 텍스트 파라미터 생성
	checkedListStr += cteStr + ';' + epicStr + ';' + polcExpnaonStr + ';' + presTrndStr + ';' + rschDataStr + ';' + polSuvyStr;
	
	
//	console.log(checkedListStr);
//	alert(checkedListStr);
//	return false;
	
	// Ajax로 페이지 내용 변경
//	$.ajax({
//		type: 'GET',
//		url: '/myTmses/result',
//		cache: false,
//		async: false,
//		success: function(response) {
//			if(isNotEmpty(response)) {
//				// 기존 화면 지우고
//				$('.timeline_create').closest('.container').css('display', 'none');
//				// 나의시계열 생성된 화면 띄우기
//				$('.timeline_create').closest('.container').after(response);	// <div id="timeline">
//				fnGetMyTimeLineList(checkedListStr);
//			}
//		},
//		error: function() {
//			return false;
//		}
//	});
	
	if(isEmpty(dvsn)) {
		$('#myTmsesResultForm').attr('action', '/myTmses/result');
	} else {
		$('#MY_TMSES_NM').val(tempMyTmsesNm.val());
		$('#myTmsesResultForm').attr('action', '/myTmses/result');
	}
	
	$('#checkedListStr').val(checkedListStr);
	$('#myTmsesResultForm').submit();
}

// 나의시계열 목록 조회
function fnGetMyTimeLineList(checkedListStr, target) {
	$.ajax({
		type: 'GET',
		url: '/myTmses/getMyTimeLineList',
		data: {
			checkedListStr : checkedListStr
		},
		cache: false,
		async: false,
		success: function(response) {
			if(isEmpty(response)) {
				alert('관리자에 의해 삭제/수정 중인 자료가 존재합니다.\n화면에 나타낼 자료가 없습니다.');
				return false;
			} else if(isNotEmpty(response)) {
				myTimeLineList = response;
				if(isNotEmpty(target)) {
					if(isNotEmpty($(target).data('my_tmses_seq')) && isNotEmpty(typeof(glMyTmsesSeq))) {
						glMyTmsesSeq = $(target).data('my_tmses_seq'); // 전역선언
					}
				}
				var sortedMyTimeLineList = myTimeLineList.sort(sortByInfoDateDesc);
				fnShowMyTimeLine(target, sortedMyTimeLineList, 'DESC', 'N', checkedListStr); // myTmsesList.jsp 파일 내 함수
			}
		},
		beforeSend: function() {
			$('#loading').show();
		},
		complete: function() {
			if(window.innerWidth < 993) {
				$('.center_wrap .scroll_area').mCustomScrollbar('destroy');
	        }
			setTimeout(function(){$('#loading').hide();}, 300);
		},
		error: function() {
			$('#loading').hide();
			return false;
		}
	});
}

// 비교 연산자 (날짜 오래된순)
function sortByInfoDateAsc(a, b) {
	// INFO_DT = 'YYYY.MM.DD'
	var aDateArr = a.INFO_DT.split('.');
	var aDate = new Date(aDateArr[0], aDateArr[1] - 1, aDateArr[2]);
	var bDateArr = b.INFO_DT.split('.');
	var bDate = new Date(bDateArr[0], bDateArr[1] - 1, bDateArr[2]);
	return aDate - bDate;
}

// 비교 연산자 (날짜 최신순)
function sortByInfoDateDesc(a, b) {
	// INFO_DT = 'YYYY.MM.DD'
	var aDateArr = a.INFO_DT.split('.');
	var aDate = new Date(aDateArr[0], aDateArr[1] - 1, aDateArr[2]);
	var bDateArr = b.INFO_DT.split('.');
	var bDate = new Date(bDateArr[0], bDateArr[1] - 1, bDateArr[2]);
	return bDate - aDate;
}

// 나의 시계열 재구성
function fnRemakeMyTimeLine() {
//	$('#timeline').closest('.container').css('display', 'none');
//	fnCancelAllMyHistory();
//	$('.timeline_create').closest('.container').css('display', 'block');
	location.reload();
}

// 내가 본 정책자료 전체 선택
function fnSelectAllMyHistory() {
	$('#my_history ul.archive_board > li > div.check > input').prop('checked', true);
	$('#my_history ul.archive_board > li').addClass('checked');
	fnUpdateMyTimeline();
}

// 내가 본 정책자료 전체 선택 취소
function fnCancelAllMyHistory() {
	$('#my_history ul.archive_board > li > div.check > input').prop('checked', false);
	$('#my_history ul.archive_board > li').removeClass('checked');
	fnUpdateMyTimeline();
}

// 내가 담은 정책자료
function fnTest111() {
	var target = arguments[0];
	var dvsn = arguments[1];
	
	window.sessionStorage.setItem('test', 'test1');
	
}

