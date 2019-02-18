(function() {
	window.Main = {};
	Main.Page = (function() {
		var mosq = null;
		function Page() {
			var _this = this;
			mosq = new Mosquitto();

			$('#connect-button').click(function() {
				return _this.connect();
			});
			$('#disconnect-button').click(function() {
				return _this.disconnect();
			});
			$('#subscribe-button').click(function() {
				return _this.subscribe();
			});
			$('#unsubscribe-button').click(function() {
				return _this.unsubscribe();
			});
			
			mosq.onconnect = function(rc){
				var p = document.createElement("p");
				var topic = $('#pub-subscribe-text')[0].value;
				p.innerHTML = "Conectado ao Broker!";
				$("#debug").append(p);
				mosq.subscribe(topic, 0);
				
			};
			mosq.ondisconnect = function(rc){
				var p = document.createElement("p");
				var url = "ws://iot.eclipse.org/ws";
				
				p.innerHTML = "A conexão com o broker foi perdida";
				$("#debug").append(p);								
			};
			mosq.onmessage = function(topic, payload, qos){
				var p1 = document.createElement("p1");				
				var p2 = document.createElement("p2");				
				var payload_parseado = payload.split(";");
				         
				p1.innerHTML = "<center>Upload<br><img src='upload.png' width='40' height='40'>"+payload_parseado[0]+"Mbits/s</center>";
				p2.innerHTML = "<center>Download<br><img src='download.png' width='40' height='40'>"+payload_parseado[1]+"Mbits/s</center>";
				
				$("#taxa_upload").html(p1);
				$("#taxa_download").html(p2);				
			};
		}
		Page.prototype.connect = function(){
			var url = "ws://iot.eclipse.org/ws";
			mosq.connect(url);
		};
		Page.prototype.disconnect = function(){
			mosq.disconnect();
		};
		Page.prototype.subscribe = function(){
			var topic = $('#sub-topic-text')[0].value;
			mosq.subscribe(topic, 0);
		};
		Page.prototype.unsubscribe = function(){
			var topic = $('#sub-topic-text')[0].value;
			mosq.unsubscribe(topic);
		};
		
		return Page;
	})();
	$(function(){
		return Main.controller = new Main.Page;
	});
}).call(this);

