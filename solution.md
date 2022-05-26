## Technical choices, architecture and approach
The purpose of this project is to create an insurance form in which user can input their name, age, country and selected package and later we will show the price and form for user whether to buy or not. This project consists of 4 pages, 3 of them are wizard form for user and other one is error page.

### Packages used:
  - Vue 3 (as per requirement)
  - TypeScript Support (as per requirement)
  - Tailwind CSS, it enables us to style the element without hassle. I can just combine classes to create desired UI and it is more readable.
  - Vitest (testing library), as it is recommended from Vue.
 
### Directory Layout

    .
    ├── public                   # Vue public folder
    ├── src                      # Source files (alternatively `lib` or `app`)
        ├── assets               # Asets such as CSS or images
        ├── components           # Vue components
            ├── __tests__        # Vue component tests
        ├── consts               # Constants, contains package listing and country listing.
        ├── enums                # Enums files.
        ├── types                # TypeScript types for constraint.
        ├── utils                # Any helper modules, such as premium calculation can be placed here.
             ├── __tests__       # Test files for helper scripts.
I structured the folders like above so that each file that has different purposes can be separated. We want `components` folder to only store Vue components, `consts` to only store constants, etc. Also note that test folder are placed closely with its related file so that it is easier to reach rather than place all test files in one big test folder in root directory.

Now, about the web form. Because each form after the first form is closely related to its previous one and can't exists independently, i avoid using web router/hash so that every load will lead to first form with start button.

`App.vue` serves as root component of the project. Its sole role is just to determine which form to show (kinda like router view but without url). Also because we want to persists the second page state when user click `back` button, we use `v-show` if current page is third page to hide the second page instead of `v-if` which will unmount the component thus will lose its state. So when user click `back` we will show the second page and its state will persists.

`FirstPage.vue`, nothing special as we just show some texts and button to go to next page. Each component page will have event `nextPage` to let `App.vue` know when user want to navigate to next page. In this case when `nextPage` is emitted, `App.vue` will show second page.

`SecondPage.vue`, this is the component that contains the core business logic. In this form we want to let user input informations and calculate the premium based on that. In this case, we created helper script `premiumCalculator` in `utils` folder, the reason we separate it is that so we can unit test it later and provide separation of concern. The component should focus only on its state and what to show. On each input we also provide form validation so we can validate the input before proceed to next page. Validation includes checking if input is empty, must be letters only for name, and must be numbers only for age. If the validation fails, we will show the error messages and apply red color to the input to warn user.

If the inputs are all correct, we will use `premiumCalculator` to get the correct price and show it to user. In this case the component no need to know how to calculate the premium, it can just delegate the job to the helper script and focus on showin the result.

`SecondPage.vue` has two events, `back` to back to first page and `nextPage` to go to third page but for this `nextPage` we provide additional data to inform third page of what kind of premium the user selected. The data will consists of information regarding, user's name, age, country, selected package, currency, and final price.

Now, `App.vue` will receive the event and it will inspect the `data` to check if the age is over 100. If it is over 100 we will redirect to `ErrorPage`, else we show the third page.

`ThirdPage.vue` doesn't contains any complex logic either as it just receives the `form` props that contains what user selected on second page and shows it. It has two events `back` to back to second page in case we want to alter the selected inputs and `nextPage` if user click `Buy` button in which we will go back to first page and repeat the cycle again.
