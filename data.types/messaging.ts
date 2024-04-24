export interface SnapUUID extends SEWrapper {
  toBytes(): any; // byte[]
  toUUID(): any; // java.util.UUID
}

export interface MessageContent extends SEWrapper {
  content: any; // byte[]
  contentType: any;
}

export interface UserIdToReaction {
  userId: SnapUUID;
  reactionId: number;
}

export interface MessageMetadata extends SEWrapper {
  createdAt: number;
  readAt: number;
  playableSnapState: any;
  savedBy: SnapUUID[];
  openedBy: SnapUUID[];
  seenBy: SnapUUID[];
  reactions: UserIdToReaction[];
  isSaveable: boolean;
}

export interface MessageDescriptor extends SEWrapper {
  messageId: number;
  conversationId: SnapUUID;
}

export interface Message extends SEWrapper {
  orderKey: number;
  senderId: SnapUUID;
  messageContent: MessageContent;
  messageMetadata: MessageMetadata;
  messageDescriptor: MessageDescriptor;
  messageState: any;

  serialize(): string;
}

export type ResultCallback = (error?: any) => void;
export type MessageResultCallback = (error?: any, message?: Message) => void;
export type MessageListResultCallback = (
  error?: any,
  messages?: Message[]
) => void;

export interface ConversationUserIdPair {
  readonly conversationId: string;
  readonly userId: string;
}

export enum MessageUpdate {
  READ = "read",
  RELEASE = "release",
  SAVE = "save",
  UNSAVE = "unsave",
  ERASE = "erase",
  SCREENSHOT = "screenshot",
  SCREEN_RECORD = "screen_record",
  REPLAY = "replay",
  REACTION = "reaction",
  REMOVE_REACTION = "remove_reaction",
  REVOKE_TRANSCRIPTION = "revoke_transcription",
  ALLOW_TRANSCRIPTION = "allow_transcription",
  ERASE_SAVED_STORY_MEDIA = "erase_saved_story_media",
}

export interface BitmojiInfo extends SEWrapper {
  avatarId?: string;
  backgroundId?: string;
  sceneId?: string;
  selfieId?: string;
}

export interface Snapchatter extends SEWrapper {
  readonly bitmojiInfo?: BitmojiInfo;
  displayName?: string;
  userId: SnapUUID;
  username: string;
}

export interface Messaging {
  isPresent(): boolean;
  newSnapUUID(uuid: string): SnapUUID;

  updateMessage(
    conversationId: string,
    messageId: number,
    action: MessageUpdate,
    callback: ResultCallback
  ): void;
  fetchConversationWithMessagesPaginated(
    conversationId: string,
    lastMessageId: number,
    amount: number,
    callback: MessageListResultCallback
  ): void;
  fetchConversationWithMessages(
    conversationId: string,
    callback: MessageListResultCallback
  ): void;
  fetchMessageByServerId(
    conversationId: string,
    serverId: number,
    callback: MessageResultCallback
  ): void;
  fetchMessagesByServerIds(
    conversationId: string,
    serverIds: number[],
    callback: MessageListResultCallback
  ): void;
  displayedMessages(
    conversationId: string,
    lastMessageId: number,
    callback: ResultCallback
  ): void;
  fetchMessage(
    conversationId: string,
    messageId: number,
    callback: MessageResultCallback
  ): void;
  clearConversation(conversationId: string, callback: ResultCallback): void;
  getOneOnOneConversationIds(
    userIds: string[],
    callback: (error?: any, result?: ConversationUserIdPair[]) => void
  ): void;
  sendChatMessage(
    conversationId: string,
    message: string,
    callback: ResultCallback
  ): void;

  fetchSnapchatterInfos(userIds: string[]): Snapchatter[];
}
