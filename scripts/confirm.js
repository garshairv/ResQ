if (document.location.search.substring(1)) {
	const urlParams = new URLSearchParams(document.location.search.substring(1).toLowerCase());
	const restaurantID = urlParams.get('restaurantid');
	if (restaurantID != "") {
		let restaurant = db.collection("restaurants").doc(restaurantID);
		restaurant.onSnapshot(function(doc) {
			if (doc.exists) {
				$("#restaurant-name").html(doc.data().name);
				$("#restaurant-img-cropper img").attr("src", doc.data().img);

				firebase.auth().onAuthStateChanged(function(user) {
					if (user) {
						// User is signed in.
						let userRef = '/users/' + user.uid;

						$('input[value="Yes"]').click((e) => {
							e.preventDefault();
							let today = new Date();
							let dd = today.getDate();
							let mm = today.getMonth() + 1; 
							mm = (mm < 10) ? '0' + mm : mm;
							let yyyy = today.getFullYear();
							let hour = today.getHours();
							let min = today.getMinutes();
							let sec = today.getSeconds();
				
							let logID = '' + yyyy + mm + dd + hour + min + sec + restaurantID;
							let formattedDateTime = yyyy + '-' + mm + '-' + dd + ' ' + hour + ':' + min + ':' + sec;
				
							db.collection('logs').doc(logID).set({
								user: {},
								dateTime: formattedDateTime,
								restID: restaurantID,
								userID: db.doc(userRef)
							}).then(function () {
								console.log('New log added to firestore');
								window.location.assign('popup.html');
							}).catch(function (error) {
								console.log('Error adding new log: ' + error);
							});
						});
					} else {
						// User is signed out.
						$('input[value="Yes"]').click((e) => {
							e.preventDefault();
							window.location.assign('infoform.html?restaurantid=' + restaurantID);
						});
					}
				});
			} else {
				console.log("No matching restaurant ID.");
				alert("No matching restaurant ID.");
			}
		});
	} else {
		failRetrieval();
	}	
} else {
	failRetrieval();
}

function failRetrieval() {
	$("#restaurant-name").hide();
	$("#yes-no").hide();
	$("#confirm-prompt h3").html("No restaurant defined, please try again.");
	$("#restaurant-img-cropper img").attr("src", "https://dummyimage.com/300x300/999999/ffffff&text=Not+Found");
}