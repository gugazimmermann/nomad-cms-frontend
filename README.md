# Nomad CMS - Frontend

This project was created as a sample code for Nomad CMS

## Project Description

Simulation of a self-service kiosk, kitchen screen and restaurant screen.

### Tech Used

React / TypeScript / Tailwind

#### Kiosk Screen

Simulation a user in a self-service fast-food kiosk. The Kiosk connect to the backand and ask for the menu, the user choose the itens and send the order to payment (to simulate, the payment has a 25% change that will be declined), and the order go to the Kitchen.

#### Kitchen Screen

The order enter the Kitchen Queue as Waiting, that can be moved to Preparing and then to Ready. When the order is moved to Delivered goes to the Restaurant.

#### Restaurant Screen

It's the screen that the user that used the Kiosk before will see when the order is ready to withdraw.

### BackEnd

For now, all the backend is mocked.

When done, can be found here: <https://github.com/gugazimmermann/nomad-cms>
