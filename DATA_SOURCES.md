# Enrichir le catalogue Mwono

Le moteur est séparé des données :

- `script.js` contient l’algorithme de recherche, l’inversion et l’interface.
- `data.js` contient le catalogue complémentaire éditorial.
- Les premiers mots sont encore dans `script.js` pour garder une version autonome immédiatement ouvrable.

## Format d’une entrée

```js
{
  fr: ["forme française", "variante"],
  word: "forme shimaoré ou bretonne",
  pronunciation: "prononciation simplifiée",
  category: "Thème",
  variant: "note d’usage ou niveau de confiance"
}
```

Pour une vraie traduction de phrase, ajouter une entrée complète dans `fr`, plutôt qu’une suite de mots isolés. Le moteur donne toujours la priorité aux phrases exactes, puis aux expressions proches, puis au mot-à-mot.

## Sources à exploiter

### Shimaoré

- CASNAV Mayotte : dictionnaire, grammaire, conjugaison et ressources pédagogiques.
- Ylangue : lexique thématique, manuel grammatical et tables de conjugaison.
- Le Mini Dictionnaire audio de Parlon-shimaore : vocabulaire débutant et prononciations.
- Des validations de locuteurs de Mayotte sont nécessaires pour les variantes, la graphie et les phrases complètes.

### Breton

- Office public de la langue bretonne : corpus parallèle, ressources KerOfis et données sous licence ODbL.
- Corpus OPUS, Tatoeba et corpus de phrases de l’OPLB pour les exemples bilingues.
- Les phrases importées doivent conserver leur source et leur licence.

## Prochaine étape de données

À terme, le catalogue peut être exporté en deux fichiers JSON :

```text
data/shimaore.json
data/breton.json
```

Chaque phrase validée devrait aussi avoir : `source`, `license`, `confidence`, `register`, `audio` et éventuellement `dialect`. Cela permettra d’afficher une traduction fiable, une variante locale et une suggestion générée séparément.
