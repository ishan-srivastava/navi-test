console.log('__AMEYO__ : script loaded v2');

var setRecordForShowCrmCallback = function(response) {
	if (response.result) {
		var crmPage = document.getElementById('crmPage');
		var html = "<p>" + "Response : SetRecordShowCrm ->"
			+ response.result.status + "</p>";
		crmPage.innerHTML = html + "<br>" + crmPage.innerHTML;

	}
};
function customShowCrm(phone, additionalParams, requestId) {
	var crmPage = document.getElementById('crmPage');
	var html = "Sending request to get CRM data for phone: " + phone
		+ " Additional Parameters" + additionalParams
		+ "<br> Recieving Response.."
		+ "<br> Populating CRM data on the basis of response.."
		+ "<br>Done";
	crmPage.innerHTML = html + "<br>" + crmPage.innerHTML;
	ameyo.integration.api.setRecordInfoForShowCrm(requestId, requestId, phone,
		setRecordForShowCrmCallback);
}

function handleLogin(reason) {
	console.log('__AMEYO__ : handleLogin', reason);

	var crmPage = document.getElementById('crmPage');
	var html = "<p>" + "Logged In : " + reason + "</p>";
	crmPage.innerHTML = html + "<br>" + crmPage.innerHTML;
}
function handleLogout(reason) {
	console.log('__AMEYO__ : handleLogout', reason);

	var crmPage = document.getElementById('crmPage');
	var html = "Logged out : " + reason;
	crmPage.innerHTML = html + "<br>" + crmPage.innerHTML;
}
function handleOnLoad() {
	console.log('__AMEYO__ : handleOnLoad');

	var crmPage = document.getElementById('crmPage');
	var html = "On Load";
	crmPage.innerHTML = html + "<br>" + crmPage.innerHTML;
}

function handleLoginStatus(status) {
	console.log('__AMEYO__ : handleLoginStatus', status);
	var crmPage = document.getElementById('crmPage');
	var html = "handleLoginStatus : " + status;
	crmPage.innerHTML = html + "<br>" + crmPage.innerHTML;
}

function handleForceLogin(reason) {
	console.log('__AMEYO__ : handleForceLogin', reason);
	var crmPage = document.getElementById('crmPage');
	var html = "Force logged In : " + reason;
	crmPage.innerHTML = html + "<br>" + crmPage.innerHTML;
}

function handleSelectExtension(status, userCustomerCRTInfo) {
	console.log('__AMEYO__ : handleSelectExtension', status, userCustomerCRTInfo);
	var crmPage = document.getElementById('crmPage');
	var html = "Select Extention : " + status + "<br> User CRT info : "
		+ userCustomerCRTInfo.userCrtObjectId + "<br> Customer CRT Info : "
		+ userCustomerCRTInfo.customerCrtObjectId;
	crmPage.innerHTML = html + "<br>" + crmPage.innerHTML;
}

function handleModifyExtension(status, userCustomerCRTInfo) {
	console.log('__AMEYO__ : handleModifyExtension', status, userCustomerCRTInfo);
	var crmPage = document.getElementById('crmPage');
	var html = "Modify Extention : " + status + "<br> User CRT info : "
		+ userCustomerCRTInfo.userCrtObjectId + "<br> Customer CRT Info : "
		+ userCustomerCRTInfo.customerCrtObjectId;
	crmPage.innerHTML = html + "<br>" + crmPage.innerHTML;
}

function handleSelectCampaign(reason) {
	console.log('__AMEYO__ : handleSelectCampaign', reason);
	var crmPage = document.getElementById('crmPage');
	var html = "Select Campaign : " + reason;
	crmPage.innerHTML = html + "<br>" + crmPage.innerHTML;
}

function handleAutoCallOn(status) {
	console.log('__AMEYO__ : handleAutoCallOn', status);
	var crmPage = document.getElementById('crmPage');
	var html = "Auto Call On : " + status;
	crmPage.innerHTML = html + "<br>" + crmPage.innerHTML;
}

function handleAutoCallOff(status) {
	console.log('__AMEYO__ : handleAutoCallOff', status);
	var crmPage = document.getElementById('crmPage');
	var html = "Auto Call Off : " + status;
	crmPage.innerHTML = html + "<br>" + crmPage.innerHTML;
}

function handleReady(status) {
	console.log('__AMEYO__ : handleReady', status);
	var crmPage = document.getElementById('crmPage');
	var html = "Ready : " + status;
	crmPage.innerHTML = html + "<br>" + crmPage.innerHTML;
}

function handleBreak(status) {
	console.log('__AMEYO__ : handleBreak', status);
	var crmPage = document.getElementById('crmPage');
	var html = "Break : " + status;
	crmPage.innerHTML = html + "<br>" + crmPage.innerHTML;
}



function handleHangup(reason, userCustomerCRTInfo) {
	console.log('__AMEYO__ : handleHangup', reason, userCustomerCRTInfo);
	var crmPage = document.getElementById('crmPage');
	var html = "Hangup : " + reason + "<br> User CRT info : "
		+ userCustomerCRTInfo.userCrtObjectId + "<br> Customer CRT Info : "
		+ userCustomerCRTInfo.customerCrtObjectId;
	crmPage.innerHTML = html + "<br>" + crmPage.innerHTML;
}


function handleTransferToPhone(reason, userCustomerCRTInfo) {
	console.log('__AMEYO__ : handleTransferToPhone', reason, userCustomerCRTInfo);
	var crmPage = document.getElementById('crmPage');
	var html = "Transfer to Phone : " + reason + "<br> User CRT info : "
		+ userCustomerCRTInfo.userCrtObjectId + "<br> Customer CRT Info : "
		+ userCustomerCRTInfo.customerCrtObjectId;
	crmPage.innerHTML = html + "<br>" + crmPage.innerHTML;
}

function handleTransferInCall(reason, userCustomerCRTInfo) {
	console.log('__AMEYO__ : handleTransferInCall', reason, userCustomerCRTInfo);
	var crmPage = document.getElementById('crmPage');
	var html = "Transfer in Call : " + reason + "<br> User CRT info : "
		+ userCustomerCRTInfo.userCrtObjectId + "<br> Customer CRT Info : "
		+ userCustomerCRTInfo.customerCrtObjectId;
	crmPage.innerHTML = html + "<br>" + crmPage.innerHTML;
}

function handleTransferToAQ(reason, userCustomerCRTInfo) {
	console.log('__AMEYO__ : handleTransferToAQ', reason, userCustomerCRTInfo);
	var crmPage = document.getElementById('crmPage');
	var html = "Transfer to AQ : " + reason + "<br> User CRT info : "
		+ userCustomerCRTInfo.userCrtObjectId + "<br> Customer CRT Info : "
		+ userCustomerCRTInfo.customerCrtObjectId;
	crmPage.innerHTML = html + "<br>" + crmPage.innerHTML;
}

function handleTransferToIVR(reason, userCustomerCRTInfo) {
	console.log('__AMEYO__ : handleTransferToIVR', reason, userCustomerCRTInfo);
	var crmPage = document.getElementById('crmPage');
	var html = "Transfer to IVR : " + reason + "<br> User CRT info : "
		+ userCustomerCRTInfo.userCrtObjectId + "<br> Customer CRT Info : "
		+ userCustomerCRTInfo.customerCrtObjectId;
	crmPage.innerHTML = html + "<br>" + crmPage.innerHTML;
}

function handleTransferToUser(reason, userCustomerCRTInfo) {
	console.log('__AMEYO__ : handleTransferToUser', reason, userCustomerCRTInfo);
	var crmPage = document.getElementById('crmPage');
	var html = "Transfer to user : " + reason + "<br> User CRT info : "
		+ userCustomerCRTInfo.userCrtObjectId + "<br> Customer CRT Info : "
		+ userCustomerCRTInfo.customerCrtObjectId;
	crmPage.innerHTML = html + "<br>" + crmPage.innerHTML;
}

function handleTransferToCampaign(reason, userCustomerCRTInfo) {
	console.log('__AMEYO__ : handleTransferToCampaign', reason, userCustomerCRTInfo);
	var crmPage = document.getElementById('crmPage');
	var html = "Transfer to campaign : " + reason + "<br> User CRT info : "
		+ userCustomerCRTInfo.userCrtObjectId + "<br> Customer CRT Info : "
		+ userCustomerCRTInfo.customerCrtObjectId;
	crmPage.innerHTML = html + "<br>" + crmPage.innerHTML;
}

function handleConferWithPhone(reason, userCustomerCRTInfo) {
	console.log('__AMEYO__ : handleConferWithPhone', reason, userCustomerCRTInfo);
	var crmPage = document.getElementById('crmPage');
	var html = "Confer With Phone : " + reason + "<br> User CRT info : "
		+ userCustomerCRTInfo.userCrtObjectId + "<br> Customer CRT Info : "
		+ userCustomerCRTInfo.customerCrtObjectId;
	crmPage.innerHTML = html + "<br>" + crmPage.innerHTML;
}

function handleConferWithTPV(reason, userCustomerCRTInfo) {
	console.log('__AMEYO__ : handleConferWithTPV', reason, userCustomerCRTInfo);
	var crmPage = document.getElementById('crmPage');
	var html = "Confer With TPV : " + reason + "<br> User CRT info : "
		+ userCustomerCRTInfo.userCrtObjectId + "<br> Customer CRT Info : "
		+ userCustomerCRTInfo.customerCrtObjectId;
	crmPage.innerHTML = html + "<br>" + crmPage.innerHTML;
}

function handleConferWithUser(reason, userCustomerCRTInfo) {
	console.log('__AMEYO__ : handleConferWithUser', reason, userCustomerCRTInfo);
	var crmPage = document.getElementById('crmPage');
	var html = "Confer With User : " + reason + "<br> User CRT info : "
		+ userCustomerCRTInfo.userCrtObjectId + "<br> Customer CRT Info : "
		+ userCustomerCRTInfo.customerCrtObjectId;
	crmPage.innerHTML = html + "<br>" + crmPage.innerHTML;
}

function handleConferWithLocalIVR(reason, userCustomerCRTInfo) {
	console.log('__AMEYO__ : handleConferWithLocalIVR', reason, userCustomerCRTInfo);
	var crmPage = document.getElementById('crmPage');
	var html = "Confer With Local IVR : " + reason + "<br> User CRT info : "
		+ userCustomerCRTInfo.userCrtObjectId + "<br> Customer CRT Info : "
		+ userCustomerCRTInfo.customerCrtObjectId;
	crmPage.innerHTML = html + "<br>" + crmPage.innerHTML;
}

function getExtensionInfo(reason) {
	console.log('__AMEYO__ : getExtensionInfo', reason);
	var crmPage = document.getElementById('crmPage');
	var html = "Get Extension : " + reason;
	crmPage.innerHTML = html + "<br>" + crmPage.innerHTML;
}
function customCallDispose(userCustomerCRTInfo) {
	console.log('__AMEYO__ : customCallDispose', userCustomerCRTInfo);
	var crmPage = document.getElementById('crmPage');
	var html = "Hello.disposed <br> User CRT info : "
		+ userCustomerCRTInfo.userCrtObjectId + "<br> Customer CRT Info : "
		+ userCustomerCRTInfo.customerCrtObjectId
	crmPage.innerHTML = html + "<br>" + crmPage.innerHTML;
	alert(userCustomerCRTInfo);
}


function handleDisposeAndDial(userCustomerCRTInfo) {
	console.log('__AMEYO__ : handleDisposeAndDial', userCustomerCRTInfo);
	var crmPage = document.getElementById('crmPage');
	var html = "Dispose and dial completed <br> User CRT info : "
		+ userCustomerCRTInfo.userCrtObjectId + "<br> Customer CRT Info : "
		+ userCustomerCRTInfo.customerCrtObjectId
	crmPage.innerHTML = html + "<br>" + crmPage.innerHTML;
}

function intializeUI(params) {
	console.log('__AMEYO__ : initializeUI', params);
}


// function handleDisposeAndDial(reason, userCustomerCRTInfo) {
// 	var crmPage = document.getElementById('crmPage');
// 	var html = "Dispose and dial completed : " + reason + "<br> User CRT info : "
// 			+ userCustomerCRTInfo.userCrtObjectId + "<br> Customer CRT Info : "
// 			+ userCustomerCRTInfo.customerCrtObjectId;
// 	crmPage.innerHTML = html + "<br>" + crmPage.innerHTML;
// }



function showCrmDetailedCustom(recordInfo) {
	console.log('__AMEYO__ : showCrmDetailedCustom', recordInfo);
	var crmPage = document.getElementById('crmPage');
	var html = "Record Id : " + recordInfo.recordId + "<br> User CRT info : "
		+ recordInfo.userCustomerCRTInfo.userCrtObjectId
		+ "<br> Customer CRT Info : "
		+ recordInfo.userCustomerCRTInfo.customerCrtObjectId
	crmPage.innerHTML = html + "<br>" + crmPage.innerHTML;
	alert(recordInfo.recordId);
}

customIntegration = {};
customIntegration.showCrm = customShowCrm;
customIntegration.showCrmDetailed = showCrmDetailedCustom;
customIntegration.loginHandler = handleLogin;
customIntegration.forceLoginHandler = handleForceLogin;
customIntegration.logoutHandler = handleLogout;
customIntegration.onLoadHandler = handleOnLoad;
customIntegration.loginStatusHandler = handleLoginStatus;
customIntegration.selectExtensionHandler = handleSelectExtension;
customIntegration.modifyExtensionHandler = handleModifyExtension;
customIntegration.selectCampaignHandler = handleSelectCampaign;
customIntegration.autoCallOnHandler = handleAutoCallOn;
customIntegration.autoCallOffHandler = handleAutoCallOff;
customIntegration.readyHandler = handleReady;
customIntegration.breakHandler = handleBreak;
customIntegration.hangupHandler = handleHangup;
customIntegration.transferToPhoneHandler = handleTransferToPhone;
customIntegration.transferInCallHandler = handleTransferInCall;
customIntegration.transferToAQHandler = handleTransferToAQ;
customIntegration.transferToIVRHandler = handleTransferToIVR;
customIntegration.transferToUserHandler = handleTransferToUser;
customIntegration.transferToCampaignHandler = handleTransferToCampaign;
customIntegration.conferWithPhoneHandler = handleConferWithPhone;
customIntegration.conferWithTPVHandler = handleConferWithTPV;
customIntegration.conferWithUserHandler = handleConferWithUser;
customIntegration.conferWithLocalIVRHandler = handleConferWithLocalIVR;
customIntegration.handleDisposeCall = customCallDispose;
customIntegration.disposeAndDialHandler = handleDisposeAndDial;
customIntegration.intializeUI = intializeUI;

//customIntegration.disposeCall = customCallDispose;
//customIntegration.disposeAndDialHandler = handleDisposeAndDial;

ameyo.integration.registerCustomFunction("showCrm", customIntegration);
ameyo.integration.registerCustomFunction("loginHandler", customIntegration);
ameyo.integration.registerCustomFunction("logoutHandler", customIntegration);
ameyo.integration.registerCustomFunction("onLoadHandler", customIntegration);
ameyo.integration.registerCustomFunction("loginStatusHandler",customIntegration);
ameyo.integration.registerCustomFunction("forceLoginHandler", customIntegration);
ameyo.integration.registerCustomFunction("selectExtensionHandler",customIntegration);
ameyo.integration.registerCustomFunction("modifyExtensionHandler",customIntegration);
ameyo.integration.registerCustomFunction("selectCampaignHandler",customIntegration);
ameyo.integration.registerCustomFunction("autoCallOnHandler", customIntegration);
ameyo.integration.registerCustomFunction("autoCallOffHandler",customIntegration);
ameyo.integration.registerCustomFunction("readyHandler", customIntegration);
ameyo.integration.registerCustomFunction("breakHandler", customIntegration);
ameyo.integration.registerCustomFunction("hangupHandler", customIntegration);
ameyo.integration.registerCustomFunction("transferToPhoneHandler",customIntegration);
ameyo.integration.registerCustomFunction("transferInCallHandler",customIntegration);
ameyo.integration.registerCustomFunction("transferToAQHandler",customIntegration);
ameyo.integration.registerCustomFunction("transferToIVRHandler",customIntegration);
ameyo.integration.registerCustomFunction("transferToUserHandler",customIntegration);
ameyo.integration.registerCustomFunction("transferToCampaignHandler",customIntegration);
ameyo.integration.registerCustomFunction("conferWithPhoneHandler",customIntegration);
ameyo.integration.registerCustomFunction("conferWithTPVHandler",customIntegration);
ameyo.integration.registerCustomFunction("conferWithUserHandler",customIntegration);
ameyo.integration.registerCustomFunction("conferWithLocalIVRHandler",customIntegration);
ameyo.integration.registerCustomFunction("handleDisposeCall", customIntegration);
ameyo.integration.registerCustomFunction("showCrmDetailed", customIntegration);
ameyo.integration.registerCustomFunction("disposeAndDialHandler",customIntegration);
ameyo.integration.registerCustomFunction("intializeUI",customIntegration);
