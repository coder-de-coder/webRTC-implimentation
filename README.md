# webRTC - Implementation

A simple project which integrates WebRTC p2p connection from first principles without any external library.

- **Backend**: Node.js + TypeScript
- **Frontend**: React

## To run the project locally

1. Clone the repository:  
   `git clone <repo link>`

2. Navigate to the backend directory:  
   `cd webRTC-implimentation/backend`

3. Install backend dependencies:  
   `npm install`

4. Run the backend:  
   `node dist/index.ts`

5. Open a separate terminal and navigate to the frontend directory:  
   `cd ../frontend`

6. Install frontend dependencies and start the development server:  
   `npm install && npm run dev`

## Usage

1. Open your browser and go to:  
   `http://localhost:5173/sender`

2. Click on the **Send** button to initiate the video stream.

3. In a new tab, go to:  
   `http://localhost:5173/receiver`

4. You should now see the video being streamed from the sender tab.
