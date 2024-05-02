# Changelog
**_5/2/2024_**
* Cleaned up integration functions
  * Corrected redundant storage of ``_result`` variables. This variable was previously storing the ``sum`` results in each iteration of the while loops when it only needed to be done once outside of the loops before calling the ``setFinalValue`` function
* Added clear comments within each integration method
* Changed declaration of DOM elements to const for good practice
# To-Do list
* [ ] Store variables for calculations as parameters in the URL to enable link sharing as well as preserving user input when navigating between methods
* [ ] Perhaps improve the UI a bit just to make the site look nicer and flex some CSS skills.
* [ ] Condense each integration method into one page where the user can select a method rather than switching between pages in the navigation bar