const EventEmitter = require("events");

const emitter = new EventEmitter();

emitter.on("customEvent", (data) => {
    console.log("Event triggered with message : ", data)
});

emitter.on("start", (data) => {
    console.log(`Starting Process ${data} ...`)
    emitter.emit("processInAction");
});

emitter.on("processInAction", () => {
    console.log("Process in action !!!")
})

emitter.emit("customEvent","Hello Event Emitter!!!")
emitter.emit("start", "1")
