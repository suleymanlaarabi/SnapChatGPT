import { Message } from "./messaging";

export interface Event {
  canceled: boolean;
}

export interface ConversationUpdateEvent extends Event {
  readonly conversationId: string;
  readonly conversation: any; // com.snapchat.client.messaging.Conversation
  readonly messages: Message[];
}

export interface BuildMessageEvent extends Event {
  readonly message: Message;
}

export interface BindViewEvent extends Event {
  readonly model: any;
  readonly view: any; // android.view.View
}

export interface OnSnapInteractionEvent extends Event {
  readonly interactionType: any; // enum
  readonly conversationId: string;
  readonly messageId: number; // long
}

export interface SendMessageWithContentEvent extends Event {
  readonly destinations: any;
  readonly messageContent: any;
}

export interface AddViewEvent extends Event {
  readonly parent: any; // android.view.ViewGroup
  view: any; // android.view.View
}

export interface Events {
  onConversationUpdated(
    callback: (event: ConversationUpdateEvent) => void
  ): void;
  onMessageBuild(callback: (event: BuildMessageEvent) => void): void;
  onViewBind(callback: (event: BindViewEvent) => void): void;
  onSnapInteraction(callback: (event: OnSnapInteractionEvent) => void): void;
  onPreMessageSend(
    callback: (event: SendMessageWithContentEvent) => void
  ): void;
  onAddView(callback: (event: AddViewEvent) => void): void;
}
