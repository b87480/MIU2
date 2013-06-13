/*
 		Joshua Whitney  
 		MIU 1306 
		Assignement 1
 */

window.addEventListener("DOMContentLoaded", function(){


//Global Variables
var weaponChoice = ["--Weapon of Choice!--", "Gun", "Grenade", "Crowbar", "Bazooka", "Knife"],
	newCheck = "NO";
	errorMessage = $('message');
	mes1 = $('mes1');
	mes2 = $('mes2');
	mes3 = $('mes3');
	mes4 = $('mes4');
	mes5 = $('mes5');
	mes6 = $('mes6');
//END Global Variables

	function $(x){
		var myElement = document.getElementById(x);
		return myElement;
	}
	
	function radioButtons() {
		var radios = $('myform').sex;
		var arr = [];
		for (i=0, x=radios.length; i<x; i++) {
			if (radios[i].checked) {
				var newRadio = radios[i].value;
				arr.push(newRadio);
				return newRadio;
			}
		}
		
	}
	
	function hideAndShow(x){
		switch(x){
			case "on":
				$('myform').style.display = "none";
				$('clearzombie').style.display = "block";
				$('showzombie').style.display = "block";
				$('addzombie').style.display = "block";
				break;
			case "off":	
				$('myform').style.display = "block";
				$('clearzombie').style.display = "block";
				$('showzombie').style.display = "block";
				$('addzombie').style.display = "block";
				$('data').style.display = "none";
				break;
		}
	}

/*	function chooseWeapon(){
			var newTag = document.getElementsByTagName("form"); 
					selectIt = document.createElement('select');
					li = $('select');
					selectIt.setAttribute("id", "weapons");
				for(var i=0, x=weaponChoice.length; i<x; i++){
					var selection = document.createElement('option');
					var txt = weaponChoice[i];
					selection.setAttribute("value", txt);
					selection.innerHTML = txt;
					selectIt.appendChild(selection);
				}	
				li.appendChild(selectIt);
			}*/
	
	function clearData(){
		if(localStorage.length === 0){
			alert("There are no Zombies to Delete!");
		}else{
			var yes = confirm("Are you sure that you want to delete all Zombies?");
				if(yes==true){
					localStorage.clear();
					alert("All zombies have been deleted!");
				}else{
					alert("No zombies have been deleted");
				}
			
			window.location.reload();
		}
	}

	function checkValue(){
		if($('myform').priority.checked){
			newCheck = $('myform').priority.value;
			}else{
			newCheck = "NO";
		}
}
	
	function storeData(key){
		if(!key){
			var keyNum = Math.floor(Math.random()*1000001);
		}else{
			keyNum = key;
		}
		radioButtons();
		checkValue();
		var info = {};
			info.fname		 = ["User First Name", $('fname').value];
			info.lname 		 = ["User Last Name", $('lname').value];
			info.email 		 = ["User Email", $('clientemail').value];
			info.tele 		 = ["User Telephone Number", $('clienttelephone').value];
			info.zname 		 = ["Zombie's First Name", $('firstname').value];
			info.zlast 		 = ["Zombie's Last Name", $('lastname').value];
			info.sex 		 = ["Zombie's Sex", radioButtons()];
			info.prior 		 = ["Priority", newCheck];
			info.weap 		 = ["Your Weapon of Choice", $('weapons').value];
			info.write 		 = ["Users Reason", $('myform').text.value];
			info.rate 		 = ["User's Rating", $('stars').value];
			info.date 		 = ["You Want Them Killed On", $('deadLine').value];
			info.inv 		 = ["Invisible Info", $('customer').value];
	
	var newInfo = localStorage.setItem(keyNum, JSON.stringify(info));
	if(!key){
		alert("Zombie Has Been Added to The Hit List!");
	}else{
		alert("Zombie Saved!");
	}
		window.location.reload();
}


	function tempData() {
		for (var n in json) {
			var tempKey = Math.floor(Math.random()*1000001);
			localStorage.setItem(tempKey, JSON.stringify(json[n]));
			window.location.reload();
		}
	}

	function showZombie(){
		hideAndShow("on");
		if(localStorage.length === 0){
			alert("There are no Zombies in the Database! Temporary data has been added.");
			tempData();
			window.location.reload();
		}else{
		var newDiv = document.createElement('div');
		newDiv.setAttribute("id", "data");
		var newUl = document.createElement('ul');
		newDiv.appendChild(newUl);
		$('nav1').appendChild(newDiv);
		$('data');
		for(var i=0, x = localStorage.length; i<x; i++){
			var newLi = document.createElement('li');
			var navLi = document.createElement('li');
			newUl.appendChild(newLi);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			var json = JSON.parse(value);
			var newList = document.createElement('ul');
			newUl.style.listStyleType = "none";
			newList.style.listStyleType = "none";
			newUl.setAttribute("id", "mainUl");
			newLi.appendChild(newList);
			weaponImage(json.weap[1], newList);
			for(var n in json){
				var newList = document.createElement('li');
				newList.setAttribute("class", "print");
				newLi.appendChild(newList);
				var optSubText = json[n][0]+": "+json[n][1];
				newList.innerHTML = optSubText;
				newLi.appendChild(navLi);
				
			}
		newButtons(localStorage.key(i), navLi);
		}
	}
}
	function weaponImage(imgName, newList) {
		var liImage = document.createElement('li');
		liImage.setAttribute("id", "pic");
		newList.appendChild(liImage);
		var img = document.createElement('img');
		var setSrc = img.setAttribute("src", "images/images/"+ imgName +".png");
		liImage.appendChild(img);
	}
	function newButtons(key, navLi){
		navLi.style.marginTop = "10px";
		navLi.style.marginBottom = "20px";
		navLi.style.listStyleType = "none";
		var newLink = document.createElement('a');
		    newLink.href = "#";
		newLink.key = key;
		newLink.style.color = "red";
		newLink.style.padding = "5px";
		newLink.style.textDecoration = "none";
		
		var editText = "Edit Zombie";
		newLink.addEventListener("click", editItem);
		newLink.innerHTML = editText;
		navLi.appendChild(newLink);
		
		
		var del = document.createElement('a');
		    del.href = "#";
		del.key = key;
		del.style.padding = "5px";
		del.style.textDecoration = "none";
		del.style.color = "red";
		
		var delText = "Delete Zombie";
		del.addEventListener("click", delItem);
		del.innerHTML = delText;
		navLi.appendChild(del);
		
	}
	function delItem(){
		var check = confirm("Do you want to delete this Zombie?");
		if(check){
			localStorage.removeItem(this.key);
			window.location.reload();
		}else{
			alert("Zombie Is Still Going to be Killed!");
		}
	}
	function editItem(){
		
		hideAndShow("off");
		var value = localStorage.getItem(this.key);
		var info = JSON.parse(value);
		
		$('fname').value = info.fname[1];
		$('lname').value = info.lname[1];
		$('clientemail').value = info.email[1];
		$('clienttelephone').value = info.tele[1];
		$('firstname').value = info.zname[1];
		$('lastname').value = info.zlast[1];
		var radios = $('myform').sex;
		for(var i=0; i<radios.length; i++){
			if(radios[i].value == "male" && info.sex[1] == "male"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "female" && info.sex[1] == "female"){
				radios[i].setAttribute("checked", "checked");
			}
		}
		if(info.prior[1] == "YES"){
			$('immediate').setAttribute("checked", "checked");
		}
			$('weapons').value = info.weap[1];
			$('myform').text.value = info.write[1];
		    $('stars').value = info.rate[1];
			$('deadLine').value = info.date[1];
			$('customer').value = info.inv[1];
			
		addZombie.removeEventListener("click", storeData);
		$('button').value = "Save Zombie";
		var editZombie = $('button');
		editZombie.addEventListener("click", storeData);
		editZombie.key = this.key;
		
	} 
		
		//function formValidation(x){
			
	//}	
	

			
//chooseWeapon();



var addZombie = $('button');
	addZombie.addEventListener("click", storeData);
var clear = $('clearzombie');
	clear.addEventListener("click", clearData);
var show = $('showzombie');
	show.addEventListener("click", showZombie);







});

