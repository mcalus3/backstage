# @backstage/catalog-model

## 0.2.0
### Minor Changes

- 3a4236570: Add handling and docs for entity references
- e0be86b6f: Entirely case insensitive read path of entities
- f70a52868: Add the User & Group entities
  
  A user describes a person, such as an employee, a contractor, or similar. Users belong to Group entities in the catalog.
  
  A group describes an organizational entity, such as for example a team, a business unit, or a loose collection of people in an interest group. Members of these groups are modeled in the catalog as kind User.
- 12b5fe940: Add ApiDefinitionAtLocationProcessor that allows to load a API definition from another location
- a768a07fb: Add the ability to import users from GitHub Organization into the catalog.