# Nile Mart

Nile Mart is an ecommerce website that allows users to browse, search, and purchase products. It was built using React.js and Redux, and is integrated with the Fake Store API to fetch products, cart, and user data.

## Live Demo

You can view a live demo of the Nile Mart website [here](https://myelmasry.github.io/Nile-Mart/).

## Features
### Users
There are two types of users in Nile Mart: customers and admins. Customers can browse and purchase products, while admins have access to the dashboard where they can manage products and users.

### Navbar
The navbar contains a search bar to search for specific products, as well as login and registration buttons for users. The cart can also be accessed from the navbar.

### Home Page
The home page displays all products fetched from the Fake Store API, and users can add any product to the cart or view more details about the product.

### Product Details Page
The product details page contains the full description of the product, as well as frequently bought together products. Users can also write a review for the product and give it a rating.

### Cart Page
The cart page displays all the products that the user has added to their cart, and allows them to change the quantity of a specific product before checking out. The cart can also be cleared if the user decides not to purchase anything.

### Dahboard Page
The dashboard page is only accessible to admins, and contains three sub-pages:
1. Products page, where admins can add, edit, or delete products.
2. User page, where all users registered on the website are displayed. Admins can ban users or add new users, and can also export the user data as an Excel or PDF file.
3. Statistics page, where numerical statistics such as the number of products, number of users, number of ratings, and revenue amount are displayed. A bar chart also shows the average rating of each category of products, and can be exported as an image or printed.

## Libraries and Frameworks Used
The following libraries and frameworks were used in the development of Nile Mart:
* Tailwind CSS
* Material UI
* DevExtreme
* Formik
* Yup
* Sass
* SweetAlert2

## How to Use
To use Nile Mart on your own machine, follow these steps:
1. Clone the repository using git clone https://github.com/MYElmasry/Nile-Mart.git.
2. Install the required packages using npm install.
3. Start the development server using npm start.

