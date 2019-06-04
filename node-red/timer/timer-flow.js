[{
		"id": "f8553edb.06eea",
		"type": "server-events",
		"z": "bd27e39.e54b1a",
		"name": "SetTimer",
		"server": "742e8616.fb5c9",
		"event_type": "rhasspy_SetTimer",
		"x": 138.00003051757812,
		"y": 202,
		"wires": [["3c2d29fc.941f86"]]
	}, {
		"id": "3c2d29fc.941f86",
		"type": "function",
		"z": "bd27e39.e54b1a",
		"name": "Convert to Seconds",
		"func": "function splitSum(digitString) {\n    var value = 0\n    digitString.split(/\\s+/).forEach(function(digits) {\n        value += parseInt(digits)\n    })\n    \n    return value\n}\n\nhours = splitSum(msg.payload.event[\"hours\"] || \"0\")\nminutes = splitSum(msg.payload.event[\"minutes\"] || \"0\")\nseconds = splitSum(msg.payload.event[\"seconds\"] || \"0\")\nresume = msg.payload.event[\"resume\"]\n\ntimer_value = ((hours * 60 * 60) + (minutes * 60) + seconds)\n\nhours_text = \"\"\nminutes_text = \"\"\nseconds_text = \"\"\ntimer_text = \"\"\n\nif (hours > 1){\n    hours_text = hours + \" hours \"\n}\nif (hours == 1){\n    hours_text = \"1 hour \"\n}\nif (minutes > 0){\n    if (minutes > 1) {\n        minutes_text = minutes + \" minutes \"\n    }\n    else {\n        minutes_text = \"one minute \"\n    }\n}\nif (seconds > 0){\n    if (seconds > 1) {\n        seconds_text = seconds + \" seconds \"\n    }\n    else {\n        seconds_text = \"one second \"\n    }\n}\n\nif (hours > 0) {\n    if (minutes > 0){\n        if (seconds > 0){\n            timer_text = hours_text + \", \" + minutes_text +  \"and \" + seconds_text \n        }\n        else {\n            timer_text = hours_text + \"and \" + minutes_text\n        }\n    }\n    if (minutes < 1){\n        timer_text = hour_text + \"and \" + seconds_text\n    }\n}\nif (hours < 1 && minutes > 0){\n    if (seconds > 0){\n        timer_text = minutes_text +  \"and \" + seconds_text \n    }\n    else {\n        timer_text =minutes_text    \n    }\n}\nif (hours < 1 && minutes < 1){\n    timer_text = seconds_text \n}\n\noutput_text = \"I have set a timer for \" + timer_text + \".\"\n\n// Check if this is a resumed timer\nif (resume > 0) {\n    output_text = \"I will resume the timer with\" + timer_text + \".\"\n}   \n\nreturn {\n    text: output_text,\n    payload: 1,\n    timeout: timer_value\n}",
		"outputs": 1,
		"noerr": 0,
		"x": 478.0000305175781,
		"y": 214,
		"wires": [["a5664920.1a4d4", "86de0d19.147a7"]]
	}, {
		"id": "cc9c036f.e71f1",
		"type": "http request",
		"z": "bd27e39.e54b1a",
		"name": "Rhasspy - TTS",
		"method": "POST",
		"ret": "txt",
		"paytoqs": false,
		"url": "http://localhost:12101/api/text-to-speech",
		"tls": "",
		"proxy": "",
		"authType": "basic",
		"x": 1640,
		"y": 260,
		"wires": [[]]
	}, {
		"id": "a5664920.1a4d4",
		"type": "change",
		"z": "bd27e39.e54b1a",
		"name": "Confirm Timer",
		"rules": [{
				"t": "set",
				"p": "payload",
				"pt": "msg",
				"to": "text",
				"tot": "msg"
			}
		],
		"action": "",
		"property": "",
		"from": "",
		"to": "",
		"reg": false,
		"x": 794,
		"y": 220,
		"wires": [["cc9c036f.e71f1"]]
	}, {
		"id": "8f18b3ae.904fc",
		"type": "change",
		"z": "bd27e39.e54b1a",
		"name": "Done",
		"rules": [{
				"t": "set",
				"p": "payload",
				"pt": "msg",
				"to": "Timer is ready!",
				"tot": "str"
			}
		],
		"action": "",
		"property": "",
		"from": "",
		"to": "",
		"reg": false,
		"x": 1124,
		"y": 265,
		"wires": [["cc9c036f.e71f1"]]
	}, {
		"id": "fb027751.95a7b",
		"type": "server-events",
		"z": "bd27e39.e54b1a",
		"name": "StopTimer",
		"server": "742e8616.fb5c9",
		"event_type": "rhasspy_StopTimer",
		"x": 138.00003051757812,
		"y": 402,
		"wires": [["54a04456.a5d36c"]]
	}, {
		"id": "54a04456.a5d36c",
		"type": "change",
		"z": "bd27e39.e54b1a",
		"name": "Send Cancel",
		"rules": [{
				"t": "set",
				"p": "payload",
				"pt": "msg",
				"to": "cancel",
				"tot": "str"
			}
		],
		"action": "",
		"property": "",
		"from": "",
		"to": "",
		"reg": false,
		"x": 353.88336181640625,
		"y": 368.2500305175781,
		"wires": [["86de0d19.147a7", "c032c755.992138"]]
	}, {
		"id": "5b61b361.55bb0c",
		"type": "change",
		"z": "bd27e39.e54b1a",
		"name": "Timer Stopped!",
		"rules": [{
				"t": "set",
				"p": "payload",
				"pt": "msg",
				"to": "I have stopped the timer.",
				"tot": "str"
			}
		],
		"action": "",
		"property": "",
		"from": "",
		"to": "",
		"reg": false,
		"x": 924,
		"y": 480.99993896484375,
		"wires": [["cc9c036f.e71f1"]]
	}, {
		"id": "86de0d19.147a7",
		"type": "mytimeout",
		"z": "bd27e39.e54b1a",
		"name": "Timer",
		"outtopic": "",
		"outsafe": "on",
		"outwarning": "Warning",
		"outunsafe": "off",
		"warning": "5",
		"timer": "30",
		"debug": false,
		"ndebug": false,
		"ignoreCase": false,
		"repeat": false,
		"again": false,
		"x": 624.88330078125,
		"y": 311.4999694824219,
		"wires": [["d2e2b7f7.76068"], ["e1a36050.01cf7"]]
	}, {
		"id": "3d311b21.0335bc",
		"type": "inject",
		"z": "bd27e39.e54b1a",
		"name": "Time Left?",
		"topic": "",
		"payload": "true",
		"payloadType": "bool",
		"repeat": "",
		"crontab": "",
		"once": false,
		"onceDelay": 0.1,
		"x": 138.00003051757812,
		"y": 462,
		"wires": [["99b5b49a.ff1b2"]]
	}, {
		"id": "d2e2b7f7.76068",
		"type": "switch",
		"z": "bd27e39.e54b1a",
		"name": "Timer End Status",
		"property": "payload",
		"propertyType": "msg",
		"rules": [{
				"t": "eq",
				"v": "off",
				"vt": "str"
			}, {
				"t": "eq",
				"v": "Warning",
				"vt": "str"
			}, {
				"t": "eq",
				"v": "stop",
				"vt": "str"
			}
		],
		"checkall": "true",
		"repair": false,
		"outputs": 3,
		"x": 810,
		"y": 300,
		"wires": [["7ca72362.16338c"], [], ["ad030e0f.f2be9"]]
	}, {
		"id": "e1a36050.01cf7",
		"type": "function",
		"z": "bd27e39.e54b1a",
		"name": "Store time left!",
		"func": "var timer = flow.get('timer');\n\ntimer = msg.payload\n\nif (timer == -1) {\n    timer = 0\n}\n\nflow.set('timer', timer);\n\nreturn {\n    text: timer\n}",
		"outputs": 1,
		"noerr": 0,
		"x": 697.88330078125,
		"y": 386.6833190917969,
		"wires": [[]]
	}, {
		"id": "fc9692b7.bb68a8",
		"type": "inject",
		"z": "bd27e39.e54b1a",
		"name": "Start Timer",
		"topic": "",
		"payload": "{\"event\":{\"minutes\":\"20\",\"seconds\":\"20\"}}",
		"payloadType": "json",
		"repeat": "",
		"crontab": "",
		"once": false,
		"onceDelay": 0.1,
		"x": 148.00003051757812,
		"y": 162,
		"wires": [["3c2d29fc.941f86"]]
	}, {
		"id": "dff149fd.5c3da",
		"type": "inject",
		"z": "bd27e39.e54b1a",
		"name": "Stop Timer",
		"topic": "",
		"payload": "true",
		"payloadType": "bool",
		"repeat": "",
		"crontab": "",
		"once": false,
		"onceDelay": 0.1,
		"x": 138.00003051757812,
		"y": 362,
		"wires": [["54a04456.a5d36c"]]
	}, {
		"id": "f4fdb9fb.d55af8",
		"type": "change",
		"z": "bd27e39.e54b1a",
		"name": "Warning",
		"rules": [{
				"t": "set",
				"p": "payload",
				"pt": "msg",
				"to": "Timer is almost over!",
				"tot": "str"
			}
		],
		"action": "",
		"property": "",
		"from": "",
		"to": "",
		"reg": false,
		"x": 1132,
		"y": 323.9999694824219,
		"wires": [["cc9c036f.e71f1"]]
	}, {
		"id": "a6c575f4.5d3008",
		"type": "server-events",
		"z": "bd27e39.e54b1a",
		"name": "StatusTimer",
		"server": "742e8616.fb5c9",
		"event_type": "rhasspy_StatusTimer",
		"x": 148.00003051757812,
		"y": 502,
		"wires": [["99b5b49a.ff1b2"]]
	}, {
		"id": "99b5b49a.ff1b2",
		"type": "function",
		"z": "bd27e39.e54b1a",
		"name": "Read Time Left",
		"func": "var timer = flow.get('timer');\nvar timer_left = flow.get('timer_left');\n\n//node.warn(\"timer value: \"+ timer);\n//node.warn(\"timer_left value: \"+ timer_left);\n\nif (timer === 0){\n    output_text = \"No timer is set at this moment.\"\n}\nif (timer > 0 || timer_left > 0) {\n    if (timer_left > 0) {\n        timer = timer_left\n    }\n    // Message from preceeding node is in seconds - should be less than 24 hours (86400 seconds).\n    var time = (new Date(timer * 1000)).toUTCString().match(/(\\d\\d:\\d\\d:\\d\\d)/)[0];\n    node.warn(\"time formatted: \"+ time);\n    temp = time.split(':');\n    \n    var i;\n    for (i = 0; i < temp.length; i++) {\n      temp[i] = parseInt(temp[i])\n      //node.warn(temp[i]);\n    } \n    \n    var hours = temp[0]\n    var minutes = temp[1]\n    var seconds = temp[2]\n    \n    hours_text = \"\"\n    minutes_text = \"\"\n    seconds_text = \"\"\n    timer_text = \"\"\n    \n    if (hours > 1){\n        hours_text = hours + \" hours \"\n    }\n    if (hours == 1){\n        hours_text = \"1 hour \"\n    }\n    if (minutes > 0){\n        if (minutes > 1) {\n            minutes_text = minutes + \" minutes \"\n        }\n        else {\n            minutes_text = \"one minute \"\n        }\n    }\n    if (seconds > 0){\n        if (seconds > 1) {\n            seconds_text = seconds + \" seconds \"\n        }\n        else {\n            seconds_text = \"one second \"\n        }\n    }\n    \n    if (hours > 0) {\n        if (minutes > 0){\n            if (seconds > 0){\n                timer_text = hours_text + \", \" + minutes_text +  \"and \" + seconds_text \n            }\n            else {\n                timer_text = hours_text + \"and \" + minutes_text\n            }\n        }\n        if (minutes < 1){\n            timer_text = hour_text + \"and \" + seconds_text\n        }\n    }\n    if (hours < 1 && minutes > 0){\n        if (seconds > 0){\n            timer_text = minutes_text +  \"and \" + seconds_text \n        }\n        else {\n            timer_text =minutes_text    \n        }\n    }\n    if (hours < 1 && minutes < 1){\n        timer_text = seconds_text \n    }\n    output_text = \"The timer has \" + timer_text + \" left.\" \n    if (timer_left > 0) {\n        output_text = \"The timer is paused, it has \" + timer_text + \" left.\" \n    }\n}\n\n//node.warn(output_text);\nmsg.payload = output_text\n\nreturn msg;",
		"outputs": 1,
		"noerr": 0,
		"x": 699,
		"y": 604,
		"wires": [["cc9c036f.e71f1"]]
	}, {
		"id": "5dda80c6.d09a",
		"type": "inject",
		"z": "bd27e39.e54b1a",
		"name": "Pause Timer",
		"topic": "",
		"payload": "true",
		"payloadType": "bool",
		"repeat": "",
		"crontab": "",
		"once": false,
		"onceDelay": 0.1,
		"x": 148.00003051757812,
		"y": 262,
		"wires": [["bfa177b5.18156"]]
	}, {
		"id": "bfa177b5.18156",
		"type": "function",
		"z": "bd27e39.e54b1a",
		"name": "Stop and Store Time left",
		"func": "var timer = flow.get('timer');\n\nif (timer > 0) {\n   flow.set('timer_left', timer);\n}\n\nmsg.payload = \"stop\"\n\nreturn msg;",
		"outputs": 1,
		"noerr": 0,
		"x": 384.0000305175781,
		"y": 291,
		"wires": [["86de0d19.147a7"]]
	}, {
		"id": "ad030e0f.f2be9",
		"type": "change",
		"z": "bd27e39.e54b1a",
		"name": "Paused Timer",
		"rules": [{
				"t": "set",
				"p": "payload",
				"pt": "msg",
				"to": "I have paused the Timer.",
				"tot": "str"
			}
		],
		"action": "",
		"property": "",
		"from": "",
		"to": "",
		"reg": false,
		"x": 1031,
		"y": 384,
		"wires": [["cc9c036f.e71f1"]]
	}, {
		"id": "978a046.1921a78",
		"type": "inject",
		"z": "bd27e39.e54b1a",
		"name": "Resume Timer",
		"topic": "",
		"payload": "true",
		"payloadType": "bool",
		"repeat": "",
		"crontab": "",
		"once": false,
		"onceDelay": 0.1,
		"x": 158.00003051757812,
		"y": 62,
		"wires": [["258f8343.6914b4"]]
	}, {
		"id": "258f8343.6914b4",
		"type": "function",
		"z": "bd27e39.e54b1a",
		"name": "load stored time",
		"func": "var timer_left = flow.get('timer_left');\n\nvar mypayload = \"\"\n\nif (timer_left > 0) {\n    // convert to str time 00:00:00\n    var time = (new Date(timer_left * 1000)).toUTCString().match(/(\\d\\d:\\d\\d:\\d\\d)/)[0];\n    node.warn(\"timer left: \"+ time);\n    \n    //split str time \n    time = time.split(':');\n    \n    // format the time in the same matter as a HA event\n    mypayload = {\n        \"event\": {    \n            \"hours\":  time[0], \n            \"minutes\":  time[1], \n            \"seconds\":  time[2],\n            \"resume\":  1\n        }\n    }\n    \n    //Flush paused timer in flow:\n    flow.set('timer_left', 0);\n\n}\nelse {\n    // no stored timer!\n    mypayload = \"off\"\n}\nreturn {\n    payload: mypayload\n}",
		"outputs": 1,
		"noerr": 0,
		"x": 407.8833312988281,
		"y": 123.0833740234375,
		"wires": [["3a04cf04.d43b38"]]
	}, {
		"id": "2ba8897b.e32c76",
		"type": "change",
		"z": "bd27e39.e54b1a",
		"name": "No Paused Timer",
		"rules": [{
				"t": "set",
				"p": "payload",
				"pt": "msg",
				"to": "There is no paused timer to resume.",
				"tot": "str"
			}
		],
		"action": "",
		"property": "",
		"from": "",
		"to": "",
		"reg": false,
		"x": 968,
		"y": 144,
		"wires": [["cc9c036f.e71f1"]]
	}, {
		"id": "3a04cf04.d43b38",
		"type": "switch",
		"z": "bd27e39.e54b1a",
		"name": "Is there stored time?",
		"property": "payload",
		"propertyType": "msg",
		"rules": [{
				"t": "eq",
				"v": "off",
				"vt": "str"
			}, {
				"t": "else"
			}
		],
		"checkall": "true",
		"repair": false,
		"outputs": 2,
		"x": 663.88330078125,
		"y": 136.7166748046875,
		"wires": [["2ba8897b.e32c76"], ["3c2d29fc.941f86"]]
	}, {
		"id": "c032c755.992138",
		"type": "function",
		"z": "bd27e39.e54b1a",
		"name": "Flush stored timer",
		"func": "flow.set('timer_left', 0);\n\nreturn msg;",
		"outputs": 1,
		"noerr": 0,
		"x": 638,
		"y": 501,
		"wires": [["5b61b361.55bb0c"]]
	}, {
		"id": "c44f97d0.4dfa9",
		"type": "server-events",
		"z": "bd27e39.e54b1a",
		"name": "PauseTimer",
		"server": "742e8616.fb5c9",
		"event_type": "rhasspy_PauseTimer",
		"x": 148.00003051757812,
		"y": 302,
		"wires": [["bfa177b5.18156"]]
	}, {
		"id": "5c0cf01e.aca78",
		"type": "server-events",
		"z": "bd27e39.e54b1a",
		"name": "ResumeTimer",
		"server": "742e8616.fb5c9",
		"event_type": "rhasspy_ResumeTimer",
		"x": 148.00003051757812,
		"y": 102,
		"wires": [["258f8343.6914b4"]]
	}, {
		"id": "7ca72362.16338c",
		"type": "file in",
		"z": "bd27e39.e54b1a",
		"name": "load audio",
		"filename": "/data/kitchen-timer.wav",
		"format": "",
		"chunk": false,
		"sendError": false,
		"encoding": "none",
		"x": 1170,
		"y": 100,
		"wires": [["79710123.1e9e18"]]
	}, {
		"id": "4214357f.edf284",
		"type": "http request",
		"z": "bd27e39.e54b1a",
		"name": "Rhasspy - Play WAV",
		"method": "POST",
		"ret": "txt",
		"paytoqs": false,
		"url": "http://localhost:12101/api/play-wav",
		"tls": "",
		"proxy": "",
		"authType": "basic",
		"x": 1660,
		"y": 220,
		"wires": [[]]
	}, {
		"id": "79710123.1e9e18",
		"type": "function",
		"z": "bd27e39.e54b1a",
		"name": "set request header",
		"func": "msg.headers = {};\nmsg.headers['Content-Type'] = 'audio/wav';\nreturn msg;",
		"outputs": 1,
		"noerr": 0,
		"x": 1350,
		"y": 100,
		"wires": [["4214357f.edf284"]]
	}, {
		"id": "d43bb400.694f5",
		"type": "change",
		"z": "bd27e39.e54b1a",
		"name": "Set wavefile url",
		"rules": [{
				"t": "set",
				"p": "payload",
				"pt": "msg",
				"to": "http://192.168.1.8:8123/local/kitchen-timer.wav",
				"tot": "str"
			}
		],
		"action": "",
		"property": "",
		"from": "",
		"to": "",
		"reg": false,
		"x": 1248.88330078125,
		"y": 45.883331298828125,
		"wires": [[]]
	}, {
		"id": "742e8616.fb5c9",
		"type": "server",
		"z": "",
		"name": "HomeAssistant",
		"legacy": false,
		"hassio": false,
		"rejectUnauthorizedCerts": true,
		"ha_boolean": "y|yes|true|on|home|open",
		"connectionDelay": true
	}
]

