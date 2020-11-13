function docReady(fn) {
	// see if DOM is already available
	if (document.readyState === "complete" || document.readyState === "interactive") {
			// call on next available tick
			setTimeout(fn, 1);
	} else {
			document.addEventListener("DOMContentLoaded", fn);
	}
}

docReady(function() {
	var lastMessage;
	function onScanSuccess(qrCodeMessage) {
		if (lastMessage !== qrCodeMessage) {
			lastMessage = qrCodeMessage;
			window.location.replace(qrCodeMessage);
		}
	}
	var html5QrcodeScanner = new Html5QrcodeScanner(
		"reader", { fps: 10, qrbox: 250 }, /* verbose= */ true);
	html5QrcodeScanner.render(onScanSuccess);
});