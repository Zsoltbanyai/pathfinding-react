# BFS Visualization

This project is a visualization of the Breadth-First Search algorithm. The user can create a grid of arbitrary size, 
reposition the start and end nodes, and draw walls to create obstacles for the algorithm to navigate around. 
The algorithm will then find the shortest path between the start and end nodes, 
with each node visited and each step of the path being animated in real-time.

## Getting Started

To run this project, clone the repository and run `npm install` to install the necessary dependencies. Then run `npm start` to start the development server. The project will be available at `http://localhost:3000/`.

* Click on either the start or end node and move your cursor to reposition. Click again to place the node.
* Press and hold left mouse button to draw a wall, press right mouse button to erase.
* Press Play to see the animation, then feel free to change the nodes on the grid to see an instant re-render.
* Press Pause to clear the grid of visited and path nodes.

Note:
- This app is optimized for mouse input.
- The animation only plays when you press Play, not when you change the grid.
- If you press Pause or hold down the left or right mouse button during animation, the animation stops and all visited and path nodes are cleared.
- You can adjust the size of the grid by changing the numOfRows and numOfCols props passed to the Grid component, in App.js.


*This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).*

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.
