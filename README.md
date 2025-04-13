# Web Development Project 6 - *Recipe Search Dashboard - Part2*

Submitted by: **Ya Ji**

This web app: **Recipe Search is a responsive dashboard application that helps users discover recipes based on ingredients they already have at home. The app fetches recipe data from the Spoonacular API and displays it in an organized table format with helpful summary statistics. Users can filter recipes through a search bar, dropdown selection for missing ingredients, custom numeric boundaries, and a slider for minimum popularity. The dashboard updates dynamically as filters are applied, allowing users to quickly narrow down recipes that match their preferences. Once a recipe is selected, detailed information is displayed, including ingredients, instructions, and nutritional data.**

Time spent: **4** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **Clicking on an item in the list view displays more details about it**
  - Clicking on an item in the dashboard list navigates to a detail view for that item
  - Detail view includes extra information about the item not included in the dashboard view
  - The same sidebar is displayed in detail view as in dashboard view
  - *To ensure an accurate grade, your sidebar **must** be viewable when showing the details view in your recording.*
- [x] **Each detail view of an item has a direct, unique URL link to that item’s detail view page**
  -  *To ensure an accurate grade, the URL/address bar of your web browser **must** be viewable in your recording.*
- [x] **The app includes at least two unique charts developed using the fetched data that tell an interesting story**
  - At least two charts should be incorporated into the dashboard view of the site
  - Each chart should describe a different aspect of the dataset


The following **optional** features are implemented:

- [x] The site’s customized dashboard contains more content that explains what is interesting about the data 
  - e.g., an additional description, graph annotation, suggestion for which filters to use, or an additional page that explains more about the data
- [x] The site allows users to toggle between different data visualizations
  - User should be able to use some mechanism to toggle between displaying and hiding visualizations 

  
The following **additional** features are implemented:

* [ ] List anything else that you added to improve the site's functionality!

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='https://private-user-images.githubusercontent.com/181181004/433114080-cd187ee3-4203-481e-b073-854cb5b6efe2.gif?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDQ1Mjk1MjAsIm5iZiI6MTc0NDUyOTIyMCwicGF0aCI6Ii8xODExODEwMDQvNDMzMTE0MDgwLWNkMTg3ZWUzLTQyMDMtNDgxZS1iMDczLTg1NGNiNWI2ZWZlMi5naWY_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwNDEzJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDQxM1QwNzI3MDBaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1jMGU5ZWNlOWQ1ZTc0MDliZDhmY2UwYzQ4OWIzYmQ1MjQ1N2E5NGE5ZTI4NzM1NjNmMmMwMTI0MzQyZWE4ZWJmJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.yBLm-I1-wLonbmhKr1ctKAqRyTHCccBiOk4a8niWdFk' title='Video Walkthrough'/>

<!-- Replace this with whatever GIF tool you used! -->
GIF created with LiceCap  
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

Describe any challenges encountered while building the app.

## License

    Copyright [yyyy] [name of copyright owner]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.


# Web Development Project 5 - *Recipe Search*

Submitted by: **Ya Ji**

This web app: **Recipe Search is a responsive dashboard application that helps users discover recipes based on ingredients they already have at home. The app fetches recipe data from the Spoonacular API and displays it in an organized table format with helpful summary statistics. Users can filter recipes through a search bar, dropdown selection for missing ingredients, custom numeric boundaries, and a slider for minimum popularity. The dashboard updates dynamically as filters are applied, allowing users to quickly narrow down recipes that match their preferences. Once a recipe is selected, detailed information is displayed, including ingredients, instructions, and nutritional data.**

Time spent: **5** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **The site has a dashboard displaying a list of data fetched using an API call**
  - The dashboard should display at least 10 unique items, one per row
  - The dashboard includes at least two features in each row
- [x] **`useEffect` React hook and `async`/`await` are used**
- [x] **The app dashboard includes at least three summary statistics about the data** 
  - The app dashboard includes at least three summary statistics about the data, such as:
    - *insert details here*
- [x] **A search bar allows the user to search for an item in the fetched data**
  - The search bar **correctly** filters items in the list, only displaying items matching the search query
  - The list of results dynamically updates as the user types into the search bar
- [x] **An additional filter allows the user to restrict displayed items by specified categories**
  - The filter restricts items in the list using a **different attribute** than the search bar 
  - The filter **correctly** filters items in the list, only displaying items matching the filter attribute in the dashboard
  - The dashboard list dynamically updates as the user adjusts the filter

The following **optional** features are implemented:

- [x] Multiple filters can be applied simultaneously
- [x] Filters use different input types
  - e.g., as a text input, a dropdown or radio selection, and/or a slider
- [x] The user can enter specific bounds for filter values

The following **additional** features are implemented:

* [ ] List anything else that you added to improve the site's functionality!

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='https://private-user-images.githubusercontent.com/181181004/430608663-3248f1f3-9305-4f96-9395-4dec48811de2.gif?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NDM4NDUzNDEsIm5iZiI6MTc0Mzg0NTA0MSwicGF0aCI6Ii8xODExODEwMDQvNDMwNjA4NjYzLTMyNDhmMWYzLTkzMDUtNGY5Ni05Mzk1LTRkZWM0ODgxMWRlMi5naWY_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjUwNDA1JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI1MDQwNVQwOTI0MDFaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0wYTY1YWE2MTZjOGJkNDJiZmQyMjZlYWUxMzY2MDVlM2ZmZjZiOGQ5MDA4MzBlYWQyODFkZDdlY2E1ODlmMDZiJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.KpzAY6WRas22lpSMhhGjm3NLfUnNmaGRuNtao2kldHQ' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with LiceCap  
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

Describe any challenges encountered while building the app.

## License

    Copyright [Ya Ji] [name of copyright owner]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.