# @backstage/plugin-explore

## 0.2.0
### Minor Changes

- 28edd7d29: Create backend plugin through CLI
- cab473771: This PR adds Spotify's Cost Insights Tool. Cost Insights explains costs from cloud services in an understandable way, using software terms familiar to your engineers. This tool helps you and your team make trade-offs between cost optimization efforts and your other priorities.
  
  Cost Insights features:
  
  Daily cost graph by team or billing account
  Cost comparison against configurable business metrics
  Insights panels for configurable cloud products your company uses
  Cost alerts and recommendations
  Selectable time periods for month over month, or quarter over quarter cost comparison
  Conversion of cost growth into average engineer cost (configurable) to help optimization trade-off decisions
  
  ![plugin-cost-insights](https://user-images.githubusercontent.com/3030003/94430416-e166d380-0161-11eb-891c-9ce10187683e.gif)
  
  This PR adds the Cost Insights frontend React plugin with a defined CostInsightsApi. We include an example client with static data in the expected format. This API should talk with a cloud billing backend that aggregates billing data from your cloud provider.
  
  Fixes #688 💵

### Patch Changes

- Updated dependencies [819a70229]
- Updated dependencies [ae5983387]
- Updated dependencies [0d4459c08]
- Updated dependencies [482b6313d]
- Updated dependencies [1c60f716e]
- Updated dependencies [144c66d50]
  - @backstage/core@0.2.0
  - @backstage/theme@0.2.0