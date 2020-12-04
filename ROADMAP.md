# Roadmap

## Baseline

- Permettre à un utilisateur de créer un compte

- Permettre à un utilisateur de se connecter
  
- Permettre à un utilisateur de se déconnecter
  
- Afficher la photo et le nom de l'utilisateur (Sidebar)

- Charger la liste des utilisateurs après authentification
  > $client, actions

- Mettre à jour en temps réel la liste des utilisateurs quand un utilisateur s'inscrit
  > $client.on('userCreated')
  
- Recevoir en temps réel l'ajout d'une conversation
  > $client.on('conversationCreated')

- Afficher la liste des participants à une conversation (Conversation)

## Niveau 1

- Afficher la liste des utilisateurs (Community)
    - Afficher leur photo
      > :src
    - Afficher leur nom

- Permettre de filtrer la liste des utilisateurs (Community)
  > data, v-model, computed
    - Permettre un filtrage insensible à la casse
      > String.toLowerCase()

- Permettre de toggle sélectionner des utilisateurs (Community)
  > data, :class, classe "selected", @click

- Ouvrir une conversation avec les utilisateurs sélectionner (Community)
    - Ouvrir une conversation OneToOne quand un seul utilisateur est sélectionné sinon ManyToMany
      > @click, $client.getOrCreateOneToOneConversation, $client.createManyToManyConversation
    - Changer le label du bouton pour indiquer que l'ouverture est en cours
      > v-if, Promise
      
- Créer une page d'info avec le nom, la composition et la photo de votre groupe
  > vue-router, component

## Niveau 2

- Afficher la liste des conversations (Sidebar)
    - Afficher photo+nom de l'utilisateur/groupe, et texte+heure du dernier message
    - Trier la liste par heure de mise à jour décroissante
      > Array.sort
      
- Pouvoir filter la liste des conversations (Sidebar)
  > v-model, computed

  
## Niveau 3

- Afficher l'en-tête de la conversation (Conversation)
    - Afficher une photo ou l'icône groupe selon le cas
    - Afficher le titre de la conversation (par défaut, vaut le nom des participants)

- Recevoir en temps réel les nouveaux messages
  > $client.on('messagePosted')

- Affichage simple des messages d'une conversation (Conversation)
    - Différencier les messages de l'utilisateur de ceux des autres
      > classe "mine"
    - Afficher la photo de l'utilisateur auteur devant chaque message

- Pouvoir envoyer un message  (Conversation)
  > $client.postMessage

## Niveau 4

- Pouvoir voir les participants d'une conversation (Group)
  > computed

- Pouvoir voir les non-participants d'une conversation (Group)
  > computed

- Pouvoir filtrer les utilisateurs dans la vue des participants (Group)
  > v-model, computed

- Recevoir en temps réel l'ajout d'un participant à une conversation (Group)
  > $client.on('participantAdded')

- Pouvoir ajouter un participant d'une conversation ManyToMany (Group)
  > $client.addParticipant

- Recevoir en temps réel le retrait d'un participant à une conversation (Group)
  > $client.on('participantRemoved')

- Pouvoir retirer un participant d'une conversation ManyToMany (si il y a plus de 3 participants) (Group)
  > $client.removeParticipant


## Niveau 5

- Recevoir en temps réel les réactions aux messages (Conversation)
  > $client.on('messageReacted')

- Afficher les réactions à un message (Conversation)

- Afficher la réponse à un message (Conversation)
  > classe "reply_content"

- Pouvoir répondre à un message  (Conversation)
  > $client.replyMessage

- Recevoir en temps réel les suppressions de message (Conversation)
  > $client.on('messageDeleted')

- Pouvoir supprimer un message (Conversation)
  > $client.deleteMessage


## Niveau 6

- Recevoir en temps réel les éditions de message  (Conversation)
  > $client.on('messageEdition')

- Pouvoir éditer un message (Conversation)
  > $client.editMessage

- Affichage avancé des messages d'une conversation (Conversation)
    - Changer la forme des bulles lors d'une séquence de message d'un même auteur
      > classes "top", "middle" et "bottom"
    - Afficher uniquement la photo sur le dernier message d'une séquence de message d'un même utilisateur (façon Messenger)

- Recevoir une notification de lecture (Conversation)
  > $client.on('conversationSeen)

- Afficher les notifications de lecture (photo, nom d'utilisateur, heure) d'une conversation (Conversation)
  > :src, :title, computed/getters

- Envoyer une notification de lecture (Conversation)
  > $client.seeConversation

## Niveau 7

- Recevoir en temps réel la liste des utilisateurs en ligne
  > $client.on('usersAvailable')
  
- Affichage avancé la liste des utilisateurs (Community)
    - Afficher s'ils sont en ligne
      > classe "available"
  
- Affichage avancé l'en-tête de la conversation (Conversation)
    - Afficher si l'utilisateur ou un utilisateur du groupe est en ligne
      > v-if, <i>
      
- Affichage avancé de la liste des conversations (Sidebar)
  - Afficher si l'autre utilisateur ou un participant du groupe est en ligne
    > getters
  - Afficher si la conversation contient un nouveau message qui n'a pas été lu
    > getters

- Pouvoir rechercher un message (Search)
  > v-model, $client.searchMessage

## Niveau 8


- Bonus: Envoyer des notifications de rédaction de message (Conversation)
  > $client.typeConversation (implémentation à la demande via mail)
   
- Bonus: Recevoir des notifications de rédaction de message (Conversation)
  > $client.on('ConversationTyped') (implémentation à la demande via mail)
  
- Bonus: Afficher lorsqu'un participant rédige un message (Conversation)

## Niveau 9
    
- Bonus: Pouvoir modifier le thème d'une conversation (Conversation)
  - Thème BLUE ou RED
    > :class, $client.setConversationTheme (implémentation à la demande via mail)
  - Thème RAINBOW
    
- Bonus: Modifier le titre d'une conversation (Conversation)
  > prompt, $client.setConversationTitle (implémentation à la demande via mail)
  
- Bonus: Lancer une notification sonore lorsqu'un message est reçu dans une conversation qui n'est pas ouverte (Conversation)
  > Audio API
  - Pouvoir mute une conversation
  - Pouvoir unmute une conversation  
    
## Niveau 10

- Bonus: Recevoir les mises à jour en temps des modifications de surnom de particpant
> (implémentation à la demande via mail)

- Bonus: Afficher le surnom d'un participant
> (implémentation à la demande via mail)

- Bonus: Pouvoir changer le surnom d'un participant
> $client.setParticipantNickname (implémentation à la demande via mail)
