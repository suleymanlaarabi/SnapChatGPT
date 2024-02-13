import { EnumUI } from "../data.types/interface-manager";
import { AndroidActivity } from "../types/android/app/Activity";
import { AndroidContentContext } from "../types/android/content/Context";
import start from "./app";
import {
  IConversationToolboxContext,
  conversationToolboxContext,
} from "./context/conversationToolboxContext";
import {
  IFriendFeedContext,
  friendFeedContext,
} from "./context/friendFeedContext";
import {
  ISettingsContext,
  settingsContext,
} from "./context/settingsModuleContext";

import {
  ISnapActivityContext,
  snapActivityContext,
} from "./context/snapActivityContext";
import {
  ISnapApplicationContext,
  snapApplicationContext,
} from "./context/snapApplicationContext";
import {
  ISnapEnhancerContext,
  snapEnhancerContext,
} from "./context/snapEnhancerContext";
import { IUnloadContext, unloadContext } from "./context/unloadContext";

/*
-----------------------------------------------------
----DO NOT MODIFY THIS FILE WRITE YOUR CODE IN APP---
-----------------------------------------------------
*/

export interface StartFunctionProps {
  snapActivityContext: ISnapActivityContext;
  snapApplicationContext: ISnapApplicationContext;
  snapEnhancerContext: ISnapEnhancerContext;
  unloadContext: IUnloadContext;

  conversationToolboxContext: IConversationToolboxContext;
  friendFeedContext: IFriendFeedContext;
  settingsContext: ISettingsContext;
}

start({
  snapActivityContext,
  snapApplicationContext,
  snapEnhancerContext,
  unloadContext,
  conversationToolboxContext,
  friendFeedContext,
  settingsContext,
});

module.onSnapMainActivityCreate = (activity: AndroidActivity) => {
  snapActivityContext.activity = activity;
  snapActivityContext.events.forEach((event) => {
    event.start(activity, null);
  });
};

module.onSnapApplicationLoad = (context: AndroidContentContext) => {
  snapApplicationContext.context = context;
  snapApplicationContext.events.forEach((event) => {
    event.start(context, null);
  });
};

module.onSnapEnhanceLoad = (context: AndroidContentContext) => {
  snapEnhancerContext.context = context;
  snapEnhancerContext.events.forEach((event) => {
    event.start(context, null);
  });
};

module.onUnload = () => {
  unloadContext.events.forEach((event) => {
    event.start(null, null);
  });
};

im.create(EnumUI.CONVERSATION_TOOLBOX, (builder, args) => {
  conversationToolboxContext.events.forEach((event) => {
    event.start(builder, args);
  });
});

im.create(EnumUI.FRIEND_FEED_CONTEXT_MENU, (builder, args) => {
  friendFeedContext.events.forEach((event) => {
    event.start(builder, args);
  });
});

im.create(EnumUI.SETTINGS, (builder, args) => {
  settingsContext.events.forEach((event) => {
    event.start(builder, args);
  });
});
