const fs = require("fs");
const login = require("fb-chat-api");


login({appState: JSON.parse(fs.readFileSync('./session.json', 'utf8'))}, (err, api) => {
    if(err) return console.error(err);

    api.setOptions({listenEvents: true});

    api.listenMqtt((err, event) => {
        if(err) return console.error(err);

        api.markAsRead(event.threadID, (err) => {
            if(err) console.error(err);
        });
  	if (event.type == "message") {
        require('./handler.js')(api,event)
    }
    });
});
