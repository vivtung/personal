This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

- What you did
First of all, I cloned the create react app for this. I tried using react, redux and axios for this project. First of all, i used material ui for the responsive part, so as the grid and input boxes. I used redux to keep track of the state and storing the json response with immutable. I have worked on the filters, input box and select dropdown. I could have missed it in the pdf but I assumed the price input box will populat anything with a price over what the user typed. I started to build the second page with carousel but I didn't get to finish it.


- Problems or flaws you encountered
The api that is provided is with https and my local is http. So there is a cross origin issue. I had to comment out the axios call and directly dispatch the sample data. I was going to use a constant.js for the sample data, but i was trying to read everything on the same page, and I left it in the CarActions.js.

Also, the photos are from a https site as well, I had to hardcode the https in front, in order to display all images.
Cross origin becomes an issue when I am making the call directly from frontend, instead of spinning up a backend server.

- What you would do if you had another week to work on it
I will definitely include the carousel and also implement the router, so it is easier to navgiate to another page. It will be better if I have started a server for the api call, to avoid the cross origin issue. I will also work on the styling, as it barely has any styling added right now. Pagination or Infinite scrolling should also be added. 