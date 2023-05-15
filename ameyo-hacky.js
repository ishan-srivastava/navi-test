console.log("hacky ameyo loaded");
// Create IE + others compatible event handler

// attach postMessage event to handler 

window.ameyo = window.ameyo || {};

ameyo.integration = (function() {
	var noOfChatsActive = 0;
	var chatIntegrationEnabled = true;
	var ameyoBaseUrl = "https://naviapp1.ameyo.net:8443";
	var RECORD_INFO_FOR_SHOW_CRM = "recordInfoForShowCrm";
	var customFunctions = new Array();
	var callbacks = {};
	var methodId = 0;

	function processPostMessage(event) {
		var theObject = JSON.parse(event.data);
		if (theObject.method == 'showCrm') {
			var phone = theObject.phone;
			var requestId = theObject.requestId;
			var additionalParams = theObject.additionalParams;
			if (customFunctions['showCrm']) {
				customFunctions['showCrm'].showCrm(phone, additionalParams,
						requestId);
			}
		} else if (theObject.method == 'showCrmDetailed') {
			var recordInfo = theObject.recordInfo;
			if (customFunctions['showCrmDetailed']) {
				customFunctions['showCrmDetailed'].showCrmDetailed(recordInfo);
			}
		} else if (theObject.method == 'ifPortOpened') {
			var data = theObject.isPortOpened;
			if (customFunctions['ifPortOpened']) {
				customFunctions['ifPortOpened'].ifPortOpened(data);
			}
		} else if (theObject.method == 'selectExtensionData') {
			var data = JSON.parse(JSON.parse(theObject.detail.data).data);
			var selectedPhone = JSON.parse(theObject.detail.data).selectedPhone;
			if (customFunctions['selectExtensionData']) {
				customFunctions['selectExtensionData'].selectExtensionData(
						data, selectedPhone);
			}

		} else if (theObject.method == 'intializeUI') {
			if (customFunctions['intializeUI']) {
				customFunctions['intializeUI'].intializeUI();
			}
		} else if (theObject.method == 'intializeExtensionInfo') {
			try {
				var extensionInfo = getExtensionInfo();
				setExtensionInfo(extensionInfo);
			} catch (e) {
			}
		} else if (theObject.method == 'logoutHandler') {
			var reason = theObject.reason;
			if (customFunctions['logoutHandler']) {
				customFunctions['logoutHandler'].logoutHandler(reason);
			}
		} else if (theObject.method == 'callInitiatedHandler') {
			var recordInfo = theObject.reason.thirdPartyData;
			if (recordInfo.recordId) {
				if (customFunctions['callInitiatedHandler']) {
					customFunctions['callInitiatedHandler']
							.callInitiatedHandler(recordInfo);
				}
			}
		} else if (theObject.method == 'failedDispositionNotifyHandler') {
			var reason = theObject.reason;
			if (customFunctions['failedDispositionNotifyHandler']) {
				customFunctions['failedDispositionNotifyHandler']
						.failedDispositionNotifyHandler(reason);
			}
		} else if (theObject.method == 'failedDoDialNotifyHandler') {
			var reason = theObject.reason;
			if (customFunctions['failedDoDialNotifyHandler']) {
				customFunctions['failedDoDialNotifyHandler']
						.failedDoDialNotifyHandler(reason);
			}
		} else if (theObject.method == 'loginHandler') {
			var reason = theObject.reason;
			if (customFunctions['loginHandler']) {
				customFunctions['loginHandler'].loginHandler(reason);
			}
		} else if (theObject.method == 'onLoadHandler') {
			if (customFunctions['onLoadHandler']) {
				customFunctions['onLoadHandler'].onLoadHandler();
			}
		} else if (theObject.method == 'loginStatusHandler') {
			var reason = theObject.reason;
			if (customFunctions['loginStatusHandler']) {
				customFunctions['loginStatusHandler']
						.loginStatusHandler(reason);
			}
		} else if (theObject.method == 'forceLoginHandler') {
			var reason = theObject.reason;
			if (customFunctions['forceLoginHandler']) {
				customFunctions['forceLoginHandler'].forceLoginHandler(reason);
			}
		} else if (theObject.method == 'selectExtensionHandler') {
			var reason = theObject.reason;
			var userCustomerCRTInfo = theObject.userCustomerCRTInfo;
			if (customFunctions['selectExtensionHandler']) {
				customFunctions['selectExtensionHandler']
						.selectExtensionHandler(reason, userCustomerCRTInfo);
			}
		} else if (theObject.method == 'modifyExtensionHandler') {
			var reason = theObject.reason;
			var userCustomerCRTInfo = theObject.userCustomerCRTInfo;
			if (customFunctions['modifyExtensionHandler']) {
				customFunctions['modifyExtensionHandler']
						.modifyExtensionHandler(reason, userCustomerCRTInfo);
			}
		} else if (theObject.method == 'selectCampaignHandler') {
			var reason = theObject.reason;
			if (customFunctions['selectCampaignHandler']) {
				customFunctions['selectCampaignHandler']
						.selectCampaignHandler(reason);
			}
		} else if (theObject.method == 'autoCallOnHandler') {
			var reason = theObject.reason;
			if (customFunctions['autoCallOnHandler']) {
				customFunctions['autoCallOnHandler'].autoCallOnHandler(reason);
			}
		} else if (theObject.method == 'autoCallOffHandler') {
			var reason = theObject.reason;
			if (customFunctions['autoCallOffHandler']) {
				customFunctions['autoCallOffHandler']
						.autoCallOffHandler(reason);
			}
		} else if (theObject.method == 'readyHandler') {
			var reason = theObject.reason;
			if (customFunctions['readyHandler']) {
				customFunctions['readyHandler'].readyHandler(reason);
			}
		} else if (theObject.method == 'breakHandler') {
			var reason = theObject.reason;
			if (customFunctions['breakHandler']) {
				customFunctions['breakHandler'].breakHandler(reason);
			}
		} else if (theObject.method == 'hangupHandler') {
			var reason = theObject.reason;
			var userCustomerCRTInfo = theObject.userCustomerCRTInfo;
			if (customFunctions['hangupHandler']) {
				customFunctions['hangupHandler'].hangupHandler(reason,
						userCustomerCRTInfo);
			}
		} else if (theObject.method == 'handleUserCrtUpdatedHandler') {
			var reason = theObject.reason;
			if (customFunctions['handleUserCrtUpdatedHandler']) {
				customFunctions['handleUserCrtUpdatedHandler']
						.handleUserCrtUpdatedHandler(reason);
			}
		} else if (theObject.method == 'disposeCall') {
			var userCustomerCRTInfo = theObject.userCustomerCRTInfo;
			if (customFunctions['disposeCall']) {
				customFunctions['disposeCall'].disposeCall(userCustomerCRTInfo);
			}
		} else if (theObject.method == 'chatDisposed') {
			if (noOfChatsActive > 0) {
				noOfChatsActive = noOfChatsActive - 1;
			}
			resizeChatIFrameToFitContent(noOfChatsActive);

			var agentCRTId = theObject.agentCRTId;
			if (customFunctions['chatDisposed']) {
				customFunctions['chatDisposed'].chatDisposed(agentCRTId);
			}
		} else if (theObject.method == 'chatInitiated') {
			if (theObject.customerId == null) {
				theObject.customerId = -1;
			}
			postMessageToChatIframe(theObject, ameyoBaseUrl);
			noOfChatsActive = noOfChatsActive + 1;
			resizeChatIFrameToFitContent(noOfChatsActive);
			var objectToSend = {};
			objectToSend.agentCRTId = theObject.agentCRTId;
			objectToSend.sessionId = theObject.sessionId;
			objectToSend.customerCRTId = theObject.customerCRTId;
			objectToSend.campaignId = theObject.campaignId;
			objectToSend.customerId = theObject.customerId;
			objectToSend.name = theObject.customerData.name;
			objectToSend.phone = theObject.customerData.phone;
			objectToSend.email = theObject.customerData.email;
			objectToSend.chatId = theObject.chatId;
			if (customFunctions['chatInitiated']) {
				customFunctions['chatInitiated'].chatInitiated(
						theObject.agentCRTId, theObject.customerCRTId,
						theObject.campaignId, theObject.customerId,
						theObject.customerData.name, theObject.chatId);
			}
		} else if (theObject.method == 'chatTransferredOrConferred') {
			if (theObject.customerId == null) {
				theObject.customerId = -1;
			}
			postMessageToChatIframe(theObject, ameyoBaseUrl);
			noOfChatsActive = noOfChatsActive + 1;
			resizeChatIFrameToFitContent(noOfChatsActive);
			var objectToSend = {};
			objectToSend.agentCRTId = theObject.agentCRTId;
			objectToSend.sessionId = theObject.sessionId;
			objectToSend.customerCRTId = theObject.customerCRTId;
			objectToSend.campaignId = theObject.campaignId;
			objectToSend.customerId = theObject.customerId;
			objectToSend.name = theObject.customerData.name;
			objectToSend.phone = theObject.customerData.phone;
			objectToSend.email = theObject.customerData.email;
			objectToSend.chatId = theObject.chatId;
			if (customFunctions['chatTransferredOrConferred']) {
				customFunctions['chatTransferredOrConferred']
						.chatTransferredOrConferred(theObject.agentCRTId
								.toString(),
								theObject.customerCRTId.toString(),
								theObject.campaignId.toString(),
								theObject.customerName.toString(),
								theObject.chatId.toString());
			}
		} else if (theObject.method == 'chatEnded') {
			var agentCRTId = theObject.agentCRTId;
			if (customFunctions['chatEnded']) {
				customFunctions['chatEnded'].chatEnded(agentCRTId);
			}
		} else if (theObject.method == 'transferToPhoneHandler') {
			var reason = theObject.reason;
			var userCustomerCRTInfo = theObject.userCustomerCRTInfo;
			if (customFunctions['transferToPhoneHandler']) {
				customFunctions['transferToPhoneHandler']
						.transferToPhoneHandler(reason, userCustomerCRTInfo);
			}
		} else if (theObject.method == 'transferInCallHandler') {
			var reason = theObject.reason;
			var userCustomerCRTInfo = theObject.userCustomerCRTInfo;
			if (customFunctions['transferInCallHandler']) {
				customFunctions['transferInCallHandler'].transferInCallHandler(
						reason, userCustomerCRTInfo);
			}
		} else if (theObject.method == 'transferToAQHandler') {
			var reason = theObject.reason;
			var userCustomerCRTInfo = theObject.userCustomerCRTInfo;
			if (customFunctions['transferToAQHandler']) {
				customFunctions['transferToAQHandler'].transferToAQHandler(
						reason, userCustomerCRTInfo);
			}
		} else if (theObject.method == 'transferToIVRHandler') {
			var reason = theObject.reason;
			var userCustomerCRTInfo = theObject.userCustomerCRTInfo;
			if (customFunctions['transferToIVRHandler']) {
				customFunctions['transferToIVRHandler']
						.transferToIVRHandler(reason);
			}
		} else if (theObject.method == 'transferToUserHandler') {
			var reason = theObject.reason;
			var userCustomerCRTInfo = theObject.userCustomerCRTInfo;
			if (customFunctions['transferToUserHandler']) {
				customFunctions['transferToUserHandler'].transferToUserHandler(
						reason, userCustomerCRTInfo);
			}
		} else if (theObject.method == 'transferToCampaignHandler') {
			var reason = theObject.reason;
			var userCustomerCRTInfo = theObject.userCustomerCRTInfo;
			if (customFunctions['transferToCampaignHandler']) {
				customFunctions['transferToCampaignHandler']
						.transferToCampaignHandler(reason, userCustomerCRTInfo);
			}
		} else if (theObject.method == 'conferWithPhoneHandler') {
			var reason = theObject.reason;
			var userCustomerCRTInfo = theObject.userCustomerCRTInfo;
			if (customFunctions['conferWithPhoneHandler']) {
				customFunctions['conferWithPhoneHandler']
						.conferWithPhoneHandler(reason, userCustomerCRTInfo);
			}
		} else if (theObject.method == 'conferWithTPVHandler') {
			var reason = theObject.reason;
			var userCustomerCRTInfo = theObject.userCustomerCRTInfo;
			if (customFunctions['conferWithTPVHandler']) {
				customFunctions['conferWithTPVHandler'].conferWithTPVHandler(
						reason, userCustomerCRTInfo);
			}
		} else if (theObject.method == 'conferWithUserHandler') {
			var reason = theObject.reason;
			var userCustomerCRTInfo = theObject.userCustomerCRTInfo;
			if (customFunctions['conferWithUserHandler']) {
				customFunctions['conferWithUserHandler'].conferWithUserHandler(
						reason, userCustomerCRTInfo);
			}
		} else if (theObject.method == 'conferWithLocalIVRHandler') {
			var reason = theObject.reason;
			var userCustomerCRTInfo = theObject.userCustomerCRTInfo;
			if (customFunctions['conferWithLocalIVRHandler']) {
				customFunctions['conferWithLocalIVRHandler']
						.conferWithLocalIVRHandler(reason, userCustomerCRTInfo);
			}
		} else if (theObject.method == 'getDispositionCodesHandler') {
			var reason = theObject.dispositionCodes;
			if (customFunctions['getDispositionCodesHandler']) {
				customFunctions['getDispositionCodesHandler']
						.getDispositionCodesHandler(reason);
			}
		} else if (theObject.method == 'getDispositionCodeWithClassHandler') {
			var reason = theObject.dispositionCodes;
			if (customFunctions['getDispositionCodeWithClassHandler']) {
				customFunctions['getDispositionCodeWithClassHandler']
						.getDispositionCodeWithClassHandler(reason);
			}
		} else if (theObject.method == 'disposeCallByDispositionCodeHandler') {
			var reason = theObject.reason;
			if (customFunctions['disposeCallByDispositionCodeHandler']) {
				customFunctions['disposeCallByDispositionCodeHandler']
						.disposeCallByDispositionCodeHandler(reason);
			}
		} else if (theObject.method == 'disposeAndDialHandler') {
			var reason = theObject.reason;
			if (customFunctions['disposeAndDialHandler']) {
				customFunctions['disposeAndDialHandler']
						.disposeAndDialHandler(reason);
			}
		} else if (theObject.method == 'initializeChat') {
			postMessageToChatIframe(theObject, ameyoBaseUrl);
		} else if (theObject.method == 'closeChatWindow') {
			postMessageToChatIframe(theObject, ameyoBaseUrl);
		} else if (theObject.method == 'getDispositions') {
			onDispositionsFetched(theObject.data);
		} else if (theObject.method == 'highlightCrm') {
			refreshTelephony(theObject.agentCRT);
			if (customFunctions['highlightCrm']) {
				customFunctions['highlightCrm']
						.highlightCrm(theObject.agentCRT);
			}
		} else if (theObject.method == 'callbackSuccessNotifyHandler') {
			var reason = theObject.reason;
			if (customFunctions['callbackSuccessNotifyHandler']) {
				customFunctions['callbackSuccessNotifyHandler']
						.callbackSuccessNotifyHandler(reason);
			}
		} else if (theObject.method == 'failedScheduleCallBackNotifyHandler') {
			var reason = theObject.reason;
			if (customFunctions['failedScheduleCallBackNotifyHandler']) {
				customFunctions['failedScheduleCallBackNotifyHandler']
						.failedScheduleCallBackNotifyHandler(reason);
			}
		} else if (theObject.method == 'webRTCTabHandler') {
			var reason = theObject.reason;
			if (customFunctions['webRTCTabHandler']) {
				customFunctions['webRTCTabHandler'].webRTCTabHandler(reason);
			} else {
				webRTCTabHandler();
			}
		} else {
			var methodName = theObject.method;
			if (callbacks.hasOwnProperty(methodName)) {
				for ( var i in callbacks[methodName]) {
					callbacks[methodName][i](theObject);
				}
				delete callbacks[methodName];
			}
		}
	}
	function addIframeForChatWindow() {
		ifrm = document.createElement("IFRAME");
		ifrm.setAttribute("src", ameyoBaseUrl
				+ "/ameyochatjs/embeddedUserChat-default.html");
		ifrm.setAttribute("name", "userChatIframe");
		ifrm.setAttribute("id", "userChatIframe");
		ifrm.setAttribute("marginheight", "1");
		ifrm.setAttribute("marginwidth", "1");
		ifrm.setAttribute("seamless", "seamless");
		ifrm.setAttribute("scrolling", "no");
		ifrm.setAttribute("allowtransparency", "true");
		ifrm.frameBorder = 0;
		ifrm.style.position = "fixed";
		ifrm.style.backgroundColor = "transparent";
		ifrm.style.height = "0px";
		ifrm.style.bottom = "0";
		ifrm.style.left = "0";
		ifrm.style.zIndex = "100";
		document.body.appendChild(ifrm);
	}

	function loginFromExtension(userName, password) {
		var theObject = {
			method : 'loginFromExtension',
			userName : userName,
			password : password,
		};
		var message = JSON.stringify(theObject);
		var origin1 = document.location.origin;
		window.parent.postMessage(message, origin1);
	}
	function forceLoginFromExtension(userName, password) {
		var theObject = {
			method : 'forceLoginFromExtension',
			userName : userName,
			password : password,
		};
		var message = JSON.stringify(theObject);
		var origin1 = document.location.origin;
		window.parent.postMessage(message, origin1);
	}
	function logOutFromExtension() {
		var theObject = {
			method : 'logOutFromExtension'
		};
		var message = JSON.stringify(theObject);
		var origin1 = document.location.origin;
		window.parent.postMessage(message, origin1);
	}

	function doPostMessage(message, callback) {

		if (callback) {
			var theObject = JSON.parse(message);
			theObject.requestMethodId = registerCallback(theObject.method,
					callback);
			message = JSON.stringify(theObject);
		}
		var theIframe = document.getElementById("ameyoIframe");
		var origin = ameyoBaseUrl;
		theIframe.contentWindow.postMessage(message, origin);
	}

	function registerCallback(method, callback) {
		method += '_' + methodId;
		callbacks[method] = [ callback ];
		methodId++;
		return method;
	}
	function customShowCrm(phone, additionalParams, requestId) {
		var crmPage = document.getElementById('crm');
		var html = "<br> Sending request to get  CRM data for phone: " + phone
				+ " Additional Parameters" + additionalParams
				+ "<br>  Recieving Response.."
				+ "<br> Populating CRM data on the basis of" + "response.."
				+ "<br>Done";
		crmPage.innerHTML = crmPage.innerHTML + "<br>" + html;
	}

	function postMessageToChatIframe(theObject, origin) {
		try {
			var theIframe = document.getElementById("userChatIframe");
			theIframe.contentWindow.postMessage(theObject, origin);
		} catch (e) {
		}
	}

	function resizeChatIFrameToFitContent(noOfChatsActive) {
		try {
			var theIframe = document.getElementById("userChatIframe");
			if (noOfChatsActive == 0) {
				theIframe.style.width = "0px";
				theIframe.style.height = "0px";
				return;
			}
			var width = noOfChatsActive * 270;
			theIframe.style.width = width + "px";
			theIframe.style.height = "345px";
		} catch (e) {
		}
	}
	return {

		initialize : function() {
			window.onload = function() {
				var head = document.getElementsByTagName('head')[0];
				var link = document.createElement('link');
				link.rel = 'stylesheet';
				link.type = 'text/css';
				link.href = ameyoBaseUrl + '/ameyochatjs/ameyochat.css';
				link.media = 'all';
				head.appendChild(link);
				if (chatIntegrationEnabled) {
					addIframeForChatWindow();
				}
			};
			
			var scripts = document.getElementsByTagName("script"),
		    src = scripts[scripts.length-1].src;
			var url = (new URL(src));
			var domain = url.hostname;
			var protocol = url.protocol; 
			var port = url.port; 
			var baseUrl = protocol+"//"+domain+":"+port;
			console.log("going to set baseUrl :: "+baseUrl);
			ameyo.integration.setBaseUrl(baseUrl);	

			if (window.attachEvent) {
				window.attachEvent('onmessage', processPostMessage);
			} else {
				window.addEventListener('message', processPostMessage, false);
			}

		},

		api : {
			setRecordInfoForShowCrm : function(showCrmrequestId, recordId,
					recordName, recordType, additionalInfo, callback) {

				doPostMessage(JSON.stringify({
					method : RECORD_INFO_FOR_SHOW_CRM,
					showCrmrequestId : showCrmrequestId,
					recordId : recordId,
					recordName : recordName,
					recordType : recordType,
					additionalInfo : additionalInfo
				}), callback);
			}

		},

		disposeNDial : function(dispositionCode, phone) {
			if (typeof dispositionCode == 'undefined') {
				alert('no disposition code to dispose call');
				return;
			}

			if (typeof dispositionCode == 'Callback') {
				alert("disposition code cannot be Callback");
				return;
			}

			if (typeof phone == 'undefined') {
				alert('no number to dial');
				return;
			}
			var theObject = {
				method : 'disposeNDial',
				dispositionCode : dispositionCode,
				phone : phone,
			};
			var message = JSON.stringify(theObject);
			doPostMessage(message);
		},

		getDispositionCodes : function(campaignId) {
			var theObject = {
				method : 'getDispositionCodes',
				campaignId : campaignId,
			};
			var message = JSON.stringify(theObject);
			doPostMessage(message);
		},

		getDispositionCodesWithDispositionClass : function(campaignId) {
			var theObject = {
				method : 'getDispositionCodesWithDispositionClass',
				campaignId : campaignId,
			};
			var message = JSON.stringify(theObject);
			doPostMessage(message);
		},

		disposeCallByDisposition : function(dispositionCode, crtObjectId,
				additionalNote) {
			if (typeof dispositionCode == 'undefined') {
				alert('no disposition code to dispose call');
				return;
			}
			var theObject = {
				method : 'disposeCallByDisposition',
				dispositionCode : dispositionCode,
				crtObjectId : crtObjectId,
				additionalParameters : additionalNote
			};
			var message = JSON.stringify(theObject);
			doPostMessage(message);
		},

		doLogin : function(username, password, authPolicy) {
			var theObject = {
				method : 'doLogin',
				username : username,
				password : password,
				authPolicy : authPolicy
			};
			var message = JSON.stringify(theObject);
			doPostMessage(message);
		},

		doForceLogin : function() {
			var theObject = {
				method : 'doForceLogin',
			};
			var message = JSON.stringify(theObject);
			doPostMessage(message);
		},

		doLogout : function() {
			var theObject = {
				method : 'doLogout'
			};
			var message = JSON.stringify(theObject);
			doPostMessage(message);
		},

		disposeAndScheduleCallback : function(phoneNumber, selfCallBack,
				callBackTime, callBackParams, additionalParameters) {
			var theObject = {
				method : 'disposeAndScheduleCallback',
				phoneNumber : phoneNumber,
				selfCallBack : selfCallBack,
				callBackTime : callBackTime,
				callBackParams : callBackParams,
				additionalParameters : additionalParameters
			};
			var message = JSON.stringify(theObject);
			doPostMessage(message);
		},

		populateNumberInDialBox : function(phone) {
			var theObject = {
				method : 'populateNumberInDialBox',
				phone : phone,
			};
			var message = JSON.stringify(theObject);
			doPostMessage(message);
		},

		selectExtension : function(callContextId, phone) {

			var theObject = {
				method : 'selectExtension',
				callContextId : callContextId,
				phone : phone
			};
			var message = JSON.stringify(theObject);
			doPostMessage(message);
		},
		doDial : function(phone, customerId, additionalParams, searchable,
				customerRecords, campaignId) {
			var theObject = {
				method : 'doDial',
				phone : phone,
				additionalParams : additionalParams,
				searchable : searchable,
				customerRecords : customerRecords,
				campaignId : campaignId
			};
			var message = JSON.stringify(theObject);
			doPostMessage(message);
		},

		setLoginInfo : function(loginCredential) {

			var theObject = {
				method : 'setLoginCredentials',
				userId : loginCredential.userName,
				password : loginCredential.password
			};
			var message = JSON.stringify(theObject);
			doPostMessage(message);

		},

		setExtensionInfo : function(extensionInfo) {

			var theObject = {
				method : 'setExtensionMetadata',
				extensionName : extensionInfo.name,
				extensionPhone : extensionInfo.phone
			};
			var message = JSON.stringify(theObject);
			doPostMessage(message);

		},

		hideUI : function(uiElements) {
			var theObject = {
				method : 'configureUI',
				uiElements : uiElements
			};
			var message = JSON.stringify(theObject);
			doPostMessage(message);
		},

		disposeChat : function(obj) {
			var theObject = {
				method : 'disposeChatById',
				data : obj,
			};
			var message = JSON.stringify(theObject);
			doPostMessage(message);
		},

		refreshTelephony : function(crtobjectId) {
			var theObject = {
				method : 'refreshTelephony',
				data : crtobjectId,
			};
			var message = JSON.stringify(theObject);
			doPostMessage(message);
		},

		setRecordInfoForCrt : function(crtObjectId, recordId, recordName,
				recordType, additionalInfo) {
			var theObject = {
				method : 'setRecordInfoForCrt',
				crtObjectId : crtObjectId,
				recordId : recordId,
				recordName : recordName,
				recordType : recordType,
				additionalInfo : additionalInfo
			};
			var message = JSON.stringify(theObject);
			doPostMessage(message);
		},
		
		registerCustomFunction : function(key, value) {
			customFunctions[key] = value;
		},
		
		setBaseUrl : function(baseUrl) {
			if(window.ameyoBaseUrl === undefined) {
				window.ameyoBaseUrl = baseUrl;
			}
			else {
				ameyoBaseUrl = baseUrl;
			}
		},
		
		getBaseUrl : function() {
			return ameyoBaseUrl;
		}

	}
})();
ameyo.integration.initialize();
