var dgram = require('dgram');
var date = new Date();
var message = new Buffer('<14>1 2012-09-04T14:09:32.801 SRXEdge RT_FLOW - RT_FLOW_SESSION_CLOSE [junos@2636.1.1.1.2.41 reason="TCP FIN" source-address="10.0.1.250" source-port="58474" destination-address="23.23.2.106" destination-port="443" service-name="junos-https" nat-source-address="50.76.52.162" nat-source-port="19428" nat-destination-address="23.23.2.106" nat-destination-port="443" src-nat-rule-name="1" dst-nat-rule-name="None" protocol-id="6" policy-name="1" source-zone-name="Trust" destination-zone-name="Untrust" session-id-32="6560" packets-from-client="14" bytes-from-client="3752" packets-from-server="13" bytes-from-server="6318" elapsed-time="2" application="UNKNOWN" nested-application="UNKNOWN" username="N/A" roles="N/A" packet-incoming-interface="vlan.0" encrypted="No "]');
var client = dgram.createSocket("udp4");

function sendMessage(message) {
  buff = new Buffer(message);
  client.send(buff, 0, buff.length, 1234, "localhost");
};

setInterval(sendMessage,5000,message);