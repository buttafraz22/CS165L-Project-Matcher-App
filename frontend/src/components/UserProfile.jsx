/*
  UserProfile Component

  This component represents a user profile card. It displays the user's image, name,
  and a brief description about them. Users can interact with the profile by marking
  it as a match or unmatch. If a match is present, it provides an option to navigate
  to the chat with the matched user.

  Dependencies:
  - React: Core library for building UI components.
  - axios: Promise-based HTTP client for making requests.
*/

// Importing necessary dependencies
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// UserProfile Component definition
function UserProfile(props) {
    // State to track if the current user is matched with the displayed profile
    const [isMatched, setMatched] = useState(false);
    
    // Hook to allow navigation within the component
    const navigate = useNavigate();

    // Object containing the user IDs for checking and creating matches
    const matchData = { userId1: props.userId1, userId2: props.userId2 };

    // Function to handle match or unmatch action
    async function onCheck() {
        try {
            // Check if the users are already matched
            if (isMatched) {
                // If matched, unmatch them
                const unmatchResponse = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/api/un-match`, matchData);

                // If unmatch is successful, update the state
                if (unmatchResponse.data.message) {
                    setMatched(false);
                }
            } else {
                // If not matched, create a match
                const matchResponse = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/api/matches`, matchData);

                // If match is successful, update the state
                if (matchResponse.data.message) {
                    setMatched(true);
                }
            }
        } catch (error) {
            console.error(error);
            // Handle the error appropriately, e.g., show an error message to the user
        }
    }

    // Function to update the profile number for displaying the next profile
    function updateProfileNum() {
        props.setProfileNum((prevValue) => {
            if (prevValue < props.totalProfiles - 1) {
                return prevValue + 1;
            } else {
                return 0;
            }
        });
    }

    // Hook to initialize the component and check if the users are matched
    useEffect(() => {
        initialize();
    }, []);

    // Function to check if the users are matched when the component initializes
    async function initialize() {
        try {
            // Send a request to the server to check if the users are matched
            const response = await axios.post(`${process.env.REACT_APP_SERVER_LINK}/api/is-matched`, matchData);

            // If matched, update the state
            if (response.data.message) {
                setMatched(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Rendered JSX for the UserProfile component
    return (
        <>
            <div className="user-profile">
                {/* Displaying the user's image */}
                <div className="user-profile-wrapper">
                    <img src={`${props.image}`} alt="user-profile" />
                </div>
                {/* Displaying the user's name */}
                <h1>{props.name}</h1>
                {/* Displaying a truncated version of the user's description */}
                <p>{props.aboutMe.length > 315 ? props.aboutMe.slice(0, 350) + "..." : props.aboutMe}</p>
                {/* Button to update the profile number for the next profile */}
                <button onClick={updateProfileNum}>
                    <i className="fa-solid fa-xmark fa-2xl" style={{ color: "grey" }}></i>
                </button>
                {/* Button to handle match or unmatch action */}
                <button onClick={onCheck}>
                    <i
                        className={isMatched ? "fa-solid fa-heart fa-2xl" : "fa-regular fa-heart fa-2xl"}
                        style={{ color: "#ff2600" }}
                    ></i>
                </button>
                {/* Displaying a button to navigate to chat if a match is present */}
                {isMatched && (
                    <button>
                        <i
                            className="fa-solid fa-message fa-2xl"
                            style={{ color: "grey" }}
                            onClick={() => navigate("/chat")}
                        ></i>
                    </button>
                )}
            </div>
        </>
    );
}

// Export the UserProfile component
export default UserProfile;