# Gestion des devis — MS PEINTURE

## ⚠️ État actuel des données

Actuellement, les données sont **stockées en dur** dans l'application.

Il est possible de :

* ajouter des données ;
* modifier des données ;
* supprimer certaines données.

Cependant, **aucune donnée n'est actuellement sauvegardée dans une base de données**.

Tant que l'application reste ouverte, les données sont conservées lors des changements de page.

En revanche, si l'application est déconnectée puis relancée, les données sont **réinitialisées**.

> 🚧 **Travail en cours :** mise en place de la base de données afin de permettre la sauvegarde définitive des données.

---

# Fonctionnement de l'application

## 🏠 Page d'accueil

La page d'accueil présente un **récapitulatif de l'activité** :

* aperçu de l'activité ;
* derniers devis enregistrés ;
* accès direct aux derniers devis.

En cliquant sur le **numéro d'un devis**, il est possible d'accéder directement à celui-ci.

---

# 👤 Onglet « Clients »

L'onglet **Clients** permet de gérer les clients.

Il est possible de :

* consulter les clients ;
* modifier les informations d'un client ;
* créer un nouveau client.

### Suppression d'un client

Un client **ne peut pas être supprimé**.

En effet, un client peut être associé à un ou plusieurs devis. Sa suppression pourrait donc entraîner une perte de cohérence dans l'historique des devis.

---

# 📄 Onglet « Devis »

L'onglet **Devis** permet de créer et de gérer les devis.

## Statuts d'un devis

Un devis peut avoir plusieurs statuts :

* **Brouillon**
* **En attente**
* **Accepté**
* **Refusé**
* **Annulé**

### 🔵 Brouillon

Lorsqu'un devis est créé, il est initialement en **brouillon**.

Un devis en brouillon peut être :

* modifié ;
* supprimé ;
* complété avec de nouvelles lignes.

Un devis dont le montant est de **0 €** ne peut pas être passé en attente.

### 🟠 En attente

Une fois le devis passé **En attente**, il n'est plus modifiable.

Le devis peut alors être :

* **Accepté**, si le client accepte le devis ;
* **Refusé**, si le client refuse le devis.

### 🔴 Refusé

Un devis refusé ne peut plus revenir aux statuts :

* Brouillon ;
* En attente ;
* Accepté.

Si le devis doit finalement être repris, il est possible de **le dupliquer** afin de créer un nouveau devis.

### 🟢 Accepté

Un devis accepté ne peut normalement plus être modifié.

Une exception existe cependant : un devis accepté peut exceptionnellement être passé en **Refusé**, par exemple dans le cadre d'un geste commercial.

---

# ➕ Création d'un nouveau devis

Un nouveau devis peut être créé grâce au bouton **« Nouveau devis »**.

## 1. Sélection du client

La première étape consiste à rechercher un client.

La recherche s'effectue principalement par :

* nom ;
* prénom.

Si aucun client correspondant n'est trouvé, un bouton **« Créer »** apparaît afin de permettre la création immédiate d'un nouveau client.

## 2. Création du devis

Une fois le client sélectionné, le devis est créé avec :

* la **date du jour** ;
* une **date de validité** calculée automatiquement.

Par défaut, la validité est de :

> **Date du jour + 10 jours**

Cette durée est **modifiable dans les paramètres**.

Le nouveau devis est créé avec le statut **Brouillon** et un montant initial de **0 €**.

À ce stade, il peut être :

* modifié ;
* supprimé.

Il ne peut pas être passé en attente tant que son montant est de **0 €**.

---

# ✏️ Modification d'un devis

En cliquant sur **« Modifier »**, on accède au contenu détaillé du devis.

Il est alors possible d'ajouter des lignes.

Chaque ligne contient les informations suivantes :

| Champ           | Description                                                               |
| --------------- | ------------------------------------------------------------------------- |
| **Désignation** | Texte libre                                                               |
| **Quantité**    | Valeur strictement supérieure à 0                                         |
| **Unité**       | Valeur prédéfinie et configurable dans les paramètres                     |
| **Prix**        | Prix unitaire                                                             |
| **TVA**         | Taux de TVA disponible uniquement si l'entreprise est assujettie à la TVA |

Une fois une ligne ajoutée, elle peut être :

* modifiée ;
* supprimée.

Le devis est **sauvegardé automatiquement** lors des modifications.

---

# 💶 Gestion de la TVA

Le comportement de l'affichage des montants dépend du fait que l'entreprise soit ou non assujettie à la TVA.

### TVA non applicable

Si l'entreprise n'est pas assujettie à la TVA :

* le montant est affiché simplement ;
* aucune TVA n'est affichée.

### TVA applicable

Si l'entreprise est assujettie à la TVA :

* les taux de TVA sont disponibles sur les lignes ;
* la TVA est calculée ;
* les montants correspondants sont affichés.

Les devis sont enregistrés en tenant compte de la configuration de TVA au moment de leur création.

Cela permet de conserver l'historique des devis même si la configuration de TVA de l'entreprise évolue par la suite.

> ⚠️ **Problème actuellement identifié :** si un devis est créé alors que la TVA est applicable, puis que l'entreprise est ensuite configurée comme non assujettie à la TVA, les deux totaux affichés peuvent actuellement être différents. Ce comportement sera corrigé ultérieurement.

---

# ⚙️ Onglet « Paramètres »

L'onglet **Paramètres** permet de configurer différents éléments de l'application.

## 💶 TVA

Il est possible de configurer :

* l'assujettissement à la TVA ;
* les différents taux de TVA ;
* l'activation ou la désactivation d'un taux de TVA.

Par défaut :

> **TVA non applicable**

### Gestion des taux de TVA

Lorsque l'entreprise est assujettie à la TVA, il est possible de :

* ajouter un taux de TVA ;
* désactiver un taux existant ;
* réactiver un taux désactivé.

---

## 📅 Validité des devis

La durée de validité des devis peut être configurée.

Valeur par défaut :

> **10 jours**

Cette durée est utilisée automatiquement lors de la création d'un nouveau devis.

---

## 📏 Unités

Les unités disponibles pour les lignes de devis sont également configurables.

Il est possible de :

* ajouter une nouvelle unité ;
* désactiver une unité ;
* réactiver une unité désactivée.

---

## 🔄 Gestion des éléments inactifs

Que ce soit pour les **taux de TVA** ou les **unités**, un élément désactivé reste enregistré dans l'application mais **n'est plus proposé lors de la création ou de la modification d'un devis**.

Cela permet de conserver l'historique des données utilisées précédemment tout en évitant de proposer des valeurs qui ne sont plus utilisées.

---

# 🚧 Développement en cours

Les principales fonctionnalités de gestion des devis sont actuellement opérationnelles avec des données temporaires.

La prochaine étape importante est la mise en place de la **base de données** afin de permettre :

* la sauvegarde permanente des clients ;
* la sauvegarde permanente des devis ;
* la sauvegarde des lignes de devis ;
* la sauvegarde des paramètres ;
* la conservation de l'historique des données.

