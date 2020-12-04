
# Models

## User

## Conversation

## Message



# Methods

## Promise<{users : Array<User>}> : getUsers() {

    - NOT_AUTHENTICATED

## Promise<{conversation : Conversation}> : getOrCreateOneToOneConversation(username : String) {

    - NOT_AUTHENTICATED
    - NOT_FOUND_USER

## Promise<{conversation : Conversation}> : createManyToManyConversation(usernames : Array<String>) {

    - NOT_AUTHENTICATED
    - NOT_VALID_USERNAMES
    - NOT_FOUND_USER

## Promise<{message : Message}> : postMessage(conversation_id : Number, content : String) {

    - NOT_AUTHENTICATED
    - NOT_VALID_CONTENT
    - NOT_FOUND_CONVERSATION

## Promise<{}> : seeConversation(conversation_id : Number, message_id : Number) {

    - NOT_AUTHENTICATED
    - NOT_FOUND_CONVERSATION
    - NOT_FOUND_MESSAGE

## Promise<{}> : reactMessage(conversation_id : Number, message_id : Number, reaction : Enum<HEART, THUMB, HAPPY, SAD>) {

    - NOT_AUTHENTICATED
    - NOT_FOUND_CONVERSATION
    - NOT_FOUND_MESSAGE

## Promise<{message: Message}> : replyMessage(conversation_id : Number, message_id : Number, content : String) {

    - NOT_AUTHENTICATED
    - NOT_VALID_CONTENT
    - NOT_FOUND_CONVERSATION
    - NOT_FOUND_MESSAGE

## Promise<{conversations: Array<Conversation>}> : getConversations() {

    - NOT_AUTHENTICATED

## Promise<{conversations: Array<MatchingConversation>}> : searchMessage(search : String) {

    - NOT_AUTHENTICATED

## Promise<{}> : editMessage(conversation_id : Number, message_id : Number, content : String) {

    - NOT_AUTHENTICATED
    - NOT_FOUND_CONVERSATION
    - NOT_FOUND_MESSAGE

## Promise<{}> : deleteMessage(conversation_id : Number, message_id : Number) {

    - NOT_AUTHENTICATED
    - NOT_FOUND_CONVERSATION
    - NOT_FOUND_MESSAGE

## Promise<{conversation: Conversation}> : addParticipant(conversation_id : Number, username : String) {

    - NOT_AUTHENTICATED
    - NOT_FOUND_CONVERSATION
    - NOT_VALID_USER

## Promise<{conversation: Conversation}> : removeParticipant(conversation_id : Number, username : String) {

    - NOT_AUTHENTICATED
    - NOT_FOUND_CONVERSATION
    - NOT_VALID_USER



# Events

## client.on("userCreated", ({ user: User }) => {})


## client.on("conversationCreated", ({ conversation: Conversation }) => {})


## client.on("participantAdded", ({ conversation: Conversation }) => {})


## client.on("participantRemoved", ({ conversation: Conversation }) => {})


## client.on("messagePosted", ({ conversation_id: Number, message: Message }) => {})


## client.on("messageDelivered", ({ conversation_id: Number, message: Message }) => {})


## client.on("conversationSeen", ({ conversation: Conversation }) => {})


## client.on("messageReacted", ({ conversation_id: Number, message: Message }) => {})


## client.on("messageEdited", ({ conversation_id: Number, message: Message }) => {})


## client.on("messageDeleted", ({ conversation_id: Number, message_id: Number }) => {})


## client.on("usersAvailable", ({ usernames: Array<String> }) => {})
