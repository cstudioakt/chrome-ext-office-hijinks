// We control everything (evil grin)

chrome.runtime.onMessage.addListener(function(request,sender, sendResponse){
	if(request.greeting == 'can I have the config please :)'){
		sendResponse({config: localStorage})
	}
})