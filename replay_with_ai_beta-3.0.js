// ==SE_module==
// name: replay_with_ai_beta
// displayName: AI Respond
// description: A straightforward AI for automatic responses to your friends
// version: 3.0
// author: Suleyman Laarabi
// ==/SE_module==

var networking = require("networking");
var messaging = require("messaging");
var config = require("config");
var im = require("interface-manager");
var ipc = require("ipc");
var javaInterfaces = require("java-interfaces");
var hooker = require("hooker");
var events = require("events");


(function () {
    'use strict';

    var conversationToolboxContext = {
        events: [],
    };

    var myAISenderID = "b42f1f70-5a8b-4c53-8c25-34e7ec9e6781";

    function getMyAIConversationID(callback) {
        messaging.getOneOnOneConversationIds([myAISenderID], function (error, result) {
            var myAIConversationID = result[0].conversationId;
            callback(myAIConversationID);
        });
    }
    var MyAI = /** @class */ (function () {
        function MyAI() {
            var _this = this;
            this.onMessageWaitList = [];
            getMyAIConversationID(function (myAIConversationID) {
                _this.myAIConversationID = myAIConversationID;
            });
            events.onConversationUpdated(function (update) {
                if (update.messages[0].messageDescriptor.conversationId.toString() ===
                    _this.myAIConversationID) {
                    _this.onMessageWaitList.forEach(function (callback) {
                        callback(update.messages[0].serialize());
                        _this.onMessageWaitList = [];
                    });
                }
            });
        }
        MyAI.prototype.getMyAIResponse = function (prompt, callback) {
            this.onMessageWaitList.push(callback);
            messaging.sendChatMessage(this.myAIConversationID, prompt, function () { });
        };
        MyAI.prototype.getConversationID = function () {
            return this.myAIConversationID;
        };
        return MyAI;
    }());

    var languages = [
        "English",
        "French",
        "Spanish",
        "German",
        "Italian",
        "Hindi",
        "Dutch",
    ];

    var settingsContext = {
        events: [],
    };

    var defaultPrompt = "Conversation with a friend. \n <listMessages> Write a respond to: <myLastMessage>, IN <language> !. Do not refer to your AI capabilities !. If the conversation slows down, continue with a relevant question or comment. your answer must be short.";
    function createManagerToolBoxUI() {
        settingsContext.events.push({
            start: function (builder) {
                var oldSelectedLanguage = getSelectedLanguage();
                builder.row(function (builder) {
                    var text = builder.text("Language :" + oldSelectedLanguage);
                    builder.slider(0, languages.length - 1, languages.length - 2, config.getInteger("languageAI", 0), function (value) {
                        text.label("Language :" + languages[value]);
                        config.setInteger("languageAI", value, true);
                    });
                });
                builder.row(function (builder) {
                    builder.button("Clear Config", function () {
                        config.set("customPrompt", defaultPrompt, true);
                        config.setInteger("languageAI", 0, true);
                    });
                });
                builder.row(function (builder) {
                    builder
                        .textInput("Custom Prompt", config.get("customPrompt", defaultPrompt), function (value) {
                        config.set("customPrompt", value, true);
                    })
                        .maxLines(8)
                        .singleLine(false);
                });
            },
        });
    }

    function getMyUserId(context) {
        var database = context.openOrCreateDatabase("arroyo.db", 0, null);
        var cursor = database.rawQuery("SELECT value FROM required_values WHERE key = 'USERID'", null);
        try {
            if (cursor.moveToFirst()) {
                return cursor.getString(0);
            }
        }
        finally {
            cursor.close();
            database.close();
        }
        return null;
    }

    var snapActivityContext = {
        activity: null,
        events: [],
    };

    function toOnlyValidMessages(messageList) {
        var userId = getMyUserId(snapActivityContext.activity); // Obtient l'ID de l'utilisateur actuel
        var validMessages = [];
        messageList.forEach(function (message) {
            var serializedMessage = message.serialize();
            if (serializedMessage != null) {
                validMessages.push({
                    sender: message.senderId.toString() == userId ? "a" : "b",
                    senderDisplay: message.senderId.toString() == userId
                        ? "(moi)"
                        : "autre personne (repond a lui)",
                    message: serializedMessage,
                });
            }
        });
        return validMessages;
    }
    function getLatestMessages(conversationId, callback) {
        messaging.fetchConversationWithMessages(conversationId, function (error, messageList) { return callback(toOnlyValidMessages(messageList)); });
    }

    function getAiResponse(myAI, conversationId, onResponseCallBack) {
        getLatestMessages(conversationId, function (messageList) {
            var lastMessageFromB = messageList
                .slice()
                .reverse()
                // without find method
                .filter(function (msg) { return msg.sender === "b"; })[0];
            var context = messageList.slice(Math.max(messageList.length - 8, 0), messageList.length - 1);
            var listMessages = context
                .map(function (msg) { return "".concat(msg.sender, ": ").concat(msg.message); })
                .join("\n");
            var myLastMessage = lastMessageFromB.message;
            var prompt = config
                .get("customPrompt", defaultPrompt)
                .replace("<myLastMessage>", myLastMessage)
                .replace("<listMessages>", listMessages)
                .replace("<language>", getSelectedLanguage());
            myAI.getMyAIResponse(prompt, onResponseCallBack);
        });
    }
    function replyWithAI(myAI, conversationId) {
        getAiResponse(myAI, conversationId, function (response) {
            messaging.sendChatMessage(conversationId, response, function () { });
        });
    }
    function getSelectedLanguage() {
        return languages[config.getInteger("languageAI", 1)];
    }

    function createConversationToolboxUI() {
        conversationToolboxContext.events.push({
            start: function (builder, args) {
                var myAI = new MyAI();
                builder.button("Send reply in " + getSelectedLanguage(), function () {
                    getAiResponse(myAI, args["conversationId"], function (response) {
                        messaging.sendChatMessage(args["conversationId"], response, function () { });
                    });
                });
            },
        });
    }

    var friendFeedContext = {
        events: [],
    };

    function getIfUseAutoReply(conversationId) {
        var configID = "useAutoReply-" + conversationId;
        return config.getBoolean(configID, false);
    }
    function createFriendFeedToolBoxUI() {
        friendFeedContext.events.push({
            start: function (builder, args) {
                var conversationId = args["conversationId"];
                var configID = "useAutoReply-" + conversationId;
                builder
                    .row(function (builder) {
                    builder.text("Use auto reply");
                    builder.switch(config.getBoolean(configID, false), function (value) {
                        config.setBoolean(configID, value, true);
                    });
                })
                    .arrangement("spaceBetween" /* EnumPosArrangement.SPACE_BETWEEN */)
                    .fillMaxWidth()
                    .padding(4);
            },
        });
    }

    function createInterface() {
        createConversationToolboxUI();
        createManagerToolBoxUI();
        createFriendFeedToolBoxUI();
    }

    function initAutoReply() {
        snapActivityContext.events.push({
            start: function (activity) {
                var myUserId = getMyUserId(activity);
                var messageAlreadyReply = [];
                events.onConversationUpdated(function (update) {
                    var myAI = new MyAI();
                    var message = update.messages[0];
                    if (!message && !message.messageDescriptor)
                        return;
                    var conversationId = message.messageDescriptor.conversationId;
                    var messageType = message.messageContent.contentType;
                    if (messageType == "CHAT" || messageType == "NOTE") {
                        if (message.senderId.toString() != myUserId) {
                            var isAlreadySend_1 = false;
                            messageAlreadyReply.forEach(function (id) {
                                if (id == message.messageDescriptor.messageId) {
                                    isAlreadySend_1 = true;
                                }
                            });
                            if (!isAlreadySend_1) {
                                var useAutoReply = JSON.parse("" + getIfUseAutoReply(conversationId.toString()));
                                if (useAutoReply) {
                                    if (messageType == "NOTE") {
                                        var language = getSelectedLanguage();
                                        myAI.getMyAIResponse("Write in " +
                                            language +
                                            " A response to indicate that we cannot listen and ask the user to write, please provide me just the response text", function (response) {
                                            messaging.sendChatMessage(conversationId.toString(), response, function () { });
                                        });
                                        return;
                                    }
                                    replyWithAI(myAI, conversationId.toString());
                                }
                                messageAlreadyReply.push(message.messageDescriptor.messageId);
                            }
                        }
                    }
                });
            },
        });
    }

    function start(_) {
        createInterface();
        initAutoReply();
    }

    var snapApplicationContext = {
        context: null,
        events: [],
    };

    var snapEnhancerContext = {
        context: null,
        events: [],
    };

    var unloadContext = {
        events: [],
    };

    start();
    module.onSnapMainActivityCreate = function (activity) {
        snapActivityContext.activity = activity;
        snapActivityContext.events.forEach(function (event) {
            event.start(activity, null);
        });
    };
    module.onSnapApplicationLoad = function (context) {
        snapApplicationContext.context = context;
        snapApplicationContext.events.forEach(function (event) {
            event.start(context, null);
        });
    };
    module.onSnapEnhanceLoad = function (context) {
        snapEnhancerContext.context = context;
        snapEnhancerContext.events.forEach(function (event) {
            event.start(context, null);
        });
    };
    module.onUnload = function () {
        unloadContext.events.forEach(function (event) {
            event.start(null, null);
        });
    };
    im.create("conversationToolbox" /* EnumUI.CONVERSATION_TOOLBOX */, function (builder, args) {
        conversationToolboxContext.events.forEach(function (event) {
            event.start(builder, args);
        });
    });
    im.create("friendFeedContextMenu" /* EnumUI.FRIEND_FEED_CONTEXT_MENU */, function (builder, args) {
        friendFeedContext.events.forEach(function (event) {
            event.start(builder, args);
        });
    });
    im.create("settings" /* EnumUI.SETTINGS */, function (builder, args) {
        settingsContext.events.forEach(function (event) {
            event.start(builder, args);
        });
    });

})();
