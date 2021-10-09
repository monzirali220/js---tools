
function ajax (data){
  var xml = new XMLHttpRequest();
  var url = "";
  var method = "GET";
  var sender_data = {};
  var header = {};
  var str_sender_data = "";
  var success = function (){};
  var error = function (){};
  var complete = function (){};
  var available_methods = [
    "GET",
    "POST"
]
    if ("withCredentials" in xml){
      
    } else if (typeof XDomainRequest != "undefined"){
        xml = new XDomainRequest();
    } else{
      return xml;
    }
  // reset url
   url = data["url"];
  // reset method
  if (available_methods.includes(data["type"].toUpperCase())) {
    method = data["type"].toUpperCase();
  }else if(available_methods.includes(data["method"].toUpperCase())){
    method = data["method"].toUpperCase();
  }
  // reset sender data
  if(typeof(data["data"]) === typeof({})){
    sender_data = data["data"];
  }
  // reset header 
  if (typeof(header) === typeof(data["header"])) {
    header = data["header"];
  }
  // reset success function
  if (typeof(data["success"]) === typeof(success)) {
    success = data["success"];
  }
  // reset error function
  if(typeof(data["error"]) === typeof(error)){
    error = data["error"];
  }
  // reset complete function
  if(typeof(data["complete"]) === typeof(complete)){
    complete = data["complete"];
  }
  // open
  xml.onload = function(){
    success(xml.responseText, xml.status , xml);
  }
  xml.onloadend = complete;
  xml.onerror = error;
  xml.open(method , url , true);
  // set headers
  try{
  var items = Object.entries(header);
  for(var i = 0 ; i < items.length; i++){
    var item = items[i];
    xml.setRequestHeader(item[0] , item[1]);
  }}catch(e){
    console.log(e);
  }
  // set data
  try{
  var items = Object.entries(sender_data);
  for(var i = 0 ; i < items.length; i++){
    var item = items[i];
    if (i !== 0){
      str_sender_data += "&" + item[0] + "=" + item[1];
    }else{
      str_sender_data += item[0] + "=" + item[1];
    }
  }}catch(e){
    console.log(e);
  }
  
  if(str_sender_data != ""){
    xml.send(str_sender_data);
  }else{
    xml.send()
  }
}
ajax({
url:"style.css",
//header:{"Access-Control-Allow-Origin":"*"},
type:"GET",
success:function (re , g ,d){
  console.log(re);
  },
}
);
