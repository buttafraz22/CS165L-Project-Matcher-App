function UserProfile() {
    return (
        <>
            <div className="user-profile">
                <div className="user-profile-wrapper">
                    <img src="/images/profile-picture.jpg" alt="user-profile" />
                </div>
                <h1>User Profile</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur in nunc vitae arcu semper efficitur congue ut ex. Ut bibendum fringilla sem, at posuere arcu accumsan nec. Vestibulum convallis laoreet tincidunt. Nullam non venenatis ipsum, ac placerat justo. Vestibulum in dolor sed urna sodales elementum vel eu sem</p>
                <button><i class="fa-solid fa-xmark fa-2xl" style={{color: "grey"}}></i></button>
                <button><i class="fa-solid fa-heart fa-2xl" style={{color: "#ff2600"}}></i></button>
            </div>
        </>
    )
}

export default UserProfile;